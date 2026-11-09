/** Motif nhận diện: trục cột sống với các đốt sống và vòng hơi thở. */
export function SpineMark({ className = "" }: { className?: string }) {
  const vertebrae = [8, 16, 24, 32, 40, 48, 56];
  return (
    <svg viewBox="0 0 40 64" fill="none" aria-hidden className={className}>
      <circle cx="20" cy="32" r="18" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" />
      <path d="M20 4 C 23 18, 17 30, 20 40 S 21 54, 20 60" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      {vertebrae.map((y, i) => (
        <ellipse key={y} cx={20 + (i % 2 === 0 ? 0.6 : -0.6)} cy={y} rx={3.4 - Math.abs(i - 3) * 0.3} ry="1.6" fill="currentColor" />
      ))}
    </svg>
  );
}
