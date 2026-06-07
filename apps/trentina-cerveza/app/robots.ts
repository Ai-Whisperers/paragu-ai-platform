import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/qr"],
    },
    sitemap: "https://trentina.paragu-ai.com/sitemap.xml",
  };
}
