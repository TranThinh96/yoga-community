"use client";

import { useActionState } from "react";
import { registerAction, type FormState } from "./actions";
import { IconArrow, IconCheck } from "@/components/Icons";

const input =
  "mt-2 block w-full rounded-2xl border border-sand-300 bg-sand-50/60 px-4 py-3.5 text-base text-ink outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-ink-soft/60 hover:border-sand-400 focus:border-moss-500 focus:bg-white focus:ring-4 focus:ring-moss-100 aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-red-100";

export function RegisterForm({ slug }: { slug: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(registerAction.bind(null, slug), { status: "idle" });

  if (state.status === "success") {
    return (
      <div className="fade-up text-center" role="status" aria-live="polite">
        <span className="pop-in mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-moss-700 text-sand-50">
          <IconCheck className="h-8 w-8" />
        </span>
        <p className="mt-5 font-serif text-2xl text-ink">Cảm ơn bạn</p>
        <p className="mt-2 leading-relaxed text-ink-soft">{state.message ?? "Đăng ký thành công!"}</p>
        <p className="mt-4 rounded-2xl bg-sand-100 px-4 py-3 text-sm text-ink-soft">Không thấy email? Hãy kiểm tra thư mục Spam / Quảng cáo.</p>
      </div>
    );
  }

  const v = state.values;
  const err = state.fieldErrors ?? {};
  return (
    <form action={action} className="space-y-5" noValidate>
      <Field id="name" label="Họ và tên" error={err.name}>
        <input id="name" name="name" autoComplete="name" required defaultValue={v?.name} aria-invalid={!!err.name} aria-describedby={err.name ? "name-err" : undefined} className={input} placeholder="Nguyễn Văn A" />
      </Field>
      <Field id="email" label="Email" error={err.email} hint="Link tham gia và file lịch sẽ gửi về email này.">
        <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required defaultValue={v?.email} aria-invalid={!!err.email} aria-describedby={err.email ? "email-err" : "email-hint"} className={input} placeholder="ban@email.com" />
      </Field>
      <Field id="phone" label="Số điện thoại (Zalo)" error={err.phone}>
        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required defaultValue={v?.phone} aria-invalid={!!err.phone} aria-describedby={err.phone ? "phone-err" : undefined} className={input} placeholder="0912 345 678" />
      </Field>
      <Field id="note" label="Ghi chú" optional>
        <textarea id="note" name="note" rows={3} defaultValue={v?.note} placeholder="Tình trạng sức khoẻ, chấn thương cần lưu ý…" className={`${input} resize-none`} />
      </Field>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {state.status === "error" && state.message ? (
        <p className="fade-up rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{state.message}</p>
      ) : null}
      <button type="submit" disabled={pending} className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-70">
        {pending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-sand-50/40 border-t-sand-50" aria-hidden /> Đang gửi…
          </>
        ) : (
          <>Đăng ký tham gia <IconArrow /></>
        )}
      </button>
      <p className="text-center text-xs leading-relaxed text-ink-soft">Thông tin chỉ dùng để liên hệ về buổi workshop này.</p>
    </form>
  );
}

function Field({ id, label, error, hint, optional, children }: { id: string; label: string; error?: string; hint?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        {optional ? <span className="text-xs font-normal text-ink-soft">Không bắt buộc</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-err`} className="fade-up mt-1.5 text-sm text-red-700">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-soft">{hint}</p>
      ) : null}
    </div>
  );
}
