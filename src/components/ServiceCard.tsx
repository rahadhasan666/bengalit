import { useState, useRef } from 'react';
import {
  Smartphone,
  Globe,
  ShieldCheck,
  Cpu,
  Check,
  ArrowRight,
} from 'lucide-react';
import type { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  onSelectService?: (serviceTitle: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelectService }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'smartphone':
        return <Smartphone className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />;
      case 'globe':
        return <Globe className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />;
      case 'shield':
        return <ShieldCheck className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />;
      case 'cpu':
      default:
        return <Cpu className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt
    const rotX = ((y - centerY) / centerY) * -4;
    const rotY = ((x - centerX) / centerX) * 4;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${isHovered ? '8px' : '0px'})`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      className={`group relative h-full flex flex-col justify-between p-6 sm:p-8 rounded-2xl glass-panel ${
        isHovered
          ? 'border-cyan-400/50 shadow-[0_20px_40px_-15px_rgba(0,229,255,0.18)] bg-slate-900/90 dark:bg-slate-900/90'
          : 'border-slate-200 dark:border-white/5'
      }`}
    >
      {/* Background Gradient shift on hover */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/5 pointer-events-none transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Top Header: Number, Icon, Badge */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:border-cyan-400/40 group-hover:bg-cyan-950/20 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.25)] transition-all duration-300">
              {getIcon(service.icon)}
            </div>
            {service.badge && (
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {service.badge}
              </span>
            )}
          </div>
          <span className="font-mono text-xl sm:text-2xl font-bold text-slate-300 dark:text-slate-700 group-hover:text-cyan-400 transition-colors">
            {service.number}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white mb-3 group-hover:text-cyan-400 transition-colors">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          {service.shortDescription}
        </p>

        {/* Features Checklist */}
        <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-white/5 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Key Capabilities
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <div className="w-4 h-4 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action: Request Service Button */}
      <div className="relative z-10 pt-4 border-t border-slate-200 dark:border-white/5">
        <button
          type="button"
          onClick={() => {
            if (onSelectService) {
              onSelectService(service.title);
            } else {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="w-full group/btn inline-flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/60 hover:bg-cyan-500 hover:text-slate-950 dark:hover:bg-cyan-400 dark:hover:text-slate-950 transition-all duration-300 border border-slate-200 dark:border-white/10 hover:border-transparent focus:outline-none"
        >
          <span>Start with {service.title.split('&')[0].trim()}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
