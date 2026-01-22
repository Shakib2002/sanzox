import { useRef, useEffect, useState } from 'react';
import nebulaImage from '@/assets/parallax-nebula.jpg';
import purplePlanet from '@/assets/parallax-purple-planet.png';
import foregroundPlanet from '@/assets/parallax-foreground-planet.png';
import { StarField } from './StarField';

interface ParallaxLayer {
  ref: React.RefObject<HTMLDivElement>;
  speed: number;
  baseOffset: number;
  mobileBaseOffset: number;
}

export function SpaceParallaxHero() {
  const [isMobile, setIsMobile] = useState(false);
  
  const backgroundRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax scroll handler
  useEffect(() => {
    const layers: ParallaxLayer[] = [
      { ref: backgroundRef, speed: 0.3, baseOffset: 0, mobileBaseOffset: 0 },
      { ref: middleRef, speed: 0.4, baseOffset: -50, mobileBaseOffset: -30 },
      { ref: foregroundRef, speed: 0.5, baseOffset: 200, mobileBaseOffset: 150 },
    ];

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          layers.forEach(({ ref, speed, baseOffset, mobileBaseOffset }) => {
            if (ref.current) {
              const offset = isMobile ? mobileBaseOffset : baseOffset;
              const translateY = offset + scrollY * speed;
              ref.current.style.transform = `translateY(${translateY}px)`;
            }
          });

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Twinkling Stars Layer */}
      <div className="fixed inset-0 -z-25">
        <StarField count={100} />
      </div>

      {/* Background Layer - Nebula (0.3x speed) */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 -z-30"
        style={{ willChange: 'transform' }}
      >
        <img
          src={nebulaImage}
          alt=""
          className="w-full h-[130vh] object-cover"
          loading="eager"
        />
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Middle Layer - Purple Planet (0.4x speed) */}
      <div
        ref={middleRef}
        className="fixed -z-20 pointer-events-none"
        style={{
          willChange: 'transform',
          right: isMobile ? '-20%' : '5%',
          top: isMobile ? '10%' : '5%',
          width: isMobile ? '60%' : '35%',
          maxWidth: '500px',
        }}
      >
        <img
          src={purplePlanet}
          alt=""
          className="w-full h-auto opacity-80"
          loading="eager"
        />
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.6) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Foreground Layer - Cresting Planet (0.5x speed) */}
      <div
        ref={foregroundRef}
        className="fixed -z-10 left-0 right-0 pointer-events-none"
        style={{
          willChange: 'transform',
          bottom: isMobile ? '-30%' : '-20%',
          height: isMobile ? '60%' : '50%',
        }}
      >
        <img
          src={foregroundPlanet}
          alt=""
          className="w-full h-full object-cover object-top opacity-90"
          loading="eager"
        />
        {/* Atmospheric glow */}
        <div 
          className="absolute inset-x-0 top-0 h-32"
          style={{
            background: 'linear-gradient(to bottom, hsl(var(--primary) / 0.2), transparent)',
          }}
        />
      </div>

      {/* Additional depth overlay */}
      <div className="fixed inset-0 -z-5 bg-gradient-to-b from-transparent via-background/20 to-background/60 pointer-events-none" />
    </div>
  );
}
