import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  delay: number;
  duration: number;
}

interface StarFieldProps {
  count?: number;
  shootingStarCount?: number;
}

export function StarField({ count = 80, shootingStarCount = 3 }: StarFieldProps) {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 1.5,
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, [count]);

  const shootingStars = useMemo<ShootingStar[]>(() => {
    return Array.from({ length: shootingStarCount }, (_, i) => ({
      id: i,
      startX: Math.random() * 60 + 20, // Start between 20-80% of screen width
      startY: Math.random() * 30, // Start in top 30%
      delay: Math.random() * 8 + i * 4, // Staggered delays
      duration: Math.random() * 0.8 + 0.6, // 0.6-1.4s duration
    }));
  }, [shootingStarCount]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Static twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((shootingStar) => (
        <motion.div
          key={`shooting-${shootingStar.id}`}
          className="absolute"
          style={{
            left: `${shootingStar.startX}%`,
            top: `${shootingStar.startY}%`,
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, 150, 200],
            y: [0, 100, 140],
          }}
          transition={{
            duration: shootingStar.duration,
            delay: shootingStar.delay,
            repeat: Infinity,
            repeatDelay: 6 + Math.random() * 6, // Wait 6-12s between appearances
            ease: 'easeOut',
          }}
        >
          {/* Shooting star head */}
          <div className="relative">
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.8)]" />
            {/* Tail */}
            <div 
              className="absolute top-1/2 right-full -translate-y-1/2 h-px origin-right"
              style={{
                width: '60px',
                background: 'linear-gradient(to left, rgba(255,255,255,0.8), transparent)',
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
