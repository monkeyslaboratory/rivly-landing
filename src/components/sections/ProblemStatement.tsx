'use client';
import { motion } from 'framer-motion';
import { Clock, DollarSign, TrendingDown } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/animation-config';
import type { LucideIcon } from 'lucide-react';

const problems: { icon: LucideIcon; stat: string; statLabel: string; description: string; color: string }[] = [
  {
    icon: Clock,
    stat: '40+ hrs',
    statLabel: 'per audit',
    description: 'Manual UX audit of 5 competitors is practically a full-time job',
    color: 'var(--accent-primary)',
  },
  {
    icon: DollarSign,
    stat: '$15K+/yr',
    statLabel: 'for tools',
    description: 'Enterprise tools like Crayon or Klue aren\'t built for mid-market teams',
    color: 'var(--accent-secondary)',
  },
  {
    icon: TrendingDown,
    stat: 'Outdated',
    statLabel: 'in 2 weeks',
    description: 'Quarterly audits are stale by the time you finish reading them',
    color: 'var(--accent-primary)',
  },
];

export function ProblemStatement() {
  return (
    <section className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 tracking-tight"
        >
          Still doing competitor analysis{' '}
          <span
            className="text-[var(--accent-primary)]"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
          >
            manually
          </span>
          ?
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {problems.map((p) => (
            <motion.div
              key={p.stat}
              variants={staggerItem}
              whileHover={{ y: -4, borderColor: 'var(--border-hover)' }}
              className="glass-card rounded-2xl p-8 text-center transition-shadow hover:shadow-[var(--shadow-glow)]"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: `color-mix(in srgb, ${p.color} 12%, transparent)` }}
              >
                <p.icon size={28} style={{ color: p.color }} strokeWidth={1.5} />
              </div>
              <div className="text-2xl font-bold font-mono mb-1" style={{ color: p.color }}>{p.stat}</div>
              <div className="text-sm text-[var(--text-muted)] mb-4">{p.statLabel}</div>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
