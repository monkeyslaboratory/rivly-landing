'use client';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 1023px)');

  useEffect(() => {
    if (isMobile || !ref.current) return;
    const el = ref.current;
    let raf: number;

    const handler = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${e.clientX - 160}px, ${e.clientY - 160}px)`;
      });
    };
    window.addEventListener('mousemove', handler);
    return () => {
      window.removeEventListener('mousemove', handler);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-80 h-80 rounded-full pointer-events-none z-[9998] opacity-[0.05]"
      style={{
        background: 'radial-gradient(circle, var(--accent-primary), transparent 70%)',
        filter: 'blur(80px)',
      }}
    />
  );
}
