import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-serif text-3xl text-ink">Không tìm thấy trang</h1>
      <p className="mt-3 text-ink-soft">Hít một hơi thật sâu – rồi quay lại trang chủ nhé.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-moss-600 px-6 py-3 text-sm text-sand-50">Về trang chủ</Link>
    </div>
  );
}
