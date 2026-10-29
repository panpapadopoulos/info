// All copy is taken verbatim from the original site (info-main/html/index.html).

/** A run of text with optional inline links; a card body is a list of lines. */
export type Inline = string | { label: string; href: string };
export type Rich = Inline[];

export type TimelineCard = {
  /** Lime side panel: an optional date above a short label. */
  when?: string;
  label: string;
  title: string;
  /** Muted lines directly under the title. */
  meta?: Rich[];
  /** Body lines, rendered with line breaks between them. */
  body?: Rich[];
};

// The full CV page, built from content/cv.json.
const CV_URL = "/cv";

export const site = {
  name: "Panagiotis Papadopoulos",
  nameLines: ["Panagiotis", "Papadopoulos"],
  portrait: "/me.jpg",
  cvUrl: CV_URL,
  moreCvUrl: CV_URL,
  resume: "/Panagiotis-Papadopoulos-Resume.pdf",

  hero: {
    accent: "Computer Science",
    rest: ["Graduate", "student, Purdue University NW"],
  },

  // The phone number is listed once, in Contact.
  menu: {
    email: {
      label: "giotispapadopoulos@outlook.com",
      href: "mailto:giotispapadopoulos@outlook.com",
    },
  },

  about:
    "Computer Science graduate student at Purdue University Northwest (GPA 4.0) with a strong background in research-driven software development, data systems, and immersive technologies. Valedictorian graduate with hands-on experience in Java, Python, SQL, Docker, and distributed systems through funded European research projects. Published researcher in VR/HCI and electromagnetic measurement studies, with proven ability to collaborate in multidisciplinary teams and translate research into working systems.",

  basicInfo: [
    { label: "Email:", value: "papadop@purdue.edu", href: "mailto:papadop@purdue.edu", note: "(Academic)" },
    { label: "Email:", value: "giotispapadopoulos@outlook.com", href: "mailto:giotispapadopoulos@outlook.com" },
    { label: "Location:", value: "Munster IN, USA" },
    { label: "Languages:", value: "English, Greek" },
  ],

  socials: [
    {
      id: "linkedin",
      href: "https://www.linkedin.com/in/panagiotis-papadopoulos-0b1a291ab/",
      tooltip: "Connect with me on LinkedIn",
    },
    { id: "github", href: "https://github.com/panpapadopoulos", tooltip: "Check out my GitHub projects" },
    {
      id: "email",
      href: "mailto:giotispapadopoulos@outlook.com",
      tooltip: "Email me at giotispapadopoulos@outlook.com",
    },
    {
      id: "scholar",
      href: "https://scholar.google.com/citations?user=QK3LqOYAAAAJ&hl=en",
      tooltip: "View my Google Scholar profile",
    },
  ],

  documents: [
    { label: "Résumé", href: "/Panagiotis-Papadopoulos-Resume.pdf", note: "Short, one page" },
    { label: "Full CV", href: CV_URL, note: "Full, analytical" },
  ],

  contact: [
    { label: "Address", value: "Munster IN, USA" },
    { label: "Phone", value: "+1 (219)466-6720", href: "tel:+12194666720" },
    { label: "Email", value: "papadop@purdue.edu", href: "mailto:papadop@purdue.edu", note: "(Academic)" },
    { label: "Email", value: "giotispapadopoulos@outlook.com", href: "mailto:giotispapadopoulos@outlook.com" },
  ],

  partners: [
    {
      name: "University of the Peloponnese, Department of Informatics & Telecommunications",
      href: "https://www.dit.uop.gr/",
      logo: "/images/partners-1.svg",
      size: [1073, 512],
    },
    { name: "HCI-VR Lab", href: "https://hci-vr.dit.uop.gr/", logo: "/images/partners-2.svg", size: [1167, 468] },
    { name: "Purdue University Northwest", href: "https://www.pnw.edu/", logo: "/images/partners-3.svg", size: [1217, 527] },
    { name: "Munster High School", href: "https://mhs.munsterschools.gov/", logo: "/images/partners-4.png", size: [518, 512] },
    {
      name: "Saint George Greek School, Schererville",
      href: "https://greekschool.stgeorgenwi.org/",
      logo: "/images/partners-5.png",
      size: [521, 512],
    },
  ],

  footer: {
    copyright: "Panagiotis Papadopoulos 2026 © All rights reserved.",
    updated: "•Last Updated: October 2026•",
  },

  /**
   * Visit counts via GoatCounter (free, no cookies, no consent banner).
   * Sign up at https://www.goatcounter.com, then put your site code here,
   * e.g. "panagiotis" for panagiotis.goatcounter.com. Empty = no tracking.
   */
  goatcounterCode: "",
} as const;

export const education: TimelineCard[] = [
  {
    // Non-breaking space keeps "May 2027" together; "(expected)" may wrap below it.
    when: "Aug 2025 - May 2027 (expected)",
    label: "Master's Degree",
    title: "Master's in Computer Science",
    meta: [["Purdue University Northwest"], ["GPA: 4.0"]],
  },
  {
    when: "Oct 2019 - Jul 2024",
    label: "Bachelor's Degree",
    title: "Bachelor's in Informatics & Telecommunications",
    meta: [["University of the Peloponnese - Dept. of Informatics & Telecommunications"]],
    body: [
      ["Grade: “Excellent” - 8.72/10.00"],
      ["Valedictorian for graduating class of 2024"],
      ["Thesis: “Virtual Reality in Theater: Exploring Actor-Machine Interactions”"],
      [
        "Received a scholarship for the duration of my bachelor studies from the Sarantopoulos welfare institution, for my high performance at my High School studies.",
      ],
    ],
  },
];

export const experience: TimelineCard[] = [
  {
    when: "Feb 2025 - present",
    label: "Permanent Substitute",
    title: "Permanent Substitute Teacher K-12",
    meta: [["School Town of Munster"]],
  },
  {
    when: "2021 - present",
    label: "Research Assistant",
    title: "Member of HCI-VR Lab",
    body: [
      ["Designed and implemented components of an interactive VR Tunnel for an EU-funded research project"],
      ["Collaborated with multidisciplinary teams on VR interaction design, system integration, and experimental evaluation."],
      [
        "Worked as an undergraduate scholar for the HCI-VR Lab in the “National Participation in European Research Projects by the University of the Peloponnese for the years 2014-2016” CrossCult: Empowering reuse of digital cultural heritage in context-aware crosscuts of European history (Code 0279).",
      ],
      [
        "Project details: ",
        { label: "https://hci-vr.dit.uop.gr/", href: "https://hci-vr.dit.uop.gr/" },
        ", Contract at ",
        { label: "diavgeia.gov.gr", href: "https://diavgeia.gov.gr/decision/view/Ψ2ΦΘ469Β7Δ-Σ97" },
        ".",
      ],
    ],
  },
  {
    when: "May 2022 - Sep 2024",
    label: "Research Assistant",
    title: "Pandora - Observatory of electromagnetic fields emitted from 5G",
    body: [
      ["Conducted RF-EMF measurement campaigns across multiple locations using state-of-the-art equipment."],
      ["Contributed to data collection and analysis supporting published research on 5G exposure assessment."],
      [
        "Project details: ",
        { label: "wmclab.uop.gr/pandora", href: "http://wmclab.uop.gr/pandora/team.html" },
      ],
    ],
  },
];

export const publications: TimelineCard[] = [
  {
    when: "Dec 2025",
    label: "Journal Article",
    title:
      "RF‑EMF exposure in the transition to 5G: A multi‑dimensional measurement campaign in the Peloponnese Region of Greece",
    meta: [
      [
        "Environmental Monitoring and Assessment 2025, DOI: ",
        {
          label: "https://doi.org/10.1007/s10661-025-14876-9",
          href: "https://doi.org/10.1007/s10661-025-14876-9",
        },
      ],
    ],
  },
  {
    when: "May 19, 2023",
    label: "Journal Article",
    title: "Developing an Interactive VR CAVE for Immersive Shared Gaming Experiences",
    meta: [
      [
        "Virtual Worlds 2023, 2(2), 162-181, DOI: ",
        {
          label: "https://doi.org/10.3390/virtualworlds2020010",
          href: "https://doi.org/10.3390/virtualworlds2020010",
        },
      ],
    ],
  },
  {
    when: "May 2024",
    label: "Publication",
    title: "Beyond the Stage: Advancements in Human-Computer Interactions in a VR Theater",
    meta: [
      [
        "Digital Culture & AudioVisual Challenges - DCAC 2024 - Corfu, May 24-25, 2024 (",
        {
          label: "https://avarts.ionio.gr/dcac/2024/en/presentations/1364/",
          href: "https://avarts.ionio.gr/dcac/2024/en/presentations/1364/",
        },
        ")",
      ],
    ],
  },
];

export const projects: TimelineCard[] = [
  {
    label: "Data Systems",
    title: "Postgres & Chill – Movie Recommendation System",
    body: [
      [
        "Built a data-driven recommender using PostgreSQL, Docker, and Spring Boot to generate personalized movie suggestions. Check out the ",
        {
          label: "GitHub repository",
          href: "https://github.com/panpapadopoulos/PostgresAndChill",
        },
        " for more details.",
      ],
    ],
  },
  {
    label: "Data Analytics",
    title: "Trending Videos Analysis using MongoDB",
    body: [["Large-scale aggregation pipeline analysis on YouTube trending data with result visualization via Metabase."]],
  },
  {
    label: "Data Mining",
    title: "Frequent Collaboration Patterns Mining",
    body: [["Analyzed academic publications to extract collaboration patterns using WEKA and Python."]],
  },
];

export const skills: TimelineCard[] = [
  { label: "Programming Languages", title: "", body: [["Java, Python, C, PHP, MATLAB, Unix Shell Scripting, Promela (SPIN)"]] },
  { label: "Databases", title: "", body: [["PostgreSQL, MongoDB"]] },
  { label: "Web & Markup", title: "", body: [["HTML, CSS, Markdown, LaTeX"]] },
  { label: "Tools & Frameworks", title: "", body: [["Docker, Apache Hadoop, WEKA, NetBeans, Makefile, Visual Paradigm"]] },
  { label: "Design & CMS", title: "", body: [["Figma, WordPress"]] },
];

/** Navigation, in page order. */
export const sections = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "publications", label: "Publications" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;
