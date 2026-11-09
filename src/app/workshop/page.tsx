import type { Metadata } from "next";
import Link from "next/link";
import { getTeachers, getWorkshops } from "@/lib/content";
import { WorkshopCard } from "@/components/WorkshopCard";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Lịch workshop",
  description: "Lịch workshop yoga cân bằng phục hồi của cả nhóm giáo viên – online qua Zoom và trực tiếp.",
  alternates: { canonical: "/workshop" },
};

type Props = { searchParams: Promise<{ "giao-vien"?: string; "hinh-thuc"?: string }> };

export default async function WorkshopsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const teacherFilter = sp["giao-vien"];
  const formatFilter = sp["hinh-thuc"] === "online" || sp["hinh-thuc"] === "offline" ? sp["hinh-thuc"] : undefined;

  const teachers = getTeachers();
  const teacherBySlug = new Map(teachers.map((t) => [t.slug, t]));
  const now = new Date();
  const filtered = getWorkshops().filter(
    (w) => (!teacherFilter || w.teacher === teacherFilter) && (!formatFilter || w.format === formatFilter),
  );
  const upcoming = filtered.filter((w) => w.endAt >= now);
  const past = filtered.filter((w) => w.endAt < now).reverse();

  const href = (patch: Record<string, string | undefined>) => {
    const q = new URLSearchParams();
    const next = { "giao-vien": teacherFilter, "hinh-thuc": formatFilter, ...patch };
    for (const [k, v] of Object.entries(next)) if (v) q.set(k, v);
    const s = q.toString();
    return s ? `/workshop?${s}` : "/workshop";
  };

  return (
    <>
      <PageHero eyebrow="Lịch chung của nhóm" title="Lịch workshop"
        intro="Các buổi workshop online qua Zoom và trực tiếp của đội ngũ giáo viên. Thời gian hiển thị theo giờ Việt Nam.">
        <div className="mt-10 space-y-3">
          <FilterRow label="Hình thức">
            <Chip href={href({ "hinh-thuc": undefined })} active={!formatFilter}>Tất cả</Chip>
            <Chip href={href({ "hinh-thuc": "online" })} active={formatFilter === "online"}>Online</Chip>
            <Chip href={href({ "hinh-thuc": "offline" })} active={formatFilter === "offline"}>Trực tiếp</Chip>
          </FilterRow>
          <FilterRow label="Giáo viên">
            <Chip href={href({ "giao-vien": undefined })} active={!teacherFilter}>Tất cả</Chip>
            {teachers.map((t) => (
              <Chip key={t.slug} href={href({ "giao-vien": t.slug })} active={teacherFilter === t.slug}>{t.name}</Chip>
            ))}
          </FilterRow>
        </div>
      </PageHero>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <section>
          <h2 className="font-serif text-2xl tracking-tight text-ink sm:text-3xl" data-reveal>
            Sắp diễn ra <span className="ml-1 align-middle font-sans text-sm text-ink-soft">({upcoming.length})</span>
          </h2>
          {upcoming.length ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {upcoming.map((w, i) => <WorkshopCard key={w.slug} workshop={w} teacher={teacherBySlug.get(w.teacher)} delay={(i % 2) * 100} />)}
            </div>
          ) : (
            <p className="card mt-8 p-6 text-ink-soft" data-reveal>Chưa có buổi nào phù hợp. Hãy quay lại sau hoặc chọn bộ lọc khác nhé.</p>
          )}
        </section>

        {past.length > 0 && (
          <section className="mt-20">
            <h2 className="font-serif text-2xl tracking-tight text-ink sm:text-3xl" data-reveal>Đã diễn ra</h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {past.map((w, i) => <WorkshopCard key={w.slug} workshop={w} teacher={teacherBySlug.get(w.teacher)} past delay={(i % 2) * 100} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="w-24 shrink-0 text-xs tracking-[0.15em] text-ink-soft uppercase">{label}</span>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">{children}</div>
    </div>
  );
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} scroll={false} aria-current={active ? "true" : undefined}
      className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-5 text-sm whitespace-nowrap transition-all duration-300 ${
        active ? "border-moss-700 bg-moss-700 text-sand-50 shadow-[0_8px_20px_-12px_rgb(51_58_37/0.7)]" : "border-sand-300 bg-white/70 text-ink-soft hover:border-moss-400 hover:text-ink"
      }`}>
      {children}
    </Link>
  );
}
