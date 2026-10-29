import Link from "next/link";
import { LeafIcon } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata = { title: `Page not found — ${site.name}` };

// Exported as 404.html, which GitHub Pages serves for any unknown address.
export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col overflow-clip border-t-4 border-accent bg-canvas">
      <div className="container-page flex h-[5.25rem] items-center">
        <Link
          href="/"
          className="text-[clamp(1.125rem,4.5vw,1.75rem)] font-semibold tracking-[-0.02em] transition-opacity duration-150 active:opacity-70"
        >
          {site.name}
        </Link>
      </div>

      <div className="container-page flex flex-1 flex-col justify-center pb-24">
        <div className="flex items-center gap-4">
          <LeafIcon className="size-10 shrink-0 text-accent motion-safe:animate-spin-slow" />
          <p className="text-lg text-white/75">
            <span className="text-accent">Error 404</span> — page not found
          </p>
        </div>
        <h1 className="mt-6 text-[clamp(3rem,12vw,8.5rem)] leading-[0.98] font-semibold tracking-[-0.035em]">
          Nothing here.
        </h1>
        <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-muted">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex h-[60px] items-center rounded-full bg-accent px-7 text-lg font-semibold text-accent-ink transition-[transform,background-color] duration-200 ease-out hover:bg-white active:scale-[0.97]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
