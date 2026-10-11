import React from 'react';

export const JuncaClients: React.FC = () => {
  const technologies = [
    'Flutter',
    'Android Native',
    'Kotlin',
    'React',
    'TypeScript',
    'Node.js',
    'Firebase',
    'Tailwind CSS',
    'Cybersecurity',
    'Linux SysAdmin',
    'OWASP Hardening',
    'REST API',
  ];

  return (
    <section className="py-16 sm:py-28 md:py-32 border-b border-[var(--line)] overflow-hidden">
      <div className="container-junca flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-16 mb-10 sm:mb-16">
        <div className="max-w-xs">
          <p className="eyebrow mb-3">OUR CLIENTS & PARTNERS</p>
          <p className="font-body text-sm sm:text-base text-[var(--fg-2)] leading-relaxed">
            Tech founders, businesses, and global software companies: they build products that reshape their markets.
            We build the mobile applications, web platforms, and security that make them visible and rock-solid.
          </p>
        </div>

        <div className="flex-1 w-full lg:max-w-2xl">
          <p className="font-heading text-2xl sm:text-3xl text-[var(--fg)] leading-snug">
            Engineered with the same high-standard technical discipline whether you're launching a zero-to-one mobile app or securing critical web infrastructure.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Track (Exact Junca Studio Style) */}
      <div className="w-full overflow-hidden py-4 border-y border-[var(--line)] bg-[var(--surface-card)]">
        <div className="flex items-center gap-12 sm:gap-20 whitespace-nowrap animate-[marqueeX_30s_linear_infinite] w-max">
          {/* Repeat twice for continuous loop */}
          {[...technologies, ...technologies].map((tech, idx) => (
            <div key={idx} className="flex items-center gap-4 text-slate-400 hover:text-[var(--fg)] transition-colors">
              <span className="w-2 h-2 rounded-full bg-[var(--red)]" />
              <span className="font-heading font-medium text-xl sm:text-2xl tracking-tight text-[var(--fg)]">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
