from __future__ import annotations

from sqlalchemy import create_engine, event
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.db.base import Base
from app.models import AIConversation, AIMessage, EcoPoint, MessageSender, Notification, NotificationType, PickupRequest, PickupStatus, ReportStatus, RoleEnum, User, WasteReport


def test_status_enums_match_project_contract() -> None:
    assert {status.value for status in ReportStatus} == {
        "PENDING",
        "ASSIGNED",
        "IN_PROGRESS",
        "RESOLVED",
        "REJECTED",
    }
    assert {status.value for status in PickupStatus} == {
        "PENDING",
        "ASSIGNED",
        "PICKED_UP",
        "COMPLETED",
        "CANCELLED",
    }


def test_models_create_and_link_records() -> None:
    engine = create_engine("sqlite:///:memory:")
    event.listen(
        engine,
        "connect",
        lambda connection, _: connection.execute("PRAGMA foreign_keys=ON"),
    )
    Base.metadata.create_all(bind=engine)

    with Session(engine) as session:
        citizen = User(
            email="citizen@example.com",
            full_name="Citizen User",
            phone="+1234",
            address="Sylhet",
            role=RoleEnum.CITIZEN,
            is_active=True,
        )
        vendor = User(
            email="vendor@example.com",
            full_name="Vendor User",
            phone="+5678",
            role=RoleEnum.VENDOR,
            is_active=True,
        )
        admin = User(
            email="admin@example.com",
            full_name="Admin User",
            phone="+9101",
            role=RoleEnum.ADMIN,
            is_active=True,
        )
        session.add_all([citizen, vendor, admin])
        session.flush()

        report = WasteReport(
            title="Overflowing bin",
            description="The bin is overflowing near the station.",
            category="GENERAL",
            location="Station square",
            status=ReportStatus.PENDING,
            priority="HIGH",
            citizen_id=citizen.id,
            assigned_vendor_id=vendor.id,
        )
        session.add(report)
        session.flush()

        pickup = PickupRequest(
            title="Waste collection",
            waste_type="Plastic",
            quantity="3 sacks",
            notes="Collect mixed waste.",
            pickup_address="Station square",
            scheduled_at=None,
            status=PickupStatus.PENDING,
            citizen_id=citizen.id,
            assigned_vendor_id=vendor.id,
            report_id=report.id,
        )
        session.add(pickup)

        notification = Notification(
            recipient_id=citizen.id,
            title="Report created",
            message="Your report is now active.",
            notification_type=NotificationType.REPORT,
            is_read=False,
        )
        session.add(notification)

        eco_point = EcoPoint(
            user_id=citizen.id,
            points_delta=15,
            reason="Submitted a report",
            reference_type="waste_report",
            reference_id=report.id,
        )
        session.add(eco_point)

        conversation = AIConversation(
            user_id=citizen.id,
            title="Waste sorting",
            is_active=True,
        )
        session.add(conversation)
        session.flush()

        session.add(
            AIMessage(
                conversation_id=conversation.id,
                sender=MessageSender.USER,
                content="Can I recycle mixed plastic?",
            )
        )

        session.commit()

        assert session.query(User).count() == 3
        assert session.query(WasteReport).count() == 1
        assert session.query(PickupRequest).count() == 1
        assert session.query(Notification).count() == 1
        assert session.query(EcoPoint).count() == 1
        assert session.query(AIConversation).count() == 1
        assert session.query(AIMessage).count() == 1
        assert report.citizen is citizen
        assert citizen.reports == [report]
        assert report.pickups == [pickup]
        assert conversation.messages[0].content == "Can I recycle mixed plastic?"


def test_email_is_unique_and_required_fields_are_enforced() -> None:
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)

    with Session(engine) as session:
        session.add(User(email="duplicate@example.com", full_name="First User", role=RoleEnum.CITIZEN))
        session.commit()
        session.add(User(email="duplicate@example.com", full_name="Second User", role=RoleEnum.CITIZEN))

        try:
            session.commit()
        except IntegrityError:
            session.rollback()
        else:
            raise AssertionError("Duplicate user emails must be rejected.")

        session.add(User(email="missing-name@example.com", full_name=None, role=RoleEnum.CITIZEN))
        try:
            session.commit()
        except IntegrityError:
            session.rollback()
        else:
            raise AssertionError("A user's full name is required.")


def test_required_foreign_keys_prevent_orphan_records() -> None:
    engine = create_engine("sqlite:///:memory:")
    event.listen(
        engine,
        "connect",
        lambda connection, _: connection.execute("PRAGMA foreign_keys=ON"),
    )
    Base.metadata.create_all(bind=engine)

    with Session(engine) as session:
        session.add(
            WasteReport(
                title="Orphan report",
                description="This report has no citizen.",
                category="Mixed",
                location="Sylhet",
                status=ReportStatus.PENDING,
                priority="Medium",
                citizen_id=999,
            )
        )
        try:
            session.commit()
        except IntegrityError:
            session.rollback()
        else:
            raise AssertionError("Reports must reference an existing citizen.")


def test_deleting_parent_does_not_cascade_or_orphan_children() -> None:
    engine = create_engine("sqlite:///:memory:")
    event.listen(
        engine,
        "connect",
        lambda connection, _: connection.execute("PRAGMA foreign_keys=ON"),
    )
    Base.metadata.create_all(bind=engine)

    with Session(engine) as session:
        citizen = User(email="citizen@example.com", full_name="Citizen", role=RoleEnum.CITIZEN)
        session.add(citizen)
        session.flush()
        report = WasteReport(
            title="Overflowing bin",
            description="Waste is accumulating.",
            location="Sylhet",
            citizen_id=citizen.id,
        )
        session.add(report)
        session.commit()

        session.delete(citizen)
        try:
            session.commit()
        except IntegrityError:
            session.rollback()
        else:
            raise AssertionError("A user with related records must not be deleted.")

        assert session.query(User).count() == 1
        assert session.query(WasteReport).count() == 1
