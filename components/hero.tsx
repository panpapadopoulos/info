"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";
import { useMediaQuery } from "@/lib/use-media-query";
import { ArrowUpRight, LeafIcon } from "./icons";
import { easeOut, settle } from "./reveal";
import { ScrambleText } from "./scramble-text";

// The original's order on load: the subtitle, then the name, then the CV button.
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: settle },
};

// Each name line slides up out of its own clipping mask.
const lines: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const reveal: Variants = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { type: "spring", duration: 0.9, bounce: 0 } },
};

/* The photo is pre-made layers (see public/hero/): the hall at rest (lightly blurred
   and grey), the hall in focus, and you, cut out in full colour. */
const LAYERS = {
  bg: "/hero/bg.webp",
  focus: "/hero/bg-focus.webp",
  subject: "/hero/subject.webp",
} as const;

// A camera racking focus: slow to start, settling without overshoot (~1s).
const focusPull = { stiffness: 55, damping: 18, mass: 1 };

export function Hero({ portraitAvailable }: { portraitAvailable: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");

  // Scrolling away: the photo moves slower than the page and dims.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const dim = useTransform(scrollYProgress, [0, 0.9], [1, 0.3]);

  // Hover: the hall pulls into focus and gets some colour back; the photo eases in slightly.
  const focus = useSpring(0, focusPull);
  const zoom = useTransform(focus, [0, 1], [1, reduce ? 1 : 1.03]);

  const onPointerEnter = () => {
    if (fine) focus.set(1);
  };
  const onPointerLeave = () => focus.set(0);

  const image = (src: string, alt = "") => (
    <Image
      src={asset(src)}
      alt={alt}
      fill
      priority
      sizes="(min-width: 64rem) 66vw, 100vw"
      className="object-cover object-[55%_28%] lg:object-[50%_30%]"
    />
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-title"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className="relative isolate flex min-h-svh items-end overflow-clip bg-canvas"
    >
      {portraitAvailable && (
        <motion.div
          style={reduce ? undefined : { y: parallaxY, opacity: dim }}
          className="hero-photo absolute inset-0 -z-10 lg:left-auto lg:w-[66%]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: easeOut }}
            className="absolute inset-0"
          >
            {/* All layers share one box, so they stay aligned pixel for pixel */}
            <motion.div style={{ scale: zoom }} className="absolute inset-0 will-change-transform">
              <div aria-hidden className="absolute inset-0">
                {image(LAYERS.bg)}
              </div>
              <motion.div aria-hidden style={{ opacity: focus }} className="absolute inset-0">
                {image(LAYERS.focus)}
              </motion.div>
              {/* A faint lime cast, so the hall sits in the palette */}
              <div aria-hidden className="absolute inset-0 bg-accent opacity-[0.06] mix-blend-multiply" />
              <div className="absolute inset-0">{image(LAYERS.subject, `Portrait of ${site.name}`)}</div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Ambient lime light behind the figure */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(40%_50%_at_68%_38%,rgb(193_255_114/0.10),transparent_70%)]"
      />

      <div className="container-page relative w-full pt-28 pb-14 sm:pb-16 lg:pb-20">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={rise} className="flex items-center gap-4">
            <LeafIcon className="size-10 shrink-0 text-accent motion-safe:animate-spin-slow" />
            <p className="text-lg leading-snug text-white/75">
              <span className="text-accent">{site.hero.accent}</span> {site.hero.rest[0]}
              <br />
              {site.hero.rest[1]}
            </p>
          </motion.div>

          <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-8">
            <motion.h1
              variants={lines}
              id="hero-title"
              className="text-[clamp(2.75rem,12vw,8.5rem)] leading-[0.98] font-semibold tracking-[-0.035em] lg:text-[clamp(4rem,9vw,8.5rem)]"
            >
              {site.nameLines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <motion.span variants={reveal} className="block">
                    {/* Decodes from code characters while it slides up */}
                    <ScrambleText text={line} delay={300 + i * 140} />
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.div variants={rise} className="lg:pb-5">
              <a
                href={asset(site.cvUrl)}
                className="group inline-flex h-[60px] items-center gap-5 rounded-full bg-accent pr-1.5 pl-7 text-lg font-semibold text-accent-ink transition-[transform,background-color] duration-200 ease-out hover:bg-white active:scale-[0.97]"
              >
                CV
                <span className="grid size-12 place-items-center rounded-full bg-white text-charcoal transition-[background-color,color] duration-200 ease-out group-hover:bg-charcoal group-hover:text-accent">
                  <ArrowUpRight className="size-5 transition-transform duration-300 ease-out-strong group-hover:rotate-45" />
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
