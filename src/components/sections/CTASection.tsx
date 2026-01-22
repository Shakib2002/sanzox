import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ParticleField } from '@/components/ui/ParticleField';
import { fadeUpVariants } from '@/hooks/useScrollAnimation';

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Particle background */}
      <ParticleField count={40} />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px]" 
      />
      
      <div className="container-custom relative z-10">
        <motion.div 
          variants={fadeUpVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            Ready to Transform?
          </motion.div>
          
          {/* Headline */}
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Let's start{' '}
            <span className="gradient-text shimmer-text">building brands</span>
            <br />
            <span className="text-muted-foreground">that matter</span>
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ready to transform your business with automation-driven growth? 
            Book a free strategy call and discover your potential.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <MagneticButton>
              <div className="relative">
                <motion.div
                  className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary via-primary/80 to-primary blur-md opacity-60"
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                    scale: [0.98, 1.02, 0.98],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <Button size="lg" asChild className="relative btn-glow group text-base px-8">
                  <Link to="/contact">
                    Get Free Proposal 
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </MagneticButton>
            <MagneticButton magneticStrength={0.2}>
              <Button size="lg" variant="outline" asChild className="text-base px-8 border-primary/30 hover:border-primary/60">
                <Link to="/works">View Our Work</Link>
              </Button>
            </MagneticButton>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div 
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>No Commitment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>24h Response</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
