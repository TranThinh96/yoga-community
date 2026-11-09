import Link from "next/link";
import { BreathOrb } from "@/components/BreathOrb";
import { IconArrow } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-16 text-center">
      <BreathOrb className="w-56" />
      <h1 className="mt-6 font-serif text-4xl tracking-tight text-ink">Không tìm thấy trang</h1>
      <p className="mt-3 text-ink-soft">Hít một hơi thật sâu — rồi quay lại trang chủ nhé.</p>
      <Link href="/" className="btn btn-primary mt-8">Về trang chủ <IconArrow /></Link>
    </div>
  );
}
