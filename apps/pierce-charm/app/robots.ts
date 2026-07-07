import type { MetadataRoute } from "next";
import content from "@/content/es.json";

const c = content as any;
const SITE = c.site?.url || "https://piercecharm.paragu-ai.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "Googlebot", allow: "/" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
