import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import { soundFX } from '../hooks/useSoundFX';

export const Trust3DShield: React.FC<{ className?: string }> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.2;

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

    // 3. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 1.0 : 1.6);
    scene.add(ambientLight);

    const redLight = new THREE.PointLight(0xed3327, 4.0, 25);
    redLight.position.set(3, 4, 4);
    scene.add(redLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 2.5, 20);
    cyanLight.position.set(-3, -3, 3);
    scene.add(cyanLight);

    // 3. Central Hexagonal Cyber Shield Core
    const group = new THREE.Group();
    scene.add(group);

    // Outer Hexagonal Rings
    const hexRings: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const hexGeo = new THREE.RingGeometry(1.6 + i * 0.45, 1.65 + i * 0.45, 6);
      const hexMat = new THREE.MeshBasicMaterial({
        color: i === 1 ? 0xed3327 : theme === 'dark' ? 0x444444 : 0xcccccc,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: i === 1 ? 0.85 : 0.4,
      });
      const hexMesh = new THREE.Mesh(hexGeo, hexMat);
      hexMesh.rotation.z = (i * Math.PI) / 6;
      group.add(hexMesh);
      hexRings.push(hexMesh);
    }

    // Floating 3D Shield Polyhedron
    const shieldGeo = new THREE.OctahedronGeometry(1.2, 0);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x111111 : 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: true,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    group.add(shieldMesh);

    // Inner Glowing Core Sphere
    const coreGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xed3327,
      emissive: 0xed3327,
      emissiveIntensity: 0.85,
      roughness: 0.25,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // 4. Stardust Orbit Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xed3327,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // 5. Interactive Mouse Damping
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let curRotX = 0;
    let curRotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      targetRotY = mouseX * 0.7;
      targetRotX = -mouseY * 0.5;
    };

    const onClick = () => {
      soundFX.playBlast();
      // Temporary speed burst
      group.scale.set(1.12, 1.12, 1.12);
      setTimeout(() => group.scale.set(1, 1, 1), 250);
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('click', onClick);

    // 6. Animation Render Loop
    let frameId: number;
    let lastTime = performance.now() * 0.001;

    const animate = () => {
      const now = performance.now() * 0.001;
      const delta = Math.min(now - lastTime, 0.1);
      lastTime = now;

      if (!isVisible) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      curRotX += (targetRotX - curRotX) * 0.07;
      curRotY += (targetRotY - curRotY) * 0.07;

      group.rotation.x = curRotX;
      group.rotation.y = curRotY + now * 0.25;

      // Hex ring relative spins
      hexRings[0].rotation.z += delta * 0.4;
      hexRings[1].rotation.z -= delta * 0.5;
      hexRings[2].rotation.z += delta * 0.3;

      // Shield facet spin
      shieldMesh.rotation.x += delta * 0.3;
      shieldMesh.rotation.y += delta * 0.4;

      // Pulse
      const pulse = 0.5 + Math.sin(now * 3.0) * 0.4;
      coreMat.emissiveIntensity = 0.8 + pulse * 0.5;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 450;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      shieldGeo.dispose();
      shieldMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      hexRings.forEach((r) => {
        r.geometry.dispose();
      });
    };
  }, [theme]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-[360px] sm:h-[440px] flex items-center justify-center cursor-pointer select-none ${className}`}
      title="Interactive 3D Trust Core — Click for blast shockwave"
      aria-label="3D Security and Engineering Trust Shield"
    />
  );
};

export default Trust3DShield;
