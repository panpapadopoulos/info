"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { sections, site } from "@/lib/site";
import { CloseIcon, LeafIcon, MenuIcon } from "./icons";
import { easeOut } from "./reveal";
import { SweepLink } from "./rich";

type SectionId = (typeof sections)[number]["id"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId>("top");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Transparent over the hero; the lime bar once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlights the section in the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Escape or a click outside closes the menu.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus({ preventScroll: true });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-t-4 border-accent transition-[background-color,box-shadow] duration-200 ease-out ${
        scrolled ? "bg-accent shadow-[0_10px_30px_-14px_rgb(0_0_0/0.7)]" : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center sm:h-[5.25rem] justify-between gap-4">
        <a
          href="#top"
          tabIndex={scrolled ? 0 : -1}
          className={`min-w-0 truncate text-[clamp(1.125rem,4.5vw,2.25rem)] font-semibold tracking-[-0.02em] text-accent-ink transition-[opacity,transform] duration-200 ease-out-strong active:opacity-70 ${
            scrolled ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          {site.name}
        </a>

        <div className="relative shrink-0">
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((o) => !o)}
            className={`relative grid size-10 place-items-center sm:size-[45px] rounded-full transition-[background-color,color,transform] duration-200 ease-out active:scale-[0.92] ${
              scrolled
                ? "bg-charcoal text-white hover:bg-black"
                : "bg-white text-charcoal hover:bg-accent"
            }`}
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                transition={{ duration: 0.16, ease: easeOut }}
                className="grid place-items-center"
              >
                {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-6" />}
              </motion.span>
            </AnimatePresence>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                id="site-menu"
                ref={panelRef}
                initial={{ opacity: 0, scale: 0.96, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -4, transition: { duration: 0.12, ease: easeOut } }}
                transition={{ duration: 0.18, ease: easeOut }}
                style={{ transformOrigin: "top right" }}
                className="absolute top-[calc(100%+12px)] right-0 max-h-[calc(100dvh-100px)] w-[min(380px,calc(100vw-32px))] overflow-y-auto overscroll-contain rounded-2xl border border-line bg-surface p-6 shadow-[0_28px_70px_-24px_rgb(0_0_0/0.9)]"
              >
                <div className="flex items-center justify-between border-b border-line pb-5">
                  <p className="text-xl">Menu</p>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="grid size-9 place-items-center rounded-full text-muted transition-[background-color,color,transform] duration-150 ease-out hover:bg-raised hover:text-ink active:scale-90"
                  >
                    <CloseIcon className="size-5" />
                  </button>
                </div>

                <nav aria-label="Primary" className="mt-4">
                  <ul className="flex flex-col">
                    {sections.map(({ id, label }, i) => {
                      const isActive = active === id;
                      return (
                        <motion.li
                          key={id}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, ease: easeOut, delay: 0.03 + i * 0.025 }}
                        >
                          <a
                            href={`#${id}`}
                            onClick={() => setOpen(false)}
                            aria-current={isActive ? "location" : undefined}
                            className={`group relative flex items-center py-1.5 text-[1.375rem] font-bold transition-colors duration-150 active:opacity-70 ${
                              isActive ? "text-accent" : "text-ink hover:text-accent"
                            }`}
                          >
                            {/* The leaf slides in on hover, as on the original menu */}
                            <LeafIcon
                              className={`absolute left-0 size-5 transition-[opacity,scale] duration-200 ease-out-strong motion-safe:animate-spin-slow ${
                                isActive ? "scale-100 opacity-100" : "scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                              }`}
                            />
                            <span
                              className={`transition-transform duration-200 ease-out-strong ${
                                isActive ? "translate-x-7" : "group-hover:translate-x-7"
                              }`}
                            >
                              {label}
                            </span>
                          </a>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <a
                    href={asset(site.resume)}
                    className="grid h-11 place-items-center rounded-lg bg-white font-semibold text-charcoal transition-[transform,background-color] duration-150 ease-out hover:bg-accent active:scale-[0.97]"
                  >
                    Résumé
                  </a>
                  <a
                    href={site.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-11 place-items-center rounded-lg bg-charcoal font-semibold text-white ring-1 ring-white/10 transition-[transform,background-color] duration-150 ease-out hover:bg-black active:scale-[0.97]"
                  >
                    CV
                  </a>
                </div>

                <div className="mt-6 flex flex-col items-start gap-1">
                  <SweepLink href={site.menu.email.href} className="font-bold text-ink">
                    {site.menu.email.label}
                  </SweepLink>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
