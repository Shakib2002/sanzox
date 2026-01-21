import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  hover = true,
  glow = false,
  ...props 
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'glass-card p-6',
        hover && 'transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5',
        glow && 'border-glow',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
