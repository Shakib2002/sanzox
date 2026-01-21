import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useCountUp } from './useCountUp';

interface HeroStat {
  value: number;
  suffix: string;
  label: string;
}

const defaultStats: HeroStat[] = [
  { value: 30, suffix: '+', label: 'Projects' },
  { value: 5, suffix: 'M+', label: 'Views' },
  { value: 13, suffix: '+', label: 'Team' },
];

export function useHeroStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Create animated counts for each stat
  const animatedStats = defaultStats.map((stat) => ({
    ...stat,
    animatedValue: useCountUp(stat.value, 2000, isInView),
  }));

  return {
    ref,
    stats: animatedStats,
    isInView,
  };
}
