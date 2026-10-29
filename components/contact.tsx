import { site } from "@/lib/site";
import { NetworkGraph } from "./network-graph";
import { Reveal } from "./reveal";
import { SweepLink } from "./rich";
import { Section } from "./section";

export function Contact() {
  return (
    <Section id="contact" index="07" badge="Contact" title="Get in touch" decoration={<NetworkGraph />}>
      <dl className="space-y-5">
        {site.contact.map((item, i) => (
          <Reveal key={`${item.label}-${item.value}`} index={i}>
            <dt className="font-bold text-ink">{item.label}</dt>
            <dd className="mt-0.5 text-muted">
              {"href" in item ? (
                <SweepLink href={item.href} className="text-ink">
                  {item.value}
                </SweepLink>
              ) : (
                item.value
              )}
              {"note" in item && <span className="ml-1.5">{item.note}</span>}
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
