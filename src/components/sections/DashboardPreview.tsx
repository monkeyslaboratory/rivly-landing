'use client';
import { motion } from 'framer-motion';
import { Monitor, GitCompareArrows, Mail } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/animation-config';

const features = [
  { icon: Monitor, title: 'Desktop + Mobile', description: 'Analyze both desktop and mobile experiences side by side' },
  { icon: GitCompareArrows, title: 'Diff View', description: 'See exactly what changed between analysis runs' },
  { icon: Mail, title: 'Email Reports', description: 'Get beautiful reports delivered to your inbox weekly' },
];

export function DashboardPreview() {
  return (
    <section className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            See your competitors through{' '}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }} className="text-[var(--accent-primary)]">
              AI eyes
            </span>
          </h2>
        </motion.div>

        {/* Browser mockup */}
        <motion.div
          initial={{ opacity: 0, rotateX: 5, scale: 0.9 }}
          whileInView={{ opacity: 1, rotateX: 0, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="perspective-[1200px] mb-16"
        >
          <div className="rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[var(--bg-primary)]" style={{ boxShadow: 'var(--shadow-glow)' }}>
            {/* Chrome */}
            <div className="flex items-center gap-2 px-5 py-3 bg-[var(--bg-primary)] border-b border-[var(--border)]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[var(--text-muted)]/30" />
                <div className="w-3 h-3 rounded-full bg-[var(--text-muted)]/30" />
                <div className="w-3 h-3 rounded-full bg-[var(--text-muted)]/30" />
              </div>
              <div className="flex-1 mx-8">
                <div className="bg-[var(--bg-subtle)] rounded-full px-3 py-1 text-xs text-[var(--text-muted)] font-mono text-center max-w-sm mx-auto">
                  app.rivly.tech/job/acme-vs-competitors
                </div>
              </div>
            </div>

            {/* Dashboard */}
            <div className="p-6 sm:p-8">
              <div className="flex gap-6">
                {/* Sidebar */}
                <div className="hidden md:block w-48 shrink-0 space-y-1">
                  {[
                    { label: 'Overview', active: true },
                    { label: 'Competitors', active: false },
                    { label: 'Reports', active: false },
                    { label: 'Insights', active: false },
                    { label: 'Settings', active: false },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`px-3 py-2 rounded-xl text-sm transition-colors ${
                        item.active
                          ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                      }`}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>

                {/* Main */}
                <div className="flex-1 space-y-5">
                  {/* Top metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'UX Score', value: '87/100', change: '+5' },
                      { label: 'Competitors', value: '5', change: '' },
                      { label: 'Changes', value: '23', change: 'this week' },
                      { label: 'Next Run', value: '2d 4h', change: '' },
                    ].map((m) => (
                      <div key={m.label} className="p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)]">
                        <div className="text-xs text-[var(--text-muted)] mb-1">{m.label}</div>
                        <div className="text-lg font-bold font-mono text-[var(--text-primary)]">{m.value}</div>
                        {m.change && <div className="text-xs text-[var(--accent-primary)]">{m.change}</div>}
                      </div>
                    ))}
                  </div>

                  {/* Competitor list */}
                  <div className="space-y-2">
                    {[
                      { name: 'Stripe', score: 92, change: '+3' },
                      { name: 'Notion', score: 85, change: '-2' },
                      { name: 'Linear', score: 88, change: '+7' },
                      { name: 'Figma', score: 91, change: '+1' },
                    ].map((c) => (
                      <div key={c.name} className="flex items-center gap-4 p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)]">
                        <div className="w-10 h-10 rounded-xl bg-[var(--bg-subtle)] flex items-center justify-center text-sm font-bold text-[var(--text-primary)]">
                          {c.name[0]}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-[var(--text-primary)]">{c.name}</div>
                          <div className="text-xs text-[var(--text-muted)]">{c.name.toLowerCase()}.com</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold font-mono text-[var(--text-primary)]">{c.score}</div>
                          <div className={`text-xs font-mono ${c.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {c.change}
                          </div>
                        </div>
                        <div className="w-20 h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[var(--text-primary)]"
                            style={{ width: `${c.score}%`, opacity: 0.6 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 text-center transition-shadow hover:shadow-[var(--shadow-glow)]"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-glow)] flex items-center justify-center mx-auto mb-4">
                <f.icon size={24} className="text-[var(--accent-primary)]" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
