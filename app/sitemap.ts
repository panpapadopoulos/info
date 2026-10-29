import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Written to out/sitemap.xml at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/cv`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
