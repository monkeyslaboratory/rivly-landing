'use client';
import { motion } from 'framer-motion';
import { fadeInUp, viewportOnce } from '@/lib/animation-config';

const testimonials = [
  {
    quote: 'Rivly saved us 30+ hours per month on competitive research. What used to take a full week now happens automatically.',
    name: 'Alex K.',
    role: 'Product Manager',
    company: 'Series B SaaS',
  },
  {
    quote: 'We caught a competitor\'s complete redesign within 24 hours. That intelligence was worth the entire annual subscription.',
    name: 'Sarah L.',
    role: 'UX Lead',
    company: 'FinTech Startup',
  },
  {
    quote: 'The UX scoring system is incredibly insightful. It gives us a quantified benchmark we can track over time.',
    name: 'Marcus T.',
    role: 'Head of Product',
    company: 'E-commerce Platform',
  },
  {
    quote: 'Setting up took 5 minutes. First report blew our minds. We found 3 areas where competitors were ahead of us.',
    name: 'Emily R.',
    role: 'CPO',
    company: 'HR Tech',
  },
  {
    quote: 'Finally a competitive intelligence tool built for product people, not sales teams. The UX focus is exactly what we needed.',
    name: 'David C.',
    role: 'VP Product',
    company: 'MarTech Scale-up',
  },
  {
    quote: 'The diff view is a game-changer. We see exactly what competitors changed week over week. Pure gold for product strategy.',
    name: 'Nina W.',
    role: 'Product Designer',
    company: 'Developer Tools',
  },
];

const row1 = testimonials.slice(0, 3);
const row2 = testimonials.slice(3);

export function Testimonials() {
  return (
    <section className="relative py-28 overflow-hidden">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="text-center mb-16 px-6"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          What early adopters{' '}
          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }} className="text-[var(--accent-primary)]">
            say
          </span>
        </h2>
      </motion.div>

      {/* Row 1 - left to right */}
      <div className="mb-6 overflow-hidden">
        <div className="animate-marquee flex gap-6 pr-6">
          {[...row1, ...row1, ...row1].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} {...t} />
          ))}
        </div>
      </div>

      {/* Row 2 - right to left */}
      <div className="overflow-hidden">
        <div className="animate-marquee-reverse flex gap-6 pr-6">
          {[...row2, ...row2, ...row2].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, name, role, company }: {
  quote: string; name: string; role: string; company: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-6 w-[380px] shrink-0 hover:border-[var(--border-hover)] transition-colors">
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 italic">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--accent-glow)] flex items-center justify-center text-sm font-bold text-[var(--accent-primary)]">
          {name[0]}
        </div>
        <div>
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs text-[var(--text-muted)]">{role} @ {company}</div>
        </div>
      </div>
    </div>
  );
}
