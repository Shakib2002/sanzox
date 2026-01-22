import { forwardRef, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { VideoThumbnail } from './VideoThumbnail';

interface Work {
  id: string;
  slug: string;
  title: string;
  industry: string | null;
  tags: string[];
  thumbnail: string | null;
  featured?: boolean;
  video_preview?: string | null;
  metrics?: { label: string; value: string }[] | null;
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
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9,
    rotateX: -10,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      mass: 1,
    },
  },
};

export const BentoGrid = forwardRef<HTMLDivElement, BentoGridProps>(({ works }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <motion.div 
      ref={(node) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[180px]"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {works.map((work, index) => {
        const pattern = bentoPatterns[index % bentoPatterns.length];
        // Get first metric from work's metrics array
        const resultMetric = work.metrics?.[0];
        
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
              tiltAmount={10}
              glareEnabled={true}
              className="w-full h-full"
            >
              <Link
                to={`/works/${work.slug}`}
                className="group relative block w-full h-full rounded-xl overflow-hidden bg-secondary/30 border border-border/30 hover:border-primary/50 transition-all duration-300"
              >
                {/* Background image or video thumbnail */}
                <VideoThumbnail
                  thumbnail={work.thumbnail}
                  videoUrl={work.video_preview || null}
                  title={work.title}
                  className="absolute inset-0"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Animated glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                </div>
                
                {/* Result metrics badge - appears on hover */}
                {resultMetric && (
                  <motion.div 
                    className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                  >
                    <TrendingUp className="w-3 h-3" />
                    {resultMetric.value}
                  </motion.div>
                )}

                {/* Featured badge */}
                {work.featured && !resultMetric && (
                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium">
                    Featured
                  </span>
                )}
                
                {/* Content */}
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2 py-1 rounded-md bg-primary/20 backdrop-blur-sm text-primary text-xs font-medium">
                      {work.industry || 'Project'}
                    </span>
                    {pattern.colSpan >= 2 && work.tags?.slice(0, 2).map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 rounded-md bg-secondary/50 backdrop-blur-sm text-muted-foreground text-xs hidden md:inline-block"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Title */}
                  <h3 className={`font-semibold text-foreground group-hover:text-primary transition-colors duration-300 ${
                    pattern.colSpan >= 2 ? 'text-lg md:text-xl' : 'text-sm md:text-base'
                  }`}>
                    {work.title}
                  </h3>
                  
                  {/* Arrow indicator */}
                  <motion.div
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                    whileHover={{ scale: 1.15, rotate: 45 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <ArrowUpRight className="w-5 h-5 text-primary" />
                  </motion.div>
                </div>
                
                {/* Hover glow border */}
                <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-primary/40" />
                  <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
                </div>
              </Link>
            </TiltCard>
          </motion.div>
        );
      })}
    </motion.div>
  );
});

BentoGrid.displayName = 'BentoGrid';
