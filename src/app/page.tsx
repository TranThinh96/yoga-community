import Link from "next/link";
import { getTeachers, getUpcomingWorkshops } from "@/lib/content";
import { site } from "@/lib/site";
import { BreathOrb } from "@/components/BreathOrb";
import { SectionHeading } from "@/components/SectionHeading";
import { SpineMark } from "@/components/SpineMark";
import { TeacherCard } from "@/components/TeacherCard";
import { WorkshopCard } from "@/components/WorkshopCard";
import { IconArrow, IconBalance, IconBreath, IconCheck, IconSpine } from "@/components/Icons";

// Tính lại danh sách workshop sắp tới mỗi giờ
export const revalidate = 3600;

const pillars = [
  { icon: IconBreath, ...site.philosophy[0] },
  { icon: IconBalance, ...site.philosophy[1] },
  { icon: IconSpine, ...site.philosophy[2] },
];

const curriculum = [
  "Giải phẫu ứng dụng & sinh cơ học cột sống",
  "Hơi thở – điều khí, điều hoà hệ thần kinh",
  "Thiết kế buổi tập phục hồi an toàn",
  "Thực hành giảng dạy có người hướng dẫn",
];

export default function HomePage() {
  const teachers = getTeachers();
  const featured = teachers.filter((t) => t.featured).slice(0, 3);
  const upcoming = getUpcomingWorkshops().slice(0, 4);
  const teacherBySlug = new Map(teachers.map((t) => [t.slug, t]));

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="paper relative -mt-16 overflow-hidden pt-16 sm:-mt-20 sm:pt-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-12 pb-20 sm:px-8 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-6 lg:pb-28">
          <div>
            <p className="eyebrow fade-up" style={{ ["--d" as string]: "100ms" }}>Yoga cân bằng phục hồi</p>
            <h1 className="mt-6 font-serif text-[3.1rem] leading-[1.02] tracking-tight text-ink sm:text-7xl lg:text-[5.2rem]">
              <span className="line-mask"><span style={{ ["--d" as string]: "150ms" }}>Căn Trục</span></span>
              <span className="line-mask"><span style={{ ["--d" as string]: "280ms" }} className="text-moss-600 italic">Điều Khí</span></span>
              <span className="line-mask"><span style={{ ["--d" as string]: "410ms" }}>Dưỡng Thần</span></span>
            </h1>
            <p className="fade-up mt-8 max-w-xl text-lg leading-relaxed text-ink-soft" style={{ ["--d" as string]: "650ms" }}>
              Cộng đồng giáo viên được đào tạo bởi <strong className="font-semibold text-ink">Chang Chang Khí Thần</strong> — yoga có nền tảng
              giải phẫu và y khoa, lấy hơi thở làm gốc và cột sống làm trọng tâm.
            </p>
            <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "800ms" }}>
              <Link href="/workshop" className="btn btn-primary">Xem lịch workshop <IconArrow /></Link>
              <Link href="/giao-vien" className="btn btn-ghost">Gặp đội ngũ giáo viên</Link>
            </div>
            <dl className="fade-up mt-12 flex gap-10 border-t border-sand-200 pt-6" style={{ ["--d" as string]: "950ms" }}>
              <div>
                <dt className="text-xs tracking-[0.15em] text-ink-soft uppercase">Giáo viên</dt>
                <dd className="mt-1 font-serif text-3xl text-ink">{teachers.length}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.15em] text-ink-soft uppercase">Workshop sắp tới</dt>
                <dd className="mt-1 font-serif text-3xl text-ink">{getUpcomingWorkshops().length}</dd>
              </div>
            </dl>
          </div>
          <div className="fade-up mx-auto w-full max-w-[340px] sm:max-w-[440px] lg:max-w-none" style={{ ["--d" as string]: "300ms" }}>
            <BreathOrb />
          </div>
        </div>
      </section>

      {/* ---------- Triết lý ---------- */}
      <section className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 sm:pt-32">
        <SectionHeading eyebrow="Triết lý" title={<>Ba nền tảng của <span className="text-moss-600 italic">một cơ thể khoẻ</span></>}
          intro="Phương pháp được xây dựng từ hiểu biết giải phẫu và thực hành lâu năm — nhẹ nhàng, an toàn và bền vững." />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <article key={p.title} data-reveal style={{ ["--d" as string]: `${i * 120}ms` }} className="group card card-hover relative overflow-hidden p-7 sm:p-8">
              <span className="absolute top-6 right-7 font-serif text-5xl text-sand-200 transition-colors duration-500 group-hover:text-moss-100">0{i + 1}</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-moss-50 text-moss-700 transition-transform duration-500 group-hover:-rotate-6">
                <p.icon />
              </span>
              <h3 className="mt-8 font-serif text-2xl tracking-tight text-ink">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Workshop sắp tới ---------- */}
      <section id="workshop" className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-24 sm:px-8 sm:pt-32">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Lịch chung của nhóm" title="Workshop sắp tới" />
          <Link href="/workshop" data-reveal className="group flex shrink-0 items-center gap-2 text-sm font-medium text-moss-700">
            <span className="link-underline">Xem toàn bộ lịch</span> <IconArrow />
          </Link>
        </div>
        {upcoming.length ? (
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {upcoming.map((w, i) => (
              <WorkshopCard key={w.slug} workshop={w} teacher={teacherBySlug.get(w.teacher)} delay={i * 100} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-ink-soft" data-reveal>Lịch workshop mới sẽ sớm được cập nhật.</p>
        )}
      </section>

      {/* ---------- Câu triết lý ---------- */}
      <section className="relative mt-24 overflow-hidden sm:mt-32">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8">
          <SpineMark className="mx-auto h-16 w-10 text-moss-500" />
          <blockquote data-reveal className="mt-8 font-serif text-[1.9rem] leading-snug tracking-tight text-ink sm:text-5xl sm:leading-tight">
            “Hơi thở làm gốc – <span className="text-moss-600 italic">Cân bằng</span> làm hướng đi – Cột sống làm trọng tâm.”
          </blockquote>
          <p data-reveal style={{ ["--d" as string]: "150ms" }} className="mt-6 text-sm tracking-[0.2em] text-ink-soft uppercase">— {site.name}</p>
        </div>
      </section>

      {/* ---------- Giáo viên nổi bật ---------- */}
      <section className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Đội ngũ" title="Giáo viên nổi bật" intro="Mỗi giáo viên mang một thế mạnh riêng, cùng chung một nền tảng phương pháp." />
          <Link href="/giao-vien" data-reveal className="group flex shrink-0 items-center gap-2 text-sm font-medium text-moss-700">
            <span className="link-underline">Tất cả giáo viên</span> <IconArrow />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((t, i) => <TeacherCard key={t.slug} teacher={t} delay={i * 120} />)}
        </div>
      </section>

      {/* ---------- Chương trình đào tạo ---------- */}
      <section className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 sm:pt-32">
        <div data-reveal="scale" className="relative overflow-hidden rounded-[2rem] bg-moss-800 px-6 py-14 text-sand-50 sm:px-14 sm:py-20">
          <div className="float-slow absolute -top-24 -right-24 h-80 w-80 bg-moss-700/60 [border-radius:var(--radius-organic)]" aria-hidden />
          <div className="float-slow absolute -bottom-32 -left-20 h-72 w-72 bg-moss-900/50 [border-radius:var(--radius-organic)] [animation-delay:-6s]" aria-hidden />
          <div className="relative grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div>
              <p className="eyebrow !text-moss-200">Đào tạo giáo viên</p>
              <h2 className="mt-5 font-serif text-[2rem] leading-[1.15] tracking-tight sm:text-5xl">
                Trở thành giáo viên <span className="text-moss-200 italic">Yoga Cân bằng Phục hồi</span>
              </h2>
              <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-moss-100">
                Nền tảng giải phẫu, kỹ thuật hơi thở, căn chỉnh cột sống và phương pháp giảng dạy an toàn — để bạn tự tin dẫn lớp
                và xây dựng thương hiệu cá nhân cùng cộng đồng.
              </p>
            </div>
            <ul className="space-y-3">
              {curriculum.map((x, i) => (
                <li key={x} data-reveal style={{ ["--d" as string]: `${200 + i * 90}ms` }}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-sm">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand-50 text-moss-800"><IconCheck className="h-4 w-4" /></span>
                  <span className="leading-relaxed">{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
