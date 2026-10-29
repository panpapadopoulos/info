"use client";

import { useEffect, useRef, useState } from "react";

/** Distance from the top of the viewport at which a section counts as current. */
const ACTIVE_LINE = 160;

/** Section links for the CV's top bar; highlights the section being read. */
export function CvNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string | undefined>(sections[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | undefined = sections[0]?.id;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_LINE) current = id;
      }
      // At the very bottom, the last section is current even if it's short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = sections.at(-1)?.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sections]);

  // Keep the current link in view inside the scrollable row (phones), without moving the page.
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !link) return;
    const left = link.offsetLeft - list.clientWidth / 2 + link.clientWidth / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <ul
      ref={listRef}
      // Faded ends hint that the row scrolls sideways when the links don't all fit.
      className="flex gap-1 overflow-x-auto overscroll-x-contain px-2 py-2 [mask-image:linear-gradient(to_right,transparent,#000_0.75rem,#000_calc(100%-2.5rem),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {sections.map(({ id, label }) => {
        const current = id === active;
        return (
          <li key={id} className="shrink-0">
            <a
              href={`#${id}`}
              data-id={id}
              aria-current={current ? "location" : undefined}
              className={`block rounded-full px-3 py-1.5 text-[0.8125rem] font-medium whitespace-nowrap transition-[color,background-color] duration-200 ease-out active:opacity-70 ${
                current ? "bg-accent text-accent-ink" : "text-muted hover:bg-raised hover:text-ink"
              }`}
            >
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
