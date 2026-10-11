import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageCircle, Phone, Sliders } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onStartProject?: () => void;
  activeSectionId?: string;
  onNavigateToSection?: (sectionId: string) => void;
  isSpatialMode?: boolean;
  onToggleMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartProject,
  activeSectionId,
  onNavigateToSection,
  isSpatialMode = true,
  onToggleMode,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localActiveSection, setLocalActiveSection] = useState('hero');

  const currentActive = activeSectionId || localActiveSection;

  const navLinks = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Solutions', href: '#why-bengal', id: 'why-bengal' },
    { label: 'Tech Stack', href: '#tech-stack', id: 'tech-stack' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Process', href: '#process', id: 'process' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    if (isSpatialMode) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'services', 'why-bengal', 'tech-stack', 'projects', 'process', 'about', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setLocalActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSpatialMode]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isSpatialMode
            ? 'py-3 bg-[#07090e]/85 dark:bg-[#07090e]/90 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/10 shadow-lg shadow-black/20'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, 'hero')}
              className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
              aria-label="Bengal IT Agency Home"
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 dark:from-slate-800 dark:to-slate-900 border border-slate-200/50 dark:border-cyan-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.2)] group-hover:border-cyan-400 transition-all duration-300">
                <svg className="w-5 h-5 text-cyan-400 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
                  <path d="M5 19V5L12 14V5H19V19L12 10V19H5Z" fill="currentColor" />
                </svg>
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold tracking-wider text-xl text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                    BENGAL IT
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    BD
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase -mt-0.5">
                  AGENCY BANGLADESH
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/60 dark:border-white/5 shadow-inner">
              {navLinks.map((link) => {
                const isActive = currentActive === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-cyan-600 dark:text-cyan-400 bg-white dark:bg-white/10 shadow-sm font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_6px_rgba(0,229,255,0.8)]" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Right Actions: Mode Toggle + Theme Toggle + Primary CTA */}
            <div className="hidden sm:flex items-center gap-2.5">
              {onToggleMode && (
                <button
                  type="button"
                  onClick={onToggleMode}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-700/60 text-[11px] font-mono text-cyan-400 bg-slate-900/80 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                  title="Toggle between Side-Enter Spatial Deck and Continuous Scroll"
                >
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isSpatialMode ? '3D Blast' : 'Scroll'}</span>
                </button>
              )}

              <ThemeToggle />

              <a
                href="#contact"
                onClick={(e) => {
                  handleNavClick(e, 'contact');
                  if (onStartProject) onStartProject();
                }}
                className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 dark:bg-slate-900 border border-cyan-500/50 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.15)] hover:shadow-[0_0_25px_rgba(0,229,255,0.35)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-cyan-400 group-hover:text-white transition-colors">
                  Start a Project
                </span>
                <ArrowUpRight className="relative w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex sm:hidden items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 sm:hidden animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed top-16 left-0 right-0 bottom-0 bg-[#07090e]/95 text-slate-100 border-t border-slate-800 p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                  Navigation
                </span>
                {onToggleMode && (
                  <button
                    type="button"
                    onClick={() => {
                      onToggleMode();
                      setMobileMenuOpen(false);
                    }}
                    className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700"
                  >
                    Mode: {isSpatialMode ? '3D Blast' : 'Scroll'}
                  </button>
                )}
              </div>
              <nav className="flex flex-col space-y-1.5">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      currentActive === link.id
                        ? 'text-cyan-400 bg-slate-900 border border-cyan-500/30'
                        : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500" />
                  </a>
                ))}
              </nav>

              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={(e) => {
                    handleNavClick(e, 'contact');
                    if (onStartProject) onStartProject();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                >
                  Start a Project
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Mobile Contact Quick Actions */}
            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>ONLINE AGENCY • BANGLADESH</span>
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Available 24/7
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="https://wa.me/8801410075921"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-800/40"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
                <a
                  href="tel:+8801407592175"
                  className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-slate-900 text-slate-200 border border-slate-800"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  Call Direct
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
