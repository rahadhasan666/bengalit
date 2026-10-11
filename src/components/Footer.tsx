import { ArrowUp, Mail, Phone, MessageCircle, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onSelectService?: (serviceName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectService }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#05070a] text-slate-300 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Subtle Grid Line */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Positioning */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M5 19V5L12 14V5H19V19L12 10V19H5Z" fill="currentColor" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-lg text-white tracking-wider">
                  BENGAL IT
                </span>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5">
                  AGENCY BANGLADESH
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Building modern digital experiences from Bangladesh for the connected world.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>100% Online-Based IT Agency</span>
            </div>
          </div>

          {/* Column 2: Company Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('about')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('services')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('projects')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('process')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Process
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('contact')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    scrollTo('services');
                    if (onSelectService) onSelectService('Flutter & Android App Development');
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Android Development
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    scrollTo('services');
                    if (onSelectService) onSelectService('Flutter & Android App Development');
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Flutter Development
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    scrollTo('services');
                    if (onSelectService) onSelectService('Website Design & Development');
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Website Development
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    scrollTo('services');
                    if (onSelectService) onSelectService('Cybersecurity Services');
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Cybersecurity
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    scrollTo('services');
                    if (onSelectService) onSelectService('Custom Digital Solutions');
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Custom Digital Solutions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href="mailto:rahad.mondal@vbd.com.bd"
                  className="flex items-center gap-2 hover:text-cyan-400 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">rahad.mondal@vbd.com.bd</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/8801410075921"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp Chat</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801407592175"
                  className="flex items-center gap-2 hover:text-cyan-400 transition-colors group"
                >
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>+8801407592175</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li className="pt-2">
                <span className="text-xs font-mono text-slate-500">
                  Location: Bangladesh (Online-Based)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            <span>© 2026 Bengal IT Agency Bangladesh. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Built with technology & creativity.</span>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              aria-label="Scroll to top"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
