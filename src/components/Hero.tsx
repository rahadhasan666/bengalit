import { ArrowUpRight, MessageCircle, Smartphone, Globe, Lock } from 'lucide-react';
import { ThreeDScene } from './ThreeDScene';

interface HeroProps {
  onStartProject?: () => void;
  onExploreServices?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreServices }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden"
    >
      {/* Background Cyber Grid & Ambient Glows */}
      <div className="absolute inset-0 cyber-grid opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ambient-glow-cyan pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] ambient-glow-blue pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6 lg:py-12">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 dark:bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-6 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="tracking-wider uppercase font-semibold">
                BENGAL IT AGENCY • BANGLADESH
              </span>
              <span className="hidden sm:inline text-slate-500">•</span>
              <span className="hidden sm:inline text-slate-400">ONLINE BASED</span>
            </div>

            {/* Main Cinematic Headline */}
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-slate-900 dark:text-white uppercase mb-6">
              WE BUILD{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 drop-shadow-[0_0_20px_rgba(0,229,255,0.35)]">
                DIGITAL EXPERIENCES
              </span>{' '}
              THAT MATTER.
            </h2>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8">
              Bengal IT Agency Bangladesh delivers modern Android apps, Flutter solutions,
              high-performance websites and cybersecurity services for businesses, startups
              and digital products.
            </p>

            {/* Action Buttons: Primary, Secondary, WhatsApp */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto mb-10">
              {/* Primary CTA */}
              <button
                type="button"
                onClick={() => {
                  scrollTo('contact');
                  if (onStartProject) onStartProject();
                }}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all duration-300 shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:shadow-[0_0_35px_rgba(0,229,255,0.5)] active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {/* Secondary CTA */}
              <button
                type="button"
                onClick={() => {
                  scrollTo('services');
                  if (onExploreServices) onExploreServices();
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/80 hover:border-cyan-500/40 transition-all duration-300 w-full sm:w-auto"
              >
                <span>Explore Services</span>
              </button>

              {/* WhatsApp Direct CTA */}
              <a
                href="https://wa.me/8801410075921"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-emerald-400 bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-800/50 hover:border-emerald-500/60 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.1)] w-full sm:w-auto"
                title="Chat with us on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Talk on WhatsApp</span>
              </a>
            </div>

            {/* Quick Domain Badges */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 w-full">
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                  Flutter & Native Android
                </span>
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  Full-Stack Web Engineering
                </span>
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  Authorized Defensive Security
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Technology Sphere Container */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px] lg:min-h-[520px]">
            {/* Ambient Background Radial Glow behind 3D object */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="w-60 h-60 rounded-full border border-cyan-500/20 animate-[spin_40s_linear_infinite]" />
              <div className="w-80 h-80 rounded-full border border-blue-500/10 animate-[spin_60s_linear_infinite_reverse]" />
            </div>

            {/* 3D WebGL Canvas */}
            <div className="relative w-full h-[380px] sm:h-[450px] lg:h-[500px]">
              <ThreeDScene className="w-full h-full" />
            </div>

            {/* Floating Cyber Status Tag */}
            <div className="absolute -bottom-2 sm:bottom-4 right-4 sm:right-8 glass-panel px-3.5 py-2 rounded-xl flex items-center gap-2.5 text-xs font-mono border-cyan-500/30 shadow-lg">
              <div className="w-2 h-2 rounded-full bg-cyan-400 cyber-pulse-dot" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Agency Status</span>
                <span className="text-slate-200 font-semibold">Online & Operating 24/7</span>
              </div>
            </div>

            {/* Floating Tagline Pill */}
            <div className="absolute top-4 left-2 sm:left-6 glass-panel px-3 py-1.5 rounded-lg flex items-center gap-2 text-[11px] font-mono border-slate-700/60 text-slate-300">
              <span className="text-cyan-400 font-bold">#</span>
              <span>Build • Secure • Scale</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scrolling Indicator */}
      <div className="w-full relative z-10 flex flex-col items-center justify-center pt-4">
        <button
          type="button"
          onClick={() => scrollTo('services')}
          className="group flex flex-col items-center gap-2 text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors focus:outline-none"
          aria-label="Scroll to services"
        >
          <span className="tracking-widest uppercase text-[10px]">SCROLL TO EXPLORE</span>
          <div className="w-5 h-8 rounded-full border border-slate-400 dark:border-slate-700 group-hover:border-cyan-400 flex items-start justify-center p-1 transition-colors">
            <div className="w-1 h-2 rounded-full bg-cyan-400 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};
