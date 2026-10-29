"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { TerminalLine, Tone } from "@/lib/terminal";

const PROMPT = "panagiotis@pnw:~$";

const toneClass: Record<Tone, string> = {
  plain: "text-ink",
  accent: "text-accent",
  muted: "text-faint",
  key: "text-accent/80",
  string: "text-ink/85",
};

/** Typing speed: a little uneven, like a person. */
const keyDelay = () => 38 + Math.random() * 55;

/**
 * A terminal that types out a short session once it scrolls into view.
 * Every line is laid out from the start (hidden until reached), so the page never shifts.
 * Reduced motion shows it finished; screen readers get the transcript as plain text.
 */
export function Terminal({ lines }: { lines: TerminalLine[] }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [line, setLine] = useState(0);
  const [char, setChar] = useState(0);
  const done = line >= lines.length;

  useEffect(() => {
    if (reduced) {
      setLine(lines.length);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, lines.length]);

  useEffect(() => {
    if (!started || done) return;
    const current = lines[line];
    let delay: number;
    let step: () => void;
    if (current.kind === "command") {
      if (char < current.text.length) {
        // A short pause before each command, as if thinking.
        delay = char === 0 ? 550 : keyDelay();
        step = () => setChar((c) => c + 1);
      } else {
        delay = 260;
        step = () => {
          setLine((l) => l + 1);
          setChar(0);
        };
      }
    } else {
      delay = 55;
      step = () => setLine((l) => l + 1);
    }
    const t = setTimeout(step, delay);
    return () => clearTimeout(t);
  }, [started, done, line, char, lines]);

  const skip = () => {
    setStarted(true);
    setLine(lines.length);
  };
  const replay = () => {
    setLine(0);
    setChar(0);
    setStarted(true);
  };

  const cursor = (
    <span className="ml-px inline-block h-[1.15em] w-[0.55em] translate-y-[0.2em] bg-accent motion-safe:animate-blink" />
  );

  return (
    <figure ref={ref} className="overflow-hidden rounded-xl bg-[#0d0f10] ring-1 ring-line-strong">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-accent/70" />
        </span>
        <figcaption className="flex-1 truncate text-center font-mono text-xs text-faint">
          ~/about — zsh
        </figcaption>
        {!reduced && (
          <button
            type="button"
            onClick={done ? replay : skip}
            className="rounded-md px-2 py-0.5 font-mono text-xs text-faint transition-colors duration-150 hover:text-accent active:opacity-70"
          >
            {done ? "↻ replay" : "skip ⏭"}
          </button>
        )}
      </div>

      {/* The transcript, for screen readers; the typed version below is visual only. */}
      <pre className="sr-only">
        {lines
          .map((l) => (l.kind === "command" ? `$ ${l.text}` : l.parts.map(([t]) => t).join("")))
          .join("\n")}
      </pre>

      <div
        aria-hidden
        className="px-4 py-4 font-mono text-[0.78rem] leading-[1.7] break-words whitespace-pre-wrap sm:text-[0.8125rem]"
      >
        {lines.map((l, i) => {
          const hidden = i > line || (i === line && l.kind === "output") || (i === line && !started);
          if (l.kind === "command") {
            const typed = i < line ? l.text.length : i === line ? char : 0;
            return (
              <div key={i} className={`pl-[2ch] -indent-[2ch] ${hidden ? "invisible" : ""}`}>
                <span className="text-accent">{PROMPT}</span> <span className="text-ink">{l.text.slice(0, typed)}</span>
                {i === line && started && cursor}
                <span className="invisible">{l.text.slice(typed)}</span>
              </div>
            );
          }
          return (
            <div key={i} className={`pl-[2ch] -indent-[2ch] ${hidden ? "invisible" : ""}`}>
              {l.parts.map(([text, tone], j) => (
                <span key={j} className={toneClass[tone]}>
                  {text}
                </span>
              ))}
            </div>
          );
        })}
        <div className={done ? undefined : "invisible"}>
          <span className="text-accent">{PROMPT}</span> {cursor}
        </div>
      </div>
    </figure>
  );
}
