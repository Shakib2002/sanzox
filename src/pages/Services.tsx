import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Globe, Smartphone, Layers, CheckCircle2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';
import { CTASection } from '@/components/sections/CTASection';
import heroServicesImage from '@/assets/hero-services.jpg';

const services = [
  {
    id: 'android-development',
    icon: Smartphone,
    title: 'Android & Mobile Development',
    description: 'High-performance native and cross-platform mobile applications engineered for security, speed, and seamless user experiences.',
    features: ['Native Android (Kotlin)', 'Cross-Platform (Flutter)', 'Material Design Systems', 'Offline-First Architecture', 'Firebase/Cloud Integration', 'App Store Publishing'],
    benefits: ['Smooth 60fps performance', 'Offline caching & local database', 'Optimized resource & battery usage'],
  },
  {
    id: 'saas-engineering',
    icon: Globe,
    title: 'SaaS Platform Engineering',
    description: 'Custom multi-tenant Software-as-a-Service platforms built with scalable backend architectures, stripe billing, and modern dashboards.',
    features: ['Next.js & React Frontends', 'Multi-tenant DB Architectures', 'Stripe Billing & Subscriptions', 'JWT & OAuth Authentication', 'RESTful & GraphQL APIs', 'Cloud Hosting & CI/CD'],
    benefits: ['Sub-second page loads', 'Secure financial operations', 'Fully scalable infrastructure'],
  },
  {
    id: 'ai-integrations',
    icon: Bot,
    title: 'AI & LLM Integrations',
    description: 'Supercharge your mobile apps and SaaS products with cutting-edge artificial intelligence, custom chatbots, and vector search capabilities.',
    features: ['OpenAI / Gemini API Integration', 'Retrieval-Augmented Generation (RAG)', 'Vector DBs (Pinecone/pgvector)', 'Conversational Agents', 'Semantic Search Systems', 'Predictive Modeling'],
    benefits: ['Automated complex tasks', 'Personalized user experiences', 'Semantic search precision'],
  },
  {
    id: 'design-systems',
    icon: Layers,
    title: 'UI/UX Design Systems',
    description: 'Interactive high-fidelity design prototypes, comprehensive design tokens, and state-of-the-art interactive component libraries.',
    features: ['Figma Design Systems', 'Interactive Prototyping', 'Responsive UI Layouts', 'Micro-interactions & Motion', 'Brand Identity Assets', 'Accessibility (A11y)'],
    benefits: ['Premium design feeling', 'Accelerated development handover', 'Higher user conversion rates'],
  },
];

export default function ServicesPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
        {/* Hero background image */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src={heroServicesImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              Our Services
            </span>
            <h1 className="heading-xl mb-6">
              End-to-End <span className="gradient-text">Digital Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              From AI automation to stunning websites, we provide comprehensive services 
              designed to automate, scale, and transform your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={fadeUpVariants}
                className="grid lg:grid-cols-2 gap-8 items-center"
              >
                {/* Content - alternating sides */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <service.icon size={24} />
                    </div>
                    <h2 className="heading-md">{service.title}</h2>
                  </div>
                  <p className="text-muted-foreground text-lg mb-6">
                    {service.description}
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button asChild>
                    <Link to={`/services/${service.id}`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Visual Card */}
                <GlassCard className={`${index % 2 === 1 ? 'lg:order-1' : ''} p-8`}>
                  <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    Key Benefits
                  </h4>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
