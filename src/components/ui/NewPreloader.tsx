import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PreloaderProps {
  onLoadComplete?: () => void;
}

const BRAND = 'SANZOX';

export function NewPreloader({ onLoadComplete }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadComplete?.();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-[#080808]"
        >
          {/* Fine grain / noise texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Subtle grid lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              maskImage:
                'radial-gradient(circle at center, black 0%, transparent 70%)',
              WebkitMaskImage:
                'radial-gradient(circle at center, black 0%, transparent 70%)',
            }}
          />

          {/* Primary ambient glow */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, hsl(0 0% 100% / 0.09) 0%, hsl(0 0% 100% / 0.03) 40%, transparent 70%)',
              top: '50%',
              left: '50%',
              translateX: '-50%',
              translateY: '-50%',
              filter: 'blur(20px)',
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Secondary offset glow */}
          <motion.div
            className="absolute w-[340px] h-[340px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, hsl(0 0% 100% / 0.05) 0%, transparent 65%)',
              top: '42%',
              left: '56%',
              filter: 'blur(30px)',
            }}
            animate={{ scale: [1.1, 1, 1.1], x: [0, 12, 0], y: [0, -8, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.4,
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
            }}
          />

          {/* Main content */}
          <div className="relative flex flex-col items-center gap-5">
            {/* Animated logo letters with shine sweep */}
            <div className="relative flex items-end gap-[2px]">
              {/* Shine sweep overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    'linear-gradient(105deg, transparent 40%, hsl(0 0% 100% / 0.55) 50%, transparent 60%)',
                  backgroundSize: '250% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mixBlendMode: 'overlay',
                }}
                initial={{ backgroundPosition: '200% 0' }}
                animate={{ backgroundPosition: '-100% 0' }}
                transition={{
                  duration: 1.4,
                  delay: 1.0,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />

              {BRAND.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-6xl md:text-7xl font-bold tracking-tight leading-none select-none"
                  style={{
                    background:
                      'linear-gradient(160deg, hsl(0 0% 100%) 0%, hsl(0 0% 72%) 55%, hsl(0 0% 42%) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                    filter: 'drop-shadow(0 2px 12px hsl(0 0% 100% / 0.12))',
                  }}
                  initial={{ opacity: 0, y: 44, filter: 'blur(12px)', scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.15 + i * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Divider line that expands */}
            <motion.div
              className="h-px w-16"
              style={{
                background:
                  'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.35), transparent)',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Tagline with letter-spacing reveal */}
            <motion.p
              className="text-[10px] tracking-[0.42em] uppercase text-neutral-500 font-medium pl-[0.42em]"
              initial={{ opacity: 0, y: 6, letterSpacing: '0.15em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.42em' }}
              transition={{ delay: 1.05, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Digital Solutions
            </motion.p>

            {/* Progress bar with fill + shimmer */}
            <motion.div
              className="relative w-32 h-[2px] rounded-full overflow-hidden mt-3"
              style={{ background: 'hsl(0 0% 100% / 0.08)' }}
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.15, duration: 0.5, ease: 'easeOut' }}
            >
              {/* Fill */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, hsl(0 0% 60%), hsl(0 0% 100%))',
                  boxShadow: '0 0 12px hsl(0 0% 100% / 0.4)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: 1.8,
                  delay: 1.2,
                  ease: [0.65, 0, 0.35, 1],
                }}
              />
              {/* Shimmer sweep on top */}
              <motion.div
                className="absolute inset-y-0 w-1/3 rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.9), transparent)',
                }}
                animate={{ x: ['-100%', '400%'] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.3,
                  repeatDelay: 0.15,
                }}
              />
            </motion.div>

            {/* Loading percentage */}
            <LoadingPercent />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LoadingPercent() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 2000;
    let raf: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.span
      className="text-[9px] tracking-[0.25em] text-neutral-600 tabular-nums font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.25, duration: 0.5 }}
    >
      {String(pct).padStart(3, '0')}%
    </motion.span>
  );
}