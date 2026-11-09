import { getWorkshops } from "@/lib/content";
import { buildIcs } from "@/lib/calendar";

export const dynamicParams = false;

export function generateStaticParams() {
  return getWorkshops().map((w) => ({ slug: w.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWorkshops().find((x) => x.slug === slug);
  if (!w) return new Response("Không tìm thấy", { status: 404 });
  return new Response(buildIcs(w), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${w.slug}.ics"`,
    },
  });
}
