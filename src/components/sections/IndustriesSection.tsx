import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';
import {
  Building2,
  ShoppingBag,
  GraduationCap,
  Heart,
  Landmark,
  Truck,
} from "lucide-react";

const industries = [
  {
    icon: Building2,
    name: "SaaS & Startups",
    description: "Scalable platforms, AI automation, and growth-focused software.",
    color: "text-blue-400",
  },
  {
    icon: ShoppingBag,
    name: "E-commerce",
    description: "Custom stores, mobile apps, and conversion-driven experiences.",
    color: "text-green-400",
  },
  {
    icon: Landmark,
    name: "Finance",
    description: "Secure digital products, dashboards, and workflow systems.",
    color: "text-purple-400",
  },
  {
    icon: GraduationCap,
    name: "Education",
    description: "Learning platforms, student portals, and digital classrooms.",
    color: "text-yellow-400",
  },
  {
    icon: Heart,
    name: "Healthcare",
    description: "Patient management, appointment systems, and automation.",
    color: "text-pink-400",
  },
  {
    icon: Truck,
    name: "Logistics",
    description: "Operations management, tracking systems, and process automation.",
    color: "text-cyan-400",
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
              <div className={`w-14 h-14 mx-auto rounded-xl bg-secondary/50 border border-border/40 flex items-center justify-center ${industry.color} mb-4 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300`}>
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
