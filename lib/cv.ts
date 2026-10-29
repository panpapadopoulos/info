// The CV lives in content/cv.json, which the CMS at /admin edits and commits.
// Typing it here makes the build fail if an edit breaks the shape.
import data from "@/content/cv.json";
import type { Rich } from "@/lib/site";

/** A PDF in public/uploads, attached to an entry. */
export type CvDocument = { label: string; file: string };

/** Certificates, conferences, seminars, volunteering, outreach and leadership share one shape. */
export type CvEntry = {
  title: string;
  organization?: string;
  location?: string;
  period?: string;
  bulletPoints?: string[];
  documents?: CvDocument[];
};

export type CV = {
  personal: {
    name: string;
    title: string;
    email: string;
    academicEmail?: string;
    phone?: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
    scholar?: string;
    orcid?: string;
    summary: string;
  };
  education: {
    degree: string;
    institution: string;
    location?: string;
    year: string;
    grade?: string;
    honors?: string;
    thesis?: string;
    documents?: CvDocument[];
  }[];
  experience: {
    role: string;
    organization: string;
    location?: string;
    period: string;
    bulletPoints?: string[];
    documents?: CvDocument[];
  }[];
  certificates?: CvEntry[];
  publications: {
    title: string;
    venue: string;
    year: string;
    doi?: string;
    url?: string;
    summary?: string;
    documents?: CvDocument[];
  }[];
  conferences?: CvEntry[];
  seminars?: CvEntry[];
  volunteering?: CvEntry[];
  outreach?: CvEntry[];
  languages?: { language: string; proficiency: string }[];
  projectsIntro?: string;
  projects: {
    title: string;
    year?: string;
    tagline?: string;
    stack?: string[];
    url?: string;
    github?: string;
    description?: string;
  }[];
  skills: { category: string; items: string[] }[];
  leadership?: CvEntry[];
};

export const cv: CV = data;

/** Splits text with Markdown-style `[label](https://…)` links into a Rich line. */
export function parseLinks(text: string): Rich {
  const parts: Rich = [];
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push({ label: match[1], href: match[2] });
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
