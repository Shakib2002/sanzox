import { useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { TextReveal } from '@/components/ui/TextReveal';

const logosRow1 = [
  'TechCorp', 'Innovate', 'Digital', 'Startup', 'Global'
];

const logosRow2 = [
  'Creative', 'Future', 'Modern', 'Prime', 'Elite'
];

function MarqueeRow({ 
  logos, 
  direction = 'left', 
  speed = 30 
}: { 
  logos: string[]; 
  direction?: 'left' | 'right';
  speed?: number;
}) {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimationControls();
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];
  
  const startAnimation = () => {
    controls.start({
      x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
      transition: { 
        duration: speed, 
        repeat: Infinity, 
        ease: 'linear' 
      }
    });
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    controls.stop();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startAnimation();
  };

  return (
    <div 
      className="flex overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{ 
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] 
        }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: 'linear' 
        }}
        className="flex gap-12 items-center"
        style={{ 
          willChange: 'transform',
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
        onHoverStart={() => setIsPaused(true)}
        onHoverEnd={() => setIsPaused(false)}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {duplicatedLogos.map((logo, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-3 text-muted-foreground/40 hover:text-muted-foreground transition-all duration-300 cursor-default select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-muted-foreground/10 border border-muted-foreground/10 flex items-center justify-center backdrop-blur-sm">
              <span className="text-sm font-bold gradient-text">{logo[0]}</span>
            </div>
            <span className="text-lg font-semibold whitespace-nowrap tracking-tight">{logo}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function TrustedBySection() {
  return (
    <section className="py-16 border-y border-border/20 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden relative">
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <div className="container-custom mb-8">
        <TextReveal>
          <p className="text-center text-sm text-muted-foreground uppercase tracking-[0.2em] font-medium">
            Trusted by innovative brands worldwide
          </p>
        </TextReveal>
      </div>

      <div className="relative space-y-6">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />

        {/* Row 1 - scrolls left */}
        <MarqueeRow logos={logosRow1} direction="left" speed={35} />
        
        {/* Row 2 - scrolls right (opposite direction) */}
        <MarqueeRow logos={logosRow2} direction="right" speed={40} />
      </div>
    </section>
  );
}
