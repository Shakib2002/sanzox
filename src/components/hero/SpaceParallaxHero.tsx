import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function SpaceParallaxHero() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const handleScroll = () => {
      // FIX: cancel any pending frame before scheduling a new one
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafRef.current = null;
      });
    };

    // passive: true tells browser this listener won't call preventDefault
    // so it can scroll without waiting for JS — major smoothness win
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [prefersReduced]);

  // Reduced motion — show static background, no parallax
  if (prefersReduced) {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'transparent' }}
      />
    );
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* Stars layer — slowest parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          // FIX: translateY only (no X, no scale) → single-axis GPU transform, cheapest
          transform: `translateY(${scrollY * 0.1}px) translateZ(0)`,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {/* Replace the content below with your actual star/particle elements */}
        <div className="absolute inset-0 opacity-60">
          {/* Your star dots / canvas / SVG here */}
        </div>
      </motion.div>

      {/* Mid layer — medium parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.2}px) translateZ(0)`,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <div className="absolute inset-0 opacity-40">
          {/* Mid-distance parallax elements here */}
        </div>
      </motion.div>

      {/* Foreground layer — fastest parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.35}px) translateZ(0)`,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <div className="absolute inset-0 opacity-30">
          {/* Closest parallax elements here */}
        </div>
      </motion.div>
    </div>
  );
}