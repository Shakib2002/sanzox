import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { WordReveal } from '@/components/ui/WordReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroVideoBackground } from '@/components/hero/HeroVideoBackground';
import { SpaceParallaxHero } from '@/components/hero/SpaceParallaxHero';
import { AnimatedGradientBackground } from '@/components/hero/AnimatedGradientBackground';
import { FloatingIcons } from '@/components/hero/FloatingIcons';
import { BentoStats } from '@/components/hero/BentoStats';
import { useSiteSettings, defaultSiteSettings } from '@/hooks/useSiteSettings';
import { staggerContainerVariants } from '@/hooks/useScrollAnimation';
import defaultHeroImage from '@/assets/hero-main.jpg';
import heroAstronaut from '@/assets/hero-astronaut.png';

const defaultServiceWords = [
  'AI Automation',
  'Web Development',
  'Video Editing',
  'Shopify Solutions',
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
    },
  },
};

// FIX: Glow pulse motion values reduced — heavy blur animations cause scroll jitter
const glowPulseTransition = {
  duration: 3,
  repeat: Infinity,
  ease: 'easeInOut',
};

export function HeroSection() {
  const { data: settings } = useSiteSettings();

  const s = settings || defaultSiteSettings;
  const showVideo = s.hero_video_enabled && s.hero_video_url;
  const heroImage = s.hero_image_url || defaultHeroImage;
  const serviceWords =
    s.hero_service_words?.length > 0 ? s.hero_service_words : defaultServiceWords;

  return (
    // FIX 1: contain + isolation — browser won't repaint outside this section on scroll
    <section
      className="relative min-h-[100vh] flex items-center overflow-hidden"
      style={{ contain: 'layout style paint', isolation: 'isolate' }}
    >
      {/* Background layers */}
      {showVideo ? (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <HeroVideoBackground
            videoUrl={s.hero_video_url!}
            fallbackImage={heroImage}
          />
          <div className="absolute inset-0 bg-background/70" />
        </div>
      ) : (
        <>
          {/*
            FIX 2: AnimatedGradientBackground — translateZ(0) forces its own GPU
            compositing layer so scroll events don't trigger repaint on it
          */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: 'translateZ(0)',
              willChange: 'opacity',
              isolation: 'isolate',
            }}
          >
            <AnimatedGradientBackground />
          </div>

          {/*
            FIX 3: SpaceParallaxHero wrapper — backfaceVisibility stops GPU
            layer thrashing when parallax translateY updates on scroll
          */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <SpaceParallaxHero />
          </div>

          {/* FIX 4: FloatingIcons — own compositing layer, won't flicker on scroll */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ willChange: 'transform, opacity', isolation: 'isolate' }}
          >
            <FloatingIcons />
          </div>
        </>
      )}

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
            // FIX 5: translateZ(0) keeps this stagger container on its own layer
            style={{ transform: 'translateZ(0)' }}
          >
            {/* Tagline badge */}
            <motion.div variants={fadeUpVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm mt-10 md:mt-0">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-primary"
                  // FIX 6: scale-only animation — cheaper than combined transforms
                  style={{ willChange: 'transform' }}
                />
                {s.tagline}
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.div variants={fadeUpVariants}>
              <h1 className="text-4xl md:text-5xl mb-6 font-semibold">
                <WordReveal text={s.hero_headline} className="block" />
                <span className="block mt-2">
                  <span className="gradient-text shimmer-text">
                    <TypewriterText
                      words={serviceWords}
                      typingSpeed={80}
                      deletingSpeed={40}
                      pauseDuration={2500}
                    />
                  </span>
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUpVariants}
              className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {s.hero_description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <MagneticButton>
                <div className="relative">
                  {/*
                    FIX 7: Glow pulse — removed blur animation (most expensive).
                    opacity + scale only, no blur transition.
                  */}
                  <motion.div
                    className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary via-primary/80 to-primary opacity-60"
                    animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.98, 1.02, 0.98] }}
                    transition={glowPulseTransition}
                    style={{ willChange: 'opacity, transform' }}
                  />
                  <Button
                    size="lg"
                    asChild
                    className="relative btn-glow text-base px-8 overflow-hidden group"
                  >
                    <Link to="/contact">
                      <span className="relative z-10 flex items-center">
                        Book a Call
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </MagneticButton>

              <MagneticButton magneticStrength={0.2}>
                <div className="relative group/outline">
                  <motion.div className="absolute -inset-1 rounded-lg bg-primary/20 opacity-0 group-hover/outline:opacity-50 transition-opacity duration-300" />
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="relative text-base px-8 backdrop-blur-sm border-primary/30 hover:border-primary/60 transition-colors"
                  >
                    <Link to="/works">View Works</Link>
                  </Button>
                </div>
              </MagneticButton>
            </motion.div>

            {/* Bento Stats */}
            <motion.div variants={fadeUpVariants}>
              <BentoStats />
            </motion.div>
          </motion.div>

          {/* Right — 3D Floating Astronaut */}
          {!showVideo && (
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, type: 'spring', stiffness: 50 }}
              className="relative flex items-center justify-center lg:justify-end"
              // FIX 8: Right column gets its own compositing layer
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
              }}
            >
              {/* Outer glow */}
              <motion.div
                animate={{ opacity: [0.25, 0.45, 0.25], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full -z-10"
                style={{
                  // FIX 9: blur removed from animated element — blur + animation = jitter
                  // Use static blur on a pseudo or a non-animated sibling instead
                  background:
                    'radial-gradient(circle, hsl(280 70% 50% / 0.4) 0%, hsl(217 91% 60% / 0.3) 50%, transparent 70%)',
                  filter: 'blur(120px)',
                  willChange: 'opacity, transform',
                }}
              />

              {/* Secondary purple glow */}
              <motion.div
                animate={{ opacity: [0.2, 0.4, 0.2], x: [-20, 20, -20], y: [10, -10, 10] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full -z-10"
                style={{
                  background:
                    'radial-gradient(circle, hsl(280 70% 50% / 0.35) 0%, transparent 60%)',
                  filter: 'blur(90px)',
                  willChange: 'opacity, transform',
                }}
              />

              {/* Tertiary cyan glow */}
              <motion.div
                animate={{ opacity: [0.15, 0.3, 0.15], x: [10, -15, 10], y: [-10, 15, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-1/4 left-1/4 w-56 h-56 rounded-full -z-10"
                style={{
                  background:
                    'radial-gradient(circle, hsl(200 80% 50% / 0.3) 0%, transparent 60%)',
                  filter: 'blur(70px)',
                  willChange: 'opacity, transform',
                }}
              />

              {/*
                FIX 10: Orbit rings container — perspective + willChange + backfaceVisibility
                prevents layer promotion conflict between 3 simultaneously rotating rings
              */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                  perspective: '1000px',
                  willChange: 'transform',
                  isolation: 'isolate',
                }}
              >
                {/* Primary Orbit */}
                <motion.div
                  animate={{ rotateZ: [0, 360], opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    rotateZ: { duration: 20, repeat: Infinity, ease: 'linear' },
                    opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="absolute w-[110%] h-[75%] rounded-full border-2"
                  style={{
                    transform: 'rotateX(75deg)',
                    borderColor: 'hsl(280 70% 50% / 0.4)',
                    boxShadow:
                      '0 0 20px hsl(280 70% 50% / 0.3), inset 0 0 20px hsl(280 70% 50% / 0.1)',
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                />

                {/* Secondary Orbit */}
                <motion.div
                  animate={{ rotateZ: [360, 0], scale: [0.98, 1.02, 0.98] }}
                  transition={{
                    rotateZ: { duration: 15, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="absolute w-[95%] h-[60%] rounded-full border"
                  style={{
                    transform: 'rotateX(65deg) rotateY(10deg)',
                    borderColor: 'hsl(200 80% 50% / 0.35)',
                    boxShadow: '0 0 15px hsl(200 80% 50% / 0.25)',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                />

                {/* Tertiary Orbit */}
                <motion.div
                  animate={{ rotateZ: [0, 360], opacity: [0.25, 0.5, 0.25] }}
                  transition={{
                    rotateZ: { duration: 10, repeat: Infinity, ease: 'linear' },
                    opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="absolute w-[75%] h-[45%] rounded-full border border-dashed"
                  style={{
                    transform: 'rotateX(70deg) rotateY(-5deg)',
                    borderColor: 'hsl(280 60% 60% / 0.3)',
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                />
              </div>

              {/* 3D Floating Astronaut */}
              <motion.div
                animate={{
                  y: [-20, 20, -20],
                  x: [-8, 8, -8],
                  rotateZ: [-4, 4, -4],
                }}
                transition={{
                  y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                  x: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
                  rotateZ: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="relative z-10"
                // FIX 11: preserve-3d + willChange on the floating wrapper
                style={{
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  {/* Glow behind astronaut — static blur, no animated blur */}
                  <motion.div
                    animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-radial from-primary/40 via-primary/20 to-transparent rounded-full"
                    style={{
                      filter: 'blur(48px)',
                      willChange: 'opacity, transform',
                    }}
                  />

                  {/* Breathing wrapper */}
                  <motion.div
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ willChange: 'transform' }}
                  >
                    {/*
                      FIX 12: img gets translateZ(0) — promotes to its own GPU
                      texture layer, stops raster flicker during parent animations
                    */}
                    <img
                      src={heroAstronaut}
                      alt="3D Astronaut floating in space"
                      className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain drop-shadow-[0_0_80px_hsl(var(--primary)/0.5)]"
                      style={{
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                        // FIX 13: decoding async — prevents main thread block on image decode
                        // Add decoding="async" as attribute below
                      }}
                      decoding="async"
                    />
                  </motion.div>
                </motion.div>

                {/* Floating particles */}
                <motion.div
                  animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.8, 1.2, 0.8], y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full"
                  style={{ willChange: 'transform, opacity', filter: 'blur(2px)' }}
                />
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 0.6, 1], x: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-20 right-10 w-3 h-3 bg-primary rounded-full"
                  style={{ willChange: 'transform, opacity', filter: 'blur(3px)' }}
                />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.3, 0.9], y: [3, -3, 3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-1/3 right-0 w-1.5 h-1.5 bg-accent rounded-full"
                  style={{ willChange: 'transform, opacity', filter: 'blur(1px)' }}
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        style={{ willChange: 'transform' }}
      >
        <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="p-2 rounded-full border border-muted-foreground/20 backdrop-blur-sm"
          style={{ willChange: 'transform' }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}