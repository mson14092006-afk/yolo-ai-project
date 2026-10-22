# Base image nhẹ, đủ để chạy PyTorch CPU + ultralytics.
FROM python:3.11-slim

WORKDIR /app

# Thư viện hệ thống mà OpenCV (dependency của ultralytics) cần.
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Nâng cấp pip, tăng retry/timeout cho mạng chậm hoặc không ổn định.
ENV PIP_DEFAULT_TIMEOUT=100 \
    PIP_RETRIES=10 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

RUN pip install --no-cache-dir --upgrade pip

# Cài torch bản CPU trước (nhẹ hơn nhiều so với bản CUDA mặc định).
RUN pip install --no-cache-dir torch torchvision \
    --index-url https://download.pytorch.org/whl/cpu

# Cài các thư viện còn lại. Torch đã có sẵn nên pip sẽ không tải lại.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "run.py"]