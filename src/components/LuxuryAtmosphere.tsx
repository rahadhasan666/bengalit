import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  phase: number;
}

export const LuxuryAtmosphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId: number;
    let particles: Particle[] = [];

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Create subtle luxury stardust particles
      const count = Math.floor((width * height) / 28000);
      particles = [];
      for (let i = 0; i < count; i++) {
        const baseAlpha = Math.random() * 0.35 + 0.15;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3 - 0.1, // gentle upward drift
          size: Math.random() * 1.6 + 0.6,
          alpha: baseAlpha,
          baseAlpha,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const isDark = theme === 'dark';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Subtle gentle twinkle
        p.phase += dt * 1.5;
        const twinkle = Math.sin(p.phase) * 0.25;

        // Distance from mouse for gentle proximity glow
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let hoverBoost = 0;
        if (dist < 150) {
          hoverBoost = (1 - dist / 150) * 0.4;
          // slight gentle magnetic repulsion
          p.x += (dx / dist) * 0.5;
          p.y += (dy / dist) * 0.5;
        }

        const finalAlpha = Math.min(1.0, Math.max(0.05, p.baseAlpha + twinkle + hoverBoost));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (isDark) {
          // Specular stardust with subtle emerald / gold tint
          ctx.fillStyle = i % 3 === 0
            ? `rgba(0, 255, 163, ${finalAlpha})`
            : `rgba(255, 255, 255, ${finalAlpha})`;
          ctx.shadowColor = 'rgba(0, 255, 163, 0.4)';
          ctx.shadowBlur = p.size > 1.2 ? 6 : 2;
        } else {
          ctx.fillStyle = `rgba(10, 10, 10, ${finalAlpha * 0.35})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [theme]);

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Luxury Specular Ambient Aura Gradients */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-[30rem] h-[30rem] bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default LuxuryAtmosphere;
