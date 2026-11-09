import { renderOg, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = site.name;

export default function Image() {
  return renderOg({
    eyebrow: "YOGA CÂN BẰNG PHỤC HỒI",
    title: site.slogan,
    subtitle: "Hơi thở làm gốc – Cân bằng làm hướng đi – Cột sống làm trọng tâm",
    footer: site.name,
  });
}
