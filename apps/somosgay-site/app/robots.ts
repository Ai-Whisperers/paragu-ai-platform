import type { MetadataRoute } from "next";
import { content as c } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${c.site.url}/sitemap.xml`,
  };
}
