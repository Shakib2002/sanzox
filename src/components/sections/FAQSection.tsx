import { motion } from 'framer-motion';
import { Mail, MessageCircleQuestion, ArrowUpRight, Sparkles } from 'lucide-react';
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
    a: "Just share your idea. We'll discuss requirements, suggest the best solution, and start with a clear roadmap."
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We are a remote-first team working globally with smooth communication and structured delivery."
  },
];

export function FAQSection() {
  return (
    <section className="section-padding">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20 lg:px-10">

        {/* LEFT — sticky info panel */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            badge="FAQ"
            title={<>Curious About <span className="text-muted-foreground">SANZOX?</span></>}
            align="left"
          />

          <p className="-mt-10 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            From intelligent products to tailored digital solutions, find the clarity you need to take the next step.
          </p>

          {/* Contact card */}
          <div className="relative mt-10 max-w-md overflow-hidden rounded-3xl rounded-tr-[3rem] bg-secondary/40 p-6 ring-1 ring-border/50">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background text-primary ring-1 ring-border/40">
                <MessageCircleQuestion className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">Still have a question?</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  We reply within one business day.
                </p>
              </div>
            </div>

            <a
              href="mailto:hello.sanzox@gmail.com"
              className="group mt-5 inline-flex w-full items-center justify-between gap-2.5 rounded-2xl bg-background px-4 py-3 text-sm font-medium ring-1 ring-border/40 transition-all hover:ring-primary/40 hover:shadow-sm"
            >
              <span className="inline-flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary" />
                hello.sanzox@gmail.com
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </a>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Avg. response time: under 24 hours</span>
            </div>
          </div>
        </div>

        {/* RIGHT — accordion list */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="group/item mb-2 rounded-2xl border border-border/40 bg-card/40 px-5 transition-colors duration-300 hover:border-primary/30 hover:bg-card/70 data-[state=open]:border-primary/30 data-[state=open]:bg-card/80"
              >
                <AccordionTrigger className="flex w-full items-center gap-4 py-4 text-left hover:no-underline [&>svg]:transition-transform [&>svg]:duration-300">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/60 text-xs font-semibold text-muted-foreground transition-colors group-hover/item:bg-primary/10 group-hover/item:text-primary group-data-[state=open]/item:bg-primary/15 group-data-[state=open]/item:text-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-base font-semibold tracking-tight transition-colors duration-300 group-hover/item:text-primary group-data-[state=open]/item:text-primary sm:text-lg">
                    {faq.q}
                  </span>
                </AccordionTrigger>

                <AccordionContent className="pb-5 pl-11 pr-4 text-[15px] leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}