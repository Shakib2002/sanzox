import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';

import {
  ArrowRight, CheckCircle2, Bot, Youtube, Video, Globe,
  Smartphone, Megaphone,
  Workflow, MessageSquareCode, BarChart3, Puzzle, LineChart,
  CalendarDays, UploadCloud, Search, LayoutDashboard, Image, TrendingUp,
  Scissors, Sparkles, Palette, Mic2, Captions, MonitorPlay,
  ShoppingBag, Zap, Settings2, PieChart, FileCode2, Rocket,
  Share2, MousePointerClick, Target, FileText, Activity,
  AppWindow, PenTool, ServerCog, Store, Shield,
} from 'lucide-react';

// Tool icon map — add more as needed
const toolIconMap: Record<string, React.ElementType> = {
  'Make.com': Workflow,
  'Zapier': Zap,
  'n8n': Puzzle,
  'OpenAI': Sparkles,
  'Python': FileCode2,
  'Airtable': LayoutDashboard,
  'TubeBuddy': TrendingUp,
  'VidIQ': BarChart3,
  'Notion': FileText,
  'Canva': Palette,
  'Descript': Mic2,
  'Premiere Pro': Scissors,
  'After Effects': Sparkles,
  'DaVinci Resolve': Palette,
  'Final Cut Pro': MonitorPlay,
  'React': AppWindow,
  'Next.js': Rocket,
  'TypeScript': FileCode2,
  'Tailwind CSS': PenTool,
  'Shopify': ShoppingBag,
  'Vercel': ServerCog,
  'Meta Ads Manager': Target,
  'Google Ads': MousePointerClick,
  'Google Analytics': Activity,
  'Ahrefs': Search,
  'SEMrush': LineChart,
  'Flutter': Smartphone,
  'Dart': FileCode2,
  'Firebase': Shield,
  'REST API': Puzzle,
  'Figma': PenTool,
};

const servicesData: Record<string, {
  icon: any;
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
    longDescription: 'We help businesses automate repetitive tasks, improve efficiency, and scale faster using AI-powered solutions tailored to your workflows.',
    features: ['Workflow Automation', 'AI Chatbots', 'Process Optimization', 'Data Analytics', 'Custom Integrations', 'Reporting Dashboards'],
    processSteps: [
      { title: 'Discovery', description: 'Analyze workflows and identify automation opportunities.' },
      { title: 'Design', description: 'Plan automation architecture and integrations.' },
      { title: 'Development', description: 'Build and test automation systems.' },
      { title: 'Deployment', description: 'Launch and monitor performance.' },
    ],
    tools: ['Make.com', 'Zapier', 'n8n', 'OpenAI', 'Python', 'Airtable'],
    faqs: [
      { q: 'What can be automated?', a: 'Almost any repetitive task like emails, data entry, and workflows.' },
      { q: 'How long does it take?', a: 'Usually 2–6 weeks depending on complexity.' },
    ],
  },
  'youtube-automation': {
    icon: Youtube,
    title: 'YouTube Automation',
    description: 'Grow your YouTube channel with automation systems.',
    longDescription: 'We build scalable systems for YouTube growth—from content planning to publishing and optimization.',
    features: ['Content Strategy', 'Upload Automation', 'SEO Optimization', 'Analytics Dashboard', 'Thumbnail Creation', 'Growth Systems'],
    processSteps: [
      { title: 'Audit', description: 'Analyze current channel performance.' },
      { title: 'Strategy', description: 'Create content & growth roadmap.' },
      { title: 'Automation', description: 'Set up publishing workflows.' },
      { title: 'Optimization', description: 'Improve based on analytics.' },
    ],
    tools: ['TubeBuddy', 'VidIQ', 'Make.com', 'Notion', 'Canva', 'Descript'],
    faqs: [
      { q: 'Will automation affect authenticity?', a: 'No, it only handles technical tasks.' },
      { q: 'Can you grow new channels?', a: 'Yes, from zero to scalable growth.' },
    ],
  },
  'video-editing': {
    icon: Video,
    title: 'Video Editing',
    description: 'Engaging and professional video editing.',
    longDescription: 'We create high-quality videos that capture attention and deliver your message effectively.',
    features: ['Professional Editing', 'Motion Graphics', 'Color Grading', 'Sound Design', 'Subtitles', 'Multi-format Export'],
    processSteps: [
      { title: 'Brief', description: 'Understand your requirements.' },
      { title: 'Editing', description: 'Create first draft.' },
      { title: 'Polish', description: 'Enhance visuals and audio.' },
      { title: 'Delivery', description: 'Final export and handover.' },
    ],
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro'],
    faqs: [
      { q: 'Turnaround time?', a: '3–5 business days.' },
      { q: 'Revisions?', a: 'Yes, 2–3 rounds included.' },
    ],
  },
  'website-development': {
    icon: Globe,
    title: 'Website Development',
    description: 'Modern websites that convert visitors.',
    longDescription: 'We design and develop high-performance websites including business sites, portfolios, and eCommerce platforms like Shopify.',
    features: ['Custom Design', 'Responsive Development', 'SEO Optimization', 'Performance Optimization', 'CMS Integration', 'Analytics Setup', 'Shopify Store Development', 'eCommerce Solutions'],
    processSteps: [
      { title: 'Discovery', description: 'Understand business goals.' },
      { title: 'Design', description: 'UI/UX and prototypes.' },
      { title: 'Development', description: 'Build website.' },
      { title: 'Launch', description: 'Deploy and optimize.' },
    ],
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Shopify', 'Vercel'],
    faqs: [
      { q: 'Project timeline?', a: '4–8 weeks.' },
      { q: 'Do you build Shopify stores?', a: 'Yes, fully customized Shopify solutions.' },
    ],
  },
  'digital-marketing': {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Grow your brand and reach your audience.',
    longDescription: 'We help businesses grow online through strategic digital marketing including social media, paid ads, and SEO.',
    features: ['Social Media Marketing', 'Facebook Ads', 'Google Ads', 'SEO', 'Content Marketing', 'Analytics & Reporting'],
    processSteps: [
      { title: 'Research', description: 'Market and competitor analysis.' },
      { title: 'Strategy', description: 'Create marketing plan.' },
      { title: 'Execution', description: 'Run campaigns.' },
      { title: 'Optimization', description: 'Improve results continuously.' },
    ],
    tools: ['Meta Ads Manager', 'Google Ads', 'Google Analytics', 'Ahrefs', 'SEMrush'],
    faqs: [
      { q: 'How fast can I see results?', a: 'Ads give fast results, SEO takes time (3–6 months).' },
      { q: 'Do you manage campaigns?', a: 'Yes, full campaign management included.' },
    ],
  },
  'flutter-app-development': {
    icon: Smartphone,
    title: 'Flutter App Development',
    description: 'Build high-performance cross-platform apps.',
    longDescription: 'We create fast and scalable mobile apps using Flutter for both Android and iOS platforms.',
    features: ['Cross-platform Apps', 'UI/UX Design', 'API Integration', 'Firebase Integration', 'App Deployment', 'Maintenance'],
    processSteps: [
      { title: 'Planning', description: 'Define app features and goals.' },
      { title: 'Design', description: 'UI/UX design.' },
      { title: 'Development', description: 'Build app with Flutter.' },
      { title: 'Launch', description: 'Publish to Play Store & App Store.' },
    ],
    tools: ['Flutter', 'Dart', 'Firebase', 'REST API', 'Figma'],
    faqs: [
      { q: 'Do you support both Android & iOS?', a: 'Yes, Flutter supports both platforms.' },
      { q: 'Do you provide maintenance?', a: 'Yes, ongoing support available.' },
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
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
        <div className="container-custom relative ">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              style={{
                background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.15), hsl(280 70% 55% / 0.15))',
                border: '1px solid hsl(217 91% 60% / 0.25)',
                color: 'hsl(217 91% 60%)',
              }}
            >
              <Icon size={32} />
            </div>
            <h1 className="text-2xl md:text-4xl mb-4">{service.title}</h1>
            <p className="text-md md:text-lg text-muted-foreground leading-relaxed">{service.longDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* ── What You Get ─────────────────────────────────── */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="heading-md mb-2">What you get</h2>
            <p className="text-muted-foreground">Everything included in this service.</p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {service.features.map((feature) => (
              <motion.div
                key={feature}
                variants={fadeUpVariants}
              >
                <GlassCard className="flex items-center gap-3 p-4 h-full group hover:border-primary/30 transition-colors">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                    style={{
                      background: 'hsl(217 91% 60% / 0.1)',
                      color: 'hsl(217 91% 60%)',
                    }}
                  >
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section className="py-16 bg-secondary/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-md mb-2">Our process</h2>
            <p className="text-muted-foreground">A clear, structured approach from start to finish.</p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6 relative"
          >
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-border/60 z-0" />

            {service.processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUpVariants}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold mb-4 border-2"
                  style={{
                    background: 'hsl(var(--background))',
                    borderColor: 'hsl(217 91% 60% / 0.4)',
                    color: 'hsl(217 91% 60%)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Tools We Use ─────────────────────────────────── */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="heading-md mb-2">Tools we use</h2>
            <p className="text-muted-foreground">Industry-standard tools for the best results.</p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {service.tools.map((tool) => {
              const ToolIcon = toolIconMap[tool] ?? Puzzle;
              return (
                <motion.div key={tool} variants={fadeUpVariants}>
                  <GlassCard className="flex flex-col items-center justify-center gap-3 p-5 text-center group hover:border-primary/30 transition-all hover:-translate-y-0.5 duration-200">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors"
                      style={{
                        background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.12), hsl(280 70% 55% / 0.12))',
                        border: '1px solid hsl(217 91% 60% / 0.2)',
                        color: 'hsl(217 91% 60%)',
                      }}
                    >
                      <ToolIcon size={20} />
                    </div>
                    <span className="text-sm font-medium leading-tight">{tool}</span>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────── */}
      <section className="py-16 bg-secondary/20">
        <div className="container-custom max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="heading-md mb-2">Frequently asked questions</h2>
            <p className="text-muted-foreground">Quick answers to common questions.</p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {service.faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass-card border-none rounded-xl overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline text-left font-medium text-sm">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center"
            style={{
              background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.08), hsl(280 70% 55% / 0.08))',
              border: '1px solid hsl(217 91% 60% / 0.2)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 50% at 50% 0%, hsl(217 91% 60% / 0.12), transparent)',
              }}
            />
            <div className="relative z-10">
              <h2 className="heading-lg mb-4">Ready to get started?</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Let's discuss how {service.title.toLowerCase()} can transform your business.
              </p>
              <Button
                size="lg"
                asChild
                className="btn-glow px-8 py-4 rounded-xl font-semibold text-base"
                style={{
                  background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(280 70% 55%))',
                  color: 'hsl(222 47% 6%)',
                  boxShadow: '0 0 30px hsl(217 91% 60% / 0.3)',
                }}
              >
                <Link to="/contact">
                  Get a quote <ArrowRight className="ml-2 h-5 w-5 inline" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}