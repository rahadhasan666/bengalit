import React, { useState, useRef } from 'react';
import {
  Compass,
  FileCode2,
  Palette,
  Terminal,
  ShieldCheck,
  Rocket,
  CheckCircle,
} from 'lucide-react';
import type { ProcessStep } from '../types';
import { TextScramble } from './TextScramble';
import { soundFX } from '../hooks/useSoundFX';

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand the idea, requirements, target audience, and business goals.',
    deliverables: [
      'Requirements specification document',
      'Stakeholder alignment & user persona analysis',
      'Feasibility & security perimeter audit',
    ],
  },
  {
    number: '02',
    title: 'Plan',
    description: 'Define technology, architecture, data schemas, and development strategy.',
    deliverables: [
      'Tech stack selection (Flutter, React, Node, etc.)',
      'System architecture & database schema blueprint',
      'Sprint milestones & deployment roadmap',
    ],
  },
  {
    number: '03',
    title: 'Design',
    description: 'Create a modern, intuitive, and conversion-focused interface with minimal luxury aesthetic.',
    deliverables: [
      'Interactive design prototypes',
      'Design system tokens, typography & dark/light palettes',
      'UX user flow validation',
    ],
  },
  {
    number: '04',
    title: 'Build',
    description: 'Develop the product using modern technologies, clean architecture, and version control.',
    deliverables: [
      'Clean modular frontend and mobile application codebase',
      'High-throughput REST API integration',
      'Continuous branch reviews & automated CI builds',
    ],
  },
  {
    number: '05',
    title: 'Test',
    description: 'Test performance, defensive security, responsiveness, and reliability across devices.',
    deliverables: [
      'Cross-device testing (Android, iOS, Web)',
      'Defensive security & vulnerability assessments',
      'Lighthouse speed & accessibility audits',
    ],
  },
  {
    number: '06',
    title: 'Launch',
    description: 'Deploy the final product to stores/servers and provide ongoing support and monitoring.',
    deliverables: [
      'Google Play Store / Cloud server production rollout',
      'DNS, SSL & server hardening verification',
      'Post-launch telemetry & continuous maintenance',
    ],
  },
];

const ProcessCard3D: React.FC<{
  step: ProcessStep;
  idx: number;
  isCurrent: boolean;
  onSelect: () => void;
  getIcon: (idx: number) => React.ReactNode;
}> = ({ step, idx, isCurrent, onSelect, getIcon }) => {
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

  const handleClick = () => {
    soundFX.playClick();
    onSelect();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`group relative p-5 sm:p-8 rounded-xl bg-[var(--surface-card)] border transition-all duration-150 ease-out cursor-pointer select-none flex flex-col justify-between overflow-hidden ${
        isCurrent
          ? 'border-[var(--red)] shadow-[0_0_35px_rgba(237,51,39,0.25)] ring-1 ring-[var(--red)]'
          : 'border-[var(--line)] hover:border-[var(--red)]/60'
      }`}
      style={{
        transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${
          glare.opacity > 0 ? 1.025 : 1
        }, ${glare.opacity > 0 ? 1.025 : 1}, 1)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Specular Glare Reflection */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
          opacity: glare.opacity,
        }}
      />

      <div style={{ transform: 'translateZ(15px)' }}>
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[var(--surface)] text-[var(--red)] border border-[var(--line)]">
            STAGE {step.number}
          </span>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isCurrent
                ? 'bg-[var(--red)] text-white shadow-lg'
                : 'bg-[var(--surface)] text-[var(--fg-2)] group-hover:text-[var(--red)]'
            }`}
          >
            {getIcon(idx)}
          </div>
        </div>

        <h3 className="font-heading font-medium text-2xl text-[var(--fg)] mb-3 group-hover:text-[var(--red)] transition-colors">
          <TextScramble text={step.title} />
        </h3>

        <p className="text-sm text-[var(--fg-2)] leading-relaxed mb-6 font-body">
          {step.description}
        </p>
      </div>

      {/* Deliverables */}
      <div
        className="pt-4 border-t border-[var(--line)] space-y-2.5"
        style={{ transform: 'translateZ(10px)' }}
      >
        <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--fg-3)] block mb-1">
          Stage Deliverables:
        </span>
        {step.deliverables.map((del, dIdx) => (
          <div key={dIdx} className="flex items-start gap-2 text-xs text-[var(--fg-2)]">
            <CheckCircle className="w-3.5 h-3.5 text-[var(--red)] shrink-0 mt-0.5" />
            <span className="leading-snug">{del}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const stageVisuals: {
  svg: string;
  badge: string;
  glow: string;
}[] = [
  {
    svg: '/assets/Programming Computer.svg',
    badge: 'STAGE 01 // DISCOVERY & SPECS',
    glow: 'rgba(56, 189, 248, 0.25)',
  },
  {
    svg: '/assets/Cloud Network Illustration.svg',
    badge: 'STAGE 02 // ARCHITECTURE BLUEPRINT',
    glow: 'rgba(16, 185, 129, 0.25)',
  },
  {
    svg: '/assets/web skills.svg',
    badge: 'STAGE 03 // UI/UX DESIGN SYSTEM',
    glow: 'rgba(245, 158, 11, 0.25)',
  },
  {
    svg: '/assets/Code typing concept.svg',
    badge: 'STAGE 04 // CLEAN CODE COMPILATION',
    glow: 'rgba(168, 85, 247, 0.25)',
  },
  {
    svg: '/assets/Cloud Network Illustration.svg',
    badge: 'STAGE 05 // DEFENSIVE SECURITY AUDIT',
    glow: 'rgba(237, 51, 39, 0.25)',
  },
  {
    svg: '/assets/Animation.svg',
    badge: 'STAGE 06 // CI/CD GLOBAL DEPLOYMENT',
    glow: 'rgba(0, 255, 163, 0.25)',
  },
];

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3); // Default to Stage 04: Build

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Compass className="w-5 h-5" />;
      case 1:
        return <FileCode2 className="w-5 h-5" />;
      case 2:
        return <Palette className="w-5 h-5" />;
      case 3:
        return <Terminal className="w-5 h-5" />;
      case 4:
        return <ShieldCheck className="w-5 h-5" />;
      case 5:
      default:
        return <Rocket className="w-5 h-5" />;
    }
  };

  return (
    <section id="process" className="py-28 sm:py-40 border-b border-[var(--line)] bg-[var(--bg-main)]">
      <div className="container-junca">
        {/* Header */}
        <div className="flex flex-col items-start max-w-3xl mb-12 sm:mb-16">
          <p className="eyebrow dot-label mb-3">EXECUTION ROADMAP // 6-STAGE AGILE PROTOCOL</p>

          <h2 className="font-heading font-medium text-3xl sm:text-5xl md:text-6xl text-[var(--fg)] tracking-tight leading-[1.02] mb-4">
            <TextScramble text="How we engineer your product." />
          </h2>

          <p className="text-base sm:text-lg text-[var(--fg-2)] leading-relaxed">
            A battle-tested 6-stage engineering process designed to eliminate guesswork, accelerate delivery velocity, and guarantee structural security.
          </p>
        </div>

        {/* Interactive Active Stage Live Blueprint Console with Animated SVGs */}
        <div className="mb-14 p-4 sm:p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#0c0d12] via-[#141721] to-[#080808] border border-white/15 text-white shadow-2xl relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-80 h-80 pointer-events-none rounded-full blur-3xl transition-colors duration-500"
            style={{ backgroundColor: stageVisuals[activeStep].glow }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Active Stage Details (6 cols) */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[var(--red)]/20 text-[var(--red)] border border-[var(--red)]/40">
                  {stageVisuals[activeStep].badge}
                </span>
                <span className="font-mono text-xs text-white/50">
                  PROTOCOL 0{activeStep + 1} OF 06
                </span>
              </div>

              <h3 className="font-heading font-medium text-3xl sm:text-4xl text-white">
                <TextScramble text={processSteps[activeStep].title} />
              </h3>

              <p className="font-body text-sm sm:text-base text-slate-300 leading-relaxed">
                {processSteps[activeStep].description}
              </p>

              {/* Deliverables checklist */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Mandatory Phase Deliverables:
                </span>
                {processSteps[activeStep].deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{del}</span>
                  </div>
                ))}
              </div>

              {/* Stage Quick Switcher Pills */}
              <div className="pt-4 flex flex-wrap gap-2">
                {processSteps.map((step, idx) => (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      setActiveStep(idx);
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      activeStep === idx
                        ? 'bg-[var(--red)] text-white font-semibold shadow-md'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    0{idx + 1} {step.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Live Animated SVG Stage (6 cols) */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full aspect-[16/11] max-h-[340px] rounded-xl overflow-hidden bg-black/60 border border-white/15 p-4 flex items-center justify-center group/stage shadow-2xl">
                <img
                  key={stageVisuals[activeStep].svg}
                  src={stageVisuals[activeStep].svg}
                  alt={processSteps[activeStep].title}
                  className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform duration-500 group-hover/stage:scale-105"
                  loading="eager"
                />

                {/* Laser scanline */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--red)]/60 to-transparent animate-scanline pointer-events-none" />

                {/* Status chip */}
                <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between pointer-events-none gap-2">
                  <div className="px-2 sm:px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-emerald-500/30 text-[9px] sm:text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span>VECTOR ENGINE</span>
                  </div>
                  <div className="px-2 sm:px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/15 text-[9px] sm:text-[10px] font-mono text-cyan-300 shrink-0">
                    <span>PHASE 0{activeStep + 1} ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, idx) => (
            <ProcessCard3D
              key={step.number}
              step={step}
              idx={idx}
              isCurrent={activeStep === idx}
              onSelect={() => setActiveStep(idx)}
              getIcon={getStepIcon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
