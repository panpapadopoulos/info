"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { draw, group, inView, pop, rise, slideIn } from "./reveal";
import { SweepLink } from "./rich";
import { ScrambleText } from "./scramble-text";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";

/** The original section frame: numbered badge row on the left, content on the right. */
export function Section({
  id,
  index,
  badge,
  title,
  band = false,
  decoration,
  children,
}: {
  id: string;
  index: string;
  badge: string;
  title: string;
  /** Alternate tone, in place of the original's light-gray sections. */
  band?: boolean;
  decoration?: React.ReactNode;
  children: React.ReactNode;
}) {
  const titleId = `${id}-title`;
  const titleRef = useRef<HTMLHeadingElement>(null);
  // Same trigger as the title's rise, so it decodes while it moves into place.
  const titleShown = useInView(titleRef, { once: true, margin: "0px 0px -10% 0px" });

  // The section uses overflow `clip`, not `hidden`: hidden would make it a scroll
  // container and break the sticky badge row.
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`relative overflow-clip py-14 sm:py-24 xl:py-32 ${band ? "bg-band" : "bg-canvas"}`}
    >
      {decoration}
      <div className="container-page relative grid gap-8 xl:grid-cols-12 xl:gap-x-8">
        {/* Pinned below the header while its section scrolls past */}
        <motion.div
          {...inView}
          variants={group}
          className="flex items-center gap-4 py-2 sm:gap-7 xl:sticky xl:top-28 xl:col-span-4 xl:self-start"
        >
          <motion.span
            variants={pop}
            className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-sm font-medium text-accent-ink tabular-nums"
          >
            {index}
          </motion.span>
          <motion.span
            variants={draw}
            aria-hidden
            className="h-px w-10 shrink-0 sm:w-16 origin-left bg-line-strong"
          />
          <motion.span
            variants={slideIn}
            className="rounded-full bg-charcoal px-4 py-1.5 text-[0.9375rem] font-semibold text-white ring-1 ring-white/10"
          >
            {badge}
          </motion.span>
        </motion.div>

        <div className="min-w-0 xl:col-span-8 2xl:col-span-7">
          <div className="max-w-[35rem]">
            <motion.h2
              ref={titleRef}
              {...inView}
              variants={rise}
              id={titleId}
              className="text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.1] font-bold tracking-[-0.02em]"
            >
              <ScrambleText text={title} play={titleShown} />
            </motion.h2>
            <div className="mt-6 sm:mt-8">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** “more at my full CV …”, closing each list as on the original. */
export function MoreAtCv() {
  return (
    <motion.p {...inView} variants={rise} className="mt-6 text-muted">
      more at my{" "}
      <SweepLink href={asset(site.moreCvUrl)} className="font-medium text-ink">
        full CV
      </SweepLink>{" "}
      <small>...</small>
    </motion.p>
  );
}
