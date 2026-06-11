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
  Smartphone, Megaphone, Layers,
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
  'android-development': {
    icon: Smartphone,
    title: 'Android & Mobile Development',
    description: 'High-performance native and cross-platform mobile applications engineered for security, speed, and seamless user experiences.',
    longDescription: 'We engineer high-performance, secure, and native-feeling Android and cross-platform applications using Kotlin, Jetpack Compose, and Flutter. Our team designs offline-first architectures and clean component APIs to ensure your mobile app runs perfectly on all devices.',
    features: ['Native Android (Kotlin)', 'Cross-Platform (Flutter)', 'Material Design Systems', 'Offline-First Architecture', 'Firebase/Cloud Integration', 'App Store Publishing'],
    processSteps: [
      { title: 'Discovery', description: 'Analyze app requirements, feature scope, and target audience.' },
      { title: 'UI/UX Design', description: 'Create interactive Figma prototypes and screen flows.' },
      { title: 'Development', description: 'Write clean, robust code with Kotlin and Flutter.' },
      { title: 'Testing & Launch', description: 'Execute thorough QA testing and publish to Google Play Store.' },
    ],
    tools: ['Flutter', 'Dart', 'Firebase', 'REST API', 'Figma'],
    faqs: [
      { q: 'Do you support native development?', a: 'Yes, we specialize in native Android development using Kotlin and Jetpack Compose for optimal performance.' },
      { q: 'Do you handle app store deployment?', a: 'Absolutely. We guide you through the developer account setup and handle the entire publishing and approval process.' },
    ],
  },
  'saas-engineering': {
    icon: Globe,
    title: 'SaaS Platform Engineering',
    description: 'Custom multi-tenant Software-as-a-Service platforms built with scalable backend architectures, stripe billing, and modern dashboards.',
    longDescription: 'We architect and build scalable SaaS products featuring custom dashboards, multi-tenant database designs, Stripe subscription billing, and seamless API integrations. Our solutions are deployed using modern cloud pipelines to auto-scale dynamically.',
    features: ['Next.js & React Frontends', 'Multi-tenant DB Architectures', 'Stripe Billing & Subscriptions', 'JWT & OAuth Authentication', 'RESTful & GraphQL APIs', 'Cloud Hosting & CI/CD'],
    processSteps: [
      { title: 'Requirements', description: 'Define system architecture, user roles, and monetization models.' },
      { title: 'UX/UI Design', description: 'Design dashboards and user interfaces with Figma.' },
      { title: 'Backend & API', description: 'Build scalable database models and secure REST/GraphQL endpoints.' },
      { title: 'Frontend & Launch', description: 'Assemble responsive frontend components and deploy to production.' },
    ],
    tools: ['React', 'Next.js', 'TypeScript', 'Supabase', 'Vercel'],
    faqs: [
      { q: 'How do you handle payments?', a: 'We integrate Stripe billing for flexible subscriptions, coupon codes, and automated invoicing.' },
      { q: 'Is the infrastructure scalable?', a: 'Yes, we deploy on serverless hosting (Vercel, AWS, or Supabase) which auto-scales according to user demand.' },
    ],
  },
  'ai-integrations': {
    icon: Bot,
    title: 'AI & LLM Integrations',
    description: 'Supercharge your mobile apps and SaaS products with cutting-edge artificial intelligence, custom chatbots, and vector search capabilities.',
    longDescription: 'We integrate cutting-edge artificial intelligence, custom conversational LLM agents, and Retrieval-Augmented Generation (RAG) directly into your SaaS and mobile apps. We leverage OpenAI, Gemini, and vector databases for semantic reasoning.',
    features: ['OpenAI / Gemini API Integration', 'Retrieval-Augmented Generation (RAG)', 'Vector DBs (Pinecone/pgvector)', 'Conversational Agents', 'Semantic Search Systems', 'Predictive Modeling'],
    processSteps: [
      { title: 'Consultation', description: 'Identify AI use-cases, datasets, and feasibility study.' },
      { title: 'Data Prep', description: 'Clean database records and generate vector embeddings.' },
      { title: 'Integration', description: 'Implement LLM models and retrieval mechanisms.' },
      { title: 'Refinement', description: 'Fine-tune prompts, implement safety guardrails, and optimize token costs.' },
    ],
    tools: ['OpenAI', 'Python', 'Supabase', 'REST API'],
    faqs: [
      { q: 'What is RAG?', a: 'Retrieval-Augmented Generation lets AI reference your custom company docs or database to give exact, accurate answers without hallucinations.' },
      { q: 'How do we control API costs?', a: 'We implement caching and model routing strategies to minimize token usage and keep operating costs extremely low.' },
    ],
  },
  'design-systems': {
    icon: Layers,
    title: 'UI/UX Design Systems',
    description: 'Interactive high-fidelity design prototypes, comprehensive design tokens, and state-of-the-art interactive component libraries.',
    longDescription: 'We build modern Figma design systems, interactive prototypes, and component libraries that bridge the gap between design and development, ensuring a premium feel and consistent branding.',
    features: ['Figma Design Systems', 'Interactive Prototyping', 'Responsive UI Layouts', 'Micro-interactions & Motion', 'Brand Identity Assets', 'Accessibility (A11y)'],
    processSteps: [
      { title: 'Wireframing', description: 'Create low-fidelity user flow layouts.' },
      { title: 'Visual System', description: 'Define brand typography, color palettes, and icons.' },
      { title: 'Component Library', description: 'Construct reusable Figma components and variables.' },
      { title: 'Handover', description: 'Provide fully documented assets ready for development implementation.' },
    ],
    tools: ['Figma', 'React', 'Tailwind CSS'],
    faqs: [
      { q: 'What is a design system?', a: 'A set of design tokens and reusable UI components that ensure consistency across all web and mobile platforms.' },
      { q: 'How do you deliver design work?', a: 'We provide Figma files with organized variables, component structures, and developer-friendly export specs.' },
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