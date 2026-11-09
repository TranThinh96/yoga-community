import type { Metadata } from "next";
import Link from "next/link";
import { getTeachers, getWorkshops } from "@/lib/content";
import { WorkshopCard } from "@/components/WorkshopCard";

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
    <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">
      <p className="text-sm uppercase tracking-[0.2em] text-moss-600">Lịch chung của nhóm</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">Lịch workshop</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
        Các buổi workshop online qua Zoom và trực tiếp của đội ngũ giáo viên. Thời gian hiển thị theo giờ Việt Nam.
      </p>

      <div className="mt-8 space-y-3">
        <FilterRow label="Hình thức">
          <Chip href={href({ "hinh-thuc": undefined })} active={!formatFilter}>Tất cả</Chip>
          <Chip href={href({ "hinh-thuc": "online" })} active={formatFilter === "online"}>Online</Chip>
          <Chip href={href({ "hinh-thuc": "offline" })} active={formatFilter === "offline"}>Offline</Chip>
        </FilterRow>
        <FilterRow label="Giáo viên">
          <Chip href={href({ "giao-vien": undefined })} active={!teacherFilter}>Tất cả</Chip>
          {teachers.map((t) => (
            <Chip key={t.slug} href={href({ "giao-vien": t.slug })} active={teacherFilter === t.slug}>{t.name}</Chip>
          ))}
        </FilterRow>
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-ink">Sắp diễn ra</h2>
        {upcoming.length ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {upcoming.map((w) => <WorkshopCard key={w.slug} workshop={w} teacher={teacherBySlug.get(w.teacher)} />)}
          </div>
        ) : (
          <p className="mt-4 text-ink-soft">Chưa có buổi nào phù hợp. Hãy quay lại sau hoặc chọn bộ lọc khác nhé.</p>
        )}
      </section>

      {past.length > 0 && (
        <section className="mt-14">
          <h2 className="font-serif text-2xl text-ink">Đã diễn ra</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {past.map((w) => <WorkshopCard key={w.slug} workshop={w} teacher={teacherBySlug.get(w.teacher)} past />)}
          </div>
        </section>
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 text-sm text-ink-soft">{label}</span>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">{children}</div>
    </div>
  );
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} scroll={false} aria-current={active ? "true" : undefined}
      className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition ${active ? "border-moss-600 bg-moss-600 text-sand-50" : "border-sand-300 bg-white/70 text-ink-soft hover:border-moss-500"}`}>
      {children}
    </Link>
  );
}
