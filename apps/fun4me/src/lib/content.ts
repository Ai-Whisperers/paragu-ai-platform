/**
 * Content layer - reads from content/es.json instead of Supabase
 * Falls back to es.json for static data, keeps Supabase for admin/cart/orders
 */
import content from '@/content/es.json'
import type { ContentProduct, ContentCategory, ContentKink, ContentSite } from '@/types/content'

const data = content as unknown as ContentSite

export function getProducts(): ContentProduct[] {
  return (data.products || []) as ContentProduct[]
}

export function getCategories(): ContentCategory[] {
  return (data.categories || []) as ContentCategory[]
}

export function getProductBySlug(slug: string): ContentProduct | null {
  return (data.products || []).find((p: ContentProduct) => p.slug === slug) || null
}

export function getCategoryBySlug(slug: string): ContentCategory | null {
  return (data.categories || []).find((c: ContentCategory) => c.id === slug) || null
}

export function getProductsByCategory(categorySlug: string): ContentProduct[] {
  return (data.products || []).filter((p: ContentProduct) => p.category === categorySlug)
}

export function getFeaturedProducts(): ContentProduct[] {
  return (data.products || []).filter((p: ContentProduct) => p.featured)
}

export function getNewProducts(): ContentProduct[] {
  return (data.products || []).filter((p: ContentProduct) => p.new)
}

export function getKinks(): ContentKink[] {
  return (data.kinks || []) as ContentKink[]
}

export function getKinkBySlug(slug: string): ContentKink | null {
  return (data.kinks || []).find((k: ContentKink) => k.id === slug) || null
}

export function getProductsByKink(kinkSlug: string): ContentProduct[] {
  if (!data.kinks) return []
  const kink = data.kinks.find((k: ContentKink) => k.id === kinkSlug)
  if (!kink?.productSlugs?.length) return []
  return (data.products || []).filter((p: ContentProduct) =>
    kink.productSlugs.includes(p.slug)
  )
}

export function getSiteData() {
  return data
}

export const WA_NUMBER = '595976569739'
export const INSTAGRAM = 'https://instagram.com/fun4me_py'

export function getWhatsAppLink(text: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}

// Category images mapped from actual SVG files
export const CATEGORY_IMAGES_MAP: Record<string, string> = {
  vibradores: '/images/products/vib-clasico.svg',
  lenceria: '/images/products/babydoll.svg',
  bdsm: '/images/products/esposas.svg',
  lubricantes: '/images/products/lub-agua.svg',
  'juguetes-anales': '/images/products/plug-pequeno.svg',
  sets: '/images/products/set-iniciacion.svg',
}

// Product images mapped from actual SVG files
export const PRODUCT_IMAGES_MAP: Record<string, string> = {
  'vibrador-clasico-sencillo': '/images/products/vib-clasico.svg',
  'bullet-vibrator': '/images/products/vib-clasico.svg',
  'vibrador-pareja': '/images/products/vib-pareja.svg',
  'babydoll-encaje': '/images/products/babydoll.svg',
  'body-lenceria': '/images/products/body-lenceria.svg',
  'kit-bdsm-basico': '/images/products/esposas.svg',
  'esposas-forradas': '/images/products/esposas.svg',
  'lubricante-base-agua-200ml': '/images/products/lub-agua.svg',
  'lubricante-silicona-100ml': '/images/products/lub-silicona.svg',
  'plug-anal-pequeno': '/images/products/plug-pequeno.svg',
  'plug-anal-vibrador': '/images/products/plug-vibrador.svg',
  'set-iniciacion': '/images/products/set-iniciacion.svg',
  'set-romance': '/images/products/set-romance.svg',
  'vibrador-mariposa': '/images/products/vib-mariposa.svg',
}
