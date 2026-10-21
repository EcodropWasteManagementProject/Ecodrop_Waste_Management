from __future__ import annotations

from collections.abc import Iterator

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, event
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.v1.reports import router as reports_router
from app.core.security import create_access_token
from app.db.base import Base
from app.db.session import get_db
from app.models import ReportStatus, RoleEnum, User, WasteReport


@pytest.fixture
def report_app(monkeypatch) -> Iterator[tuple[TestClient, sessionmaker]]:
    from app.core.config import settings

    monkeypatch.setattr(settings, "JWT_SECRET_KEY", "report-tests-only-secret-with-over-32-characters")
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    event.listen(
        engine,
        "connect",
        lambda connection, _: connection.execute("PRAGMA foreign_keys=ON"),
    )
    Base.metadata.create_all(bind=engine)
    test_session_factory = sessionmaker(bind=engine, expire_on_commit=False)

    def override_get_db() -> Iterator[Session]:
        with test_session_factory() as db:
            yield db

    app = FastAPI()
    app.include_router(reports_router, prefix="/api/v1")
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as client:
        yield client, test_session_factory

    app.dependency_overrides.clear()
    engine.dispose()


def add_user(session_factory: sessionmaker, email: str, role: RoleEnum) -> User:
    with session_factory() as db:
        user = User(email=email, full_name=email.split("@")[0], role=role)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user


def token_for(user: User) -> str:
    return create_access_token(user.id)[0]


def report_payload(**overrides) -> dict:
    return {
        "title": "Overflowing waste bin",
        "description": "Waste is overflowing beside the public market.",
        "waste_type": "Mixed",
        "location": "Central market",
        "priority": "High",
        **overrides,
    }


def test_citizen_creates_report_owned_by_authenticated_user_and_persisted(report_app) -> None:
    client, session_factory = report_app
    citizen = add_user(session_factory, "citizen@example.com", RoleEnum.CITIZEN)

    response = client.post(
        "/api/v1/reports",
        headers={"Authorization": f"Bearer {token_for(citizen)}"},
        json=report_payload(),
    )

    assert response.status_code == 201
    body = response.json()
    assert body["status"] == ReportStatus.PENDING.value
    assert body["waste_type"] == "Mixed"
    assert body["priority"] == "High"
    assert "citizen_id" not in body
    assert "assigned_vendor_id" not in body
    with session_factory() as db:
        saved = db.query(WasteReport).one()
        assert saved.citizen_id == citizen.id
        assert saved.status == ReportStatus.PENDING
        assert saved.category == "Mixed"


@pytest.mark.parametrize(
    "overrides",
    [
        {"title": ""},
        {"description": "   "},
        {"location": ""},
        {"waste_type": "Hazardous"},
        {"priority": "Urgent"},
        {"status": "RESOLVED"},
        {"citizen_id": 999},
        {"assigned_vendor_id": 999},
    ],
)
def test_create_rejects_missing_invalid_or_privileged_fields(report_app, overrides: dict) -> None:
    client, session_factory = report_app
    citizen = add_user(session_factory, "citizen@example.com", RoleEnum.CITIZEN)

    response = client.post(
        "/api/v1/reports",
        headers={"Authorization": f"Bearer {token_for(citizen)}"},
        json=report_payload(**overrides),
    )

    assert response.status_code == 422
    with session_factory() as db:
        assert db.query(WasteReport).count() == 0


@pytest.mark.parametrize("field", ["title", "description", "waste_type", "location", "priority"])
def test_create_requires_all_report_fields(report_app, field: str) -> None:
    client, session_factory = report_app
    citizen = add_user(session_factory, "citizen@example.com", RoleEnum.CITIZEN)
    payload = report_payload()
    del payload[field]

    response = client.post(
        "/api/v1/reports",
        headers={"Authorization": f"Bearer {token_for(citizen)}"},
        json=payload,
    )

    assert response.status_code == 422
    with session_factory() as db:
        assert db.query(WasteReport).count() == 0


def test_report_endpoints_require_authentication_and_citizen_role(report_app) -> None:
    client, session_factory = report_app
    vendor = add_user(session_factory, "vendor@example.com", RoleEnum.VENDOR)

    assert client.get("/api/v1/reports").status_code == 401
    response = client.post(
        "/api/v1/reports",
        headers={"Authorization": f"Bearer {token_for(vendor)}"},
        json=report_payload(),
    )
    assert response.status_code == 403


def test_citizen_list_is_scoped_and_empty_list_is_supported(report_app) -> None:
    client, session_factory = report_app
    owner = add_user(session_factory, "owner@example.com", RoleEnum.CITIZEN)
    other = add_user(session_factory, "other@example.com", RoleEnum.CITIZEN)
    other_report = WasteReport(
        title="Other citizen report",
        description="A different citizen's report.",
        category="Paper",
        location="Library",
        priority="Low",
        citizen_id=other.id,
    )
    with session_factory() as db:
        db.add(other_report)
        db.commit()

    owner_headers = {"Authorization": f"Bearer {token_for(owner)}"}
    assert client.get("/api/v1/reports", headers=owner_headers).json() == []
    assert client.get("/api/v1/reports/my", headers=owner_headers).json() == []

    owned_report = WasteReport(
        title="My report",
        description="This belongs to the current citizen.",
        category="Glass",
        location="Town square",
        priority="Medium",
        citizen_id=owner.id,
    )
    with session_factory() as db:
        db.add(owned_report)
        db.commit()
        db.refresh(owned_report)
        owned_id = owned_report.id

    response = client.get("/api/v1/reports", headers=owner_headers)
    assert response.status_code == 200
    assert [item["id"] for item in response.json()] == [owned_id]
    assert response.json()[0]["title"] == "My report"
    spoofed_owner_query = client.get(
        f"/api/v1/reports?citizen_id={other.id}",
        headers=owner_headers,
    )
    assert [item["id"] for item in spoofed_owner_query.json()] == [owned_id]


def test_report_details_are_owner_scoped_and_missing_ids_are_404(report_app) -> None:
    client, session_factory = report_app
    owner = add_user(session_factory, "owner@example.com", RoleEnum.CITIZEN)
    other = add_user(session_factory, "other@example.com", RoleEnum.CITIZEN)
    report = WasteReport(
        title="My report",
        description="A report available to its owner only.",
        category="Organic",
        location="Park",
        priority="Low",
        citizen_id=owner.id,
    )
    with session_factory() as db:
        db.add(report)
        db.commit()
        db.refresh(report)
        report_id = report.id

    owner_response = client.get(
        f"/api/v1/reports/{report_id}",
        headers={"Authorization": f"Bearer {token_for(owner)}"},
    )
    assert owner_response.status_code == 200
    assert owner_response.json()["id"] == report_id
    assert owner_response.json()["assigned_vendor"] is None

    other_response = client.get(
        f"/api/v1/reports/{report_id}",
        headers={"Authorization": f"Bearer {token_for(other)}"},
    )
    assert other_response.status_code == 404

    missing_response = client.get(
        "/api/v1/reports/987654321",
        headers={"Authorization": f"Bearer {token_for(owner)}"},
    )
    assert missing_response.status_code == 404
