import Link from "next/link";
import type { Teacher } from "@/lib/content";
import { TeacherAvatar } from "./TeacherAvatar";

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <Link href={`/giao-vien/${teacher.slug}`} className="group block overflow-hidden rounded-2xl border border-sand-200 bg-white/60 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sand-300/40">
      <TeacherAvatar teacher={teacher} className="aspect-[4/3] w-full sm:aspect-[4/5]" sizes="(max-width: 640px) 100vw, 33vw" />
      <div className="p-5">
        <h3 className="font-serif text-lg text-ink group-hover:text-moss-700">{teacher.name}</h3>
        <p className="mt-1 text-sm text-ink-soft">{teacher.title}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {teacher.specialties.slice(0, 3).map((s) => (
            <li key={s} className="rounded-full bg-moss-50 px-2.5 py-1 text-xs text-moss-700">{s}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
