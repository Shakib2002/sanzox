import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeUpVariants } from '@/hooks/useScrollAnimation';

export function CTASection() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
      <div className="container-custom relative">
        <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
          <h2 className="heading-lg mb-4">Let's start <span className="gradient-text">building brands</span></h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">Ready to transform your business with automation-driven growth?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="btn-glow"><Link to="/contact">Get Proposal <ArrowRight className="ml-2 h-5 w-5" /></Link></Button>
            <Button size="lg" variant="outline" asChild><Link to="/services">See Pricing</Link></Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
