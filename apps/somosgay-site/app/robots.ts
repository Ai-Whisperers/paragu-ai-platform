import type { MetadataRoute } from "next";
import content from "@/content/es.json";

export default function robots(): MetadataRoute.Robots {
  const c = content as any;
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${c.site.url}/sitemap.xml`,
  };
}
