import React, { useRef, useState } from 'react';
import { Activity, ShieldCheck, CheckCircle2, Laptop, Terminal, Sparkles, Maximize2, Minimize2 } from 'lucide-react';

interface TechProgrammerWorkstationProps {
  activeTech: string;
}

export const TechProgrammerWorkstation: React.FC<TechProgrammerWorkstationProps> = ({
  activeTech,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [viewMode, setViewMode] = useState<'hybrid' | '3d' | 'svg'>('hybrid');
  const [isPipExpanded, setIsPipExpanded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = containerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rx = -((y - centerY) / centerY) * 6;
    const ry = ((x - centerX) / centerX) * 6;
    setRotX(rx);
    setRotY(ry);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full rounded-xl overflow-hidden bg-[#070b0e] border border-[var(--line)] shadow-2xl transition-transform duration-200 ease-out select-none group"
      style={{
        transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${
          isHovered ? 1.01 : 1
        }, ${isHovered ? 1.01 : 1}, 1)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 1. Top HUD System Status Strip & View Mode Switcher */}
      <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 right-2.5 sm:right-4 z-30 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        {/* Lab Identification Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-emerald-500/30 text-white shadow-lg">
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[9px] sm:text-xs text-emerald-400 tracking-wider font-semibold">
            BENGAL IT DEV LAB // 01
          </span>
        </div>

        {/* View Mode Switcher Pill */}
        <div className="flex items-center gap-1 p-0.5 sm:p-1 rounded-lg bg-black/85 backdrop-blur-md border border-white/10 shadow-lg text-[9px] sm:text-[10px] font-mono">
          <button
            type="button"
            onClick={() => setViewMode('hybrid')}
            className={`px-2 sm:px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
              viewMode === 'hybrid'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="3D Programmer with Floating Live Animated SVG Code Terminal"
          >
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
            <span>HYBRID</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('3d')}
            className={`px-2 sm:px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
              viewMode === '3d'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="3D Photorealistic Software Engineer Studio View"
          >
            <Laptop className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-400" />
            <span>3D</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('svg')}
            className={`px-2 sm:px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
              viewMode === 'svg'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Full-Screen Live Animated SVG Compiler Engine"
          >
            <Terminal className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-400" />
            <span>SVG</span>
          </button>
        </div>
      </div>

      {/* 2. Visual Stage Container (Aspect Ratio Managed) */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-black/90">
        {/* VIEW A: 3D Programmer Image (Rendered in 3d and hybrid modes) */}
        {(viewMode === '3d' || viewMode === 'hybrid') && (
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/assets/programmer-3d-desk.jpg"
              alt="3D Software Engineer Programmer at Multi-Monitor Desktop Workstation"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="eager"
            />
            {/* Ambient Dark Tech Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b0e] via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none" />
          </div>
        )}

        {/* VIEW B: Full-Screen Live Animated SVG Engine (When viewMode === 'svg') */}
        {viewMode === 'svg' && (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center p-6 sm:p-10 bg-gradient-to-br from-[#070b0e] via-[#0d141b] to-[#05080a]">
            {/* Background Grid Pattern */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #00ffa3 1px, transparent 0)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Main Animated SVG Object */}
            <div className="relative w-full h-full max-w-xl max-h-[380px] rounded-2xl overflow-hidden bg-black/70 border border-emerald-500/30 p-4 shadow-2xl flex items-center justify-center">
              <img
                src="/assets/Animation.svg"
                alt="Bengal IT Live Code Compiler Animated SVG Engine"
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,255,163,0.3)]"
              />
              <div className="absolute bottom-3 left-4 text-[10px] font-mono text-emerald-400 bg-black/80 px-2.5 py-1 rounded border border-emerald-500/30">
                ACTIVE COMPILER // {activeTech.toUpperCase()} THREAD POOL
              </div>
            </div>
          </div>
        )}

        {/* VIEW C: Floating Holographic PIP Terminal with Animation.svg (In 'hybrid' mode) */}
        {viewMode === 'hybrid' && (
          <div
            onClick={() => setIsPipExpanded(!isPipExpanded)}
            className={`absolute z-20 transition-all duration-300 cursor-pointer pointer-events-auto group/pip ${
              isPipExpanded
                ? 'inset-3 sm:inset-8 rounded-2xl bg-black/95 border-2 border-emerald-400/80 shadow-[0_0_50px_rgba(0,255,163,0.4)] p-3 sm:p-4 flex flex-col'
                : 'bottom-3 right-3 sm:bottom-6 sm:right-6 w-36 xs:w-44 sm:w-60 aspect-[4/3] rounded-xl bg-black/90 backdrop-blur-xl border border-emerald-500/60 p-2 sm:p-2.5 shadow-[0_0_25px_rgba(0,255,163,0.35)] hover:border-emerald-400 hover:shadow-[0_0_35px_rgba(0,255,163,0.5)]'
            }`}
            title="Click to toggle size of Animated SVG Engine"
          >
            {/* PIP Header */}
            <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-emerald-500/30 text-[9px] font-mono text-emerald-400">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold uppercase tracking-wider truncate max-w-[120px] sm:max-w-none">
                  {isPipExpanded ? `LIVE SVG // ${activeTech.toUpperCase()}` : 'LIVE CODE'}
                </span>
              </div>
              <div className="flex items-center gap-1 text-slate-400 group-hover/pip:text-white">
                {isPipExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              </div>
            </div>

            {/* Embedded Animated SVG File */}
            <div className="relative w-full flex-1 overflow-hidden rounded bg-black/40 flex items-center justify-center">
              <img
                src="/assets/Animation.svg"
                alt="Bengal IT Real-time Animated Code Compiler Engine"
                className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(0,255,163,0.25)]"
              />
            </div>

            {/* Micro Caption */}
            {!isPipExpanded && (
              <div className="pt-1 text-[8px] sm:text-[8.5px] font-mono text-cyan-300 text-center uppercase tracking-widest truncate">
                CLICK TO EXPAND
              </div>
            )}
          </div>
        )}

        {/* Dynamic Laser Scanline Sweep */}
        <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent animate-scanline pointer-events-none z-10" />
      </div>

      {/* 3. Bottom Interactive Holographic Status Strip */}
      <div className="p-3 sm:p-5 bg-[#070b0e]/95 border-t border-[var(--line)] backdrop-blur-md relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
          {/* Live Telemetry Indicators */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 text-[10px] sm:text-[11px] font-mono">
            <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded bg-black/60 border border-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
              <span>GPU PIPELINE</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded bg-black/60 border border-cyan-500/20 text-cyan-300">
              <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 animate-pulse" />
              <span>120 FPS NATIVE</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded bg-black/60 border border-red-500/20 text-red-400">
              <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400" />
              <span>AUDIT OK</span>
            </div>
          </div>

          {/* Active Compilation Indicator */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-300 bg-black/50 px-2.5 sm:px-3 py-1 rounded border border-white/10 self-start sm:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>ACTIVE: <strong className="text-white">{activeTech.toUpperCase()}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechProgrammerWorkstation;
