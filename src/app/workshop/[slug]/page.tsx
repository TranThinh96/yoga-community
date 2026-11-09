import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeacher, getWorkshops } from "@/lib/content";
import { formatDate, formatPrice, formatTime } from "@/lib/format";
import { googleCalendarUrl } from "@/lib/calendar";
import { TeacherAvatar } from "@/components/TeacherAvatar";
import { IconArrow, IconArrowLeft, IconCalendar, IconClock, IconPin, IconTicket, IconUsers, IconVideo } from "@/components/Icons";
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
  const description = `${formatDate(w.startAt)}, ${formatTime(w.startAt)} · ${w.format === "online" ? "Online qua Zoom" : w.location ?? "Trực tiếp"} · ${formatPrice(w.price)}${teacher ? ` · ${teacher.name}` : ""}. ${w.description}`;
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
  const online = w.format === "online";

  const facts = [
    { icon: IconCalendar, label: "Ngày", value: formatDate(w.startAt) },
    { icon: IconClock, label: "Giờ (giờ Việt Nam)", value: `${formatTime(w.startAt)} – ${formatTime(w.endAt)}` },
    { icon: online ? IconVideo : IconPin, label: online ? "Hình thức" : "Địa điểm", value: online ? "Online qua Zoom · link gửi qua email sau khi đăng ký" : w.location ?? "Trực tiếp" },
    { icon: IconTicket, label: "Học phí", value: formatPrice(w.price) },
    ...(w.capacity ? [{ icon: IconUsers, label: "Số lượng", value: `Tối đa ${w.capacity} học viên` }] : []),
  ];

  return (
    <>
      <section className="paper -mt-16 pt-16 sm:-mt-20 sm:pt-20">
        <div className="mx-auto max-w-6xl px-5 pt-8 pb-12 sm:px-8 sm:pt-12 sm:pb-16">
          <Link href="/workshop" className="group inline-flex min-h-11 items-center gap-2 text-sm text-ink-soft transition-colors hover:text-moss-700">
            <IconArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" /> Lịch workshop
          </Link>
          <div className="fade-up mt-6 flex flex-wrap items-center gap-2 text-sm" style={{ ["--d" as string]: "100ms" }}>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium ${online ? "bg-moss-50 text-moss-700" : "bg-earth-400/15 text-earth-700"}`}>
              {online ? <IconVideo className="h-4 w-4" /> : <IconPin className="h-4 w-4" />}
              {online ? "Online · Zoom" : "Trực tiếp"}
            </span>
            {isPast && <span className="rounded-full bg-sand-200 px-3 py-1.5 text-ink-soft">Đã diễn ra</span>}
          </div>
          <h1 className="mt-5 max-w-4xl font-serif text-[2.3rem] leading-[1.1] tracking-tight text-ink sm:text-[3.4rem]">
            <span className="line-mask"><span style={{ ["--d" as string]: "150ms" }}>{w.title}</span></span>
          </h1>
          <p className="fade-up mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft" style={{ ["--d" as string]: "350ms" }}>{w.description}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 pt-4 lg:grid-cols-[1fr_400px] lg:items-start lg:gap-14">
          <div>
            <dl data-reveal className="grid gap-px overflow-hidden rounded-3xl border border-sand-200 bg-sand-200 sm:grid-cols-2">
              {facts.map((f, i) => (
                <div key={f.label} className={`flex gap-4 bg-white/90 p-5 sm:p-6 ${i === facts.length - 1 && facts.length % 2 === 1 ? "sm:col-span-2" : ""}`}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-moss-50 text-moss-700"><f.icon /></span>
                  <div>
                    <dt className="text-xs tracking-[0.12em] text-ink-soft uppercase">{f.label}</dt>
                    <dd className="mt-1 leading-snug text-ink">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            {!isPast && (
              <div data-reveal className="mt-5 flex flex-wrap gap-2">
                <a href={googleCalendarUrl(w)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-11 !px-5 text-sm">
                  <IconCalendar className="h-4 w-4" /> Thêm vào Google Calendar
                </a>
                <a href={`/workshop/${w.slug}/lich.ics`} className="btn btn-ghost !min-h-11 !px-5 text-sm">
                  <IconCalendar className="h-4 w-4" /> Lịch điện thoại (.ics)
                </a>
              </div>
            )}

            {w.bodyHtml.trim() && (
              <section data-reveal className="mt-14">
                <p className="eyebrow">Nội dung</p>
                <div className="prose-vi mt-6" dangerouslySetInnerHTML={{ __html: w.bodyHtml }} />
              </section>
            )}

            {teacher && (
              <Link href={`/giao-vien/${teacher.slug}`} data-reveal className="group card card-hover mt-14 flex items-center gap-5 p-5 sm:p-6">
                <TeacherAvatar teacher={teacher} compact className="h-20 w-20 shrink-0 rounded-2xl" sizes="80px" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs tracking-[0.15em] text-ink-soft uppercase">Giáo viên hướng dẫn</p>
                  <p className="mt-1 font-serif text-xl tracking-tight text-ink transition-colors group-hover:text-moss-700">{teacher.name}</p>
                  <p className="mt-0.5 text-sm text-ink-soft">{teacher.title}</p>
                </div>
                <IconArrow className="h-5 w-5 shrink-0 text-moss-600" />
              </Link>
            )}
          </div>

          <aside id="dang-ky" data-reveal style={{ ["--d" as string]: "150ms" }}
            className="scroll-mt-24 rounded-[1.75rem] border border-sand-200 bg-white p-6 shadow-[0_30px_70px_-40px_rgb(67_77_47/0.45)] sm:p-8 lg:sticky lg:top-28">
            <div className="flex items-baseline justify-between gap-4 border-b border-sand-200 pb-5">
              <h2 className="font-serif text-2xl tracking-tight text-ink">Đăng ký tham gia</h2>
              <span className="shrink-0 font-serif text-xl text-moss-700">{formatPrice(w.price)}</span>
            </div>
            {isPast ? (
              <p className="mt-5 leading-relaxed text-ink-soft">
                Buổi workshop này đã diễn ra. Xem các buổi sắp tới tại <Link href="/workshop" className="text-moss-700 underline underline-offset-4">lịch workshop</Link>.
              </p>
            ) : w.registrationUrl ? (
              <>
                <p className="mt-5 text-sm leading-relaxed text-ink-soft">Workshop này đăng ký trực tiếp qua Zoom.</p>
                <a href={w.registrationUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6 w-full">
                  Đăng ký qua Zoom <IconArrow />
                </a>
              </>
            ) : (
              <div className="mt-6"><RegisterForm slug={w.slug} /></div>
            )}
          </aside>
        </div>
      </div>

      {/* Thanh đăng ký cố định trên điện thoại */}
      {!isPast && <div className="h-16 lg:hidden" aria-hidden />}
      {!isPast && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sand-200 bg-sand-50/90 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-xs text-ink-soft">{formatDate(w.startAt)} · {formatTime(w.startAt)}</p>
              <p className="font-serif text-lg text-ink">{formatPrice(w.price)}</p>
            </div>
            <a href={w.registrationUrl ?? "#dang-ky"} {...(w.registrationUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="btn btn-primary shrink-0">
              Đăng ký ngay
            </a>
          </div>
        </div>
      )}
    </>
  );
}
