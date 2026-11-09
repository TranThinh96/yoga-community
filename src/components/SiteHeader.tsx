"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SpineMark } from "./SpineMark";
import { IconArrow, IconClose, IconMenu } from "./Icons";
import { site } from "@/lib/site";

// Thêm mục khi các trang ở bước sau được dựng: /kien-thuc, /dao-tao
const nav = [
  { href: "/", label: "Trang chủ" },
  { href: "/giao-vien", label: "Giáo viên" },
  { href: "/workshop", label: "Lịch workshop" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-500 ${
        scrolled || open ? "border-b border-sand-200/80 bg-sand-50/85 shadow-[0_8px_30px_-20px_rgb(67_77_47/0.35)] backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5 text-moss-700" aria-label={`${site.name} – Trang chủ`}>
          <SpineMark className="h-10 w-6 shrink-0 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-110" />
          <span className="leading-tight">
            <span className="block font-serif text-[1.05rem] font-semibold tracking-tight text-ink">{site.name}</span>
            <span className="hidden text-[11px] tracking-[0.14em] text-ink-soft uppercase sm:block">{site.slogan}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Điều hướng chính">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={isActive(n.href) ? "page" : undefined}
              className={`relative rounded-full px-4 py-2.5 text-sm transition-colors duration-300 ${isActive(n.href) ? "text-moss-800" : "text-ink-soft hover:text-ink"}`}>
              {n.label}
              <span className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-moss-600 transition-transform duration-500 ease-[var(--ease-out-soft)] ${isActive(n.href) ? "scale-x-100" : "scale-x-0"}`} />
            </Link>
          ))}
          <Link href="/workshop" className="btn btn-primary ml-3 !min-h-11 !px-5 text-sm">
            Đăng ký workshop <IconArrow />
          </Link>
        </nav>

        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="menu-di-dong"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          className="-mr-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ink transition hover:bg-sand-100 md:hidden">
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>
    </header>

      {/* Menu điện thoại — đặt ngoài <header> vì backdrop-filter làm lệch vị trí fixed */}
      <div id="menu-di-dong"
        className={`fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-sand-50 transition-[opacity,visibility] duration-500 md:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="paper flex h-full flex-col justify-between px-6 pt-10 pb-10">
          <nav className="flex flex-col" aria-label="Menu điện thoại">
            {nav.map((n, i) => (
              <Link key={n.href} href={n.href} aria-current={isActive(n.href) ? "page" : undefined}
                style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
                className={`flex items-center justify-between border-b border-sand-200 py-5 font-serif text-3xl transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                } ${isActive(n.href) ? "text-moss-700" : "text-ink"}`}>
                {n.label}
                <IconArrow className="h-5 w-5 text-moss-500" />
              </Link>
            ))}
          </nav>
          <div className={`transition-[opacity,transform] delay-300 duration-700 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <p className="font-serif text-lg text-moss-700 italic">{site.slogan}</p>
            <Link href="/workshop" className="btn btn-primary mt-5 w-full">Xem lịch & đăng ký workshop <IconArrow /></Link>
          </div>
        </div>
      </div>
    </>
  );
}
