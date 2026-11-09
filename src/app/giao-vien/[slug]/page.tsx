import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeacher, getTeachers, getUpcomingWorkshops } from "@/lib/content";
import { TeacherAvatar } from "@/components/TeacherAvatar";
import { TrainedBadge } from "@/components/TrainedBadge";
import { WorkshopCard } from "@/components/WorkshopCard";
import { SocialLinks } from "@/components/SocialLinks";
import { IconArrowLeft, IconAward } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return getTeachers().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const teacher = getTeacher((await params).slug);
  if (!teacher) return {};
  const title = `${teacher.name} – ${teacher.title}`;
  return {
    title,
    description: teacher.bio,
    alternates: { canonical: `/giao-vien/${teacher.slug}` },
    openGraph: { title, description: teacher.bio, type: "profile", url: `/giao-vien/${teacher.slug}` },
  };
}

export default async function TeacherPage({ params }: Props) {
  const teacher = getTeacher((await params).slug);
  if (!teacher) notFound();
  const workshops = getUpcomingWorkshops(teacher.slug);

  return (
    <>
      <section className="paper -mt-16 pt-16 sm:-mt-20 sm:pt-20">
        <div className="mx-auto max-w-6xl px-5 pt-8 pb-14 sm:px-8 sm:pt-12 sm:pb-20">
          <Link href="/giao-vien" className="group inline-flex min-h-11 items-center gap-2 text-sm text-ink-soft transition-colors hover:text-moss-700">
            <IconArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" /> Đội ngũ giáo viên
          </Link>
          <div className="mt-6 grid gap-10 md:grid-cols-[minmax(0,340px)_1fr] md:items-center md:gap-14">
            <div className="fade-up relative mx-auto w-full max-w-[300px] md:max-w-none" style={{ ["--d" as string]: "100ms" }}>
              <div className="absolute -inset-3 -z-10 rotate-3 rounded-[2.2rem] bg-moss-100/70" aria-hidden />
              <TeacherAvatar teacher={teacher} className="aspect-[4/5] w-full rounded-[2rem] shadow-[0_30px_60px_-30px_rgb(67_77_47/0.45)]" sizes="340px" priority />
            </div>
            <div>
              <div className="fade-up" style={{ ["--d" as string]: "200ms" }}><TrainedBadge /></div>
              <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.05] tracking-tight text-ink sm:text-6xl">
                <span className="line-mask"><span style={{ ["--d" as string]: "250ms" }}>{teacher.name}</span></span>
              </h1>
              <p className="fade-up mt-3 font-serif text-xl text-moss-700 italic" style={{ ["--d" as string]: "400ms" }}>{teacher.title}</p>
              <p className="fade-up mt-5 max-w-xl text-lg leading-relaxed text-ink-soft" style={{ ["--d" as string]: "500ms" }}>{teacher.bio}</p>
              <ul className="fade-up mt-6 flex flex-wrap gap-2" style={{ ["--d" as string]: "600ms" }}>
                {teacher.specialties.map((s) => (
                  <li key={s} className="rounded-full border border-moss-100 bg-moss-50 px-3.5 py-1.5 text-sm text-moss-700">{s}</li>
                ))}
              </ul>
              <div className="fade-up" style={{ ["--d" as string]: "700ms" }}><SocialLinks socials={teacher.socials} className="mt-8" /></div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 pt-16 md:grid-cols-[1fr_320px] md:gap-16">
          <section data-reveal>
            <p className="eyebrow">Giới thiệu</p>
            <div className="prose-vi mt-6" dangerouslySetInnerHTML={{ __html: teacher.bodyHtml }} />
          </section>
          {teacher.certifications.length > 0 && (
            <aside data-reveal style={{ ["--d" as string]: "150ms" }}>
              <p className="eyebrow">Chứng chỉ</p>
              <ul className="mt-6 space-y-3">
                {teacher.certifications.map((c) => (
                  <li key={c} className="card flex items-start gap-3 px-5 py-4 text-sm leading-relaxed text-ink">
                    <IconAward className="mt-0.5 h-5 w-5 shrink-0 text-moss-600" />{c}
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>

        <section className="pt-20">
          <div data-reveal>
            <p className="eyebrow">Lịch dạy</p>
            <h2 className="mt-4 font-serif text-3xl tracking-tight text-ink sm:text-4xl">Workshop sắp tới</h2>
          </div>
          {workshops.length ? (
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {workshops.map((w, i) => <WorkshopCard key={w.slug} workshop={w} delay={i * 100} />)}
            </div>
          ) : (
            <p data-reveal className="card mt-8 p-6 text-ink-soft">Hiện chưa có lịch workshop. Hãy liên hệ trực tiếp với giáo viên để được thông báo sớm nhất.</p>
          )}
        </section>
        {/* Bài viết của giáo viên: thêm ở bước 3 (mục Kiến thức) */}
      </div>
    </>
  );
}
