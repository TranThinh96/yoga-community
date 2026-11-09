import Link from "next/link";
import type { Teacher, Workshop } from "@/lib/content";
import { formatDayMonth, formatDate, formatPrice, formatTime } from "@/lib/format";
import { IconArrow, IconClock, IconPin, IconVideo } from "./Icons";

export function WorkshopCard({ workshop, teacher, past = false, delay = 0 }: { workshop: Workshop; teacher?: Teacher; past?: boolean; delay?: number }) {
  const { day, month } = formatDayMonth(workshop.startAt);
  const online = workshop.format === "online";
  return (
    <Link href={`/workshop/${workshop.slug}`} data-reveal style={{ ["--d" as string]: `${delay}ms` }}
      className={`group card card-hover flex gap-5 p-5 sm:p-6 ${past ? "opacity-75 saturate-50" : ""}`}>
      <div className={`flex w-[4.5rem] shrink-0 flex-col items-center justify-center rounded-2xl py-3 transition-colors duration-500 ${past ? "bg-sand-200 text-ink-soft" : "bg-moss-700 text-sand-50 group-hover:bg-moss-800"}`}>
        <span className="font-serif text-3xl leading-none">{day}</span>
        <span className="mt-1.5 text-[11px] tracking-[0.15em] uppercase opacity-80">Th {month}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium ${online ? "bg-moss-50 text-moss-700" : "bg-earth-400/15 text-earth-700"}`}>
            {online ? <IconVideo className="h-3.5 w-3.5" /> : <IconPin className="h-3.5 w-3.5" />}
            {online ? "Online · Zoom" : "Trực tiếp"}
          </span>
          <span className="font-medium text-ink">{formatPrice(workshop.price)}</span>
          {past ? <span className="text-ink-soft">· Đã diễn ra</span> : null}
        </div>
        <h3 className="mt-2.5 font-serif text-[1.3rem] leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-moss-700">{workshop.title}</h3>
        <p className="mt-2 flex items-start gap-1.5 text-sm text-ink-soft">
          <IconClock className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{formatDate(workshop.startAt)} · {formatTime(workshop.startAt)}–{formatTime(workshop.endAt)}</span>
        </p>
        {!online && workshop.location ? (
          <p className="mt-1 flex items-start gap-1.5 text-sm text-ink-soft"><IconPin className="mt-0.5 h-4 w-4 shrink-0" /><span>{workshop.location}</span></p>
        ) : null}
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-sand-200 pt-4 text-sm">
          <span className="text-ink-soft">{teacher ? <>Cùng <span className="text-ink">{teacher.name}</span></> : null}</span>
          <span className="flex shrink-0 items-center gap-1.5 font-medium text-moss-700">{past ? "Xem lại" : "Chi tiết"} <IconArrow /></span>
        </div>
      </div>
    </Link>
  );
}
