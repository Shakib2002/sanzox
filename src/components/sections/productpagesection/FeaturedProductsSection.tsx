
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import { products } from './productData';
import {
  productPageContainerClass,
  productSectionTitleClass,
} from './productStyles';
import { FadeIn } from './FadeIn';

export function FeaturedProductsSection() {
  return (
    <section
      id="featured-products"
      className="py-20 md:py-28"
    >
      <div className={productPageContainerClass}>
        <FadeIn className="mx-left mb-12 max-w-2xl text-left md:mb-16">
   

          <h2 className={productSectionTitleClass}>
            Products That{' '}
            <span className="text-neutral-400">
              Make a Difference
            </span>
          </h2>

          <p className="mx-left mt-4 max-w-xl text-sm leading-7 text-slate-400 md:text-base">
            Thoughtfully built software that simplifies everyday
            challenges and helps you work, focus, and live better.
          </p>
        </FadeIn>

        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          {products.map((product, index) => {
            const isExternal = product.href.startsWith('http');
            const googlePlayUrl = product.googlePlayUrl;

            return (
              <FadeIn
                key={product.name}
                delay={index * 0.12}
                className="h-full"
              >
                <article className="group flex h-full flex-col rounded-2xl bg-[#141414] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#181818] hover:shadow-[0_16px_40px_rgba(0,0,0,0.32)] sm:p-6 md:p-7">
                  {/* Product header */}
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.06]">
                      <img
                        src={product.image}
                        alt={`${product.name} logo`}
                        className="h-8 w-8 object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        {product.category}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-white/[0.06] px-3 py-1.5 text-[10px] font-medium text-neutral-300">
                      Available
                    </span>
                  </div>

                  {/* Product preview */}
                  <div className="relative mb-6 h-52 overflow-hidden rounded-xl bg-[#090909] sm:h-60 md:h-64">
                    <img
                      src={product.preview}
                      alt={`${product.name} app preview`}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Product content */}
                  <div className="flex flex-1 flex-col">
                    <h4 className="text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
                      {product.tagline}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {product.description}
                    </p>

                    {/* Features */}
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {product.features.map((feature) => (
                        <li
                          key={feature}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-2 text-xs leading-4 text-slate-300"
                        >
                          <Check
                            aria-hidden="true"
                            className="h-3 w-3 shrink-0 text-neutral-400"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Actions */}
                    <div className="mt-auto w-4/5 grid grid-cols-2 gap-3 pt-7">
                      <a
                        href={product.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        aria-label={`${product.actionLabel} — ${product.name}`}
                        className="inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-full bg-white/[0.08] px-2 py-3 text-center text-xs font-medium leading-tight text-white transition-all duration-300 hover:bg-white/[0.14] sm:px-5 sm:text-sm"
                      >
                        {product.actionLabel}
                      
                          <ExternalLink
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          />
                        
                      </a>

                      {googlePlayUrl && (
                        <a
                          href={googlePlayUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Get ${product.name} on Google Play`}
                          className="inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-full bg-white px-3 py-3 text-center text-xs font-semibold leading-tight text-black transition-all duration-300 hover:bg-neutral-200 sm:px-5 sm:text-sm"
                        >
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-5 w-5 shrink-0"
                            fill="none"
                          >
                            <path
                              d="M3.5 2.7L14 12 3.5 21.3C3.2 21 3 20.5 3 19.8V4.2C3 3.5 3.2 3 3.5 2.7Z"
                              fill="#000000"
                            />
                            <path
                              d="M3.5 2.7C4 2.3 4.7 2.4 5.4 2.8L17.1 9.3 14 12 3.5 2.7Z"
                              fill="#000000"
                            />
                            <path
                              d="M14 12L17.1 14.7 5.4 21.2C4.7 21.6 4 21.7 3.5 21.3L14 12Z"
                              fill="#000000"
                            />
                            <path
                              d="M17.1 9.3L20.2 11C21.2 11.6 21.2 12.4 20.2 13L17.1 14.7 14 12 17.1 9.3Z"
                              fill="#000000"
                            />
                          </svg>

                          <span className="min-w-0 text-center">Get it on Google Play</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
