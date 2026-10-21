from __future__ import annotations

import re

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

try:
    engine = create_engine(
        settings.DATABASE_URL,
        pool_pre_ping=True,
        future=True,
        connect_args={"connect_timeout": 2},
    )
except Exception as exc:  # pragma: no cover - configuration edge case
    engine = None
    engine_init_error = str(exc)
else:
    engine_init_error = None

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, future=True) if engine is not None else None


def _sanitize_database_error(message: str) -> str:
    if not message:
        return "Database connection failed."
    cleaned = re.sub(r"(?i)(://)[^/@\s]+@", r"\1[hidden]@", message)
    cleaned = re.sub(r"(?i)(password=)[^\s]+", r"\1[hidden]", cleaned)
    cleaned = re.sub(r"(?i)(user=)[^\s]+", r"\1[hidden]", cleaned)
    cleaned = re.sub(r"(?i)(dbname=)[^\s]+", r"\1[hidden]", cleaned)
    return cleaned


def check_database_connection() -> tuple[bool, str]:
    if not settings.DATABASE_URL:
        return False, "DATABASE_URL is not configured."
    if engine is None:
        return False, _sanitize_database_error(engine_init_error or "Database engine could not be configured.")

    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return True, "PostgreSQL connection successful."
    except Exception as exc:  # pragma: no cover - error handling branch
        message = str(exc)
        return False, _sanitize_database_error(message)


def get_db():
    if SessionLocal is None:
        raise RuntimeError("Database session factory is not available because DATABASE_URL is invalid or missing.")

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
