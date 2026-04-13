import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { OdometerNumber } from '@/components/ui/OdometerNumber';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';
import { DynamicGlow } from '@/components/ui/DynamicGlow';

const stats = [
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
  { value: 24, suffix: 'h', label: 'Response Time' },
  { value: 99, suffix: '%', label: 'Automation Reliability' },
  { value: 24, suffix: '/7', label: 'Support Availability' },
];

function StatItem({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      className="text-center p-6 md:p-8 relative group"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500" />
      
      <div className="relative">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-foreground mb-3">
          <span className="gradient-text">
            <OdometerNumber value={value} isInView={isInView} />
          </span>
          <motion.span 
            className="text-primary"
            initial={{ opacity: 0, x: -5 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
          >
            {suffix}
          </motion.span>
        </div>
        <motion.p 
          className="text-muted-foreground text-sm md:text-base"
          initial={{ opacity: 0, y: 5 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
        >
          {label}
        </motion.p>

        {/* Animated underline */}
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ width: 0 }}
          animate={isInView ? { width: '60%' } : {}}
          transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      {/* Dynamic glows */}
      <DynamicGlow className="-left-32 top-1/2 -translate-y-1/2" color="primary" size="xl" intensity="low" />
      <DynamicGlow className="-right-32 top-1/2 -translate-y-1/2" color="purple" size="lg" intensity="low" />
      
      <div className="container-custom relative">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="glass-card py-8 md:py-12 relative overflow-hidden"
        >
          {/* Inner glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-primary/10 blur-[80px] rounded-full" />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border/30 relative">
            {stats.map((stat, index) => (
              <StatItem key={stat.label} {...stat} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
