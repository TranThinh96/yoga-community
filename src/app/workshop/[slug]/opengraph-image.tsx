import { renderOg, ogSize } from "@/lib/og";
import { getTeacher, getWorkshops } from "@/lib/content";
import { formatDate, formatPrice, formatTime } from "@/lib/format";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Workshop";

export function generateStaticParams() {
  return getWorkshops().map((w) => ({ slug: w.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWorkshops().find((x) => x.slug === slug);
  if (!w) return renderOg({ eyebrow: "WORKSHOP", title: site.name, footer: site.slogan });
  const teacher = getTeacher(w.teacher);
  return renderOg({
    eyebrow: `WORKSHOP ${w.format === "online" ? "ONLINE" : "OFFLINE"} · ${formatPrice(w.price).replace("₫", "VNĐ").toUpperCase()}`,
    title: w.title,
    subtitle: `${formatDate(w.startAt)} · ${formatTime(w.startAt)}${teacher ? ` · ${teacher.name}` : ""}`,
    footer: `${site.name} – ${site.slogan}`,
  });
}
