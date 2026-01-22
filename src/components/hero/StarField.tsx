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
  angle: number; // degrees
  distance: number;
  tailLength: number;
}

interface StarFieldProps {
  count?: number;
  shootingStarCount?: number;
}

export function StarField({ count = 80, shootingStarCount = 6 }: StarFieldProps) {
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
    return Array.from({ length: shootingStarCount }, (_, i) => {
      const angle = Math.random() * 40 + 25; // 25-65 degrees
      const distance = Math.random() * 150 + 100; // 100-250px travel
      return {
        id: i,
        startX: Math.random() * 70 + 10, // Start between 10-80%
        startY: Math.random() * 40, // Start in top 40%
        delay: Math.random() * 5 + i * 2, // Staggered delays
        duration: Math.random() * 0.6 + 0.4, // 0.4-1s duration (faster)
        angle,
        distance,
        tailLength: Math.random() * 40 + 40, // 40-80px tail
      };
    });
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

      {/* Shooting stars with varied angles */}
      {shootingStars.map((shootingStar) => {
        const angleRad = (shootingStar.angle * Math.PI) / 180;
        const endX = Math.cos(angleRad) * shootingStar.distance;
        const endY = Math.sin(angleRad) * shootingStar.distance;

        return (
          <motion.div
            key={`shooting-${shootingStar.id}`}
            className="absolute"
            style={{
              left: `${shootingStar.startX}%`,
              top: `${shootingStar.startY}%`,
              rotate: `${shootingStar.angle}deg`,
            }}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [0, endX * 0.7, endX],
              y: [0, endY * 0.7, endY],
            }}
            transition={{
              duration: shootingStar.duration,
              delay: shootingStar.delay,
              repeat: Infinity,
              repeatDelay: 4 + Math.random() * 5, // Wait 4-9s between appearances
              ease: 'easeOut',
            }}
          >
            {/* Shooting star head with glow */}
            <div className="relative">
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_3px_rgba(255,255,255,0.9)]" />
              {/* Gradient tail */}
              <div 
                className="absolute top-1/2 right-full -translate-y-1/2 h-0.5 origin-right"
                style={{
                  width: `${shootingStar.tailLength}px`,
                  background: 'linear-gradient(to left, rgba(255,255,255,0.9), rgba(255,255,255,0.3), transparent)',
                }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
