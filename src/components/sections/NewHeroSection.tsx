import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { WordReveal } from '@/components/ui/WordReveal';
import { HeroVideoBackground } from '@/components/hero/HeroVideoBackground';
import { staggerContainerVariants } from '@/hooks/useScrollAnimation';
import defaultHeroImage from '@/assets/hero-main.jpg';

/* ============================================================
   ✏️  EDIT HERE — সব text/button/link এই object-এ
   ============================================================ */

const heroContent = {
  tagline: 'Think. Build. Evolve.',
  headline: 'A Better Way to',
  headlineMute: 'Build Digital.',
  description:
    'We build purposeful digital products powered by thoughtful design, intelligent technology, and practical innovation.',
  serviceWords: [
    'Flutter Apps',
    'iOS & Android',
    'Cross-Platform',
    'Native Performance',
  ],
  buttons: {
    primary: 'Get Started',
    secondary: 'See Our Work',
  },
  primaryHref: '/contact',
  secondaryHref: '/products',
  scrollLabel: 'Explore',
};

/* ============================================================
   Variants
   ============================================================ */

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 15 },
  },
};

/* ============================================================
   SVG Icon Set (inline)
   ============================================================ */

const DevToolsIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
    <path d="M2.5 8.5h19" />
    <path d="m7 12 2.5 2.5L7 17" />
    <path d="M12.5 17H17" />
  </svg>
);

const SaaSIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M6.5 18a4.5 4.5 0 0 1-.5-8.97A6 6 0 0 1 17.7 9.2 4 4 0 0 1 17.5 18" />
    <path d="M12 12v6" />
    <path d="m9.5 14.5 2.5-2.5 2.5 2.5" />
  </svg>
);

const AppsIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
    <path d="M10.5 5.5h3" />
    <circle cx="10" cy="10" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="14" cy="10" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="10" cy="13.5" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="14" cy="13.5" r="0.9" fill="currentColor" stroke="none" />
    <path d="M10.5 18.5h3" />
  </svg>
);

const CodeIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="m8 7-5 5 5 5" />
    <path d="m16 7 5 5-5 5" />
    <path d="M14 4 10 20" />
  </svg>
);

const AIIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 4.5a3 3 0 0 0-3 3v.5a3 3 0 0 0-2 5.3 3 3 0 0 0 2 5.2 3 3 0 0 0 6 0 3 3 0 0 0 2-5.2 3 3 0 0 0-2-5.3V7.5a3 3 0 0 0-3-3Z" />
    <path d="M9 9.5h6" />
    <path d="M9 14.5h6" />
    <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

const FlutterIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M37.9 8 8 37.9l9.5 9.5L56.9 8z" />
    <path d="M37.4 33.6 21.5 49.5 31 59l11.7-11.7 14.2-13.7z" />
    <path d="m37.4 33.6 9.5 9.5L61.1 29l-9.5-9.5z" />
  </svg>
);

/* ============================================================
   Floating Tech Icons
   ============================================================ */

function FloatingTechIcons() {
  return (
    <>
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-6 -top-4 z-0 hidden text-white opacity-[0.16] drop-shadow-[0_0_20px_rgba(255,255,255,0.18)] sm:block"
      >
        <DevToolsIcon className="h-11 w-11" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 7, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="pointer-events-none absolute -right-5 top-6 z-0 hidden text-white opacity-[0.14] drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] sm:block"
      >
        <SaaSIcon className="h-10 w-10" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 9, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="pointer-events-none absolute -bottom-6 -right-5 z-0 hidden text-white opacity-[0.15] drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] sm:block"
      >
        <AppsIcon className="h-11 w-11" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 6, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -bottom-10 left-[20%] z-0 hidden text-white opacity-[0.13] drop-shadow-[0_0_20px_rgba(255,255,255,0.14)] sm:block"
      >
        <CodeIcon className="h-12 w-12" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -7, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="pointer-events-none absolute -left-8 top-[42%] z-0 hidden -translate-y-1/2 text-white opacity-[0.16] drop-shadow-[0_0_20px_rgba(255,255,255,0.18)] sm:block"
      >
        <AIIcon className="h-10 w-10" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -9, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="pointer-events-none absolute -top-8 right-[28%] z-0 hidden text-white opacity-[0.18] drop-shadow-[0_0_22px_rgba(255,255,255,0.22)] sm:block"
      >
        <FlutterIcon className="h-[46px] w-[46px]" />
      </motion.div>
    </>
  );
}

/* ============================================================
   Animated Starfield (canvas)
   ============================================================ */

interface Star {
  x: number;
  y: number;
  z: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

function AnimatedStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mq.matches;
    const onMqChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mq.addEventListener('change', onMqChange);

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const buildStars = () => {
      const count = Math.floor((width * height) / 9000);
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        const z = Math.random();
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          radius: 0.4 + z * 1.2,
          baseOpacity: 0.15 + z * 0.55,
          twinkleSpeed: 0.3 + Math.random() * 0.9,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
      starsRef.current = stars;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let last = performance.now();
    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);

      const t = now / 1000;
      const stars = starsRef.current;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        if (!reducedMotionRef.current) {
          const speed = 2 + s.z * 10;
          s.y += speed * dt;
          s.x += Math.sin((t + s.twinklePhase) * 0.15) * 0.05 * s.z;

          if (s.y > height + 2) {
            s.y = -2;
            s.x = Math.random() * width;
          }
          if (s.x > width + 2) s.x = -2;
          if (s.x < -2) s.x = width + 2;
        }

        const twinkle = 0.65 + 0.35 * Math.sin(t * s.twinkleSpeed + s.twinklePhase);
        const alpha = s.baseOpacity * twinkle;

        if (s.z > 0.7) {
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 4);
          grad.addColorStop(0, `rgba(255,255,255,${alpha * 0.5})`);
          grad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      mq.removeEventListener('change', onMqChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
    />
  );
}

/* ============================================================
   Flutter Code Card
   ============================================================ */

function FlutterCodeCard() {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      className="relative z-10 ml-auto w-[88%] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d0d0d]/90 shadow-[0_25px_90px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl sm:w-[86%]"
    >
      <div className="flex h-9 items-center justify-between border-b border-white/[0.05] px-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/50">
          <span className="text-white/80">main.dart</span>
          <span className="text-white/20">•</span>
          <span className="text-white/40">app/</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
            hot reload
          </span>
        </div>
      </div>

      <div className="min-h-[240px] bg-[#080808]/95 p-4 font-mono text-[10.5px] leading-[1.7] sm:min-h-[280px] sm:p-5 sm:text-[11.5px]">
        <div className="space-y-0.5">
          <p>
            <span className="text-white/35">import</span>{' '}
            <span className="text-[#A3A3A3]">'package:flutter/material.dart'</span>;
          </p>
          <p className="pt-2">
            <span className="text-white/35">void</span>{' '}
            <span className="text-white">main</span>() =&gt;{' '}
            <span className="text-white">runApp</span>(
            <span className="text-white/70">const</span>{' '}
            <span className="text-[#A3A3A3]">MyApp</span>());
          </p>
          <p className="pt-2">
            <span className="text-white/35">class</span>{' '}
            <span className="text-white">MyApp</span>{' '}
            <span className="text-white/35">extends</span>{' '}
            <span className="text-[#A3A3A3]">StatelessWidget</span> {'{'}
          </p>
          <p className="pl-4">
            <span className="text-white/70">const</span>{' '}
            <span className="text-white">MyApp</span>({'{'}
            <span className="text-white/70">super</span>.key{'}'});
          </p>
          <p className="pt-2 pl-4">
            <span className="text-white/35">@override</span>
          </p>
          <p className="pl-4">
            <span className="text-[#A3A3A3]">Widget</span>{' '}
            <span className="text-white">build</span>(
            <span className="text-[#A3A3A3]">BuildContext</span>{' '}
            <span className="text-white/70">context</span>) {'{'}
          </p>
          <p className="pl-8">
            <span className="text-white/35">return</span>{' '}
            <span className="text-[#A3A3A3]">MaterialApp</span>(
          </p>
          <p className="pl-12">
            <span className="text-white/70">title</span>:{' '}
            <span className="text-[#A3A3A3]">'Premium App'</span>,
          </p>
          <p className="pl-12">
            <span className="text-white/70">theme</span>:{' '}
            <span className="text-[#A3A3A3]">ThemeData</span>.dark(),
          </p>
          <p className="pl-12">
            <span className="text-white/70">home</span>:{' '}
            <span className="text-white/70">const</span>{' '}
            <span className="text-[#A3A3A3]">HomePage</span>(),
          </p>
          <p className="pl-8">);</p>
          <p className="pl-4">{'}'}</p>
          <p>{'}'}</p>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-white/[0.05] pt-3">
          <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/60">
            Dart
          </span>
          <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/35">
            Flutter 3.x
          </span>
          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
          <span className="text-[10px] text-white/45">No issues</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   Floating Widget Tree Card
   ============================================================ */

function WidgetTreeCard() {
  return (
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      className="absolute -bottom-20 left-[6%] z-20 w-[64%] rounded-2xl border border-white/[0.06] bg-[#0d0d0d]/95 p-4 shadow-[0_20px_55px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl sm:left-[2%] sm:w-[60%]"
    >
      <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/40">
        <span className="h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
        widget tree
      </div>
      <div className="space-y-0.5 font-mono text-[10px] leading-relaxed sm:text-[11px]">
        <p className="text-white/70">
          <span className="text-white">Scaffold</span> {'{'}
        </p>
        <p className="pl-3 text-white/50">
          <span className="text-[#A3A3A3]">body</span>:{' '}
          <span className="text-white">Container</span>({'{'}
        </p>
        <p className="pl-6">
          <span className="text-white/70">padding</span>:{' '}
          <span className="text-[#A3A3A3]">EdgeInsets.all(24)</span>,
        </p>
        <p className="pl-6">
          <span className="text-white/70">decoration</span>:{' '}
          <span className="text-[#A3A3A3]">BoxDecoration</span>(
        </p>
        <p className="pl-9 text-white/50">
          <span className="text-white/70">color</span>:{' '}
          <span className="text-[#A3A3A3]">Colors.black</span>,
        </p>
        <p className="pl-9 text-white/50">
          <span className="text-white/70">radius</span>:{' '}
          <span className="text-[#A3A3A3]">BorderRadius.circular(16)</span>,
        </p>
        <p className="pl-6 text-white/50">),</p>
        <p className="pl-3 text-white/50">{'}'}),</p>
        <p className="text-white/70">{'}'}</p>
      </div>
    </motion.div>
  );
}

/* ============================================================
   Main Hero Section
   ============================================================ */

export default function NewHeroSection() {
  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#080808] py-32 md:py-40"
      style={{ isolation: 'isolate' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#080808]" />

        <motion.div
          className="absolute -top-[42%] right-[8%] h-[110%] w-[28%] rotate-[10deg]"
          animate={{ opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.22) 18%, rgba(255,255,255,0.06) 50%, transparent 100%)',
            filter: 'blur(70px)',
            transformOrigin: 'top center',
            willChange: 'opacity',
          }}
        />

        <AnimatedStarfield />

        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(8,8,8,0.55) 75%, #080808 100%)',
          }}
        />
        <div className="absolute inset-0 bg-black/[0.08]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* ===== Left content ===== */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
            className="text-center lg:text-left"
          >
            {/* Tagline */}
            <motion.div variants={fadeUpVariants}>
              <span className="mb-6 mt-2 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[#A3A3A3] backdrop-blur-sm md:mt-0 md:text-sm">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white/20 text-[9px] text-white">
                  ✳
                </span>
                {heroContent.tagline}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeUpVariants}>
              <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-medium leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:mx-0 lg:text-[clamp(3.2rem,5vw,4.7rem)]">
                <WordReveal text={heroContent.headline} className="block" />
                <span className="text-neutral-400">
                  {heroContent.headlineMute}
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUpVariants}
              className="mx-auto mb-10 max-w-xl text-base leading-[1.7] text-[#A3A3A3] md:text-lg lg:mx-0"
            >
              {heroContent.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUpVariants}
              className="flex items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <Button
                size="lg"
                asChild
                className={cn(
                  'group h-[54px] rounded-xl border border-white',
                  'bg-white px-7 text-base font-semibold text-[#080808]',
                  'shadow-[0_4px_28px_rgba(255,255,255,0.1)]',
                  'transition-all duration-300',
                  'hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_8px_34px_rgba(255,255,255,0.18)]'
                )}
              >
                <Link to={heroContent.primaryHref}>
                  <span className="flex items-center">
                    {heroContent.buttons.primary}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className={cn(
                  'h-[54px] rounded-xl border border-white/[0.12]',
                  'bg-white/[0.02] px-7 text-base font-medium text-white',
                  'backdrop-blur-sm transition-all duration-300',
                  'hover:-translate-y-0.5 hover:border-white/30',
                  'hover:bg-white/[0.05]'
                )}
              >
                <Link to={heroContent.secondaryHref}>
                  {heroContent.buttons.secondary}
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* ===== Right: Flutter code + floating icons ===== */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.25, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:ml-auto"
          >
            <div
              className="absolute left-[10%] top-[10%] h-[75%] w-[80%] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)',
                filter: 'blur(60px)',
              }}
            />

            <FloatingTechIcons />

            <FlutterCodeCard />
            <WidgetTreeCard />

            <div className="absolute -bottom-2 right-[18%] z-0 hidden h-10 w-16 -skew-y-[32deg] border-l border-t border-white/20 sm:block" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/25">
          {heroContent.scrollLabel}
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="rounded-full border border-white/10 p-2"
        >
          <ChevronDown className="h-4 w-4 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}