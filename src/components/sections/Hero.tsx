'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { scrollTo } from '@/components/SmoothScroll';
import { heroSequence, EASE } from '@/lib/animation-config';

const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then((m) => ({ default: m.HeroScene })),
  { ssr: false, loading: () => null }
);


export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
      <HeroScene />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        {/* Badge */}
        <Badge text="Now in Beta" delay={heroSequence.badge.delay} />

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: heroSequence.heading.delay, ease: EASE.smooth }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          Your AI UX analyst watching{' '}
          <span
            className="text-[var(--accent-primary)]"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
          >
            competitors
          </span>{' '}
          24/7
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: heroSequence.subtitle.delay, ease: EASE.smooth }}
          className="text-lg sm:text-xl text-[var(--text-primary)] opacity-70 max-w-2xl"
        >
          Automated weekly UX/CX reports on your competitors. Set up in 5 minutes, powered by AI.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: heroSequence.ctas.delay, ease: EASE.smooth }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button variant="primary" size="lg" pulse className="group">
            Start Free Analysis
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => scrollTo('#how-it-works')}
          >
            See How It Works
          </Button>
        </motion.div>

        {/* Product Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: heroSequence.product.delay, ease: EASE.smooth }}
          className="mt-8 w-full max-w-3xl perspective-[1200px]"
        >
          <div className="relative rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[var(--bg-primary)]">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3 bg-[var(--bg-primary)] border-b border-[var(--border)]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[var(--text-muted)]/30" />
                <div className="w-3 h-3 rounded-full bg-[var(--text-muted)]/30" />
                <div className="w-3 h-3 rounded-full bg-[var(--text-muted)]/30" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-[var(--bg-subtle)] rounded-full px-3 py-1 text-xs text-[var(--text-muted)] font-mono text-center">
                  app.rivly.tech/dashboard
                </div>
              </div>
            </div>
            {/* Dashboard mockup */}
            <div className="p-5 space-y-4">
              <div className="flex gap-4">
                {/* Sidebar mock */}
                <div className="hidden sm:flex flex-col gap-2 w-40 shrink-0">
                  {['Dashboard', 'Jobs', 'Reports', 'Settings'].map((item, i) => (
                    <div
                      key={item}
                      className={`px-3 py-2 rounded-xl text-sm ${
                        i === 0
                          ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium'
                          : 'text-[var(--text-muted)]'
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                {/* Main content */}
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Competitors', value: '5' },
                      { label: 'UX Score', value: '87' },
                      { label: 'Changes', value: '23' },
                    ].map((m) => (
                      <div key={m.label} className="p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)]">
                        <div className="text-xs text-[var(--text-muted)]">{m.label}</div>
                        <div className="text-xl font-bold text-[var(--text-primary)] font-mono">{m.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {['Stripe', 'Notion', 'Linear', 'Figma'].map((name) => (
                      <div key={name} className="p-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[var(--bg-subtle)] flex items-center justify-center text-xs font-bold text-[var(--text-primary)]">
                          {name[0]}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{name}</div>
                          <div className="text-xs text-[var(--text-muted)]">Last analyzed 2h ago</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade-out gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }}
      />
    </section>
  );
}
