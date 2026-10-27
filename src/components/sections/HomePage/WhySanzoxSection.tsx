import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';
import {
  Bot,
  Rocket,
  Shield,
  TrendingUp,
} from 'lucide-react';

const benefits = [
  {
    icon: Bot,
    title: 'AI-Powered Solutions',
    description:
      'Leverage AI and automation to reduce manual work, improve efficiency, and accelerate growth.',
  },
  {
    icon: Rocket,
    title: 'Built for Scale',
    description:
      'From startups to enterprises, our products are designed to grow with your business.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description:
      'Modern architecture, secure development practices, and dependable performance you can trust.',
  },
  {
    icon: TrendingUp,
    title: 'Growth-Focused Approach',
    description:
      'Every solution is designed to improve productivity, increase revenue, and create measurable business impact.',
  },
];

export function WhySanzoxSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        <SectionHeading
          badge="Why Choose Us"
          title={
            <>
              Built Different.{' '}
              <span className="text-muted-foreground">Built Better.</span>
            </>
          }
          description="We combine cutting-edge technology with battle-tested strategies to deliver exceptional results."
        />

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit) => (
            <GlassCard
              key={benefit.title}
              variants={fadeUpVariants}
              className="p-6 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon Container - Simple Primary Color */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5 transition-colors duration-300">
                <benefit.icon size={24} strokeWidth={2} />
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}