import React, { useState, useRef, useEffect } from 'react';
import { soundFX } from '../hooks/useSoundFX';

interface TextScrambleProps {
  text: string;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
  triggerOnHover?: boolean;
}

const GLYPHS = '01▲◈⌁Ø§X947!@#$&';

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  className = '',
  as: Component = 'span',
  triggerOnHover = true,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number | null>(null);
  const isScrambling = useRef(false);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const scramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;
    soundFX.playGlitch();

    const duration = 400; // ms
    const startTime = performance.now();
    const length = text.length;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const solvedCount = Math.floor(progress * length);

      let scrambled = '';
      for (let i = 0; i < length; i++) {
        if (text[i] === ' ') {
          scrambled += ' ';
        } else if (i < solvedCount) {
          scrambled += text[i];
        } else {
          scrambled += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(scrambled);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplayText(text);
        isScrambling.current = false;
      }
    };

    frameRef.current = requestAnimationFrame(step);
  };

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      scramble();
    }
  };

  return (
    <Component
      className={`inline-block cursor-default select-none ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </Component>
  );
};

export default TextScramble;
