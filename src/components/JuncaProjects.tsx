import React, { useState, useRef, useEffect } from 'react';
import { JuncaCTA } from './JuncaCTA';
import { projectsData } from './Projects';
import type { Project } from '../types';
import {
  X,
  CheckCircle,
  ArrowUpRight,
  ExternalLink,
  Globe,
  Monitor,
  Smartphone,
  RotateCw,
} from 'lucide-react';
import { WaterDistortionImage } from './WaterDistortionImage';

interface JuncaProjectsProps {
  onSelectProject: (projectName: string) => void;
}

// Interactive 3D Tilt Card Component matching Junca Studio .fw__card with real-time Water Ripple
const ProjectCard3D: React.FC<{
  project: Project;
  idx: number;
  total: number;
  onOpen: () => void;
}> = ({ project, idx, total, onOpen }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // 3D tilt calculation (-8 to +8 degrees)
    const rotateX = -((y - centerY) / centerY) * 7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setRotX(rotateX);
    setRotY(rotateY);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
    setCursorPos({ x, y, visible: true });
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
    setGlare({ x: 50, y: 50, opacity: 0 });
    setCursorPos((prev) => ({ ...prev, visible: false }));
  };

  const isEven = idx % 2 === 0;

  return (
    <div
      onClick={onOpen}
      className="group cursor-pointer block select-none"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen()}
      aria-label={`View project details for ${project.name}`}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
          isEven ? '' : 'lg:flex-row-reverse'
        }`}
      >
        {/* 3D Tilt Visual Stage with WebGL Water Distortion Ripple on Hover */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`relative rounded-lg overflow-hidden bg-[#080c10] border border-[var(--line)] ${
            isEven ? 'lg:col-span-7' : 'lg:col-span-8 lg:order-2'
          } aspect-[16/10] sm:aspect-[16/9] transition-transform duration-200 ease-out shadow-xl`}
          style={{
            transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${
              cursorPos.visible ? 1.015 : 1
            }, ${cursorPos.visible ? 1.015 : 1}, 1)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Dynamic Glare Specular Highlight */}
          <div
            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)`,
              opacity: glare.opacity,
            }}
          />

          {/* WebGL Real-Time Water Ripple on Photo Hover */}
          {project.image ? (
            <div className="absolute inset-0 w-full h-full">
              <WaterDistortionImage
                src={project.image}
                alt={project.name}
                className="w-full h-full"
                aspectRatio="aspect-full"
              />
            </div>
          ) : (
            <div
              className={`w-full h-full p-8 sm:p-12 flex flex-col justify-between bg-gradient-to-br ${project.previewGradient}`}
            />
          )}

          {/* Floating Red Cursor Follower Pill (Junca .fw__cursor) */}
          {cursorPos.visible && (
            <div
              className="absolute z-30 pointer-events-none transition-transform duration-75 ease-out"
              style={{
                transform: `translate3d(${cursorPos.x + 15}px, ${cursorPos.y + 15}px, 40px)`,
              }}
            >
              <div className="bg-[var(--red)] text-white text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                <span>{project.liveUrl ? 'Live Preview & Case Study' : 'View Case Study'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          )}

          {/* Top Pill Badges */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded bg-black/75 text-white backdrop-blur-md border border-white/10 shadow-lg">
                {project.category}
              </span>
              {project.liveUrl && (
                <span className="font-mono text-[10px] tracking-wider px-2.5 py-1 rounded bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE PLATFORM</span>
                </span>
              )}
            </div>
            <span className="font-mono text-xs text-white/90 bg-black/60 px-2.5 py-1 rounded backdrop-blur-md">
              0{idx + 1} / 0{total}
            </span>
          </div>

          {/* Bottom Card Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
            <div className="bg-black/85 backdrop-blur-md p-4 sm:p-5 rounded-lg border border-white/15 transform transition-transform duration-300 group-hover:translate-y-[-2px] shadow-2xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[var(--red)]" />
                <h4 className="font-heading text-base sm:text-xl text-white font-medium">
                  {project.name}
                </h4>
              </div>
              <p className="font-body text-xs text-slate-300 line-clamp-1">
                {project.shortDescription}
              </p>
            </div>
          </div>

          {/* Junca Studio Hover Tag Pills (.fw__tags) */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 pointer-events-none z-20">
            {project.technologies.slice(0, 3).map((tag, tIdx) => (
              <span
                key={tIdx}
                className="fw__tag transition-all duration-300 transform group-hover:translate-y-0 translate-y-3 opacity-90 group-hover:opacity-100"
                style={{ transitionDelay: `${tIdx * 60}ms` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Text Content Column */}
        <div className={`space-y-4 ${isEven ? 'lg:col-span-5' : 'lg:col-span-4 lg:order-1'}`}>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--fg-3)] uppercase tracking-wider">
            <span>0{idx + 1} / 0{total}</span>
            <span>•</span>
            <span>{project.category}</span>
          </div>

          <h3 className="font-heading font-medium text-2xl sm:text-3xl text-[var(--fg)] group-hover:text-[var(--red)] transition-colors duration-300">
            {project.name}
          </h3>

          <p className="font-body text-sm sm:text-base text-[var(--fg-2)] leading-relaxed">
            {project.shortDescription}
          </p>

          {project.liveUrl && (
            <div className="flex items-center gap-2 pt-1">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all text-xs font-mono font-medium"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Visit {project.liveUrl.replace('https://', '').replace('/', '')}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-mono text-[var(--red)] tracking-wider uppercase flex items-center gap-2">
              <span>{project.liveUrl ? 'Explore Live Preview & Case Study' : 'Read Full Case Study'}</span>
              <span className="transform transition-transform group-hover:translate-x-1">→</span>
            </span>

            {/* Circular Red Arrow Icon (.fw__ic) */}
            <div className="fw__ic">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10M7 17 17 7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const JuncaProjects: React.FC<JuncaProjectsProps> = ({ onSelectProject }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalTab, setModalTab] = useState<'preview' | 'gallery' | 'mobile'>('preview');
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeLoading, setIframeLoading] = useState(true);

  // Manage body scroll locking and Lenis smooth scroll while modal is active
  useEffect(() => {
    if (selectedProject) {
      // Default to live preview if project has a live URL, else gallery
      setModalTab(selectedProject.liveUrl ? 'preview' : 'gallery');
      setIframeLoading(true);
      setIframeKey(0);

      // 1. Pause Lenis smooth scroll so it does not intercept modal wheel events
      window.__lenis?.stop();

      // 2. Lock body scroll cleanly without layout shift
      const origOverflow = document.body.style.overflow;
      const origPadding = document.body.style.paddingRight;
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }

      // 3. Escape key closes modal
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedProject(null);
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = origOverflow;
        document.body.style.paddingRight = origPadding;
        window.__lenis?.start();
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedProject]);

  return (
    <section id="projects" className="py-24 sm:py-36 border-b border-[var(--line)]">
      <div className="container-junca">
        {/* Header matching Junca Studio's exact typography */}
        <div className="mb-20">
          <p className="eyebrow mb-4">SELECTED WORK</p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <h2 className="font-heading font-medium text-4xl sm:text-6xl lg:text-7xl text-[var(--fg)] tracking-tight leading-[0.98]">
                They trusted us with their technology.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="font-body text-base sm:text-lg text-[var(--fg-2)] leading-relaxed">
                Extraordinary products, undersold by generic templates: that's the gap we close for tech companies. End to end: Android & Flutter mobile apps, high-performance web systems, and defensive cybersecurity.
              </p>
            </div>
          </div>
        </div>

        {/* Asymmetrical 3D Editorial Projects Grid */}
        <div className="space-y-24 sm:space-y-36">
          {projectsData.map((project, idx) => (
            <ProjectCard3D
              key={project.id}
              project={project}
              idx={idx}
              total={projectsData.length}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 sm:mt-32 flex justify-center">
          <div className="w-full max-w-[320px]">
            <JuncaCTA
              label="Discuss a case study"
              href="#contact"
              variant="ink"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedProject(null)}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <div
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto overscroll-contain rounded-2xl bg-[var(--surface-card)] text-[var(--fg)] border border-[var(--line)] shadow-2xl p-4 sm:p-8 md:p-10 select-text"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            style={{
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Close button with circular hover */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[var(--line)] bg-[var(--bg-main)] flex items-center justify-center hover:bg-[var(--red)] hover:text-white transition-colors cursor-pointer z-30"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Modal Title & Header */}
            <div className="mb-6 pr-12">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--red)] font-semibold">
                  {selectedProject.category} Platform
                </span>
                {selectedProject.liveUrl && (
                  <span className="font-mono text-[10px] tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>PRODUCTION ACTIVE</span>
                  </span>
                )}
              </div>

              <h3 className="font-heading font-medium text-2xl sm:text-4xl text-[var(--fg)] leading-tight">
                {selectedProject.name}
              </h3>
              <p className="font-body text-sm sm:text-base text-[var(--fg-2)] mt-2 leading-relaxed">
                {selectedProject.fullDescription || selectedProject.shortDescription}
              </p>
            </div>

            {/* Metrics Row */}
            {selectedProject.metrics && selectedProject.metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 p-4 rounded-xl bg-[var(--surface)] border border-[var(--line)]">
                {selectedProject.metrics.map((m, idx) => (
                  <div key={idx} className="text-center p-2 rounded bg-[var(--surface-card)]/50 border border-[var(--line)]">
                    <span className="block font-heading font-bold text-base sm:text-lg text-[var(--fg)]">
                      {m.value}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-[var(--fg-3)]">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Interactive View Switcher Tabs (If liveUrl exists or gallery exists) */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--line)]">
              <div className="flex flex-wrap items-center gap-2">
                {selectedProject.liveUrl && (
                  <button
                    type="button"
                    onClick={() => setModalTab('preview')}
                    className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                      modalTab === 'preview'
                        ? 'bg-[var(--red)] text-white font-semibold shadow-md'
                        : 'bg-[var(--surface)] text-[var(--fg-2)] hover:text-[var(--fg)] border border-[var(--line)]'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Live Web Preview</span>
                  </button>
                )}

                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setModalTab('gallery')}
                    className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                      modalTab === 'gallery'
                        ? 'bg-[var(--red)] text-white font-semibold shadow-md'
                        : 'bg-[var(--surface)] text-[var(--fg-2)] hover:text-[var(--fg)] border border-[var(--line)]'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Screenshots ({selectedProject.gallery.length})</span>
                  </button>
                )}

                {selectedProject.gallery?.some((g) => g.includes('mobile')) && (
                  <button
                    type="button"
                    onClick={() => setModalTab('mobile')}
                    className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                      modalTab === 'mobile'
                        ? 'bg-[var(--red)] text-white font-semibold shadow-md'
                        : 'bg-[var(--surface)] text-[var(--fg-2)] hover:text-[var(--fg)] border border-[var(--line)]'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile Screen</span>
                  </button>
                )}
              </div>

              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Launch in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* TAB CONTENT A: Live Interactive Web Preview */}
            {modalTab === 'preview' && selectedProject.liveUrl && (
              <div className="mb-8 rounded-xl overflow-hidden border border-white/20 bg-[#0c0d14] shadow-2xl">
                {/* Simulated Chrome Browser Bar */}
                <div className="px-4 py-2.5 bg-[#121520] border-b border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>

                  <div className="flex-1 max-w-lg mx-auto flex items-center justify-between px-3 py-1 rounded bg-black/60 border border-white/10 text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span className="text-emerald-400 font-semibold">https://</span>
                      <span className="text-white truncate">{selectedProject.liveUrl.replace('https://', '')}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIframeLoading(true);
                        setIframeKey((prev) => prev + 1);
                      }}
                      title="Reload preview"
                      className="text-slate-400 hover:text-white transition-colors ml-2 cursor-pointer"
                    >
                      <RotateCw className="w-3 h-3" />
                    </button>
                  </div>

                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--red)] text-white text-[11px] font-mono tracking-wider hover:brightness-110 transition-all shrink-0"
                  >
                    <span>VISIT SITE</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Embedded Live Iframe */}
                <div className="relative w-full h-[320px] sm:h-[480px] md:h-[540px] bg-white">
                  {iframeLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 text-white z-10 space-y-3">
                      <span className="w-7 h-7 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                      <span className="font-mono text-xs text-emerald-400">CONNECTING TO LIVE CLOUD SERVER...</span>
                    </div>
                  )}
                  <iframe
                    key={iframeKey}
                    src={selectedProject.liveUrl}
                    title={`${selectedProject.name} Live Web Preview`}
                    className="w-full h-full border-0"
                    onLoad={() => setIframeLoading(false)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                  />
                </div>
              </div>
            )}

            {/* TAB CONTENT B: Production Screenshots Gallery */}
            {modalTab === 'gallery' && selectedProject.gallery && selectedProject.gallery.length > 0 && (
              <div className="mb-8">
                <div
                  className={`grid gap-4 ${
                    selectedProject.category === 'Mobile'
                      ? 'grid-cols-2 sm:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-2'
                  }`}
                >
                  {selectedProject.gallery
                    .filter((img) => !img.includes('mobile'))
                    .map((imgUrl, gIdx) => (
                      <div
                        key={gIdx}
                        className={`group relative rounded-xl overflow-hidden border border-[var(--line)] bg-[#080c10] shadow-lg hover:border-[var(--red)]/60 transition-all duration-300 ${
                          selectedProject.category === 'Mobile' ? 'aspect-[9/16]' : 'aspect-[16/10]'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`${selectedProject.name} view ${gIdx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                          <span className="text-xs font-mono text-emerald-400 tracking-wider">
                            VIEW 0{gIdx + 1}
                          </span>
                          <a
                            href={imgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-white bg-black/60 px-2 py-1 rounded border border-white/20 hover:border-white"
                          >
                            Full Resolution ↗
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT C: Mobile View */}
            {modalTab === 'mobile' && selectedProject.gallery && (
              <div className="mb-8 flex justify-center">
                {selectedProject.gallery
                  .filter((img) => img.includes('mobile'))
                  .map((imgUrl, gIdx) => (
                    <div
                      key={gIdx}
                      className="relative rounded-3xl overflow-hidden border-4 border-slate-700 bg-black max-w-[280px] aspect-[9/18] shadow-2xl p-2"
                    >
                      <div className="w-24 h-4 bg-slate-800 mx-auto rounded-full mb-2" />
                      <img
                        src={imgUrl}
                        alt={`${selectedProject.name} Mobile View`}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                  ))}
              </div>
            )}

            {/* Highlights / Deliverables */}
            <div className="mb-8 p-5 rounded bg-[var(--surface)] border border-[var(--line)]">
              <h4 className="font-heading font-medium text-sm text-[var(--fg)] mb-3">
                Key Technical Deliverables
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProject.deliverables.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[var(--fg-2)]">
                    <CheckCircle className="w-4 h-4 text-[var(--red)] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg-3)] block mb-3">
                Technologies & Architecture
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tag, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs px-3 py-1.5 rounded border border-[var(--line)] bg-[var(--bg-main)] text-[var(--fg-2)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[var(--line)]">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-[50px] rounded bg-emerald-600 hover:bg-emerald-500 text-white transition-colors font-heading text-sm font-medium flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Globe className="w-4 h-4 shrink-0" />
                  <span className="truncate">Launch Live Site: {selectedProject.liveUrl.replace('https://', '').replace('/', '')}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              )}

              <button
                onClick={() => {
                  const pName = selectedProject.name;
                  setSelectedProject(null);
                  onSelectProject(pName);
                }}
                className="flex-1 h-[50px] rounded bg-[var(--ink)] text-white hover:bg-[var(--red)] transition-colors font-heading text-sm font-medium flex items-center justify-center gap-2 dark:bg-white dark:text-black dark:hover:bg-[var(--red)] dark:hover:text-white cursor-pointer"
              >
                <span>Inquire About Similar Architecture</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default JuncaProjects;
