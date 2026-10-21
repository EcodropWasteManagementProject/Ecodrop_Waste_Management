"""Create core EcoDrop models.

Revision ID: 172c3e7f1cb2
Revises:
Create Date: 2026-10-05 23:00:00.000000
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "172c3e7f1cb2"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("full_name", sa.String(length=255), nullable=False),
        sa.Column("phone", sa.String(length=40), nullable=True),
        sa.Column("role", sa.Enum("CITIZEN", "VENDOR", "ADMIN", name="user_role"), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("email", name="uq_users_email"),
    )
    op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)
    op.create_index(op.f("ix_users_id"), "users", ["id"], unique=False)

    op.create_table(
        "waste_reports",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("category", sa.String(length=80), nullable=False, server_default="GENERAL"),
        sa.Column("location", sa.String(length=255), nullable=False),
        sa.Column("status", sa.Enum("OPEN", "IN_REVIEW", "ASSIGNED", "RESOLVED", "REJECTED", name="report_status"), nullable=False, server_default="OPEN"),
        sa.Column("priority", sa.String(length=25), nullable=False, server_default="MEDIUM"),
        sa.Column("citizen_id", sa.Integer(), nullable=False),
        sa.Column("assigned_vendor_id", sa.Integer(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.ForeignKeyConstraint(["citizen_id"], ["users.id"]),
        sa.ForeignKeyConstraint(["assigned_vendor_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_waste_reports_id"), "waste_reports", ["id"], unique=False)
    op.create_index(op.f("ix_waste_reports_citizen_id"), "waste_reports", ["citizen_id"], unique=False)
    op.create_index(op.f("ix_waste_reports_assigned_vendor_id"), "waste_reports", ["assigned_vendor_id"], unique=False)

    op.create_table(
        "pickup_requests",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=False),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("pickup_address", sa.String(length=255), nullable=False),
        sa.Column("scheduled_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("status", sa.Enum("PENDING", "ACCEPTED", "IN_PROGRESS", "COMPLETED", "CANCELLED", name="pickup_status"), nullable=False, server_default="PENDING"),
        sa.Column("citizen_id", sa.Integer(), nullable=False),
        sa.Column("assigned_vendor_id", sa.Integer(), nullable=True),
        sa.Column("report_id", sa.Integer(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.ForeignKeyConstraint(["citizen_id"], ["users.id"]),
        sa.ForeignKeyConstraint(["assigned_vendor_id"], ["users.id"]),
        sa.ForeignKeyConstraint(["report_id"], ["waste_reports.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_pickup_requests_id"), "pickup_requests", ["id"], unique=False)
    op.create_index(op.f("ix_pickup_requests_citizen_id"), "pickup_requests", ["citizen_id"], unique=False)
    op.create_index(op.f("ix_pickup_requests_assigned_vendor_id"), "pickup_requests", ["assigned_vendor_id"], unique=False)
    op.create_index(op.f("ix_pickup_requests_report_id"), "pickup_requests", ["report_id"], unique=False)

    op.create_table(
        "notifications",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("recipient_id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("notification_type", sa.Enum("REPORT", "PICKUP", "SYSTEM", "REWARD", name="notification_type"), nullable=False, server_default="SYSTEM"),
        sa.Column("is_read", sa.Boolean(), nullable=False, server_default=sa.text("false")),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.ForeignKeyConstraint(["recipient_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_notifications_id"), "notifications", ["id"], unique=False)
    op.create_index(op.f("ix_notifications_recipient_id"), "notifications", ["recipient_id"], unique=False)

    op.create_table(
        "eco_points",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("points_delta", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("reason", sa.String(length=200), nullable=False),
        sa.Column("reference_type", sa.String(length=50), nullable=True),
        sa.Column("reference_id", sa.Integer(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_eco_points_id"), "eco_points", ["id"], unique=False)
    op.create_index(op.f("ix_eco_points_user_id"), "eco_points", ["user_id"], unique=False)

    op.create_table(
        "ai_conversations",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_ai_conversations_id"), "ai_conversations", ["id"], unique=False)
    op.create_index(op.f("ix_ai_conversations_user_id"), "ai_conversations", ["user_id"], unique=False)

    op.create_table(
        "ai_messages",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("conversation_id", sa.Integer(), nullable=False),
        sa.Column("sender", sa.Enum("USER", "AI", name="message_sender"), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.ForeignKeyConstraint(["conversation_id"], ["ai_conversations.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_ai_messages_id"), "ai_messages", ["id"], unique=False)
    op.create_index(op.f("ix_ai_messages_conversation_id"), "ai_messages", ["conversation_id"], unique=False)


def downgrade() -> None:
    op.drop_table("ai_messages")
    op.drop_table("ai_conversations")
    op.drop_table("eco_points")
    op.drop_table("notifications")
    op.drop_table("pickup_requests")
    op.drop_table("waste_reports")
    op.drop_table("users")
