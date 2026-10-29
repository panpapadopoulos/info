/** The live domain; sitemap, robots and structured data use absolute URLs. */
export const SITE_URL = "https://panagiotispapadopoulos.com";

/** Serializes schema.org data for a <script type="application/ld+json">, safe to inline. */
export const jsonLd = (data: object) => ({ __html: JSON.stringify(data).replace(/</g, "\u003c") });
