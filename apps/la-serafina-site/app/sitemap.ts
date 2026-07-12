import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sub = (path: string, priority = 0.7) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  });
  return [
    sub("/", 1.0),
    sub("/espacio", 0.9),
    sub("/ro-hendu", 0.9),
    sub("/historia", 0.8),
    sub("/apoyar", 0.8),
    sub("/gn", 0.5),
    sub("/privacidad", 0.2),
  ];
}