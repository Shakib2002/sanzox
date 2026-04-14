import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Zap, Shield, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { fadeUpVariants, staggerContainerVariants, slideInLeftVariants, slideInRightVariants } from '@/hooks/useScrollAnimation';
import teamCollaboration from '@/assets/team-collaboration.jpg';

const benefits = [
  {
    icon: Zap,
    title: 'Lightning Fast Delivery',
    description: 'We move fast without compromising quality. Get your projects delivered on time, every time.',
  },
  {
    icon: Shield,
    title: 'Transparent Process',
    description: 'No hidden fees, no surprises. Clear communication and visibility into every step.',
  },
  {
    icon: Target,
    title: 'Measurable Outcomes',
    description: 'Data-driven approach with clear metrics. Track ROI and see real results.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock support to ensure your systems run smoothly at all times.',
  },
];

export function WhySanzoxSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <SectionHeading
          badge="Why Choose Us"
          title={<>Built Different. <span className="gradient-text">Built Better.</span></>}
          description="We combine cutting-edge technology with battle-tested strategies to deliver exceptional results."
        />

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => (
            <GlassCard
              key={benefit.title}
              variants={fadeUpVariants}
              className="group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <benefit.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function AboutSplitSection() {
  return (
    <section className="section-padding relative">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={slideInLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              About SANZOX
            </span>
            <h2 className="heading-lg mb-6">
              We are from{' '}
              <span className="gradient-text">another space</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              SANZOX is a remote-first digital agency bringing together the brightest minds 
              in automation, design, and development. We're not just building websites, we're 
              engineering growth systems.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                'Fast delivery without compromising quality',
                'Transparent process with clear milestones',
                'Measurable outcomes with data-driven insights',
                'Dedicated team for every project',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <Button asChild               
                className="btn-glow relative px-6 py-5 rounded-lg font-semibold text-base tracking-wide transition-transform duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 55%))",
                  color: "hsl(222 47% 6%)",
                  boxShadow: "0 0 30px hsl(217 91% 60% / 0.4)",
                  willChange: "transform",
                }}>
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Right Image/Visual */}
          <motion.div
            variants={slideInRightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden border border-border/50">
              <img 
                src={teamCollaboration} 
                alt="SANZOX Team Collaboration" 
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-transparent to-primary/10" />
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30 text-xs font-medium text-primary">
                Remote-First
              </div>
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30 text-xs font-medium text-primary">
                13+ Team Members
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
