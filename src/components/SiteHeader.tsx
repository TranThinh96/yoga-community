import Link from "next/link";
import { SpineMark } from "./SpineMark";
import { site } from "@/lib/site";

// Thêm mục khi các trang ở bước sau được dựng: /workshop, /kien-thuc, /dao-tao
const nav = [
  { href: "/", label: "Trang chủ" },
  { href: "/giao-vien", label: "Giáo viên" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-sand-200/70 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-moss-700">
          <SpineMark className="h-9 w-6 shrink-0" />
          <span className="leading-tight">
            <span className="block font-serif text-[15px] font-semibold text-ink sm:text-base">{site.name}</span>
            <span className="hidden text-[11px] tracking-wide text-ink-soft sm:block">{site.slogan}</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="whitespace-nowrap rounded-full px-2.5 py-2 text-ink-soft sm:px-3 transition hover:bg-sand-100 hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
