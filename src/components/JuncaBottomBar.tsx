import React, { useState, useEffect, useRef } from 'react';
import { soundFX } from '../hooks/useSoundFX';

export const JuncaBottomBar: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [isSoundOn, setIsSoundOn] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Dhaka',
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    if (!isSoundOn) {
      soundFX.setMuted(false);
      soundFX.playClick();
      // Start ambient synth hum
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, ctx.currentTime); // Deep subtle ambient hum

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscRef.current = osc;
        gainRef.current = gain;
        setIsSoundOn(true);
      } catch (err) {
        console.warn('AudioContext not allowed without gesture', err);
        setIsSoundOn(true);
      }
    } else {
      soundFX.setMuted(true);
      // Fade out
      if (gainRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        gainRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
        setTimeout(() => {
          oscRef.current?.stop();
          audioCtxRef.current?.close();
          oscRef.current = null;
          gainRef.current = null;
          audioCtxRef.current = null;
        }, 350);
      }
      setIsSoundOn(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div
      className="fixed bottom-3 sm:bottom-5 left-3 sm:left-10 right-3 sm:right-10 z-50 mix-blend-difference pointer-events-none flex items-center justify-between text-xs sm:text-sm text-white select-none"
      aria-hidden="true"
    >
      {/* Left: Copyright */}
      <span className="font-heading tracking-tight opacity-90 hidden sm:inline text-xs sm:text-sm">
        ©2026 BENGAL IT AGENCY BANGLADESH
      </span>
      <span className="font-heading tracking-tight opacity-90 sm:hidden text-[10px]">
        ©2026 BENGAL IT
      </span>

      {/* Right: Live Clock + Status Turbine Sound Button (Exact Junca Studio #robot-son) */}
      <div className="flex items-center gap-3 sm:gap-10 pointer-events-auto">
        <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-xs tracking-wider">
          <span className="text-white/60 hidden xs:inline">DHAKA</span>
          <span className="font-heading font-medium tabular-nums text-white">
            {time || '12:00:00 AM'}
          </span>
        </div>

        {/* Engineering Status Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/40 border border-white/10 text-[11px] font-mono text-white/80">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>UNIT // ONLINE</span>
        </div>

        {/* Junca Studio 3-Blade Turbine Sound Button */}
        <button
          type="button"
          onClick={toggleSound}
          className="rson group flex items-center gap-1.5 sm:gap-2 focus:outline-none cursor-pointer py-1"
          title={isSoundOn ? 'Mute ambient sound' : 'Enable ambient sound'}
          aria-label={isSoundOn ? 'Sound: on' : 'Sound: off'}
          aria-pressed={isSoundOn}
        >
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform ${
              isSoundOn ? 'animate-[spin_1.2s_linear_infinite] scale-110' : 'animate-[spin_6s_linear_infinite]'
            }`}
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
            <circle cx="12" cy="12" r="2.2" fill={isSoundOn ? 'var(--red)' : '#ffffff'} />
          </svg>
          <span className="text-[9px] sm:text-[11px] font-mono uppercase tracking-widest text-white/80 group-hover:text-white">
            {isSoundOn ? 'Sound: On' : 'Sound'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default JuncaBottomBar;
