import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { WordReveal } from '@/components/ui/WordReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ParallaxBadge } from '@/components/hero/ParallaxBadge';
import { HeroVideoBackground } from '@/components/hero/HeroVideoBackground';
import { TiltCard } from '@/components/hero/TiltCard';
import { FloatingIcons } from '@/components/hero/FloatingIcons';
import { BentoStats } from '@/components/hero/BentoStats';
import { useSiteSettings, defaultSiteSettings } from '@/hooks/useSiteSettings';
import { staggerContainerVariants } from '@/hooks/useScrollAnimation';
import defaultHeroImage from '@/assets/hero-main.jpg';

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

export function HeroSection() {
  const { data: settings } = useSiteSettings();

  const s = settings || defaultSiteSettings;
  const showVideo = s.hero_video_enabled && s.hero_video_url;
  const heroImage = s.hero_image_url || defaultHeroImage;
  const serviceWords = s.hero_service_words?.length > 0 ? s.hero_service_words : defaultServiceWords;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background layer */}
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
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
          <FloatingIcons />
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
          >
            {/* Tagline badge */}
            <motion.div variants={fadeUpVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
                {s.tagline}
              </span>
            </motion.div>

            {/* Main headline with word reveal */}
            <motion.div variants={fadeUpVariants}>
              <h1 className="heading-xl mb-6">
                <WordReveal 
                  text={s.hero_headline} 
                  className="block"
                />
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
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {s.hero_description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <MagneticButton>
                <Button size="lg" asChild className="btn-glow text-base px-8 relative overflow-hidden group">
                  <Link to="/contact">
                    <span className="relative z-10 flex items-center">
                      Book a Call
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton magneticStrength={0.2}>
                <Button size="lg" variant="outline" asChild className="text-base px-8 backdrop-blur-sm">
                  <Link to="/works">
                    View Works
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Bento Stats Grid */}
            <motion.div variants={fadeUpVariants}>
              <BentoStats />
            </motion.div>
          </motion.div>

          {/* Right Hero Image with 3D Tilt */}
          {!showVideo && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex items-center justify-center group"
            >
              <TiltCard className="w-full max-w-lg mx-auto lg:mx-0">
                {/* Glow effect behind */}
                <motion.div 
                  animate={{ 
                    opacity: [0.3, 0.5, 0.3],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-10 bg-primary/20 rounded-full blur-[80px] -z-10"
                />
                
                {/* Hero image container */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <div className="relative rounded-3xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/20">
                    <img 
                      src={heroImage} 
                      alt="AI Automation Visual" 
                      className="w-full h-auto object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                    
                    {/* Floating parallax badges */}
                    <ParallaxBadge 
                      className="absolute top-6 right-6"
                      intensity={15}
                      floatDelay={0}
                    >
                      <div className="px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-md border border-primary/30 text-xs font-medium text-primary shadow-lg">
                        AI Powered
                      </div>
                    </ParallaxBadge>
                    
                    <ParallaxBadge 
                      className="absolute bottom-6 left-6"
                      intensity={20}
                      floatDelay={0.5}
                    >
                      <div className="px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-md border border-primary/30 text-xs font-medium text-primary shadow-lg">
                        Automation
                      </div>
                    </ParallaxBadge>

                    <ParallaxBadge 
                      className="absolute top-1/2 -left-4"
                      intensity={25}
                      floatDelay={1}
                    >
                      <div className="px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-md border border-primary/30 text-xs font-medium text-primary shadow-lg">
                        24/7 Support
                      </div>
                    </ParallaxBadge>
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>
          )}
        </div>
      </div>

      {/* Enhanced Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="p-2 rounded-full border border-muted-foreground/20 backdrop-blur-sm"
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
