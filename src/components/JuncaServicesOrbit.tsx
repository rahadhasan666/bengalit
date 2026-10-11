import { useEffect, useRef, useState } from 'react';
import JuncaCTA from './JuncaCTA';
import { Smartphone, Globe, Shield, Terminal, Server, Bot } from 'lucide-react';
import { TextScramble } from './TextScramble';

interface OrbitTile {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  type: 'card' | 'media';
  baseAngle: number; // in radians
  orbitRadiusX: number; // horizontal semi-major axis
  orbitRadiusY: number; // vertical semi-minor axis
  icon: typeof Smartphone;
  tag: string;
  svgAsset: string;
  glowColor: string;
}

const orbitTiles: OrbitTile[] = [
  {
    id: '01',
    num: '01',
    title: 'Custom Web & E-Commerce BD',
    subtitle: 'কম খরচে প্রফেশনাল ওয়েবসাইট ও ই-কমার্স তৈরি',
    desc: 'Custom website design BD, WordPress, PHP Laravel, Python Django & corporate portals with speed optimization.',
    type: 'card',
    baseAngle: 0,
    orbitRadiusX: 430,
    orbitRadiusY: 270,
    icon: Globe,
    tag: 'Web & E-Com',
    svgAsset: '/assets/web skills.svg',
    glowColor: 'rgba(56, 189, 248, 0.25)',
  },
  {
    id: '02',
    num: '02',
    title: 'Flutter & Android App Development',
    subtitle: 'Android app development company BD (60-120 FPS)',
    desc: 'Native-compiled cross-platform Flutter mobile apps, Play Store deployment, and reactive UI architecture.',
    type: 'card',
    baseAngle: (Math.PI * 2) / 6,
    orbitRadiusX: 450,
    orbitRadiusY: 280,
    icon: Smartphone,
    tag: 'Mobile App',
    svgAsset: '/assets/Programming Computer.svg',
    glowColor: 'rgba(237, 51, 39, 0.25)',
  },
  {
    id: '03',
    num: '03',
    title: 'Facebook Problem Solving & Security',
    subtitle: 'Facebook page restricted problem solve & recovery',
    desc: 'ফেসবুক আইডি রিকভারি ও সিকিউরিটি সার্ভিস, Facebook Business Manager fix, ad account disabled & monetization issue resolution.',
    type: 'card',
    baseAngle: ((Math.PI * 2) / 6) * 2,
    orbitRadiusX: 420,
    orbitRadiusY: 260,
    icon: Shield,
    tag: 'Social Security',
    svgAsset: '/assets/Animation.svg',
    glowColor: 'rgba(59, 130, 246, 0.25)',
  },
  {
    id: '04',
    num: '04',
    title: 'Cyber Security & Malware Removal BD',
    subtitle: 'Ethical hacking audit, penetration testing & cleanup',
    desc: 'Website security audit BD, website malware removal & cleanup, hacked site recovery & OWASP infrastructure hardening.',
    type: 'card',
    baseAngle: ((Math.PI * 2) / 6) * 3,
    orbitRadiusX: 460,
    orbitRadiusY: 290,
    icon: Terminal,
    tag: 'Cyber Defense',
    svgAsset: '/assets/Cloud Network Illustration.svg',
    glowColor: 'rgba(16, 185, 129, 0.25)',
  },
  {
    id: '05',
    num: '05',
    title: 'Linux VPS, Server & Cloud Hosting',
    subtitle: 'Server setup & Linux VPS management BD',
    desc: 'cPanel/WHM server configuration, AWS & DigitalOcean cloud setups, domain migration, and 24/7 crash troubleshooting.',
    type: 'card',
    baseAngle: ((Math.PI * 2) / 6) * 4,
    orbitRadiusX: 440,
    orbitRadiusY: 270,
    icon: Server,
    tag: 'Server & Cloud',
    svgAsset: '/assets/web skills.svg',
    glowColor: 'rgba(234, 179, 8, 0.25)',
  },
  {
    id: '06',
    num: '06',
    title: 'AI Development & Custom Bots',
    subtitle: 'Python chatbot, Telegram & Messenger automation',
    desc: 'Custom bot development services, intelligent conversational AI chatbots, business workflow automation, and custom Python scrapers.',
    type: 'card',
    baseAngle: ((Math.PI * 2) / 6) * 5,
    orbitRadiusX: 450,
    orbitRadiusY: 275,
    icon: Bot,
    tag: 'AI & Automation',
    svgAsset: '/assets/Code typing concept.svg',
    glowColor: 'rgba(168, 85, 247, 0.25)',
  },
];

interface JuncaServicesOrbitProps {
  onSelectService?: (serviceName: string) => void;
}

export default function JuncaServicesOrbit({ onSelectService }: JuncaServicesOrbitProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalScrollable = section.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-[var(--bg-main)] border-b border-[var(--line)]"
      style={{ height: isMobile ? 'auto' : '300vh' }}
    >
      {/* Pinned 100vh Sticky Viewport (matching Junca Studio's .sorb__pin) */}
      <div
        className={
          isMobile
            ? 'py-24 container-junca'
            : 'sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center'
        }
      >
        {/* Orbital 3D Track for Desktop / Large Screens */}
        {!isMobile && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ perspective: '1200px' }}
            aria-hidden="true"
          >
            {/* Ambient Laser Ellipse Track */}
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[920px] h-[580px] pointer-events-none opacity-30"
              viewBox="0 0 920 580"
            >
              <ellipse
                cx="460"
                cy="290"
                rx="430"
                ry="260"
                fill="none"
                stroke="url(#orbit-laser)"
                strokeWidth="1.5"
                strokeDasharray="6 8"
              />
              <defs>
                <linearGradient id="orbit-laser" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ed3327" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#ed3327" stopOpacity="0.9" />
                </linearGradient>
              </defs>
            </svg>

            {orbitTiles.map((tile) => {
              // Rotation angle progresses with scroll: 1 full orbit + 0.35 extra
              const rotationOffset = scrollProgress * Math.PI * 2.2;
              const currentAngle = tile.baseAngle + rotationOffset;

              // Elliptical coordinate calculation
              const x = Math.cos(currentAngle) * tile.orbitRadiusX;
              const y = Math.sin(currentAngle) * tile.orbitRadiusY * 0.75;
              // Z depth: back of orbit (negative) to front of orbit (positive)
              const z = Math.sin(currentAngle) * 200;

              // Calculate scale and opacity based on depth
              const normalizedDepth = (z + 200) / 400; // 0 (far) to 1 (near)
              const scale = 0.82 + normalizedDepth * 0.32; // 0.82 to 1.14
              const opacity = 0.35 + normalizedDepth * 0.65; // 0.35 to 1.0

              const IconComponent = tile.icon;

              return (
                <article
                  key={tile.id}
                  onClick={() => onSelectService && onSelectService(tile.title)}
                  className="absolute top-1/2 left-1/2 w-[340px] p-5 rounded-xl bg-[var(--ink)] text-white border border-white/15 shadow-2xl transition-all duration-100 ease-out cursor-pointer pointer-events-auto group hover:border-[var(--red)] hover:shadow-[0_0_35px_rgba(237,51,39,0.35)]"
                  style={{
                    transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) scale(${scale})`,
                    opacity: opacity,
                    zIndex: Math.round(normalizedDepth * 10) + 1,
                  }}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono text-xs tracking-wider text-[var(--red)] font-semibold">
                      {tile.num} / 06
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 border border-white/20 px-2 py-0.5 rounded">
                      {tile.tag}
                    </span>
                  </div>

                  {/* Animated SVG Preview Capsule */}
                  <div className="relative w-full h-24 mb-3 rounded-lg overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center p-2 group-hover:border-[var(--red)]/40 transition-colors">
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${tile.glowColor} 0%, transparent 70%)`,
                      }}
                    />
                    <img
                      src={tile.svgAsset}
                      alt={tile.title}
                      className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-1.5 right-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-mono text-emerald-400 border border-emerald-500/30">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                      <span>LIVE SVG</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-1.5">
                    <div className="w-7 h-7 rounded bg-white/10 flex items-center justify-center flex-none group-hover:bg-[var(--red)] transition-colors">
                      <IconComponent className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h3 className="font-heading font-medium text-base text-white group-hover:text-[var(--red)] transition-colors leading-snug">
                      {tile.title}
                    </h3>
                  </div>

                  <p className="text-[11px] text-white/70 font-body mb-1">
                    {tile.subtitle}
                  </p>
                  <p className="text-[11px] text-white/50 font-body line-clamp-2 leading-relaxed">
                    {tile.desc}
                  </p>

                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[var(--red)]">
                    <span>Explore Capability</span>
                    <span className="transform transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Center Pinned Content (Matching Junca Studio's .sorb__center) */}
        <div className="relative z-20 text-center flex flex-col items-center gap-6 px-4 max-w-xl mx-auto">
          <p className="eyebrow dot-label">FULL-SPECTRUM CAPABILITIES</p>
          <h2
            className="font-heading font-medium tracking-tight text-[var(--fg)] leading-[0.98] select-none"
            style={{ fontSize: 'clamp(38px, 6vw, 76px)' }}
          >
            <TextScramble text="Our services." />
          </h2>

          <p className="text-sm sm:text-base text-[var(--fg-2)] max-w-md mx-auto leading-relaxed">
            Turn complex technology into sleek, intuitive, and secure digital products designed for immediate market leadership.
          </p>

          <div className="pt-2 w-full max-w-[280px]">
            <JuncaCTA
              label="Inquire all services"
              href="#contact"
              variant="ink"
              className="w-full"
            />
          </div>

          {!isMobile && (
            <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-[var(--fg-3)] uppercase tracking-wider">
              <span>Scroll to Orbit 3D Capabilities</span>
              <span className="animate-bounce">↓</span>
            </div>
          )}
        </div>

        {/* Mobile Fallback Grid (Matching Junca Studio's .sorb__fallback) */}
        {isMobile && (
          <div className="mt-16 space-y-6 w-full">
            {orbitTiles.map((tile) => {
              const IconComponent = tile.icon;
              return (
                <div
                  key={tile.id}
                  onClick={() => onSelectService && onSelectService(tile.title)}
                  className="p-6 rounded-xl bg-[var(--surface-card)] border border-[var(--line)] space-y-4 cursor-pointer hover:border-[var(--red)] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[var(--red)]">
                      {tile.num} / 06
                    </span>
                    <span className="text-[10px] font-mono uppercase text-[var(--fg-3)]">
                      {tile.tag}
                    </span>
                  </div>

                  {/* Animated SVG Preview on Mobile */}
                  <div className="relative w-full h-32 rounded-lg overflow-hidden bg-black/60 border border-[var(--line)] flex items-center justify-center p-3">
                    <img
                      src={tile.svgAsset}
                      alt={tile.title}
                      className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-mono text-emerald-400 border border-emerald-500/30">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                      <span>LIVE SVG</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center flex-none">
                      <IconComponent className="w-4 h-4 text-[var(--red)]" />
                    </div>
                    <h3 className="font-heading font-medium text-lg text-[var(--fg)]">
                      {tile.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[var(--fg-2)] leading-relaxed">
                    {tile.desc}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export { JuncaServicesOrbit };
