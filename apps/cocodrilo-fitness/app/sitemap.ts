import type { MetadataRoute } from "next"
export default function sitemap(): MetadataRoute.Sitemap {
  const domain = "https://cocodrilo-fitness.paragu-ai.com"
  const pages = ["/", "/servicios", "/contacto", "/nosotros", "/faq", "/privacidad", "/terminos"]
  return pages.map(page => ({
    url: `${domain}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "/" ? "weekly" : "monthly",
    priority: page === "/" ? 1.0 : 0.6,
  }))
}
