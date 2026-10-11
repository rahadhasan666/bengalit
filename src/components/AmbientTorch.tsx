import React, { useEffect, useState } from 'react';

export const AmbientTorch: React.FC = () => {
  const [torchPos, setTorchPos] = useState({ x: -500, y: -500 });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Only enable on desktop with pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = -500;
    let targetY = -500;
    let curX = -500;
    let curY = -500;
    let frameId: number;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isReady) setIsReady(true);
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    const loop = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      setTorchPos({ x: curX, y: curY });
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frameId);
    };
  }, [isReady]);

  if (!isReady) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-700"
      style={{
        background: `radial-gradient(650px circle at ${torchPos.x}px ${torchPos.y}px, rgba(237, 51, 39, 0.045) 0%, rgba(237, 51, 39, 0.015) 45%, transparent 70%)`,
      }}
      aria-hidden="true"
    />
  );
};

export default AmbientTorch;
