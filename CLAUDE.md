# Dự án: Website cộng đồng giáo viên yoga — MVP

## Bối cảnh
- Chủ dự án: **Chang Chang Khí Thần** — giáo viên, nhà đào tạo & huấn luyện viên yoga cân bằng phục hồi.
- Slogan: **"Căn Trục – Điều Khí – Dưỡng Thần"**
- Triết lý: **"Hơi thở làm gốc – Cân bằng làm hướng đi – Cột sống làm trọng tâm"**
- Tầm nhìn dài hạn: hệ sinh thái cộng đồng yoga, nơi giáo viên xây thương hiệu cá nhân, chia sẻ kiến thức, tổ chức workshop và bán khoá học.
- **Giai đoạn MVP:** chỉ phục vụ **7–8 giáo viên trong nhóm** (đều do chủ dự án đào tạo). Chủ dự án tự quản lý nội dung, chưa cần giáo viên tự đăng nhập.

## Mục tiêu MVP
Một website chung cho cả nhóm, giúp:
1. Mỗi giáo viên có **trang hồ sơ cá nhân** có link riêng để chia sẻ lên mạng xã hội.
2. Học viên xem **lịch workshop chung** của cả nhóm và **đăng ký** tham gia (online qua Zoom hoặc offline).
3. Có **mục kiến thức** để giáo viên đóng góp bài viết (yoga, giải phẫu, phục hồi).

**Thước đo thành công (2–3 tháng):** số giáo viên tổ chức được workshop qua web; số học viên mới đến từ web.

## Các trang
| Trang | Đường dẫn | Nội dung |
|---|---|---|
| Trang chủ | `/` | Giới thiệu triết lý, chương trình đào tạo giáo viên, workshop sắp tới, giáo viên nổi bật |
| Đội ngũ giáo viên | `/giao-vien` | Lưới thẻ giáo viên (ảnh, tên, chuyên môn) |
| Hồ sơ giáo viên | `/giao-vien/[slug]` | Ảnh, giới thiệu, chuyên môn, chứng chỉ, lịch workshop của người đó, bài viết, liên hệ/mạng xã hội, badge "Giáo viên được đào tạo bởi Chang Chang Khí Thần" |
| Lịch workshop | `/workshop` | Danh sách buổi sắp tới, lọc theo giáo viên / online-offline; buổi đã qua tách riêng |
| Chi tiết workshop | `/workshop/[slug]` | Mô tả, thời gian (giờ Việt Nam), địa điểm hoặc Zoom, học phí, form đăng ký, nút "Thêm vào lịch" (.ics / Google Calendar) |
| Kiến thức | `/kien-thuc`, `/kien-thuc/[slug]` | Bài viết theo chủ đề, ghi tên tác giả (giáo viên) |
| Đào tạo giáo viên | `/dao-tao` | Giới thiệu chương trình đào tạo + form quan tâm |

## Đăng ký workshop & Zoom (làm theo thứ tự, bắt đầu từ mức đơn giản)
1. **Mức 1 (MVP):** form đăng ký trên web (họ tên, email, SĐT, ghi chú) → lưu vào cơ sở dữ liệu đơn giản → gửi email xác nhận kèm link Zoom + file .ics. Link Zoom nhập tay trong dữ liệu workshop.
   - Nếu workshop dùng Zoom Registration thì cho phép trường `registrationUrl` để nút "Đăng ký" trỏ thẳng sang Zoom.
2. **Mức 2 (sau MVP):** tích hợp Zoom API để tự tạo meeting; thanh toán VietQR/MoMo; nhắc lịch tự động.

## Quản lý nội dung
- MVP: nội dung lưu dạng file trong repo (`content/teachers/*.md`, `content/workshops/*.md`, `content/articles/*.mdx`) với frontmatter — chủ dự án nhờ Claude Code thêm/sửa.
- Có thể cân nhắc sau: đồng bộ từ Notion (chủ dự án đang dùng Notion làm kho kiến thức).

### Dữ liệu mẫu
- **Teacher:** `slug, name, photo, title, specialties[], bio, certifications[], socials{facebook, instagram, youtube, zalo}, featured`
- **Workshop:** `slug, title, teacher(slug), startAt, endAt, timezone (Asia/Ho_Chi_Minh), format (online|offline), location, zoomUrl, registrationUrl?, price (VND, 0 = miễn phí), capacity, cover, description`
- **Article:** `slug, title, author(slug), topic, publishedAt, cover, excerpt`

## Kỹ thuật đề xuất
- Next.js (App Router) + TypeScript + Tailwind CSS
- Deploy trên **Vercel** (chủ dự án đã có tài khoản)
- Lưu đăng ký: Vercel Postgres/Neon (chủ dự án đã có Neon) hoặc Google Sheets
- Gửi email: Resend (hoặc tương đương)
- Toàn bộ giao diện **tiếng Việt**, giờ hiển thị theo giờ Việt Nam, giá theo VND
- Responsive, ưu tiên mobile (học viên chủ yếu vào từ điện thoại, link chia sẻ qua Zalo/Facebook)
- SEO + ảnh xem trước (Open Graph) đẹp cho từng trang giáo viên và workshop

## Phong cách thiết kế
- Cảm giác: tĩnh, cân bằng, tự nhiên, chuyên môn — "yoga có nền tảng y khoa", không phô trương.
- Tông màu ấm, trung tính (be, xanh rêu/olive, nâu đất), nhiều khoảng trắng; font có dấu tiếng Việt hiển thị chuẩn.
- Có thể dùng hình ảnh trục cột sống / hơi thở làm motif nhận diện.

## Lộ trình
1. Dựng khung dự án + trang chủ + đội ngũ giáo viên + hồ sơ giáo viên (dữ liệu mẫu 2–3 giáo viên)
2. Lịch workshop + chi tiết workshop + form đăng ký + email xác nhận + .ics
3. Mục kiến thức + trang đào tạo
4. Deploy Vercel, gắn tên miền, kiểm tra trên điện thoại
5. Thu góp ý từ nhóm giáo viên → chỉnh sửa

## Cách làm việc
- Trao đổi bằng tiếng Việt.
- Làm từng bước nhỏ, chạy thử được sau mỗi bước; hỏi lại khi cần quyết định về nội dung hoặc thiết kế.
