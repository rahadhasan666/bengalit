import React, { useState, useEffect } from 'react';
import { X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface JuncaChromeProps {
  onNavigateTo: (id: string) => void;
  activeSection?: string;
}

export const JuncaChrome: React.FC<JuncaChromeProps> = ({ onNavigateTo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (isMenuOpen) {
      window.__lenis?.stop();
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = origOverflow;
        window.__lenis?.start();
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isMenuOpen]);

  const handleLinkClick = (id: string) => {
    setIsMenuOpen(false);
    onNavigateTo(id);
  };

  const navMenuItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Projects', id: 'projects' },
    { label: 'Services', id: 'services' },
    { label: 'Why Bengal IT', id: 'why-bengal' },
    { label: 'Tech Stack', id: 'tech-stack' },
    { label: 'Process', id: 'process' },
    { label: 'Studio', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* 1. Top-Left Fixed Brandmark & Logo */}
      <div className="fixed top-3.5 sm:top-8 left-3 sm:left-10 z-50 select-none pointer-events-auto">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('hero');
          }}
          className="group flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-[#060b09]/85 backdrop-blur-xl border border-emerald-500/25 hover:border-emerald-400/60 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(0,255,163,0.15)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.6),0_0_25px_rgba(0,255,163,0.3)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
          aria-label="Bengal IT Agency Bangladesh Home"
        >
          {/* Official Bengal IT Agency Glowing Mark with Circuits & Red Dot */}
          <div className="relative w-7 h-7 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md group-hover:bg-emerald-400/35 transition-colors" />
            <img
              src="/assets/bengal-logo-mark.png"
              alt="Bengal IT Agency Logo Mark"
              className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,255,163,0.6)] group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-base sm:text-xl text-white tracking-tight uppercase leading-none">
                BENGAL IT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ef3e36] shadow-[0_0_8px_#ef3e36] animate-pulse" />
            </div>
            <span className="text-[7.5px] sm:text-[9px] font-mono tracking-widest text-emerald-400 font-semibold uppercase mt-0.5">
              AGENCY • BANGLADESH
            </span>
          </div>
        </a>
      </div>

      {/* 2. Top-Center Fixed Split Nav (Junca Studio Exact Header Nav) */}
      <nav
        className="hidden md:flex fixed top-9 left-1/2 -translate-x-1/2 z-50 mix-blend-difference pointer-events-auto"
        aria-label="Primary"
      >
        <div className="flex items-center gap-12 text-sm font-heading font-medium tracking-tight text-white/90">
          <ul className="flex items-center gap-6">
            <li>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('projects');
                }}
                className="hover:text-white transition-colors duration-200"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('services');
                }}
                className="hover:text-white transition-colors duration-200"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#why-bengal"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('why-bengal');
                }}
                className="hover:text-white transition-colors duration-200"
              >
                Why Bengal IT
              </a>
            </li>
          </ul>

          <span className="w-1 h-1 rounded-full bg-white/40" />

          <ul className="flex items-center gap-6">
            <li>
              <a
                href="#tech-stack"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('tech-stack');
                }}
                className="hover:text-white transition-colors duration-200"
              >
                Tech Stack
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('about');
                }}
                className="hover:text-white transition-colors duration-200"
              >
                Studio
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('contact');
                }}
                className="hover:text-[var(--red)] transition-colors duration-200"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* 3. Top-Right Fixed Actions: Theme Toggle + Junca's Signature 2-Line Burger */}
      <div className="fixed top-3.5 sm:top-9 right-3 sm:right-10 z-50 mix-blend-difference flex items-center gap-2 sm:gap-4 pointer-events-auto">
        {/* Subtle Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-1.5 text-white/80 hover:text-white transition-colors"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Junca's Iconic 2-Line Burger Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="group relative w-10 h-10 sm:w-11 sm:h-11 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          aria-label="Open menu"
        >
          <span className="w-7 sm:w-8 h-[2px] bg-white transition-all duration-300 group-hover:bg-[var(--red)]" />
          <span className="w-7 sm:w-8 h-[2px] bg-white transition-all duration-300 group-hover:w-4 group-hover:bg-[var(--red)] self-start ml-1 sm:ml-1.5" />
        </button>
      </div>

      {/* 4. Junca Studio Exact Slide-in Architectural Menu Panel */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sliding Panel */}
          <div
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
            style={{ overscrollBehavior: 'contain' }}
            className="relative w-full max-w-[670px] h-full sm:h-[calc(100vh-48px)] sm:my-6 sm:mr-6 bg-[#f2f2f2] dark:bg-[#141414] text-[var(--ink)] dark:text-white sm:rounded-lg p-5 sm:p-12 shadow-2xl flex flex-col justify-between overflow-y-auto overscroll-contain z-10 border border-slate-300/40 dark:border-white/10"
          >
            {/* Top Bar with Logo & Circular Close Button */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-300 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black/40 border border-emerald-500/30 p-1 flex items-center justify-center">
                  <img
                    src="/assets/bengal-logo-mark.png"
                    alt="Bengal IT Emblem"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,255,163,0.6)]"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-extrabold text-base tracking-wide uppercase leading-tight text-slate-900 dark:text-white">
                    BENGAL IT AGENCY
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-emerald-500 font-semibold uppercase">
                    BANGLADESH // BUILD. SECURE. SCALE.
                  </span>
                </div>
              </div>

              {/* Circular Close Button with hover expansion */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="group relative w-12 h-12 rounded-full bg-white dark:bg-[#222222] text-slate-900 dark:text-white flex items-center justify-center overflow-hidden transition-transform duration-300 hover:rotate-90 shadow-md"
                aria-label="Close menu"
              >
                <div className="absolute inset-0 bg-[var(--red)] rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
                <X className="relative z-10 w-5 h-5 group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* Menu Links with hover translation and line reveal */}
            <nav className="my-6 sm:my-8 space-y-1 sm:space-y-3">
              {navMenuItems.map((item) => (
                <div key={item.id} className="overflow-hidden">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.id);
                    }}
                    className="group block font-heading font-medium text-3xl sm:text-5xl md:text-6xl text-[var(--ink)] dark:text-white hover:text-[var(--red)] dark:hover:text-[var(--red)] transition-all duration-300 break-words"
                  >
                    <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-3">
                      {item.label}
                    </span>
                  </a>
                </div>
              ))}
            </nav>

            {/* Bottom Section: Recent Projects & Agency Info */}
            <div className="pt-8 border-t border-slate-300 dark:border-white/10 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-2">
                    Recent Work
                  </span>
                  <ul className="space-y-1.5 font-heading text-slate-700 dark:text-slate-300">
                    <li>
                      <button
                        type="button"
                        onClick={() => handleLinkClick('projects')}
                        className="hover:text-[var(--red)] transition-colors text-left"
                      >
                        GlobeQuill [Global Education & Visa]
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleLinkClick('projects')}
                        className="hover:text-[var(--red)] transition-colors text-left"
                      >
                        RSSS Blood Donation [Mobile App]
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleLinkClick('projects')}
                        className="hover:text-[var(--red)] transition-colors text-left"
                      >
                        Easy Earn [Android Rewards App]
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleLinkClick('projects')}
                        className="hover:text-[var(--red)] transition-colors text-left"
                      >
                        CyberShield [Defensive Audit]
                      </button>
                    </li>
                  </ul>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-2">
                    Direct Channels
                  </span>
                  <ul className="space-y-1.5 font-heading text-slate-700 dark:text-slate-300">
                    <li>
                      <a
                        href="mailto:rahad.mondal@vbd.com.bd"
                        className="hover:text-[var(--red)] transition-colors"
                      >
                        rahad.mondal@vbd.com.bd
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://wa.me/8801410075921"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-emerald-500 transition-colors"
                      >
                        WhatsApp: +8801410075921
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+8801407592175"
                        className="hover:text-[var(--red)] transition-colors"
                      >
                        Phone: +8801407592175
                      </a>
                    </li>
                    <li className="text-[11px] font-mono text-slate-500 pt-1">
                      Bangladesh — Online-Based Agency
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
