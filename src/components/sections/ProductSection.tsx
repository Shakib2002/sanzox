import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import redditlens from '../../assets/products/redditlens.png';
import deepfocus from '../../assets/products/deepfocus.png';
import deepFocusPreview from '../../assets/products/deep-focus/10.png';
import maxdrive from '../../assets/products/maxdrive.png';
import maxDrivePreview from '../../assets/maxdrive/image-1.png';

const products = [
  {
    name: 'RedditLens',
    category: 'AI analytics',
    tagline: 'Find the signal in every conversation.',
    description:
      'Discover market trends, user pain points, startup ideas, and business opportunities with AI-powered Reddit research.',
    highlights: ['Market research', 'AI insights', 'Trend tracking'],
    logo: redditlens,
    preview: redditlens,
    imageClass: 'object-contain p-10',
    href: 'https://redditlens.cc',
  },
  {
    name: 'Deep Focus',
    category: 'Productivity for Android',
    tagline: 'Make room for deep work.',
    description:
      'Build better routines, plan your day, and make every focus session count with a distraction-free productivity app.',
    highlights: ['Focus sessions', 'Habit building', 'Progress tracking'],
    logo: deepfocus,
    preview: deepFocusPreview,
    imageClass: 'object-cover',
    href: '/deep-focus',
  },
  {
    name: 'MaxDrive',
    category: 'Storage for Android',
    tagline: 'One storage. Endless space.',
    description:
      'Bring your cloud accounts together and manage, organize, and access your files from one place.',
    highlights: ['Multiple drives', 'Smart organization', 'Secure access'],
    logo: maxdrive,
    preview: maxDrivePreview,
    imageClass: 'object-cover',
    href: 'https://www.maxdrive.site',
  },
];

const AUTOPLAY_MS = 4500;

function ProductCard({ product, wide, isActive }) {
  const isExternal = product.href.startsWith('http');

  return (
    <article
      className={`isolate h-full overflow-hidden rounded-[2.5rem] bg-[#141414] p-3 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.9),0_0_70px_-15px_rgba(255,255,255,0.07)] ${
        wide ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-2'
      }`}
    >
      {/* Image: radius = card radius (2.5rem) - padding (0.75rem) = 1.75rem */}
      <div className="relative aspect-[4/3] w-full self-center overflow-hidden rounded-2xl bg-[#090909] shadow-[0_14px_36px_rgba(0,0,0,0.6)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.10),transparent_68%)]"
        />
        <img
          src={product.preview}
          alt={`${product.name} preview`}
          className={`relative h-full w-full rounded-2xl ${product.imageClass}`}
          draggable={false}
        />
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-col justify-center px-3 py-3 sm:px-5 lg:px-7">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] p-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
            <img
              src={product.logo}
              alt=""
              className="h-full w-full rounded-lg object-contain"
              draggable={false}
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold tracking-tight text-white">
              {product.name}
            </p>
            <p className="text-xs text-neutral-500">{product.category}</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl">
          {product.tagline}
        </h3>
        <p className="mt-2 line-clamp-4 text-sm leading-6 text-neutral-400">
          {product.description}
        </p>

        <a
          href={product.href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          tabIndex={isActive ? 0 : -1}
          className="group mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
        >
          Explore {product.name}
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>

        <ul className="mt-5 grid grid-cols-3 gap-3 pt-4">
          {product.highlights.map((h) => (
            <li key={h} className="text-xs leading-5 text-neutral-300">
              {h}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function ProductsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [stageW, setStageW] = useState(1000);
  const stageRef = useRef(null);
  const prevOffsets = useRef([]);
  const reduceMotion = useReducedMotion();

  const n = products.length;
  const showPrevious = () => setActiveIndex((i) => (i - 1 + n) % n);
  const showNext = () => setActiveIndex((i) => (i + 1) % n);

  // Measure the stage so the layout scales with the screen.
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setStageW(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Auto-slide. Keyed on activeIndex so a manual click restarts the 4.5s timer
  // instead of firing right after the user interacted.
  const autoplay = !isPaused;
  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(
      () => setActiveIndex((i) => (i + 1) % n),
      AUTOPLAY_MS,
    );
    return () => clearTimeout(t);
  }, [autoplay, activeIndex, n]);

  // Geometry
  const wide = stageW >= 760;
  const cardW = wide ? Math.min(stageW * 0.78, 880) : stageW * 0.86;
  const cardH = wide ? 400 : 600;
  const spacing = cardW * 0.94; // distance between slide centres
  const stageH = cardH + 110;

  const half = Math.floor(n / 2);
  const offsets = products.map(
    (_, i) => ((i - activeIndex + n + half) % n) - half,
  );

  useEffect(() => {
    prevOffsets.current = offsets;
  });

  return (
    <section
      aria-label="Our products"
      className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <SectionHeading
            badge="SANZOX Ecosystem"
            title={
              <>
                Intelligent products built for
                <span className="gradient-text"> modern workflows.</span>
              </>
            }
          />
        </div>

        <div
          className="relative mx-auto max-w-6xl"
          onPointerEnter={(e) => e.pointerType === 'mouse' && setIsPaused(true)}
          onPointerLeave={(e) => e.pointerType === 'mouse' && setIsPaused(false)}
          onFocus={(e) => e.target.matches(':focus-visible') && setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <motion.div
            ref={stageRef}
            onPanEnd={(_, info) => {
              if (info.offset.x < -60) showNext();
              else if (info.offset.x > 60) showPrevious();
            }}
            style={{ height: stageH, touchAction: 'pan-y' }}
            className="relative overflow-hidden"
          >
            {products.map((product, i) => {
              const d = offsets[i];
              const abs = Math.abs(d);
              const prev = prevOffsets.current[i];
              // A slide wrapping from one side to the other must not fly across the stage.
              const jumped = prev !== undefined && Math.abs(d - prev) > 1;

              return (
                <motion.div
                  key={product.name}
                  initial={false}
                  animate={{
                    x: d * spacing - cardW / 2,
                    scale: d === 0 ? 1 : 0.9,
                    opacity: d === 0 ? 1 : abs === 1 ? 0.4 : 0,
                    filter: d === 0 ? 'blur(0px)' : 'blur(1.5px)',
                  }}
                  transition={
                    jumped
                      ? { duration: 0 }
                      : reduceMotion
                      ? { duration: 0.3 }
                      : { type: 'spring', stiffness: 130, damping: 24, mass: 0.9 }
                  }
                  style={{
                    width: cardW,
                    height: cardH,
                    left: '50%',
                    top: 40,
                    zIndex: 10 - abs,
                  }}
                  className="absolute"
                  aria-hidden={d !== 0}
                >
                  <ProductCard product={product} wide={wide} isActive={d === 0} />

                  {/* Clicking a neighbouring slide brings it to the centre */}
                  {abs === 1 && (
                    <button
                      type="button"
                      aria-label={`Show ${product.name}`}
                      onClick={() => setActiveIndex(i)}
                      className="absolute inset-0 z-20 cursor-pointer rounded-[2.5rem]"
                    />
                  )}
                </motion.div>
              );
            })}

            <button
              type="button"
              onClick={showPrevious}
              aria-label="Show previous product"
              className="absolute left-2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 text-white shadow-lg backdrop-blur transition hover:scale-105 hover:bg-[#1c1c1c] sm:left-5"
              style={{ top: 40 + cardH / 2 }}
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Show next product"
              className="absolute right-2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 text-white shadow-lg backdrop-blur transition hover:scale-105 hover:bg-[#1c1c1c] sm:right-5"
              style={{ top: 40 + cardH / 2 }}
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </motion.div>
        </div>

        {/* Progress dots: the active pill fills over the autoplay interval */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {products.map((product, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={product.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${product.name}`}
                aria-current={active ? 'true' : undefined}
                className={`relative h-2 overflow-hidden rounded-full bg-white/25 transition-all duration-300 hover:bg-white/50 ${
                  active ? 'w-10' : 'w-2'
                }`}
              >
                {active && (
                  <motion.span
                    key={`${activeIndex}-${autoplay}`}
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-white"
                    initial={{ width: autoplay ? '0%' : '100%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: autoplay ? AUTOPLAY_MS / 1000 : 0,
                      ease: 'linear',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/[0.06] shadow-[0_8px_24px_rgba(0,0,0,0.45)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.10]"
          >
            Explore all products
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}