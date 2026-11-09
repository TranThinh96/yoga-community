export function SectionHeading({ eyebrow, title, intro, align = "left" }: { eyebrow: string; title: React.ReactNode; intro?: string; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} data-reveal>
      <p className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>{eyebrow}</p>
      <h2 className="mt-4 font-serif text-[2rem] leading-[1.15] tracking-tight text-ink sm:text-[2.6rem]">{title}</h2>
      {intro ? <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">{intro}</p> : null}
    </div>
  );
}
