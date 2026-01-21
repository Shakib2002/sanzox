import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { ParallaxBadge } from '@/components/hero/ParallaxBadge';
import { useHeroStats } from '@/hooks/useHeroStats';
import { fadeUpVariants, staggerContainerVariants, slideInRightVariants } from '@/hooks/useScrollAnimation';
import heroImage from '@/assets/hero-main.jpg';

const serviceWords = [
  'AI Automation',
  'Web Development',
  'Video Editing',
  'Shopify Solutions',
];

export function HeroSection() {
  const { ref: statsRef, stats } = useHeroStats();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <motion.div
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeUpVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                AI-Powered Digital Agency
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeUpVariants}
              className="heading-xl mb-6"
            >
              Your Pro Team for{' '}
              <br className="hidden sm:block" />
              <TypewriterText 
                words={serviceWords}
                typingSpeed={80}
                deletingSpeed={40}
                pauseDuration={2500}
              />
            </motion.h1>

            <motion.p 
              variants={fadeUpVariants}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
            >
              We specialize in AI Automation, YouTube Automation, Video Editing, 
              Website Development, and Shopify solutions that transform your brand.
            </motion.p>

            <motion.div 
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" asChild className="btn-glow text-base px-8">
                <Link to="/contact">
                  Book a Call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base px-8">
                <Link to="/works">
                  View Works
                </Link>
              </Button>
            </motion.div>

            {/* Animated stats */}
            <motion.div 
              ref={statsRef}
              variants={fadeUpVariants}
              className="mt-12 flex items-center justify-center lg:justify-start gap-6 sm:gap-8"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    <span className="gradient-text">{stat.animatedValue}</span>
                    <span className="text-primary">{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  {index < stats.length - 1 && (
                    <div className="hidden" />
                  )}
                </div>
              ))}
              {/* Dividers rendered separately for proper flexbox layout */}
            </motion.div>
          </motion.div>

          {/* Right Hero Image */}
          <motion.div
            variants={slideInRightVariants}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg mx-auto lg:mx-0">
              {/* Glow effect behind */}
              <motion.div 
                animate={{ 
                  opacity: [0.3, 0.5, 0.3],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary/30 rounded-full blur-[100px]"
              />
              
              {/* Hero image with floating animation */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
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
                    <div className="px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30 text-xs font-medium text-primary">
                      AI Powered
                    </div>
                  </ParallaxBadge>
                  
                  <ParallaxBadge 
                    className="absolute bottom-6 left-6"
                    intensity={20}
                    floatDelay={0.5}
                  >
                    <div className="px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30 text-xs font-medium text-primary">
                      Automation
                    </div>
                  </ParallaxBadge>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div 
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-muted-foreground"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
