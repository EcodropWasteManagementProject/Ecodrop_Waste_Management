from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_app_starts() -> None:
    response = client.get("/docs")
    assert response.status_code == 200


def test_health_endpoint_returns_status(monkeypatch) -> None:
    monkeypatch.setattr(
        "app.api.v1.router.check_database_connection",
        lambda: (False, "Database is not configured for this test."),
    )
    response = client.get("/api/v1/health")
    assert response.status_code == 200

    payload = response.json()
    assert payload["status"] == "ok"
    assert payload["app"] == "EcoDrop API"
    assert payload["message"] == "EcoDrop API is running."
    assert payload["database"] == {
        "status": "disconnected",
        "message": "Database is not configured for this test.",
    }


def test_redoc_and_development_cors() -> None:
    assert client.get("/redoc").status_code == 200
    assert "/api/v1/health" in client.get("/openapi.json").json()["paths"]

    response = client.options(
        "/api/v1/health",
        headers={
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "GET",
        },
    )
    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://localhost:5173"
    assert "*" not in response.headers["access-control-allow-origin"]
