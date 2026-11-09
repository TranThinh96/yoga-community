import Link from "next/link";
import { getTeachers, getUpcomingWorkshops } from "@/lib/content";
import { site } from "@/lib/site";
import { SpineMark } from "@/components/SpineMark";
import { TeacherCard } from "@/components/TeacherCard";
import { WorkshopCard } from "@/components/WorkshopCard";

// Tính lại danh sách workshop sắp tới mỗi giờ
export const revalidate = 3600;

export default function HomePage() {
  const teachers = getTeachers();
  const featured = teachers.filter((t) => t.featured).slice(0, 3);
  const upcoming = getUpcomingWorkshops().slice(0, 4);
  const teacherBySlug = new Map(teachers.map((t) => [t.slug, t]));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <SpineMark className="pointer-events-none absolute -right-16 top-0 h-[130%] w-auto text-moss-500/10 sm:right-10" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-24">
          <p className="text-sm uppercase tracking-[0.2em] text-moss-600">Yoga cân bằng phục hồi</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-ink sm:text-6xl">{site.slogan}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Cộng đồng giáo viên yoga được đào tạo bởi <strong className="text-ink">Chang Chang Khí Thần</strong> – yoga có nền tảng giải phẫu
            và y khoa, lấy hơi thở làm gốc và cột sống làm trọng tâm.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#workshop" className="rounded-full bg-moss-600 px-6 py-3 text-sm font-medium text-sand-50 transition hover:bg-moss-700">
              Xem workshop sắp tới
            </a>
            <Link href="/giao-vien" className="rounded-full border border-moss-600/40 px-6 py-3 text-sm font-medium text-moss-700 transition hover:bg-moss-50">
              Gặp đội ngũ giáo viên
            </Link>
          </div>
        </div>
      </section>

      {/* Triết lý */}
      <section className="border-y border-sand-200 bg-white/50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:grid-cols-3 sm:px-6">
          {site.philosophy.map((p, i) => (
            <div key={p.title}>
              <span className="font-serif text-sm text-earth-500">0{i + 1}</span>
              <h2 className="mt-2 font-serif text-xl text-ink">{p.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workshop sắp tới */}
      <section id="workshop" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-16 sm:px-6">
        <SectionTitle eyebrow="Lịch chung của nhóm" title="Workshop sắp tới" />
        {upcoming.length ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {upcoming.map((w) => (
              <WorkshopCard key={w.slug} workshop={w} teacher={teacherBySlug.get(w.teacher)} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-ink-soft">Lịch workshop mới sẽ sớm được cập nhật.</p>
        )}
      </section>

      {/* Giáo viên nổi bật */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <SectionTitle eyebrow="Đội ngũ" title="Giáo viên nổi bật" />
          <Link href="/giao-vien" className="shrink-0 text-sm text-moss-700 underline-offset-4 hover:underline">
            Xem tất cả →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((t) => (
            <TeacherCard key={t.slug} teacher={t} />
          ))}
        </div>
      </section>

      {/* Chương trình đào tạo */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="grid gap-8 rounded-3xl bg-moss-700 px-6 py-12 text-sand-50 sm:px-12 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-moss-100">Đào tạo giáo viên</p>
            <h2 className="mt-3 font-serif text-3xl leading-snug">Chương trình đào tạo Giáo viên Yoga Cân bằng Phục hồi</h2>
            <p className="mt-4 leading-relaxed text-moss-100">
              Nền tảng giải phẫu, kỹ thuật hơi thở, căn chỉnh cột sống và phương pháp giảng dạy an toàn – để bạn tự tin dẫn lớp
              và xây dựng thương hiệu cá nhân cùng cộng đồng.
            </p>
          </div>
          <ul className="space-y-3 text-sm">
            {["Giải phẫu ứng dụng & cột sống", "Hơi thở – điều khí", "Thiết kế buổi tập phục hồi", "Thực hành giảng dạy có hướng dẫn"].map((x) => (
              <li key={x} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-sand-300" />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.2em] text-moss-600">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-3xl text-ink">{title}</h2>
    </div>
  );
}
