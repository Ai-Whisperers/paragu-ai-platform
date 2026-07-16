import type { MetadataRoute } from "next";
import content from "@/content/es.json";

const c = content as any;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = c.site?.url || "https://piercecharm.paragu-ai.com";
  const now = new Date();
  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/piercings", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/galeria", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/nosotros", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contacto", priority: 0.9, changeFrequency: "monthly" as const },
  ];
  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
