"use client";

import { MotionConfig } from "framer-motion";

// Honour the OS reduced-motion setting: transforms are dropped, opacity is kept.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
