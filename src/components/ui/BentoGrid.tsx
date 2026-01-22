import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { useRef } from 'react';

interface Work {
  id: string;
  slug: string;
  title: string;
  industry: string | null;
  tags: string[];
  thumbnail: string | null;
  featured?: boolean;
}

interface BentoGridProps {
  works: Work[];
}

// Define bento layout patterns - each pattern defines col and row spans
const bentoPatterns = [
  { colSpan: 2, rowSpan: 2 }, // Large featured
  { colSpan: 1, rowSpan: 1 }, // Small
  { colSpan: 1, rowSpan: 2 }, // Tall
  { colSpan: 2, rowSpan: 1 }, // Wide
  { colSpan: 1, rowSpan: 1 }, // Small
  { colSpan: 1, rowSpan: 1 }, // Small
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  },
};

export function BentoGrid({ works }: BentoGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <motion.div 
      ref={containerRef}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[200px]"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {works.map((work, index) => {
        const pattern = bentoPatterns[index % bentoPatterns.length];
        
        return (
          <motion.div
            key={work.id}
            variants={cardVariants}
            className={`
              ${pattern.colSpan === 2 ? 'col-span-2' : 'col-span-1'}
              ${pattern.rowSpan === 2 ? 'row-span-2' : 'row-span-1'}
            `}
          >
            <TiltCard
              tiltAmount={8}
              className="w-full h-full"
            >
              <Link
                to={`/works/${work.slug}`}
                className="group relative block w-full h-full rounded-xl overflow-hidden bg-secondary/30 border border-border/30 hover:border-primary/50 transition-colors"
              >
                {/* Background image or gradient */}
                {work.thumbnail ? (
                  <img
                    src={work.thumbnail}
                    alt={work.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl md:text-8xl font-bold text-primary/20">
                        {work.title[0]}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Content */}
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2 py-1 rounded-md bg-primary/20 backdrop-blur-sm text-primary text-xs font-medium">
                      {work.industry || 'Project'}
                    </span>
                    {pattern.colSpan >= 2 && work.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 rounded-md bg-secondary/50 backdrop-blur-sm text-muted-foreground text-xs hidden md:inline-block"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Title */}
                  <h3 className={`font-semibold text-foreground group-hover:text-primary transition-colors ${
                    pattern.colSpan >= 2 ? 'text-lg md:text-xl' : 'text-sm md:text-base'
                  }`}>
                    {work.title}
                  </h3>
                  
                  {/* Arrow indicator */}
                  <motion.div
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </motion.div>
                </div>
                
                {/* Hover glow border */}
                <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-primary/30" />
                  <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
                </div>
              </Link>
            </TiltCard>
          </motion.div>
        );
      })}
    </motion.div>
  );
}