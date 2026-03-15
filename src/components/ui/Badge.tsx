'use client';
import { motion } from 'framer-motion';

interface BadgeProps {
  text: string;
  delay?: number;
}

export function Badge({ text, delay = 0 }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-sm text-[var(--text-secondary)]"
    >
      <span className="live-dot" />
      {text}
    </motion.div>
  );
}
