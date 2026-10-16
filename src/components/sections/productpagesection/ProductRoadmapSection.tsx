import { ArrowRight, BookOpen, Sparkles, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';
import { roadmapItems } from './productData';
import { productPageContainerClass, productSectionTitleClass } from './productStyles';
import { FadeIn } from './FadeIn';

const icons = { book: BookOpen, sparkles: Sparkles, workflow: Workflow };

export function ProductRoadmapSection() {
  return (
    <section className="border-b border-white/[0.08] py-16 md:py-20">
      <div className={productPageContainerClass}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <FadeIn>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">04. In Development</p>
            <h2 className={productSectionTitleClass}>What&apos;s Next</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">We&apos;re constantly working on new ideas to make your digital life better. Here are some of the upcoming products from SANZOX.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <a href="/contact" className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-neutral-400 hover:text-white sm:inline-flex">
              Our Roadmap <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </FadeIn>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {roadmapItems.map((item, index) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.07, duration: 0.4 }}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#141414] to-[#090909] p-5 transition hover:border-white/20"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]" style={{ color: item.accent }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold text-white">{item.name}</h3>
                  <span className="ml-auto rounded-full border border-white/10 bg-white/[0.05] px-2 py-1 text-[9px] font-semibold text-neutral-300">{item.status}</span>
                </div>
                <p className="mt-4 min-h-[60px] text-xs leading-5 text-slate-400">{item.description}</p>
                <ArrowRight className="mt-3 h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-1" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
