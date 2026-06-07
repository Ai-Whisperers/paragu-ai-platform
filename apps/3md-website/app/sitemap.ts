import type { MetadataRoute } from "next"
export default function sitemap(): MetadataRoute.Sitemap {
  const domain = "https://3mind.paragu-ai.com"
  const pages = ["/", "/portfolio", "/servicios", "/nosotros", "/clientes", "/blog", "/contacto", "/faq", "/privacidad", "/terminos"]
  return pages.map(page => ({
    url: `${domain}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "/" ? "weekly" : "monthly",
    priority: page === "/" ? 1.0 : 0.6,
  }))
}
