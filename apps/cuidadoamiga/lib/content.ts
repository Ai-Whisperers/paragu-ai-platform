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
import sharedRecursos from '@/content/_shared/recursos-latam.json'
import sharedCountries from '@/content/_shared/countries-latam.json'

export type Lang = 'es' // 'en' and 'pt' will be added in Phase 3
export type SiteContent = typeof siteEs

const SITE_BY_LANG: Record<Lang, SiteContent> = {
  es: siteEs,
}

export function isLang(value: string): value is Lang {
  return value === 'es'
}

export function getSite(lang: Lang = 'es'): SiteContent {
  return SITE_BY_LANG[lang] ?? SITE_BY_LANG.es
}

export function getNav(lang: Lang = 'es') {
  return getSite(lang).navigation
}

export function getHome(lang: Lang = 'es') {
  return getSite(lang).home
}

export function getComoFunciona(lang: Lang = 'es') {
  return getSite(lang).comoFunciona
}

export function getProtocolo(lang: Lang = 'es') {
  return getSite(lang).protocolo
}

export function getUnirse(lang: Lang = 'es') {
  return getSite(lang).unirse
}

export function getReportar(lang: Lang = 'es') {
  return getSite(lang).reportar
}

export function getRecursos(lang: Lang = 'es') {
  return getSite(lang).recursos
}

export function getFAQ(lang: Lang = 'es') {
  return getSite(lang).faq
}

export function getFooter(lang: Lang = 'es') {
  return getSite(lang).footer
}

export function getErrors(lang: Lang = 'es') {
  return getSite(lang).errors
}

export function getCaseTypeLabels(lang: Lang = 'es') {
  return getSite(lang).caseTypes
}

export function getJudicialStateLabels(lang: Lang = 'es') {
  return getSite(lang).judicialStates
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
