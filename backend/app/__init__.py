"""App factory — tạo và cấu hình FastAPI instance.

Tách create_app() ra khỏi run.py để dễ test (import app mà không cần
chạy uvicorn) và dễ mở rộng (thêm middleware, exception handler, v.v.).
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.predict import router as predict_router

# Origin của frontend khi chạy npm run dev (Vite mặc định port 5173).
_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]


def create_app() -> FastAPI:
    app = FastAPI(
        title="YOLO Detection API",
        description="Backend nhận ảnh upload và trả về kết quả YOLO object detection.",
        version="0.1.0",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=_ALLOWED_ORIGINS,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(predict_router)

    @app.get("/health", tags=["health"])
    async def health_check() -> dict:
        """Endpoint đơn giản để kiểm tra backend đang chạy (dùng cho Docker healthcheck)."""
        return {"status": "ok"}

    return app


app = create_app()
