import { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { TextReveal } from '@/components/ui/TextReveal';
import { 
  Zap, 
  Rocket, 
  Globe, 
  Layers, 
  Sparkles,
  Code2,
  Cpu,
  Cloud,
  Palette,
  TrendingUp
} from 'lucide-react';

// Brand-style logos with icons
const logosRow1 = [
  { name: 'TechFlow', icon: Zap, color: 'text-blue-400' },
  { name: 'LaunchPad', icon: Rocket, color: 'text-orange-400' },
  { name: 'GlobalSync', icon: Globe, color: 'text-green-400' },
  { name: 'StackBuild', icon: Layers, color: 'text-purple-400' },
  { name: 'SparkAI', icon: Sparkles, color: 'text-yellow-400' },
];

const logosRow2 = [
  { name: 'CodeNest', icon: Code2, color: 'text-cyan-400' },
  { name: 'ChipWorks', icon: Cpu, color: 'text-rose-400' },
  { name: 'CloudBase', icon: Cloud, color: 'text-sky-400' },
  { name: 'DesignCo', icon: Palette, color: 'text-pink-400' },
  { name: 'GrowthLab', icon: TrendingUp, color: 'text-emerald-400' },
];

interface LogoBrand {
  name: string;
  icon: React.ElementType;
  color: string;
}

function MarqueeRow({ 
  logos, 
  direction = 'left', 
  speed = 30 
}: { 
  logos: LogoBrand[]; 
  direction?: 'left' | 'right';
  speed?: number;
}) {
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

  useEffect(() => {
    startAnimation();
  }, []);

  const handleMouseEnter = () => {
    controls.stop();
  };

  const handleMouseLeave = () => {
    startAnimation();
  };

  return (
    <div 
      className="flex overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={controls}
        className="flex gap-8 md:gap-12 items-center"
        style={{ willChange: 'transform' }}
      >
        {duplicatedLogos.map((brand, index) => {
          const IconComponent = brand.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08, y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-secondary/30 border border-border/30 backdrop-blur-sm hover:bg-secondary/50 hover:border-primary/30 transition-all duration-300 cursor-default select-none group"
            >
              <div className={`w-8 h-8 rounded-lg bg-background/50 flex items-center justify-center ${brand.color} group-hover:scale-110 transition-transform`}>
                <IconComponent className="w-4 h-4" />
              </div>
              <span className="text-sm md:text-base font-semibold whitespace-nowrap text-muted-foreground group-hover:text-foreground transition-colors">
                {brand.name}
              </span>
            </motion.div>
          );
        })}
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

      <div className="relative space-y-4">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />

        {/* Row 1 - scrolls left */}
        <MarqueeRow logos={logosRow1} direction="left" speed={35} />
        
        {/* Row 2 - scrolls right (opposite direction) */}
        <MarqueeRow logos={logosRow2} direction="right" speed={40} />
      </div>
    </section>
  );
}
