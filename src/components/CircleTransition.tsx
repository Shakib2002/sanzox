import { motion } from 'framer-motion';
import { ReactNode, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface CircleTransitionProps {
  children: ReactNode;
}

export function CircleTransition({ children }: CircleTransitionProps) {
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* Circle mask overlay */}
      <motion.div
        className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isAnimating ? 1 : 0 }}
        transition={{ duration: 0.3, delay: isAnimating ? 0 : 0.5 }}
      >
        {/* Expanding circle that reveals content */}
        <motion.div
          className="absolute rounded-full"
          style={{
            background: 'hsl(var(--primary))',
            willChange: 'transform',
          }}
          initial={{
            width: 0,
            height: 0,
          }}
          animate={{
            width: '300vmax',
            height: '300vmax',
          }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
        />
        
        {/* Inner circle that shrinks to reveal content */}
        <motion.div
          className="absolute rounded-full"
          style={{
            background: 'hsl(var(--background))',
            willChange: 'transform',
          }}
          initial={{
            width: 0,
            height: 0,
          }}
          animate={{
            width: '300vmax',
            height: '300vmax',
          }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.2,
          }}
        />
      </motion.div>

      {/* Page content with fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  );
}

// Simpler variant using clip-path for better performance
export function CircleRevealTransition({ children }: CircleTransitionProps) {
  return (
    <>
      {/* Circular reveal mask */}
      <motion.div
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{
          background: 'hsl(var(--primary))',
        }}
        initial={{
          clipPath: 'circle(0% at 50% 50%)',
        }}
        animate={{
          clipPath: [
            'circle(0% at 50% 50%)',
            'circle(150% at 50% 50%)',
          ],
        }}
        exit={{
          clipPath: 'circle(0% at 50% 50%)',
        }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
        }}
      />

      {/* Background circle that follows */}
      <motion.div
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{
          background: 'hsl(var(--background))',
        }}
        initial={{
          clipPath: 'circle(0% at 50% 50%)',
        }}
        animate={{
          clipPath: [
            'circle(0% at 50% 50%)',
            'circle(150% at 50% 50%)',
          ],
        }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.15,
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          duration: 0.5,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
