import React, { useState, useEffect } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';

function useScramble(targetText: string, delay: number, duration: number = 800) {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let frameId: number;
    let startTime: number | null = null;
    let timer: ReturnType<typeof setTimeout>;

    timer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(1, elapsed / duration);

        const targetLength = targetText.length;
        const solvedCount = Math.floor(progress * targetLength);

        let result = '';
        for (let i = 0; i < targetLength; i++) {
          if (targetText[i] === ' ') {
            result += ' ';
          } else if (i < solvedCount) {
            result += targetText[i];
          } else {
            result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }

        setDisplayText(result);

        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        } else {
          setDisplayText(targetText);
          setIsDone(true);
        }
      };

      frameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
    };
  }, [targetText, delay, duration]);

  return { text: displayText, isDone };
}

const ScrambleLine: React.FC<{ target: string; delay: number }> = ({ target, delay }) => {
  const { text } = useScramble(target, delay);
  return <p className="font-mono text-xs sm:text-sm tracking-wider text-white/80 leading-relaxed">{text}</p>;
};

export const JuncaPreloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Check if user already saw preloader in this session
    const seen = sessionStorage.getItem('bengal_preloader_seen') || sessionStorage.getItem('novexa_preloader_seen');
    if (seen) {
      setVisible(false);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setIsLeaving(true);
      sessionStorage.setItem('bengal_preloader_seen', '1');
      setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 850);
    }, 3800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] bg-[var(--ink)] text-white flex flex-col justify-between p-4 sm:p-10 md:p-14 select-none transition-all duration-800 ease-out overflow-y-auto ${
        isLeaving ? 'opacity-0 pointer-events-none translate-y-[-10px] scale-[1.02]' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* Top Left: Terminal Studio Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[var(--red)] animate-ping" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/60">
            BOOT SEQUENCE // BENGAL.BD
          </span>
        </div>
        <span className="font-mono text-[10px] sm:text-xs text-white/40 hidden xs:inline sm:inline">CALIBRATING SYSTEM</span>
      </div>

      {/* Center: Official Bengal IT Agency Holographic Brandmark Reveal */}
      <div className="text-center my-auto py-6 flex flex-col items-center justify-center space-y-4 sm:space-y-5">
        {/* Glowing Official Emblem */}
        <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center">
          <div className="absolute inset-0 bg-emerald-500/25 rounded-full blur-xl animate-pulse" />
          <img
            src="/assets/bengal-logo-mark.png"
            alt="Bengal IT Agency Brandmark"
            className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,255,163,0.7)] animate-in fade-in zoom-in duration-700"
          />
        </div>

        <div className="overflow-hidden">
          <div role="heading" aria-level={2} className="font-heading font-extrabold text-3xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase flex items-center justify-center gap-2">
            <span>BENGAL IT</span>
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#ef3e36] shadow-[0_0_12px_#ef3e36] inline-block animate-pulse" />
          </div>
        </div>
        <p className="font-mono text-[10px] sm:text-sm tracking-wider sm:tracking-widest text-emerald-400 font-medium uppercase px-2">
          AGENCY BANGLADESH • BUILD. SECURE. SCALE.
        </p>

        {/* 3-Blade Rotating Turbine Animation */}
        <div className="pt-2">
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 text-[#00ffa3] animate-spin"
            style={{ animationDuration: '3s' }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 12 C 13.6 8.6, 13.2 4.6, 10.1 2.5 C 15.6 2, 19.3 6.4, 18.7 10.6 C 16.6 11.7, 14.2 12.1, 12 12 Z" />
            <path
              d="M12 12 C 13.6 8.6, 13.2 4.6, 10.1 2.5 C 15.6 2, 19.3 6.4, 18.7 10.6 C 16.6 11.7, 14.2 12.1, 12 12 Z"
              transform="rotate(120 12 12)"
            />
            <path
              d="M12 12 C 13.6 8.6, 13.2 4.6, 10.1 2.5 C 15.6 2, 19.3 6.4, 18.7 10.6 C 16.6 11.7, 14.2 12.1, 12 12 Z"
              transform="rotate(240 12 12)"
            />
            <circle cx="12" cy="12" r="2.1" />
          </svg>
        </div>
      </div>

      {/* Bottom Grid: Scrambling Telemetry Lines (Matching Junca Studio Block A & B) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 border-t border-white/10 pt-4 sm:pt-6">
        {/* Block A: Identity & Studio */}
        <div className="space-y-0.5 sm:space-y-1">
          <ScrambleLine target="Bengal IT Agency Bangladesh, engineering & digital agency" delay={300} />
          <ScrambleLine target="Flutter Android, high-speed web, defensive cybersecurity" delay={700} />
          <ScrambleLine target="Headquartered in Bangladesh, operating worldwide" delay={1100} />
        </div>

        {/* Block B: Unit Calibration & Turbine */}
        <div className="space-y-0.5 sm:space-y-1 md:text-right hidden sm:block">
          <ScrambleLine target="Waking up the engineering unit…" delay={500} />
          <ScrambleLine target="3D WebGL core spinning up" delay={900} />
          <ScrambleLine target="Optics and shaders calibrated" delay={1300} />
          <ScrambleLine target="Engineering unit online." delay={1700} />
        </div>
      </div>
    </div>
  );
};

export default JuncaPreloader;
