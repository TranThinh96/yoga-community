import { IconAward } from "./Icons";

export function TrainedBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2.5 rounded-full border border-moss-200 bg-white/70 py-1.5 pr-4 pl-1.5 text-sm text-moss-800 backdrop-blur ${className}`}>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-moss-700 text-sand-50"><IconAward className="h-4 w-4" /></span>
      <span>Được đào tạo bởi <strong className="font-semibold">Chang Chang Khí Thần</strong></span>
    </div>
  );
}
