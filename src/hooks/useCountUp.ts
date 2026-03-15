'use client';
import { useState, useEffect, useRef } from 'react';
import { COUNTER } from '@/lib/animation-config';

export function useCountUp(target: number, trigger: boolean, suffix: string = ''): string {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!trigger || hasRun.current) return;
    hasRun.current = true;

    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / COUNTER.duration, 1);
      const eased = COUNTER.easing(progress);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [trigger, target]);

  return `${value.toLocaleString()}${suffix}`;
}
