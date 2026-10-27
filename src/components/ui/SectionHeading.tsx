import { ReactNode, isValidElement, Children, cloneElement, ReactElement } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeUpVariants } from '@/hooks/useScrollAnimation';

interface SectionHeadingProps {
  badge?: string;
  title: string | ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

const UNDERLINE_TARGET = 'text-muted-foreground';

export function SectionHeading({
  badge,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={cn(
        'mb-10 md:mb-14',
        align === 'center' && 'text-center max-w-3xl mx-auto',
        align === 'left' && 'max-w-2xl',
        className
      )}
    >
      {badge && (
        <div
          className={cn(
            'flex items-center gap-3 mb-5',
            align === 'center' ? 'justify-center' : 'justify-start'
          )}
        >
          <span
            aria-hidden="true"
            className="h-px w-8 bg-gradient-to-r from-transparent to-primary/60"
          />
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            {badge}
          </span>
          <span
            aria-hidden="true"
            className="h-px w-8 bg-gradient-to-l from-transparent to-primary/60"
          />
        </div>
      )}

      <h2 className="heading-lg text-balance tracking-tight pb-3">
        {decorateTitle(title)}
      </h2>

      {description && (
        <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}

/**
 * Recursively walks the title tree. Any element whose className contains
 * `text-muted-foreground` gets wrapped in a relative span with the
 * hand-drawn underline attached beneath it.
 */
function decorateTitle(node: ReactNode): ReactNode {
  if (typeof node === 'string' || typeof node === 'number') return node;
  if (!isValidElement(node)) {
    if (Array.isArray(node)) return Children.map(node, decorateTitle);
    return node;
  }

  const el = node as ReactElement<{
    className?: string;
    children?: ReactNode;
  }>;

  const className = el.props.className ?? '';
  const isTarget =
    el.type === 'span' && className.split(/\s+/).includes(UNDERLINE_TARGET);

  // Recurse into children first so nested muted spans inside wrappers also match.
  const patchedChildren = el.props.children
    ? Children.map(el.props.children, decorateTitle)
    : el.props.children;

  if (isTarget) {
    return (
      <span className="relative inline-block pb-2">
        {cloneElement(el, { children: patchedChildren })}
        <Underline />
      </span>
    );
  }

  if (patchedChildren !== el.props.children) {
    return cloneElement(el, { children: patchedChildren });
  }

  return el;
}

/**
 * Hand-drawn underline that draws itself in when the heading enters the viewport.
 * Inherits `currentColor` so it works on light/dark themes without theming.
 */
function Underline() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-2 left-0 w-full overflow-visible text-primary"
      height="12"
      viewBox="0 0 200 12"
      fill="none"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M2 8.5C40 4.5 80 4.5 120 6.5C160 8.5 180 7.5 198 5.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.55 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      />
    </svg>
  );
}