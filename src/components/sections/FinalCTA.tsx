'use client';
import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeInUp, viewportOnce } from '@/lib/animation-config';

function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  interface Particle {
    x: number;
    y: number;
    size: number;
    speedY: number;
    speedX: number;
    opacity: number;
    hue: number;
  }

  const particles = useMemo(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < 60; i++) {
      arr.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 3 + 1,
        speedY: Math.random() * 0.15 + 0.05,
        speedX: (Math.random() - 0.5) * 0.08,
        opacity: Math.random() * 0.5 + 0.15,
        hue: Math.random() > 0.5 ? 0 : 1, // 0 = orange, 1 = indigo
      });
    }
    return arr;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
    };
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.y -= p.speedY * 0.002;
        p.x += p.speedX * 0.001;
        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;

        const color = p.hue === 0
          ? `rgba(255, 107, 44, ${p.opacity})`
          : `rgba(129, 140, 248, ${p.opacity})`;

        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [particles]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export function FinalCTA() {
  return (
    <section className="relative py-36 px-6 overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 -z-10">
        {/* Large blurred orbs */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,107,44,0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,69,0,0.1) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
      </div>

      {/* Particles */}
      <FloatingParticles />

      {/* Top/bottom fade edges */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, var(--bg-primary), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}
      />

      <div className="relative z-20 max-w-3xl mx-auto text-center">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
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
          className="text-lg text-[var(--text-primary)] opacity-60 mb-12 max-w-lg mx-auto"
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
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-[var(--text-primary)] text-[var(--bg-primary)] text-lg font-semibold cursor-pointer select-none"
            style={{
              boxShadow: '0 0 40px rgba(255,107,44,0.2), 0 0 80px rgba(99,102,241,0.15), 0 20px 40px rgba(0,0,0,0.2)',
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
