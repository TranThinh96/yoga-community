import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Tải font Lora (chỉ các ký tự cần dùng) để ảnh OG hiển thị đúng dấu tiếng Việt. */
async function loadFont(text: string, weight = 500) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Lora:wght@${weight}&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export async function renderOg({ eyebrow, title, subtitle, footer }: { eyebrow: string; title: string; subtitle?: string; footer: string }) {
  const text = [eyebrow, title, subtitle, footer].join(" ");
  const font = await loadFont(text);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f4eee3", padding: 72, fontFamily: "Lora" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, borderLeft: "6px solid #6b7a4b", paddingLeft: 48 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, color: "#56633b", letterSpacing: 2 }}>{eyebrow}</div>
            <div style={{ fontSize: 68, color: "#2e2a24", marginTop: 24, lineHeight: 1.15 }}>{title}</div>
            {subtitle ? <div style={{ fontSize: 34, color: "#5f584e", marginTop: 24 }}>{subtitle}</div> : null}
          </div>
          <div style={{ fontSize: 28, color: "#8a6a4f" }}>{footer}</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: font ? [{ name: "Lora", data: font, weight: 500, style: "normal" }] : undefined },
  );
}
