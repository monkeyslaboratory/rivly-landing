'use client';
import { motion } from 'framer-motion';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  pulse?: boolean;
  icon?: ReactNode;
}

const baseClasses = 'relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl cursor-pointer select-none';

const variants = {
  primary: 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90',
  ghost: 'bg-transparent text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--text-primary)]',
  outline: 'bg-transparent text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({ variant = 'primary', size = 'md', children, pulse, icon, className = '', ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${pulse ? 'cta-pulse' : ''} ${className}`}
      {...(props as Record<string, unknown>)}
    >
      {children}
      {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
    </motion.button>
  );
}
