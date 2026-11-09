import { SpineMark } from "./SpineMark";

export function TrainedBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-moss-500/30 bg-moss-50 py-1.5 pl-2 pr-4 text-sm text-moss-700">
      <SpineMark className="h-6 w-4 shrink-0" />
      <span>
        Giáo viên được đào tạo bởi <strong className="font-semibold">Chang Chang Khí Thần</strong>
      </span>
    </div>
  );
}
