from fastapi.testclient import TestClient
from app.main import app




client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to Campaign Analytics API"}


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_read_campaigns_invalid_date():
    response = client.get(
        "/campaigns/?start_date=2025-02-01&end_date=2025-01-01")
    assert response.status_code == 400
    assert response.json()["detail"] == "Start date must be before end date"
