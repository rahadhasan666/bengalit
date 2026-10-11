import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

interface ThreeDSceneProps {
  className?: string;
  isCompact?: boolean;
}

export const ThreeDScene: React.FC<ThreeDSceneProps> = ({ className = '', isCompact = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = isCompact ? 7.5 : 6.0;

    // 2. High-Performance WebGL Renderer with Context Loss Protection
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
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

    // Viewport Visibility Observer (pause loop when scrolled away to preserve GPU memory)
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 3. Lighting (Matching Junca Studio's high-contrast lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 1.2 : 1.8);
    scene.add(ambientLight);

    const redLight = new THREE.PointLight(0xed3327, 4.5, 30);
    redLight.position.set(4, 5, 4);
    scene.add(redLight);

    const whiteLight = new THREE.DirectionalLight(0xffffff, 2.5);
    whiteLight.position.set(-5, 8, 6);
    scene.add(whiteLight);

    // 4. Main 3D Tech Entity Group
    const robotEntityGroup = new THREE.Group();
    scene.add(robotEntityGroup);

    // 4.1 Outer Gyroscopic Titanium Rings (Junca Orbit Aesthetic)
    const ringGeo1 = new THREE.TorusGeometry(isCompact ? 1.8 : 2.2, 0.035, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x222222 : 0xcccccc,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    robotEntityGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(isCompact ? 1.5 : 1.85, 0.03, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xed3327, // Vermilion Red accent
      metalness: 0.8,
      roughness: 0.25,
      emissive: 0xed3327,
      emissiveIntensity: 0.35,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    robotEntityGroup.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(isCompact ? 1.2 : 1.5, 0.025, 16, 80);
    const ringMat3 = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x444444 : 0x999999,
      metalness: 0.95,
      roughness: 0.15,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 4;
    robotEntityGroup.add(ring3);

    // 4.2 Central High-Tech Geometric Core (Icosahedron + Inner Core)
    const coreGeo = new THREE.IcosahedronGeometry(isCompact ? 0.9 : 1.15, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x111111 : 0xffffff,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    robotEntityGroup.add(coreMesh);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(isCompact ? 0.45 : 0.6, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xed3327,
      emissive: 0xed3327,
      emissiveIntensity: 0.85,
      roughness: 0.3,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    robotEntityGroup.add(innerSphere);

    // 4.3 3-Blade Rotor Unit (Matching Junca Studio's .rson turbine)
    const rotorGroup = new THREE.Group();
    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(0, 0);
    bladeShape.quadraticCurveTo(0.2, 0.5, 0.1, 0.85);
    bladeShape.quadraticCurveTo(0, 0.95, -0.1, 0.85);
    bladeShape.quadraticCurveTo(-0.2, 0.5, 0, 0);

    const extrudeSettings = { depth: 0.02, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.01, bevelThickness: 0.01 };
    const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, extrudeSettings);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0xffffff : 0x080808,
      metalness: 0.8,
      roughness: 0.2,
    });

    for (let i = 0; i < 3; i++) {
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.rotation.z = (i * Math.PI * 2) / 3;
      rotorGroup.add(blade);
    }
    rotorGroup.position.z = 1.05;
    robotEntityGroup.add(rotorGroup);

    // 4.4 Shockwave Blast Ring in 3D (Expands on click)
    const blastGeo = new THREE.RingGeometry(0.1, 0.25, 48);
    const blastMat = new THREE.MeshBasicMaterial({
      color: 0xed3327,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    const blastRing = new THREE.Mesh(blastGeo, blastMat);
    blastRing.position.z = 0;
    scene.add(blastRing);

    let blastActive = false;
    let blastRadius = 0.1;
    let blastOpacity = 0;

    const triggerSceneBlast = () => {
      blastActive = true;
      blastRadius = 0.2;
      blastOpacity = 0.9;
    };

    container.addEventListener('click', triggerSceneBlast);

    // 5. Kinetic 3D Particle Cloud
    const particleCount = isMobile ? 120 : 360;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xed3327,
      size: 0.05,
      transparent: true,
      opacity: theme === 'dark' ? 0.75 : 0.5,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // 6. Interactive Mouse Tracking & Damped Lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const onMouseMove = (e: MouseEvent) => {
      // Normalized device coordinates (-1 to 1)
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      targetRotationY = mouseX * 0.85;
      targetRotationX = -mouseY * 0.65;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // 7. Animation Loop with performance.now()
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

      if (!prefersReducedMotion) {
        // Damped smooth mouse tracking lerp
        currentRotationX += (targetRotationX - currentRotationX) * 0.06;
        currentRotationY += (targetRotationY - currentRotationY) * 0.06;

        robotEntityGroup.rotation.x = currentRotationX + Math.sin(now * 0.7) * 0.08;
        robotEntityGroup.rotation.y = currentRotationY + now * 0.28;

        // Floating hover motion
        robotEntityGroup.position.y = Math.sin(now * 1.2) * 0.12;

        // Orbit ring internal spin
        ring1.rotation.z += delta * 0.35;
        ring2.rotation.y += delta * 0.55;
        ring3.rotation.x += delta * 0.4;

        // Pulsing emissive glow
        const pulse = 0.5 + Math.sin(now * 2.5) * 0.4;
        innerMat.emissiveIntensity = 0.8 + pulse * 0.5;
        ringMat2.emissiveIntensity = 0.3 + pulse * 0.3;

        // Central core facet spin
        coreMesh.rotation.x += delta * 0.18;
        coreMesh.rotation.y += delta * 0.24;

        // Rotor turbine spin (matching Junca sound active status)
        rotorGroup.rotation.z += delta * 3.2;

        // Particle swirl drift
        particlePoints.rotation.y += delta * 0.06;
        particlePoints.rotation.x = Math.sin(now * 0.3) * 0.1;

        // Handle 3D shockwave blast
        if (blastActive) {
          blastRadius += delta * 12.0;
          blastOpacity -= delta * 1.8;
          blastRing.scale.set(blastRadius, blastRadius, 1);
          blastMat.opacity = Math.max(0, blastOpacity);

          if (blastOpacity <= 0) {
            blastActive = false;
            blastRing.scale.set(0.1, 0.1, 1);
          }
        }
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    // 8. Responsive Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      container.removeEventListener('click', triggerSceneBlast);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      particleGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringGeo3.dispose();
      coreGeo.dispose();
      innerGeo.dispose();
      blastGeo.dispose();
    };
  }, [theme, isCompact]);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full relative cursor-grab active:cursor-grabbing ${className}`}
      style={{ touchAction: 'none' }}
      aria-label="Interactive 3D Technology Entity"
    />
  );
};
