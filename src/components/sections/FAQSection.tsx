import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { fadeUpVariants } from '@/hooks/useScrollAnimation';

const faqs = [
  {
    q: "What services does SANZOX offer?",
    a: "SANZOX builds AI-powered software, SaaS platforms, mobile apps, and automation systems to help businesses scale and operate more efficiently."
  },
  {
    q: "How long does a typical project take?",
    a: "Most projects take 2–8 weeks depending on scope. Smaller builds are faster, while complex systems follow milestone-based delivery."
  },
  {
    q: "Why should I choose SANZOX?",
    a: "We focus on building scalable, automation-driven systems that deliver real business impact, not just basic development work."
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes. We provide maintenance, updates, bug fixes, and long-term optimization based on your project needs."
  },
  {
    q: "What is your pricing model?",
    a: "We offer fixed project pricing and long-term retainer options based on scope and requirements."
  },
  {
    q: "How do I start a project?",
    a: "Just share your idea. We’ll discuss requirements, suggest the best solution, and start with a clear roadmap."
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We are a remote-first team working globally with smooth communication and structured delivery."
  },
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
