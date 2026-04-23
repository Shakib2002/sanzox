import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { fadeUpVariants } from '@/hooks/useScrollAnimation';

const faqs = [
  {
    q: 'What services does SANZOX offer?',
    a: 'SANZOX is a remote-first digital agency building modern solutions that help businesses grow faster and work smarter. Our core services include AI automation, YouTube automation, video editing, full-stack website development (CMS and custom), digital marketing, and Flutter app development. We focus on creating complete digital systems that improve efficiency, save time, and deliver measurable results.'
  },
  {
    q: 'How long does a typical project take?',
    a: 'Project timelines depend on the complexity, features, and scope of work. On average, most projects are completed within 2 to 8 weeks. Smaller projects like landing pages or automation setups can take a few days to a couple of weeks, while larger systems like full web platforms or custom dashboards may take longer. We always define clear milestones so you can track progress at every stage.'
  },
  {
    q: 'Why should I choose SANZOX over others?',
    a: 'SANZOX focuses on building results-driven digital systems rather than just delivering basic services. We combine automation, design, and development into one workflow to create scalable solutions. Our approach is transparent, milestone-based, and performance-oriented. Instead of just completing tasks, we focus on how your business can grow faster, operate smarter, and become more efficient through technology.'
  },
  {
    q: 'Do you offer ongoing support?',
    a: 'Yes, we provide ongoing support and maintenance depending on the project requirements. After delivery, we ensure your system runs smoothly, handle bug fixes if needed, and assist with updates or improvements. For long-term clients, we also offer continuous optimization and feature enhancements to keep your product updated and performing at its best.'
  },
  {
    q: 'What is your pricing model?',
    a: 'We offer flexible pricing models based on project scope and requirements. This includes one-time project-based pricing for fixed deliverables and retainer-based pricing for long-term collaboration or continuous work. Every project is unique, so we prefer discussing requirements first and then providing a customized quote that matches your goals and budget.'
  },
  {
    q: 'How do I start a project with you?',
    a: 'Starting a project with SANZOX is simple. You can contact us through our website or direct message with your idea or requirements. After that, we schedule a short discussion to understand your goals, suggest the best approach, and define the project scope. Once everything is clear, we finalize the timeline and begin development with proper milestones.'
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes, SANZOX works with both local and international clients. As a remote-first agency, we are built to collaborate across different time zones using modern communication and project management tools. This allows us to deliver high-quality work globally while maintaining smooth communication and transparency throughout the project.'
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
