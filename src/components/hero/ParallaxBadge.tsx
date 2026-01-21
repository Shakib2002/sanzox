import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface ParallaxBadgeProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  floatDelay?: number;
}

export function ParallaxBadge({
  children,
  className = '',
  intensity = 20,
  floatDelay = 0,
}: ParallaxBadgeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check for touch device
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate offset from center of the badge
      const offsetX = (e.clientX - centerX) / window.innerWidth;
      const offsetY = (e.clientY - centerY) / window.innerHeight;
      
      mouseX.set(offsetX * intensity);
      mouseY.set(offsetY * intensity);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, intensity, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      animate={{ 
        y: isMobile ? [-5, 5, -5] : undefined,
      }}
      transition={{
        y: {
          duration: 4 + floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
