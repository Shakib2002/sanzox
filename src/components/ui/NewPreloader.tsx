import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface PreloaderProps {
  onLoadComplete?: () => void;
}

const BRAND = 'SANZOX';
const DURATION = 2200; // total time before exit
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export function NewPreloader({ onLoadComplete }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const reduce = useReducedMotion();

  // Keep latest callback without restarting the timer on parent re-renders
  const callbackRef = useRef(onLoadComplete);
  useEffect(() => {
    callbackRef.current = onLoadComplete;
  }, [onLoadComplete]);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setIsLoading(false);
        callbackRef.current?.();
      },
      reduce ? 600 : DURATION
    );
    return () => clearTimeout(timer);
  }, [reduce]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_IN_OUT }}
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-[#080808]"
          role="status"
          aria-label="Loading"
        >
          {/* Single soft ambient glow (radial gradient is already soft, no blur filter needed) */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, hsl(0 0% 100% / 0.06) 0%, hsl(0 0% 100% / 0.02) 40%, transparent 70%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)',
            }}
          />

          {/* Content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Wordmark: masked slide-up reveal */}
            <div className="flex" aria-label={BRAND}>
              {BRAND.split('').map((letter, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="overflow-hidden pb-[0.08em]"
                >
                  <motion.span
                    className="block select-none text-6xl font-semibold leading-none tracking-[-0.03em] text-white md:text-7xl"
                    initial={reduce ? false : { y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.1 + i * 0.07,
                      ease: EASE_OUT,
                    }}
                  >
                    {letter}
                  </motion.span>
                </span>
              ))}
            </div>

            {/* Tagline: fade + slight rise only (no letter-spacing animation) */}
            <motion.p
              className="pl-[0.4em] text-[11px] font-medium uppercase tracking-[0.4em] text-neutral-400"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease: EASE_OUT }}
            >
              Digital Solutions
            </motion.p>

            {/* Hairline progress: transform-based, finishes right before exit */}
            <div className="relative mt-2 h-px w-24 overflow-hidden bg-white/10">
              <motion.div
                className="absolute inset-0 origin-left bg-white/70"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.55, duration: 1.5, ease: EASE_IN_OUT }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}