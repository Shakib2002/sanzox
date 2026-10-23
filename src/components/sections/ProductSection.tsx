import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
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
    imageClass: 'object-cover',
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

const AUTOPLAY_MS = 3500;
const AUTOPLAY_TOUCH_MS = 5500; // slower on phones: text-heavy cards need reading time
const AUTOPLAY_ON_TOUCH = true;
const CARD_TOP = 24;
const STAGE_BOTTOM = 36;

const GridPattern = ({ className = '' }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute inset-0 ${className}`}
    style={{
      backgroundImage:
        'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
      backgroundSize: '28px 28px',
      maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 78%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 78%)',
    }}
  />
);

function ProductCard({ product, wide, isActive }) {
  const isExternal = product.href.startsWith('http');
  const highlights = wide ? product.highlights : product.highlights.slice(0, 2);

  const ctaClass = wide
    ? 'group mt-3 inline-flex w-fit items-center gap-1.5 rounded text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]'
    : 'group mt-4 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-white/[0.08] text-sm font-semibold text-white ring-1 ring-white/10 transition-colors active:bg-white/[0.14] hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50';

  return (
    <article
      className={`isolate relative h-full w-full overflow-hidden bg-gradient-to-b from-[#171717] to-[#0f0f0f] ring-1 ring-white/[0.05] transition-shadow duration-500 ${
        wide ? 'grid grid-cols-2 rounded-[2.5rem]' : 'flex flex-col rounded-[2rem]'
      } ${
        isActive
          ? 'shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]'
          : 'shadow-[0_6px_20px_-10px_rgba(0,0,0,0.5)]'
      }`}
    >
      {/* Fewer layers on mobile: skip the card-level grid */}
      {wide && <GridPattern className="rounded-[2.5rem] opacity-70" />}

      <div
        className={`relative overflow-hidden bg-[#0a0a0a] ${
          wide ? 'h-full min-h-0' : 'aspect-[16/10] w-full shrink-0'
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <img
          src={product.preview}
          alt={`${product.name} preview`}
          loading="lazy"
          className={`relative z-10 block h-full w-full ${product.imageClass}`}
          draggable={false}
        />
      </div>

      <div
        className={`relative flex min-w-0 flex-col ${
          wide
            ? 'h-full justify-center px-7 py-5'
            : 'flex-1 justify-between px-5 pb-5 pt-4'
        }`}
      >
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] p-1.5 ring-1 ring-white/[0.08]">
              <img
                src={product.logo}
                alt=""
                className="h-full w-full rounded-md object-contain"
                draggable={false}
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight text-white sm:text-base">
                {product.name}
              </p>
              <p className="truncate text-xs text-neutral-400">{product.category}</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold leading-tight tracking-tight text-white sm:text-xl">
            {product.tagline}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-5 text-neutral-400">
            {product.description}
          </p>

        <ul className="my-5 flex flex-wrap gap-1.5">
          {highlights.map((h) => (
            <li
              key={h}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs font-medium leading-none text-neutral-300 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              {h}
            </li>
          ))}
        </ul>

          <a
            href={product.href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            tabIndex={isActive ? 0 : -1}
            className={ctaClass}
          >
            Explore {product.name}
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>


      </div>
    </article>
  );
}

export default function ProductsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Estimate from the viewport so the very first render already uses the right layout
  // (no wrong-geometry flash, no stale blur on mobile). ResizeObserver corrects it.
  const [stageW, setStageW] = useState(() =>
    typeof window === 'undefined' ? 1000 : Math.min(window.innerWidth - 32, 1152)
  );
  const [dragging, setDragging] = useState(false);
  const [coarse, setCoarse] = useState(false);
  const stageRef = useRef(null);
  const prevOffsets = useRef([]);
  const didDrag = useRef(false);
  const reduceMotion = useReducedMotion();

  const n = products.length;

  const goTo = useCallback((i) => setActiveIndex(((i % n) + n) % n), [n]);
  const showPrevious = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const showNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setStageW(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Touch / coarse-pointer detection
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const autoplay =
    !isPaused && !dragging && !reduceMotion && (AUTOPLAY_ON_TOUCH || !coarse);
  const delay = coarse ? AUTOPLAY_TOUCH_MS : AUTOPLAY_MS;
  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => setActiveIndex((i) => (i + 1) % n), delay);
    return () => clearTimeout(t);
  }, [autoplay, activeIndex, n, delay]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') showPrevious();
      else if (e.key === 'ArrowRight') showNext();
    };
    const el = stageRef.current;
    el?.addEventListener('keydown', onKey);
    return () => el?.removeEventListener('keydown', onKey);
  }, [showPrevious, showNext]);

  // Geometry
  // Desktop: fixed height. Mobile: height comes from the tallest slide (CSS grid stack).
  const wide = stageW >= 760;
  const cardW = wide ? Math.min(stageW * 0.78, 880) : stageW * 0.86;
  const cardH = wide ? Math.min(Math.max(cardW * 0.4, 300), 380) : undefined;
  const spacing = cardW * 0.94;

  const half = Math.floor(n / 2);
  const offsets = products.map(
    (_, i) => ((i - activeIndex + n + half) % n) - half
  );

  useEffect(() => {
    prevOffsets.current = offsets;
  }, [offsets]);

  const handleDragStart = () => {
    didDrag.current = true;
    setDragging(true);
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    if (offset.x < -50 || velocity.x < -500) showNext();
    else if (offset.x > 50 || velocity.x > 500) showPrevious();
    setDragging(false);
    // let the trailing click event pass before clearing the flag
    setTimeout(() => {
      didDrag.current = false;
    }, 0);
  };

  return (
    <section
      aria-label="Our products"
      className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-4 text-center sm:mb-6">
          <SectionHeading
            badge="SANZOX Ecosystem"
            title={
              <>
                What We’ve <span className="text-neutral-400">Built</span>
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
          <div
            ref={stageRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Product showcase"
            tabIndex={0}
            style={{ paddingTop: CARD_TOP, paddingBottom: STAGE_BOTTOM }}
            className="relative overflow-hidden rounded-[2.25rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 sm:rounded-[3rem]"
          >
            {/* Draggable track: cards follow the finger, then snap via state */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onClickCapture={(e) => {
                if (didDrag.current) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              className="grid"
            >
              {products.map((product, i) => {
                const d = offsets[i];
                const abs = Math.abs(d);
                const prev = prevOffsets.current[i];
                const jumped = prev !== undefined && Math.abs(d - prev) > 1;

                return (
                  <motion.div
                    key={product.name}
                    initial={false}
                    animate={{
                      x: d * spacing,
                      scale: d === 0 ? 1 : 0.9,
                      opacity: d === 0 ? 1 : abs === 1 ? 0.45 : 0,
                      // Always specify filter so it resets to 0 when layout switches.
                      // Blur only on desktop (costly on low-end phones).
                      filter: wide && d !== 0 ? 'blur(1.5px)' : 'blur(0px)',
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
                      zIndex: 10 - abs,
                    }}
                    className="col-start-1 row-start-1 flex justify-self-center"
                    aria-hidden={d !== 0}
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${n}: ${product.name}`}
                  >
                    <ProductCard product={product} wide={wide} isActive={d === 0} />

                    {abs === 1 && (
                      <button
                        type="button"
                        aria-label={`Show ${product.name}`}
                        tabIndex={-1}
                        onClick={() => setActiveIndex(i)}
                        className={`absolute inset-0 z-20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                          wide ? 'rounded-[2.5rem]' : 'rounded-[2rem]'
                        }`}
                      />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

            <button
              type="button"
              onClick={showPrevious}
              aria-label="Show previous product"
              className="absolute left-2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 text-white backdrop-blur transition hover:scale-105 hover:bg-[#1c1c1c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:left-5 md:flex"
              style={{ top: 'calc(50% - 6px)' }}
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Show next product"
              className="absolute right-2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 text-white backdrop-blur transition hover:scale-105 hover:bg-[#1c1c1c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:right-5 md:flex"
              style={{ top: 'calc(50% - 6px)' }}
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          {/* Dots: position indicator + direct navigation (replaces mobile arrow row) */}
          <div
            role="group"
            aria-label="Choose product"
            className="flex items-center justify-center"
          >
            {products.map((product, i) => (
              <button
                key={product.name}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show ${product.name}`}
                aria-current={i === activeIndex ? 'true' : undefined}
                className="flex h-11 w-9 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/25'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true" className="sr-only">
          Showing {products[activeIndex].name} ({activeIndex + 1} of {n})
        </div>

        <div className="mt-2 flex justify-center sm:mt-3">
          <a
            href="/products"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white/[0.06] px-6 text-sm font-semibold text-white ring-1 ring-white/[0.06] transition hover:bg-white/[0.10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            Explore all products
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}