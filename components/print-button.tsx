"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-10 items-center gap-2 rounded-full bg-accent px-5 whitespace-nowrap max-sm:px-4 text-sm font-semibold text-accent-ink transition-[transform,background-color] duration-200 ease-out hover:bg-white active:scale-[0.97]"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1h-2" />
        <path d="M6 14h12v7H6z" />
      </svg>
      <span className="sm:hidden">Print</span>
      <span className="max-sm:hidden">Print / Save PDF</span>
    </button>
  );
}
