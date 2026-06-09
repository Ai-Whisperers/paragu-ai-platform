import type { MetadataRoute } from 'next'
import { getServiceSupabase } from '@/lib/supabase/service'
import { SUPPORTED_LANGS, DEFAULT_LANG } from '@/lib/content'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cuidadoamiga.com'

const STATIC_PAGES = [
  '',
  '/recursos',
  '/como-funciona',
  '/protocolo',
  '/unirse',
  '/reportar',
  '/faq',
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Build per-locale static pages
  const entries: MetadataRoute.Sitemap = []

  for (const lang of SUPPORTED_LANGS) {
    for (const page of STATIC_PAGES) {
      entries.push({
        url: `${SITE_URL}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            SUPPORTED_LANGS.map((l) => [l, `${SITE_URL}/${l}${page}`]),
          ),
        },
      })
    }
  }

  // Approved cases (per locale)
  try {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const svc = getServiceSupabase()
      const { data: cases } = await svc
        .from('cases')
        .select('id, actualizado_at, creado_at')
        .eq('estado', 'aprobado')
        .order('actualizado_at', { ascending: false })
        .limit(2000)

      if (cases) {
        for (const c of cases) {
          const lastMod = (c.actualizado_at as string) ?? (c.creado_at as string) ?? new Date().toISOString()
          entries.push({
            url: `${SITE_URL}/${DEFAULT_LANG}/casos/${c.id as string}`,
            lastModified: new Date(lastMod),
            changeFrequency: 'monthly',
            priority: 0.5,
            alternates: {
              languages: Object.fromEntries(
                SUPPORTED_LANGS.map((l) => [l, `${SITE_URL}/${l}/casos/${c.id as string}`]),
              ),
            },
          })
        }
      }
    }
  } catch {
    // Sitemap generation is best-effort
  }

  return entries
}
