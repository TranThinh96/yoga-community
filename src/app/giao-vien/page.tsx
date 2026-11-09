import type { Metadata } from "next";
import { getTeachers } from "@/lib/content";
import { TeacherCard } from "@/components/TeacherCard";

export const metadata: Metadata = {
  title: "Đội ngũ giáo viên",
  description: "Các giáo viên yoga cân bằng phục hồi được đào tạo bởi Chang Chang Khí Thần.",
};

export default function TeachersPage() {
  const teachers = getTeachers();
  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">
      <p className="text-sm uppercase tracking-[0.2em] text-moss-600">Đội ngũ</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">Giáo viên của cộng đồng</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
        Mỗi giáo viên đều được đào tạo theo phương pháp Căn Trục – Điều Khí – Dưỡng Thần, với thế mạnh riêng để đồng hành cùng bạn.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teachers.map((t) => (
          <TeacherCard key={t.slug} teacher={t} />
        ))}
      </div>
    </div>
  );
}
