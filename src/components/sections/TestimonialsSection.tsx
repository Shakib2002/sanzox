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

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

export function TestimonialsSection() {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-custom">
        <SectionHeading
          badge="Testimonials"
          title={<>What our <span className="gradient-text">clients say</span></>}
        />

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <Carousel
            opts={{ align: 'start', loop: true, dragFree: true }}
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

            <CarouselPrevious className="left-0 bg-background/80 backdrop-blur-md border-border/40 hover:border-primary/40 transition-all" />
            <CarouselNext className="right-0 bg-background/80 backdrop-blur-md border-border/40 hover:border-primary/40 transition-all" />
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
    <div className="h-full p-6 rounded-2xl border border-border/40 bg-secondary/20 hover:border-border/70 hover:bg-secondary/30 transition-all duration-300 flex flex-col gap-5">

      {/* Stars + quote icon row */}
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-amber-400 text-amber-400"
            />
          ))}
        </div>
        <Quote className="w-6 h-6 text-border/60" />
      </div>

      {/* Quote */}
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-border/30">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
          style={{
            background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.15), hsl(280 70% 55% / 0.15))',
            border: '1px solid hsl(217 91% 60% / 0.25)',
            color: 'hsl(217 91% 60%)',
          }}
        >
          {getInitials(testimonial.name)}
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}