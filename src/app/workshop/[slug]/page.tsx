import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeacher, getWorkshops } from "@/lib/content";
import { formatDate, formatPrice, formatTime } from "@/lib/format";
import { googleCalendarUrl } from "@/lib/calendar";
import { TeacherAvatar } from "@/components/TeacherAvatar";
import { RegisterForm } from "./RegisterForm";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const revalidate = 3600;

const find = (slug: string) => getWorkshops().find((w) => w.slug === slug);

export function generateStaticParams() {
  return getWorkshops().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const w = find((await params).slug);
  if (!w) return {};
  const teacher = getTeacher(w.teacher);
  const description = `${formatDate(w.startAt)}, ${formatTime(w.startAt)} · ${w.format === "online" ? "Online qua Zoom" : w.location ?? "Offline"} · ${formatPrice(w.price)}${teacher ? ` · ${teacher.name}` : ""}. ${w.description}`;
  return {
    title: w.title,
    description,
    alternates: { canonical: `/workshop/${w.slug}` },
    openGraph: { title: w.title, description, type: "article", url: `/workshop/${w.slug}` },
  };
}

export default async function WorkshopPage({ params }: Props) {
  const w = find((await params).slug);
  if (!w) notFound();
  const teacher = getTeacher(w.teacher);
  const isPast = w.endAt < new Date();

  return (
    <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 sm:pt-12">
      <Link href="/workshop" className="text-sm text-ink-soft hover:text-moss-700">← Lịch workshop</Link>

      <div className="mt-6 grid gap-10 md:grid-cols-[1fr_360px] md:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className={`rounded-full px-3 py-1 ${w.format === "online" ? "bg-sky-50 text-sky-800" : "bg-earth-500/10 text-earth-700"}`}>
              {w.format === "online" ? "Online · Zoom" : "Offline"}
            </span>
            {isPast && <span className="rounded-full bg-sand-200 px-3 py-1 text-ink-soft">Đã diễn ra</span>}
          </div>
          <h1 className="mt-4 font-serif text-3xl leading-tight text-ink sm:text-4xl">{w.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{w.description}</p>

          <dl className="mt-8 divide-y divide-sand-200 rounded-2xl border border-sand-200 bg-white/60">
            <Info label="Thời gian">
              {formatDate(w.startAt)}
              <br />
              {formatTime(w.startAt)} – {formatTime(w.endAt)} <span className="text-ink-soft">(giờ Việt Nam)</span>
            </Info>
            <Info label="Địa điểm">
              {w.format === "online" ? "Online qua Zoom – link tham gia được gửi qua email sau khi đăng ký" : w.location}
            </Info>
            <Info label="Học phí"><span className="font-medium text-moss-700">{formatPrice(w.price)}</span></Info>
            {w.capacity ? <Info label="Số lượng">Tối đa {w.capacity} học viên</Info> : null}
          </dl>

          {!isPast && (
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={googleCalendarUrl(w)} target="_blank" rel="noopener noreferrer"
                className="rounded-full border border-sand-300 bg-white/70 px-4 py-2 text-sm text-ink hover:border-moss-500">
                + Google Calendar
              </a>
              <a href={`/workshop/${w.slug}/lich.ics`}
                className="rounded-full border border-sand-300 bg-white/70 px-4 py-2 text-sm text-ink hover:border-moss-500">
                + Lịch điện thoại (.ics)
              </a>
            </div>
          )}

          {!isPast && (
            <a href="#dang-ky" className="mt-6 block rounded-full bg-moss-600 px-6 py-3.5 text-center font-medium text-sand-50 md:hidden">
              Đăng ký ngay
            </a>
          )}

          {w.bodyHtml.trim() && <div className="prose-vi mt-10" dangerouslySetInnerHTML={{ __html: w.bodyHtml }} />}

          {teacher && (
            <Link href={`/giao-vien/${teacher.slug}`} className="mt-10 flex items-center gap-4 rounded-2xl border border-sand-200 bg-white/60 p-4 hover:border-moss-500/50">
              <TeacherAvatar teacher={teacher} className="h-16 w-16 shrink-0 rounded-full [&>div]:text-xl" sizes="64px" />
              <div>
                <p className="text-sm text-ink-soft">Giáo viên hướng dẫn</p>
                <p className="font-serif text-lg text-ink">{teacher.name}</p>
                <p className="text-sm text-moss-700">{teacher.title}</p>
              </div>
            </Link>
          )}
        </div>

        <aside id="dang-ky" className="scroll-mt-20 rounded-3xl border border-sand-200 bg-sand-100 p-5 sm:p-6 md:sticky md:top-24">
          <h2 className="font-serif text-2xl text-ink">Đăng ký tham gia</h2>
          {isPast ? (
            <p className="mt-3 text-ink-soft">Buổi workshop này đã diễn ra. Xem các buổi sắp tới tại <Link href="/workshop" className="text-moss-700 underline">lịch workshop</Link>.</p>
          ) : w.registrationUrl ? (
            <>
              <p className="mt-3 text-sm text-ink-soft">Workshop này đăng ký trực tiếp qua Zoom.</p>
              <a href={w.registrationUrl} target="_blank" rel="noopener noreferrer"
                className="mt-5 block rounded-full bg-moss-600 px-6 py-3.5 text-center font-medium text-sand-50 hover:bg-moss-700">
                Đăng ký qua Zoom
              </a>
            </>
          ) : (
            <div className="mt-5"><RegisterForm slug={w.slug} /></div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[96px_1fr] gap-3 px-5 py-4 text-sm sm:text-base">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}
