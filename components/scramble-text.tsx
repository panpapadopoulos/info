"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const GLYPHS = "{}[]<>/\\;:=+*_#$%&01";

/** How long each letter scrambles before locking in, and the extra wait per letter. */
const BASE_MS = 380;
const PER_LETTER_MS = 42;
/** Glyphs change at this interval rather than every frame, so they read as flicker, not noise. */
const TICK_MS = 55;

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

/**
 * Text whose letters cycle through code characters and lock in left to right.
 * Each scrambling glyph is drawn over its own letter, which keeps its place (invisible)
 * so the line never changes width. Screen readers get the plain text.
 */
export function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduced = useReducedMotion();
  const letters = [...text];
  // null = settled; a string = the glyph currently shown over that letter.
  const [glyphs, setGlyphs] = useState<(string | null)[]>(() => letters.map(() => null));

  useEffect(() => {
    if (reduced) return;
    const settleAt = letters.map((_, i) => delay + BASE_MS + i * PER_LETTER_MS + Math.random() * 90);
    const end = Math.max(...settleAt);
    let start = 0;
    let lastTick = -Infinity;
    let frame = requestAnimationFrame(function step(now) {
      start ||= now;
      const t = now - start;
      if (now - lastTick >= TICK_MS || t >= end) {
        lastTick = now;
        setGlyphs(settleAt.map((at, i) => (t >= at || letters[i] === " " ? null : randomGlyph())));
      }
      if (t < end) frame = requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(frame);
    // The text is fixed for the page's life; run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="whitespace-nowrap">
        {letters.map((letter, i) => (
          <span key={i} className="relative inline-block">
            <span className={glyphs[i] ? "invisible" : undefined}>{letter}</span>
            {glyphs[i] && (
              <span className="absolute inset-0 flex justify-center font-mono font-normal text-accent/80">
                {glyphs[i]}
              </span>
            )}
          </span>
        ))}
      </span>
    </>
  );
}
