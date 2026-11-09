import { renderOg, ogSize } from "@/lib/og";
import { getTeacher, getTeachers } from "@/lib/content";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Hồ sơ giáo viên";

export function generateStaticParams() {
  return getTeachers().map((t) => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const teacher = getTeacher((await params).slug);
  return renderOg({
    eyebrow: "GIÁO VIÊN ĐƯỢC ĐÀO TẠO BỞI CHANG CHANG KHÍ THẦN",
    title: teacher?.name ?? site.name,
    subtitle: teacher?.title,
    footer: site.slogan,
  });
}
