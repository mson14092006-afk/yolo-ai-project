"""Test cơ bản cho backend, dùng FastAPI TestClient.

Chạy: pytest (từ thư mục backend/)
"""

import io

from fastapi.testclient import TestClient
from PIL import Image

from app import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_detection_rejects_non_image_file():
    response = client.post(
        "/api/v1/detection",
        files={"file": ("test.txt", b"not an image", "text/plain")},
    )
    assert response.status_code == 400


def test_detection_returns_expected_shape():
    # Tạo 1 ảnh nhỏ trong bộ nhớ để test, không cần file thật trên disk.
    image = Image.new("RGB", (100, 100), color="white")
    buffer = io.BytesIO()
    image.save(buffer, format="JPEG")
    buffer.seek(0)

    response = client.post(
        "/api/v1/detection",
        files={"file": ("test.jpg", buffer, "image/jpeg")},
    )
    assert response.status_code == 200

    data = response.json()
    assert "detections" in data
    assert data["image_width"] == 100
    assert data["image_height"] == 100
