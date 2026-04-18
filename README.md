# Register React UI

UI đăng ký thành viên bằng React + Vite + Axios + Tailwind CSS.

## Cài đặt

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
npm run preview
```

## API đang dùng

```text
POST http://160.30.192.170/api/server/cms
```

Body gửi lên:

```json
{
  "username": "your_account",
  "password": "your_password"
}
```

## Lưu ý CORS

Nếu browser báo lỗi CORS thì cần mở backend, ví dụ:

```java
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/server")
public class UserController {
    ...
}
```

Hoặc cấu hình CORS theo domain frontend cụ thể.
