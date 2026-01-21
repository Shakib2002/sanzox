import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';

const testimonials = [
  { id: '1', name: 'Alex Chen', role: 'CEO', company: 'TechStartup', quote: 'SANZOX transformed our workflow with AI automation. Our team saves 20+ hours weekly.', rating: 5 },
  { id: '2', name: 'Sarah Miller', role: 'Content Creator', company: 'YouTube', quote: 'The YouTube automation system they built helped me scale to 1M subscribers.', rating: 5 },
  { id: '3', name: 'James Wilson', role: 'Founder', company: 'eStore', quote: 'Our Shopify store conversions increased by 45% after their redesign.', rating: 5 },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading badge="Testimonials" title={<>What Our <span className="gradient-text">Clients Say</span></>} />
        <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <GlassCard key={t.id} variants={fadeUpVariants}>
              <div className="flex gap-1 mb-4">{[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
              <p className="text-muted-foreground mb-4">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">{t.name[0]}</div>
                <div><p className="font-medium text-foreground">{t.name}</p><p className="text-sm text-muted-foreground">{t.role}, {t.company}</p></div>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
