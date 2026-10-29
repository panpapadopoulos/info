"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import type { TimelineCard } from "@/lib/site";
import { inView, rise } from "./reveal";
import { RichLines, RichText } from "./rich";

// Snappy, well damped: lifts in ~180ms with no wobble.
const lift = { type: "spring", stiffness: 420, damping: 30, mass: 0.8 } as const;

export function CardList({ cards }: { cards: TimelineCard[] }) {
  return (
    <div className="space-y-5 sm:space-y-6">
      {cards.map((card, i) => (
        <Card key={`${card.label}-${card.title}`} card={card} index={i % 3} />
      ))}
    </div>
  );
}

/** A date range, one end per line, so the narrow panel never splits a month from its year. */
function When({ range }: { range: string }) {
  const [start, end] = range.split(" - ");
  return (
    <p className="text-[0.9375rem] font-light md:mb-1 md:text-base">
      <span className="whitespace-nowrap">
        {start}
        {end && " –"}
      </span>
      {end && <span className="md:block"> {end}</span>}
    </p>
  );
}

/** The original card: lime side panel with the date, body on the right. */
function Card({ card, index }: { card: TimelineCard; index: number }) {
  const glowRef = useRef<HTMLSpanElement>(null);
  const spotRef = useRef<HTMLSpanElement>(null);

  // Write the pointer position onto the two glow layers only, so nothing else restyles.
  const trackGlow = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    for (const layer of [glowRef.current, spotRef.current]) {
      layer?.style.setProperty("--x", `${e.clientX - rect.left}px`);
      layer?.style.setProperty("--y", `${e.clientY - rect.top}px`);
    }
  };

  const hasHeader = Boolean(card.title || card.meta);

  return (
    <motion.article
      {...inView}
      variants={rise}
      custom={index}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={lift}
      onPointerMove={trackGlow}
      className="group relative rounded-xl"
    >
      {/* Border glow: shows through the card's 1px border and follows the pointer */}
      <span
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), rgb(193 255 114 / 0.8), transparent 70%)",
        }}
      />

      <div className="relative grid overflow-hidden rounded-[inherit] border border-line bg-surface bg-clip-padding shadow-[0_1px_2px_rgb(0_0_0/0.4)] transition-shadow duration-200 ease-out group-hover:shadow-[0_22px_44px_-20px_rgb(0_0_0/0.9)] md:grid-cols-[25%_minmax(0,1fr)]">
        {/* Spotlight: a soft lime light on the card's surface, under the content, following the pointer */}
        <span
          ref={spotRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgb(193 255 114 / 0.07), transparent 65%)",
          }}
        />
        <div className="relative flex flex-col items-start gap-0.5 bg-accent px-5 py-3 text-accent-ink md:items-center md:justify-center md:gap-0 md:px-4 md:py-5 md:text-center">
          {card.when && <When range={card.when} />}
          <p className="order-first text-[1.0625rem] leading-snug font-bold md:order-none">{card.label}</p>
        </div>

        <div className="relative p-5 sm:p-7">
          {card.title && <h3 className="text-[1.0625rem] leading-snug font-bold">{card.title}</h3>}
          {card.meta?.map((line, i) => (
            <p key={i} className="mt-2 leading-relaxed text-muted">
              <RichText line={line} />
            </p>
          ))}
          {/* One line reads as a sentence; several read better as separate points */}
          {card.body && card.body.length === 1 && (
            <p className={`leading-relaxed text-muted md:text-justify md:hyphens-auto ${hasHeader ? "mt-2" : ""}`}>
              <RichLines lines={card.body} />
            </p>
          )}
          {card.body && card.body.length > 1 && (
            <ul className={`space-y-2 leading-relaxed text-muted md:text-justify md:hyphens-auto ${hasHeader ? "mt-3" : ""}`}>
              {card.body.map((line, i) => (
                <li
                  key={i}
                  // A line holding a link (often a long, unbreakable URL) would stretch into wide gaps if justified.
                  className={`relative pl-4 before:absolute before:top-[0.68em] before:left-0 before:size-1.5 before:rounded-full before:bg-accent ${
                    line.some((part) => typeof part !== "string") ? "md:text-left" : ""
                  }`}
                >
                  <RichText line={line} />
                </li>
              ))}
            </ul>
          )}
          {card.code && <CodePeek code={card.code} />}
        </div>
      </div>
    </motion.article>
  );
}

const codeTone = { keyword: "text-accent", string: "text-ink/85", plain: "text-muted", muted: "text-faint" } as const;

/** One line of code under a project. Slides open on hover where hover exists; always shown on touch. */
function CodePeek({ code }: { code: NonNullable<TimelineCard["code"]> }) {
  return (
    <div
      aria-hidden
      className="grid transition-[grid-template-rows,opacity] duration-300 ease-out [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100"
    >
      <div className="min-h-0 overflow-hidden">
        <p className="mt-4 truncate rounded-md bg-canvas/70 px-3 py-2 font-mono text-[0.78rem] ring-1 ring-line">
          <span className="text-faint">› </span>
          {code.map(([text, tone], i) => (
            <span key={i} className={codeTone[tone]}>
              {text}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
