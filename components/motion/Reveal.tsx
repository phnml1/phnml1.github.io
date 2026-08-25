'use client';

import type { ReactNode } from 'react';
import { m } from 'motion/react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  amount?: number;
}

const easing = [0.22, 1, 0.36, 1] as const;

export default function Reveal({
  children,
  className,
  delay = 0,
  distance = 18,
  amount = 0.18,
}: RevealProps) {
  return (
    <m.div
      data-motion-reveal=""
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.48, delay, ease: easing }}
    >
      {children}
    </m.div>
  );
}
