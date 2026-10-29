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

/** Arriving on the homepage from /cv with the name morph: the name must already be in place. */
const skipIntro = () => typeof document !== "undefined" && document.documentElement.classList.contains("from-cv");

/**
 * Text whose letters cycle through code characters and lock in left to right.
 * Each scrambling glyph is drawn over its own letter, which keeps its place (invisible)
 * so the line never changes width; words stay unbroken. Screen readers get the plain text.
 * It runs once, when `play` first becomes true.
 */
export function ScrambleText({ text, delay = 0, play = true }: { text: string; delay?: number; play?: boolean }) {
  const reduced = useReducedMotion();
  const letters = [...text];
  // null = settled; a string = the glyph currently shown over that letter.
  const [glyphs, setGlyphs] = useState<(string | null)[]>(() => letters.map(() => null));
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (reduced || !play || played || skipIntro()) return;
    setPlayed(true);
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
    // The text is fixed for the page's life; run once when asked to play.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, play]);

  // Letters grouped into words, each word unbreakable, with ordinary spaces between them.
  let index = 0;
  const words = text.split(" ").map((word) => {
    const start = index;
    index += [...word].length + 1;
    return { word, start };
  });

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map(({ word, start }, w) => (
          <span key={w}>
            {w > 0 && " "}
            <span className="whitespace-nowrap">
              {[...word].map((letter, j) => {
                const glyph = glyphs[start + j];
                return (
                  <span key={j} className="relative inline-block">
                    <span className={glyph ? "invisible" : undefined}>{letter}</span>
                    {glyph && (
                      <span className="absolute inset-0 flex justify-center font-mono font-normal text-accent/80">
                        {glyph}
                      </span>
                    )}
                  </span>
                );
              })}
            </span>
          </span>
        ))}
      </span>
    </>
  );
}
