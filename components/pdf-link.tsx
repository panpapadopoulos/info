"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A link to a PDF that opens it in a modal viewer with Download and Open-in-new-tab
 * buttons. Modified clicks (Ctrl/Cmd/Shift, middle button) keep the browser's default,
 * and without JavaScript it is a plain link.
 */
export function PdfLink({
  href,
  title,
  className,
  children,
}: {
  href: string;
  /** Shown in the viewer's top bar. */
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={(e) => {
          if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </a>
      {open && <PdfViewer href={href} title={title} onClose={() => setOpen(false)} />}
    </>
  );
}

function PdfViewer({ href, title, onClose }: { href: string; title: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const filename = decodeURIComponent(href.split("/").pop() ?? "document.pdf");

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    dialog.showModal();
    // The page behind shouldn't scroll while the viewer is open.
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = overflow;
    };
  }, []);

  const button =
    "inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold transition-[transform,background-color,color] duration-150 ease-out active:scale-[0.97]";

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      // A click on the backdrop lands on the dialog element itself.
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      className="m-auto h-[min(92svh,60rem)] open:flex w-[min(64rem,calc(100vw-2rem))] max-w-none flex-col overflow-hidden rounded-2xl border border-line-strong bg-surface p-0 text-ink shadow-2xl transition-[opacity,scale] duration-200 ease-out-strong backdrop:bg-black/70 backdrop:backdrop-blur-sm starting:scale-[0.97] starting:opacity-0 motion-reduce:transition-none max-sm:h-svh max-sm:w-screen max-sm:max-h-none max-sm:rounded-none max-sm:border-0"
    >
      <div className="flex shrink-0 items-center gap-3 border-b border-line px-4 py-3">
        <p className="min-w-0 flex-1 truncate text-sm font-semibold">{title}</p>
        <a href={href} download={filename} className={`${button} bg-accent text-accent-ink hover:bg-white`}>
          <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" />
          </svg>
          Download
        </a>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${button} text-muted ring-1 ring-line-strong hover:text-ink max-sm:hidden`}
        >
          Open in new tab
        </a>
        <button
          type="button"
          autoFocus
          onClick={() => ref.current?.close()}
          className="grid size-9 place-items-center rounded-full text-muted transition-[color,background-color] duration-150 hover:bg-raised hover:text-ink active:opacity-70"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
      <iframe src={href} title={title} className="min-h-0 w-full flex-1 bg-white" />
    </dialog>
  );
}
