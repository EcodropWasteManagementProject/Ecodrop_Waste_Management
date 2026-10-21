from app.core.config import Settings
from app.db import session as db_session
from app.core.config import settings


def test_database_error_sanitizer_hides_url_credentials() -> None:
    message = "Failed to connect to postgresql+psycopg://postgres:dev-secret@localhost:5432/ecodrop"

    sanitized = db_session._sanitize_database_error(message)

    assert "dev-secret" not in sanitized
    assert "postgres:dev-secret" not in sanitized
    assert "[hidden]@" in sanitized


def test_settings_load_environment_variables(monkeypatch) -> None:
    monkeypatch.setenv("APP_NAME", "EcoDrop Test API")
    monkeypatch.setenv("API_V1_PREFIX", "/test/v1")
    monkeypatch.setenv("ALLOWED_ORIGINS", "http://localhost:5173,https://example.test")

    configured = Settings(_env_file=None)

    assert configured.APP_NAME == "EcoDrop Test API"
    assert configured.API_V1_PREFIX == "/test/v1"
    assert configured.allowed_origins == ["http://localhost:5173", "https://example.test"]
    assert "*" not in settings.allowed_origins


def test_database_dependency_closes_the_session(monkeypatch) -> None:
    class SessionStub:
        closed = False

        def close(self) -> None:
            self.closed = True

    database_session = SessionStub()
    monkeypatch.setattr(db_session, "SessionLocal", lambda: database_session)

    dependency = db_session.get_db()
    assert next(dependency) is database_session

    try:
        next(dependency)
    except StopIteration:
        pass

    assert database_session.closed
