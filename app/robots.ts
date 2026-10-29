import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Written to out/robots.txt at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // The CMS has nothing for search engines, and the old site would compete with the real pages.
    rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/legacy/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
