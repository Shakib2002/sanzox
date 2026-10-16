
import { FadeIn } from './FadeIn';
import { productPageContainerClass, productSectionTitleClass } from './productStyles';

const stats = [
  { label: "Products Built", value: "10+" },
  { label: "AI-Powered Solutions", value: "05+" },
  { label: "Focus on Productivity", value: "100%" },
];

const features = [
  {
    number: "01",
    icon: "✳",
    title: "AI-Powered Experience",
    description:
      "Smart features designed to simplify everyday tasks and help you get more done.",
  },
  {
    number: "02",
    icon: "◇",
    title: "Built Around You",
    description:
      "Intuitive interfaces and thoughtful experiences that make technology feel effortless.",
  },
  {
    number: "03",
    icon: "↗",
    title: "Designed for Productivity",
    description:
      "Practical digital tools that help you stay organized, focused, and efficient.",
  },
  {
    number: "04",
    icon: "∞",
    title: "Always Evolving",
    description:
      "We continuously improve our products to deliver better, more useful experiences.",
  },
];

export default function WhyOurApp() {
  return (
    <section
      id="why-our-app"
      className="bg-[#080808] py-16 text-white sm:py-20 lg:py-24"
    >
      <div className={productPageContainerClass}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <FadeIn className="flex flex-col">
            <div>
              <p className="mb-5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 border border-white/20 max-w-fit rounded-full px-3 py-1">
    
                Why Our App
              </p>

              <h2 className={`max-w-xl ${productSectionTitleClass}`}>
               Smarter Apps. 
                <span className="block text-neutral-400">
                  Better Experiences.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-neutral-400 sm:text-base">
                SANZOX builds intelligent digital products that
                make everyday work simpler, help people stay
                focused, and turn complex tasks into effortless
                experiences.
              </p>

              {/* <a
                href="#our-products"
                className="mt-7 inline-flex items-center gap-4 rounded-full bg-white px-5 py-3 text-xs font-medium text-black transition-colors hover:bg-neutral-200"
              >
                Explore Our Products
                <span aria-hidden="true">→</span>
              </a> */}
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-1 border-t border-white/10 sm:mt-auto sm:pt-12">
              {stats.map((stat, index) => (
                <FadeIn
                  key={stat.label}
                  delay={index * 0.08}
                  className="flex items-center justify-between gap-4 border-b border-white/10 py-5"
                >
                  <span className="text-sm font-medium">
                    {stat.label}
                  </span>
                  <span className="text-xl font-medium">
                    {stat.value}
                  </span>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          {/* Right content */}
          <div>
            {/* Main image */}
            <FadeIn className="group relative aspect-[1.65/1] overflow-hidden rounded-xl border border-white/10 bg-[#141414]">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85"
                alt="Modern digital product development workspace"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 text-white sm:bottom-7 sm:left-7">
                <p className="text-[9px] uppercase tracking-[0.22em] text-white/75">
                  Built with purpose
                </p>
                <p className="mt-2 text-2xl font-medium sm:text-3xl">
                  Meet SANZOX
                </p>
              </div>
            </FadeIn>

            {/* Feature grid */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2">
              {features.map((feature, index) => (
                <FadeIn
                  key={feature.number}
                  delay={index * 0.06}
                  className={`border-white/10 py-6 ${
                    index % 2 === 0
                      ? "sm:border-r sm:pr-6"
                      : "sm:pl-8"
                  } ${
                    index < 2
                      ? "sm:border-b"
                      : ""
                  } ${
                    index === 0 || index === 1
                      ? "border-b"
                      : ""
                  }`}
                >
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-lg text-neutral-300">
                    {feature.icon}
                  </div>

                  <h3 className="text-sm font-semibold tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="mt-2 max-w-xs text-xs leading-[1.8] text-neutral-400 sm:text-[13px]">
                    {feature.description}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
