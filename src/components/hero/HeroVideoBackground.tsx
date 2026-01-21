import { useState } from 'react';
import { motion } from 'framer-motion';

interface HeroVideoBackgroundProps {
  videoUrl: string;
  fallbackImage: string;
}

export function HeroVideoBackground({ videoUrl, fallbackImage }: HeroVideoBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  if (videoError) {
    return (
      <img 
        src={fallbackImage}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }

  return (
    <>
      {/* Fallback image while video loads */}
      {!videoLoaded && (
        <img 
          src={fallbackImage}
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      
      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: videoLoaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onLoadedData={() => setVideoLoaded(true)}
        onError={() => setVideoError(true)}
      />
    </>
  );
}
