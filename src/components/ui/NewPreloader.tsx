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
    }, 2600);
    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background overflow-hidden"
        >
          {/* Ambient glow blobs */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, hsl(217 91% 60% / 0.12) 0%, transparent 65%)',
              top: '50%',
              left: '50%',
              translateX: '-50%',
              translateY: '-50%',
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, hsl(280 70% 55% / 0.08) 0%, transparent 65%)',
              top: '40%',
              left: '55%',
            }}
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />

          {/* Main content */}
          <div className="relative flex flex-col items-center gap-4">

            {/* Animated logo letters */}
            <div className="flex items-end gap-[2px]">
              {BRAND.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-5xl md:text-6xl font-bold tracking-tight leading-none"
                  style={{
                    background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 55%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }}
                  initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.55,
                    delay: 0.1 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.45, ease: 'easeOut' }}
            >
              Digital Solutions
            </motion.p>

            {/* Shimmer line loader */}
            <motion.div
              className="relative w-24 h-[1.5px] rounded-full overflow-hidden mt-2"
              style={{ background: 'hsl(var(--border) / 0.25)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 w-1/2 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, hsl(217 91% 60%), hsl(280 70% 55%), transparent)',
                }}
                animate={{ x: ['-100%', '220%'] }}
                transition={{
                  duration: 1.0,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.0,
                  repeatDelay: 0.2,
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}