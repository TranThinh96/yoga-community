import type { Workshop } from "./content";
import { site } from "./site";

const pad = (n: number) => String(n).padStart(2, "0");
/** Định dạng UTC cho iCalendar / Google Calendar: 20261122T130000Z */
function utcStamp(d: Date) {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

function escapeIcs(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

/** Gấp dòng dài theo chuẩn RFC 5545 (≤ 75 byte mỗi dòng). */
function fold(line: string) {
  const out: string[] = [];
  let cur = "";
  let bytes = 0;
  for (const ch of line) {
    const b = Buffer.byteLength(ch);
    if (bytes + b > 73) {
      out.push(cur);
      cur = " ";
      bytes = 1;
    }
    cur += ch;
    bytes += b;
  }
  out.push(cur);
  return out.join("\r\n");
}

export function workshopUrl(w: Workshop) {
  return `${site.url}/workshop/${w.slug}`;
}

function locationText(w: Workshop, includeZoom: boolean) {
  if (w.format === "offline") return w.location ?? "";
  return includeZoom && w.zoomUrl ? w.zoomUrl : "Online qua Zoom";
}

/**
 * Tạo file .ics. Link Zoom chỉ đưa vào file gửi qua email (includeZoom = true),
 * không đưa vào file tải công khai trên web.
 */
export function buildIcs(w: Workshop, { includeZoom = false } = {}) {
  const desc = [
    w.description,
    includeZoom && w.zoomUrl ? `Link Zoom: ${w.zoomUrl}` : w.format === "online" ? "Link Zoom được gửi qua email sau khi đăng ký." : "",
    `Chi tiết: ${workshopUrl(w)}`,
  ]
    .filter(Boolean)
    .join("\n");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${site.name}//Workshop//VI`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${w.slug}@khithan-yoga`,
    `DTSTAMP:${utcStamp(new Date())}`,
    `DTSTART:${utcStamp(w.startAt)}`,
    `DTEND:${utcStamp(w.endAt)}`,
    `SUMMARY:${escapeIcs(w.title)}`,
    `DESCRIPTION:${escapeIcs(desc)}`,
    `LOCATION:${escapeIcs(locationText(w, includeZoom))}`,
    `URL:${workshopUrl(w)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcs(w.title)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}

export function googleCalendarUrl(w: Workshop) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: w.title,
    dates: `${utcStamp(w.startAt)}/${utcStamp(w.endAt)}`,
    details: `${w.description}\n\nChi tiết: ${workshopUrl(w)}`,
    location: locationText(w, false),
    ctz: "Asia/Ho_Chi_Minh",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}
