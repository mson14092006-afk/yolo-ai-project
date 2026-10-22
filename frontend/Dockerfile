# ---------- Stage 1: build ----------
# Cài dependencies và build React thành file tĩnh trong /app/dist.
FROM node:22-alpine AS build

WORKDIR /app

# Copy package*.json trước để Docker cache layer npm ci,
# chỉ cài lại khi dependencies thay đổi.
COPY package*.json ./
RUN npm ci

COPY . .

# Vite nhúng biến VITE_* vào code lúc BUILD, không phải lúc chạy container.
ARG VITE_API_BASE_URL=http://localhost:8000
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

# ---------- Stage 2: serve ----------
# Image cuối chỉ có Nginx + file tĩnh, không có node_modules / Node.
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]