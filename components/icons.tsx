import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

function Solid({ children, viewBox = "0 0 24 24", ...props }: IconProps) {
  return (
    <svg viewBox={viewBox} fill="currentColor" aria-hidden focusable="false" {...props}>
      {children}
    </svg>
  );
}

/* ---------- Line ---------- */

export const ArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </Base>
);

export const ArrowUp = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
  </Base>
);

export const FileIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8Z" />
    <path d="M13.5 3.5V8.5h5M9 12.5h6M9 16h4" />
  </Base>
);

export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 7.5h15M4.5 12h15M4.5 16.5h15" />
  </Base>
);

export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

/* ---------- Solid (the original used Font Awesome glyphs) ---------- */

export const LinkedInIcon = (p: IconProps) => (
  <Solid viewBox="0 0 448 512" {...p}>
    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-24.1 42.69-49.48 87.89-49.48 94 0 111.28 61.9 111.28 142.3V448z" />
  </Solid>
);

export const GitHubIcon = (p: IconProps) => (
  <Solid {...p}>
    <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.64-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9l-.01 2.81c0 .27.18.6.69.49A10.1 10.1 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
  </Solid>
);

export const MailIcon = (p: IconProps) => (
  <Solid {...p}>
    <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v.32l-10 6.25L2 6.82V6.5Zm0 2.68v8.32A2.5 2.5 0 0 0 4.5 20h15a2.5 2.5 0 0 0 2.5-2.5V9.18l-9.47 5.92a1 1 0 0 1-1.06 0L2 9.18Z" />
  </Solid>
);

export const ScholarIcon = (p: IconProps) => (
  <Solid {...p}>
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82ZM12 3 1 9l11 6 9-4.91V17h2V9L12 3Z" />
  </Solid>
);

/** The brand mark from the original site. */
export const LeafIcon = (p: IconProps) => (
  <Solid viewBox="0 0 40 42" {...p}>
    <path d="M0 27.8928L13.9269 21.6025L21.943 26.3203L23.5624 41.7978L13.684 41.7148L15.1415 30.9551L13.4411 29.9619L5.10111 36.5836L0 27.8928Z" />
    <path d="M22.8342 25.6576L35.1419 34.8446L40 25.9887L30.1213 21.933V19.9466L40 15.8082L35.1419 7.03488L22.8342 16.2221V25.6576Z" />
    <path d="M21.943 15.4775L23.5624 0L13.684 0.165487L15.1415 10.9253L13.4411 11.9185L5.02015 5.29708L0 13.9049L13.9269 20.1952L21.943 15.4775Z" />
  </Solid>
);
