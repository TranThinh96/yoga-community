import "server-only";
import type { Teacher, Workshop } from "./content";
import { buildIcs, workshopUrl } from "./calendar";
import { formatDate, formatPrice, formatTime } from "./format";
import { site } from "./site";

export type Registrant = { name: string; email: string; phone: string; note: string };

export type SheetResult = { ok: true } | { ok: false; reason: "full" | "error"; message?: string };

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function emailHtml(w: Workshop, teacher: Teacher | undefined, r: Registrant) {
  const when = `${formatDate(w.startAt)}, ${formatTime(w.startAt)}–${formatTime(w.endAt)} (giờ Việt Nam)`;
  const where =
    w.format === "online"
      ? w.zoomUrl
        ? `Online qua Zoom: <a href="${esc(w.zoomUrl)}">${esc(w.zoomUrl)}</a>`
        : "Online qua Zoom – link sẽ được gửi trước buổi học."
      : esc(w.location ?? "");
  return `
<div style="font-family:Arial,sans-serif;color:#2e2a24;line-height:1.6;max-width:560px">
  <p>Chào ${esc(r.name)},</p>
  <p>Cảm ơn bạn đã đăng ký workshop <strong>${esc(w.title)}</strong>. Thông tin buổi học:</p>
  <ul>
    <li><strong>Thời gian:</strong> ${when}</li>
    <li><strong>Hình thức:</strong> ${where}</li>
    ${teacher ? `<li><strong>Giáo viên:</strong> ${esc(teacher.name)}</li>` : ""}
    <li><strong>Học phí:</strong> ${formatPrice(w.price)}</li>
  </ul>
  ${w.price > 0 ? "<p>Giáo viên sẽ liên hệ với bạn để hướng dẫn đóng học phí.</p>" : ""}
  <p>File lịch (.ics) đính kèm – mở file để thêm buổi học vào lịch điện thoại của bạn.</p>
  <p>Chi tiết workshop: <a href="${workshopUrl(w)}">${workshopUrl(w)}</a></p>
  <p style="color:#56633b">${site.name}<br/><em>${site.slogan}</em></p>
</div>`;
}

/**
 * Gửi đăng ký sang Google Apps Script: script ghi một dòng vào Google Sheet
 * và gửi email xác nhận từ Gmail của chủ dự án (xem docs/huong-dan-google-sheets.md).
 */
export async function submitRegistration(w: Workshop, teacher: Teacher | undefined, r: Registrant): Promise<SheetResult> {
  const url = process.env.GOOGLE_SCRIPT_URL;
  const secret = process.env.GOOGLE_SCRIPT_SECRET;

  const payload = {
    secret,
    registration: {
      workshopSlug: w.slug,
      workshopTitle: w.title,
      workshopStart: `${formatDate(w.startAt)} ${formatTime(w.startAt)}`,
      teacher: teacher?.name ?? w.teacher,
      format: w.format === "online" ? "Online" : "Offline",
      capacity: w.capacity ?? 0,
      ...r,
    },
    email: {
      to: r.email,
      subject: `Xác nhận đăng ký: ${w.title}`,
      htmlBody: emailHtml(w, teacher, r),
      senderName: site.name,
      icsFileName: `${w.slug}.ics`,
      ics: buildIcs(w, { includeZoom: true }),
    },
  };

  if (!url || !secret) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[đăng ký – chế độ thử, chưa cấu hình GOOGLE_SCRIPT_URL]", payload.registration);
      return { ok: true };
    }
    return { ok: false, reason: "error", message: "Chưa cấu hình GOOGLE_SCRIPT_URL / GOOGLE_SCRIPT_SECRET" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    const data = (await res.json()) as { ok: boolean; error?: string };
    if (data.ok) return { ok: true };
    if (data.error === "full") return { ok: false, reason: "full" };
    return { ok: false, reason: "error", message: data.error };
  } catch (e) {
    return { ok: false, reason: "error", message: String(e) };
  }
}
