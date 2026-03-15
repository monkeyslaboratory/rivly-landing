'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';
import { fadeInUp, viewportOnce } from '@/lib/animation-config';

const metrics = [
  { value: 500, suffix: '+', label: 'Teams trust Rivly', color: 'var(--accent-primary)' },
  { value: 10000, suffix: '+', label: 'Reports generated', color: 'var(--accent-secondary)' },
  { value: 40, suffix: 'hrs', label: 'Saved per month per team', color: 'var(--accent-primary)' },
];

export function MetricsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {metrics.map((m, i) => (
            <MetricItem key={m.label} {...m} inView={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricItem({ value, suffix, label, inView, index, color }: {
  value: number; suffix: string; label: string; inView: boolean; index: number; color: string;
}) {
  const display = useCountUp(value, inView, suffix);

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={index * 0.15}
      className="space-y-1"
    >
      <div className="text-4xl sm:text-5xl font-bold font-mono" style={{ color }}>
        {display}
      </div>
      <div className="text-sm text-[var(--text-secondary)]">{label}</div>
    </motion.div>
  );
}
