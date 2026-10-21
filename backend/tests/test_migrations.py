from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path

from sqlalchemy import create_engine, text
from sqlalchemy.engine import URL


def test_alembic_upgrade_and_schema_check_on_temporary_sqlite(tmp_path: Path) -> None:
    backend_dir = Path(__file__).resolve().parents[1]
    database_url = URL.create(
        "sqlite",
        database=str(tmp_path / "migration-check.db"),
    )
    environment = os.environ.copy()
    environment["DATABASE_URL"] = database_url.render_as_string(hide_password=False)

    base_upgrade = subprocess.run(
        [sys.executable, "-m", "alembic", "upgrade", "172c3e7f1cb2"],
        cwd=backend_dir,
        env=environment,
        capture_output=True,
        text=True,
        check=False,
    )
    assert base_upgrade.returncode == 0, base_upgrade.stdout + base_upgrade.stderr

    engine = create_engine(database_url)
    with engine.begin() as connection:
        connection.execute(
            text(
                "INSERT INTO users (id, email, full_name, role, is_active) "
                "VALUES (1, 'citizen@example.com', 'Citizen', 'CITIZEN', 1)"
            )
        )
        connection.execute(
            text(
                "INSERT INTO waste_reports "
                "(id, title, description, category, location, status, priority, citizen_id) "
                "VALUES (10, 'Legacy report', 'Existing data', 'Mixed', 'Sylhet', "
                "'IN_REVIEW', 'MEDIUM', 1)"
            )
        )
        connection.execute(
            text(
                "INSERT INTO pickup_requests "
                "(id, title, pickup_address, status, citizen_id, report_id) "
                "VALUES (20, 'Legacy pickup', 'Sylhet', 'IN_PROGRESS', 1, 10)"
            )
        )

    upgrade = subprocess.run(
        [sys.executable, "-m", "alembic", "upgrade", "head"],
        cwd=backend_dir,
        env=environment,
        capture_output=True,
        text=True,
        check=False,
    )
    assert upgrade.returncode == 0, upgrade.stdout + upgrade.stderr

    with engine.connect() as connection:
        report_status = connection.execute(
            text("SELECT status FROM waste_reports WHERE id = 10")
        ).scalar_one()
        pickup = connection.execute(
            text("SELECT status, waste_type, quantity FROM pickup_requests WHERE id = 20")
        ).one()
    engine.dispose()
    assert report_status == "PENDING"
    assert tuple(pickup) == ("PICKED_UP", "Other", "Unspecified")

    schema_check = subprocess.run(
        [sys.executable, "-m", "alembic", "check"],
        cwd=backend_dir,
        env=environment,
        capture_output=True,
        text=True,
        check=False,
    )
    assert schema_check.returncode == 0, schema_check.stdout + schema_check.stderr
    assert "No new upgrade operations detected" in schema_check.stdout + schema_check.stderr
