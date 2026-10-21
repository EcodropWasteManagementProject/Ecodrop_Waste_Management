"""Align core schema with model metadata and frontend contract.

Revision ID: 4b92f6a10d3c
Revises: 172c3e7f1cb2
Create Date: 2026-10-20 00:00:00.000000
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy import inspect
from sqlalchemy.dialects import postgresql


revision = "4b92f6a10d3c"
down_revision = "172c3e7f1cb2"
branch_labels = None
depends_on = None


def _convert_enum_column(
    table_name: str,
    column_name: str,
    enum_name: str,
    labels: tuple[str, ...],
    old_length: int,
    new_length: int,
    server_default: str | None = None,
) -> None:
    bind = op.get_bind()
    if bind.dialect.name == "postgresql":
        op.alter_column(
            table_name,
            column_name,
            existing_type=postgresql.ENUM(*labels, name=enum_name),
            type_=sa.String(length=new_length),
            existing_nullable=False,
            server_default=None,
            postgresql_using=f"{column_name}::text",
        )
    else:
        with op.batch_alter_table(table_name) as batch_op:
            batch_op.alter_column(
                column_name,
                existing_type=sa.String(length=old_length),
                type_=sa.String(length=new_length),
                existing_nullable=False,
                server_default=None,
            )

    if server_default is not None:
        if bind.dialect.name == "postgresql":
            op.alter_column(
                table_name,
                column_name,
                existing_type=sa.String(length=new_length),
                server_default=server_default,
            )
        else:
            with op.batch_alter_table(table_name) as batch_op:
                batch_op.alter_column(
                    column_name,
                    existing_type=sa.String(length=new_length),
                    server_default=server_default,
                )


def upgrade() -> None:
    _convert_enum_column(
        "users",
        "role",
        "user_role",
        ("CITIZEN", "VENDOR", "ADMIN"),
        old_length=7,
        new_length=7,
    )
    _convert_enum_column(
        "waste_reports",
        "status",
        "report_status",
        ("OPEN", "IN_REVIEW", "ASSIGNED", "RESOLVED", "REJECTED"),
        old_length=9,
        new_length=11,
    )
    _convert_enum_column(
        "pickup_requests",
        "status",
        "pickup_status",
        ("PENDING", "ACCEPTED", "IN_PROGRESS", "COMPLETED", "CANCELLED"),
        old_length=11,
        new_length=9,
        server_default="PENDING",
    )
    _convert_enum_column(
        "notifications",
        "notification_type",
        "notification_type",
        ("REPORT", "PICKUP", "SYSTEM", "REWARD"),
        old_length=6,
        new_length=6,
        server_default="SYSTEM",
    )
    _convert_enum_column(
        "ai_messages",
        "sender",
        "message_sender",
        ("USER", "AI"),
        old_length=4,
        new_length=4,
    )

    op.execute("UPDATE waste_reports SET status = 'PENDING' WHERE status IN ('OPEN', 'IN_REVIEW')")
    op.execute("UPDATE pickup_requests SET status = 'ASSIGNED' WHERE status = 'ACCEPTED'")
    op.execute("UPDATE pickup_requests SET status = 'PICKED_UP' WHERE status = 'IN_PROGRESS'")
    bind = op.get_bind()
    if bind.dialect.name == "postgresql":
        op.alter_column(
            "waste_reports",
            "status",
            existing_type=sa.String(length=11),
            server_default="PENDING",
        )
    else:
        with op.batch_alter_table("waste_reports") as batch_op:
            batch_op.alter_column(
                "status",
                existing_type=sa.String(length=11),
                server_default="PENDING",
            )

    bind = op.get_bind()
    op.create_index("ix_users_role", "users", ["role"])
    op.create_index("ix_waste_reports_status", "waste_reports", ["status"])
    op.create_index("ix_pickup_requests_status", "pickup_requests", ["status"])
    op.create_index("ix_notifications_notification_type", "notifications", ["notification_type"])
    op.create_index("ix_ai_messages_sender", "ai_messages", ["sender"])

    if bind.dialect.name == "postgresql":
        for enum_name in ("user_role", "report_status", "pickup_status", "notification_type", "message_sender"):
            op.execute(sa.text(f"DROP TYPE {enum_name}"))

    op.add_column("users", sa.Column("address", sa.String(length=255), nullable=True))
    op.add_column("pickup_requests", sa.Column("waste_type", sa.String(length=80), nullable=True))
    op.add_column("pickup_requests", sa.Column("quantity", sa.String(length=100), nullable=True))
    op.execute("UPDATE pickup_requests SET waste_type = 'Other' WHERE waste_type IS NULL")
    op.execute("UPDATE pickup_requests SET quantity = 'Unspecified' WHERE quantity IS NULL")
    with op.batch_alter_table("pickup_requests") as batch_op:
        batch_op.alter_column("waste_type", existing_type=sa.String(length=80), nullable=False)
        batch_op.alter_column("quantity", existing_type=sa.String(length=100), nullable=False)

    unique_constraints = {
        constraint["name"]
        for constraint in inspect(bind).get_unique_constraints("users")
        if constraint.get("name")
    }
    if "uq_users_email" in unique_constraints:
        with op.batch_alter_table("users") as batch_op:
            batch_op.drop_constraint("uq_users_email", type_="unique")

    for table_name in (
        "users",
        "waste_reports",
        "pickup_requests",
        "notifications",
        "eco_points",
        "ai_conversations",
        "ai_messages",
    ):
        primary_key_index = f"ix_{table_name}_id"
        indexes = {index["name"] for index in inspect(bind).get_indexes(table_name)}
        if primary_key_index in indexes:
            op.drop_index(primary_key_index, table_name=table_name)


def downgrade() -> None:
    raise NotImplementedError(
        "This schema alignment maps legacy status values and cannot be safely reversed."
    )
