"""Service load model YOLO và chạy inference trên ảnh upload.

Model được load MỘT LẦN khi service khởi tạo (singleton), tránh load lại
model mỗi request (rất tốn thời gian và RAM).
"""

import io
import os

from PIL import Image
from ultralytics import YOLO

# Nếu có weights custom (best.pt) trong thư mục weights/ thì dùng weights đó.
# Nếu không có, fallback về model pretrained yolov8n.pt (Ultralytics tự tải về).
_WEIGHTS_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "weights")
_CUSTOM_WEIGHTS_PATH = os.path.join(_WEIGHTS_DIR, "best.pt")
_DEFAULT_PRETRAINED_MODEL = "yolov8n.pt"

_CONFIDENCE_THRESHOLD = 0.25

# Chỉ trả về các phương tiện (tên class theo COCO). Muốn thêm/bớt thì sửa ở đây.
_VEHICLE_LABELS = {
    "bicycle",
    "motorcycle",
    "car",
    "bus",
    "truck",
    "train",
    "airplane",
    "boat",
}


class YOLOService:
    """Bọc model YOLO, cung cấp method predict() cho route sử dụng."""

    def __init__(self) -> None:
        weights_path = (
            _CUSTOM_WEIGHTS_PATH
            if os.path.exists(_CUSTOM_WEIGHTS_PATH)
            else _DEFAULT_PRETRAINED_MODEL
        )
        self.model = YOLO(weights_path)

    def predict(self, image_bytes: bytes) -> dict:
        """Chạy detection trên ảnh upload (dạng bytes).

        Trả về dict đúng format mà PredictionResponse schema mong đợi:
        {
            "detections": [{"label", "confidence", "box": {x, y, width, height}}, ...],
            "image_width": int,
            "image_height": int,
        }
        """
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        image_width, image_height = image.size

        # verbose=False để tắt log mặc định của ultralytics ra console mỗi request.
        results = self.model.predict(image, conf=_CONFIDENCE_THRESHOLD, verbose=False)
        result = results[0]

        detections = []
        for box in result.boxes:
            # box.xyxy: toạ độ (x1, y1, x2, y2) theo pixel ảnh gốc.
            x1, y1, x2, y2 = box.xyxy[0].tolist()
            class_id = int(box.cls[0])
            label = self.model.names[class_id]
            if label not in _VEHICLE_LABELS:
                continue
            confidence = float(box.conf[0])

            detections.append(
                {
                    "label": label,
                    "confidence": confidence,
                    "box": {
                        "x": x1,
                        "y": y1,
                        "width": x2 - x1,
                        "height": y2 - y1,
                    },
                }
            )

        return {
            "detections": detections,
            "image_width": image_width,
            "image_height": image_height,
        }


# Singleton — import cái này ở route thay vì tự khởi tạo YOLOService() nhiều lần.
yolo_service = YOLOService()