import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { fadeUpVariants } from '@/hooks/useScrollAnimation';

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "We learn your goals, users and constraints, then define scope.",
  },
  {
    number: "02",
    title: "Design",
    description: "Wireframes and a clickable prototype you approve before code.",
  },
  {
    number: "03",
    title: "Build",
    description: "Weekly demos, clean code and transparent milestones.",
  },
  {
    number: "04",
    title: "Launch & grow",
    description: "Release, monitor and keep improving with ongoing support.",
  },
];

export function HowWeWorkSection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading
          badge="How we work"
          title={<>A simple process, <span className="text-muted-foreground">no surprises</span></>}
        />

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step) => (
            <div
              key={step.number}
              className="group flex h-full flex-col gap-4 rounded-2xl border border-border/40 bg-secondary/20 p-6 transition-all duration-300 hover:border-border/70 hover:bg-secondary/30"
            >
              {/* Number */}
              <span className="text-4xl font-semibold tracking-tight text-border/50 lg:text-5xl">
                {step.number}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}