
"use client";

import { useEffect, useRef, useState } from "react";
import { productPageContainerClass, productSectionTitleClass } from "./productStyles";
import { FadeIn } from "./FadeIn";

const steps = [
  {
    title: "Explore Ideas",
    description:
      "We identify real-world problems, explore opportunities, and discover where technology can make a difference.",
  },
  {
    title: "Shape Experiences",
    description:
      "We transform ideas into intuitive product experiences designed around real user needs.",
  },
  {
    title: "Build Intelligently",
    description:
      "We leverage modern technologies and AI to build useful, reliable, and scalable digital products.",
  },
  {
    title: "Evolve Continuously",
    description:
      "We learn from user feedback, refine our products, and continuously improve the experience.",
  },
];

export default function ProductApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // One step advances for each 220px of scrolling.
      const scrollDistance = Math.max(
        0,
        viewportHeight * 0.45 - rect.top
      );

      const nextStep = Math.min(
        steps.length - 1,
        Math.floor(scrollDistance / 220)
      );

      setActiveStep(nextStep);
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const progress = ((activeStep + 1) / steps.length) * 100;

  return (
    <section
      ref={sectionRef}
      id="product-approach"
      className="bg-[#080808] font-sans text-white"
    >
      <div className={`${productPageContainerClass} grid grid-cols-1 gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20`}>
        {/* Left content */}
        <FadeIn className="lg:sticky lg:top-24 lg:h-fit">
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400 border border-white/20 max-w-fit rounded-full px-3 py-1">
            Process
          </p>

          <h2 className={`max-w-xl ${productSectionTitleClass}`}>
           How We Bring 
            <span className="mt-1 block text-neutral-400">
              Ideas to Life
            </span>
          </h2>

          <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-400">
            We turn promising ideas into intelligent digital products through thoughtful planning, modern technology, and continuous innovation.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-flex min-h-12 items-center rounded-full bg-white px-7 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
          >
            Start Your Journey
          </a>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute bottom-0 left-[7px] top-2 w-[2px] bg-neutral-700">
            <div
              className="absolute left-0 top-0 w-full bg-gradient-to-b from-white to-neutral-400 transition-[height] duration-500"
              style={{ height: `${progress}%` }}
            />
          </div>

          <div className="space-y-14 sm:space-y-16">
            {steps.map((step, index) => {
              const isActive = index <= activeStep;

              return (
                <FadeIn
                  key={step.title}
                  delay={index * 0.06}
                  className="relative min-h-[120px] pl-8 sm:pl-12"
                >
                  <span
                    className={`absolute left-0 top-[3px] z-10 h-4 w-4 rounded-full transition-colors duration-300 ${
                      isActive
                        ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                        : "bg-neutral-700"
                    }`}
                  />

                  <p
                    className={`mb-3 text-xs uppercase tracking-wide transition-colors duration-300 ${
                      isActive
                        ? "text-neutral-300"
                        : "text-neutral-600"
                    }`}
                  >
                    Step {index + 1}
                  </p>

                  <h3
                    className={`text-xl leading-snug transition-colors duration-300 sm:text-[22px] ${
                      isActive
                        ? "text-white"
                        : "text-neutral-500"
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`mt-3 max-w-xl text-sm leading-[1.65] transition-colors duration-300 sm:text-[15px] ${
                      isActive
                        ? "text-neutral-400"
                        : "text-neutral-600"
                    }`}
                  >
                    {step.description}
                  </p>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
