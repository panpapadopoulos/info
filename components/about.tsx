"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";
import { ArrowUpRight, FileIcon } from "./icons";
import { easeOut, inView, Reveal } from "./reveal";
import type { TerminalLine } from "@/lib/terminal";
import { Section } from "./section";
import { SocialLinks } from "./social-links";
import { SweepLink } from "./rich";
import { Terminal } from "./terminal";

export function About({ terminal }: { terminal: TerminalLine[] }) {
  return (
    <Section id="about" index="01" badge="About me" title="About me" decoration={<LeafOutline />}>
      <Reveal>
        {/* Justified as on the original, with hyphenation so word gaps stay as even as possible */}
        <p className="text-justify text-lg leading-[1.75] text-muted hyphens-auto">{site.about}</p>
      </Reveal>

      <Reveal className="mt-10">
        <Terminal lines={terminal} />
      </Reveal>

      <Reveal className="mt-12">
        <h3 className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] font-bold tracking-[-0.02em]">
          Basic Information
        </h3>
        <dl className="mt-6 space-y-3">
          {site.basicInfo.map((row) => (
            <div key={row.value} className="grid gap-1 sm:grid-cols-[1fr_2fr] sm:gap-4">
              <dt className="text-sm font-bold tracking-wide text-faint uppercase sm:text-base sm:tracking-normal">{row.label}</dt>
              <dd className="text-ink">
                {"href" in row ? <SweepLink href={row.href}>{row.value}</SweepLink> : row.value}
                {"note" in row && <small className="ml-1.5 text-faint">{row.note}</small>}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal className="mt-10">
        <SocialLinks />
      </Reveal>

      <div className="mt-10 grid max-w-[39rem] grid-cols-2 gap-4 sm:gap-6">
        {site.documents.map((doc, i) => (
          <Reveal key={doc.label} index={i} className="w-full max-w-[300px]">
            <DocumentCard {...doc} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/** Résumé and CV tiles. Hover (or keyboard focus) reveals what each document is;
    on touch screens, which can't hover, the note is always shown. */
function DocumentCard({ label, href, note }: { label: string; href: string; note: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={asset(href)}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-[20px] bg-accent p-4 text-accent-ink ring-1 ring-transparent transition-[transform,background-color,color,box-shadow] duration-200 ease-out-strong hover:scale-[1.03] hover:bg-charcoal hover:text-white hover:ring-accent/50 hover:shadow-[0_18px_40px_-16px_rgb(193_255_114/0.35)] focus-visible:bg-charcoal focus-visible:text-white active:scale-[0.98] sm:p-5"
    >
      <span className="flex items-start justify-between">
        <FileIcon className="size-7 transition-colors duration-200 group-hover:text-accent group-focus-visible:text-accent" />
        <ArrowUpRight className="size-5 transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
      <span>
        <span className="block text-[clamp(1.375rem,6vw,2rem)] leading-tight font-extrabold">{label}</span>
        <span className="mt-1 block text-[0.9375rem] leading-snug font-medium transition-[opacity,translate] duration-200 ease-out [@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100">
          {note}
        </span>
      </span>
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}

/** The faint leaf outline that sat in the corner of the original About section. */
function LeafOutline() {
  return (
    <motion.div
      {...inView}
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1, transition: { duration: 1, ease: easeOut } },
      }}
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-0 origin-bottom-left"
    >
      <Image src={asset("/images/leaf-outline.svg")} alt="" width={482} height={478} className="w-[22rem] sm:w-[30rem]" />
    </motion.div>
  );
}
