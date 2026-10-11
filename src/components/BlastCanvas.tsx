import { useEffect, useRef } from 'react';

interface BlastCanvasProps {
  blastTrigger: number; // incremented whenever a blast happens
  blastDirection: 'forward' | 'backward';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  decay: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
  width: number;
}

export const BlastCanvas: React.FC<BlastCanvasProps> = ({ blastTrigger, blastDirection }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const animationFrameRef = useRef<number>(0);

  // Trigger explosion
  useEffect(() => {
    if (blastTrigger === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    const isForward = blastDirection === 'forward';
    const particleCount = window.innerWidth < 768 ? 90 : 180;
    const newParticles: Particle[] = [];

    // Colors matching cyber aesthetics: cyan, sky, electric blue, bright white
    const colors = [
      '#00e5ff',
      '#38bdf8',
      '#60a5fa',
      '#ffffff',
      '#a5f3fc',
      '#00f0ff',
    ];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      // High initial velocity for blast explosion feel
      const speed = isForward
        ? (Math.random() * 18 + 6)
        : (Math.random() * 14 + 4);

      newParticles.push({
        x: cx + (Math.random() - 0.5) * 40,
        y: cy + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 35 + 25,
        decay: Math.random() * 0.025 + 0.018,
      });
    }

    particlesRef.current = [...particlesRef.current, ...newParticles];

    // Shockwave rings
    const newShockwaves: Shockwave[] = [
      {
        x: cx,
        y: cy,
        radius: 10,
        maxRadius: Math.max(width, height) * 0.85,
        alpha: 0.95,
        color: 'rgba(0, 229, 255, ',
        width: 6,
      },
      {
        x: cx,
        y: cy,
        radius: 5,
        maxRadius: Math.max(width, height) * 0.65,
        alpha: 0.8,
        color: 'rgba(255, 255, 255, ',
        width: 3,
      },
      {
        x: cx,
        y: cy,
        radius: 2,
        maxRadius: Math.max(width, height) * 1.1,
        alpha: 0.6,
        color: 'rgba(59, 130, 246, ',
        width: 8,
      },
    ];

    shockwavesRef.current = [...shockwavesRef.current, ...newShockwaves];
  }, [blastTrigger, blastDirection]);

  // Main rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render shockwaves
      const activeShockwaves: Shockwave[] = [];
      for (const sw of shockwavesRef.current) {
        sw.radius += (sw.maxRadius - sw.radius) * 0.12;
        sw.alpha -= 0.032;

        if (sw.alpha > 0.01 && sw.radius < sw.maxRadius) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `${sw.color}${sw.alpha})`;
          ctx.lineWidth = sw.width * (sw.alpha + 0.2);
          ctx.shadowColor = '#00e5ff';
          ctx.shadowBlur = 20;
          ctx.stroke();
          ctx.restore();

          activeShockwaves.push(sw);
        }
      }
      shockwavesRef.current = activeShockwaves;

      // Render blast particles
      const activeParticles: Particle[] = [];
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;

        // Deceleration drag
        p.vx *= 0.94;
        p.vy *= 0.94;

        p.life++;
        p.alpha -= p.decay;

        if (p.alpha > 0.01) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 12;

          // Draw stretched kinetic particle streak in direction of velocity
          ctx.beginPath();
          const speed = Math.hypot(p.vx, p.vy);
          if (speed > 2) {
            ctx.ellipse(
              p.x,
              p.y,
              p.size * (1 + speed * 0.35),
              p.size,
              Math.atan2(p.vy, p.vx),
              0,
              Math.PI * 2
            );
          } else {
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          }
          ctx.fill();
          ctx.restore();

          activeParticles.push(p);
        }
      }
      particlesRef.current = activeParticles;

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
      aria-hidden="true"
    />
  );
};
