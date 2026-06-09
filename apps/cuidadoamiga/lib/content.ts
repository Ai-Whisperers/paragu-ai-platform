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
import type { SiteContent } from '@/lib/content-types'
import type { AdminContent } from '@/lib/admin-types'
import sharedRecursos from '@/content/_shared/recursos-latam.json'
import sharedCountries from '@/content/_shared/countries-latam.json'

export const SUPPORTED_LANGS = ['es', 'pt', 'en'] as const
export type Lang = (typeof SUPPORTED_LANGS)[number]
export const DEFAULT_LANG: Lang = 'es'
export type { SiteContent }

const SITE_BY_LANG: Record<Lang, SiteContent> = {
  es: { ...siteEs, admin: adminEs } as unknown as SiteContent,
  pt: { ...sitePt, admin: adminPt } as unknown as SiteContent,
  en: { ...siteEn, admin: adminEn } as unknown as SiteContent,
}

export function isLang(value: string): value is Lang {
  return (SUPPORTED_LANGS as readonly string[]).includes(value)
}

/** Extract a lang from any path that might start with /es, /pt, or /en. */
export function langFromPath(path: string): Lang {
  const seg = path.split('/').filter(Boolean)[0]
  return isLang(seg ?? '') ? seg : DEFAULT_LANG
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
