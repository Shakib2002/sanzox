import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { fadeUpVariants } from '@/hooks/useScrollAnimation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

const testimonials = [
  { id: '1', name: 'Alex Chen', role: 'CEO', company: 'TechStartup', quote: 'SANZOX transformed our workflow with AI automation. Our team saves 20+ hours weekly.', rating: 5 },
  { id: '2', name: 'Sarah Miller', role: 'Content Creator', company: 'YouTube', quote: 'The YouTube automation system they built helped me scale to 1M subscribers.', rating: 5 },
  { id: '3', name: 'James Wilson', role: 'Founder', company: 'eStore', quote: 'Our Shopify store conversions increased by 45% after their redesign.', rating: 5 },
  { id: '4', name: 'Emily Rodriguez', role: 'Marketing Director', company: 'GrowthCo', quote: 'Their AI solutions streamlined our entire marketing pipeline. Exceptional results.', rating: 5 },
  { id: '5', name: 'Michael Park', role: 'CTO', company: 'InnovateTech', quote: 'Best investment we made. The automation tools they delivered exceeded expectations.', rating: 5 },
];

export function TestimonialsSection() {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-custom">
        <SectionHeading 
          badge="Testimonials" 
          title={<>What Our <span className="gradient-text">Clients Say</span></>} 
        />
        
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative px-12"
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              dragFree: true,
            }}
            plugins={[autoplayPlugin.current]}
            className="w-full cursor-grab active:cursor-grabbing"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((t) => (
                <CarouselItem key={t.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <TestimonialCard testimonial={t} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-card/80 backdrop-blur-md border-white/10 hover:bg-card hover:border-primary/50 transition-all" />
            <CarouselNext className="right-0 bg-card/80 backdrop-blur-md border-white/10 hover:bg-card hover:border-primary/50 transition-all" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: {
    id: string;
    name: string;
    role: string;
    company: string;
    quote: string;
    rating: number;
  };
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <div className="relative h-full p-6 rounded-2xl bg-card/40 backdrop-blur-xl border border-white/10 hover:border-primary/30 transition-all duration-300 group overflow-hidden">
        {/* Gradient glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Quote icon */}
        <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Quote className="w-12 h-12 text-primary" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Stars */}
          <div className="flex gap-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star 
                key={i} 
                className="w-4 h-4 fill-primary text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]" 
              />
            ))}
          </div>
          
          {/* Quote */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            "{testimonial.quote}"
          </p>
          
          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-primary font-bold text-lg border border-white/10 shadow-lg">
              {testimonial.name[0]}
            </div>
            <div>
              <p className="font-semibold text-foreground">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </div>
        </div>
        
        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ padding: '1px', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor' }} />
      </div>
    </motion.div>
  );
}
