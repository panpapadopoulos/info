import { site } from "@/lib/site";
import { Reveal } from "./reveal";
import { SweepLink } from "./rich";
import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="overflow-hidden bg-charcoal px-4 py-16 text-center text-white sm:py-20 xl:py-32">
      <Reveal>
        <SocialLinks className="justify-center" gap="gap-1" />
      </Reveal>
      <Reveal index={1}>
        <p className="mt-8 text-2xl font-bold">{site.name}</p>
        <p className="mt-3">
          {site.footer.copyright}
          <br />
          {site.footer.credit.before}
          <SweepLink href={site.footer.credit.href} className="text-white">
            {site.footer.credit.label}
          </SweepLink>
        </p>
        <p className="mt-4">{site.footer.updated}</p>
      </Reveal>
    </footer>
  );
}
