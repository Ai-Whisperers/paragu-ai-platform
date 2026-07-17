export async function getBlogIndex(lang: 'es' | 'en') {
  if (lang === 'en') return (await import('@/content/en/blog/index.json')).default
  return (await import('@/content/es/blog/index.json')).default
}

export async function getBlogPosts(lang: 'es' | 'en') {
  const index = await getBlogIndex(lang)
  // The blog index JSON is statically typed by tsc from the imported file's
  // literal shape (title/subtitle/description). At runtime the same file also
  // carries `posts`, but tsc doesn't see it — hence the double-cast through
  // `unknown` per TS2352.
  const indexWithPosts = index as unknown as { posts?: { slug: string }[] }
  const entries = Array.isArray(indexWithPosts.posts) ? indexWithPosts.posts : []
  if (entries.length === 0) {
    return []
  }
  return Promise.all(
    entries.map(({ slug }) => import(`@/content/${lang}/blog/posts/${slug}.json`).then(m => m.default).catch(() => null)),
  ).then((results) => results.filter((post): post is NonNullable<typeof post> => Boolean(post)))
}

export async function getBlogPost(lang: 'es' | 'en', slug: string) {
  try {
    const mod = await import(`@/content/${lang}/blog/posts/${slug}.json`)
    return (mod?.default ?? null) as Record<string, unknown> | null
  } catch {
    return null
  }
}
