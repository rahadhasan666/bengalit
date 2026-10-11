import React, { useRef, useState, useEffect } from 'react';
import { JuncaCTA } from './JuncaCTA';
import { ShieldCheck } from 'lucide-react';

export const JuncaStudioReel: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [warpProgress, setWarpProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progress as section passes through viewport
      const start = windowHeight;
      const end = -rect.height;
      const current = rect.top;

      const progress = Math.max(0, Math.min(1, (start - current) / (start - end)));
      setWarpProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3D perspective warp transforms based on scroll
  const rotY = (warpProgress - 0.5) * -18;
  const rotX = (warpProgress - 0.5) * 12;
  const scale = 0.95 + Math.sin(warpProgress * Math.PI) * 0.08;

  return (
    <section
      ref={sectionRef}
      className="py-32 sm:py-44 border-b border-[var(--line)] bg-[var(--bg-main)] overflow-hidden"
    >
      <div className="container-junca">
        {/* Editorial Headline matching Junca Studio .reel__h2 */}
        <h2 className="font-heading font-medium text-3xl sm:text-5xl md:text-6xl lg:text-[68px] text-[var(--fg)] tracking-tight leading-[1.02] max-w-5xl mb-16 sm:mb-24 text-left">
          <span>Great technology, undersold by its digital presence. </span>
          <span className="text-[var(--fg-2)]">That’s what founders tell us, every week.</span>
        </h2>

        {/* 3D Warp Stage matching Junca Studio .reel__stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Mission & Senior Engineering Team */}
          <div className="lg:col-span-5 space-y-8">
            <p className="eyebrow dot-label">WHAT WE SOLVE</p>

            <div className="space-y-5 text-base sm:text-lg text-[var(--fg-2)] font-body leading-relaxed">
              <p>
                Founders and CTOs build extraordinary systems, but rarely have the bandwidth or specialized design eye for the digital interface it deserves.
              </p>
              <p>
                We give complex technology the clarity it needs: sleek, premium Android & Flutter applications and high-performance web platforms that present hard things simply, so investors, clients, and global talent get it in seconds.
              </p>
            </div>

            {/* Direct Line Badge */}
            <div className="p-6 rounded bg-[var(--surface-card)] border border-[var(--line)] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--red)]/10 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-[var(--red)]" />
                </div>
                <span className="font-heading font-medium text-base text-[var(--fg)]">
                  Zero Middlemen Guarantee
                </span>
              </div>
              <p className="text-xs text-[var(--fg-2)] leading-relaxed">
                You work directly with the developers and cybersecurity specialists writing your code. Fast, transparent, and strictly aligned with your roadmap.
              </p>
            </div>

            <div className="w-full max-w-[280px]">
              <JuncaCTA
                label="Discover the studio"
                href="#why-bengal"
                variant="ink"
                className="w-full"
              />
            </div>
          </div>

          {/* Right Column: 3D Perspective Warping Media Stage */}
          <div
            className="lg:col-span-7 relative flex items-center justify-center"
            style={{ perspective: '1400px' }}
          >
            <div
              className="relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-lg overflow-hidden bg-[var(--ink)] text-white border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-transform duration-100 ease-out"
              style={{
                transform: `rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${scale})`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Visual Simulated Studio Tech Console */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0c0d12] via-[#141721] to-[#080808] p-4 sm:p-10 flex flex-col justify-between">
                {/* Console Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-500" />
                    <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-yellow-500" />
                    <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-green-500" />
                    <span className="ml-2 sm:ml-3 font-mono text-[9px] sm:text-[11px] text-white/50 truncate">
                      bengal-telemetry.sh
                    </span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[11px] text-[var(--red)] font-semibold shrink-0">
                    120 FPS // ACTIVE
                  </span>
                </div>

                {/* Animated SVG Centerpiece & Visual Stage */}
                <div className="relative my-auto w-full h-[180px] sm:h-[260px] flex items-center justify-center overflow-hidden rounded-xl bg-black/40 border border-white/10 p-2 group/media">
                  {/* Programming Computer Animated SVG */}
                  <img
                    src="/assets/Programming Computer.svg"
                    alt="Animated Programming Computer Workstation"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(237,51,39,0.35)] transition-transform duration-500 group/media:scale-105"
                  />

                  {/* Laser Scanline */}
                  <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--red)]/60 to-transparent animate-scanline pointer-events-none" />

                  {/* Floating Metric Chips over SVG */}
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none">
                    <div className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-black/80 backdrop-blur-md border border-white/15 text-[8.5px] sm:text-[10px] font-mono text-emerald-400">
                      <span>120 FPS NATIVE</span>
                    </div>
                    <div className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-black/80 backdrop-blur-md border border-white/15 text-[8.5px] sm:text-[10px] font-mono text-cyan-300">
                      <span>TTFB: &lt; 180ms</span>
                    </div>
                    <div className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-black/80 backdrop-blur-md border border-white/15 text-[8.5px] sm:text-[10px] font-mono text-red-400">
                      <span>OWASP TOP 10</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Console Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[9px] sm:text-[11px] font-mono text-white/60 border-t border-white/10 pt-3 sm:pt-4">
                  <span>BANGLADESH // WORLDWIDE</span>
                  <span className="text-[var(--red)] font-mono font-semibold">STATUS: OPTIMAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JuncaStudioReel;
