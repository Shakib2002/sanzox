import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { fadeUpVariants } from '@/hooks/useScrollAnimation';

const faqs = [
  { q: 'What services does SANZOX offer?', a: 'We specialize in AI Automation, YouTube Automation, Video Editing, Website Development, and Shopify solutions.' },
  { q: 'How long does a typical project take?', a: 'Project timelines vary based on scope. Most projects are completed within 2-8 weeks.' },
  { q: 'Do you offer ongoing support?', a: 'Yes! We provide 24/7 support and maintenance packages for all our solutions.' },
  { q: 'What is your pricing model?', a: 'We offer project-based and retainer pricing. Contact us for a custom quote.' },
];

export function FAQSection() {
  return (
    <section className="section-padding">
      <div className="container-custom max-w-3xl">
        <SectionHeading badge="FAQ" title={<>Ask <span className="gradient-text">Anything</span></>} />
        <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="glass-card border-none">
                <AccordionTrigger className="px-6 hover:no-underline text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
