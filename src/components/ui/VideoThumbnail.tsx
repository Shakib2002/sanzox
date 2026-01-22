import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

interface VideoThumbnailProps {
  thumbnail: string | null;
  videoUrl: string | null;
  title: string;
  className?: string;
}

export function VideoThumbnail({ thumbnail, videoUrl, title, className = '' }: VideoThumbnailProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current || !videoUrl) return;

    if (isHovering) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked
      });
    } else {
      videoRef.current.pause();
    }
  }, [isHovering, videoUrl]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Static thumbnail */}
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            isHovering && videoUrl && isVideoLoaded ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          } group-hover:scale-110`}
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl md:text-8xl font-bold text-primary/20">
              {title[0]}
            </span>
          </div>
        </div>
      )}

      {/* Video preview - only rendered if videoUrl exists */}
      {videoUrl && (
        <>
          <video
            ref={videoRef}
            src={videoUrl}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovering && isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setIsVideoLoaded(true)}
          />

          {/* Play indicator - shows when not hovering */}
          <AnimatePresence>
            {!isHovering && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-primary/30">
                  <Play className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground fill-current ml-0.5" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Video playing indicator */}
          <AnimatePresence>
            {isHovering && isVideoLoaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm z-10"
              >
                <span className="flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-0.5 h-3 bg-primary rounded-full"
                      animate={{
                        scaleY: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </span>
                <span className="text-xs text-foreground/80">Preview</span>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
