import { site } from "@/lib/site";
import { SpineMark } from "./SpineMark";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-sand-200 bg-sand-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <SpineMark className="h-10 w-6 text-moss-600" />
          <div>
            <p className="font-serif text-base text-ink">{site.name}</p>
            <p>Hơi thở làm gốc – Cân bằng làm hướng đi – Cột sống làm trọng tâm</p>
          </div>
        </div>
        <p>© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
