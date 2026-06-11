import React from 'react';
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { GlassCard } from '@/components/ui/GlassCard';
import { VideoThumbnail } from '@/components/ui/VideoThumbnail';
import { cn } from '@/lib/utils';
import { Work } from '@/pages/Works'; // type import

interface QuickViewModalProps {
  work: Work;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ work, isOpen, onClose }: QuickViewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay />
      <DialogContent className="max-w-3xl rounded-xl bg-card/80 backdrop-blur-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{work.title}</DialogTitle>
          {work.industry && (
            <DialogDescription className="text-muted-foreground text-sm mt-1">
              {work.industry}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="mt-4 relative rounded-lg overflow-hidden">
          <GlassCard hover={false} glow={true} className="w-full h-64">
            <VideoThumbnail
              thumbnail={work.thumbnail}
              videoUrl={work.video_preview ?? null}
              title={work.title}
              className="absolute inset-0"
            />
          </GlassCard>
        </div>
        {work.tags && work.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {work.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
