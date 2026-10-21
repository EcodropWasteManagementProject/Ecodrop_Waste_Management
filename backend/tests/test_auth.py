from __future__ import annotations

from collections.abc import Iterator
from datetime import timedelta

import jwt
import pytest
from fastapi import Depends, FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, event
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.dependencies import get_current_user, require_roles
from app.api.v1.auth import router as auth_router
from app.core.config import settings
from app.core.security import create_access_token, hash_password, verify_password
from app.db.base import Base
from app.db.session import get_db
from app.models import RoleEnum, User

TEST_SECRET = "test-only-signing-secret-with-more-than-32-chars"


@pytest.fixture
def auth_app(monkeypatch) -> Iterator[tuple[TestClient, sessionmaker]]:
    monkeypatch.setattr(settings, "JWT_SECRET_KEY", TEST_SECRET)
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
    app.include_router(auth_router, prefix="/api/v1")
    app.dependency_overrides[get_db] = override_get_db

    @app.get("/test/admin")
    def admin_only(user: User = Depends(require_roles(RoleEnum.ADMIN))) -> dict[str, str]:
        return {"role": user.role.value}

    with TestClient(app) as client:
        yield client, test_session_factory

    app.dependency_overrides.clear()
    engine.dispose()


def test_registration_hashes_password_and_returns_safe_user(auth_app) -> None:
    client, session_factory = auth_app

    response = client.post(
        "/api/v1/auth/register",
        json={
            "full_name": "Aisha Citizen",
            "email": " Aisha@example.com ",
            "password": "strong-password-123",
            "phone": "+1234567890",
            "address": "Sylhet",
        },
    )

    assert response.status_code == 201
    payload = response.json()
    assert payload["user"]["email"] == "aisha@example.com"
    assert payload["user"]["role"] == "CITIZEN"
    assert payload["token_type"] == "bearer"
    assert payload["expires_in"] > 0
    assert "password" not in payload and "password_hash" not in payload["user"]

    with session_factory() as db:
        user = db.query(User).one()
        assert user.password_hash != "strong-password-123"
        assert verify_password("strong-password-123", user.password_hash)


def test_registration_rejects_duplicate_email_case_insensitively(auth_app) -> None:
    client, _ = auth_app
    body = {"full_name": "Aisha Citizen", "email": "aisha@example.com", "password": "strong-password-123"}

    assert client.post("/api/v1/auth/register", json=body).status_code == 201
    duplicate = {**body, "email": "AISHA@EXAMPLE.COM"}
    response = client.post("/api/v1/auth/register", json=duplicate)

    assert response.status_code == 409
    assert response.json()["detail"] == "An account with this email already exists."


@pytest.mark.parametrize(
    "body",
    [
        {"full_name": "A", "email": "valid@example.com", "password": "strong-password"},
        {"full_name": "Valid Name", "email": "not-an-email", "password": "strong-password"},
        {"full_name": "Valid Name", "email": "valid@example.com", "password": "short"},
        {
            "full_name": "Valid Name",
            "email": "valid@example.com",
            "password": "strong-password",
            "role": "ADMIN",
        },
    ],
)
def test_registration_rejects_invalid_or_privileged_input(auth_app, body: dict) -> None:
    client, _ = auth_app

    assert client.post("/api/v1/auth/register", json=body).status_code == 422


def test_login_accepts_credentials_and_does_not_reveal_which_failed(auth_app) -> None:
    client, _ = auth_app
    register_response = client.post(
        "/api/v1/auth/register",
        json={"full_name": "Aisha Citizen", "email": "aisha@example.com", "password": "strong-password-123"},
    )
    assert register_response.status_code == 201

    login_response = client.post(
        "/api/v1/auth/login",
        json={"email": "AISHA@example.com", "password": "strong-password-123"},
    )
    assert login_response.status_code == 200
    assert login_response.json()["user"]["id"] == register_response.json()["user"]["id"]

    wrong_password = client.post(
        "/api/v1/auth/login",
        json={"email": "aisha@example.com", "password": "wrong-password"},
    )
    unknown_email = client.post(
        "/api/v1/auth/login",
        json={"email": "unknown@example.com", "password": "wrong-password"},
    )
    assert wrong_password.status_code == unknown_email.status_code == 401
    assert wrong_password.json()["detail"] == unknown_email.json()["detail"] == "Invalid email or password."


def test_current_user_requires_valid_unexpired_token(auth_app) -> None:
    client, _ = auth_app
    register_response = client.post(
        "/api/v1/auth/register",
        json={"full_name": "Aisha Citizen", "email": "aisha@example.com", "password": "strong-password-123"},
    )
    token = register_response.json()["access_token"]

    assert client.get("/api/v1/auth/me").status_code == 401
    assert client.get("/api/v1/auth/me", headers={"Authorization": "Bearer invalid"}).status_code == 401

    expired_token, _ = create_access_token(
        register_response.json()["user"]["id"],
        expires_delta=timedelta(seconds=-1),
    )
    expired_response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {expired_token}"},
    )
    assert expired_response.status_code == 401
    assert expired_response.json()["detail"] == "Access token has expired."

    current_user = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert current_user.status_code == 200
    assert current_user.json()["role"] == "CITIZEN"
    assert "password_hash" not in current_user.json()


def test_disabled_accounts_cannot_login_or_use_current_user(auth_app) -> None:
    client, session_factory = auth_app
    with session_factory() as db:
        user = User(
            email="disabled@example.com",
            full_name="Disabled User",
            password_hash=hash_password("strong-password-123"),
            role=RoleEnum.CITIZEN,
            is_active=False,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        token, _ = create_access_token(user.id)

    login_response = client.post(
        "/api/v1/auth/login",
        json={"email": "disabled@example.com", "password": "strong-password-123"},
    )
    me_response = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})

    assert login_response.status_code == me_response.status_code == 403


def test_role_authorization_uses_database_role_not_token_claim(auth_app) -> None:
    client, session_factory = auth_app
    citizen_response = client.post(
        "/api/v1/auth/register",
        json={"full_name": "Aisha Citizen", "email": "aisha@example.com", "password": "strong-password-123"},
    )
    citizen_token = citizen_response.json()["access_token"]
    restricted = client.get("/test/admin", headers={"Authorization": f"Bearer {citizen_token}"})
    assert restricted.status_code == 403

    elevated_claim_token = jwt.encode(
        {"sub": str(citizen_response.json()["user"]["id"]), "role": "ADMIN"},
        TEST_SECRET,
        algorithm="HS256",
    )
    elevated = client.get("/test/admin", headers={"Authorization": f"Bearer {elevated_claim_token}"})
    assert elevated.status_code == 403

    with session_factory() as db:
        admin = User(
            email="admin@example.com",
            full_name="Admin User",
            password_hash=hash_password("strong-password-123"),
            role=RoleEnum.ADMIN,
            is_active=True,
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
        admin_token, _ = create_access_token(admin.id)

    permitted = client.get("/test/admin", headers={"Authorization": f"Bearer {admin_token}"})
    assert permitted.status_code == 200
    assert permitted.json() == {"role": "ADMIN"}


def test_auth_is_unavailable_without_configured_jwt_secret(auth_app, monkeypatch) -> None:
    client, _ = auth_app
    monkeypatch.setattr(settings, "JWT_SECRET_KEY", "")

    response = client.post(
        "/api/v1/auth/register",
        json={"full_name": "Aisha Citizen", "email": "aisha@example.com", "password": "strong-password-123"},
    )

    assert response.status_code == 503
