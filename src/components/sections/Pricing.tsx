'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/animation-config';
import { Button } from '@/components/ui/Button';

interface Plan {
  name: string;
  monthly: number;
  annual: number;
  description: string;
  features: { text: string; included: boolean }[];
  cta: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    monthly: 0,
    annual: 0,
    description: 'Try Rivly with one competitor',
    features: [
      { text: '1 job, 2 competitors', included: true },
      { text: '1 one-time run', included: true },
      { text: '3 analysis areas', included: true },
      { text: 'Desktop only', included: true },
      { text: 'Email notifications', included: true },
      { text: '7-day report storage', included: true },
      { text: '1 user', included: true },
      { text: 'Scheduled runs', included: false },
      { text: 'Mobile analysis', included: false },
    ],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    monthly: 99,
    annual: 79,
    description: 'For product teams tracking competition',
    features: [
      { text: '3 jobs, 5 competitors each', included: true },
      { text: 'Weekly or monthly runs', included: true },
      { text: '8 analysis areas', included: true },
      { text: 'Desktop + Mobile', included: true },
      { text: 'Email + Telegram', included: true },
      { text: 'AI competitor discovery', included: true },
      { text: 'Diff-view', included: true },
      { text: '6-month storage', included: true },
      { text: 'Up to 3 users, PDF export', included: true },
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Business',
    monthly: 249,
    annual: 199,
    description: 'For teams that need everything',
    features: [
      { text: '10 jobs, 10 competitors each', included: true },
      { text: 'All frequencies', included: true },
      { text: 'Unlimited analysis areas', included: true },
      { text: 'Custom analysis areas', included: true },
      { text: 'Credential vault', included: true },
      { text: 'Webhook / API access', included: true },
      { text: '12-month storage', included: true },
      { text: 'Up to 10 users', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Start Free Trial',
  },
];

/* ── Dust Particles for Pro Card ── */
function DustParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  interface Particle {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    drift: number;
  }

  const particles = useMemo(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      arr.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.6 + 0.2,
        drift: (Math.random() - 0.5) * 0.3,
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
        p.y -= p.speed * 0.003;
        p.x += p.drift * 0.001;
        if (p.y < -0.05) {
          p.y = 1.05;
          p.x = Math.random();
        }
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;

        ctx.beginPath();
        ctx.arc(
          p.x * canvas.width,
          p.y * canvas.height,
          p.size,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(165, 180, 252, ${p.opacity * 0.5})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [particles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}

function BlinkingZeroPrice() {
  return (
    <span className="inline-flex items-baseline">
      $
      <span className="relative inline-block">
        0
        {/* Eye inside the zero */}
        <motion.span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] block rounded-full bg-current"
          animate={{
            scaleY: [1, 1, 0.1, 1, 1],
            opacity: [1, 1, 0.6, 1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            times: [0, 0.42, 0.46, 0.5, 1],
            ease: 'easeInOut',
          }}
          style={{ width: '6px', height: '6px' }}
        />
      </span>
    </span>
  );
}

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Simple pricing for every{' '}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }} className="text-[var(--accent-secondary)]">
              team
            </span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto mb-8">
            Start free, upgrade when you need more power.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)]">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                !annual ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]' : 'text-[var(--text-muted)]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                annual ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]' : 'text-[var(--text-muted)]'
              }`}
            >
              Annual
              <span className="ml-1 text-xs opacity-80">Save 20%</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={staggerItem}
              whileHover={{ scale: 1.01 }}
              className={`relative overflow-hidden rounded-2xl p-8 border transition-shadow ${
                plan.popular
                  ? 'bg-gradient-to-b from-[#4338CA] via-[#4F46E5] to-[#3730A3] border-[var(--accent-secondary-soft)] text-white md:scale-[1.02]'
                  : 'bg-[var(--bg-secondary)] border-[var(--border)] hover:shadow-[var(--shadow-glow)]'
              }`}
              style={plan.popular ? {
                boxShadow: '0 0 80px rgba(99,102,241,0.3), 0 0 160px rgba(99,102,241,0.1), 0 25px 50px rgba(0,0,0,0.3)',
              } : undefined}
            >
              {plan.popular && <DustParticles />}

              {plan.popular && (
                <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold mb-6 border border-white/20">
                  <Sparkles size={12} />
                  Most Popular
                </div>
              )}

              <div className="relative z-10">
                <h3 className={`text-xl font-bold mb-1 ${plan.popular ? 'text-white' : ''}`}>{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.popular ? 'text-indigo-200' : 'text-[var(--text-muted)]'}`}>{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${plan.name}-${annual}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-baseline gap-1"
                    >
                      <span className={`text-4xl font-bold font-mono ${plan.popular ? 'text-white' : ''}`}>
                        {plan.monthly === 0 ? <BlinkingZeroPrice /> : `$${annual ? plan.annual : plan.monthly}`}
                      </span>
                      {plan.monthly > 0 && (
                        <span className={`text-sm ${plan.popular ? 'text-indigo-200' : 'text-[var(--text-muted)]'}`}>/mo</span>
                      )}
                      {plan.monthly === 0 && (
                        <span className="text-[var(--text-muted)] text-sm">forever</span>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2">
                      {f.included ? (
                        <Check size={16} className={`mt-0.5 shrink-0 ${plan.popular ? 'text-indigo-200' : 'text-[var(--accent-primary)]'}`} />
                      ) : (
                        <X size={16} className={`mt-0.5 shrink-0 ${plan.popular ? 'text-indigo-400' : 'text-[var(--text-muted)]'}`} />
                      )}
                      <span className={`text-sm ${
                        plan.popular
                          ? (f.included ? 'text-indigo-100' : 'text-indigo-400')
                          : (f.included ? 'text-[var(--text-secondary)]' : 'text-[var(--text-muted)]')
                      }`}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.popular ? (
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold text-base cursor-pointer select-none"
                    style={{ boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}
                  >
                    {plan.cta}
                  </motion.button>
                ) : (
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enterprise */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 text-center"
        >
          <p className="text-[var(--text-secondary)]">
            Need more?{' '}
            <button className="text-[var(--accent-secondary)] hover:underline font-medium cursor-pointer inline-flex items-center gap-1">
              Contact us for Enterprise
              <ArrowRight size={14} />
            </button>
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-2">
            Unlimited jobs, white-label reports, SSO/SAML, dedicated CSM, SLA 99.9%
          </p>
        </motion.div>
      </div>
    </section>
  );
}
