import { useEffect, useRef, useState } from 'react';

interface JuncaScrubStatementProps {
  text?: string;
}

export default function JuncaScrubStatement({
  text = 'At Bengal IT Agency Bangladesh, we engineer high-performance mobile applications and web systems that turn your technology into an unstoppable market advantage.',
}: JuncaScrubStatementProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start scrub when top of element enters 85% of viewport
      const start = windowHeight * 0.85;
      // Finish scrub when bottom reaches 35% of viewport
      const end = windowHeight * 0.35;

      const current = rect.top;
      const rawProgress = (start - current) / (start - end);
      const clamped = Math.max(0, Math.min(1, rawProgress));

      setProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const characters = text.split('');
  const totalChars = characters.length;

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-36 md:py-44 border-b border-[var(--line)] bg-[var(--bg-main)] overflow-hidden"
    >
      <div className="container-junca">
        <p className="eyebrow dot-label mb-6 sm:mb-8">THE BENGAL IT AGENCY STANDARD</p>

        <p
          className="font-heading font-medium tracking-tight text-left leading-[1.06] select-none break-words"
          style={{
            fontSize: 'clamp(24px, 5.2vw, 68px)',
          }}
        >
          {characters.map((char, index) => {
            const charProgress = index / totalChars;
            // Smooth transition window of 0.05
            const charOpacity = Math.max(
              0.18,
              Math.min(1, (progress - charProgress) * 20 + 0.18)
            );

            const isLit = progress > charProgress;

            return (
              <span
                key={index}
                className="transition-colors duration-150 inline"
                style={{
                  opacity: charOpacity,
                  color: isLit ? 'var(--fg)' : 'var(--fg-3)',
                }}
              >
                {char}
              </span>
            );
          })}
        </p>

        <div className="mt-8 sm:mt-12 flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono text-[var(--fg-3)] uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]" />
            0 Middlemen
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Direct Senior Engineer Access</span>
          <span className="hidden sm:inline">•</span>
          <span>100% Online Delivery Worldwide</span>
        </div>
      </div>
    </section>
  );
}

export { JuncaScrubStatement };
