'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/animation-config';

const faqs = [
  {
    q: 'How does Rivly analyze competitor websites?',
    a: 'Rivly uses AI agents powered by Claude to systematically crawl and analyze competitor websites. We capture screenshots, evaluate UX patterns, measure performance, and generate structured insights — just like a senior UX researcher would, but automated and at scale.',
  },
  {
    q: 'Is it legal to analyze competitor websites?',
    a: 'Yes. Rivly only accesses publicly available information on competitor websites — the same information any visitor would see. We respect robots.txt, don\'t bypass authentication, and operate within standard web scraping legal frameworks.',
  },
  {
    q: 'What kind of insights will I get?',
    a: 'Each report includes UX scores (0-100), annotated screenshots, navigation analysis, mobile responsiveness evaluation, performance benchmarks, content strategy assessment, and specific actionable recommendations for your product.',
  },
  {
    q: 'How long does the first analysis take?',
    a: 'Typically 15-30 minutes for a standard analysis of 3-5 competitors. More comprehensive analyses with mobile + desktop and additional analysis areas may take up to an hour.',
  },
  {
    q: 'Can I analyze sites that require login?',
    a: 'Yes, with the Business plan. The Credential Vault feature allows you to securely store login credentials so Rivly can analyze authenticated experiences like dashboards, onboarding flows, and settings pages.',
  },
  {
    q: 'What happens if a competitor redesigns their site?',
    a: 'That\'s exactly what Rivly is built for! The diff-view feature highlights every change between analysis runs. You\'ll see exactly what changed, with before/after screenshots and impact assessment.',
  },
  {
    q: 'How is Rivly different from Crayon/Klue/Visualping?',
    a: 'Those tools are built for sales competitive intelligence — tracking pricing changes, press releases, and messaging. Rivly is built specifically for product and UX teams, focusing on design patterns, user experience quality, and interface analysis.',
  },
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Absolutely. No contracts, no cancellation fees. You can cancel or downgrade your plan at any time from your account settings. Your data remains accessible until the end of your billing period.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-28 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Frequently asked{' '}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }} className="text-[var(--accent-primary)]">
              questions
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-0"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="border-b border-[var(--border)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-5 flex items-center justify-between text-left cursor-pointer group"
              >
                <span className="text-base font-medium pr-8 group-hover:text-[var(--accent-primary)] transition-colors">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <Plus
                    size={20}
                    className={`transition-colors ${
                      openIndex === i ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'
                    }`}
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
