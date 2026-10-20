import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Smartphone,
  Globe,
  Bot,
  Layers,
  ShoppingCart,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const services = [
  {
    id: 'android-development',
    icon: Smartphone,
    title: 'Android & Mobile App Development',
    description:
      'We build fast, reliable mobile apps that simplify everyday tasks and deliver better digital experiences.',
    features: [
      'Native Android Apps',
      'Flutter Development',
      'Custom UI Design',
      'Offline Support',
      'API Integration',
      'Google Play Publishing',
    ],
  },
  {
    id: 'saas-engineering',
    icon: Globe,
    title: 'SaaS & Web Application Development',
    description:
      'We develop custom web applications, SaaS platforms, and dashboards that streamline workflows and grow with your business.',
    features: [
      'Next.js & React',
      'Business Dashboards',
      'Authentication',
      'Subscription Systems',
      'API Development',
      'Cloud Deployment',
    ],
  },
  {
    id: 'ai-integrations',
    icon: Bot,
    title: 'AI Solutions & Integrations',
    description:
      'We integrate AI into apps and business workflows to automate tasks and build intelligent digital experiences.',
    features: [
      'OpenAI & Gemini',
      'AI Chatbots',
      'Workflow Automation',
      'AI-Powered Search',
      'Document Intelligence',
      'Custom AI Features',
    ],
  },
  {
    id: 'ecommerce-solutions',
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    description:
      'We build and customize online stores that help businesses sell products and deliver seamless shopping experiences.',
    features: [
      'Shopify Development',
      'Custom Storefronts',
      'Store Redesign',
      'Payment Integration',
      'Order Management',
      'Performance Optimization',
    ],
  },
  {
    id: 'design-systems',
    icon: Layers,
    title: 'UI/UX Design & Prototyping',
    description:
      'We design intuitive, modern interfaces that make digital products easier to use and visually consistent.',
    features: [
      'UI/UX Design',
      'Figma Prototypes',
      'Responsive Layouts',
      'Design Systems',
      'Motion & Interactions',
      'Accessibility',
    ],
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const Icon = service.icon;
  const number = String(index + 1).padStart(2, '0');
  const isOffset = index % 2 === 1;

  return (
    // Outer li: only handles the up/down offset (layout-level, no framer transform conflict)
    <li className={isOffset ? 'sm:translate-y-14' : ''}>
      {/* Inner motion.div: handles the reveal animation */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="h-full"
      >
        <Link
          to={`/services/${service.id}`}
          aria-label={`Explore ${service.title}`}
          className="group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.045] sm:min-h-[340px] sm:p-6"
        >
          {/* Background number */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-1 -top-3 select-none font-display text-[6.5rem] font-semibold leading-none tracking-[-0.09em] text-foreground/[0.045] transition-colors group-hover:text-primary/[0.12] sm:text-7xl"
          >
            {number}
          </span>

          {/* Icon */}
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.10] bg-white/[0.055] text-foreground transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
            <Icon size={20} strokeWidth={1.7} />
          </div>

          {/* Content */}
          <div className="relative mt-auto pt-9">
            <h3 className="pr-1 text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
              {service.title}
            </h3>

            <p className="mt-2.5 text-sm leading-6 text-muted-foreground">
              {service.description}
            </p>

            {/* Feature chips */}
            <ul className="mt-4 flex flex-wrap gap-1.5 pr-1">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-full border border-white/[0.08] bg-white/[0.035] px-2.5 py-1.5 text-[11px] leading-none text-muted-foreground transition-colors group-hover:border-white/[0.13] group-hover:text-foreground/80"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Arrow */}
          <span className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.10] bg-background/80 text-muted-foreground transition-all group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
            <ArrowUpRight size={16} />
          </span>
        </Link>
      </motion.div>
    </li>
  );
}

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-label="Our Services"
      className="section-padding relative isolate"
    >
      {/* Background effects (separate absolute layer, does not break sticky) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-[-12%] top-[15%] h-96 w-96 rounded-full bg-primary/[0.08] blur-[140px]" />
        <div className="absolute right-[-8%] top-[40%] h-80 w-80 rounded-full bg-white/[0.025] blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, black, transparent 85%)',
          }}
        />
      </div>

      {/* NOTE: no `items-start` here, so both columns stretch to the same height.
          That gives the left sticky wrapper room to stick while cards scroll. */}
      <div className="container-custom grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-12 xl:gap-16">
        {/* LEFT: Sticky content */}
        <div className="relative lg:self-stretch">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              badge="Our Services"
              title={
                <>
                  Everything you need
                  <br />
                  to build <span className="gradient-text">what's next</span>
                </>
              }
              description="From intelligent applications to scalable platforms, we build digital solutions that move your business forward."
              align="left"
            />

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                Let's build something
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <span className="text-sm text-muted-foreground">
                5 services · one team
              </span>
            </div>

            {/* Decorative shapes */}
            <div
              aria-hidden="true"
              className="mt-12 hidden items-end gap-2 2xl:flex"
            >
              <div className="h-20 w-20 rounded-tr-full bg-primary/[0.10]" />
              <div className="h-12 w-12 rounded-full bg-white/[0.045]" />
              <div className="h-16 w-16 rounded-t-full bg-primary/[0.07]" />
              <div className="h-9 w-9 rounded-tl-full bg-white/[0.04]" />
            </div>
          </div>
        </div>

        {/* RIGHT: Scrolling service cards (zigzag up/down) */}
        {/* sm:pb-14 leaves room for the translated (lowered) cards at the bottom */}
        <ul className="grid min-w-0 grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-4 sm:pb-14">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}