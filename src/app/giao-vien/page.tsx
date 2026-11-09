import type { Metadata } from "next";
import { getTeachers } from "@/lib/content";
import { TeacherCard } from "@/components/TeacherCard";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Đội ngũ giáo viên",
  description: "Các giáo viên yoga cân bằng phục hồi được đào tạo bởi Chang Chang Khí Thần.",
};

export default function TeachersPage() {
  const teachers = getTeachers();
  return (
    <>
      <PageHero eyebrow="Đội ngũ" title="Giáo viên của cộng đồng"
        intro="Mỗi giáo viên đều được đào tạo theo phương pháp Căn Trục – Điều Khí – Dưỡng Thần, với thế mạnh riêng để đồng hành cùng bạn." />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((t, i) => <TeacherCard key={t.slug} teacher={t} delay={(i % 3) * 120} />)}
        </div>
      </div>
    </>
  );
}
