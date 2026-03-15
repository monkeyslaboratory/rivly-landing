'use client';
import { motion } from 'framer-motion';
import { Search, Monitor, CalendarClock, Gauge, GitCompareArrows, Bell, FileDown } from 'lucide-react';
import { staggerContainer, staggerItem, viewportOnce, fadeInUp } from '@/lib/animation-config';

const features = [
  {
    icon: Search,
    title: 'AI Competitor Discovery',
    description: 'Automatically find and track competitors you didn\'t even know existed. AI-powered market mapping.',
    large: true,
    accent: 'primary' as const,
  },
  {
    icon: Monitor,
    title: 'Desktop + Mobile',
    description: 'Full analysis of both desktop and mobile experiences. Side-by-side comparison.',
    large: true,
    accent: 'secondary' as const,
  },
  {
    icon: CalendarClock,
    title: 'Scheduled Reports',
    description: 'Weekly or monthly automated runs. Never miss a competitor change.',
    large: false,
    accent: 'primary' as const,
  },
  {
    icon: Gauge,
    title: 'UX Score 0\u2013100',
    description: 'Proprietary scoring system across 15+ UX dimensions.',
    large: false,
    accent: 'secondary' as const,
  },
  {
    icon: GitCompareArrows,
    title: 'Diff View',
    description: 'Visual diff showing exactly what changed between runs.',
    large: false,
    accent: 'primary' as const,
  },
  {
    icon: Bell,
    title: 'Email + Telegram',
    description: 'Get notified instantly when competitors make significant changes.',
    large: false,
    accent: 'secondary' as const,
  },
  {
    icon: FileDown,
    title: 'Export PDF & CSV',
    description: 'Share polished reports with stakeholders or feed data into your tools.',
    large: false,
    accent: 'primary' as const,
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Everything you need to{' '}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }} className="text-[var(--accent-primary)]">
              outpace
            </span>{' '}
            competitors
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
            Powerful features designed for product teams who take competitive intelligence seriously.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={staggerItem}
              whileHover={{ scale: 1.01, borderColor: 'var(--accent-primary)' }}
              className={`group rounded-2xl p-6 bg-[var(--bg-secondary)] border border-[var(--border)] transition-all hover:shadow-[var(--shadow-glow)] ${
                f.large && i < 2 ? 'lg:col-span-1 sm:col-span-1' : ''
              } ${i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''} ${i === 1 ? 'sm:col-span-1' : ''}`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ background: f.accent === 'secondary' ? 'var(--accent-secondary-glow)' : 'var(--accent-glow)' }}
              >
                <f.icon size={24} style={{ color: f.accent === 'secondary' ? 'var(--accent-secondary)' : 'var(--accent-primary)' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.description}</p>

              {/* Special visuals for large cards */}
              {i === 0 && (
                <div className="mt-4 flex gap-2">
                  {['Stripe', 'Notion', 'Linear'].map((name) => (
                    <motion.div
                      key={name}
                      className="px-3 py-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] text-xs font-mono text-[var(--text-muted)]"
                      whileHover={{ borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' }}
                    >
                      {name}
                    </motion.div>
                  ))}
                  <div className="px-3 py-1.5 rounded-lg bg-[var(--accent-glow)] text-xs font-mono text-[var(--accent-primary)]">
                    +12 more
                  </div>
                </div>
              )}

              {i === 3 && (
                <div className="mt-4 flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="var(--bg-subtle)" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="14" fill="none"
                        stroke="var(--accent-secondary)" strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="88"
                        strokeDashoffset="11"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold font-mono text-[var(--accent-secondary)]">
                      87
                    </div>
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">Score updates with each run</div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
