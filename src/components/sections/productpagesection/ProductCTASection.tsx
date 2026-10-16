import { ArrowRight, Sparkles, ArrowUpRight, Check, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  productPageContainerClass,
  productSectionTitleClass,
} from './productStyles';
import { FadeIn } from './FadeIn';

export function ProductCTASection() {
  return (
    <section className="py-12 md:py-16">
      <div className={productPageContainerClass}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-[#101010] px-6 py-10 sm:px-10 md:min-h-[300px] md:px-12 md:py-12"
        >
          {/* Background glow */}
          <div className="pointer-events-none absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-white/[0.035] blur-3xl" />
          <div className="pointer-events-none absolute right-[20%] top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-white/[0.02] blur-2xl" />

          {/* Decorative grid */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] opacity-40 md:block">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                maskImage:
                  'linear-gradient(to right, transparent, black 35%, black 100%)',
              }}
            />
          </div>

          <FadeIn className="relative z-10 max-w-xl">
            <p className="mb-3 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
              <Sparkles className="h-3.5 w-3.5" />
              Get in Touch
            </p>

            <h2 className={productSectionTitleClass}>
              Have an idea?
              <br />
              <span className="text-neutral-400">
                Let&apos;s build something useful.
              </span>
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-neutral-400">
              We&apos;re always open to new ideas, collaborations, and exciting
              projects. Get in touch—we&apos;d love to hear what you&apos;re
              working on.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors hover:bg-neutral-200"
              >
                Get in Touch
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeIn>

          {/* Right visual */}
          <div className="pointer-events-none absolute right-8 top-1/2 hidden h-[230px] w-[330px] -translate-y-1/2 md:block lg:right-12">

            {/* Main product card */}
            <motion.div
              initial={{ opacity: 0, x: 20, rotate: 3 }}
              whileInView={{ opacity: 1, x: 0, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="absolute right-4 top-6 w-[230px] rounded-xl border border-white/10 bg-[#171717]/95 p-4 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.08]">
                    <Zap className="h-3.5 w-3.5 text-white" />
                  </div>

                  <div>
                    <p className="text-[10px] font-medium text-white">
                      New Product
                    </p>
                    <p className="text-[9px] text-neutral-500">
                      In development
                    </p>
                  </div>
                </div>

                <ArrowUpRight className="h-3.5 w-3.5 text-neutral-500" />
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[9px] text-neutral-500">
                    Product progress
                  </span>
                  <span className="text-[9px] text-neutral-400">72%</span>
                </div>

                <div className="h-1 overflow-hidden rounded-full bg-white/[0.07]">
                  <div className="h-full w-[72%] rounded-full bg-white" />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.08]">
                  <Check className="h-3 w-3 text-neutral-300" />
                </span>
                <span className="text-[9px] text-neutral-400">
                  Turning ideas into useful products
                </span>
              </div>
            </motion.div>

            {/* Floating workflow card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute bottom-2 left-0 w-[165px] -rotate-6 rounded-xl border border-white/10 bg-[#141414]/95 p-3 shadow-xl backdrop-blur-xl"
            >
              <p className="mb-3 text-[9px] uppercase tracking-[0.16em] text-neutral-500">
                Our Process
              </p>

              <div className="flex items-center gap-1.5">
                <div className="rounded-md bg-white/[0.08] px-2 py-1.5 text-[8px] text-neutral-300">
                  Idea
                </div>

                <div className="h-px w-3 bg-white/10" />

                <div className="rounded-md bg-white/[0.08] px-2 py-1.5 text-[8px] text-neutral-300">
                  Build
                </div>

                <div className="h-px w-3 bg-white/10" />

                <div className="rounded-md bg-white px-2 py-1.5 text-[8px] text-black">
                  Launch
                </div>
              </div>
            </motion.div>

            {/* Small floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="absolute right-0 top-0 rounded-full border border-white/10 bg-[#1a1a1a] px-3 py-1.5 shadow-lg"
            >
              <span className="flex items-center gap-1.5 text-[8px] text-neutral-400">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
                Building what&apos;s next
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}