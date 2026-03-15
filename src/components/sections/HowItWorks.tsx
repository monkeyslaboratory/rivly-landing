'use client';
import { motion } from 'framer-motion';
import { Globe, Search, ListChecks, CalendarClock, FileBarChart } from 'lucide-react';
import { fadeInUp, viewportOnce, EASE } from '@/lib/animation-config';

const steps = [
  {
    number: '01',
    title: 'Paste your URL',
    description: 'Enter your product\'s URL. That\'s all we need to get started.',
    icon: Globe,
    accent: 'primary' as const,
    visual: <UrlInputVisual />,
  },
  {
    number: '02',
    title: 'AI finds your competitors',
    description: 'Our AI automatically discovers and maps your competitive landscape.',
    icon: Search,
    accent: 'secondary' as const,
    visual: <CompetitorCardsVisual />,
  },
  {
    number: '03',
    title: 'Choose what to analyze',
    description: 'Select from 15+ analysis areas: navigation, pricing pages, onboarding, mobile UX, and more.',
    icon: ListChecks,
    accent: 'primary' as const,
    visual: <ChecklistVisual />,
  },
  {
    number: '04',
    title: 'Set schedule & launch',
    description: 'Choose weekly or monthly reports and hit launch. Done.',
    icon: CalendarClock,
    accent: 'secondary' as const,
    visual: <ScheduleVisual />,
  },
  {
    number: '05',
    title: 'Get weekly insights',
    description: 'Receive detailed UX reports with scores, screenshots, and actionable insights.',
    icon: FileBarChart,
    accent: 'primary' as const,
    visual: <ReportVisual />,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            How it{' '}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }} className="text-[var(--accent-secondary)]">
              works
            </span>
          </h2>
          <p className="text-[var(--text-primary)] opacity-60 text-lg max-w-xl mx-auto">
            From URL to insights in under 30 minutes. Five simple steps.
          </p>
        </motion.div>

        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border)] -translate-x-1/2 hidden sm:block">
            <motion.div
              className="w-full bg-gradient-to-b from-[var(--accent-secondary)] via-[var(--accent-primary)] to-[var(--accent-secondary)]"
              initial={{ height: '0%' }}
              whileInView={{ height: '100%' }}
              viewport={viewportOnce}
              transition={{ duration: 2, ease: EASE.smooth }}
              style={{ originY: 0 }}
            />
          </div>

          <div className="space-y-16 sm:space-y-24">
            {steps.map((step, i) => {
              const isIndigo = step.accent === 'secondary';
              const dotColor = isIndigo ? 'bg-[var(--accent-secondary)]' : 'bg-[var(--accent-primary)]';
              const iconColor = isIndigo ? 'text-[var(--accent-secondary)]' : 'text-[var(--accent-primary)]';

              return (
                <motion.div
                  key={step.number}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  custom={0.1}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center`}
                  style={{ direction: i % 2 === 1 ? 'rtl' : 'ltr' }}
                >
                  {/* Step number dot */}
                  <div className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full ${dotColor} flex items-center justify-center text-white text-sm font-bold z-10 hidden sm:flex`}
                    style={{ boxShadow: isIndigo ? '0 0 20px rgba(99,102,241,0.4)' : '0 0 20px rgba(255,107,44,0.4)' }}
                  >
                    {step.number}
                  </div>

                  {/* Text */}
                  <div className={`${i % 2 === 1 ? 'md:text-right' : ''}`} style={{ direction: 'ltr' }}>
                    <div className="flex items-center gap-3 mb-3 sm:hidden">
                      <div className={`w-8 h-8 rounded-full ${dotColor} flex items-center justify-center text-white text-xs font-bold`}>
                        {step.number}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2" style={{ justifyContent: i % 2 === 1 ? 'flex-end' : 'flex-start' }}>
                      <step.icon size={20} className={iconColor} />
                      <h3 className="text-xl font-bold text-[var(--text-primary)]">{step.title}</h3>
                    </div>
                    <p className="text-[var(--text-primary)] opacity-60">{step.description}</p>
                  </div>

                  {/* Visual */}
                  <div style={{ direction: 'ltr' }}>
                    {step.visual}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Step Visuals ── */

function UrlInputVisual() {
  return (
    <motion.div
      className="rounded-2xl p-5 bg-[var(--bg-secondary)] border border-[var(--border)]"
      whileInView={{ opacity: [0, 1] }}
      viewport={viewportOnce}
    >
      <div className="flex items-center gap-2 bg-[var(--bg-primary)] rounded-xl px-4 py-3 border border-[var(--border)]">
        <Globe size={16} className="text-[var(--text-muted)] shrink-0" />
        <motion.span
          className="text-sm font-mono text-[var(--text-primary)]"
          initial={{ width: 0 }}
          whileInView={{ width: 'auto' }}
          viewport={viewportOnce}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'inline-block' }}
        >
          https://myproduct.com
        </motion.span>
        <motion.div
          className="w-0.5 h-4 bg-[var(--accent-primary)]"
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        />
      </div>
      <motion.div
        className="mt-4 h-1.5 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.5, delay: 1.5 }}
      />
    </motion.div>
  );
}

function CompetitorCardsVisual() {
  const competitors = [
    { name: 'Stripe', letter: 'S' },
    { name: 'Notion', letter: 'N' },
    { name: 'Linear', letter: 'L' },
  ];

  return (
    <div className="space-y-2.5">
      {competitors.map((c, i) => (
        <motion.div
          key={c.name}
          className="rounded-2xl p-4 bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.3 + i * 0.2, type: 'spring', stiffness: 100 }}
        >
          <div className="w-9 h-9 rounded-xl bg-[var(--accent-secondary-glow)] flex items-center justify-center text-sm font-bold text-[var(--accent-secondary)]">
            {c.letter}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-[var(--text-primary)]">{c.name}</div>
            <div className="text-xs text-[var(--text-muted)] font-mono">{c.name.toLowerCase()}.com</div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-xs text-green-400 font-mono font-medium">Found</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ChecklistVisual() {
  const items = ['Navigation UX', 'Pricing Page', 'Onboarding Flow', 'Mobile Experience'];

  return (
    <div className="rounded-2xl p-5 bg-[var(--bg-secondary)] border border-[var(--border)] space-y-1">
      {items.map((item, i) => (
        <motion.div
          key={item}
          className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-[var(--bg-subtle)] transition-colors"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.3 + i * 0.2 }}
        >
          <motion.div
            className="w-5 h-5 rounded-md border-2 border-[var(--accent-primary)] flex items-center justify-center bg-[var(--accent-primary)]"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.5 + i * 0.2, type: 'spring' }}
          >
            <motion.svg
              viewBox="0 0 24 24"
              className="w-3 h-3 text-white"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.7 + i * 0.2, duration: 0.3 }}
            >
              <motion.path
                d="M5 13l4 4L19 7"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.7 + i * 0.2, duration: 0.3 }}
              />
            </motion.svg>
          </motion.div>
          <span className="text-sm font-medium text-[var(--text-primary)]">{item}</span>
        </motion.div>
      ))}
    </div>
  );
}

function ScheduleVisual() {
  return (
    <div className="rounded-2xl p-5 bg-[var(--bg-secondary)] border border-[var(--border)]">
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <div key={`${d}-${i}`} className="text-center text-xs text-[var(--text-muted)] py-1 font-medium">{d}</div>
        ))}
        {Array.from({ length: 28 }, (_, i) => (
          <motion.div
            key={i}
            className={`text-center text-xs py-1.5 rounded-lg ${
              [1, 8, 15, 22].includes(i)
                ? 'bg-[var(--accent-secondary)] text-white font-bold'
                : 'text-[var(--text-primary)] opacity-50'
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [1, 8, 15, 22].includes(i) ? 1 : 0.5 }}
            viewport={viewportOnce}
            transition={{ delay: 0.02 * i }}
          >
            {i + 1}
          </motion.div>
        ))}
      </div>
      <motion.button
        className="w-full py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-semibold cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Launch Analysis
      </motion.button>
    </div>
  );
}

function ReportVisual() {
  return (
    <motion.div
      className="rounded-2xl p-5 bg-[var(--bg-secondary)] border border-[var(--border)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ delay: 0.3, type: 'spring' }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-[var(--text-primary)]">UX Report — Week 12</span>
        <span className="text-xs text-[var(--text-muted)] font-mono bg-[var(--bg-subtle)] px-2 py-0.5 rounded-lg">Mar 15, 2026</span>
      </div>
      <div className="flex items-center gap-4 mb-5">
        <div className="relative w-16 h-16">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--bg-subtle)" strokeWidth="3" />
            <motion.circle
              cx="18" cy="18" r="15.9" fill="none"
              stroke="var(--accent-secondary)" strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="100"
              initial={{ strokeDashoffset: 100 }}
              whileInView={{ strokeDashoffset: 13 }}
              viewport={viewportOnce}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold font-mono text-[var(--accent-secondary)]">
            87
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-[var(--text-primary)]">Overall UX Score</div>
          <div className="text-xs text-green-400 font-medium">+5 from last week</div>
        </div>
      </div>
      <div className="flex gap-2">
        {[
          { tag: 'Navigation', color: 'primary' },
          { tag: 'Mobile', color: 'secondary' },
          { tag: 'Performance', color: 'primary' },
        ].map(({ tag, color }) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs rounded-lg font-mono font-medium"
            style={{
              background: color === 'secondary' ? 'var(--accent-secondary-glow)' : 'var(--accent-glow)',
              color: color === 'secondary' ? 'var(--accent-secondary)' : 'var(--accent-primary)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
