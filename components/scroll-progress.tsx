"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A thin line along the bottom edge of a top bar that fills as the page is read. */
export function ScrollProgress({ className = "h-0.5 bg-accent" }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  // Lightly smoothed so it doesn't jitter with wheel steps; still tracks closely.
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className={`absolute inset-x-0 -bottom-px origin-left ${className}`}
    />
  );
}
