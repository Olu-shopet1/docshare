import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Position within a group — adds a 0.1s stagger per step. */
  index?: number;
  as?: 'div' | 'li';
};

/** Scroll reveal: fade + 28px rise + de-blur, once. Renders static under reduced motion. */
export function Reveal({ children, className, index = 0, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = as === 'li' ? motion.li : motion.div;
  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE_EXPO_OUT, delay: index * 0.1 }}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-[#00d2ff]">{children}</p>;
}
