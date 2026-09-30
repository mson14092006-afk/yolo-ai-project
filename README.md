# Frontend Architecture

```text
Browser
   ↓
React
   ├── Components
   ├── Pages
   ├── Hooks / State
   └── Services
          ↓
       HTTP / fetch
          ↓
       FastAPI
          ↓
         YOLO
```

# Important Files

* `src/services/api.js` — Giao tiếp với backend thông qua HTTP/fetch.
* `src/hooks/` — Quản lý state và logic của frontend.
* `src/components/` — Chứa các UI component có thể tái sử dụng.
* `src/pages/` — Chứa các trang của ứng dụng.
* `src/App.jsx` — Component cấp cao và quản lý cấu trúc/routing của ứng dụng.
* `src/main.jsx` — Entry point, khởi chạy React application.
* `src/index.css` — CSS và style toàn cục.
* `package.json` — Quản lý dependencies và các npm scripts.
* `vite.config.js` — Cấu hình Vite.
* `.env` — Chứa các biến môi trường của frontend như API URL; không chứa secret.
