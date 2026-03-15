'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { fadeInUp, viewportOnce } from '@/lib/animation-config';

function LightRays({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDarkRef = useRef(isDark);
  isDarkRef.current = isDark;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
    };
    resize();

    const animate = () => {
      time += 0.002;
      const w = canvas.width;
      const h = canvas.height;
      const dark = isDarkRef.current;

      // Base fill
      ctx.fillStyle = dark ? '#08051a' : '#f0ecff';
      ctx.fillRect(0, 0, w, h);

      // Vertical rays
      const rayCount = 50;
      for (let i = 0; i < rayCount; i++) {
        const norm = i / rayCount;
        const x = norm * w;
        const rayW = w / rayCount;

        const f1 = 0.35 + Math.sin(time * 0.8) * 0.05;
        const f2 = 0.65 + Math.cos(time * 0.6) * 0.05;

        const d1 = Math.exp(-Math.pow((norm - f1) * 4, 2));
        const d2 = Math.exp(-Math.pow((norm - f2) * 4, 2));
        const brightness = Math.max(d1, d2 * 0.7);

        if (brightness < 0.01) continue;

        const mix = d2 / (d1 + d2 + 0.001);

        let r: number, g: number, b: number;
        if (dark) {
          r = Math.round(67 + mix * 188);
          g = Math.round(56 + mix * 51);
          b = Math.round(202 - mix * 158);
        } else {
          // Light theme: softer, more saturated pastels
          r = Math.round(99 + mix * 156);  // 99→255
          g = Math.round(82 + mix * 25);   // 82→107
          b = Math.round(241 - mix * 197); // 241→44
        }

        const peakY = 0.35 + d1 * 0.1;
        const alpha = dark ? brightness : brightness * 0.6;
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, dark ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)');
        grad.addColorStop(peakY - 0.15, `rgba(${r},${g},${b},${alpha * 0.12})`);
        grad.addColorStop(peakY, `rgba(${r},${g},${b},${alpha * 0.3})`);
        grad.addColorStop(peakY + 0.15, `rgba(${r},${g},${b},${alpha * 0.1})`);
        grad.addColorStop(1, dark ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)');

        ctx.fillStyle = grad;
        ctx.fillRect(x, 0, rayW + 1, h);

        const combined = Math.min(1, d1 + d2);
        if (combined > 0.2) {
          ctx.fillStyle = `rgba(${r},${g},${b},${combined * 0.025})`;
          ctx.fillRect(x, 0, 1, h);
        }
      }

      // Indigo glow (left)
      const cx1 = (0.35 + Math.sin(time * 0.8) * 0.05) * w;
      const cy1 = 0.38 * h;
      const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, w * 0.35);
      g1.addColorStop(0, dark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.18)');
      g1.addColorStop(0.4, dark ? 'rgba(67,56,202,0.05)' : 'rgba(99,102,241,0.06)');
      g1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Orange glow (right)
      const cx2 = (0.65 + Math.cos(time * 0.6) * 0.05) * w;
      const cy2 = 0.5 * h;
      const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, w * 0.28);
      g2.addColorStop(0, dark ? 'rgba(255,107,44,0.1)' : 'rgba(255,107,44,0.15)');
      g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export function FinalCTA() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <LightRays isDark={isDark} />

      {/* Transitions */}
      <div
        className="absolute top-0 left-0 right-0 h-52 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, var(--bg-primary), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}
      />

      <div className="relative z-20 max-w-3xl mx-auto text-center">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={`text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight ${isDark ? 'text-white' : 'text-[#1a1033]'}`}
        >
          Stop guessing.
          <br />
          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }} className="text-[var(--accent-primary)]">
            Start knowing.
          </span>
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          custom={0.15}
          className={`text-lg mb-12 max-w-lg mx-auto ${isDark ? 'text-white/50' : 'text-[#1a1033]/50'}`}
        >
          Get your first competitor UX report in 30 minutes. Free.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          custom={0.3}
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`group inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-semibold cursor-pointer select-none ${
              isDark ? 'bg-white text-[#08051a]' : 'bg-[#1a1033] text-white'
            }`}
            style={{
              boxShadow: isDark
                ? '0 0 60px rgba(99,102,241,0.25), 0 0 100px rgba(255,107,44,0.1), 0 20px 40px rgba(0,0,0,0.4)'
                : '0 0 60px rgba(99,102,241,0.2), 0 0 100px rgba(255,107,44,0.08), 0 20px 40px rgba(0,0,0,0.1)',
            }}
          >
            Start Free Analysis
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
