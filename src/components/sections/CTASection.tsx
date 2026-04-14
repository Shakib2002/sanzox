import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ParticleField } from '@/components/ui/ParticleField';
import { fadeUpVariants } from '@/hooks/useScrollAnimation';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export function CTASection() {
  const { data: settings } = useSiteSettings();

  const badge = settings?.cta_badge || 'Ready to Transform?';
  const headline = settings?.cta_headline || "Let's start";
  const headlineHighlight = settings?.cta_headline_highlight || 'building brands';
  const headlineSuffix = settings?.cta_headline_suffix || 'that matter';
  const description = settings?.cta_description || 'Ready to transform your business with automation-driven growth? Book a free strategy call and discover your potential.';
  const primaryButtonText = settings?.cta_primary_button_text || 'Get Free Proposal';
  const primaryButtonLink = settings?.cta_primary_button_link || '/contact';
  const secondaryButtonText = settings?.cta_secondary_button_text || 'View Our Work';
  const secondaryButtonLink = settings?.cta_secondary_button_link || '/works';
  const trustIndicators = settings?.cta_trust_indicators || ['Free Consultation', 'No Commitment', '24h Response'];

  return (
    <section className="py-4 md:py-8 relative overflow-hidden">
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
            {badge}
          </motion.div>
          
          {/* Headline */}
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {headline}{' '}
            <span className="gradient-text shimmer-text">{headlineHighlight}</span>
            <br />
            <span className="text-muted-foreground">{headlineSuffix}</span>
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {description}
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
                <Button size="lg" asChild               
                  className="btn-glow relative px-8 py-3.5 rounded-lg font-semibold text-base tracking-wide transition-transform duration-300 hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 55%))",
                    color: "hsl(222 47% 6%)",
                    boxShadow: "0 0 30px hsl(217 91% 60% / 0.4)",
                    willChange: "transform",
                  }}>
                  <Link to={primaryButtonLink}>
                    {primaryButtonText}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </MagneticButton>
            <MagneticButton magneticStrength={0.2}>
              <Button size="lg" variant="outline" asChild 
                  className="px-8 py-3.5 rounded-lg font-semibold text-base tracking-wide border backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    borderColor: "hsl(217 91% 60% / 0.3)",
                    color: "hsl(210 40% 98%)",
                    background: "transparent",
                  }}>
                <Link to={secondaryButtonLink}>{secondaryButtonText}</Link>
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
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>{indicator}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
