import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';
import { Building2, ShoppingBag, Users, Briefcase, GraduationCap, Heart } from 'lucide-react';

const industries = [
  {
    icon: Building2,
    name: 'SaaS',
    description: 'Automation and growth systems for software companies.',
    color: 'text-blue-400',
  },
  {
    icon: ShoppingBag,
    name: 'eCommerce',
    description: 'Shopify stores and conversion optimization.',
    color: 'text-green-400',
  },
  {
    icon: Users,
    name: 'Creators',
    description: 'YouTube automation and content systems.',
    color: 'text-red-400',
  },
  {
    icon: Briefcase,
    name: 'Agencies',
    description: 'White-label services and process automation.',
    color: 'text-purple-400',
  },
  {
    icon: GraduationCap,
    name: 'Education',
    description: 'Course platforms and learning systems.',
    color: 'text-yellow-400',
  },
  {
    icon: Heart,
    name: 'Healthcare',
    description: 'Patient engagement and workflow automation.',
    color: 'text-pink-400',
  },
];

export function IndustriesSection() {
  return (
    <section className="section-padding relative bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="container-custom">
        <SectionHeading
          badge="Industries"
          title={<>Industry <span className="gradient-text">Expertise</span></>}
          description="Deep domain knowledge across multiple industries to deliver tailored solutions."
        />

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {industries.map((industry) => (
            <GlassCard
              key={industry.name}
              variants={fadeUpVariants}
              className="group text-center"
            >
              <div className={`w-14 h-14 mx-auto rounded-xl bg-secondary/50 flex items-center justify-center ${industry.color} mb-4 group-hover:scale-110 transition-transform`}>
                <industry.icon size={28} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {industry.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {industry.description}
              </p>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
