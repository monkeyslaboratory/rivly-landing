import type { Variants, Transition } from 'framer-motion';

// ── Durations ──
export const DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  reveal: 0.8,
  hero: 1.2,
} as const;

// ── Easings ──
export const EASE = {
  smooth: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  out: [0, 0, 0.2, 1] as [number, number, number, number],
  spring: { type: 'spring' as const, stiffness: 100, damping: 15 },
  bounce: { type: 'spring' as const, stiffness: 300, damping: 20 },
} as const;

// ── Reveal variants ──
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, delay, ease: EASE.smooth },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: DURATION.slow, delay, ease: EASE.smooth },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slow, delay, ease: EASE.smooth },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.smooth },
  },
};

// ── Hero specific ──
export const heroSequence = {
  badge: { delay: 0.2 },
  heading: { delay: 0.4, stagger: 0.05 },
  subtitle: { delay: 0.7 },
  ctas: { delay: 0.9 },
  product: { delay: 1.1 },
  logos: { delay: 1.4 },
} as const;

// ── Counter ──
export const COUNTER = {
  duration: 2000,
  easing: (t: number) => 1 - Math.pow(1 - t, 4), // easeOutQuart
} as const;

// ── Viewport settings ──
export const viewportOnce = { once: true, margin: '-100px' as const };
