"""Pydantic schemas dùng để validate và serialize dữ liệu ra/vào API."""

from pydantic import BaseModel


class BoundingBox(BaseModel):
    """Toạ độ bounding box tính theo pixel trên ảnh gốc (không phải %)."""

    x: float
    y: float
    width: float
    height: float


class Detection(BaseModel):
    """Một đối tượng được YOLO phát hiện trong ảnh."""

    label: str
    confidence: float
    box: BoundingBox


class PredictionResponse(BaseModel):
    """Response trả về cho frontend sau khi chạy inference."""

    detections: list[Detection]
    image_width: int
    image_height: int
