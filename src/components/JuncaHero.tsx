import React, { useState, useRef } from 'react';
import { JuncaCTA } from './JuncaCTA';
import { ThreeDScene } from './ThreeDScene';
import { MessageCircle, ShieldCheck, Sparkles, Cpu } from 'lucide-react';
import { TextScramble } from './TextScramble';
import { WaterDistortionImage } from './WaterDistortionImage';
import { Hero3DGravity } from './Hero3DGravity';

interface JuncaHeroProps {
  onStartProject: () => void;
  onExploreServices: () => void;
}

export const JuncaHero: React.FC<JuncaHeroProps> = ({ onStartProject, onExploreServices }) => {
  const [heroView, setHeroView] = useState<'logo' | 'webgl'>('logo');
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 10,
      y: (x / (rect.width / 2)) * 10,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 sm:pt-40 pb-20 flex flex-col justify-between overflow-hidden bg-[var(--bg-main)] border-b border-[var(--line)]"
    >
      {/* Premium 3D Gravitational Physics Background (Dual-Theme Dark & Light Mode) */}
      <Hero3DGravity />

      <div className="container-junca relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & CTAs (7 Cols) */}
          <div className="lg:col-span-7">
            {/* Official Agency Brand Badge */}
            <div className="mb-6 sm:mb-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 backdrop-blur-md text-emerald-400">
                <img
                  src="/assets/bengal-logo-mark.png"
                  alt="Bengal IT Agency Emblem"
                  className="w-4 h-4 object-contain filter drop-shadow-[0_0_6px_rgba(0,255,163,0.8)]"
                />
                <span className="dot-label eyebrow text-xs sm:text-sm font-mono tracking-widest uppercase">
                  <TextScramble text="BENGAL IT AGENCY BANGLADESH • (100% ONLINE)" />
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
            </div>

            {/* Massive Editorial Headline (Unique Primary H1 on Page) */}
            <h1 className="font-heading font-medium text-3xl sm:text-5xl md:text-6xl lg:text-[76px] tracking-tight leading-[1.02] sm:leading-[0.96] text-[var(--fg)] mb-6 sm:mb-8 text-left break-words">
              Bengal IT Agency Bangladesh — Custom Web, Flutter App & Cyber Security BD.
            </h1>

            {/* Supporting Text */}
            <p className="font-body text-sm sm:text-lg lg:text-xl text-[var(--fg-2)] max-w-xl leading-relaxed mb-8 sm:mb-10 text-left">
              বেঙ্গল আইটি এজেন্সী বাংলাদেশ — প্রতিষ্ঠাতা <strong className="text-[var(--fg)] font-medium">মোঃ লাবিব মৃধা (Md Labib Mridha)</strong>। কম খরচে প্রফেশনাল ওয়েবসাইট তৈরি, 60-120 FPS Flutter ও Android অ্যাপ, ফেসবুক রেস্ট্রিকশন ও আইডি সিকিউরিটি, সাইবার সিকিউরিটি অডিট, লিনাক্স VPS এবং AI চ্যাটবট সলিউশন।
            </p>

            {/* Junca's Interactive Action Buttons with Magnetic Physics */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full">
              <div className="w-full sm:w-[220px]">
                <JuncaCTA
                  label="Start a project"
                  onClick={onStartProject}
                  variant="ink"
                  className="w-full"
                />
              </div>

              <div className="w-full sm:w-[220px]">
                <JuncaCTA
                  label="Discover services"
                  onClick={onExploreServices}
                  variant="dark"
                  className="w-full border-[var(--line)]"
                />
              </div>

              <a
                href="https://wa.me/8801410075921"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded text-sm font-body text-emerald-500 hover:text-emerald-400 border border-emerald-500/30 hover:border-emerald-500 transition-colors bg-emerald-500/5 hover:bg-emerald-500/10 w-full sm:w-auto"
                aria-label="Direct WhatsApp Chat"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>WhatsApp Direct</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Dual Hero Stage (Cyber Logo & 3D WebGL Core) (5 Cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[360px] sm:min-h-[500px] lg:min-h-[580px] w-full">
            {/* Background Radial Glow */}
            <div className={`absolute inset-0 bg-radial ${heroView === 'logo' ? 'from-emerald-500/15' : 'from-[var(--red)]/15'} via-transparent to-transparent pointer-events-none rounded-full blur-3xl transition-colors duration-700`} />

            {/* Interactive Showcase View Mode Switcher */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-30 flex items-center p-1 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 text-[10px] font-mono shadow-2xl">
              <button
                type="button"
                onClick={() => setHeroView('logo')}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                  heroView === 'logo'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow-[0_0_12px_rgba(0,255,163,0.3)]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>OFFICIAL LOGO</span>
              </button>
              <button
                type="button"
                onClick={() => setHeroView('webgl')}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                  heroView === 'webgl'
                    ? 'bg-[var(--red)]/20 text-[var(--red)] border border-[var(--red)]/40 font-bold shadow-[0_0_12px_rgba(237,51,39,0.3)]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Cpu className="w-3 h-3 text-[var(--red)]" />
                <span>3D WEBGL CORE</span>
              </button>
            </div>

            {/* View 1: Official Bengal IT Agency Holographic Cyber Logo Showcase */}
            {heroView === 'logo' ? (
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-full relative rounded-2xl p-3.5 sm:p-6 bg-gradient-to-b from-[#060e0a]/90 via-[#040806]/95 to-[#020504] border border-emerald-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,255,163,0.12)] transition-transform duration-200 ease-out select-none overflow-hidden flex flex-col items-center justify-center min-h-[360px] sm:min-h-[500px]"
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
              >
                {/* Cyber Matrix Circuit Grid Texture */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #00ffa3 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Laser Scanline Sweep */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00ffa3]/50 to-transparent animate-scanline pointer-events-none" />

                {/* Dhaka Coordinates Reticle Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-black/70 backdrop-blur-md border border-emerald-500/25 text-[8px] sm:text-[9px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ef3e36] animate-pulse" />
                  <span>DHAKA // 23.6850° N, 90.3563° E</span>
                </div>

                {/* Main Official Bengal IT Agency Artwork Display with Liquid Water Distortion on Hover */}
                <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square rounded-2xl overflow-hidden my-3 sm:my-4 group shadow-2xl border border-emerald-500/25">
                  <WaterDistortionImage
                    src="/assets/bengal-logo-badge.png"
                    alt="Bengal IT Agency Bangladesh Official Brandmark"
                    className="w-full h-full"
                    aspectRatio="aspect-square"
                  />
                </div>

                {/* Sub-Card Holographic Telemetry Strip */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-emerald-500/20 text-[9px] sm:text-[10px] font-mono text-slate-300 z-10">
                  <div className="flex items-center gap-1.5 bg-black/50 px-2.5 py-1.5 rounded border border-emerald-500/15">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="truncate text-emerald-300">DEFENSIVE CYBER AUDIT</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/50 px-2.5 py-1.5 rounded border border-emerald-500/15">
                    <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping flex-shrink-0" />
                    <span className="truncate text-cyan-300">FLUTTER & FAST WEB</span>
                  </div>
                </div>

                {/* Floating 3D Micro-HUD Badge */}
                <div className="hidden xs:flex absolute bottom-2.5 right-3 sm:bottom-3 sm:right-4 z-20 pointer-events-none bg-black/80 backdrop-blur-md border border-emerald-500/30 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded items-center gap-2 text-[8px] sm:text-[9px] font-mono text-emerald-400 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>OFFICIAL BRANDMARK // BD</span>
                </div>
              </div>
            ) : (
              /* View 2: Gyroscopic 3D WebGL Core */
              <div className="w-full h-[340px] sm:h-[480px] lg:h-[560px] relative z-10">
                <ThreeDScene className="w-full h-full" />
                <div className="absolute bottom-4 right-4 z-20 pointer-events-none bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--line)] px-3 py-1.5 rounded flex items-center gap-2 text-[10px] font-mono text-[var(--fg-2)] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse" />
                  <span>Real-Time WebGL Core</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sub-hero Trust Strip */}
      <div className="container-junca relative z-10 pt-10 sm:pt-16 border-t border-[var(--line)] mt-10 sm:mt-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-xs sm:text-sm font-mono text-[var(--fg-2)]">
          <div>
            <span className="block text-[var(--fg)] font-heading text-base sm:text-xl mb-0.5">
              Flutter & Android
            </span>
            <span className="text-[11px] sm:text-xs">Native 60-120fps app engineering</span>
          </div>
          <div>
            <span className="block text-[var(--fg)] font-heading text-base sm:text-xl mb-0.5">
              Custom Web & CMS
            </span>
            <span className="text-[11px] sm:text-xs">WordPress, Laravel, Django, React</span>
          </div>
          <div>
            <span className="block text-[var(--fg)] font-heading text-base sm:text-xl mb-0.5">
              Cyber & Facebook Fix
            </span>
            <span className="text-[11px] sm:text-xs">Malware removal & ID security</span>
          </div>
          <div>
            <span className="block text-[var(--fg)] font-heading text-base sm:text-xl mb-0.5">
              Server & AI Bots
            </span>
            <span className="text-[11px] sm:text-xs">Linux VPS & Python bot development</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JuncaHero;
