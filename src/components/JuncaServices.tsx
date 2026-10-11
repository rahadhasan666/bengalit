import React from 'react';
import { JuncaCTA } from './JuncaCTA';
import { ShieldCheck } from 'lucide-react';

interface JuncaServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const JuncaServices: React.FC<JuncaServicesProps> = ({ onSelectService }) => {
  const servicesList = [
    {
      num: '01',
      title: 'Web Design & UX Architecture',
      subtitle: 'Designed for conversion & technical credibility',
      desc: 'Interfaces that make complex products clear, modern, and desirable to the people who buy them. Minimal luxury layout engineered for impact.',
      features: ['UI/UX Systems', 'Interactive Prototypes', 'Conversion Engineering', 'Mobile-First Design'],
    },
    {
      num: '02',
      title: 'Flutter & Android App Development',
      subtitle: 'Native 60fps performance & cross-platform speed',
      desc: 'Modern, scalable Android applications built with Flutter and native technologies for smooth user experiences, biometrics, and offline sync.',
      features: ['Flutter Multiplatform', 'Native Kotlin/Android', 'Firebase Integration', 'Play Store Deployment'],
    },
    {
      num: '03',
      title: 'Website Design & Development',
      subtitle: 'High-performance web engineered for modern business',
      desc: 'High-speed websites, SaaS portals, and web applications engineered with React, TypeScript, and clean code for sub-second page loads.',
      features: ['React & Next.js', 'TypeScript Architecture', 'Full Responsiveness', 'Performance Optimization'],
    },
    {
      num: '04',
      title: 'Cybersecurity Services',
      subtitle: 'Authorized defensive assessments & hardening',
      desc: 'Strictly authorized, defensive security solutions designed to identify vulnerabilities, harden Linux servers, and protect digital infrastructure.',
      features: ['Vulnerability Assessment', 'Web App Security', 'Linux Server Hardening', 'OWASP Compliance'],
    },
    {
      num: '05',
      title: 'Custom Digital Solutions',
      subtitle: 'From concept to deployment, tailored to your goals',
      desc: 'Custom software, API integrations, workflow automations, and cloud middleware transforming your business bottlenecks into automated pipelines.',
      features: ['Custom Backend & APIs', 'Workflow Automation', 'Cloud Integration', 'Maintenance & Support'],
    },
  ];

  return (
    <section id="services" className="py-24 sm:py-36 border-b border-[var(--line)]">
      <div className="container-junca">
        {/* Header matching Junca Studio */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <p className="eyebrow mb-4">OUR CAPABILITIES</p>
            <h2 className="font-heading font-medium text-4xl sm:text-6xl lg:text-7xl text-[var(--fg)] tracking-tight">
              Our services.
            </h2>
          </div>

          <div style={{ width: '260px' }}>
            <JuncaCTA
              label="Discuss a project"
              onClick={() => onSelectService('General Technical Consultation')}
              variant="ink"
              className="w-full"
            />
          </div>
        </div>

        {/* Services List matching Junca Studio's numbered editorial layout */}
        <div className="divide-y divide-[var(--line)]">
          {servicesList.map((svc) => (
            <div
              key={svc.num}
              className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start group transition-colors hover:bg-[var(--surface-card)] px-4 sm:px-6 rounded-lg"
            >
              {/* Number */}
              <div className="md:col-span-1">
                <span className="font-mono text-base font-bold text-[var(--red)]">
                  {svc.num}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="md:col-span-5">
                <h3 className="font-heading font-medium text-2xl sm:text-3xl text-[var(--fg)] mb-2 group-hover:text-[var(--red)] transition-colors">
                  {svc.title}
                </h3>
                <p className="font-body text-sm text-[var(--fg-2)]">
                  {svc.subtitle}
                </p>
              </div>

              {/* Description & Capabilities */}
              <div className="md:col-span-6 flex flex-col justify-between h-full">
                <p className="font-body text-sm sm:text-base text-[var(--fg-2)] leading-relaxed mb-6">
                  {svc.desc}
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {svc.features.map((feat, fIdx) => (
                    <span
                      key={fIdx}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-black/5 dark:bg-white/10 text-[var(--fg)] border border-slate-300 dark:border-white/10"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectService(svc.title)}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--red)] hover:underline font-semibold self-start"
                >
                  <span>Inquire about this capability</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Defensive Security Notice */}
        <div className="mt-16 p-4 rounded border border-[var(--line)] flex items-center gap-3 text-xs font-mono text-[var(--fg-2)] bg-[var(--surface-card)]">
          <ShieldCheck className="w-4 h-4 text-[var(--red)] shrink-0" />
          <span>
            Bengal IT Agency Bangladesh conducts cybersecurity operations strictly under mutual authorization for vulnerability assessment, testing, and defensive system hardening.
          </span>
        </div>
      </div>
    </section>
  );
};
