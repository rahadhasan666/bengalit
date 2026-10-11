import { useState, useEffect } from 'react';
import {
  Smartphone,
  Globe,
  ShieldCheck,
  Layers,
  ArrowUpRight,
  X,
  CheckCircle,
} from 'lucide-react';
import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'globequill-education',
    name: 'GlobeQuill — Global Education & Visa Platform',
    category: 'Web',
    shortDescription:
      'Official completed international higher education consultancy portal, university directory (120+ Malaysia, 85+ Australia, 95+ UK), and student visa application system.',
    fullDescription:
      'GlobeQuill (globequill.org) is an international educational advisory platform developed by Bengal IT Agency Bangladesh. Designed to guide prospective university students to top international destinations across the UK, Australia, Malaysia, and Europe. Featuring a multi-country university directory, student lead capture funnel, WhatsApp advisory integration, and full Hostinger Cloud CDN deployment.',
    technologies: ['WordPress Engine', 'Custom Theme', 'PHP / MySQL', 'Responsive UI/UX', 'SEO Optimization', 'Cloud Infrastructure'],
    deliverables: [
      'Full production website architecture & custom responsive theme design',
      'Destination country hubs with 300+ university program directories',
      'High-conversion student consultation briefing funnel & direct WhatsApp advisory line',
      'Lighthouse performance tuning and mobile-first navigation',
      'Global SSL security hardening & Hostinger cloud hosting orchestration',
    ],
    metrics: [
      { label: 'Platform Status', value: 'Completed & Live' },
      { label: 'Universities Indexed', value: '300+ Institutions' },
      { label: 'Global Destinations', value: 'UK, Australia, Malaysia' },
    ],
    accentColor: 'from-amber-500/20 to-blue-600/30',
    previewGradient: 'from-slate-900 via-blue-950/40 to-slate-900',
    image: '/assets/projects/globequill/hero.png',
    liveUrl: 'https://globequill.org/',
    gallery: [
      '/assets/projects/globequill/hero.png',
      '/assets/projects/globequill/screen-1.png',
      '/assets/projects/globequill/screen-2.png',
      '/assets/projects/globequill/screen-3.png',
      '/assets/projects/globequill/screen-4.png',
      '/assets/projects/globequill/screen-mobile.png',
    ],
  },
  {
    id: 'rsss-blood-donation',
    name: 'RSSS Blood Donation — Android Platform',
    category: 'Mobile',
    shortDescription:
      'Official completed life-saving voluntary blood donor registry, emergency request network and real-time donor connection across Bangladesh.',
    fullDescription:
      'RSSS Blood Donation is a completed production mobile application built by Bengal IT Agency Bangladesh to bridge the critical gap between blood donors and patients in emergencies. Featuring real-time blood group filtering (A+, B+, O+, AB+, and negative variants), urgent emergency broadcasting, district/hospital donor directory, and direct one-touch WhatsApp and phone communication with verified donors.',
    technologies: ['Flutter', 'Android', 'Firebase', 'Realtime DB', 'Push Notifications', 'GPS Map'],
    deliverables: [
      'Production native Android app deployment & APK release',
      'Emergency blood request broadcasting with instant push alerts',
      'Categorized blood group search with district & upazila filters',
      'Direct one-tap WhatsApp and phone calling to voluntary donors',
      'Verified donor badge validation and automated donation history',
    ],
    metrics: [
      { label: 'Platform Status', value: 'Completed & Live' },
      { label: 'Emergency Alerts', value: 'Real-Time' },
      { label: 'Blood Groups Covered', value: 'All 8 Groups' },
    ],
    accentColor: 'from-rose-500/20 to-red-600/30',
    previewGradient: 'from-slate-900 via-rose-950/40 to-slate-900',
    image: '/assets/projects/rsss-blood/hero.png',
    gallery: [
      '/assets/projects/rsss-blood/screen-1.png',
      '/assets/projects/rsss-blood/screen-2.png',
      '/assets/projects/rsss-blood/screen-3.png',
      '/assets/projects/rsss-blood/screen-4.png',
      '/assets/projects/rsss-blood/screen-5.png',
      '/assets/projects/rsss-blood/screen-6.png',
      '/assets/projects/rsss-blood/screen-7.png',
      '/assets/projects/rsss-blood/screen-8.png',
      '/assets/projects/rsss-blood/screen-9.png',
    ],
  },
  {
    id: 'easy-earn-android',
    name: 'Easy Earn — Android Rewards & Tasks App',
    category: 'Mobile',
    shortDescription:
      'High-engagement Android micro-task, spinning wheel, scratch card rewards and instant bKash/Nagad mobile wallet withdrawal ecosystem.',
    fullDescription:
      'Easy Earn was engineered by Bengal IT Agency Bangladesh as a high-volume financial micro-rewards application for Android. Built with high-frequency state synchronization, automated fraud prevention for rooted devices, spinning wheel physics, scratch card engine, and automated payout pipelines for bKash, Nagad, and mobile airtime recharge.',
    technologies: ['Flutter', 'Android Native', 'REST API', 'bKash/Nagad Wallet', 'AdMob SDK', 'Fraud Guard'],
    deliverables: [
      'Cross-platform Flutter application compiled for Android',
      'Interactive spinning lucky wheel and daily check-in reward engine',
      'Secure coin balance ledger with root & VPN exploit protection',
      'Automated payout pipeline integration for bKash and Nagad',
      'Real-time user referrals tree with multi-level commission payouts',
    ],
    metrics: [
      { label: 'Platform Status', value: 'Completed & Live' },
      { label: 'Payout Processing', value: 'Automated' },
      { label: 'Frame Rate', value: '60 FPS Smooth' },
    ],
    accentColor: 'from-cyan-500/20 to-emerald-600/30',
    previewGradient: 'from-slate-900 via-cyan-950/40 to-slate-900',
    image: '/assets/projects/easy-earn/hero.png',
    gallery: [
      '/assets/projects/easy-earn/screen-1.png',
      '/assets/projects/easy-earn/screen-2.png',
      '/assets/projects/easy-earn/screen-3.png',
      '/assets/projects/easy-earn/screen-4.png',
      '/assets/projects/easy-earn/screen-5.png',
      '/assets/projects/easy-earn/screen-6.png',
    ],
  },
  {
    id: 'apexcloud-console',
    name: 'ApexCloud — SaaS Resource Console',
    category: 'Web',
    shortDescription:
      'High-performance cloud infrastructure management dashboard with real-time server telemetry and role-based permissions.',
    fullDescription:
      'ApexCloud delivers a lightning-fast enterprise web application for monitoring complex cloud environments. Featuring custom SVG data visualizations, low bundle overhead, and zero-latency filtering across thousands of active computing nodes.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'REST API', 'Vite'],
    deliverables: [
      'Interactive responsive dashboard interface',
      'Real-time telemetry stream rendering',
      'Role-based granular access control (RBAC)',
      'Sub-second page transitions and state hydration',
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '98 / 100' },
      { label: 'Payload Weight', value: '< 140 KB' },
      { label: 'Live Data Refresh', value: '1,000ms' },
    ],
    accentColor: 'from-blue-500/20 to-indigo-600/30',
    previewGradient: 'from-slate-900 via-blue-950/40 to-slate-900',
  },
  {
    id: 'nexor-venture',
    name: 'Nexor — Venture Showcase Platform',
    category: 'Web',
    shortDescription:
      'Cinematic digital experience designed for an international technology venture fund with smooth 60fps micro-interactions.',
    fullDescription:
      'Nexor represents minimal luxury UI at its finest. Built for maximum visual impact without sacrificing search engine performance or accessibility, the platform uses tailored typography, subtle glassmorphic panels, and dark-mode aesthetic.',
    technologies: ['React', 'TypeScript', 'Motion', 'Tailwind CSS', 'SEO Pro'],
    deliverables: [
      'Full brand digital identity & web design',
      'Motion choreography with reduced-motion fallbacks',
      'Structured schema metadata for search indexing',
      'Interactive portfolio filtering and detail modals',
    ],
    metrics: [
      { label: 'SEO Audit', value: '100 / 100' },
      { label: 'Accessibility', value: '100%' },
      { label: 'Engagement Time', value: '+68%' },
    ],
    accentColor: 'from-cyan-500/20 to-emerald-600/30',
    previewGradient: 'from-slate-900 via-cyan-950/40 to-slate-900',
  },
  {
    id: 'cybershield-audit',
    name: 'CyberShield — Defensive Security Assessment',
    category: 'Security',
    shortDescription:
      'Authorized defensive vulnerability assessment, threat modeling and Linux server hardening for an online services platform.',
    fullDescription:
      'Conducted strictly authorized defensive security testing against web endpoints, exposed ports, and server configurations. The assessment pinpointed critical misconfigurations, followed by comprehensive hardening, automated fail2ban firewall rules, and SSL/TLS cipher strengthening.',
    technologies: ['Cybersecurity Tools', 'Linux', 'Vulnerability Assessment', 'OWASP', 'Hardening'],
    deliverables: [
      'Full vulnerability assessment report & threat matrix',
      'Linux kernel sysctl & firewall hardening',
      'Web application header & CSP defense implementation',
      'Secure credential rotation and authentication guidelines',
    ],
    metrics: [
      { label: 'Vulnerabilities Remediated', value: '14 Critical/High' },
      { label: 'SSL Labs Score', value: 'A+' },
      { label: 'Compliance Level', value: 'Defensive Standard' },
    ],
    accentColor: 'from-emerald-500/20 to-cyan-600/30',
    previewGradient: 'from-slate-900 via-emerald-950/40 to-slate-900',
  },
  {
    id: 'syncflow-automation',
    name: 'SyncFlow — Digital Integration Hub',
    category: 'Other',
    shortDescription:
      'Custom middleware engine orchestrating asynchronous multi-channel webhooks, inventory sync, and automated billing pipelines.',
    fullDescription:
      'SyncFlow bridged three disconnected legacy enterprise software solutions into a unified, automated ecosystem. Engineered with Node.js and TypeScript, the middleware processes transactions reliably with exponential backoff retries.',
    technologies: ['Node.js', 'TypeScript', 'REST API', 'Git', 'Cloud Automation'],
    deliverables: [
      'High-throughput webhook ingestion worker',
      'Dead-letter queuing and auto-retry engine',
      'Secure API gateway with rate-limiting tokens',
      'Real-time admin monitoring alerts',
    ],
    metrics: [
      { label: 'Sync Throughput', value: '10k req/min' },
      { label: 'Data Accuracy', value: '99.999%' },
      { label: 'Hours Saved Monthly', value: '160+ hrs' },
    ],
    accentColor: 'from-purple-500/20 to-cyan-600/30',
    previewGradient: 'from-slate-900 via-purple-950/40 to-slate-900',
  },
];

interface ProjectsProps {
  onSelectProjectForInquiry?: (projectName: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProjectForInquiry }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Mobile' | 'Web' | 'Security' | 'Other'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters: ('All' | 'Mobile' | 'Web' | 'Security' | 'Other')[] = [
    'All',
    'Mobile',
    'Web',
    'Security',
    'Other',
  ];

  const filteredProjects =
    activeFilter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  useEffect(() => {
    if (selectedProject) {
      window.__lenis?.stop();
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedProject(null);
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = origOverflow;
        window.__lenis?.start();
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedProject]);

  const handleInquire = (project: Project) => {
    setSelectedProject(null);
    if (onSelectProjectForInquiry) {
      onSelectProjectForInquiry(project.name);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white uppercase tracking-tight mb-4">
            SELECTED WORK
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Real engineering outcomes delivered across mobile apps, custom web solutions, and defensive cybersecurity.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/5">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-slate-900 dark:bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
                }`}
              >
                {filter === 'All' ? 'All Projects' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects 2 or 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl glass-panel glass-card-hover overflow-hidden flex flex-col justify-between border-slate-200 dark:border-white/5 hover:border-cyan-400/40"
            >
              <div>
                {/* Visual Preview Header with High-Tech Graphic Mockup */}
                <div
                  className={`relative h-48 sm:h-52 w-full bg-gradient-to-br ${project.previewGradient} p-5 flex flex-col justify-between overflow-hidden border-b border-slate-200 dark:border-white/5`}
                >
                  {/* Subtle Grid and Glow */}
                  <div className="absolute inset-0 cyber-dots opacity-30" />
                  <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />

                  {/* Top Bar: Category badge & Tech icon */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                      {project.category}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-cyan-400 backdrop-blur-md">
                      {project.category === 'Mobile' ? (
                        <Smartphone className="w-4 h-4" />
                      ) : project.category === 'Web' ? (
                        <Globe className="w-4 h-4" />
                      ) : project.category === 'Security' ? (
                        <ShieldCheck className="w-4 h-4" />
                      ) : (
                        <Layers className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  {/* Bottom Preview Mockup Element */}
                  <div className="relative z-10 bg-slate-950/70 backdrop-blur-md border border-white/10 p-3 rounded-xl transform group-hover:translate-y-[-4px] transition-transform duration-300">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 mb-1">
                      <span className="truncate font-semibold">{project.name.split('—')[0]}</span>
                      <span className="text-cyan-400 text-[10px]">{project.metrics[0].value}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full w-4/5 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-5 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Technology Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-md text-cyan-400">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer: View Project Button */}
              <div className="px-6 pb-6 pt-0">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-900 hover:text-white dark:hover:bg-cyan-400 dark:hover:text-slate-950 transition-all duration-300 border border-slate-200 dark:border-white/10 hover:border-transparent focus:outline-none"
                >
                  <span>View Project Case</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedProject(null)}
          />

          {/* Modal Card */}
          <div
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
            style={{ overscrollBehavior: 'contain' }}
            className="relative w-full max-w-2xl bg-[#0c1017] border border-cyan-500/30 text-white rounded-2xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto overscroll-contain"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-10">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 inline-block mb-3">
                {selectedProject.category} Showcase
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                {selectedProject.name}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              {selectedProject.fullDescription}
            </p>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-6 text-center">
              {selectedProject.metrics.map((m, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-display font-bold text-lg sm:text-xl text-cyan-400">
                    {m.value}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Deliverables List */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Engineering Deliverables
              </h4>
              <div className="space-y-2">
                {selectedProject.deliverables.map((del, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Technologies Utilized
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-800/80 text-cyan-300 border border-slate-700/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleInquire(selectedProject)}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all"
              >
                <span>Request Similar Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
