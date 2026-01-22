import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface OdometerNumberProps {
  value: number;
  isInView: boolean;
  className?: string;
}

export function OdometerNumber({ value, isInView, className = '' }: OdometerNumberProps) {
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.01,
  });

  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <motion.span className={className}>
      <motion.span>{display}</motion.span>
    </motion.span>
  );
}

interface OdometerDigitProps {
  digit: string;
  delay?: number;
}

export function OdometerDigit({ digit, delay = 0 }: OdometerDigitProps) {
  const numericDigit = parseInt(digit, 10);
  const isNumber = !isNaN(numericDigit);

  if (!isNumber) {
    return <span>{digit}</span>;
  }

  return (
    <span className="inline-block relative h-[1em] w-[0.6em] overflow-hidden">
      <motion.span
        className="absolute inset-0 flex flex-col items-center"
        initial={{ y: '100%' }}
        animate={{ y: `-${numericDigit * 10}%` }}
        transition={{
          duration: 1.2,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="h-[1em] leading-[1em]">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

interface FlipOdometerProps {
  value: string;
  isInView: boolean;
  className?: string;
}

export function FlipOdometer({ value, isInView, className = '' }: FlipOdometerProps) {
  const chars = value.split('');

  return (
    <span className={`inline-flex ${className}`}>
      {chars.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.05 }}
        >
          {isInView ? (
            <OdometerDigit digit={char} delay={index * 0.1} />
          ) : (
            <span className="opacity-0">{char}</span>
          )}
        </motion.span>
      ))}
    </span>
  );
}
