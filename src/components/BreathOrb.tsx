/**
 * Điểm nhấn chuyển động duy nhất ở hero: ba vòng tròn "thở" theo nhịp 4–2–6 giây
 * quanh trục cột sống tự vẽ. Thuần CSS, tự dừng khi bật giảm chuyển động.
 */
export function BreathOrb({ className = "" }: { className?: string }) {
  const vertebrae = [70, 102, 134, 166, 198, 230, 262, 294, 326];
  return (
    <div className={`relative aspect-square ${className}`}>
      <div className="float-slow absolute inset-[13%] bg-gradient-to-br from-moss-100 via-sand-100 to-sand-300/80 opacity-90 blur-[2px] [border-radius:var(--radius-organic)]" />
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx="200" cy="200" r="182" className="breath breath-delay-2 fill-none stroke-moss-400/25" strokeWidth="1" />
        <circle cx="200" cy="200" r="150" className="breath breath-delay-1 fill-moss-50/40 stroke-moss-400/35" strokeWidth="1" />
        <circle cx="200" cy="200" r="114" className="breath fill-sand-50/70 stroke-moss-500/40" strokeWidth="1" />
        <path d="M200 52 C 214 110, 186 160, 200 200 S 214 290, 200 348"
          className="draw-path fill-none stroke-moss-700" strokeWidth="2" strokeLinecap="round" style={{ ["--len" as string]: 320, ["--d" as string]: "400ms" }} />
        {vertebrae.map((y, i) => {
          const t = (y - 52) / 296;
          const x = 200 + Math.sin(t * Math.PI * 2) * 7;
          const rx = 13 - Math.abs(i - 4) * 1.2;
          return (
            <ellipse key={y} cx={x} cy={y} rx={rx} ry="5" className="pop-in fill-moss-700"
              style={{ ["--d" as string]: `${900 + i * 110}ms`, transformBox: "fill-box", transformOrigin: "center" }} />
          );
        })}
      </svg>
      <div className="absolute inset-x-0 bottom-[9%] flex justify-center">
        <div className="relative h-8 w-36 rounded-full border border-moss-200 bg-sand-50/80 text-center text-xs tracking-[0.2em] text-moss-700 uppercase backdrop-blur" aria-hidden>
          <span className="breath-label-in absolute inset-0 flex items-center justify-center">Hít vào</span>
          <span className="breath-label-hold absolute inset-0 flex items-center justify-center">Giữ</span>
          <span className="breath-label-out absolute inset-0 flex items-center justify-center">Thở ra</span>
        </div>
      </div>
    </div>
  );
}
