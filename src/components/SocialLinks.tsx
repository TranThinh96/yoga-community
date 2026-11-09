import type { Socials } from "@/lib/content";
import { IconExternal } from "./Icons";

const labels: Record<keyof Socials, string> = { facebook: "Facebook", instagram: "Instagram", youtube: "YouTube", zalo: "Zalo" };

function href(key: keyof Socials, value: string) {
  if (key === "zalo" && !value.startsWith("http")) return `https://zalo.me/${value.replace(/\D/g, "")}`;
  return value;
}

export function SocialLinks({ socials, className = "" }: { socials: Socials; className?: string }) {
  const entries = (Object.keys(labels) as (keyof Socials)[]).filter((k) => socials[k]);
  if (!entries.length) return null;
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {entries.map((k) => (
        <a key={k} href={href(k, socials[k]!)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-11 !px-4 text-sm">
          {labels[k]} <IconExternal />
        </a>
      ))}
    </div>
  );
}
