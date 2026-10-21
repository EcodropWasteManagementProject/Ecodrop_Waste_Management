from __future__ import annotations

from datetime import datetime
from enum import Enum

from sqlalchemy import Boolean, DateTime, Enum as SQLAEnum, ForeignKey, Index, Integer, String, Text, func, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class RoleEnum(str, Enum):
    CITIZEN = "CITIZEN"
    VENDOR = "VENDOR"
    ADMIN = "ADMIN"


class ReportStatus(str, Enum):
    PENDING = "PENDING"
    ASSIGNED = "ASSIGNED"
    IN_PROGRESS = "IN_PROGRESS"
    RESOLVED = "RESOLVED"
    REJECTED = "REJECTED"


class PickupStatus(str, Enum):
    PENDING = "PENDING"
    ASSIGNED = "ASSIGNED"
    PICKED_UP = "PICKED_UP"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"


class NotificationType(str, Enum):
    REPORT = "REPORT"
    PICKUP = "PICKUP"
    SYSTEM = "SYSTEM"
    REWARD = "REWARD"


class MessageSender(str, Enum):
    USER = "USER"
    AI = "AI"


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )


class User(TimestampMixin, Base):
    __tablename__ = "users"
    __table_args__ = (Index("uq_users_email_lower", text("lower(email)"), unique=True),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    password_hash: Mapped[str | None] = mapped_column(String(255), nullable=True)
    phone: Mapped[str | None] = mapped_column(String(40), nullable=True)
    address: Mapped[str | None] = mapped_column(String(255), nullable=True)
    role: Mapped[RoleEnum] = mapped_column(
        SQLAEnum(RoleEnum, name="user_role", native_enum=False, validate_strings=True),
        nullable=False,
        default=RoleEnum.CITIZEN,
        index=True,
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, server_default="true", nullable=False)

    reports: Mapped[list["WasteReport"]] = relationship(
        back_populates="citizen",
        foreign_keys="WasteReport.citizen_id",
        passive_deletes="all",
    )
    assigned_reports: Mapped[list["WasteReport"]] = relationship(
        back_populates="assigned_vendor",
        foreign_keys="WasteReport.assigned_vendor_id",
    )
    citizen_pickups: Mapped[list["PickupRequest"]] = relationship(
        back_populates="citizen",
        foreign_keys="PickupRequest.citizen_id",
        passive_deletes="all",
    )
    vendor_pickups: Mapped[list["PickupRequest"]] = relationship(
        back_populates="assigned_vendor",
        foreign_keys="PickupRequest.assigned_vendor_id",
    )
    notifications: Mapped[list["Notification"]] = relationship(
        back_populates="recipient",
        passive_deletes="all",
    )
    eco_points: Mapped[list["EcoPoint"]] = relationship(
        back_populates="user",
        passive_deletes="all",
    )
    ai_conversations: Mapped[list["AIConversation"]] = relationship(
        back_populates="user",
        passive_deletes="all",
    )


class WasteReport(TimestampMixin, Base):
    __tablename__ = "waste_reports"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False, default="GENERAL", server_default="GENERAL")
    location: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[ReportStatus] = mapped_column(
        SQLAEnum(ReportStatus, name="report_status", native_enum=False, validate_strings=True),
        nullable=False,
        default=ReportStatus.PENDING,
        server_default=ReportStatus.PENDING.value,
        index=True,
    )
    priority: Mapped[str] = mapped_column(String(25), nullable=False, default="MEDIUM", server_default="MEDIUM")
    citizen_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    assigned_vendor_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True, index=True)

    citizen: Mapped[User] = relationship(back_populates="reports", foreign_keys=[citizen_id])
    assigned_vendor: Mapped[User | None] = relationship(
        back_populates="assigned_reports",
        foreign_keys=[assigned_vendor_id],
    )
    pickups: Mapped[list["PickupRequest"]] = relationship(back_populates="report")


class PickupRequest(TimestampMixin, Base):
    __tablename__ = "pickup_requests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    waste_type: Mapped[str] = mapped_column(String(80), nullable=False)
    quantity: Mapped[str] = mapped_column(String(100), nullable=False)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    pickup_address: Mapped[str] = mapped_column(String(255), nullable=False)
    scheduled_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    status: Mapped[PickupStatus] = mapped_column(
        SQLAEnum(PickupStatus, name="pickup_status", native_enum=False, validate_strings=True),
        nullable=False,
        default=PickupStatus.PENDING,
        server_default=PickupStatus.PENDING.value,
        index=True,
    )
    citizen_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    assigned_vendor_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True, index=True)
    report_id: Mapped[int | None] = mapped_column(ForeignKey("waste_reports.id"), nullable=True, index=True)

    citizen: Mapped[User] = relationship(back_populates="citizen_pickups", foreign_keys=[citizen_id])
    assigned_vendor: Mapped[User | None] = relationship(
        back_populates="vendor_pickups",
        foreign_keys=[assigned_vendor_id],
    )
    report: Mapped[WasteReport | None] = relationship(back_populates="pickups", foreign_keys=[report_id])


class Notification(TimestampMixin, Base):
    __tablename__ = "notifications"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    recipient_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    notification_type: Mapped[NotificationType] = mapped_column(
        SQLAEnum(NotificationType, name="notification_type", native_enum=False, validate_strings=True),
        nullable=False,
        default=NotificationType.SYSTEM,
        server_default=NotificationType.SYSTEM.value,
        index=True,
    )
    is_read: Mapped[bool] = mapped_column(Boolean, default=False, server_default="false", nullable=False)

    recipient: Mapped[User] = relationship(back_populates="notifications")


class EcoPoint(TimestampMixin, Base):
    __tablename__ = "eco_points"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    points_delta: Mapped[int] = mapped_column(Integer, nullable=False, default=0, server_default="0")
    reason: Mapped[str] = mapped_column(String(200), nullable=False)
    reference_type: Mapped[str | None] = mapped_column(String(50), nullable=True)
    reference_id: Mapped[int | None] = mapped_column(Integer, nullable=True)

    user: Mapped[User] = relationship(back_populates="eco_points")


class AIConversation(TimestampMixin, Base):
    __tablename__ = "ai_conversations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, server_default="true", nullable=False)

    user: Mapped[User] = relationship(back_populates="ai_conversations")
    messages: Mapped[list["AIMessage"]] = relationship(
        back_populates="conversation",
        passive_deletes="all",
    )


class AIMessage(TimestampMixin, Base):
    __tablename__ = "ai_messages"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    conversation_id: Mapped[int] = mapped_column(ForeignKey("ai_conversations.id"), nullable=False, index=True)
    sender: Mapped[MessageSender] = mapped_column(
        SQLAEnum(MessageSender, name="message_sender", native_enum=False, validate_strings=True),
        nullable=False,
        default=MessageSender.USER,
        index=True,
    )
    content: Mapped[str] = mapped_column(Text, nullable=False)

    conversation: Mapped[AIConversation] = relationship(back_populates="messages")
