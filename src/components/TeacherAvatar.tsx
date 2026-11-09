import Image from "next/image";
import { initials } from "@/lib/format";
import type { Teacher } from "@/lib/content";
import { SpineMark } from "./SpineMark";

export function TeacherAvatar({ teacher, className = "", sizes = "300px", priority = false, compact = false }: { teacher: Pick<Teacher, "name" | "photo">; className?: string; sizes?: string; priority?: boolean; compact?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-moss-100 via-sand-100 to-sand-300 ${className}`}>
      {teacher.photo ? (
        <Image src={teacher.photo} alt={teacher.name} fill sizes={sizes} priority={priority} className="zoom-media object-cover" />
      ) : (
        <div className="zoom-media absolute inset-0" aria-hidden>
          {!compact && <SpineMark className="absolute top-1/2 left-1/2 h-[120%] w-auto -translate-x-1/2 -translate-y-1/2 text-moss-500/15" />}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-serif text-moss-700/80 ${compact ? "text-lg" : "text-5xl"}`}>{initials(teacher.name)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
