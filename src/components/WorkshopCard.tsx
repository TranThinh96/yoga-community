import Link from "next/link";
import type { Teacher, Workshop } from "@/lib/content";
import { formatDayMonth, formatDate, formatPrice, formatTime } from "@/lib/format";

export function WorkshopCard({ workshop, teacher, past = false }: { workshop: Workshop; teacher?: Teacher; past?: boolean }) {
  const { day, month } = formatDayMonth(workshop.startAt);
  return (
    <Link href={`/workshop/${workshop.slug}`} className={`group flex gap-4 rounded-2xl border border-sand-200 bg-white/60 p-4 transition hover:border-moss-500/50 hover:shadow-md hover:shadow-sand-300/40 sm:p-5 ${past ? "opacity-70" : ""}`}>
      <div className={`flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-xl ${past ? "bg-sand-300 text-ink" : "bg-moss-600 text-sand-50"}`}>
        <span className="text-xl font-semibold leading-none">{day}</span>
        <span className="mt-1 text-[11px] uppercase tracking-wide">Th {month}</span>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className={`rounded-full px-2 py-0.5 ${workshop.format === "online" ? "bg-sky-50 text-sky-800" : "bg-earth-500/10 text-earth-700"}`}>
            {workshop.format === "online" ? "Online · Zoom" : "Offline"}
          </span>
          <span className="font-medium text-moss-700">{formatPrice(workshop.price)}</span>
          {past ? <span className="text-ink-soft">Đã diễn ra</span> : null}
        </div>
        <h3 className="mt-1.5 font-serif text-lg leading-snug text-ink group-hover:text-moss-700">{workshop.title}</h3>
        <p className="mt-1 text-sm text-ink-soft">
          {formatDate(workshop.startAt)} · {formatTime(workshop.startAt)}–{formatTime(workshop.endAt)} (giờ VN)
        </p>
        <p className="mt-0.5 text-sm text-ink-soft">
          {teacher ? <>Giáo viên: <span className="text-ink">{teacher.name}</span></> : null}
          {workshop.format === "offline" && workshop.location ? <> · {workshop.location}</> : null}
        </p>
      </div>
    </Link>
  );
}
