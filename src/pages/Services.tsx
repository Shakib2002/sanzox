import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Youtube, Video, Globe, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';
import { CTASection } from '@/components/sections/CTASection';

const services = [
  {
    id: 'ai-automation',
    icon: Bot,
    title: 'AI Automation',
    description: 'Streamline your operations with intelligent automation solutions that save time and boost efficiency.',
    features: ['Workflow Automation', 'AI Chatbots', 'Process Optimization', 'Data Analytics', 'Custom Integrations', 'Reporting Dashboards'],
    benefits: ['Save 20+ hours per week', 'Reduce human error by 90%', 'Scale operations effortlessly'],
  },
  {
    id: 'youtube-automation',
    icon: Youtube,
    title: 'YouTube Automation',
    description: 'Scale your YouTube presence with automated content strategies, scheduling, and growth systems.',
    features: ['Content Strategy', 'Upload Automation', 'Analytics Dashboard', 'Growth Systems', 'SEO Optimization', 'Thumbnail Generation'],
    benefits: ['Consistent upload schedule', 'Data-driven content decisions', 'Faster channel growth'],
  },
  {
    id: 'video-editing',
    icon: Video,
    title: 'Video Editing',
    description: 'Professional video editing that captivates your audience and tells your brand story.',
    features: ['Professional Editing', 'Motion Graphics', 'Color Grading', 'Sound Design', 'Subtitles & Captions', 'Multi-format Export'],
    benefits: ['Engaging content', 'Brand consistency', 'Quick turnaround'],
  },
  {
    id: 'website-development',
    icon: Globe,
    title: 'Website Development',
    description: 'Custom websites built with modern technologies that convert visitors into customers.',
    features: ['Custom Design', 'Responsive Development', 'SEO Optimization', 'Performance', 'CMS Integration', 'Analytics Setup'],
    benefits: ['Higher conversion rates', 'Better user experience', 'Faster load times'],
  },
  {
    id: 'shopify',
    icon: ShoppingBag,
    title: 'Shopify Development',
    description: 'End-to-end Shopify solutions that help you launch and scale your eCommerce business.',
    features: ['Store Setup', 'Theme Customization', 'App Integration', 'Conversion Optimization', 'Payment Setup', 'Inventory Management'],
    benefits: ['Launch faster', 'Increase sales', 'Reduce cart abandonment'],
  },
];

export default function ServicesPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-20 pb-16 relative">
        <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
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
