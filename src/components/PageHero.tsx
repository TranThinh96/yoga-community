export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: React.ReactNode; intro?: string; children?: React.ReactNode }) {
  return (
    <section className="paper -mt-16 pt-16 sm:-mt-20 sm:pt-20">
      <div className="mx-auto max-w-6xl px-5 pt-14 pb-12 sm:px-8 sm:pt-20 sm:pb-16">
        <p className="eyebrow fade-up">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-serif text-[2.6rem] leading-[1.08] tracking-tight text-ink sm:text-6xl">
          <span className="line-mask"><span style={{ ["--d" as string]: "100ms" }}>{title}</span></span>
        </h1>
        {intro ? <p className="fade-up mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft" style={{ ["--d" as string]: "300ms" }}>{intro}</p> : null}
        {children ? <div className="fade-up" style={{ ["--d" as string]: "450ms" }}>{children}</div> : null}
      </div>
    </section>
  );
}
