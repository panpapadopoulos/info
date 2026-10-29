// The About section's terminal: a short session built from the CV at build time,
// so edits made in the CMS show up in it too.
import type { CV } from "@/lib/cv";

export type Tone = "plain" | "accent" | "muted" | "key" | "string";
export type TerminalLine = { kind: "command"; text: string } | { kind: "output"; parts: [string, Tone][] };

/** A stable 7-character "commit hash" for a string. */
function shortHash(text: string) {
  let h = 2166136261;
  for (const ch of text) h = Math.imul(h ^ ch.codePointAt(0)!, 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

const snake = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

/** "HCI-VR Lab, Department of …" -> "HCI-VR Lab" */
const shortOrg = (org: string) => org.split(/,| \(| [–-] /)[0].trim();

export function terminalScript(cv: CV, maxCommits = 5): TerminalLine[] {
  const out = (...parts: [string, Tone][]): TerminalLine => ({ kind: "output", parts });
  const lines: TerminalLine[] = [
    { kind: "command", text: "whoami" },
    out([cv.personal.name, "plain"], [" — ", "muted"], [cv.personal.title, "accent"]),

    { kind: "command", text: "cat skills.json" },
    out(["{", "muted"]),
    ...cv.skills.map((s, i) =>
      out(
        [`  "${snake(s.category)}"`, "key"],
        [": [", "muted"],
        ...s.items.flatMap((item, j): [string, Tone][] => [
          [`"${item}"`, "string"],
          [j < s.items.length - 1 ? ", " : "", "muted"],
        ]),
        [i < cv.skills.length - 1 ? "]," : "]", "muted"],
      ),
    ),
    out(["}", "muted"]),

    { kind: "command", text: "git log --oneline" },
    ...cv.experience
      .slice(0, maxCommits)
      .map((x) =>
        out(
          [shortHash(x.role + x.organization + x.period), "muted"],
          [" feat: ", "accent"],
          [`${x.role} @ ${shortOrg(x.organization)}`, "plain"],
        ),
      ),
  ];

  if (cv.publications.length) {
    lines.push({ kind: "command", text: "ls publications | wc -l" }, out([String(cv.publications.length), "plain"]));
  }
  return lines;
}
