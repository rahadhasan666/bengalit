import { useState, useEffect, useRef } from 'react';
import type { StatItem } from '../types';

export const statsData: StatItem[] = [
  {
    value: 10,
    suffix: '+',
    label: 'Projects & Experiments',
    subtext: 'Completed mobile, web & security initiatives',
  },
  {
    value: 5,
    suffix: '+',
    label: 'Technology Domains',
    subtext: 'Flutter, Android, Web, Cloud & Security',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Digital Focus',
    subtext: '100% online operations with zero legacy drag',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Online Availability',
    subtext: 'Direct digital communication & rapid response',
  },
];

export const Stats: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters
          const duration = 1600; // ms
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const newCounts = statsData.map((stat) => Math.round(stat.value * easeOut));
            setCounts(newCounts);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative py-20 bg-slate-900/20 dark:bg-slate-950/30 border-y border-slate-200/50 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl glass-panel glass-card-hover flex flex-col justify-between text-center sm:text-left border-slate-200 dark:border-white/5"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                  METRIC 0{idx + 1}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>

              <div className="mb-2">
                <span className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight">
                  {counts[idx]}
                  <span className="text-cyan-500 dark:text-cyan-400 text-3xl sm:text-4xl">
                    {stat.suffix}
                  </span>
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-1">
                  {stat.label}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                  {stat.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
