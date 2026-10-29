import { site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon, MailIcon, ScholarIcon } from "./icons";

const ICONS = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  email: MailIcon,
  scholar: ScholarIcon,
} as const;

/** The original round lime buttons, each with its tooltip. */
export function SocialLinks({ className = "", gap = "gap-5" }: { className?: string; gap?: string }) {
  return (
    <ul className={`flex flex-wrap ${gap} ${className}`}>
      {site.socials.map(({ id, href, tooltip }) => {
        const Icon = ICONS[id];
        const external = href.startsWith("http");
        return (
          <li key={id}>
            <a
              href={href}
              aria-label={tooltip}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              className="group relative grid size-[50px] place-items-center rounded-full bg-accent text-accent-ink transition-[background-color,color,box-shadow,transform] duration-200 ease-out hover:bg-charcoal hover:text-white hover:shadow-[0_0_0_1px_rgb(193_255_114/0.55)] active:scale-[0.92]"
            >
              <Icon className="size-5 transition-transform duration-200 ease-out-strong group-hover:scale-110" />
              {/* Grows from the button it belongs to */}
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 origin-bottom -translate-x-1/2 scale-95 rounded-md bg-charcoal px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-lg ring-1 ring-white/10 transition-[opacity,scale] duration-150 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
              >
                {tooltip}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
