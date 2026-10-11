import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  Zap,
  Users,
  Code2,
  Lock,
  GitPullRequest,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Trust3DShield } from './Trust3DShield';
import { TextScramble } from './TextScramble';
import { JuncaCTA } from './JuncaCTA';
import { soundFX } from '../hooks/useSoundFX';

interface WhyPillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  metric: string;
  metricLabel: string;
  icon: typeof ShieldCheck;
  accent: string;
  badge: string;
  svgAsset: string;
}

const WHY_PILLARS: WhyPillar[] = [
  {
    id: '01',
    number: '01',
    title: 'Zero Middlemen Guarantee',
    tagline: 'Direct line to senior engineers writing your code.',
    description:
      'No non-technical account managers, no commission-hungry sales reps. You collaborate directly with Flutter, full-stack, and cybersecurity specialists who solve problems in real time.',
    metric: '100%',
    metricLabel: 'Direct Engineering Access',
    icon: Users,
    accent: '#ed3327',
    badge: 'UNFILTERED AGILITY',
    svgAsset: '/assets/Code typing concept.svg',
  },
  {
    id: '02',
    number: '02',
    title: 'Native 120 FPS Performance',
    tagline: 'Direct GPU compilation with zero lag or frame drops.',
    description:
      'We write production-grade Flutter, Kotlin, and React systems optimized for native thread dispatching and sub-second web hydration. Your apps will feel fluid on every screen.',
    metric: '120 FPS',
    metricLabel: 'GPU Rendered Frame Rate',
    icon: Zap,
    accent: '#f59e0b',
    badge: 'HARDWARE ACCELERATED',
    svgAsset: '/assets/Programming Computer.svg',
  },
  {
    id: '03',
    number: '03',
    title: 'OWASP Defensive Hardening',
    tagline: 'Security audited from sprint zero, not as an afterthought.',
    description:
      'Every endpoint, authentication flow, and database query is inspected against SQLi, XSS, SSRF, and broken authorization. We deliver cyber-resilient architectures that protect your valuation.',
    metric: '0 CVE',
    metricLabel: 'Critical Vulnerability Guarantee',
    icon: Lock,
    accent: '#10b981',
    badge: 'ZERO TRUST READY',
    svgAsset: '/assets/Cloud Network Illustration.svg',
  },
  {
    id: '04',
    number: '04',
    title: 'Full Source Code & IP Handover',
    tagline: 'You own 100% of your code, assets, and documentation.',
    description:
      'Complete Git repository handover, clean architecture blueprints, CI/CD pipeline access, and production container manifests. Zero vendor lock-in, complete freedom.',
    metric: '100%',
    metricLabel: 'IP Ownership Transfer',
    icon: GitPullRequest,
    accent: '#38bdf8',
    badge: 'ZERO VENDOR LOCK-IN',
    svgAsset: '/assets/Animation.svg',
  },
  {
    id: '05',
    number: '05',
    title: 'Transparent Agile Velocity',
    tagline: 'Real-time sprint visibility and rapid milestone deliveries.',
    description:
      'Track real-time progress via GitHub commits, staging test builds, and milestone demos. We communicate daily via WhatsApp and Slack so you never wonder what is happening.',
    metric: '< 24hr',
    metricLabel: 'Milestone Turnaround',
    icon: Code2,
    accent: '#a855f7',
    badge: 'DAILY VISIBILITY',
    svgAsset: '/assets/web skills.svg',
  },
  {
    id: '06',
    number: '06',
    title: 'Post-Launch Production Support',
    tagline: 'Dedicated maintenance, server monitoring, and scaling SLA.',
    description:
      'We stay by your side after product launch to ensure uptime, monitor traffic spikes, patch platform updates, and deploy features as your user base expands.',
    metric: '99.9%',
    metricLabel: 'Production Uptime SLA',
    icon: ShieldCheck,
    accent: '#ed3327',
    badge: 'ENTERPRISE SLA',
    svgAsset: '/assets/Cloud Network Illustration.svg',
  },
];

// Interactive 3D Tilt Pillar Card
const PillarCard3D: React.FC<{ pillar: WhyPillar }> = ({ pillar }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotX(rotateX);
    setRotY(rotateY);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseEnter = () => {
    soundFX.playHover();
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const IconComp = pillar.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-xl bg-[var(--surface-card)] border border-[var(--line)] p-8 transition-all duration-150 ease-out select-none flex flex-col justify-between overflow-hidden hover:border-[var(--red)] hover:shadow-[0_15px_40px_rgba(237,51,39,0.18)]"
      style={{
        transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${
          glare.opacity > 0 ? 1.025 : 1
        }, ${glare.opacity > 0 ? 1.025 : 1}, 1)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic Specular Glare Reflection */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.45) 0%, transparent 60%)`,
          opacity: glare.opacity,
        }}
      />

      {/* Top Ambient Glow */}
      <div
        className="absolute -top-10 -right-10 w-36 h-36 rounded-full pointer-events-none blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"
        style={{ backgroundColor: pillar.accent }}
      />

      <div style={{ transform: 'translateZ(15px)' }}>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform shadow-md"
            style={{ backgroundColor: `${pillar.accent}20` }}
          >
            <IconComp className="w-6 h-6" style={{ color: pillar.accent }} />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[var(--surface)] text-[var(--fg-2)] border border-[var(--line)]">
              {pillar.badge}
            </span>
            <span className="font-mono text-xs text-[var(--red)] font-bold">
              {pillar.number}
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="font-heading font-medium text-xl sm:text-2xl text-[var(--fg)] group-hover:text-[var(--red)] transition-colors mb-2">
          <TextScramble text={pillar.title} />
        </h3>

        <p className="font-body text-xs font-semibold text-[var(--fg-3)] uppercase tracking-wider mb-2">
          {pillar.tagline}
        </p>

        {/* Animated Vector Illustration */}
        <div className="relative w-full h-24 my-3 rounded-lg overflow-hidden bg-black/50 border border-[var(--line)] flex items-center justify-center p-2 group-hover:border-[var(--red)]/40 transition-colors">
          <img
            src={pillar.svgAsset}
            alt={pillar.title}
            className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-1.5 right-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-mono text-emerald-400 border border-emerald-500/30">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE SVG</span>
          </div>
        </div>

        <p className="font-body text-sm text-[var(--fg-2)] leading-relaxed">
          {pillar.description}
        </p>
      </div>

      {/* Bottom Metric Bar */}
      <div
        className="mt-8 pt-5 border-t border-[var(--line)] flex items-center justify-between"
        style={{ transform: 'translateZ(10px)' }}
      >
        <div>
          <span
            className="font-heading font-bold text-2xl tracking-tight block"
            style={{ color: pillar.accent }}
          >
            {pillar.metric}
          </span>
          <span className="text-[10px] font-mono uppercase text-[var(--fg-3)] tracking-wider">
            {pillar.metricLabel}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[var(--red)] font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-200">
          <span>Verified</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};

export const JuncaWhy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pillars' | 'comparison'>('pillars');

  const comparisonRows = [
    {
      feature: 'Communication & Middlemen',
      traditional: 'Sales reps & junior project managers filtering messages',
      bengal: 'Direct WhatsApp/Slack channel with Senior Lead Engineers',
    },
    {
      feature: 'Mobile App Compilation',
      traditional: 'Heavy web wrappers with micro-stutters and battery drain',
      bengal: 'Flutter & Kotlin GPU Impeller compiled at smooth 60-120 FPS',
    },
    {
      feature: 'Web Performance & Architecture',
      traditional: 'Bloated WordPress templates with 3+ second load times',
      bengal: 'Next.js & TypeScript with Sub-180ms TTFB & 100% Core Web Vitals',
    },
    {
      feature: 'Defensive Cybersecurity',
      traditional: 'Ignored until data breaches or vulnerability audits fail',
      bengal: 'Hardened against OWASP Top 10 with authorized penetration audit',
    },
    {
      feature: 'Code & Intellectual Property',
      traditional: 'Hidden repositories, vendor lock-in & hostage IP licensing',
      bengal: '100% full Git repository transfer & unencumbered IP ownership',
    },
  ];

  return (
    <section id="why-bengal" className="py-28 sm:py-40 border-b border-[var(--line)] bg-[var(--bg-main)]">
      {/* Anchor alias for backward-compatibility */}
      <div id="why-novexa" className="sr-only" />
      <div className="container-junca">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--red)] animate-ping" />
              <p className="eyebrow dot-label">WHY CLIENTS CHOOSE BENGAL IT AGENCY</p>
            </div>

            <h2 className="font-heading font-medium text-3xl sm:text-5xl md:text-6xl text-[var(--fg)] tracking-tight leading-[1.02] mb-4">
              <TextScramble text="Engineered for founders who demand excellence." />
            </h2>

            <p className="text-base sm:text-lg text-[var(--fg-2)] leading-relaxed">
              At Bengal IT Agency Bangladesh, we eliminate agency bureaucracy. You partner directly with elite developers who take ownership of your product from architecture to global deployment.
            </p>
          </div>

          {/* Interactive View Toggle */}
          <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[var(--surface)] border border-[var(--line)] self-start lg:self-end">
            <button
              type="button"
              onClick={() => {
                setActiveTab('pillars');
                soundFX.playClick();
              }}
              className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'pillars'
                  ? 'bg-[var(--red)] text-white font-semibold shadow-md'
                  : 'text-[var(--fg-2)] hover:text-[var(--fg)]'
              }`}
            >
              <span>3D Pillars</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('comparison');
                soundFX.playClick();
              }}
              className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'comparison'
                  ? 'bg-[var(--red)] text-white font-semibold shadow-md'
                  : 'text-[var(--fg-2)] hover:text-[var(--fg)]'
              }`}
            >
              <span>The Bengal IT Advantage</span>
            </button>
          </div>
        </div>

        {/* 1. 3D Interactive Trust Stage + Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 p-5 sm:p-10 lg:p-12 rounded-2xl bg-gradient-to-br from-[#0c0d12] via-[#141721] to-[#080808] border border-white/15 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[var(--red)]/20 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />

          {/* Left Text & Direct Guarantee */}
          <div className="lg:col-span-7 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-[var(--red)] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Agency Standard</span>
            </div>

            <h3 className="font-heading font-medium text-2xl sm:text-4xl text-white leading-tight">
              We treat your code and budget with the care of technical co-founders.
            </h3>

            <p className="font-body text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              From fast-moving venture startups to enterprise digital modernization, our online-based model in Bangladesh delivers Silicon Valley engineering standards at exceptional velocity.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full">
              <div className="w-full sm:w-[250px]">
                <JuncaCTA
                  label="Schedule Technical Call"
                  href="#contact"
                  variant="ink"
                  className="w-full bg-white text-black hover:bg-[var(--red)] hover:text-white"
                />
              </div>

              <a
                href="https://wa.me/8801410075921"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded text-sm font-mono text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-500 bg-emerald-500/10 transition-colors w-full sm:w-auto"
              >
                <span>WhatsApp Founder Direct</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right 3D Interactive Cyber Shield WebGL */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <Trust3DShield className="w-full" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none bg-black/80 backdrop-blur-md px-3 py-1 rounded border border-white/10 text-[10px] font-mono text-white/70 uppercase tracking-widest whitespace-nowrap">
              <span>Click Shield Core for Shockwave</span>
            </div>
          </div>
        </div>

        {/* 2. Tab Content: 6 3D Material Motion Cards */}
        {activeTab === 'pillars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_PILLARS.map((pillar) => (
              <PillarCard3D key={pillar.id} pillar={pillar} />
            ))}
          </div>
        )}

        {/* 3. Tab Content: Direct Comparison Table (Bengal IT vs Traditional Agencies) */}
        {activeTab === 'comparison' && (
          <div className="rounded-xl overflow-hidden border border-[var(--line)] bg-[var(--surface-card)] shadow-xl">
            <div className="hidden sm:grid grid-cols-12 bg-[var(--surface)] p-5 border-b border-[var(--line)] text-xs font-mono uppercase tracking-wider text-[var(--fg-3)]">
              <div className="col-span-4 font-semibold text-[var(--fg)]">Deliverable Standard</div>
              <div className="col-span-4 text-red-400">Traditional Agencies / Freelancers</div>
              <div className="col-span-4 text-emerald-400 font-bold">Bengal IT Agency Advantage</div>
            </div>

            <div className="divide-y divide-[var(--line)]">
              {comparisonRows.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 p-4 sm:p-6 items-start sm:items-center gap-3 sm:gap-4 hover:bg-[var(--surface)]/50 transition-colors"
                >
                  <div className="col-span-12 sm:col-span-4">
                    <span className="font-heading font-medium text-base text-[var(--fg)] block mb-1">
                      {row.feature}
                    </span>
                  </div>

                  <div className="col-span-12 sm:col-span-4 flex items-start gap-2 text-sm text-[var(--fg-2)] p-2.5 sm:p-0 rounded bg-red-500/5 sm:bg-transparent border border-red-500/10 sm:border-0">
                    <XCircle className="w-4 h-4 text-red-500/80 flex-none mt-0.5" />
                    <div>
                      <span className="sm:hidden block text-[10px] font-mono text-red-400 uppercase tracking-wider mb-0.5">Traditional Agencies:</span>
                      <span>{row.traditional}</span>
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-4 flex items-start gap-2 text-sm text-[var(--fg)] font-medium p-2.5 sm:p-0 rounded bg-emerald-500/5 sm:bg-transparent border border-emerald-500/10 sm:border-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-none mt-0.5" />
                    <div>
                      <span className="sm:hidden block text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-0.5">Bengal IT Advantage:</span>
                      <span>{row.bengal}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default JuncaWhy;
