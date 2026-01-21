import { motion } from 'framer-motion';
import { useHeroStats } from '@/hooks/useHeroStats';

export function BentoStats() {
  const { ref, stats } = useHeroStats();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-12 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05, 
            y: -4,
            transition: { duration: 0.2 }
          }}
          className="group relative"
        >
          {/* Glassmorphic card */}
          <div className="relative p-4 rounded-2xl bg-card/50 backdrop-blur-md border border-primary/10 overflow-hidden">
            {/* Animated border gradient */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.2), transparent, hsl(280 91% 60% / 0.2))',
              }}
            />
            
            {/* Pulse indicator */}
            <div className="absolute top-2 right-2">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <motion.div 
                className="text-2xl sm:text-3xl font-bold"
                key={stat.animatedValue}
              >
                <span className="gradient-text">{stat.animatedValue}</span>
                <span className="text-primary">{stat.suffix}</span>
              </motion.div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">
                {stat.label}
              </div>
            </div>

            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                boxShadow: '0 0 30px hsl(var(--primary) / 0.2), inset 0 0 30px hsl(var(--primary) / 0.05)',
              }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
