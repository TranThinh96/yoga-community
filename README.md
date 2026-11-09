# Chang Chang Khí Thần – Website cộng đồng giáo viên yoga (MVP)

Next.js (App Router) + TypeScript + Tailwind CSS. Nội dung lưu dạng file Markdown trong thư mục `content/`.

## Chạy thử

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # kiểm tra bản build
```

Biến môi trường: `NEXT_PUBLIC_SITE_URL` (tên miền thật, dùng cho link chia sẻ / Open Graph).

## Quản lý nội dung

| Loại | Thư mục | Ghi chú |
|---|---|---|
| Giáo viên | `content/teachers/<slug>.md` | Ảnh đặt trong `public/images/teachers/`, ghi `photo: /images/teachers/ten-anh.jpg`. Để trống thì hiển thị chữ cái đầu tên. |
| Workshop | `content/workshops/<slug>.md` | `startAt`/`endAt` viết theo **giờ Việt Nam**, dạng `2026-11-22T20:00`. `price` tính bằng VND, `0` = miễn phí. |
| Bài viết | `content/articles/<slug>.mdx` | (Bước 3) |

Phần nội dung bên dưới frontmatter (Markdown) là phần "Giới thiệu" của giáo viên / mô tả chi tiết của workshop.

> Dữ liệu hiện có (3 giáo viên, 3 workshop) là **dữ liệu mẫu** – cần thay bằng thông tin thật.

## Tiến độ (theo CLAUDE.md)

- [x] Bước 1: khung dự án, trang chủ, `/giao-vien`, `/giao-vien/[slug]`, ảnh Open Graph
- [ ] Bước 2: `/workshop`, `/workshop/[slug]`, form đăng ký, email xác nhận, .ics
- [ ] Bước 3: `/kien-thuc`, `/dao-tao`
- [ ] Bước 4: deploy Vercel, gắn tên miền
