import React, { useState, useEffect } from 'react';
import { ArrowDown, MessageCircle, X, ChevronRight } from 'lucide-react';
import { soundFX } from '../hooks/useSoundFX';

interface DialoguePrompt {
  id: string;
  triggerSection?: string;
  message: string;
  subtext: string;
  actionLabel?: string;
  actionTarget?: string;
}

const DIALOGUES: DialoguePrompt[] = [
  {
    id: 'welcome',
    triggerSection: 'hero',
    message: 'Konnichiwa! I am Aira, your Bengal IT AI Guide ✨',
    subtext: 'Niche scroll kore amader world-class 3D capabilities ghure dekho!',
    actionLabel: 'Explore 3D Orbit',
    actionTarget: 'services',
  },
  {
    id: 'services',
    triggerSection: 'services',
    message: 'Look at the 3D cards orbiting around! 💫',
    subtext: 'Scroll gently to watch our mobile, web & cybersecurity systems revolve!',
    actionLabel: 'See Selected Work',
    actionTarget: 'projects',
  },
  {
    id: 'projects',
    triggerSection: 'projects',
    message: 'Hover over our projects for Liquid Ripples! 🌊',
    subtext: 'WebGL fluid waves & 3D gyroscopic tilt will react to your mouse!',
    actionLabel: 'Enter 3D Tech Sphere',
    actionTarget: 'tech-stack',
  },
  {
    id: 'tech',
    triggerSection: 'tech-stack',
    message: 'Drag the 3D Neural Sphere to rotate! 🔮',
    subtext: '14 enterprise technologies connected with live laser energy beams!',
    actionLabel: 'Discover Engineering Protocol',
    actionTarget: 'process',
  },
  {
    id: 'why',
    triggerSection: 'why-bengal',
    message: 'See why global founders trust Bengal IT Agency! 🛡️',
    subtext: '0 middlemen, 120 FPS native code, and 100% full IP ownership transfer!',
    actionLabel: 'Inspect 3D Trust Core',
    actionTarget: 'why-bengal',
  },
  {
    id: 'contact',
    triggerSection: 'contact',
    message: 'Ready to build your next big tech product? 🚀',
    subtext: 'Direct WhatsApp e message dao amader lead engineers der!',
    actionLabel: 'Open WhatsApp Chat',
    actionTarget: 'https://wa.me/8801410075921',
  },
];

export const AnimeGuideCompanion: React.FC = () => {
  const [activeDialogue, setActiveDialogue] = useState<DialoguePrompt>(DIALOGUES[0]);
  const [isBubbleOpen, setIsBubbleOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return false;
  });
  const [pos, setPos] = useState({ x: 16, y: 70 }); // offset from bottom-right
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ mouseX: 0, mouseY: 0, posX: 0, posY: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);

  // Floating hover animation offset
  const [floatY, setFloatY] = useState(0);

  // Animate floating bobbing effect
  useEffect(() => {
    let frameId: number;
    let start = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - start) * 0.002;
      setFloatY(Math.sin(elapsed) * 6);
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frameId);
  }, []);

  // Track scroll position to update Aira's dialogue dynamically
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;

      const servicesEl = document.getElementById('services');
      const projectsEl = document.getElementById('projects');
      const whyEl = document.getElementById('why-bengal') || document.getElementById('why-novexa');
      const techEl = document.getElementById('tech-stack');
      const contactEl = document.getElementById('contact');

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        if (activeDialogue.id !== 'contact') setActiveDialogue(DIALOGUES[5]);
      } else if (techEl && scrollPos >= techEl.offsetTop) {
        if (activeDialogue.id !== 'tech') setActiveDialogue(DIALOGUES[3]);
      } else if (whyEl && scrollPos >= whyEl.offsetTop) {
        if (activeDialogue.id !== 'why') setActiveDialogue(DIALOGUES[4]);
      } else if (projectsEl && scrollPos >= projectsEl.offsetTop) {
        if (activeDialogue.id !== 'projects') setActiveDialogue(DIALOGUES[2]);
      } else if (servicesEl && scrollPos >= servicesEl.offsetTop) {
        if (activeDialogue.id !== 'services') setActiveDialogue(DIALOGUES[1]);
      } else {
        if (activeDialogue.id !== 'welcome') setActiveDialogue(DIALOGUES[0]);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeDialogue.id]);

  // Dragging handlers for free movement with touch support
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    setIsDragging(true);
    setDragStart({
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: pos.x,
      posY: pos.y,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    const touch = e.touches[0];
    if (!touch) return;
    setIsDragging(true);
    setDragStart({
      mouseX: touch.clientX,
      mouseY: touch.clientY,
      posX: pos.x,
      posY: pos.y,
    });
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = dragStart.mouseX - e.clientX;
      const dy = dragStart.mouseY - e.clientY;
      setPos({
        x: Math.max(12, Math.min(window.innerWidth - 80, dragStart.posX + dx)),
        y: Math.max(50, Math.min(window.innerHeight - 100, dragStart.posY + dy)),
      });
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      const touch = e.touches[0];
      const dx = dragStart.mouseX - touch.clientX;
      const dy = dragStart.mouseY - touch.clientY;
      setPos({
        x: Math.max(12, Math.min(window.innerWidth - 80, dragStart.posX + dx)),
        y: Math.max(50, Math.min(window.innerHeight - 100, dragStart.posY + dy)),
      });
    };

    const onEnd = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging, dragStart]);

  const handleActionClick = (target?: string) => {
    soundFX.playClick();
    if (!target) return;

    if (target.startsWith('http')) {
      window.open(target, '_blank', 'noopener,noreferrer');
    } else {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToNextSection = () => {
    soundFX.playClick();
    const currentScroll = window.scrollY;
    const nextTarget = currentScroll + window.innerHeight * 0.85;
    window.scrollTo({ top: nextTarget, behavior: 'smooth' });
  };

  const toggleAvatarClick = () => {
    soundFX.playHover();
    setHasInteracted(true);
    setIsBubbleOpen((prev) => !prev);
  };

  return (
    <aside
      className="fixed z-[100] select-none pointer-events-auto transition-[bottom,right] duration-75 ease-out"
      style={{
        bottom: `${pos.y}px`,
        right: `${pos.x}px`,
        transform: `translate3d(0, ${floatY}px, 0)`,
      }}
      aria-label="Aira - Bengal IT Interactive AI Guide"
    >
      {/* Speech Bubble / Holographic Companion Terminal */}
      {isBubbleOpen && (
        <div
          className="absolute bottom-20 sm:bottom-24 right-0 w-[calc(100vw-32px)] max-w-[340px] p-4 sm:p-5 rounded-2xl bg-black/90 backdrop-blur-xl border border-[var(--red)]/40 shadow-[0_15px_45px_rgba(0,0,0,0.7)] text-white animate-fade-in transition-all duration-200"
          style={{
            boxShadow: '0 0 35px rgba(237, 51, 39, 0.25), inset 0 0 15px rgba(237, 51, 39, 0.1)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--red)] animate-ping" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--red)]">
                AIRA // BENGAL IT AI GUIDE
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  soundFX.playGlitch();
                  setIsBubbleOpen(false);
                }}
                className="w-6 h-6 rounded flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Hide speech bubble"
                aria-label="Close message"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Speech Dialogue */}
          <div className="space-y-1.5 mb-4">
            <p className="font-heading font-medium text-sm sm:text-base text-white leading-snug">
              {activeDialogue.message}
            </p>
            <p className="font-body text-xs text-slate-300 leading-relaxed">
              {activeDialogue.subtext}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="space-y-2">
            {activeDialogue.actionLabel && (
              <button
                type="button"
                onClick={() => handleActionClick(activeDialogue.actionTarget)}
                className="w-full py-2.5 px-4 rounded-xl bg-[var(--red)] hover:bg-[var(--red-dark)] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(237,51,39,0.5)]"
              >
                <span>{activeDialogue.actionLabel}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={scrollToNextSection}
                className="py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/10"
              >
                <ArrowDown className="w-3 h-3 text-[var(--red)]" />
                <span>Scroll Down</span>
              </button>

              <button
                type="button"
                onClick={() => handleActionClick('https://wa.me/8801410075921')}
                className="py-2 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-emerald-500/30"
              >
                <MessageCircle className="w-3 h-3 text-emerald-400" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Holographic Speech Tail Pointer */}
          <div
            className="absolute -bottom-2 right-8 w-4 h-4 bg-black/85 border-r border-b border-[var(--red)]/40 rotate-45"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Floating Holographic Anime Avatar Unit */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className={`relative flex items-center justify-center cursor-grab active:cursor-grabbing group ${
          isDragging ? 'scale-105' : ''
        }`}
        title="Click to talk with Aira! Drag to move her anywhere."
      >
        {/* Outer Rotating Cyber Hologram Ring */}
        <div className="absolute inset-0 -m-1.5 sm:-m-2 rounded-full border border-dashed border-[var(--red)]/60 animate-[spin_10s_linear_infinite] pointer-events-none" />

        {/* Ambient Pulsing Aura Glow */}
        <div className="absolute inset-0 rounded-full bg-[var(--red)]/25 blur-lg animate-pulse pointer-events-none" />

        {/* Character Capsule */}
        <button
          type="button"
          onClick={toggleAvatarClick}
          className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[var(--red)] shadow-[0_0_25px_rgba(237,51,39,0.6)] bg-[#08080c] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--red)] transition-transform duration-200 group-hover:scale-105 active:scale-95"
          aria-label="Talk to Aira, Bengal IT AI Companion"
        >
          {/* Real Generated High-Res Anime Artwork */}
          <img
            src="/assets/anime_guide.jpg"
            alt="Aira - Bengal IT Agency AI Guide"
            className="w-full h-full object-cover object-top filter contrast-105"
            loading="eager"
          />

          {/* Cybernetic Scanline Overlay across Avatar */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-40 pointer-events-none animate-scanline" />
        </button>

        {/* Floating Mini Status Badge */}
        <div className="absolute -bottom-1 -right-1 bg-black/90 border border-[var(--red)] px-1.5 py-0.5 rounded-full flex items-center gap-1 shadow-md pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[9px] font-mono text-white/90 font-bold">ONLINE</span>
        </div>

        {/* First-time Interaction Hint Pill */}
        {!hasInteracted && (
          <div className="absolute -top-7 right-0 bg-[var(--red)] text-white text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded shadow-lg whitespace-nowrap animate-bounce pointer-events-none">
            <span>Click Me! ✨</span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AnimeGuideCompanion;
