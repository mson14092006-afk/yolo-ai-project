"""Route nhận ảnh upload và trả về kết quả detection.

Endpoint: POST /api/v1/detection
Path này khớp với frontend (src/services/api.js) để sau này chỉ cần
bỏ mock và trỏ thẳng vào backend, không cần sửa UI.
"""

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.models.schemas import PredictionResponse
from app.services.yolo_service import yolo_service

router = APIRouter(prefix="/api/v1", tags=["detection"])

_ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp"}


@router.post("/detection", response_model=PredictionResponse)
async def detect(file: UploadFile = File(...)) -> PredictionResponse:
    """Nhận 1 file ảnh, chạy YOLO inference, trả về danh sách detections."""
    if file.content_type not in _ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported content type: {file.content_type}",
        )

    image_bytes = await file.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Empty file")

    try:
        result = yolo_service.predict(image_bytes)
    except Exception as exc:  # noqa: BLE001 - trả lỗi rõ ràng cho client
        raise HTTPException(status_code=500, detail=f"Inference failed: {exc}") from exc

    return PredictionResponse(**result)
