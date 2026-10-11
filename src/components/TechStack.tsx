import React, { useState, useRef } from 'react';
import { Terminal, Smartphone, Globe, Shield, Database, Layers, Laptop } from 'lucide-react';
import type { TechItem } from '../types';
import { TechProgrammerWorkstation } from './TechProgrammerWorkstation';
import { TextScramble } from './TextScramble';
import { soundFX } from '../hooks/useSoundFX';

export const techStackData: (TechItem & { spec: string; speed: string })[] = [
  // Mobile
  {
    name: 'Flutter',
    category: 'Mobile',
    description: 'Cross-platform native compilation with direct GPU Impeller pipeline.',
    spec: 'Impeller Engine',
    speed: '120 FPS Native',
  },
  {
    name: 'Dart',
    category: 'Mobile',
    description: 'AOT & JIT compiled language optimized for ultra-fast multi-platform apps.',
    spec: 'AOT Compiled',
    speed: '< 16ms Frame',
  },
  {
    name: 'Android Native',
    category: 'Mobile',
    description: 'Deep Android OS platform architecture, NDK, and low-level system services.',
    spec: 'NDK / System SDK',
    speed: 'Hardware Accel',
  },
  {
    name: 'Kotlin',
    category: 'Mobile',
    description: 'Modern, idiomatic Android native development with coroutines & Flow.',
    spec: 'Coroutines async',
    speed: 'Zero Overhead',
  },
  {
    name: 'Java Core',
    category: 'Mobile',
    description: 'Enterprise Android legacy stability, JVM optimizations & core system APIs.',
    spec: 'JVM Enterprise',
    speed: 'High Stability',
  },

  // Frontend & Web
  {
    name: 'React',
    category: 'Frontend',
    description: 'Component-driven reactive web applications with concurrent rendering.',
    spec: 'Concurrent React',
    speed: 'Sub-second Hydration',
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    description: 'Strict end-to-end type safety eliminating runtime exceptions in production.',
    spec: 'Strict Mode v5',
    speed: 'Zero Runtime Debt',
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    description: 'Hybrid static & server-side rendering for instant global CDN edge delivery.',
    spec: 'Edge SSR / ISR',
    speed: '< 180ms TTFB',
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    description: 'Utility-first atomic styling compiled into micro-kilobyte CSS payloads.',
    spec: 'Atomic Engine',
    speed: 'Zero Bloat',
  },
  {
    name: 'WordPress & CMS',
    category: 'Frontend',
    description: 'Custom WordPress theme development, WooCommerce store setup, speed optimization & maintenance BD.',
    spec: 'WooCommerce CMS',
    speed: 'Sub-second CDN',
  },

  // Backend & Cloud
  {
    name: 'PHP & Laravel',
    category: 'Backend',
    description: 'PHP Laravel web development Bangladesh, secure MVC architecture, custom APIs & payment gateway integration.',
    spec: 'Laravel v11',
    speed: 'High Concurrency',
  },
  {
    name: 'Python & Django',
    category: 'Backend',
    description: 'Python Django web development BD, automated workflows, data processing & AI backend microservices.',
    spec: 'Django Async',
    speed: '< 40ms Latency',
  },
  {
    name: 'AI & Chatbots',
    category: 'Backend',
    description: 'Custom Python chatbots, Telegram bot development, automated Messenger bots & business workflow automation.',
    spec: 'Python / LLM',
    speed: 'Real-Time AI',
  },
  {
    name: 'Node.js',
    category: 'Backend',
    description: 'High-throughput event-driven runtime handling thousands of concurrent sockets.',
    spec: 'V8 Event Loop',
    speed: '10k+ Req/sec',
  },
  {
    name: 'Firebase',
    category: 'Backend',
    description: 'Real-time WebSocket databases, cloud functions, and enterprise authentication.',
    spec: 'Real-Time Sync',
    speed: '< 50ms Latency',
  },
  {
    name: 'REST & GraphQL',
    category: 'Backend',
    description: 'Robust contract-driven API architectures with strict JSON schema validation.',
    spec: 'Contract API',
    speed: 'Optimized Cache',
  },

  // Security & DevOps
  {
    name: 'OWASP Security',
    category: 'Security & DevOps',
    description: 'Defensive penetration testing, SQLi/XSS mitigation, and runtime hardening.',
    spec: 'OWASP Top 10',
    speed: 'Zero Vulnerability',
  },
  {
    name: 'Enterprise Linux',
    category: 'Security & DevOps',
    description: 'Hardened kernel configuration, AES-256 storage, and containerized microservices.',
    spec: 'Hardened Kernel',
    speed: '99.99% Uptime',
  },
  {
    name: 'Linux VPS & Cloud',
    category: 'Security & DevOps',
    description: 'Linux VPS server management BD, cPanel/WHM setup, AWS & DigitalOcean cloud configurations and 24/7 recovery.',
    spec: 'Cloud DevOps',
    speed: '99.99% Uptime',
  },
  {
    name: 'Facebook Asset Security',
    category: 'Security & DevOps',
    description: 'Facebook page restricted problem solve, Business Manager disabled fix, ad account recovery & profile defense.',
    spec: 'Meta Policy Fix',
    speed: 'Fast Resolution',
  },
  {
    name: 'Git & CI/CD',
    category: 'Security & DevOps',
    description: 'Automated test runners, automated builds, and multi-stage branch pipelines.',
    spec: 'Automated CI/CD',
    speed: 'Instant Deploy',
  },
];

// Interactive 3D Tilt Card with dynamic specular glare
const TechCard3D: React.FC<{
  tech: typeof techStackData[0];
  isSelected: boolean;
  onSelect: () => void;
}> = ({ tech, isSelected, onSelect }) => {
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

    const rotateX = -((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotX(rotateX);
    setRotY(rotateY);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.28,
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mobile':
        return <Smartphone className="w-4 h-4 text-[var(--red)]" />;
      case 'Frontend':
        return <Globe className="w-4 h-4 text-sky-400" />;
      case 'Backend':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'Security & DevOps':
        return <Shield className="w-4 h-4 text-amber-400" />;
      default:
        return <Terminal className="w-4 h-4 text-[var(--red)]" />;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`group relative p-4 sm:p-6 rounded-lg bg-[var(--surface-card)] border transition-all duration-150 ease-out cursor-pointer select-none overflow-hidden flex flex-col justify-between ${
        isSelected
          ? 'border-[var(--red)] shadow-[0_0_30px_rgba(237,51,39,0.35)] ring-1 ring-[var(--red)]'
          : 'border-[var(--line)] hover:border-[var(--red)]/60'
      }`}
      style={{
        transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${
          glare.opacity > 0 ? 1.03 : 1
        }, ${glare.opacity > 0 ? 1.03 : 1}, 1)`,
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

      {/* Holographic Border Highlight */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[var(--red)]/10 to-transparent pointer-events-none rounded-full blur-xl" />

      <div style={{ transform: 'translateZ(15px)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="w-9 h-9 rounded bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center group-hover:scale-110 group-hover:border-[var(--red)]/50 transition-all shadow-sm">
            {getCategoryIcon(tech.category)}
          </div>
          <span className="text-[10px] font-mono text-[var(--fg-3)] uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--line)]">
            {tech.category.split(' ')[0]}
          </span>
        </div>

        <h3 className="font-heading font-medium text-lg text-[var(--fg)] group-hover:text-[var(--red)] transition-colors flex items-center gap-2">
          <TextScramble text={tech.name} />
        </h3>

        <p className="text-xs text-[var(--fg-2)] line-clamp-2 mt-2 leading-relaxed font-body">
          {tech.description}
        </p>
      </div>

      <div
        className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between text-[11px] font-mono text-[var(--fg-3)]"
        style={{ transform: 'translateZ(10px)' }}
      >
        <span className="text-[var(--red)] font-semibold">{tech.speed}</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{tech.spec}</span>
        </div>
      </div>
    </div>
  );
};

export const TechStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTech, setActiveTech] = useState<string>('Flutter');
  const [displayMode, setDisplayMode] = useState<'matrix' | 'cards'>('matrix');

  const categories = ['All', 'Mobile', 'Frontend', 'Backend', 'Security & DevOps'];

  const filteredTech =
    selectedCategory === 'All'
      ? techStackData
      : techStackData.filter((tech) => tech.category === selectedCategory);

  const currentTechDetail =
    techStackData.find((t) => t.name === activeTech) || techStackData[0];

  return (
    <section id="tech-stack" className="py-28 sm:py-36 border-b border-[var(--line)] bg-[var(--bg-main)]">
      <div className="container-junca">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <p className="eyebrow dot-label mb-3">ENGINEERING TOOLCHAIN // 3D WORKSTATION</p>

            <h2 className="font-heading font-medium text-3xl sm:text-5xl md:text-6xl text-[var(--fg)] tracking-tight leading-[1.02] mb-4">
              <TextScramble text="Technologies engineered for scale." />
            </h2>

            <p className="text-base sm:text-lg text-[var(--fg-2)] leading-relaxed">
              Every layer of our stack is selected for native GPU rendering speed, strict type safety, zero security debt, and sub-second global response.
            </p>
          </div>

          {/* Mode Switcher: 3D Dev Workstation vs 3D Tilt Cards */}
          <div className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded bg-[var(--surface)] border border-[var(--line)] w-full sm:w-auto justify-between sm:justify-start">
            <button
              type="button"
              onClick={() => {
                setDisplayMode('matrix');
                soundFX.playClick();
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                displayMode === 'matrix'
                  ? 'bg-[var(--red)] text-white font-semibold shadow-md'
                  : 'text-[var(--fg-2)] hover:text-[var(--fg)]'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>3D Workstation</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setDisplayMode('cards');
                soundFX.playClick();
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                displayMode === 'cards'
                  ? 'bg-[var(--red)] text-white font-semibold shadow-md'
                  : 'text-[var(--fg-2)] hover:text-[var(--fg)]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3D Tilt Cards</span>
            </button>
          </div>
        </div>

        {/* 1. 3D Developer Workstation Showcase Mode */}
        {displayMode === 'matrix' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">
            {/* Left: Interactive 3D Programmer Desk Workstation (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <TechProgrammerWorkstation activeTech={activeTech} />
            </div>

            {/* Right: Active Technology Real-Time Telemetry & Metric Console (5 cols) */}
            <div className="lg:col-span-5 rounded-lg p-5 sm:p-8 md:p-10 bg-[var(--surface-card)] border border-[var(--line)] flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-60 h-60 bg-radial from-[var(--red)]/15 via-transparent to-transparent pointer-events-none rounded-full blur-2xl" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--red)]">
                    SELECTED STACK TELEMETRY
                  </span>
                  <span className="text-[10px] font-mono text-[var(--fg-3)] uppercase tracking-wider">
                    SYSTEM ID // 0{techStackData.findIndex((t) => t.name === currentTechDetail.name) + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-medium text-3xl sm:text-4xl text-[var(--fg)] mb-2">
                    {currentTechDetail.name}
                  </h3>
                  <span className="inline-block px-3 py-1 rounded bg-[var(--surface)] text-[11px] font-mono text-[var(--fg-2)] border border-[var(--line)]">
                    {currentTechDetail.category} Layer
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[var(--fg-2)] font-body leading-relaxed">
                  {currentTechDetail.description}
                </p>

                {/* Technical Specifications Matrix */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded bg-[var(--surface)] border border-[var(--line)]">
                    <span className="block text-[10px] font-mono text-[var(--fg-3)] uppercase tracking-wider mb-1">
                      Architecture Engine
                    </span>
                    <span className="font-heading font-medium text-sm text-[var(--fg)]">
                      {currentTechDetail.spec}
                    </span>
                  </div>

                  <div className="p-4 rounded bg-[var(--surface)] border border-[var(--line)]">
                    <span className="block text-[10px] font-mono text-[var(--fg-3)] uppercase tracking-wider mb-1">
                      Performance Velocity
                    </span>
                    <span className="font-heading font-medium text-sm text-[var(--red)]">
                      {currentTechDetail.speed}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Tech Picker Buttons */}
              <div className="pt-8 border-t border-[var(--line)] relative z-10">
                <span className="block text-[10px] font-mono text-[var(--fg-3)] uppercase tracking-wider mb-3">
                  Inspect Key Technologies:
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Flutter', 'Android Native', 'React', 'TypeScript', 'Node.js', 'Firebase', 'OWASP Security'].map(
                    (name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => {
                          setActiveTech(name);
                          soundFX.playClick();
                        }}
                        className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
                          activeTech === name
                            ? 'bg-[var(--red)] text-white font-semibold'
                            : 'bg-[var(--surface)] text-[var(--fg-2)] hover:text-[var(--fg)] border border-[var(--line)]'
                        }`}
                      >
                        {name}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-4">
          <div className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded bg-[var(--surface)] border border-[var(--line)] overflow-x-auto no-scrollbar max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  soundFX.playClick();
                }}
                className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[var(--ink)] text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                    : 'text-[var(--fg-2)] hover:text-[var(--fg)] hover:bg-[var(--line)]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-[var(--fg-3)]">
            Showing {filteredTech.length} Verified Production Technologies
          </span>
        </div>

        {/* 2. 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredTech.map((tech) => (
            <TechCard3D
              key={tech.name}
              tech={tech}
              isSelected={activeTech === tech.name}
              onSelect={() => setActiveTech(tech.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
