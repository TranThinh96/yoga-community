const TZ = "Asia/Ho_Chi_Minh";

export function formatDate(d: Date) {
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: TZ,
  }).format(d);
}

export function formatTime(d: Date) {
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: TZ,
  }).format(d);
}

export function formatDayMonth(d: Date) {
  const parts = new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", timeZone: TZ }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { day: get("day"), month: get("month") };
}

export function formatPrice(vnd: number) {
  if (!vnd) return "Miễn phí";
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(vnd);
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts.length > 1 ? parts[parts.length - 2][0] + parts[parts.length - 1][0] : parts[0][0]).toUpperCase();
}
