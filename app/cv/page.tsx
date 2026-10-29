import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/print-button";
import { InlineLink, RichText } from "@/components/rich";
import { cv, parseLinks } from "@/lib/cv";

const { personal } = cv;

export const metadata: Metadata = {
  title: `CV — ${personal.name}`,
  description: `Curriculum vitae of ${personal.name}, ${personal.title}.`,
  alternates: { canonical: "/cv" },
};

const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** A section of the CV: label column on the left, entries on the right. */
function CvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="cv-section grid gap-4 border-t border-line py-8 md:grid-cols-[11rem_1fr] md:gap-8">
      <h2 className="cv-label text-xs font-semibold tracking-[0.14em] text-accent uppercase">{title}</h2>
      <div className="grid gap-7">{children}</div>
    </section>
  );
}

/** Title on the left, date on the right, wrapping under it on narrow screens. */
function EntryHead({ title, when, sub }: { title: React.ReactNode; when?: string; sub?: string }) {
  return (
    <header>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="min-w-0 flex-1 basis-[18rem] text-[1.0625rem] leading-snug font-semibold">{title}</h3>
        {when && <p className="cv-muted shrink-0 text-sm text-faint tabular-nums">{when}</p>}
      </div>
      {sub && <p className="cv-muted mt-1 text-[0.9375rem] text-muted">{sub}</p>}
    </header>
  );
}

const join = (...parts: (string | undefined)[]) => parts.filter(Boolean).join(" · ");

export default function CvPage() {
  const contacts = [
    { label: personal.email, href: `mailto:${personal.email}` },
    personal.website && { label: stripProtocol(personal.website), href: personal.website },
    personal.linkedin && { label: "LinkedIn", href: personal.linkedin },
    personal.github && { label: "GitHub", href: personal.github },
    personal.scholar && { label: "Google Scholar", href: personal.scholar },
  ].filter((c): c is { label: string; href: string } => Boolean(c));

  return (
    <div className="cv-page min-h-svh bg-canvas">
      <nav
        aria-label="CV actions"
        className="cv-actions sticky top-0 z-10 border-b border-line bg-canvas/85 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-[52rem] items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className="link-sweep pb-0.5 text-sm font-medium text-muted hover:text-accent"
          >
            ← Back to Home
          </Link>
          <PrintButton />
        </div>
      </nav>

      <main id="main" className="mx-auto max-w-[52rem] px-4 pt-12 pb-20 sm:px-6 sm:pt-16">
        <header className="pb-8">
          <h1 className="text-[clamp(2.25rem,7vw,3.5rem)] leading-[1.05] font-bold tracking-[-0.03em]">
            {personal.name}
          </h1>
          <p className="cv-title mt-3 text-lg font-medium text-accent">{personal.title}</p>
          <ul className="cv-muted mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem] text-muted">
            <li>{personal.location}</li>
            {contacts.map((c) => (
              <li key={c.href}>
                <InlineLink href={c.href}>{c.label}</InlineLink>
              </li>
            ))}
          </ul>
          <p className="mt-7 max-w-[65ch] text-[0.9375rem] leading-relaxed text-ink/85">{personal.summary}</p>
        </header>

        <CvSection title="Education">
          {cv.education.map((e) => (
            <article key={e.degree + e.institution} className="cv-entry">
              <EntryHead title={e.degree} when={e.year} sub={join(e.institution, e.location)} />
              <ul className="mt-2 grid gap-1 text-[0.9375rem] leading-relaxed text-ink/85">
                {e.grade && <li>Grade: {e.grade}</li>}
                {e.honors && <li>{e.honors}</li>}
                {e.thesis && <li>Thesis: “{e.thesis}”</li>}
              </ul>
            </article>
          ))}
        </CvSection>

        <CvSection title="Experience">
          {cv.experience.map((x) => (
            <article key={x.role + x.organization + x.period} className="cv-entry">
              <EntryHead title={x.role} when={x.period} sub={join(x.organization, x.location)} />
              {x.bulletPoints && x.bulletPoints.length > 0 && (
                <ul className="cv-bullets mt-3 grid gap-1.5 text-[0.9375rem] leading-relaxed text-ink/85">
                  {x.bulletPoints.map((b, i) => (
                    <li key={i} className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:size-1.5 before:rounded-full before:bg-accent/70">
                      <RichText line={parseLinks(b)} />
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </CvSection>

        <CvSection title="Publications">
          {cv.publications.map((p) => {
            const href = p.url || (p.doi ? `https://doi.org/${p.doi}` : undefined);
            return (
              <article key={p.title} className="cv-entry">
                <EntryHead title={href ? <InlineLink href={href}>{p.title}</InlineLink> : p.title} when={p.year} sub={p.venue} />
                {p.doi && <p className="cv-muted mt-1 text-sm text-faint">DOI: {p.doi}</p>}
                {p.summary && <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/85">{p.summary}</p>}
              </article>
            );
          })}
        </CvSection>

        <CvSection title="Projects">
          {cv.projects.map((p) => {
            const links = [
              p.url && { label: "Live", href: p.url },
              p.github && { label: "GitHub", href: p.github },
            ].filter((l): l is { label: string; href: string } => Boolean(l));
            return (
              <article key={p.title} className="cv-entry">
                <EntryHead title={p.title} when={p.year} sub={p.tagline} />
                {p.description && <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/85">{p.description}</p>}
                {(p.stack?.length || links.length > 0) && (
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                    {p.stack?.map((s) => (
                      <span key={s} className="cv-chip rounded-full border border-line-strong px-2.5 py-0.5 text-muted">
                        {s}
                      </span>
                    ))}
                    {links.map((l) => (
                      <InlineLink key={l.href} href={l.href}>
                        {l.label}
                      </InlineLink>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </CvSection>

        <CvSection title="Skills">
          <dl className="grid gap-3 text-[0.9375rem] leading-relaxed sm:grid-cols-[10rem_1fr] sm:gap-x-6">
            {cv.skills.map((s) => (
              <div key={s.category} className="contents">
                <dt className="font-semibold">{s.category}</dt>
                <dd className="text-ink/85 max-sm:mb-2">{s.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </CvSection>

        {cv.languages && cv.languages.length > 0 && (
          <CvSection title="Languages">
            <ul className="flex flex-wrap gap-x-8 gap-y-2 text-[0.9375rem]">
              {cv.languages.map((l) => (
                <li key={l.language}>
                  <span className="font-semibold">{l.language}</span>{" "}
                  <span className="cv-muted text-muted">— {l.proficiency}</span>
                </li>
              ))}
            </ul>
          </CvSection>
        )}
      </main>
    </div>
  );
}
