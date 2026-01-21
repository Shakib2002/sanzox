import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Bot, Youtube, Video, Globe, ShoppingBag } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';

const services = [
  {
    id: 'ai-automation',
    icon: Bot,
    title: 'AI Automation',
    description: 'Streamline your operations with intelligent automation solutions that save time and boost efficiency.',
    features: ['Workflow Automation', 'AI Chatbots', 'Process Optimization', 'Data Analytics'],
  },
  {
    id: 'youtube-automation',
    icon: Youtube,
    title: 'YouTube Automation',
    description: 'Scale your YouTube presence with automated content strategies, scheduling, and growth systems.',
    features: ['Content Strategy', 'Upload Automation', 'Analytics Dashboard', 'Growth Systems'],
  },
  {
    id: 'video-editing',
    icon: Video,
    title: 'Video Editing',
    description: 'Professional video editing that captivates your audience and tells your brand story.',
    features: ['Professional Editing', 'Motion Graphics', 'Color Grading', 'Sound Design'],
  },
  {
    id: 'website-development',
    icon: Globe,
    title: 'Website Development',
    description: 'Custom websites built with modern technologies that convert visitors into customers.',
    features: ['Custom Design', 'Responsive Development', 'SEO Optimization', 'Performance'],
  },
  {
    id: 'shopify',
    icon: ShoppingBag,
    title: 'Shopify Development',
    description: 'End-to-end Shopify solutions that help you launch and scale your eCommerce business.',
    features: ['Store Setup', 'Theme Customization', 'App Integration', 'Conversion Optimization'],
  },
];

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          badge="Our Services"
          title={<>What We <span className="gradient-text">Specialize</span> In</>}
          description="End-to-end digital solutions designed to automate, scale, and transform your business."
        />

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-4"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={fadeUpVariants}
              className="group"
            >
              <div
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="glass-card cursor-pointer transition-all duration-300 hover:border-primary/30"
              >
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <service.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground hidden sm:block">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-muted-foreground"
                  >
                    <ChevronRight size={24} />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-border/50">
                        <p className="text-muted-foreground mb-4 sm:hidden">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {service.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <Link
                          to={`/services/${service.id}`}
                          className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
                        >
                          Learn more
                          <ChevronRight size={16} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
