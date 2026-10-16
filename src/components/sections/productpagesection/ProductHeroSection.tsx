
"use client";

import { useEffect, useState } from "react";
import { productPageContainerClass, productSectionTitleClass } from "./productStyles";
import { FadeIn } from "./FadeIn";

const images = [
  {
    src: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=600&q=85",
    alt: "Futuristic digital artwork",
  },
  {
    src: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=600&q=85",
    alt: "Abstract creative artwork",
  },
  {
    src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=85",
    alt: "Colorful digital universe",
  },
  {
    src: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=600&q=85",
    alt: "Dreamlike night sky",
  },
  {
    src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=600&q=85",
    alt: "Immersive visual artwork",
  },
  {
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=85",
    alt: "Retro futuristic visual",
  },
  {
    src: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=600&q=85",
    alt: "Creative digital vision",
  },
];

const features = [
  {
    title: "Smart Design",
    description: "Simplifying complex tasks through intelligent digital products.",
  },
  {
    title: "Better Productivity",
    description: "Save time, streamline workflows, and achieve more.",
  },
  {
    title: "Digital Innovation",
    description: "Building adaptable software for tomorrow's evolving needs.",
  },
];

export default function ProductHeroSection() {
  const [activeIndex, setActiveIndex] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateWidth = () => setIsMobile(window.innerWidth < 640);

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  const getPosition = (index: number) => {
    const total = images.length;
    let position = (index - activeIndex + total) % total;

    if (position > Math.floor(total / 2)) {
      position -= total;
    }

    return position;
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#080808] text-white">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] opacity-65 md:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(to right, transparent, black 35%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 35%, black 100%)",
        }}
      />
      <div className={`${productPageContainerClass} relative pb-14 pt-16 sm:pb-16 sm:pt-20 lg:pt-16`}>
        {/* Heading */}
        <FadeIn className="relative z-20 mx-auto max-w-3xl text-center">
          <h1 className={productSectionTitleClass}>
            Software Built to Move
            <br />
            <span className="text-neutral-400">Ideas Forward</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-neutral-400 sm:text-base">
            Explore intelligent apps and software designed to simplify everyday tasks, boost productivity, and help you do more with technology. 
          </p>

          <a
            href="#featured-products"
            className="group mt-5 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-medium text-black transition-colors hover:bg-neutral-200"
          >
            Explore Products
            <span className="text-base transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </FadeIn>

        {/* Slider stage */}
        <FadeIn className="relative mx-auto mt-8 h-[270px] w-full sm:mt-10 sm:h-[340px] lg:mt-8 lg:h-[350px]" delay={0.08}>
          {/* Soft neutral ambient light */}
          <div className="pointer-events-none absolute left-1/2 top-[54%] h-40 w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-[80px] sm:h-52 sm:blur-[100px]" />


          {/* Perspective carousel */}
          <div
            className="absolute inset-0"
            style={{ perspective: "1000px" }}
          >
            {images.map((image, index) => {
              const position = getPosition(index);
              const visible = Math.abs(position) <= 3;

              const spacing = isMobile ? 106 : 145;
              const depth = Math.abs(position);

              return (
                <button
                  key={`${image.alt}-${index}`}
                  type="button"
                  aria-label={`Show image ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  tabIndex={visible ? 0 : -1}
                  className="image-carousel-button absolute left-1/2 top-[45%] overflow-hidden rounded-none border border-white/10 bg-neutral-900 transition-[transform,opacity] duration-700 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  style={{
                    width: isMobile ? 126 : 184,
                    height: isMobile ? 175 : 248,
                    transform: `
                      translate(-50%, -50%)
                      translateX(${position * spacing}px)
                      translateY(${depth * 5}px)
                      rotateY(${position * -14}deg)
                      scale(${1 - depth * 0.055})
                    `,
                    transformStyle: "preserve-3d",
                    zIndex: 10 - depth,
                    opacity: visible ? 1 - depth * 0.12 : 0,
                    pointerEvents: visible ? "auto" : "none",
                    filter:
                      depth === 0
                        ? "brightness(1.08)"
                        : `brightness(${Math.max(0.38, 1 - depth * 0.16)})`,
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    draggable={false}
                    className="h-full w-full object-cover"
                  />

                  <span className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Slider indicators */}
        <FadeIn className="relative z-20 -mt-1 flex justify-center gap-2" delay={0.08}>
          {images.map((image, index) => (
            <button
              key={`dot-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-6 bg-white"
                  : "w-1.5 bg-neutral-700 hover:bg-neutral-400"
              }`}
            />
          ))}
        </FadeIn>

        {/* Features */}
        {/* <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-8 text-center sm:mt-12 sm:grid-cols-3 sm:gap-7 lg:mt-10 lg:gap-12">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.1}>
              <h2 className="text-sm font-medium leading-5 text-white sm:text-base">
                {feature.title} 
              </h2>

              <p className="mx-auto mt-3 max-w-[280px] text-[11px] leading-5 text-neutral-500 sm:text-xs">
                {feature.description}
              </p>
            </FadeIn>
          ))}
        </div> */}
      </div>
    </section>
  );
}
