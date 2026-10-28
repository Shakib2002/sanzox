import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeUpVariants } from '@/hooks/useScrollAnimation';

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-border/40 bg-secondary/20 px-6 py-16 text-center sm:px-12 sm:py-20 lg:py-24"
        >
          {/* subtle glow background */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-primary/5 blur-3xl" />
          </div>

          {/* Heading */}
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Have an idea?
            <br />
            <span className="text-muted-foreground">Let’s build it together.</span>
          </h2>

          {/* Subtext */}
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Tell us about your project and we’ll reply within 24 hours.
          </p>

          {/* CTA button */}
          <div className="mt-9 flex justify-center">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-all duration-300 hover:gap-3 hover:opacity-90"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}