import React from 'react';
import { ArrowUpRight, MessageCircle, Sparkles } from 'lucide-react';

interface CTAProps {
  onStartProject?: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onStartProject }) => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-16 overflow-hidden bg-gradient-to-br from-slate-900 via-[#0a0f1d] to-slate-950 border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center flex flex-col items-center">
          {/* Background Ambient Glow & Cyber Rings */}
          <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ambient-glow-cyan opacity-30 pointer-events-none" />

          {/* Glowing Animated Ring Background Graphic */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-cyan-500/20 animate-[spin_50s_linear_infinite] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-blue-500/15 animate-[spin_35s_linear_infinite_reverse] pointer-events-none" />

          {/* Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs font-mono text-cyan-400 mb-6 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="tracking-wider uppercase">READY TO COMMENCE</span>
          </div>

          {/* Headline */}
          <h2 className="relative z-10 font-display font-black text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight max-w-4xl leading-[1.1] mb-6">
            YOUR NEXT DIGITAL PRODUCT{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-[0_0_25px_rgba(0,229,255,0.35)]">
              STARTS HERE.
            </span>
          </h2>

          {/* Description */}
          <p className="relative z-10 text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10">
            Let's turn your idea into a powerful digital experience.
            From high-performance Flutter mobile apps to secure web infrastructure.
          </p>

          {/* CTA Buttons */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                scrollToContact();
                if (onStartProject) onStartProject();
              }}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all duration-300 shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_40px_rgba(0,229,255,0.6)] w-full sm:w-auto"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <a
              href="https://wa.me/8801410075921"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-950 border border-emerald-700/60 hover:border-emerald-500 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.15)] w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Talk on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
