'use client';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 28, showText = true, className = '' }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="16" fill="var(--text-primary)" />
        <path d="M16 8L23.5 22H8.5L16 8Z" fill="var(--bg-primary)" />
      </svg>
      {showText && (
        <span
          className="text-[var(--text-primary)] font-bold tracking-tight"
          style={{ fontSize: size * 0.75, fontFamily: "'Satoshi', sans-serif" }}
        >
          Rivly
        </span>
      )}
    </div>
  );
}
