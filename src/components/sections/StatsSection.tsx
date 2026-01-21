import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';

const stats = [
  { value: 30, suffix: '+', label: 'Projects Delivered' },
  { value: 13, suffix: '+', label: 'Team Members' },
  { value: 250, suffix: '+', label: 'Deliverables' },
  { value: 5, suffix: 'M+', label: 'Views Generated' },
];

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useCountUp(value, 2000, isInView);

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      className="text-center p-6"
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-foreground mb-2">
        <span className="gradient-text">{count}</span>
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="text-muted-foreground text-sm md:text-base">{label}</p>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container-custom relative">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="glass-card py-8 md:py-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border/50">
            {stats.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
