import Image from "next/image";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";

/** The partner logo strip that closed the original page. */
export function Marquee() {
  // Two identical halves: the track slides by exactly one half, then loops seamlessly.
  const half = [...site.partners, ...site.partners];

  return (
    <section aria-label="Affiliations" className="overflow-hidden bg-canvas pt-2 pb-14 sm:pt-4 sm:pb-20">
      <div className="flex w-max motion-safe:animate-marquee hover:[animation-play-state:paused] has-[:focus-visible]:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-12 pr-12 sm:gap-20 sm:pr-20">
            {half.map(({ name, href, logo, size }, i) => {
              // Only the first run of logos is reachable; the repeats are decoration.
              const primary = copy === 0 && i < site.partners.length;
              return (
                <li key={`${name}-${i}`}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={primary ? `${name} (opens in a new tab)` : undefined}
                    tabIndex={primary ? undefined : -1}
                    className="block rounded-lg opacity-60 transition-[opacity,transform] duration-200 ease-out hover:opacity-100 active:scale-[0.97]"
                  >
                    <Image
                      src={asset(logo)}
                      alt=""
                      width={size[0]}
                      height={size[1]}
                      unoptimized
                      className="h-12 w-auto sm:h-20"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </section>
  );
}
