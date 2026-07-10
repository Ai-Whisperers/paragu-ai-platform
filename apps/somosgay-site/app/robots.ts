import type { MetadataRoute } from "next";
import { content as c } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: [
      `${c.site.url}/sitemap.xml`,
      `${c.site.url}/images-sitemap.xml`,
    ],
  };
  // RSS feed exposed at /feed.xml — see app/feed.xml/route.ts
}
