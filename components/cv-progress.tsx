"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A thin lime line along the bottom of the CV's top bar that fills as you read. */
export function CvProgress() {
  const { scrollYProgress } = useScroll();
  // Lightly smoothed so it doesn't jitter with wheel steps; still tracks closely.
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent"
    />
  );
}
