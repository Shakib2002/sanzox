import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className = '', maxTilt = 15 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 15 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);
  
  // Glow position
  const glowX = useTransform(xSpring, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(ySpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = (e.clientX - centerX) / rect.width;
    const mouseY = (e.clientY - centerY) / rect.height;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative ${className}`}
    >
      {/* Glow effect that follows cursor */}
      <motion.div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, hsl(var(--primary) / 0.3), transparent 50%)`,
          filter: 'blur(40px)',
        }}
      />
      
      {children}
    </motion.div>
  );
}
