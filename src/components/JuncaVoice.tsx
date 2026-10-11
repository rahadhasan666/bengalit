import React, { useState } from 'react';
import { JuncaCTA } from './JuncaCTA';
import { ShieldCheck, Smartphone, Terminal, Lock } from 'lucide-react';

interface PrincipleCard {
  id: string;
  role: string;
  title: string;
  quote: string;
  metric: string;
  icon: typeof Smartphone;
  gradient: string;
}

const principles: PrincipleCard[] = [
  {
    id: '01',
    role: 'MOBILE ARCHITECTURE',
    title: 'Flutter Native Compilation',
    quote: 'Direct GPU rendering via Impeller/Skia without bridge latency. 60-120 FPS frame stability across thousands of Android models.',
    metric: '120 FPS GPU Rendered',
    icon: Smartphone,
    gradient: 'from-red-950/40 via-zinc-900 to-black',
  },
  {
    id: '02',
    role: 'WEB VELOCITY',
    title: 'Sub-Second TTFB Architecture',
    quote: 'Zero corporate bloat. React, Next.js, and TypeScript structured for sub-200ms initial response time and perfect Core Web Vitals.',
    metric: '< 180ms TTFB Global',
    icon: Terminal,
    gradient: 'from-zinc-900 via-neutral-900 to-black',
  },
  {
    id: '03',
    role: 'CYBER DEFENSE',
    title: 'OWASP Top 10 Hardened',
    quote: 'Every line of code is inspected for SQL injection, XSS, broken auth, and data leakage before reaching any production environment.',
    metric: '0 Critical CVEs',
    icon: ShieldCheck,
    gradient: 'from-red-900/30 via-zinc-900 to-black',
  },
  {
    id: '04',
    role: 'ZERO TRUST',
    title: 'Enterprise Linux Hardening',
    quote: 'Encrypted storage at rest and in transit (AES-256). Isolated containerization, automated log telemetry, and strict IAM governance.',
    metric: '99.9% Production Uptime',
    icon: Lock,
    gradient: 'from-neutral-900 via-zinc-950 to-black',
  },
];

export const JuncaVoice: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="py-32 sm:py-44 border-b border-[var(--line)] bg-[var(--bg-main)]">
      <div className="container-junca">
        {/* Header */}
        <div className="flex flex-col items-start max-w-3xl mb-16 sm:mb-20">
          <p className="eyebrow dot-label mb-3">ENGINEERING PRINCIPLES</p>
          <h2 className="font-heading font-medium text-3xl sm:text-5xl md:text-6xl text-[var(--fg)] tracking-tight leading-[1.02]">
            Engineering standards that protect your valuation.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--fg-2)] leading-relaxed">
            We don’t build throwaway MVPs. We engineer enterprise-grade code that scales smoothly from your first thousand users to millions.
          </p>
        </div>

        {/* Grid: 2 Columns (Big Panel + 4 Interactive Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Big Panel (5 Cols) */}
          <div className="lg:col-span-5 rounded-lg p-6 sm:p-12 bg-[var(--ink)] text-white flex flex-col justify-between border border-white/10 relative overflow-hidden min-h-[380px] sm:min-h-[420px]">
            {/* Ambient Radial */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[var(--red)]/20 via-transparent to-transparent pointer-events-none rounded-full blur-2xl" />

            <div className="relative z-10 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--red)]">
                GUARANTEE // BENGAL.BD
              </span>
              <h3 className="font-heading font-medium text-2xl sm:text-4xl text-white leading-tight">
                No templates. No cut corners. Pure custom engineering.
              </h3>
              <p className="font-body text-sm sm:text-base text-white/70 leading-relaxed">
                Whether you need a Flutter cross-platform mobile app, a web platform, or a defensive cybersecurity audit, we build with an engineering discipline rarely found in standard digital agencies.
              </p>
            </div>

            <div className="relative z-10 pt-8 w-full max-w-[260px]">
              <JuncaCTA
                label="Commence Consultation"
                href="#contact"
                variant="ink"
                className="w-full bg-white text-[var(--ink)] hover:bg-[var(--red)] hover:text-white"
              />
            </div>
          </div>

          {/* Right 4-Card Grid (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((card) => {
              const isHovered = hoveredCard === card.id;
              const IconComp = card.icon;

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative rounded-lg p-6 sm:p-8 bg-[var(--surface-card)] border border-[var(--line)] hover:border-[var(--red)] transition-all duration-300 flex flex-col justify-between overflow-hidden min-h-[260px] cursor-pointer"
                >
                  {/* Subtle Gradient Veil on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} transition-opacity duration-400 pointer-events-none ${
                      isHovered ? 'opacity-95' : 'opacity-0'
                    }`}
                  />

                  {/* Top: Role tag and Metric */}
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--red)] font-semibold">
                      {card.role}
                    </span>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded transition-colors ${
                        isHovered
                          ? 'bg-white/10 text-white'
                          : 'bg-[var(--surface)] text-[var(--fg-3)]'
                      }`}
                    >
                      {card.metric}
                    </span>
                  </div>

                  {/* Middle Content */}
                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded flex items-center justify-center transition-colors ${
                          isHovered ? 'bg-[var(--red)] text-white' : 'bg-[var(--surface)] text-[var(--fg)]'
                        }`}
                      >
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <h4
                        className={`font-heading font-medium text-lg transition-colors ${
                          isHovered ? 'text-white' : 'text-[var(--fg)]'
                        }`}
                      >
                        {card.title}
                      </h4>
                    </div>

                    <p
                      className={`font-body text-xs sm:text-sm leading-relaxed transition-colors ${
                        isHovered ? 'text-white/80' : 'text-[var(--fg-2)]'
                      }`}
                    >
                      {card.quote}
                    </p>
                  </div>

                  {/* Bottom Action */}
                  <div className="relative z-10 mt-6 pt-3 border-t border-[var(--line)] flex items-center justify-between">
                    <span
                      className={`text-[11px] font-mono uppercase tracking-wider transition-colors ${
                        isHovered ? 'text-white' : 'text-[var(--fg-3)]'
                      }`}
                    >
                      Read Standard
                    </span>

                    {/* Circular Red Expanding Icon */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? 'bg-[var(--red)] text-white scale-110'
                          : 'bg-[var(--surface)] text-[var(--fg-3)]'
                      }`}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 7h10v10M7 17 17 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JuncaVoice;
