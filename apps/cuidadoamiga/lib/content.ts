/**
 * Content accessor — the single read-side API for the Lang-Driven JSON contract.
 *
 * Rules:
 *   1. Every visible string for a locale must come from here. No exceptions.
 *   2. Components import accessors (functions), not raw JSON.
 *   3. Adding a new locale: add a folder under content/{lang}/, mirror site.json
 *      structure, done. (No code changes needed in the components.)
 *   4. Cross-locale shared data (countries, hotlines, etc.) lives in
 *      content/_shared/ and is imported via `getShared()`.
 *
 * See BUILD_PLAN.md and the platform's site-template reference for context.
 */

import siteEs from '@/content/es/site.json'
import adminEs from '@/content/es/admin.json'
import sitePt from '@/content/pt/site.json'
import adminPt from '@/content/pt/admin.json'
import siteEn from '@/content/en/site.json'
import adminEn from '@/content/en/admin.json'
import safetyEs from '@/content/es/safety.json'
import safetyPt from '@/content/pt/safety.json'
import safetyEn from '@/content/en/safety.json'
import transparenciaEs from '@/content/es/transparencia.json'
import transparenciaPt from '@/content/pt/transparencia.json'
import transparenciaEn from '@/content/en/transparencia.json'
import dataEs from '@/content/es/data.json'
import dataPt from '@/content/pt/data.json'
import dataEn from '@/content/en/data.json'
import blogEs from '@/content/es/blog.json'
import blogPt from '@/content/pt/blog.json'
import blogEn from '@/content/en/blog.json'
import newsletterEs from '@/content/es/newsletter.json'
import newsletterPt from '@/content/pt/newsletter.json'
import newsletterEn from '@/content/en/newsletter.json'
import type { SiteContent, SafetyContent, TransparencyContent, DataContent, BlogContent, BlogPost, NewsletterContent } from '@/lib/content-types'
import type { AdminContent } from '@/lib/admin-types'
import sharedRecursos from '@/content/_shared/recursos-latam.json'
import sharedCountries from '@/content/_shared/countries-latam.json'

export const SUPPORTED_LANGS = ['es', 'pt', 'en'] as const
export type Lang = (typeof SUPPORTED_LANGS)[number]
export const DEFAULT_LANG: Lang = 'es'
export type { SiteContent }

const SITE_BY_LANG: Record<Lang, SiteContent> = {
  es: { ...siteEs, admin: adminEs.admin } as unknown as SiteContent,
  pt: { ...sitePt, admin: adminPt.admin } as unknown as SiteContent,
  en: { ...siteEn, admin: adminEn.admin } as unknown as SiteContent,
}

export function isLang(value: string): value is Lang {
  return (SUPPORTED_LANGS as readonly string[]).includes(value)
}

/** Extract a lang from any path that might start with /es, /pt, or /en. */
export function langFromPath(path: string): Lang {
  const seg = path.split('/').filter(Boolean)[0]
  if (seg && isLang(seg)) return seg
  return DEFAULT_LANG
}

export function getSite(lang: Lang = DEFAULT_LANG): SiteContent {
  return SITE_BY_LANG[lang] ?? SITE_BY_LANG[DEFAULT_LANG]
}

// Per-locale accessors (re-export for components)
export const getNav = (lang: Lang = DEFAULT_LANG) => getSite(lang).navigation
export const getHome = (lang: Lang = DEFAULT_LANG) => getSite(lang).home
export const getComoFunciona = (lang: Lang = DEFAULT_LANG) => getSite(lang).comoFunciona
export const getProtocolo = (lang: Lang = DEFAULT_LANG) => getSite(lang).protocolo
export const getUnirse = (lang: Lang = DEFAULT_LANG) => getSite(lang).unirse
export const getReportar = (lang: Lang = DEFAULT_LANG) => getSite(lang).reportar
export const getRecursos = (lang: Lang = DEFAULT_LANG) => getSite(lang).recursos
export const getFAQ = (lang: Lang = DEFAULT_LANG) => getSite(lang).faq
export const getFooter = (lang: Lang = DEFAULT_LANG) => getSite(lang).footer
export const getErrors = (lang: Lang = DEFAULT_LANG) => getSite(lang).errors
export const getCaseTypeLabels = (lang: Lang = DEFAULT_LANG) => getSite(lang).caseTypes
export const getJudicialStateLabels = (lang: Lang = DEFAULT_LANG) => getSite(lang).judicialStates
export const getAdmin = (lang: Lang = DEFAULT_LANG): AdminContent => getSite(lang).admin

// Safety content (exit button)
const SAFETY_BY_LANG: Record<Lang, SafetyContent> = {
  es: safetyEs as SafetyContent,
  pt: safetyPt as SafetyContent,
  en: safetyEn as SafetyContent,
}
export function getSafety(lang: Lang = DEFAULT_LANG): SafetyContent {
  return SAFETY_BY_LANG[lang] ?? SAFETY_BY_LANG[DEFAULT_LANG]
}

// Transparency content
const TRANSPARENCIA_BY_LANG: Record<Lang, TransparencyContent> = {
  es: transparenciaEs as TransparencyContent,
  pt: transparenciaPt as TransparencyContent,
  en: transparenciaEn as TransparencyContent,
}
export function getTransparencia(lang: Lang = DEFAULT_LANG): TransparencyContent {
  return TRANSPARENCIA_BY_LANG[lang] ?? TRANSPARENCIA_BY_LANG[DEFAULT_LANG]
}

// Data / statistics page content
const DATA_BY_LANG: Record<Lang, DataContent> = {
  es: dataEs as DataContent,
  pt: dataPt as DataContent,
  en: dataEn as DataContent,
}
export function getData(lang: Lang = DEFAULT_LANG): DataContent {
  return DATA_BY_LANG[lang] ?? DATA_BY_LANG[DEFAULT_LANG]
}

// Blog content
const BLOG_BY_LANG: Record<Lang, BlogContent> = {
  es: blogEs as BlogContent,
  pt: blogPt as BlogContent,
  en: blogEn as BlogContent,
}
export function getBlog(lang: Lang = DEFAULT_LANG): BlogContent {
  return BLOG_BY_LANG[lang] ?? BLOG_BY_LANG[DEFAULT_LANG]
}
export function getBlogPost(slug: string, lang: Lang = DEFAULT_LANG): BlogPost | undefined {
  return getBlog(lang).posts.find((p) => p.slug === slug)
}

// Newsletter content
const NEWSLETTER_BY_LANG: Record<Lang, NewsletterContent> = {
  es: newsletterEs as NewsletterContent,
  pt: newsletterPt as NewsletterContent,
  en: newsletterEn as NewsletterContent,
}
export function getNewsletter(lang: Lang = DEFAULT_LANG): NewsletterContent {
  return NEWSLETTER_BY_LANG[lang] ?? NEWSLETTER_BY_LANG[DEFAULT_LANG]
}

// ============================================================
// Shared cross-locale data (content/_shared/*)
// ============================================================

export function getCountries() {
  return sharedCountries.countries as Array<{ code: string; name: string }>
}

export function getRecursosLatam() {
  return sharedRecursos.paises as Array<{
    codigo: string
    nombre: string
    emoji: string
    emergencia?: string
    recursos: Array<{ nombre: string; tipo: 'linea' | 'org' | 'web'; detalle: string; url?: string }>
  }>
}

export type { BlogPost }