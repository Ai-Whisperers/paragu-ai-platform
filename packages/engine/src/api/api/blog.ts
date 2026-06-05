export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  tags: string[]
  image: string
  content: string
}

export const READING_TIME_WPM = 200

import postEmprendimiento from "@/content/es/blog/posts/post-comenzar-emprendimiento.json"
import postErrores from "@/content/es/blog/posts/post-errores-comunes.json"
import postFinanzas from "@/content/es/blog/posts/post-finanzas-basicas.json"
import postHerramientas from "@/content/es/blog/posts/post-herramientas-gratuitas.json"
import postMarketing from "@/content/es/blog/posts/post-marketing-digital.json"
import postWhatsApp from "@/content/es/blog/posts/post-whatsapp-business.json"

import postEmprendimientoEn from "@/content/en/blog/posts/post-comenzar-emprendimiento.json"
import postErroresEn from "@/content/en/blog/posts/post-errores-comunes.json"
import postFinanzasEn from "@/content/en/blog/posts/post-finanzas-basicas.json"
import postHerramientasEn from "@/content/en/blog/posts/post-herramientas-gratuitas.json"
import postMarketingEn from "@/content/en/blog/posts/post-marketing-digital.json"
import postSummerHaircareEn from "@/content/en/blog/posts/post-summer-haircare.json"

const esPosts = [postEmprendimiento, postErrores, postFinanzas, postHerramientas, postMarketing, postWhatsApp] as BlogPost[]
const enPosts = [postEmprendimientoEn, postErroresEn, postFinanzasEn, postHerramientasEn, postMarketingEn, postSummerHaircareEn] as BlogPost[]

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / READING_TIME_WPM))
}

export function getAllPosts(lang: "es" | "en"): BlogPost[] {
  return lang === "es" ? esPosts : enPosts
}

export function getPostBySlug(slug: string, lang: "es" | "en"): BlogPost | undefined {
  return getAllPosts(lang).find((p) => p.slug === slug)
}

export function getRelatedPosts(slug: string, category: string, lang: "es" | "en"): BlogPost[] {
  return getAllPosts(lang).filter((p) => p.slug !== slug && p.category === category).slice(0, 3)
}
