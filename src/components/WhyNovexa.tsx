import React from 'react';
import {
  Cpu,
  Zap,
  ShieldCheck,
  TrendingUp,
  Layout,
  MessageSquareCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import type { WhyAdvantage } from '../types';

export const advantagesData: WhyAdvantage[] = [
  {
    id: 'modern-tech',
    title: 'Modern Technology',
    description: 'We build with modern frameworks and development practices, ensuring long-term code maintainability.',
    icon: 'cpu',
    metric: 'Zero Legacy Debt',
  },
  {
    id: 'performance-first',
    title: 'Performance First',
    description: 'Fast, responsive and optimized digital products engineered for sub-second responses and 60fps animations.',
    icon: 'zap',
    metric: '95+ Lighthouse Target',
  },
  {
    id: 'security-mindset',
    title: 'Security Mindset',
    description: 'Security is considered throughout the development process, adhering to OWASP guidelines and defensive practices.',
    icon: 'shield',
    metric: 'Defensive Architecture',
  },
  {
    id: 'scalable-solutions',
    title: 'Scalable Solutions',
    description: 'Products designed to grow with your business, handling traffic surges with clean modular boundaries.',
    icon: 'trending',
    metric: 'Cloud-Ready Scaling',
  },
  {
    id: 'clean-ui-ux',
    title: 'Clean UI/UX',
    description: 'Interfaces that are simple, modern and intuitive, crafted to convert visitors into loyal clients.',
    icon: 'layout',
    metric: 'Minimal Luxury UI',
  },
  {
    id: 'direct-communication',
    title: 'Direct Communication',
    description: 'Clear communication from idea to deployment. You speak directly with the engineers building your software.',
    icon: 'message',
    metric: 'Agile & Transparent',
  },
];

export const WhyNovexa: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'cpu':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'zap':
        return <Zap className="w-5 h-5 text-cyan-400" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
      case 'trending':
        return <TrendingUp className="w-5 h-5 text-cyan-400" />;
      case 'layout':
        return <Layout className="w-5 h-5 text-cyan-400" />;
      case 'message':
      default:
        return <MessageSquareCheck className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="why-bengal-alt" className="relative py-24 sm:py-32 bg-slate-900/30 dark:bg-slate-950/40 border-y border-slate-200/50 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENGINEERING PRINCIPLES</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white uppercase tracking-tight mb-4">
            WHY BENGAL IT AGENCY?
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            We reject fragile templates, unnecessary dependencies, and opaque communication.
            Here is how we deliver value that sets your brand apart.
          </p>
        </div>

        {/* 6 Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantagesData.map((adv, idx) => (
            <div
              key={adv.id}
              className="group p-6 sm:p-7 rounded-2xl glass-panel glass-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:border-cyan-400/40 group-hover:shadow-[0_0_12px_rgba(0,229,255,0.2)] transition-all">
                    {getIcon(adv.icon)}
                  </div>
                  {adv.metric && (
                    <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                      {adv.metric}
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {adv.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {adv.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 dark:border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Bengal IT Standard 0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
