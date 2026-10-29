import { existsSync } from "node:fs";
import { join } from "node:path";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { ScrollTop } from "@/components/scroll-top";
import { MoreAtCv, Section } from "@/components/section";
import { CardList } from "@/components/timeline-card";
import { education, experience, projects, publications, skills } from "@/lib/site";

// Resolved at build time: without the hero layers the hero shows the name alone.
const portraitAvailable = existsSync(join(process.cwd(), "public", "hero", "subject.webp"));

// Section order, numbering and tones follow the original site.
export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero portraitAvailable={portraitAvailable} />
        <About />

        <Section id="education" index="02" badge="Education" title="Education" band>
          <CardList cards={education} />
          <MoreAtCv />
        </Section>

        <Section id="experience" index="03" badge="Experience" title="Experience">
          <CardList cards={experience} />
          <MoreAtCv />
        </Section>

        <Section id="publications" index="04" badge="Publications" title="Publications" band>
          <CardList cards={publications} />
          <MoreAtCv />
        </Section>

        <Section id="projects" index="05" badge="Projects" title="Selected Projects">
          <CardList cards={projects} />
          <MoreAtCv />
        </Section>

        <Section id="skills" index="06" badge="Skills" title="Skills" band>
          <CardList cards={skills} />
        </Section>

        <Contact />
        <Marquee />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}
