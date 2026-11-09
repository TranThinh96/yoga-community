import Link from "next/link";
import { site } from "@/lib/site";
import { SpineMark } from "./SpineMark";

export function SiteFooter() {
  return (
    <footer className="relative mt-28 overflow-hidden bg-moss-900 text-moss-100">
      <SpineMark className="pointer-events-none absolute -right-10 -bottom-24 h-[420px] w-auto text-moss-700/40" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 text-sand-100">
            <SpineMark className="h-12 w-7" />
            <p className="font-serif text-2xl">{site.name}</p>
          </div>
          <p className="mt-5 max-w-sm leading-relaxed text-moss-200">
            Hơi thở làm gốc – Cân bằng làm hướng đi – Cột sống làm trọng tâm.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] text-moss-400 uppercase">Khám phá</p>
          <ul className="mt-4 space-y-3">
            <li><Link href="/giao-vien" className="link-underline">Đội ngũ giáo viên</Link></li>
            <li><Link href="/workshop" className="link-underline">Lịch workshop</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] text-moss-400 uppercase">Triết lý</p>
          <p className="mt-4 font-serif text-xl leading-snug text-sand-100 italic">{site.slogan}</p>
        </div>
      </div>
      <div className="relative border-t border-moss-800">
        <p className="mx-auto max-w-6xl px-5 py-6 text-sm text-moss-400 sm:px-8">© {new Date().getFullYear()} {site.name}. Yoga cân bằng phục hồi.</p>
      </div>
    </footer>
  );
}
