import { site } from "@/lib/site";
import { Reveal } from "./reveal";
import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="overflow-hidden bg-charcoal px-4 py-16 text-center text-white sm:py-20 xl:py-32">
      <Reveal>
        <SocialLinks className="justify-center" gap="gap-1" />
      </Reveal>
      <Reveal index={1}>
        <p className="mt-8 text-2xl font-bold">{site.name}</p>
        <p className="mt-3">{site.footer.copyright}</p>
        <p className="mt-4">{site.footer.updated}</p>
      </Reveal>
    </footer>
  );
}
