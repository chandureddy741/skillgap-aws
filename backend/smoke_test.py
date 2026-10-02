import os
os.environ.setdefault("GROQ_API_KEY", "")
os.environ.setdefault("JWT_SECRET_KEY", "local-smoke-test-secret")

from fastapi.testclient import TestClient
from app.main import app

with TestClient(app) as c:
    health = c.get("/health")
    assert health.status_code == 200 and health.json().get("frontend_built") is True
    reg = c.post("/api/auth/register", json={
        "full_name": "Smoke Test",
        "email": "smoke-test@example.com",
        "password": "secret12",
        "confirm_password": "secret12",
    })
    assert reg.status_code in (200, 400)
    print("SKILLGAP.AI smoke test: PASS")
