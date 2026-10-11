import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import { soundFX } from '../hooks/useSoundFX';

interface TechNode {
  name: string;
  category: 'Mobile' | 'Frontend' | 'Backend' | 'Security';
  position: THREE.Vector3;
  color: number;
}

const TECH_NODES_DATA: { name: string; category: 'Mobile' | 'Frontend' | 'Backend' | 'Security'; color: number }[] = [
  { name: 'Flutter', category: 'Mobile', color: 0xed3327 },
  { name: 'Android', category: 'Mobile', color: 0x3ddc84 },
  { name: 'Kotlin', category: 'Mobile', color: 0x7f52ff },
  { name: 'Dart', category: 'Mobile', color: 0x0175c2 },
  { name: 'React', category: 'Frontend', color: 0x61dafb },
  { name: 'TypeScript', category: 'Frontend', color: 0x3178c6 },
  { name: 'Next.js', category: 'Frontend', color: 0xffffff },
  { name: 'Tailwind', category: 'Frontend', color: 0x38bdf8 },
  { name: 'Node.js', category: 'Backend', color: 0x68a063 },
  { name: 'Firebase', category: 'Backend', color: 0xffca28 },
  { name: 'REST API', category: 'Backend', color: 0xff5722 },
  { name: 'Linux', category: 'Security', color: 0xfcc624 },
  { name: 'Cybersecurity', category: 'Security', color: 0xed3327 },
  { name: 'Git & CI/CD', category: 'Security', color: 0xf05032 },
];

export const Tech3DConstellation: React.FC<{
  activeTech: string | null;
  onSelectTech: (name: string) => void;
}> = ({ activeTech, onSelectTech }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 7.2;

    // 2. High-Performance WebGL Renderer with Context Loss Protection
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.backgroundColor = 'transparent';
      renderer.domElement.style.display = 'block';
      renderer.domElement.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
      }, false);
      container.innerHTML = '';
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Viewport Visibility Observer (pause loop when off-screen to preserve GPU memory)
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 1.0 : 1.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xed3327, 4.0, 30);
    pointLight.position.set(3, 4, 5);
    scene.add(pointLight);

    const group = new THREE.Group();
    scene.add(group);

    // 3. Central Wireframe Sphere Lattice
    const sphereGeo = new THREE.IcosahedronGeometry(2.8, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x222222 : 0xdddddd,
      wireframe: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.35 : 0.45,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(sphereMesh);

    // Inner glowing core
    const coreGeo = new THREE.SphereGeometry(0.75, 24, 24);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xed3327,
      emissive: 0xed3327,
      emissiveIntensity: 0.8,
      roughness: 0.3,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // 4. Distribute Nodes over Fibonacci Sphere
    const nodes: TechNode[] = [];
    const nodeMeshes: THREE.Mesh[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    const radius = 2.8;

    TECH_NODES_DATA.forEach((tech, i) => {
      const y = 1 - (i / (TECH_NODES_DATA.length - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const pos = new THREE.Vector3(x * radius, y * radius, z * radius);
      nodes.push({ ...tech, position: pos });

      // Node Geometry (Outer ring + inner glowing bead)
      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(pos);

      const beadGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const beadMat = new THREE.MeshStandardMaterial({
        color: tech.color,
        emissive: tech.color,
        emissiveIntensity: 0.7,
        metalness: 0.8,
        roughness: 0.2,
      });
      const bead = new THREE.Mesh(beadGeo, beadMat);
      bead.userData = { name: tech.name };
      nodeGroup.add(bead);

      // Orbital halo ring around bead
      const haloGeo = new THREE.RingGeometry(0.22, 0.26, 24);
      const haloMat = new THREE.MeshBasicMaterial({
        color: tech.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      nodeGroup.add(halo);

      group.add(nodeGroup);
      nodeMeshes.push(bead);
    });

    // 5. Connect Nodes with Laser Energy Lines
    const lineMat = new THREE.LineBasicMaterial({
      color: theme === 'dark' ? 0xed3327 : 0xba2e27,
      transparent: true,
      opacity: 0.22,
    });

    const lineGeo = new THREE.BufferGeometry();
    const linePoints: number[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i].position.distanceTo(nodes[j].position);
        if (d < 3.2) {
          linePoints.push(
            nodes[i].position.x,
            nodes[i].position.y,
            nodes[i].position.z,
            nodes[j].position.x,
            nodes[j].position.y,
            nodes[j].position.z
          );
        }
      }
    }

    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    // 6. Interactive Raycasting & Mouse Drag
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);

    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let curRotX = 0;
    let curRotY = 0;

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        targetRotY += deltaX * 0.008;
        targetRotX += deltaY * 0.008;
      } else {
        // Soft hover tracking
        targetRotY = mouse.x * 0.45;
        targetRotX = -mouse.y * 0.35;
      }

      // Raycast for hover
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);
      if (intersects.length > 0) {
        const name = intersects[0].object.userData.name;
        if (name && name !== hoveredNode) {
          setHoveredNode(name);
          soundFX.playHover();
        }
      } else {
        if (hoveredNode) setHoveredNode(null);
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);
      if (intersects.length > 0) {
        const name = intersects[0].object.userData.name;
        if (name) {
          onSelectTech(name);
          soundFX.playClick();
        }
      }
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('click', onClick);

    // 7. Render Loop
    let frameId: number;
    let lastTime = performance.now() * 0.001;

    const render = () => {
      const now = performance.now() * 0.001;
      const delta = Math.min(now - lastTime, 0.1);
      lastTime = now;

      if (!isVisible) {
        frameId = requestAnimationFrame(render);
        return;
      }

      // Inertia Damped Lerp
      curRotX += (targetRotX - curRotX) * 0.08;
      curRotY += (targetRotY - curRotY) * 0.08;

      group.rotation.x = curRotX;
      group.rotation.y = curRotY + (isDragging ? 0 : delta * 0.35);

      // Core pulse
      const pulse = 0.5 + Math.sin(now * 3.0) * 0.4;
      coreMat.emissiveIntensity = 0.7 + pulse * 0.5;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
    };
  }, [theme, hoveredNode, onSelectTech]);

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] rounded-lg overflow-hidden bg-[var(--surface-card)] border border-[var(--line)] flex items-center justify-center select-none shadow-2xl">
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Drag to rotate 3D Constellation, click nodes to inspect"
      />

      {/* Floating HUD Telemetry Readout */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-[11px] font-mono text-white/80">
        <span className="w-2 h-2 rounded-full bg-[var(--red)] animate-ping" />
        <span className="text-[var(--red)] font-semibold">3D NEURAL TOOLCHAIN</span>
        <span className="text-white/30">•</span>
        <span>DRAG TO REVOLVE</span>
      </div>

      {/* Active / Hovered Node Tooltip Pill */}
      {(hoveredNode || activeTech) && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-black/85 backdrop-blur-md border border-[var(--red)] text-white px-5 py-2 rounded shadow-2xl flex items-center gap-3 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[var(--red)]" />
          <span className="font-heading font-medium text-sm tracking-wide">
            {hoveredNode || activeTech}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/60 border-l border-white/20 pl-3">
            VERIFIED PRODUCTION STACK
          </span>
        </div>
      )}
    </div>
  );
};

export default Tech3DConstellation;
