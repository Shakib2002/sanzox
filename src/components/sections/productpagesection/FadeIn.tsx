import type { ReactNode } from 'react';
import { useCallback, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const reducedMotion = useReducedMotion();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasEnteredView = useRef(false);

  const attachRef = useCallback((element: HTMLDivElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;
    window.removeEventListener('scroll', reveal, true);

    if (!element) return;

    if (reducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'none';
      return;
    }

    element.style.opacity = '0';
    element.style.transform = 'translateY(36px)';

    function reveal() {
      if (hasEnteredView.current || !element) return;

      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        hasEnteredView.current = true;
        observerRef.current?.disconnect();
        window.removeEventListener('scroll', reveal, true);
        element.animate(
          [
            { opacity: 0, transform: 'translateY(36px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: 800,
            delay: delay * 1000,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'forwards',
          },
        );
      }
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) reveal();
    }, { threshold: 0.01 });

    observerRef.current.observe(element);
    window.addEventListener('scroll', reveal, { passive: true, capture: true });
    reveal();
  }, [delay, reducedMotion]);

  return (
    <div ref={attachRef} className={className}>
      {children}
    </div>
  );
}
