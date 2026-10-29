"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * A number that counts up once when it scrolls into view. The final value is in the
 * HTML, so it reads correctly without JavaScript and under reduced motion.
 */
export function StatCounter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const format = (n: number) => n.toFixed(decimals);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!shown) {
      el.textContent = format(0);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (n) => (el.textContent = format(n)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, reduced, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(value)}
    </span>
  );
}
