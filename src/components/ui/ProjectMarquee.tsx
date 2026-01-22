import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useSiteSettings } from '@/hooks/useSiteSettings';

interface Work {
  id: string;
  slug: string;
  title: string;
  thumbnail: string | null;
  industry: string | null;
}

interface MarqueeRowProps {
  works: Work[];
  direction: 'left' | 'right';
  speed: number;
  className?: string;
}

function MarqueeRow({ works, direction, speed, className = '' }: MarqueeRowProps) {
  const [isPaused, setIsPaused] = useState(false);
  
  // Duplicate works for seamless loop
  const duplicatedWorks = [...works, ...works, ...works];
  
  const animationDuration = works.length * speed;
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-4"
        initial={false}
        animate={{
          x: direction === 'left' ? ['0%', '-33.33%'] : ['-33.33%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: animationDuration,
            ease: 'linear',
          },
        }}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
        onHoverStart={() => setIsPaused(true)}
        onHoverEnd={() => setIsPaused(false)}
      >
        {duplicatedWorks.map((work, index) => (
          <Link
            key={`${work.id}-${index}`}
            to={`/works/${work.slug}`}
            className="group relative flex-shrink-0 w-64 md:w-80 aspect-video rounded-xl overflow-hidden bg-secondary/50"
          >
            {work.thumbnail ? (
              <img
                src={work.thumbnail}
                alt={work.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary/30">{work.title[0]}</span>
              </div>
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-primary font-medium mb-1">{work.industry || 'Project'}</p>
                <h4 className="text-sm font-semibold text-foreground">{work.title}</h4>
              </div>
            </div>
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 bg-primary/10" />
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 blur-xl" />
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}

export function ProjectMarquee() {
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: settings } = useSiteSettings();
  
  const rowCount = (settings as any)?.works_marquee_rows || 3;

  useEffect(() => {
    async function fetchWorks() {
      try {
        const { data, error } = await supabase
          .from('works')
          .select('id, slug, title, thumbnail, industry')
          .order('created_at', { ascending: false })
          .limit(12);

        if (error) throw error;
        setWorks(data || []);
      } catch (error) {
        console.error('Error fetching works:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWorks();
  }, []);

  if (isLoading || works.length === 0) {
    return null;
  }

  // Split works into rows
  const worksPerRow = Math.ceil(works.length / rowCount);
  const rows = Array.from({ length: rowCount }, (_, i) => 
    works.slice(i * worksPerRow, (i + 1) * worksPerRow)
  ).filter(row => row.length > 0);

  // Different speeds for each row
  const speeds = [8, 12, 10];
  const directions: ('left' | 'right')[] = ['left', 'right', 'left'];

  return (
    <div className="relative py-8 space-y-4">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      {rows.map((rowWorks, index) => (
        <MarqueeRow
          key={index}
          works={rowWorks.length >= 3 ? rowWorks : [...rowWorks, ...works.slice(0, 3 - rowWorks.length)]}
          direction={directions[index % 3]}
          speed={speeds[index % 3]}
        />
      ))}
    </div>
  );
}
