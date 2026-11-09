# Hướng dẫn kết nối form đăng ký với Google Sheets + Gmail

Khi học viên bấm **Đăng ký tham gia** trên website:
1. Một dòng mới được ghi vào Google Sheet của bạn (trang tính **Đăng ký**).
2. Học viên nhận email xác nhận **gửi từ Gmail của bạn**, kèm link Zoom (nếu online) và file lịch `.ics`.
3. (Tuỳ chọn) Bạn nhận một email thông báo có người đăng ký.

Làm một lần, mất khoảng 10 phút.

## Bước 1 – Tạo Google Sheet và dán mã

1. Vào <https://sheets.new> (đăng nhập bằng Gmail bạn muốn dùng để gửi email). Đặt tên, ví dụ "Đăng ký workshop".
2. Menu **Tiện ích mở rộng → Apps Script**.
3. Xoá hết mã có sẵn, dán toàn bộ nội dung file [`google-apps-script/Code.gs`](../google-apps-script/Code.gs). Bấm 💾 Lưu.

## Bước 2 – Đặt mã bí mật

1. Trong Apps Script, bấm ⚙️ **Cài đặt dự án** (Project Settings) → kéo xuống **Thuộc tính tập lệnh** → **Thêm thuộc tính**:
   - `SECRET` = một chuỗi ngẫu nhiên dài, ví dụ `khithan-7f3k9q2m8x...` (tự nghĩ, **không chia sẻ**).
   - (Tuỳ chọn) `NOTIFY_EMAIL` = email bạn muốn nhận thông báo khi có đăng ký mới.
2. Lưu.

## Bước 3 – Cấp quyền

1. Quay lại **Trình chỉnh sửa**, chọn hàm `capQuyen` ở thanh trên, bấm **Chạy**.
2. Google hỏi quyền → chọn tài khoản → "Google chưa xác minh ứng dụng này" → **Nâng cao → Đi tới … (không an toàn)** → **Cho phép**. (Đây là script của chính bạn nên an toàn.)
3. Trong Sheet sẽ xuất hiện trang tính **Đăng ký** với dòng tiêu đề.

## Bước 4 – Triển khai thành Web app

1. Bấm **Triển khai → Tùy chọn triển khai mới**. Chọn loại ⚙️ **Ứng dụng web**.
2. *Thực thi dưới dạng:* **Tôi**. *Người có quyền truy cập:* **Bất kỳ ai**.
3. Bấm **Triển khai**, sao chép **URL ứng dụng web** (dạng `https://script.google.com/macros/s/…/exec`).

> Nếu sau này sửa mã: **Triển khai → Quản lý các bản triển khai → ✏️ → Phiên bản: Phiên bản mới → Triển khai** (giữ nguyên URL).

## Bước 5 – Khai báo trên Vercel

Trong project trên Vercel → **Settings → Environment Variables**, thêm:

| Tên | Giá trị |
|---|---|
| `GOOGLE_SCRIPT_URL` | URL web app ở Bước 4 |
| `GOOGLE_SCRIPT_SECRET` | chuỗi `SECRET` ở Bước 2 |
| `NEXT_PUBLIC_SITE_URL` | tên miền website, ví dụ `https://khithan.vn` |

Sau đó **Redeploy**. Chạy thử trên máy: tạo file `.env.local` với các biến trên.

## Lưu ý

- Gmail cá nhân gửi được khoảng **100 email/ngày** qua Apps Script – đủ cho giai đoạn MVP.
- Workshop có `capacity` > 0 sẽ tự đóng đăng ký khi đủ người (đếm theo số dòng trong Sheet). Xoá dòng trong Sheet nếu học viên huỷ.
- Cột **Trạng thái email** cho biết email xác nhận đã gửi được hay bị lỗi.
- Link Zoom chỉ nằm trong email xác nhận, không hiển thị công khai trên website.
