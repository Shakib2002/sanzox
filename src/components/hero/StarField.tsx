import { useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  parallaxSpeed: number; // Each star has its own parallax speed for depth
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  delay: number;
  duration: number;
  angle: number;
  distance: number;
  tailLength: number;
}

interface StarFieldProps {
  count?: number;
  shootingStarCount?: number;
}

export function StarField({ count = 80, shootingStarCount = 6 }: StarFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 1.5,
      opacity: Math.random() * 0.5 + 0.3,
      parallaxSpeed: Math.random() * 0.15 + 0.05, // 0.05-0.2 speed variance for depth
    }));
  }, [count]);

  const shootingStars = useMemo<ShootingStar[]>(() => {
    return Array.from({ length: shootingStarCount }, (_, i) => {
      const angle = Math.random() * 40 + 25;
      const distance = Math.random() * 150 + 100;
      return {
        id: i,
        startX: Math.random() * 70 + 10,
        startY: Math.random() * 40,
        delay: Math.random() * 5 + i * 2,
        duration: Math.random() * 0.6 + 0.4,
        angle,
        distance,
        tailLength: Math.random() * 40 + 40,
      };
    });
  }, [shootingStarCount]);

  // Parallax scroll effect
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const starElements = containerRef.current?.querySelectorAll('[data-parallax-speed]');
          
          starElements?.forEach((el) => {
            const speed = parseFloat(el.getAttribute('data-parallax-speed') || '0');
            const yOffset = scrollY * speed;
            (el as HTMLElement).style.transform = `translateY(${yOffset}px)`;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Twinkling stars with parallax */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          data-parallax-speed={star.parallaxSpeed}
          className="absolute rounded-full bg-white will-change-transform"
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
              repeatDelay: 4 + Math.random() * 5,
              ease: 'easeOut',
            }}
          >
            <div className="relative">
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_3px_rgba(255,255,255,0.9)]" />
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
