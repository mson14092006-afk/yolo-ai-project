"""Entry point chạy backend: python run.py

Dùng uvicorn để serve app FastAPI được tạo trong app/__init__.py.
"""

import uvicorn

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
