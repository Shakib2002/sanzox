import { ArrowRight, Check, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from './productData';
import { productPageContainerClass, productSectionTitleClass } from './productStyles';
import { FadeIn } from './FadeIn';

export function ProductDetailsSection() {
  const detailedProducts = products.slice(0, 2);

  return (
    <section className="border-b border-white/[0.08]">
      {detailedProducts.map((product, index) => (
        <div
          key={product.name}
          className={`relative overflow-hidden ${index === 0 ? 'border-b border-white/[0.08]' : ''}`}
          id={index === 0 ? 'deepfocus-details' : 'maxdrive-details'}
        >
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2" style={{ background: `radial-gradient(ellipse at 60% 50%, ${product.accent}25, transparent 68%)` }} />
          <div className={`${productPageContainerClass} relative grid items-center gap-10 py-16 md:py-20 lg:grid-cols-2 lg:gap-16 ${index % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <FadeIn
              key={`${product.name}-copy`}
              className="relative z-10"
              delay={index * 0.08}
            >
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                {index === 0 ? '03. Product Details' : 'Product Details'}
              </p>
              <h2 className={productSectionTitleClass}>{product.name}</h2>
              <h3 className="mt-4 text-lg font-semibold text-slate-100">{product.name === 'DeepFocus' ? 'Focus better. Build habits.' : 'Your cloud, unified.'}</h3>
              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">{product.description}</p>
              <ul className="mt-6 space-y-4">
                {product.detailFeatures?.map((feature, featureIndex) => (
                  <FadeIn key={feature.title} delay={featureIndex * 0.06}>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-neutral-300">
                      <Check className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-slate-100">{feature.title}</span>
                      <span className="mt-0.5 block text-xs leading-5 text-slate-400">{feature.description}</span>
                    </span>
                  </li>
                  </FadeIn>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <a
                  href={product.href}
                  target={product.href.startsWith('http') ? '_blank' : undefined}
                  rel={product.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black transition hover:bg-neutral-200"
                >
                  {product.name === 'DeepFocus' ? 'Get on Google Play' : 'Get Started'} <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a href="#featured-products" className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white">
                  <Play className="h-3 w-3 fill-current" /> View Screenshots
                </a>
              </div>
            </FadeIn>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className={`relative mx-auto flex min-h-[300px] w-full max-w-[560px] items-center justify-center ${index % 2 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
            >
              <div className="absolute h-64 w-64 rounded-full blur-3xl" style={{ backgroundColor: `${product.accent}26` }} />
              <div className={`relative overflow-hidden border border-white/15 bg-[#071222] shadow-[0_28px_80px_rgba(0,0,0,0.5)] ${index === 0 ? 'w-[48%] rounded-[30px] p-1.5' : 'w-full rounded-2xl p-1.5'}`}>
                <img
                  src={product.preview}
                  alt={`${product.name} screen preview`}
                  className={`w-full rounded-[24px] ${index === 0 ? 'max-h-[430px] object-cover object-top' : 'aspect-[16/9] object-cover'}`}
                />
              </div>
              {index === 0 && (
                <div className="absolute bottom-[12%] right-[8%] hidden w-[34%] overflow-hidden rounded-[24px] border border-white/15 bg-[#071222] p-1.5 shadow-[0_24px_70px_rgba(0,0,0,0.55)] sm:block">
                  <img src="/images/app-challenge.svg" alt="DeepFocus 21-day challenge screen" className="max-h-[300px] w-full rounded-[19px] object-cover object-top" />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
}
