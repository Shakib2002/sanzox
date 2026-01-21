import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeUpVariants } from '@/hooks/useScrollAnimation';

interface SectionHeadingProps {
  badge?: string;
  title: string | ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center max-w-3xl mx-auto',
        className
      )}
    >
      {badge && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
          {badge}
        </span>
      )}
      <h2 className="heading-lg text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
