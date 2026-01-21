import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbox } from '@/components/ui/Lightbox';

interface WorkGalleryProps {
  images: string[];
  thumbnail?: string | null;
  title: string;
}

export function WorkGallery({ images, thumbnail, title }: WorkGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Combine thumbnail with gallery images, avoiding duplicates
  const allImages = thumbnail 
    ? [thumbnail, ...images.filter(img => img !== thumbnail)]
    : images;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (allImages.length === 0) {
    // Fallback placeholder
    return (
      <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border/50 flex items-center justify-center">
        <span className="text-6xl font-bold text-primary/20">{title[0]}</span>
      </div>
    );
  }

  if (allImages.length === 1) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <div className="aspect-video rounded-2xl overflow-hidden border border-border/50">
            <img
              src={allImages[0]}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>
        <Lightbox
          images={allImages}
          initialIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      </>
    );
  }

  // Multiple images - create a grid layout
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main large image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <div className="aspect-video rounded-2xl overflow-hidden border border-border/50 relative">
            <img
              src={allImages[0]}
              alt={`${title} - Main`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
                Click to view
              </span>
            </div>
          </div>
        </motion.div>

        {/* Thumbnail grid */}
        {allImages.slice(1, 5).map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index + 1) * 0.1 }}
            className="cursor-pointer group relative"
            onClick={() => openLightbox(index + 1)}
          >
            <div className="aspect-video rounded-xl overflow-hidden border border-border/50">
              <img
                src={image}
                alt={`${title} - ${index + 2}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            {/* Show remaining count on last visible thumbnail */}
            {index === 3 && allImages.length > 5 && (
              <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  +{allImages.length - 5}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <Lightbox
        images={allImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
