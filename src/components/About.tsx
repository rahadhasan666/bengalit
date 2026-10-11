import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Users,
  Clock,
  MapPin,
  CheckCircle2,
  Globe2,
} from 'lucide-react';
import { ThreeDScene } from './ThreeDScene';

export const About: React.FC = () => {
  const [bdTime, setBdTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Bangladesh is UTC+6
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Dhaka',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setBdTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const highlights = [
    {
      title: 'Innovation',
      desc: 'Adopting forward-thinking development standards without compromising on system stability.',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
    },
    {
      title: 'Reliability',
      desc: 'Tested, predictable code designed to run smoothly in real-world business conditions.',
      icon: <CheckCircle2 className="w-4 h-4 text-blue-400" />,
    },
    {
      title: 'Security',
      desc: 'Defensive thinking integrated from day one to protect your data, code, and users.',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
    },
    {
      title: 'Performance',
      desc: 'Lightweight architectures delivering rapid response times and fluid interfaces.',
      icon: <Zap className="w-4 h-4 text-sky-400" />,
    },
    {
      title: 'Long-term Collaboration',
      desc: 'We operate as your dedicated technical partner from initial launch to product maturity.',
      icon: <Users className="w-4 h-4 text-indigo-400" />,
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & Highlights */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-4">
              <Globe2 className="w-3.5 h-3.5" />
              <span>ABOUT BENGAL IT AGENCY</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white uppercase tracking-tight mb-6">
              TECHNOLOGY WITH PURPOSE.
            </h2>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              বেঙ্গল আইটি এজেন্সী বাংলাদেশ (Bengal IT Agency Bangladesh) — প্রতিষ্ঠাতা ও প্রধান আইটি কনসালট্যান্ট <strong className="text-cyan-400 font-semibold">মোঃ লাবিব মৃধা (Md Labib Mridha)</strong>। We combine full-stack development, modern UI/UX design, authorized cybersecurity, and AI automation to deliver world-class digital products.
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Founded on the belief that software should feel effortless to users and bulletproof to operators, we operate 100% online from Bangladesh, serving businesses and startups globally with rapid engineering turnaround, zero technical debt, and 24/7 dedicated support.
            </p>

            {/* 5 Highlights Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl glass-panel border-slate-200 dark:border-white/5 ${
                    idx === 4 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-8.5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Abstract 3D Card with Bangladesh Telemetry */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md rounded-2xl glass-panel p-6 sm:p-8 border-cyan-500/30 overflow-hidden shadow-2xl">
              {/* Top Bar with Live Telemetry */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-4 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>BANGLADESH</span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>ONLINE BASED</span>
                </div>
              </div>

              {/* Compact Abstract 3D Visual */}
              <div className="relative h-64 w-full flex items-center justify-center my-2">
                <ThreeDScene className="w-full h-full" isCompact={true} />
              </div>

              {/* Local Time and Operations Banner */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    Dhaka Local Time:
                  </span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold font-mono">
                    {bdTime || '12:00:00 AM'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/5 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-400">Model:</span>
                    <span className="text-cyan-400 font-semibold">100% Online Agency</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Timezone:</span>
                    <span className="text-slate-200">BST (UTC+6) • Global Overlap</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
