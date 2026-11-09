import Image from "next/image";
import { initials } from "@/lib/format";
import type { Teacher } from "@/lib/content";

export function TeacherAvatar({ teacher, className = "", sizes = "300px", priority = false }: { teacher: Pick<Teacher, "name" | "photo">; className?: string; sizes?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-moss-100 via-sand-200 to-sand-300 ${className}`}>
      {teacher.photo ? (
        <Image src={teacher.photo} alt={teacher.name} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center font-serif text-4xl text-moss-700/70">
          {initials(teacher.name)}
        </div>
      )}
    </div>
  );
}
