# Chang Chang Khí Thần – Website cộng đồng giáo viên yoga (MVP)

Next.js (App Router) + TypeScript + Tailwind CSS. Nội dung lưu dạng file Markdown trong thư mục `content/`.

## Chạy thử

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # kiểm tra bản build
```

Biến môi trường: xem `.env.example`. Form đăng ký workshop lưu vào **Google Sheets** và gửi email xác nhận từ **Gmail cá nhân** qua Google Apps Script – hướng dẫn cài đặt: [`docs/huong-dan-google-sheets.md`](docs/huong-dan-google-sheets.md). Khi chạy `npm run dev` mà chưa cấu hình, đăng ký chỉ được in ra console.

## Quản lý nội dung

| Loại | Thư mục | Ghi chú |
|---|---|---|
| Giáo viên | `content/teachers/<slug>.md` | Ảnh đặt trong `public/images/teachers/`, ghi `photo: /images/teachers/ten-anh.jpg`. Để trống thì hiển thị chữ cái đầu tên. |
| Workshop | `content/workshops/<slug>.md` | `startAt`/`endAt` viết theo **giờ Việt Nam**, dạng `2026-11-22T20:00`. `price` tính bằng VND, `0` = miễn phí. `zoomUrl` chỉ gửi trong email xác nhận. Điền `registrationUrl` nếu muốn nút đăng ký trỏ thẳng sang Zoom Registration. |
| Bài viết | `content/articles/<slug>.mdx` | (Bước 3) |

Phần nội dung bên dưới frontmatter (Markdown) là phần "Giới thiệu" của giáo viên / mô tả chi tiết của workshop.

> Dữ liệu hiện có (3 giáo viên, 3 workshop) là **dữ liệu mẫu** – cần thay bằng thông tin thật.

## Tiến độ (theo CLAUDE.md)

- [x] Bước 1: khung dự án, trang chủ, `/giao-vien`, `/giao-vien/[slug]`, ảnh Open Graph
- [x] Bước 2: `/workshop` (lọc theo giáo viên / online-offline), `/workshop/[slug]`, form đăng ký → Google Sheets, email xác nhận + .ics, nút Google Calendar
- [ ] Bước 3: `/kien-thuc`, `/dao-tao`
- [ ] Bước 4: deploy Vercel, gắn tên miền
