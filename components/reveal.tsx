"use client";

import { motion, type Variants } from "framer-motion";

/* Shared entrance motion. Reduced motion is handled globally by MotionProvider:
   transforms are dropped and only the opacity fade remains. */

export const easeOut = [0.23, 1, 0.32, 1] as const;

// Critically damped: decelerates naturally into place with no overshoot.
export const settle = { type: "spring", duration: 0.7, bounce: 0 } as const;

/** Spread onto a motion element to play its variants once as it scrolls into view. */
export const inView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "0px 0px -10% 0px" },
} as const;

export const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

/** Rises into place; `custom` is a stagger index for siblings that enter together. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { ...settle, delay: i * 0.07 } }),
};

export const slideIn: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: settle },
};

export const pop: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", duration: 0.5, bounce: 0.3 } },
};

export const draw: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.5, ease: easeOut } },
};

/** A block that rises into view on its own. */
export function Reveal({
  children,
  className,
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div {...inView} variants={rise} custom={index} className={className}>
      {children}
    </motion.div>
  );
}
