"use client";

import { motion } from "framer-motion";
import { roadmapItems } from "./productData";
import { productPageContainerClass, productSectionTitleClass } from "./productStyles";
import { FadeIn } from "./FadeIn";

export function ProductRoadmapSection() {
  return (
    <section className="relative border-b border-white/[0.08] pb-16 md:pb-24">
      {/* Subtle ambient glow behind the section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-64 max-w-3xl bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_70%)]"
      />

      <div className={productPageContainerClass}>
        <FadeIn>
          <div className="mb-10 flex flex-col gap-2 md:mb-12">
            <h2 className={productSectionTitleClass}>
              What We're 
              <span className="text-neutral-400"> Building</span>
            </h2>

            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Explore the digital products we're building to make everyday
              experiences smarter, simpler, and better.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roadmapItems.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.07, duration: 0.4 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.045] hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
            >
              {/* Top accent line that lights up on hover */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* App name and status */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold tracking-tight text-white">
                  {item.name}
                </h3>

                {item.status === "In Progress" ? (
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-2.5 py-1 text-[10px] font-medium text-amber-300">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-300" />
                    </span>
                    In Progress
                  </span>
                ) : item.status === "In Development" ? (
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-blue-400/20 bg-blue-400/[0.07] px-2.5 py-1 text-[10px] font-medium text-blue-300">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400/60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-300" />
                    </span>
                    In Development
                  </span>
                ) : null}
              </div>

              {/* Short description */}
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                {item.description}
              </p>

              {/* Divider */}
              <div className="mt-5 h-px w-full bg-white/[0.06]" />

              {/* Features */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-[11px] leading-4 text-slate-400 transition-colors duration-200 group-hover:border-white/[0.14] group-hover:text-slate-300 hover:!border-white/25 hover:!text-white"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}