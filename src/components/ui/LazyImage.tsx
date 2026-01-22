import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  placeholderColor?: string;
  aspectRatio?: 'auto' | 'square' | 'video' | 'portrait';
  fill?: boolean;
  priority?: boolean;
}

export function LazyImage({
  src,
  alt,
  className,
  placeholderColor = 'hsl(var(--secondary))',
  aspectRatio = 'auto',
  fill = false,
  priority = false,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [priority]);

  // Reset states when src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const aspectRatioClass = {
    auto: '',
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
  }[aspectRatio];

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  if (!src) {
    return (
      <div
        className={cn(
          'bg-secondary/50 flex items-center justify-center',
          fill ? 'absolute inset-0' : aspectRatioClass,
          className
        )}
      >
        <div className="text-muted-foreground/50 text-xs">No image</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden',
        fill ? 'absolute inset-0' : aspectRatioClass,
        className
      )}
    >
      {/* Blur placeholder */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-500',
          isLoaded ? 'opacity-0' : 'opacity-100'
        )}
        style={{
          backgroundColor: placeholderColor,
        }}
      >
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      {/* Actual image */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-all duration-500',
            fill ? 'absolute inset-0 w-full h-full object-cover' : 'w-full h-full object-cover',
            isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm',
            hasError && 'hidden'
          )}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-secondary/50 flex items-center justify-center">
          <div className="text-muted-foreground/50 text-xs">Failed to load</div>
        </div>
      )}
    </div>
  );
}
