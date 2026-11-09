"use client";

import { useActionState } from "react";
import { registerAction, type FormState } from "./actions";

const input =
  "mt-1 w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-moss-500 focus:ring-2 focus:ring-moss-100";

export function RegisterForm({ slug }: { slug: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(registerAction.bind(null, slug), { status: "idle" });

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-moss-500/30 bg-moss-50 p-6 text-moss-800" role="status">
        <p className="font-serif text-xl">Cảm ơn bạn 🌿</p>
        <p className="mt-2">{state.message ?? "Đăng ký thành công!"}</p>
        <p className="mt-2 text-sm text-ink-soft">Không thấy email? Hãy kiểm tra thư mục Spam / Quảng cáo.</p>
      </div>
    );
  }

  const v = state.values;
  const err = state.fieldErrors ?? {};
  return (
    <form action={action} className="space-y-4" noValidate>
      <Field label="Họ và tên" error={err.name}>
        <input name="name" autoComplete="name" required defaultValue={v?.name} className={input} />
      </Field>
      <Field label="Email" error={err.email} hint="Link tham gia và file lịch sẽ gửi về email này.">
        <input name="email" type="email" inputMode="email" autoComplete="email" required defaultValue={v?.email} className={input} />
      </Field>
      <Field label="Số điện thoại (Zalo)" error={err.phone}>
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required defaultValue={v?.phone} className={input} />
      </Field>
      <Field label="Ghi chú (không bắt buộc)">
        <textarea name="note" rows={3} defaultValue={v?.note} placeholder="Tình trạng sức khoẻ, chấn thương cần lưu ý…" className={input} />
      </Field>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {state.status === "error" && state.message ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{state.message}</p>
      ) : null}
      <button type="submit" disabled={pending}
        className="w-full rounded-full bg-moss-600 px-6 py-3.5 font-medium text-sand-50 transition hover:bg-moss-700 disabled:opacity-60">
        {pending ? "Đang gửi…" : "Đăng ký tham gia"}
      </button>
    </form>
  );
}

function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      {children}
      {error ? <span className="mt-1 block text-sm font-normal text-red-700">{error}</span> : hint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{hint}</span> : null}
    </label>
  );
}
