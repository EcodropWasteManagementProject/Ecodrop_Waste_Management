"""Add user password hashes and case-insensitive email uniqueness.

Revision ID: 91ca6e472b0f
Revises: 4b92f6a10d3c
Create Date: 2026-10-20 00:00:00.000000
"""

from alembic import op
import sqlalchemy as sa


revision = "91ca6e472b0f"
down_revision = "4b92f6a10d3c"
branch_labels = None
depends_on = None


def upgrade() -> None:
    bind = op.get_bind()
    duplicates = bind.execute(
        sa.text(
            "SELECT lower(email) FROM users "
            "GROUP BY lower(email) HAVING count(*) > 1 LIMIT 1"
        )
    ).first()
    if duplicates:
        raise RuntimeError(
            "Cannot enforce case-insensitive email uniqueness: duplicate email addresses "
            "differing only by letter case already exist."
        )

    op.add_column("users", sa.Column("password_hash", sa.String(length=255), nullable=True))
    op.create_index(
        "uq_users_email_lower",
        "users",
        [sa.text("lower(email)")],
        unique=True,
    )


def downgrade() -> None:
    op.drop_index("uq_users_email_lower", table_name="users")
    op.drop_column("users", "password_hash")
