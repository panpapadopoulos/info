import type { Metadata } from "next";
import Link from "next/link";
import { CvNav } from "@/components/cv-nav";
import { PdfLink } from "@/components/pdf-link";
import { PrintButton } from "@/components/print-button";
import { InlineLink, RichText } from "@/components/rich";
import { asset } from "@/lib/asset";
import { cv, parseLinks, type CvDocument, type CvEntry } from "@/lib/cv";

const { personal } = cv;

export const metadata: Metadata = {
  title: `CV — ${personal.name}`,
  description: `Curriculum vitae of ${personal.name}, ${personal.title}.`,
  alternates: { canonical: "/cv" },
};

const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** "Academic Service" -> "academic-service": each section's anchor for the top-bar menu. */
const sectionId = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** The sections in page order; ones with no entries are left out of the menu, as they are of the page. */
const sections = (
  [
    ["Education", true],
    ["Experience", true],
    ["Leadership & Activities", cv.leadership?.length],
    ["Certificates", cv.certificates?.length],
    ["Publications", true],
    ["Conferences", cv.conferences?.length],
    ["Seminars", cv.seminars?.length],
    ["Volunteering", cv.volunteering?.length],
    ["Academic Service", cv.outreach?.length],
    ["Languages", cv.languages?.length],
    ["Projects", true],
    ["Skills", true],
  ] as const
)
  .filter(([, present]) => present)
  .map(([label]) => ({ id: sectionId(label), label }));

/** A section of the CV: label column on the left, entries on the right.
    From md up, the label stays pinned below the top bar while its section scrolls past. */
function CvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      id={sectionId(title)}
      className="cv-section grid scroll-mt-[7.5rem] gap-4 border-t border-line py-8 md:grid-cols-[11rem_1fr] md:gap-8"
    >
      <h2 className="cv-label text-xs font-semibold tracking-[0.14em] text-accent uppercase md:sticky md:top-[8.75rem] md:self-start">
        {title}
      </h2>
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

function Bullets({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="cv-bullets mt-3 grid gap-1.5 text-[0.9375rem] leading-relaxed text-ink/85">
      {items.map((b, i) => (
        <li
          key={i}
          className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:size-1.5 before:rounded-full before:bg-accent/70"
        >
          <RichText line={parseLinks(b)} />
        </li>
      ))}
    </ul>
  );
}

/** Attached PDFs, as small links that open a viewer. Left off the printed résumé. */
function Documents({ items, context }: { items?: CvDocument[]; context: string }) {
  if (!items?.length) return null;
  return (
    <ul className="cv-docs mt-3 flex flex-wrap gap-2">
      {items.map((d) => (
        <li key={d.file}>
          <PdfLink
            href={asset(d.file)}
            title={`${d.label} — ${context}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1 text-sm text-muted transition-[color,border-color] duration-150 hover:border-accent hover:text-accent active:opacity-70"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
              <path d="M14 3v5h5" />
            </svg>
            {d.label}
            <span className="sr-only"> (PDF)</span>
          </PdfLink>
        </li>
      ))}
    </ul>
  );
}

const join = (...parts: (string | undefined)[]) => parts.filter(Boolean).join(" · ");

/** A section made of the shared entry shape (certificates, conferences, volunteering, …). */
function EntrySection({ title, entries }: { title: string; entries?: CvEntry[] }) {
  if (!entries?.length) return null;
  return (
    <CvSection title={title}>
      {entries.map((e) => (
        <article key={e.title + e.organization + e.period} className="cv-entry">
          <EntryHead title={e.title} when={e.period} sub={join(e.organization, e.location)} />
          <Bullets items={e.bulletPoints} />
          <Documents items={e.documents} context={e.title} />
        </article>
      ))}
    </CvSection>
  );
}

export default function CvPage() {
  const contacts = [
    { label: personal.email, href: `mailto:${personal.email}` },
    personal.academicEmail && {
      label: `${personal.academicEmail} (academic)`,
      href: `mailto:${personal.academicEmail}`,
    },
    personal.phone && { label: personal.phone, href: `tel:${personal.phone.replace(/[^\d+]/g, "")}` },
    personal.website && { label: stripProtocol(personal.website), href: personal.website },
    personal.linkedin && { label: "LinkedIn", href: personal.linkedin },
    personal.github && { label: "GitHub", href: personal.github },
    personal.scholar && { label: "Google Scholar", href: personal.scholar },
    personal.orcid && { label: "ORCID", href: personal.orcid },
  ].filter((c): c is { label: string; href: string } => Boolean(c));

  return (
    <div className="cv-page min-h-svh bg-canvas">
      <header className="cv-actions sticky top-0 z-10 border-b border-line bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[52rem] items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="link-sweep shrink-0 pb-0.5 text-sm font-medium whitespace-nowrap text-muted hover:text-accent">
            ← <span className="sm:hidden">Home</span>
            <span className="max-sm:hidden">Back to Home</span>
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            {personal.resume && (
              <PdfLink
                href={asset(personal.resume)}
                title={`Résumé — ${personal.name}`}
                className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold whitespace-nowrap text-ink ring-1 ring-line-strong transition-[transform,color,box-shadow] duration-200 ease-out hover:text-accent hover:ring-accent active:scale-[0.97]"
              >
                <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                  <path d="M14 3v5h5" />
                </svg>
                Résumé
              </PdfLink>
            )}
            <PrintButton />
          </div>
        </div>
        <nav aria-label="CV sections" className="mx-auto max-w-[52rem] border-t border-line px-2 sm:px-4">
          <CvNav sections={sections} />
        </nav>
      </header>

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
              <Documents items={e.documents} context={e.degree} />
            </article>
          ))}
        </CvSection>

        <CvSection title="Experience">
          {cv.experience.map((x) => (
            <article key={x.role + x.organization + x.period} className="cv-entry">
              <EntryHead title={x.role} when={x.period} sub={join(x.organization, x.location)} />
              <Bullets items={x.bulletPoints} />
              <Documents items={x.documents} context={x.organization} />
            </article>
          ))}
        </CvSection>

        <EntrySection title="Leadership & Activities" entries={cv.leadership} />
        <EntrySection title="Certificates" entries={cv.certificates} />

        <CvSection title="Publications">
          {cv.publications.map((p) => {
            const href = p.url || (p.doi ? `https://doi.org/${p.doi}` : undefined);
            return (
              <article key={p.title} className="cv-entry">
                <EntryHead
                  title={href ? <InlineLink href={href}>{p.title}</InlineLink> : p.title}
                  when={p.year}
                  sub={p.venue}
                />
                {p.doi && <p className="cv-muted mt-1 text-sm text-faint">DOI: {p.doi}</p>}
                {p.summary && <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/85">{p.summary}</p>}
                <Documents items={p.documents} context={p.title} />
              </article>
            );
          })}
        </CvSection>

        <EntrySection title="Conferences" entries={cv.conferences} />
        <EntrySection title="Seminars" entries={cv.seminars} />
        <EntrySection title="Volunteering" entries={cv.volunteering} />
        <EntrySection title="Academic Service" entries={cv.outreach} />

        {cv.languages && cv.languages.length > 0 && (
          <CvSection title="Languages">
            <ul className="grid gap-2 text-[0.9375rem]">
              {cv.languages.map((l) => (
                <li key={l.language}>
                  <span className="font-semibold">{l.language}</span>{" "}
                  <span className="cv-muted text-muted">— {l.proficiency}</span>
                </li>
              ))}
            </ul>
          </CvSection>
        )}

        <CvSection title="Projects">
          {cv.projectsIntro && (
            <p className="cv-muted max-w-[65ch] text-[0.9375rem] leading-relaxed text-muted">{cv.projectsIntro}</p>
          )}
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

      </main>
    </div>
  );
}
