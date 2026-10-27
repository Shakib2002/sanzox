import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const services = [
  {
    id: 'android-development',
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

export function ServicesSection() {
  const [activeService, setActiveService] = useState(0);
  const active = services[activeService];
  const total = services.length;

  return (
    <section
      id="services"
      aria-label="Our Services"
      className="section-padding relative isolate"
    >
      {/* Subtle grid backdrop — no glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(to bottom, black, transparent 80%)',
          }}
        />
      </div>

      <SectionHeading
        badge="Our Services"
        title={
          <>
            Everything you need
            <br />
            to build <span className="text-muted-foreground">what&apos;s next</span>
          </>
        }
        align="center"
      />

      <div className="container-custom">
        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start lg:gap-16 xl:gap-24">
          {/* ───────────────────────── LEFT: list ───────────────────────── */}
          <div className="min-w-0">
            <ul className="border-t border-white/[0.10]">
              {services.map((service, index) => {
                const isActive = activeService === index;
                const number = String(index + 1).padStart(2, '0');

                return (
                  <li
                    key={service.id}
                    className={`relative border-b transition-colors duration-300 ${
                      isActive ? 'border-white/[0.18]' : 'border-white/[0.08]'
                    }`}
                  >
                    {/* Active left indicator */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-0 h-full w-[2px] bg-primary transition-all duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setActiveService(index)}
                      aria-expanded={isActive}
                      aria-controls={`service-panel-${service.id}`}
                      className="group flex w-full items-start gap-5 py-6 pl-5 pr-2 text-left sm:gap-7 sm:py-7"
                    >
                      <span
                        className={`mt-1 shrink-0 font-display text-xs tabular-nums tracking-widest transition-colors duration-300 ${
                          isActive
                            ? 'text-primary'
                            : 'text-muted-foreground/50 group-hover:text-foreground/70'
                        }`}
                      >
                        {number}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`block text-base font-medium leading-snug tracking-tight transition-colors duration-300 sm:text-lg ${
                            isActive
                              ? 'text-foreground'
                              : 'text-foreground/65 group-hover:text-foreground'
                          }`}
                        >
                          {service.title}
                        </span>

                        {isActive && (
                          <span className="mt-3 block max-w-xl text-sm leading-7 text-muted-foreground">
                            {service.description}
                          </span>
                        )}
                      </span>

                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isActive
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-white/[0.10] text-muted-foreground group-hover:border-white/[0.22] group-hover:text-foreground'
                        }`}
                      >
                        {isActive ? (
                          <ArrowRight size={15} strokeWidth={2} />
                        ) : (
                          <ArrowUpRight
                            size={15}
                            strokeWidth={1.7}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* CTA row */}
            {/* <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 pl-5">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                Let&apos;s build something
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {total} services · one team
              </span>
            </div> */}
          </div>

          {/* ───────────────────────── RIGHT: sticky panel ───────────────────────── */}
          <div className="relative min-w-0 lg:sticky lg:top-28">
            <div
              id={`service-panel-${active.id}`}
              role="region"
              aria-label={`${active.title} details`}
              className="overflow-hidden rounded-3xl border border-white/[0.10] bg-white/[0.02]"
            >
              {/* Header: eyebrow + counter */}
              <div className="flex items-start justify-between gap-6 border-b border-white/[0.08] px-6 py-5 sm:px-8">
                <div className="min-w-0">
                  <span className="text-[11px] font-medium uppercase tracking-[0.20em] text-muted-foreground">
                    Selected service
                  </span>
                  <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
                    {active.title}
                  </h3>
                </div>

                <span className="shrink-0 font-display text-sm tabular-nums text-muted-foreground">
                  <span className="text-foreground">
                    {String(activeService + 1).padStart(2, '0')}
                  </span>
                  <span className="mx-1 text-muted-foreground/40">/</span>
                  {String(total).padStart(2, '0')}
                </span>
              </div>

              {/* Body */}
              <div className="px-6 py-6 sm:px-8 sm:py-7">
                <p className="max-w-prose text-sm leading-7 text-muted-foreground">
                  {active.description}
                </p>

                <div className="mt-6">
                  <span className="text-[11px] font-medium uppercase tracking-[0.20em] text-muted-foreground">
                    Capabilities
                  </span>

                  <ul
                    className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-2"
                    aria-live="polite"
                  >
                    {active.features.map((feature, i) => (
                      <li
                        key={feature}
                        className={`flex items-center gap-2.5 py-2.5 text-sm text-foreground/80 ${
                          i > 0 ? 'border-t border-white/[0.06]' : ''
                        } ${i >= 2 ? 'sm:border-t sm:border-white/[0.06]' : 'sm:border-t-0'}`}
                      >
                        <Check
                          size={14}
                          strokeWidth={2}
                          className="shrink-0 text-primary/80"
                        />
                        <span className="truncate">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-white/[0.08] px-6 py-4 sm:px-8">
                <Link
                  to={`/services/${active.id}`}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  Explore More
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}