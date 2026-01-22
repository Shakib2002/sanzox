import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

// Circle clip-path transition - expands from center
const circleVariants = {
  initial: {
    clipPath: 'circle(0% at 50% 50%)',
  },
  enter: {
    clipPath: 'circle(150% at 50% 50%)',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    clipPath: 'circle(0% at 50% 50%)',
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const contentVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const childVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <div className="relative">
      {/* Circle mask overlay - primary color */}
      <motion.div
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{
          background: 'hsl(var(--primary))',
          willChange: 'clip-path',
        }}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={circleVariants}
      />

      {/* Second circle - background color, slightly delayed */}
      <motion.div
        className="fixed inset-0 z-[99] pointer-events-none"
        style={{
          background: 'hsl(var(--background))',
          willChange: 'clip-path',
        }}
        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
        animate={{
          clipPath: 'circle(150% at 50% 50%)',
          transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.1,
          },
        }}
        exit={{
          clipPath: 'circle(0% at 50% 50%)',
          transition: {
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.05,
          },
        }}
      />

      {/* Page content */}
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={contentVariants}
      >
        {children}
      </motion.div>
    </div>
  );
}

export { childVariants };
