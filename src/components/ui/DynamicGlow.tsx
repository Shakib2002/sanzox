import { motion } from 'framer-motion';

interface DynamicGlowProps {
  className?: string;
  color?: 'primary' | 'accent' | 'purple';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  intensity?: 'low' | 'medium' | 'high';
  animate?: boolean;
}

const sizeMap = {
  sm: 'w-32 h-32',
  md: 'w-64 h-64',
  lg: 'w-96 h-96',
  xl: 'w-[600px] h-[600px]',
};

const colorMap = {
  primary: 'from-primary/40 via-primary/20 to-transparent',
  accent: 'from-blue-500/40 via-blue-400/20 to-transparent',
  purple: 'from-purple-500/40 via-purple-400/20 to-transparent',
};

const intensityMap = {
  low: 'blur-[80px] opacity-30',
  medium: 'blur-[120px] opacity-50',
  high: 'blur-[150px] opacity-70',
};

export function DynamicGlow({
  className = '',
  color = 'primary',
  size = 'lg',
  intensity = 'medium',
  animate = true,
}: DynamicGlowProps) {
  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-radial ${sizeMap[size]} ${colorMap[color]} ${intensityMap[intensity]} pointer-events-none ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={
        animate
          ? {
              scale: [0.8, 1.1, 0.9, 1],
              opacity: [0.3, 0.6, 0.4, 0.5],
            }
          : { scale: 1, opacity: 0.5 }
      }
      transition={
        animate
          ? {
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }
          : { duration: 0.5 }
      }
    />
  );
}
