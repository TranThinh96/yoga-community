# Hệ thống thiết kế — Chang Chang Khí Thần

Nguồn: gợi ý của skill `ui-ux-pro-max` (truy vấn "yoga wellness studio calm", variance 4 · motion 5 · density 3),
điều chỉnh theo CLAUDE.md (tông be – rêu – nâu đất, font có dấu tiếng Việt).

## Phong cách
**Organic Biophilic** — tĩnh, cân bằng, tự nhiên, "yoga có nền tảng y khoa". Bo góc mềm 16–32px, hình khối hữu cơ,
bóng đổ tự nhiên ám xanh rêu, nhiều khoảng trắng. Không phô trương, không emoji làm icon (dùng SVG trong `src/components/Icons.tsx`).

## Màu (token trong `src/app/globals.css`)
| Vai trò | Token | Hex |
|---|---|---|
| Nền | `sand-50` | #fbf8f2 |
| Nền phụ / viền | `sand-100…300` | #f5efe4 · #ebe2d1 · #d9cbb0 |
| Chữ chính | `ink` | #2b2721 |
| Chữ phụ | `ink-soft` | #5c554b (≥ 6:1 trên nền) |
| Thương hiệu / CTA | `moss-700` | #434d2f (chữ sáng trên nền này ≥ 8:1) |
| Nhấn chữ nghiêng | `moss-600` | #56633b |
| Đất (offline) | `earth-500/700` | #8a6a4f · #5c4533 |

## Chữ
- Tiêu đề: **Lora** (serif, có nghiêng cho từ nhấn), `tracking-tight`.
- Nội dung: **Be Vietnam Pro** 16–18px, line-height 1.6–1.85.
- Eyebrow: chữ hoa 12px, giãn 0.22em, có gạch ngang phía trước.

## Thành phần
`.btn .btn-primary / .btn-ghost / .btn-light` (cao ≥ 44–48px) · `.card .card-hover` · `.eyebrow` · `PageHero` · `SectionHeading` ·
`TeacherCard` · `WorkshopCard` · `BreathOrb` · `TrainedBadge`.

## Chuyển động
- Tối đa 1–2 điểm nhấn mỗi màn hình. Điểm nhấn chính: **BreathOrb** — vòng tròn thở theo nhịp 4s hít · 2s giữ · 6s thở, trục cột sống tự vẽ.
- Tiêu đề hero: chữ trượt lên từ mặt nạ (`.line-mask`), so le 120–130ms.
- Cuộn: `data-reveal` (mờ → rõ + trượt 28px, 900–1100ms, `--ease-out-soft`), so le 100–120ms qua `--d`.
- Hover: 150–450ms; thẻ nhấc 4px, mũi tên trượt 4px, ảnh phóng 5%.
- Chuyển trang: `template.tsx` mờ dần 600ms.
- Luôn tôn trọng `prefers-reduced-motion` (hiện trạng thái cuối, không chuyển động).

## Kiểm tra trước khi giao
- [ ] Tương phản chữ ≥ 4.5:1 · focus nhìn thấy được · vùng bấm ≥ 44px
- [ ] Kiểm tra 375px, 768px, 1024px, 1440px · không cuộn ngang
- [ ] Không dùng emoji làm icon · reduced-motion hiển thị đủ nội dung
