import type { Socials } from "@/lib/content";

const labels: Record<keyof Socials, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  zalo: "Zalo",
};

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
        <a key={k} href={href(k, socials[k]!)} target="_blank" rel="noopener noreferrer"
          className="rounded-full border border-sand-300 bg-white/70 px-4 py-2 text-sm text-ink transition hover:border-moss-500 hover:text-moss-700">
          {labels[k]}
        </a>
      ))}
    </div>
  );
}
