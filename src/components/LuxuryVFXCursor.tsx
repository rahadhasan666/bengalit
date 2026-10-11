import React, { useEffect, useRef, useState } from 'react';
import { soundFX } from '../hooks/useSoundFX';

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
}

interface BlastWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  lineWidth: number;
}

export const LuxuryVFXCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check touch device or reduced motion
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasTouch || !isFinePointer || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: SparkParticle[] = [];
    const blasts: BlastWave[] = [];

    const sparkColors = ['#ed3327', '#ff5a4e', '#ffffff', '#f59e0b', '#ffd166'];

    let mouseX = -100;
    let mouseY = -100;
    let prevMouseX = -100;
    let prevMouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let frameId: number;

    const onMouseMove = (e: MouseEvent) => {
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPos({ x: mouseX, y: mouseY });
      if (!isVisible) setIsVisible(true);

      // Check interactive target
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [role="button"], .interactive-hover');
        if (!!interactive !== isHovered) {
          setIsHovered(!!interactive);
          if (interactive) {
            soundFX.playHover();
          }
        }
      }

      // Calculate speed
      const speed = Math.hypot(mouseX - prevMouseX, mouseY - prevMouseY);
      const sparkCount = Math.min(4, Math.floor(speed * 0.15) + 1);

      // Emit stardust particles
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const pSpeed = Math.random() * 1.5 + 0.5;
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 6,
          y: mouseY + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * pSpeed + (mouseX - prevMouseX) * 0.08,
          vy: Math.sin(angle) * pSpeed + (mouseY - prevMouseY) * 0.08,
          size: Math.random() * 2.2 + 0.8,
          alpha: 0.9,
          color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
          life: 1.0,
        });
      }

      if (particles.length > 90) {
        particles.splice(0, particles.length - 90);
      }
    };

    const triggerBlast = (x: number, y: number) => {
      // Spawn shockwave ring
      blasts.push({
        x,
        y,
        radius: 4,
        maxRadius: Math.min(width, height) * 0.28,
        alpha: 0.85,
        lineWidth: 3.5,
      });

      // Spawn radial burst debris
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2 + Math.random() * 0.2;
        const speed = Math.random() * 5 + 2.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3.5 + 1.2,
          alpha: 1.0,
          color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
          life: 1.2,
        });
      }

      soundFX.playBlast();
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      triggerBlast(e.clientX, e.clientY);
    };

    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Animation Render Loop
    const render = () => {
      // Ring lerp
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      setRingPos({ x: ringX, y: ringY });

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Render & Update Shockwave Blasts
      for (let i = blasts.length - 1; i >= 0; i--) {
        const b = blasts[i];
        b.radius += (b.maxRadius - b.radius) * 0.12;
        b.alpha *= 0.92;
        b.lineWidth *= 0.95;

        // Outer wave
        ctx.save();
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(237, 51, 39, ${b.alpha})`;
        ctx.lineWidth = b.lineWidth;
        ctx.shadowColor = '#ed3327';
        ctx.shadowBlur = 15;
        ctx.stroke();

        // Inner secondary refraction ring
        if (b.radius > 15) {
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius * 0.75, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${b.alpha * 0.5})`;
          ctx.lineWidth = Math.max(1, b.lineWidth * 0.6);
          ctx.stroke();
        }
        ctx.restore();

        if (b.alpha < 0.02 || b.radius >= b.maxRadius * 0.98) {
          blasts.splice(i, 1);
        }
      }

      // Render & Update Spark Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.alpha -= 0.025;
        p.size *= 0.97;

        if (p.alpha <= 0 || p.size <= 0.2) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(frameId);
    };
  }, [isHovered, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Fullscreen VFX Canvas for Stardust Sparks & Shockwave Blast Ripples */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9990] w-full h-full"
        aria-hidden="true"
      />

      {/* Precision Core Vermilion Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0) scale(${isClicking ? 0.65 : 1})`,
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--red)] shadow-[0_0_10px_rgba(237,51,39,0.9)]" />
      </div>

      {/* Trailing Outer Ring with Magnetic Expansion */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-[width,height,opacity,border-color,background-color] duration-200 ease-out"
        style={{
          transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full transition-all duration-200 ease-out border ${
            isHovered
              ? 'w-12 h-12 border-[var(--red)] bg-[var(--red)]/15 scale-110 shadow-[0_0_20px_rgba(237,51,39,0.4)] backdrop-blur-[1px]'
              : 'w-7 h-7 border-[var(--red)]/50 bg-transparent'
          } ${isClicking ? 'scale-85 border-[var(--red)]' : ''}`}
        />
      </div>
    </>
  );
};

export default LuxuryVFXCursor;
