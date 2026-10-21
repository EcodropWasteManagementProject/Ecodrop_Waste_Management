from __future__ import annotations

from sqlalchemy.orm import Session

from app.models import AIConversation, AIMessage, EcoPoint, MessageSender, Notification, NotificationType, PickupRequest, PickupStatus, ReportStatus, RoleEnum, User, WasteReport


def seed_database(session: Session) -> dict[str, object]:
    if session.query(User).count() > 0:
        return {"seeded": False, "message": "Database already contains users."}

    citizen = User(
        email="citizen@example.com",
        full_name="Aisha Citizen",
        phone="+1234567890",
        role=RoleEnum.CITIZEN,
        is_active=True,
    )
    vendor = User(
        email="vendor@example.com",
        full_name="Rafi Vendor",
        phone="+1987654321",
        role=RoleEnum.VENDOR,
        is_active=True,
    )
    admin = User(
        email="admin@example.com",
        full_name="Nina Admin",
        phone="+1122334455",
        role=RoleEnum.ADMIN,
        is_active=True,
    )

    session.add_all([citizen, vendor, admin])
    session.flush()

    report = WasteReport(
        title="Overflowing bins near market",
        description="Plastic and organic waste is piling up near the market entrance.",
        category="GENERAL",
        location="Downtown market",
        status=ReportStatus.PENDING,
        priority="HIGH",
        citizen_id=citizen.id,
        assigned_vendor_id=vendor.id,
    )
    session.add(report)
    session.flush()

    pickup = PickupRequest(
        title="Bin collection pickup",
        waste_type="Mixed",
        quantity="2 sacks",
        notes="Please collect mixed waste from the market area.",
        pickup_address="Downtown market",
        scheduled_at=None,
        status=PickupStatus.PENDING,
        citizen_id=citizen.id,
        assigned_vendor_id=vendor.id,
        report_id=report.id,
    )
    session.add(pickup)

    notification = Notification(
        recipient_id=citizen.id,
        title="Report received",
        message="Your waste report has been received and is being reviewed.",
        notification_type=NotificationType.REPORT,
        is_read=False,
    )
    session.add(notification)

    eco_point = EcoPoint(
        user_id=citizen.id,
        points_delta=25,
        reason="Completed a recycling report submission",
        reference_type="waste_report",
        reference_id=report.id,
    )
    session.add(eco_point)

    conversation = AIConversation(
        user_id=citizen.id,
        title="Recycling guidance",
        is_active=True,
    )
    session.add(conversation)
    session.flush()

    session.add(
        AIMessage(
            conversation_id=conversation.id,
            sender=MessageSender.USER,
            content="How should I sort plastic waste?",
        )
    )
    session.add(
        AIMessage(
            conversation_id=conversation.id,
            sender=MessageSender.AI,
            content="Rinse bottles, place caps separately, and recycle clean plastic by category.",
        )
    )

    session.commit()
    return {
        "seeded": True,
        "citizen_id": citizen.id,
        "vendor_id": vendor.id,
        "admin_id": admin.id,
        "report_id": report.id,
        "pickup_id": pickup.id,
    }
