import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

// Robots emitted at /robots.txt by Next.js App Router.
// - Allow all crawlers on /
// - Disallow /api/* (healthcheck endpoints should not be indexed)
// - Reference all three sitemap-like endpoints to help crawlers discover content
// - Use SITE_URL from env (env-overridable for staging mirrors)

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/images-sitemap.xml`,
      `${SITE_URL}/feed.xml`,
    ],
    host: SITE_URL,
  };
}
