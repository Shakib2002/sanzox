import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Bot, Youtube, Video, Globe, ShoppingBag } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';

const servicesData: Record<string, {
  icon: typeof Bot;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  processSteps: { title: string; description: string }[];
  tools: string[];
  faqs: { q: string; a: string }[];
}> = {
  'ai-automation': {
    icon: Bot,
    title: 'AI Automation',
    description: 'Streamline operations with intelligent automation.',
    longDescription: 'Our AI automation services help businesses eliminate repetitive tasks, reduce human error, and scale operations. We build custom solutions using cutting-edge AI technologies to transform your workflows.',
    features: ['Workflow Automation', 'AI Chatbots', 'Process Optimization', 'Data Analytics', 'Custom Integrations', 'Reporting Dashboards'],
    processSteps: [
      { title: 'Discovery', description: 'We analyze your current workflows and identify automation opportunities.' },
      { title: 'Design', description: 'Create detailed automation blueprints and integration plans.' },
      { title: 'Development', description: 'Build and test your custom automation solutions.' },
      { title: 'Deployment', description: 'Launch and monitor your automated systems.' },
    ],
    tools: ['Make.com', 'Zapier', 'n8n', 'OpenAI', 'Python', 'Airtable'],
    faqs: [
      { q: 'What types of processes can be automated?', a: 'Almost any repetitive task can be automated—from data entry and email responses to complex multi-step workflows.' },
      { q: 'How long does implementation take?', a: 'Typical automation projects take 2-6 weeks depending on complexity.' },
    ],
  },
  'youtube-automation': {
    icon: Youtube,
    title: 'YouTube Automation',
    description: 'Scale your YouTube presence with automated systems.',
    longDescription: 'We help creators and businesses build sustainable YouTube growth systems. From content planning to upload automation, we handle the technical side so you can focus on creating.',
    features: ['Content Strategy', 'Upload Automation', 'Analytics Dashboard', 'Growth Systems', 'SEO Optimization', 'Thumbnail Generation'],
    processSteps: [
      { title: 'Audit', description: 'Analyze your current channel performance and content strategy.' },
      { title: 'Strategy', description: 'Develop a data-driven content and growth plan.' },
      { title: 'Automation', description: 'Build automated workflows for scheduling and publishing.' },
      { title: 'Optimization', description: 'Continuous improvement based on analytics.' },
    ],
    tools: ['TubeBuddy', 'VidIQ', 'Make.com', 'Notion', 'Canva', 'Descript'],
    faqs: [
      { q: 'Will automation affect my channel authenticity?', a: 'No—automation handles logistics while you focus on authentic content creation.' },
      { q: 'Can you help with existing channels?', a: 'Yes! We work with both new and established channels.' },
    ],
  },
  'video-editing': {
    icon: Video,
    title: 'Video Editing',
    description: 'Professional video editing that captivates audiences.',
    longDescription: 'Our video editing team delivers polished, engaging content that tells your brand story. From quick social clips to full production, we bring your vision to life.',
    features: ['Professional Editing', 'Motion Graphics', 'Color Grading', 'Sound Design', 'Subtitles & Captions', 'Multi-format Export'],
    processSteps: [
      { title: 'Brief', description: 'Understand your vision, style, and requirements.' },
      { title: 'Edit', description: 'First cut with structure, pacing, and key elements.' },
      { title: 'Polish', description: 'Color grading, audio mixing, and motion graphics.' },
      { title: 'Deliver', description: 'Final export in all required formats.' },
    ],
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro', 'Audition', 'Figma'],
    faqs: [
      { q: 'What is the typical turnaround time?', a: 'Standard projects are completed in 3-5 business days.' },
      { q: 'Do you offer revisions?', a: 'Yes, all packages include 2-3 revision rounds.' },
    ],
  },
  'website-development': {
    icon: Globe,
    title: 'Website Development',
    description: 'Custom websites that convert visitors into customers.',
    longDescription: 'We build fast, beautiful, and conversion-optimized websites using modern technologies. Every site is custom-designed to reflect your brand and achieve your business goals.',
    features: ['Custom Design', 'Responsive Development', 'SEO Optimization', 'Performance', 'CMS Integration', 'Analytics Setup'],
    processSteps: [
      { title: 'Discovery', description: 'Understand your brand, goals, and target audience.' },
      { title: 'Design', description: 'Create wireframes and high-fidelity mockups.' },
      { title: 'Development', description: 'Build responsive, performant website.' },
      { title: 'Launch', description: 'Testing, optimization, and deployment.' },
    ],
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel'],
    faqs: [
      { q: 'How long does a website project take?', a: 'Typical websites take 4-8 weeks from start to launch.' },
      { q: 'Do you provide hosting?', a: 'Yes, we set up and manage hosting on modern platforms like Vercel.' },
    ],
  },
  'shopify': {
    icon: ShoppingBag,
    title: 'Shopify Development',
    description: 'End-to-end Shopify solutions for eCommerce success.',
    longDescription: 'From store setup to conversion optimization, we help you build and scale profitable Shopify stores. Our team handles design, development, and integrations.',
    features: ['Store Setup', 'Theme Customization', 'App Integration', 'Conversion Optimization', 'Payment Setup', 'Inventory Management'],
    processSteps: [
      { title: 'Strategy', description: 'Define your store structure and product catalog.' },
      { title: 'Design', description: 'Custom theme design matching your brand.' },
      { title: 'Build', description: 'Development, app setup, and integrations.' },
      { title: 'Launch', description: 'Testing, training, and go-live support.' },
    ],
    tools: ['Shopify', 'Liquid', 'Figma', 'Klaviyo', 'Judge.me', 'ShipStation'],
    faqs: [
      { q: 'Can you migrate from another platform?', a: 'Yes! We handle migrations from WooCommerce, Magento, and other platforms.' },
      { q: 'Do you offer ongoing support?', a: 'Yes, we offer monthly maintenance and support packages.' },
    ],
  },
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? servicesData[slug] : null;

  if (!service) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Service Not Found</h1>
            <Button asChild><Link to="/services">View All Services</Link></Button>
          </div>
        </div>
      </Layout>
    );
  }

  const Icon = service.icon;

  return (
    <Layout>
      <SEOHead 
        title={`${service.title} | SANZOX`}
        description={service.longDescription}
      />
      {/* Hero */}
      <section className="pt-20 pb-16 relative">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
        <div className="container-custom relative">
          <Link to="/services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
              <Icon size={32} />
            </div>
            <h1 className="heading-xl mb-4">{service.title}</h1>
            <p className="text-xl text-muted-foreground">{service.longDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="heading-md mb-8">What You Get</h2>
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.features.map((feature) => (
              <GlassCard key={feature} variants={fadeUpVariants} className="flex items-center gap-3 p-4">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span>{feature}</span>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-secondary/20">
        <div className="container-custom">
          <h2 className="heading-md mb-8 text-center">Our Process</h2>
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-4 gap-6">
            {service.processSteps.map((step, i) => (
              <motion.div key={step.title} variants={fadeUpVariants} className="relative">
                <div className="text-5xl font-bold text-primary/20 mb-2">0{i + 1}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="heading-md mb-8">Tools We Use</h2>
          <div className="flex flex-wrap gap-3">
            {service.tools.map((tool) => (
              <span key={tool} className="px-4 py-2 rounded-full bg-secondary text-foreground">{tool}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-secondary/20">
        <div className="container-custom max-w-3xl">
          <h2 className="heading-md mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {service.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass-card border-none">
                <AccordionTrigger className="px-6 hover:no-underline text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">Let's discuss how {service.title.toLowerCase()} can transform your business.</p>
          <Button size="lg" asChild className="btn-glow">
            <Link to="/contact">Get a Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
