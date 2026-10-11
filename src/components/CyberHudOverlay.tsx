import React, { useState, useEffect } from 'react';

export const CyberHudOverlay: React.FC = () => {
  const [fps, setFps] = useState(60);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };
    animId = requestAnimationFrame(calcFps);

    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0) {
        setScrollPct(Math.round((window.scrollY / h) * 100));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[45] select-none" aria-hidden="true">
      {/* Top Left Corner Reticle */}
      <div className="absolute top-2 left-2 text-[9px] font-mono text-[var(--fg-3)] opacity-40 hidden md:block">
        <span>+ 00 // 01</span>
      </div>

      {/* Top Right Corner Reticle */}
      <div className="absolute top-2 right-2 text-[9px] font-mono text-[var(--fg-3)] opacity-40 hidden md:block">
        <span>01 // 00 +</span>
      </div>

      {/* Bottom Left Corner Reticle */}
      <div className="absolute bottom-12 left-4 text-[9px] font-mono text-[var(--fg-3)] opacity-40 hidden md:block">
        <span>+ LAT: 23.6850° N | LON: 90.3563° E</span>
      </div>

      {/* Floating Precision Telemetry Pill (Top right below header) */}
      <div className="absolute top-20 right-6 sm:right-10 flex items-center gap-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-emerald-500/20 text-[10px] font-mono text-white/70 shadow-lg hidden lg:flex">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-400 font-bold">{fps} FPS</span>
        </div>
        <span className="text-white/20">|</span>
        <span className="text-emerald-300">WATER VFX: WEBGL</span>
        <span className="text-white/20">|</span>
        <span className="text-[var(--red)]">{scrollPct}% SCROLL</span>
      </div>

      {/* Ultra-subtle Laser Scan Line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--red)]/20 to-transparent opacity-60 animate-scanline" />
    </div>
  );
};

export default CyberHudOverlay;
