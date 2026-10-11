import { ServiceCard } from './ServiceCard';
import type { ServiceItem } from '../types';
import { Layers, ShieldCheck } from 'lucide-react';

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'flutter-android',
    number: '01',
    title: 'Flutter & Android App Development',
    shortDescription:
      'Modern, scalable Android applications built with Flutter and native technologies for smooth performance and beautiful user experiences.',
    features: [
      'Flutter Development',
      'Android Applications',
      'UI/UX Implementation',
      'API Integration',
      'Firebase Integration',
      'App Deployment',
    ],
    icon: 'smartphone',
    highlight: 'Cross-platform agility with native-grade 60fps performance.',
    badge: 'Flagship Core',
  },
  {
    id: 'web-design-dev',
    number: '02',
    title: 'Website Design & Development',
    shortDescription:
      'High-performance websites engineered for modern businesses, startups and digital brands.',
    features: [
      'Business Websites',
      'Portfolio Websites',
      'Landing Pages',
      'Web Applications',
      'Responsive Design',
      'Performance Optimization',
    ],
    icon: 'globe',
    highlight: 'Lightning-fast load speeds and conversion-engineered interfaces.',
    badge: 'Enterprise Grade',
  },
  {
    id: 'cybersecurity',
    number: '03',
    title: 'Cybersecurity Services',
    shortDescription:
      'Security-focused solutions designed to identify vulnerabilities, strengthen systems and protect digital infrastructure.',
    features: [
      'Security Assessment',
      'Web Security',
      'Vulnerability Assessment',
      'Security Hardening',
      'Network Security',
      'Security Consulting',
    ],
    icon: 'shield',
    highlight: 'Strictly authorized, defensive security auditing and system hardening.',
    badge: 'Defensive Only',
  },
  {
    id: 'custom-solutions',
    number: '04',
    title: 'Custom Digital Solutions',
    shortDescription:
      'From concept to deployment, we transform ideas into reliable digital products.',
    features: [
      'Custom Software',
      'API Integration',
      'Automation',
      'Cloud Integration',
      'Digital Product Development',
      'Maintenance & Support',
    ],
    icon: 'cpu',
    highlight: 'Tailored architectures engineered specifically to solve business bottlenecks.',
    badge: 'End-to-End',
  },
];

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 ambient-glow-blue pointer-events-none -translate-y-1/2 opacity-30" />
      <div className="absolute bottom-10 right-0 w-96 h-96 ambient-glow-cyan pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>DISCIPLINES & CAPABILITIES</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white uppercase tracking-tight mb-4">
            WHAT WE BUILD
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Technology designed around your goals. From native mobile ecosystems to
            bulletproof web systems and defensive cybersecurity.
          </p>
        </div>

        {/* Services 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelectService={onSelectService}
            />
          ))}
        </div>

        {/* Ethical Cybersecurity Disclosure Notice */}
        <div className="mt-12 p-4 rounded-xl glass-panel border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2.5 text-cyan-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="font-semibold text-slate-200">AUTHORIZED DEFENSIVE OPERATIONS:</span>
          </div>
          <p className="text-slate-400 text-center sm:text-left">
            Bengal IT Agency Bangladesh conducts cybersecurity operations strictly under mutual authorization
            for vulnerability identification, hardening, and defensive protection.
          </p>
        </div>
      </div>
    </section>
  );
};
