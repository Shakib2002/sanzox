import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Bot, Globe, Smartphone, Layers } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';

const services = [
  {
    id: 'android-development',
    icon: Smartphone,
    title: 'Android & Mobile Development',
    description: 'High-performance native and cross-platform mobile applications engineered for security, speed, and seamless user experiences.',
    features: ['Native Android (Kotlin)', 'Cross-Platform (Flutter)', 'Material Design Systems', 'Offline-First Architecture', 'Firebase/Cloud Integration', 'App Store Publishing'],
  },
  {
    id: 'saas-engineering',
    icon: Globe,
    title: 'SaaS Platform Engineering',
    description: 'Custom multi-tenant Software-as-a-Service platforms built with scalable backend architectures, stripe billing, and modern dashboards.',
    features: ['Next.js & React Frontends', 'Multi-tenant DB Architectures', 'Stripe Billing & Subscriptions', 'JWT & OAuth Authentication', 'RESTful & GraphQL APIs', 'Cloud Hosting & CI/CD'],
  },
  {
    id: 'ai-integrations',
    icon: Bot,
    title: 'AI & LLM Integrations',
    description: 'Supercharge your mobile apps and SaaS products with cutting-edge artificial intelligence, custom chatbots, and vector search capabilities.',
    features: ['OpenAI / Gemini API Integration', 'Retrieval-Augmented Generation (RAG)', 'Vector DBs (Pinecone/pgvector)', 'Conversational Agents', 'Semantic Search Systems', 'Predictive Modeling'],
  },
  {
    id: 'design-systems',
    icon: Layers,
    title: 'UI/UX Design Systems',
    description: 'Interactive high-fidelity design prototypes, comprehensive design tokens, and state-of-the-art interactive component libraries.',
    features: ['Figma Design Systems', 'Interactive Prototyping', 'Responsive UI Layouts', 'Micro-interactions & Motion', 'Brand Identity Assets', 'Accessibility (A11y)'],
  },
];

function ServiceCard({ 
  service, 
  index, 
  isActive, 
  onToggle 
}: { 
  service: typeof services[0]; 
  index: number; 
  isActive: boolean;
  onToggle: () => void;
}) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      variants={fadeUpVariants}
      className="group relative"
    >
      {/* Gradient border glow on active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-[1px] bg-gradient-to-r from-primary/50 via-primary/20 to-primary/50 rounded-2xl blur-sm"
          />
        )}
      </AnimatePresence>

      <div
        onClick={onToggle}
        className={`relative glass-card cursor-pointer transition-all duration-500 hover:border-primary/30 overflow-hidden ${
          isActive ? 'border-primary/40' : ''
        }`}
      >
        <div className="flex items-start gap-6 p-6 md:p-8">
          {/* Large number */}
          <motion.div 
            className="hidden md:flex flex-shrink-0"
            animate={{ 
              scale: isActive ? 1.05 : 1,
              opacity: isActive ? 1 : 0.5 
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-5xl lg:text-6xl font-bold font-display gradient-text opacity-60 group-hover:opacity-100 transition-opacity">
              {number}
            </span>
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <service.icon size={24} />
                </motion.div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground hidden sm:block mt-1 line-clamp-1">
                    {service.description}
                  </p>
                </div>
              </div>
              
              <motion.div
                animate={{ rotate: isActive ? 90 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-muted-foreground group-hover:text-primary transition-colors"
              >
                <ChevronRight size={24} />
              </motion.div>
            </div>

            {/* Animated underline */}
            <motion.div 
              className="h-[2px] bg-gradient-to-r from-primary to-primary/50 mt-4 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 border-t border-border/30">
                <p className="text-muted-foreground mb-5 sm:hidden">
                  {service.description}
                </p>
                <motion.div 
                  className="flex flex-wrap gap-2 mb-5"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.05 }
                    }
                  }}
                >
                  {service.features.map((feature, i) => (
                    <motion.span
                      key={feature}
                      variants={{
                        hidden: { opacity: 0, y: 10, scale: 0.9 },
                        visible: { opacity: 1, y: 0, scale: 1 }
                      }}
                      className="px-4 py-1.5 rounded-full bg-secondary/80 border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    to={`/services/${service.id}`}
                    className="group/link inline-flex items-center gap-2 text-primary text-sm font-medium"
                  >
                    <span className="relative">
                      Learn more
                      <span className="absolute bottom-0 left-0 w-full h-px bg-primary scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left" />
                    </span>
                    <motion.span
                      className="inline-block"
                      whileHover={{ x: 4 }}
                    >
                      <ChevronRight size={16} />
                    </motion.span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative">
        <SectionHeading
          badge="Our Services"
          title={<>Solutions<span className="gradient-text"> We</span>  Deliver</>}
          description="End-to-end digital solutions designed to automate, scale, and transform your business."
        />

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-4"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isActive={activeIndex === index}
              onToggle={() => setActiveIndex(activeIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
