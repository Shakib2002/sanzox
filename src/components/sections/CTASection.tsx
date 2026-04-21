import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
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
    <section className="py-20 md:py-28 relative overflow-hidden">
      <ParticleField count={30} />

      {/* Soft radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(217 91% 60% / 0.12) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-7"
            style={{
              background: 'hsl(217 91% 60% / 0.1)',
              border: '1px solid hsl(217 91% 60% / 0.25)',
              color: 'hsl(217 91% 60%)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {badge}
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-[1.15] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.45 }}
          >
            {headline}{' '}
            <span className="gradient-text shimmer-text">{headlineHighlight}</span>
            <br />
            <span className="text-muted-foreground font-medium">{headlineSuffix}</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16, duration: 0.4 }}
          >
            {description}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24, duration: 0.4 }}
          >
            <MagneticButton>
              <Button
                size="lg"
                asChild
                className="btn-glow relative px-8 py-3.5 rounded-xl font-semibold text-base tracking-wide transition-transform duration-300 hover:scale-[1.03] active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 55%))',
                  color: 'hsl(222 47% 6%)',
                  boxShadow: '0 0 28px hsl(217 91% 60% / 0.35)',
                  willChange: 'transform',
                }}
              >
                <Link to={primaryButtonLink} className="flex items-center gap-2">
                  {primaryButtonText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </MagneticButton>

            <MagneticButton magneticStrength={0.2}>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="px-8 py-3.5 rounded-xl font-semibold text-base tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-95"
                style={{
                  borderColor: 'hsl(217 91% 60% / 0.3)',
                  background: 'transparent',
                  color: "hsl(210 40% 98%)",
                }}
              >
                <Link to={secondaryButtonLink}>{secondaryButtonText}</Link>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Trust indicators */}
          {trustIndicators.length > 0 && (
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.36, duration: 0.4 }}
            >
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" style={{ color: 'hsl(217 91% 60%)' }} />
                  <span>{indicator}</span>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}