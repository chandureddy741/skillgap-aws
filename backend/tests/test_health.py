from fastapi.testclient import TestClient

from app.main import app


def test_health():
    with TestClient(app) as client:
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "ok"}


def test_technologies():
    with TestClient(app) as client:
        response = client.get("/api/skills/technologies")
        assert response.status_code == 200
        assert "Python" in response.json()["technologies"]
