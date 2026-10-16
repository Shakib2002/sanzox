
import React from "react";
import { FadeIn } from "./FadeIn";
import { productPageContainerClass, productSectionTitleClass } from "./productStyles";
import  image  from "../../../assets/team/discuss.webp"

const OurAppJourney: React.FC = () => {
  return (
    <section className="w-full bg-[#080808] py-16 text-white lg:py-24">
      <div className={productPageContainerClass}>
        {/* Header */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start lg:mb-12">
          <FadeIn>
            <span className="mb-4 block text-[10px] font-medium tracking-[0.18em] text-neutral-400 uppercase border border-white/20 max-w-fit rounded-full px-3 py-1">
              Our App Journey
            </span>

            <h2 className={`max-w-xl ${productSectionTitleClass}`}>
              From Ideas to <br></br>
              <span className="text-neutral-400">  Impact.</span>
            </h2>

            <a
              href="/about"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition duration-300 hover:bg-neutral-200"
            >
              About us
              <span aria-hidden="true">↗</span>
            </a>
          </FadeIn>

          <FadeIn delay={0.12} className="max-w-xl text-sm leading-7 text-neutral-400 md:ml-auto md:pt-7 md:text-base">
            Every great product starts with an idea. Explore how we turn thoughtful ideas into intelligent digital experiences that make a difference.
          </FadeIn>
        </div>

        {/* Story and Mission/Vision */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Our Story */}
          <FadeIn className="group relative min-h-[390px] overflow-hidden rounded-3xl border border-white/10 bg-[#141414] sm:min-h-[480px] lg:col-span-7 lg:min-h-[520px]">
            <img
              src={image}
              alt="SANZOX app and cloud storage workspace"
              className="absolute inset-0 h-full w-full object-cover  transition duration-700 group-hover:scale-105"
              loading="lazy"
            />

            {/* Image fallback overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-10">
              <span               className="mb-3 inline-block rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                Built for simplicity
              </span>

              <h3 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">
                Our Story
              </h3>

              <p className="max-w-lg text-sm leading-7 text-white/80 sm:text-base">
               SANZOX began with a simple idea: make technology more useful. Today, we build intelligent digital products that solve real problems and simplify everyday life.
              </p>
            </div>
          </FadeIn>

          {/* Mission and Vision */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {/* Mission */}
            <FadeIn className="flex min-h-[220px] flex-col justify-center rounded-3xl border border-white/10 bg-[#111111] p-7 transition duration-300 hover:bg-[#171717] sm:p-9 lg:min-h-0 lg:flex-1">
              <span className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                What drives us
              </span>

              <h3 className="mb-3 text-xl font-medium text-white sm:text-2xl">
                Our Mission
              </h3>

              <p className="max-w-md text-sm leading-7 text-neutral-400 sm:text-base">
                We turn ideas into meaningful digital experiences that solve real problems, simplify everyday tasks, and empower people to achieve more through intelligent technology.
              </p>
            </FadeIn>

            {/* Vision */}
            <FadeIn delay={0.1} className="flex min-h-[220px] flex-col justify-center rounded-3xl border border-white/10 bg-[#111111] p-7 transition duration-300 hover:bg-[#171717] sm:p-9 lg:min-h-0 lg:flex-1">
              <span className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                Where we're going
              </span>

              <h3 className="mb-3 text-xl font-medium text-white sm:text-2xl">
                Our Vision
              </h3>

              <p className="max-w-md text-sm leading-7 text-neutral-400 sm:text-base">
               To shape a smarter digital future by building innovative software products that inspire new possibilities, empower people, and transform the way we live and work.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurAppJourney;
