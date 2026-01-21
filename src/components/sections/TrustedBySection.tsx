import { motion } from 'framer-motion';

const logos = [
  'TechCorp', 'Innovate', 'Digital', 'Startup', 'Global', 
  'Creative', 'Future', 'Modern', 'Prime', 'Elite'
];

export function TrustedBySection() {
  return (
    <section className="py-12 border-y border-border/30 bg-secondary/20 overflow-hidden">
      <div className="container-custom">
        <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider">
          Trusted by innovative brands
        </p>
      </div>

      <div className="marquee-container relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 items-center"
          >
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-default select-none"
              >
                <div className="w-8 h-8 rounded-lg bg-muted-foreground/10 flex items-center justify-center">
                  <span className="text-xs font-bold">{logo[0]}</span>
                </div>
                <span className="text-lg font-semibold whitespace-nowrap">{logo}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
