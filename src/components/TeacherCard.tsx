import Link from "next/link";
import type { Teacher } from "@/lib/content";
import { TeacherAvatar } from "./TeacherAvatar";
import { IconArrow } from "./Icons";

export function TeacherCard({ teacher, delay = 0 }: { teacher: Teacher; delay?: number }) {
  return (
    <Link href={`/giao-vien/${teacher.slug}`} data-reveal style={{ ["--d" as string]: `${delay}ms` }}
      className="group card card-hover flex flex-col overflow-hidden">
      <div className="p-2.5 pb-0">
        <TeacherAvatar teacher={teacher} className="aspect-[4/3] w-full rounded-[1.1rem] sm:aspect-[5/6]" sizes="(max-width: 640px) 100vw, 33vw" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl tracking-tight text-ink transition-colors duration-300 group-hover:text-moss-700">{teacher.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{teacher.title}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {teacher.specialties.slice(0, 3).map((s) => (
            <li key={s} className="rounded-full border border-moss-100 bg-moss-50 px-2.5 py-1 text-xs text-moss-700">{s}</li>
          ))}
        </ul>
        <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-moss-700">
          Xem hồ sơ <IconArrow />
        </span>
      </div>
    </Link>
  );
}
