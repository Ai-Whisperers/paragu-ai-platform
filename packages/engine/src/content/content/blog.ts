export async function getBlogIndex(lang: "es" | "en") {
  if (lang === "en") return (await import("@/content/en/blog/index.json")).default
  return (await import("@/content/es/blog/index.json")).default
}

const POSTS_ES = ["post-tendencias-color-2026","post-cuidar-cabello-verano","post-peinados-novia-guia","post-beneficios-keratina","post-mantener-color-tiempo","post-cortes-rostro"]
const POSTS_EN = ["post-color-trends-2026","post-summer-haircare","post-bridal-hairstyles-guide","post-keratin-benefits","post-maintain-color-longer","post-haircuts-face-shape"]

export async function getBlogPosts(lang: "es" | "en") {
  const slugs = lang === "en" ? POSTS_EN : POSTS_ES
  return Promise.all(slugs.map(slug =>
    import(`@/content/${lang}/blog/posts/${slug}.json`).then(m => m.default)
  ))
}

export async function getBlogPost(lang: "es" | "en", slug: string) {
  try {
    return (await import(`@/content/${lang}/blog/posts/${slug}.json`)).default
  } catch {
    return null
  }
}