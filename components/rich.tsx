import { Fragment } from "react";
import type { Rich } from "@/lib/site";

const isExternal = (href: string) => /^https?:/.test(href);

/** A link inside running text: always underlined, turns lime on hover. */
export function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      {...(isExternal(href) && { target: "_blank", rel: "noopener noreferrer" })}
      className="text-ink underline decoration-white/30 underline-offset-[3px] transition-[color,text-decoration-color,opacity] duration-150 ease-out hover:text-accent hover:decoration-accent active:opacity-70"
    >
      {children}
    </a>
  );
}

/** A standalone link: the underline sweeps in from the left. */
export function SweepLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(isExternal(href) && { target: "_blank", rel: "noopener noreferrer" })}
      className={`link-sweep pb-0.5 hover:text-accent ${className}`}
    >
      {children}
    </a>
  );
}

export function RichText({ line }: { line: Rich }) {
  return (
    <>
      {line.map((part, i) =>
        typeof part === "string" ? (
          <Fragment key={i}>{part}</Fragment>
        ) : (
          <InlineLink key={i} href={part.href}>
            {part.label}
          </InlineLink>
        ),
      )}
    </>
  );
}

/** Lines joined with line breaks, as the original card bodies were. */
export function RichLines({ lines }: { lines: Rich[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          <RichText line={line} />
        </Fragment>
      ))}
    </>
  );
}
