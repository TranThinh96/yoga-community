"use server";

import { getTeacher, getWorkshops } from "@/lib/content";
import { submitRegistration } from "@/lib/registration";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "phone", string>>;
  values?: { name: string; email: string; phone: string; note: string };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(\+?84|0)\d{9,10}$/;

export async function registerAction(slug: string, _prev: FormState, formData: FormData): Promise<FormState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  // Ô ẩn chống spam: người thật không điền ô này
  if (get("website")) return { status: "success" };

  const values = {
    name: get("name").slice(0, 120),
    email: get("email").slice(0, 200),
    phone: get("phone").replace(/[\s.-]/g, "").slice(0, 20),
    note: get("note").slice(0, 1000),
  };

  const fieldErrors: FormState["fieldErrors"] = {};
  if (values.name.length < 2) fieldErrors.name = "Vui lòng nhập họ tên.";
  if (!EMAIL_RE.test(values.email)) fieldErrors.email = "Email chưa đúng định dạng.";
  if (!PHONE_RE.test(values.phone)) fieldErrors.phone = "Số điện thoại chưa đúng (ví dụ 0912345678).";
  if (Object.keys(fieldErrors).length) return { status: "error", fieldErrors, values };

  const workshop = getWorkshops().find((w) => w.slug === slug);
  if (!workshop || workshop.endAt < new Date() || workshop.registrationUrl) {
    return { status: "error", message: "Workshop này hiện không nhận đăng ký trên web.", values };
  }

  const result = await submitRegistration(workshop, getTeacher(workshop.teacher), values);
  if (result.ok) {
    return { status: "success", message: `Đăng ký thành công! Email xác nhận đã được gửi tới ${values.email}.` };
  }
  if (result.reason === "full") {
    return { status: "error", message: "Rất tiếc, workshop đã đủ số lượng học viên.", values };
  }
  console.error("[đăng ký workshop] lỗi:", result.message);
  return { status: "error", message: "Có lỗi khi gửi đăng ký. Bạn vui lòng thử lại sau ít phút hoặc liên hệ trực tiếp giáo viên.", values };
}
