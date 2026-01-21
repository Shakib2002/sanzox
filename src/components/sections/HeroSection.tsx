import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeUpVariants, staggerContainerVariants, slideInLeftVariants, slideInRightVariants } from '@/hooks/useScrollAnimation';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
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
              <span className="gradient-text">Automation-Driven</span>{' '}
              Growth
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

            {/* Quick stats */}
            <motion.div 
              variants={fadeUpVariants}
              className="mt-12 flex items-center justify-center lg:justify-start gap-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">30+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">5M+</div>
                <div className="text-sm text-muted-foreground">Views</div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">13+</div>
                <div className="text-sm text-muted-foreground">Team</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            variants={slideInRightVariants}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Glow effect behind */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] animate-pulse-glow" />
              
              {/* Astronaut illustration placeholder */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl border border-primary/20 flex items-center justify-center overflow-hidden">
                  {/* Abstract space illustration */}
                  <svg viewBox="0 0 400 400" className="w-full h-full p-8 text-primary">
                    {/* Planet */}
                    <circle cx="200" cy="200" r="80" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
                    <ellipse cx="200" cy="200" rx="120" ry="30" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" transform="rotate(-20 200 200)"/>
                    
                    {/* Orbiting elements */}
                    <motion.circle
                      cx="320" cy="180"
                      r="15"
                      fill="currentColor"
                      fillOpacity="0.5"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: "200px 200px" }}
                    />
                    <motion.circle
                      cx="80" cy="220"
                      r="10"
                      fill="currentColor"
                      fillOpacity="0.3"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: "200px 200px" }}
                    />

                    {/* Stars */}
                    {[...Array(20)].map((_, i) => (
                      <motion.circle
                        key={i}
                        cx={50 + Math.random() * 300}
                        cy={50 + Math.random() * 300}
                        r={1 + Math.random() * 2}
                        fill="currentColor"
                        fillOpacity={0.3 + Math.random() * 0.5}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                      />
                    ))}

                    {/* Rocket/spacecraft shape */}
                    <g transform="translate(250, 100) rotate(45)">
                      <path d="M0,0 L20,50 L0,45 L-20,50 Z" fill="currentColor" fillOpacity="0.6"/>
                      <circle cx="0" cy="20" r="8" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="2"/>
                    </g>
                  </svg>

                  {/* Floating badges */}
                  <motion.div
                    animate={{ y: [-5, 5, -5], x: [-3, 3, -3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-8 right-8 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-xs font-medium text-primary"
                  >
                    AI Powered
                  </motion.div>
                  <motion.div
                    animate={{ y: [5, -5, 5], x: [3, -3, 3] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-12 left-8 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-xs font-medium text-primary"
                  >
                    Automation
                  </motion.div>
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
