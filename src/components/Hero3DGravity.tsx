import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Node3D {
  // Current 3D position
  x: number;
  y: number;
  z: number;
  // Velocity
  vx: number;
  vy: number;
  vz: number;
  // Base anchor in 3D space
  baseX: number;
  baseY: number;
  baseZ: number;
  // Physical properties
  radius: number;
  mass: number;
  colorType: 'emerald' | 'cyan' | 'ruby';
  phase: number;
  orbitSpeed: number;
  orbitRadius: number;
}

export const Hero3DGravity: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  // Mouse tracking with smooth damping
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    active: false,
    down: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let animId: number;
    let nodes: Node3D[] = [];

    const isDark = theme === 'dark';

    // Camera parameters
    const FOV = 480;
    let camRotX = 0;
    let camRotY = 0;
    let targetCamRotX = 0;
    let targetCamRotY = 0;

    const initNodes = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      centerX = width / 2;
      centerY = height / 2;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Node count balanced for silky 60+ FPS and rich gravitational depth
      const count = Math.min(85, Math.max(50, Math.floor((width * height) / 14000)));
      nodes = [];

      for (let i = 0; i < count; i++) {
        // Distribute in a spherical / ellipsoidal 3D volume
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const spreadX = width * 0.58;
        const spreadY = height * 0.55;
        const spreadZ = 280;

        const bx = Math.sin(phi) * Math.cos(theta) * spreadX * (0.3 + Math.random() * 0.7);
        const by = Math.sin(phi) * Math.sin(theta) * spreadY * (0.3 + Math.random() * 0.7);
        const bz = Math.cos(phi) * spreadZ + (Math.random() - 0.5) * 100;

        // Color distribution
        let colorType: 'emerald' | 'cyan' | 'ruby' = 'emerald';
        const rand = Math.random();
        if (rand > 0.88) {
          colorType = 'ruby'; // 12% Ruby accents matching Bengal IT Agency's official dot
        } else if (rand > 0.58) {
          colorType = 'cyan'; // 30% Cyan technology
        } else {
          colorType = 'emerald'; // 58% Emerald flagship
        }

        const baseRadius = colorType === 'ruby' ? 2.8 : Math.random() * 2.2 + 1.2;

        nodes.push({
          x: bx,
          y: by,
          z: bz,
          vx: 0,
          vy: 0,
          vz: 0,
          baseX: bx,
          baseY: by,
          baseZ: bz,
          radius: baseRadius,
          mass: baseRadius * 0.8,
          colorType,
          phase: Math.random() * Math.PI * 2,
          orbitSpeed: (Math.random() * 0.4 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
          orbitRadius: Math.random() * 30 + 15,
        });
      }
    };

    initNodes();

    const handleResize = () => {
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
      mouseRef.current.active = true;

      // Subtle 3D perspective camera tilt towards mouse
      targetCamRotY = ((x - centerX) / centerX) * 0.22;
      targetCamRotX = -((y - centerY) / centerY) * 0.18;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      targetCamRotX = 0;
      targetCamRotY = 0;
    };

    const handleMouseDown = () => {
      mouseRef.current.down = true;
    };

    const handleMouseUp = () => {
      mouseRef.current.down = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.08);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Smooth camera interpolation
      camRotX += (targetCamRotX - camRotX) * 0.08;
      camRotY += (targetCamRotY - camRotY) * 0.08;

      const cosY = Math.cos(camRotY);
      const sinY = Math.sin(camRotY);
      const cosX = Math.cos(camRotX);
      const sinX = Math.sin(camRotX);

      // Smooth mouse damping
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // Mouse in 3D centered coordinates
      const mouse3DX = mouse.x - centerX;
      const mouse3DY = mouse.y - centerY;

      // Draw faint luxury gravitational distortion ripple at cursor
      if (mouse.active) {
        const pulse = Math.sin(time * 0.003) * 6;
        const rad = (mouse.down ? 75 : 55) + pulse;
        const aura = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, rad);

        if (isDark) {
          aura.addColorStop(0, 'rgba(0, 255, 163, 0.15)');
          aura.addColorStop(0.5, 'rgba(0, 229, 255, 0.06)');
          aura.addColorStop(1, 'transparent');
        } else {
          aura.addColorStop(0, 'rgba(16, 185, 129, 0.14)');
          aura.addColorStop(0.6, 'rgba(15, 23, 42, 0.04)');
          aura.addColorStop(1, 'transparent');
        }

        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, rad, 0, Math.PI * 2);
        ctx.fill();
      }

      // Projected nodes array for rendering and line sorting
      const projected: {
        node: Node3D;
        px: number;
        py: number;
        pz: number;
        scale: number;
        radius: number;
        alpha: number;
      }[] = [];

      // 1. Physics update for each 3D node
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Harmonic organic 3D breathing drift around base anchor
        n.phase += n.orbitSpeed * dt;
        const anchorX = n.baseX + Math.sin(n.phase) * n.orbitRadius;
        const anchorY = n.baseY + Math.cos(n.phase * 0.8) * (n.orbitRadius * 0.7);
        const anchorZ = n.baseZ + Math.sin(n.phase * 1.2) * (n.orbitRadius * 0.5);

        // Gravitational force towards mouse well
        if (mouse.active) {
          const dx = mouse3DX - n.x;
          const dy = mouse3DY - n.y;
          const dz = 0 - n.z;
          const distSq = dx * dx + dy * dy + dz * dz;
          const dist = Math.sqrt(distSq);

          const maxGravityDist = 380;
          if (dist < maxGravityDist && dist > 1) {
            // Newton's law inspired gravity well
            const strength = mouse.down ? 3600 : 2000;
            const F = strength / (distSq + 1200);

            // Gravitational attraction
            n.vx += (dx / dist) * F * dt * 60;
            n.vy += (dy / dist) * F * dt * 60;
            n.vz += (dz / dist) * F * dt * 60;

            // Orbital tangential velocity (creates gorgeous celestial curve around mouse)
            const tangentX = -dy / dist;
            const tangentY = dx / dist;
            const orbitalSpeed = F * 0.45;
            n.vx += tangentX * orbitalSpeed * dt * 60;
            n.vy += tangentY * orbitalSpeed * dt * 60;
          }
        }

        // Elastic spring force back to anchor
        n.vx += (anchorX - n.x) * 0.025;
        n.vy += (anchorY - n.y) * 0.025;
        n.vz += (anchorZ - n.z) * 0.025;

        // Friction damping
        n.vx *= 0.93;
        n.vy *= 0.93;
        n.vz *= 0.93;

        // Apply velocities
        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;

        // 3D Camera Rotation Transform
        // Rotate around Y
        const x1 = n.x * cosY + n.z * sinY;
        const z1 = -n.x * sinY + n.z * cosY;
        // Rotate around X
        const y2 = n.y * cosX - z1 * sinX;
        const z2 = n.y * sinX + z1 * cosX;

        // Perspective Projection
        const depth = z2 + 250;
        if (depth > -FOV + 10) {
          const scale = FOV / (FOV + depth);
          const px = centerX + x1 * scale;
          const py = centerY + y2 * scale;
          const radius = Math.max(0.6, n.radius * scale);

          // Alpha fade for depth
          const depthFade = Math.min(1.0, Math.max(0.2, (scale - 0.3) * 1.5));

          projected.push({
            node: n,
            px,
            py,
            pz: z2,
            scale,
            radius,
            alpha: depthFade,
          });
        }
      }

      // Sort by depth (painters algorithm)
      projected.sort((a, b) => b.pz - a.pz);

      // 2. Render Gravitational Filaments (Constellation links)
      ctx.lineWidth = 1;
      const maxConnectDist = 120;

      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];

          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.32 * Math.min(p1.alpha, p2.alpha);

            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);

            if (isDark) {
              // Radiant emerald/cyan filaments in dark mode
              ctx.strokeStyle = `rgba(0, 255, 163, ${lineAlpha})`;
            } else {
              // Slate/graphite architectural filaments in light mode
              ctx.strokeStyle = `rgba(71, 85, 105, ${lineAlpha * 1.1})`;
            }
            ctx.stroke();
          }
        }
      }

      // 3. Render 3D Gravity Nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const n = p.node;

        ctx.beginPath();
        ctx.arc(p.px, p.py, p.radius, 0, Math.PI * 2);

        if (isDark) {
          // Dark Mode Luxury Neon Glow
          if (n.colorType === 'ruby') {
            ctx.fillStyle = `rgba(239, 62, 54, ${p.alpha * 0.95})`;
            ctx.shadowColor = 'rgba(239, 62, 54, 0.8)';
            ctx.shadowBlur = p.radius > 2 ? 10 : 4;
          } else if (n.colorType === 'cyan') {
            ctx.fillStyle = `rgba(0, 229, 255, ${p.alpha * 0.9})`;
            ctx.shadowColor = 'rgba(0, 229, 255, 0.7)';
            ctx.shadowBlur = p.radius > 2 ? 8 : 3;
          } else {
            ctx.fillStyle = `rgba(0, 255, 163, ${p.alpha * 0.9})`;
            ctx.shadowColor = 'rgba(0, 255, 163, 0.75)';
            ctx.shadowBlur = p.radius > 2 ? 9 : 4;
          }
        } else {
          // Light Mode Crisp Architectural Obsidian / Emerald / Crimson
          if (n.colorType === 'ruby') {
            ctx.fillStyle = `rgba(225, 29, 72, ${p.alpha * 0.9})`;
            ctx.shadowColor = 'rgba(225, 29, 72, 0.25)';
            ctx.shadowBlur = 4;
          } else if (n.colorType === 'cyan') {
            ctx.fillStyle = `rgba(14, 165, 233, ${p.alpha * 0.85})`;
            ctx.shadowColor = 'rgba(14, 165, 233, 0.2)';
            ctx.shadowBlur = 3;
          } else {
            ctx.fillStyle = `rgba(15, 23, 42, ${p.alpha * 0.85})`;
            ctx.shadowColor = 'rgba(15, 23, 42, 0.15)';
            ctx.shadowBlur = 3;
          }
        }

        ctx.fill();

        // Extra specular glint on closer nodes
        if (p.scale > 1.05 && p.radius > 2) {
          ctx.beginPath();
          ctx.arc(p.px - p.radius * 0.35, p.py - p.radius * 0.35, p.radius * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.9)';
          ctx.shadowBlur = 0;
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Real-Time Interactive 3D Gravity Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Ambient Spatial Vignette */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-[var(--bg-main)] opacity-70 pointer-events-none" />

      {/* Subtle Specular Glow Orbs (Theme Adaptive) */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-[90px] pointer-events-none" />
    </div>
  );
};

export default Hero3DGravity;
