import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeacher, getTeachers, getUpcomingWorkshops } from "@/lib/content";
import { TeacherAvatar } from "@/components/TeacherAvatar";
import { TrainedBadge } from "@/components/TrainedBadge";
import { WorkshopCard } from "@/components/WorkshopCard";
import { SocialLinks } from "@/components/SocialLinks";

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
    <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 sm:pt-12">
      <Link href="/giao-vien" className="text-sm text-ink-soft hover:text-moss-700">← Đội ngũ giáo viên</Link>

      <header className="mt-6 grid gap-8 md:grid-cols-[280px_1fr] md:items-start">
        <TeacherAvatar teacher={teacher} className="aspect-square w-40 rounded-3xl sm:w-56 md:aspect-[4/5] md:w-full md:max-w-[280px]" sizes="280px" priority />
        <div>
          <TrainedBadge />
          <h1 className="mt-5 font-serif text-4xl leading-tight text-ink">{teacher.name}</h1>
          <p className="mt-2 text-lg text-moss-700">{teacher.title}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{teacher.bio}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {teacher.specialties.map((s) => (
              <li key={s} className="rounded-full bg-moss-50 px-3 py-1 text-sm text-moss-700">{s}</li>
            ))}
          </ul>
          <SocialLinks socials={teacher.socials} className="mt-6" />
        </div>
      </header>

      <div className="mt-14 grid gap-12 md:grid-cols-[1fr_280px]">
        <section>
          <h2 className="font-serif text-2xl text-ink">Giới thiệu</h2>
          <div className="prose-vi mt-4" dangerouslySetInnerHTML={{ __html: teacher.bodyHtml }} />
        </section>
        {teacher.certifications.length > 0 && (
          <aside>
            <h2 className="font-serif text-2xl text-ink">Chứng chỉ</h2>
            <ul className="mt-4 space-y-3">
              {teacher.certifications.map((c) => (
                <li key={c} className="rounded-xl border border-sand-200 bg-white/60 px-4 py-3 text-sm text-ink-soft">{c}</li>
              ))}
            </ul>
          </aside>
        )}
      </div>

      <section className="mt-14">
        <h2 className="font-serif text-2xl text-ink">Workshop sắp tới</h2>
        {workshops.length ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {workshops.map((w) => <WorkshopCard key={w.slug} workshop={w} />)}
          </div>
        ) : (
          <p className="mt-4 text-ink-soft">Hiện chưa có lịch workshop. Hãy liên hệ trực tiếp với giáo viên để được thông báo sớm nhất.</p>
        )}
      </section>
      {/* Bài viết của giáo viên: thêm ở bước 3 (mục Kiến thức) */}
    </div>
  );
}
