import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { TiltCard } from '@/components/ui/TiltCard';
import { VideoThumbnail } from '@/components/ui/VideoThumbnail';
import { cn } from '@/lib/utils';
import { Work } from '@/types/work';

interface WorkCardProps {
  work: Work;
  onOpen: (work: Work) => void;
}

export function WorkCard({ work, onOpen }: WorkCardProps) {
  return (
    <TiltCard tiltAmount={10} glareEnabled={true} className="w-full h-full">
      <GlassCard hover={true} glow={false} className="relative w-full h-full rounded-xl overflow-hidden">
        <button
          data-cursor-text="VIEW"
          className="absolute inset-0 focus:outline-none"
          onClick={() => onOpen(work)}
        >
          {/* Visual content */}
          <VideoThumbnail
            thumbnail={work.thumbnail}
            videoUrl={work.video_preview ?? null}
            title={work.title}
            className="absolute inset-0"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
          {/* Industry tag */}
          <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-xs font-medium">
            {work.industry || 'Project'}
          </div>
          {/* Title */}
          <div className="absolute bottom-4 left-4 right-4 text-foreground text-sm md:text-base font-semibold transition-colors duration-300">
            {work.title}
          </div>
        </button>
      </GlassCard>
    </TiltCard>
  );
}
