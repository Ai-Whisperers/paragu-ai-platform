import { describe, it, expect } from 'vitest'
import {
  isLang,
  langFromPath,
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  getSite,
  getRecursosLatam,
  getCountries,
  getCaseTypeLabels,
  getErrors,
} from '../content'

describe('lang guards', () => {
  it('isLang returns true for supported langs', () => {
    expect(isLang('es')).toBe(true)
    expect(isLang('pt')).toBe(true)
    expect(isLang('en')).toBe(true)
  })

  it('isLang returns false for unknown', () => {
    expect(isLang('fr')).toBe(false)
    expect(isLang('xx')).toBe(false)
    expect(isLang('')).toBe(false)
  })

  it('SUPPORTED_LANGS is exactly es, pt, en', () => {
    expect(SUPPORTED_LANGS).toEqual(['es', 'pt', 'en'])
  })

  it('DEFAULT_LANG is es', () => {
    expect(DEFAULT_LANG).toBe('es')
  })

  it('langFromPath extracts the first valid lang segment', () => {
    expect(langFromPath('/es/recursos')).toBe('es')
    expect(langFromPath('/pt/protocolo')).toBe('pt')
    expect(langFromPath('/en/admin')).toBe('en')
    expect(langFromPath('/recursos')).toBe('es') // default
    expect(langFromPath('/')).toBe('es')
    expect(langFromPath('/fr/anything')).toBe('es') // default
  })
})

describe('getSite', () => {
  it('returns Spanish site by default', () => {
    const site = getSite()
    expect(site._meta.locale).toBe('es')
    expect(site._meta.site).toBe('Cuidado Amiga')
  })

  it('returns Portuguese site for pt', () => {
    const site = getSite('pt')
    expect(site._meta.locale).toBe('pt')
    expect(site.home.hero.headline.toLowerCase()).toContain('mapa colaborativo')
  })

  it('returns English site for en', () => {
    const site = getSite('en')
    expect(site._meta.locale).toBe('en')
    expect(site.home.hero.headline.toLowerCase()).toContain('collaborative map')
  })

  it('all locales include the same required keys', () => {
    for (const lang of SUPPORTED_LANGS) {
      const site = getSite(lang)
      expect(site.navigation.items.length, `${lang}: nav items`).toBeGreaterThan(0)
      expect(site.home.hero.eyebrow, `${lang}: hero eyebrow`).toBeTruthy()
      expect(site.comoFunciona.sections.length, `${lang}: como funciona sections`).toBeGreaterThan(0)
      expect(site.faq.items.length, `${lang}: faq items`).toBeGreaterThan(0)
      expect(site.admin, `${lang}: admin should be present`).toBeDefined()
      expect(site.admin?.tabs.validar, `${lang}: admin.tabs.validar`).toBeTruthy()
    }
  })
})

describe('cross-locale shared data', () => {
  it('getCountries returns the LATAM list', () => {
    const countries = getCountries()
    expect(countries.length).toBeGreaterThanOrEqual(20)
    expect(countries.find((c) => c.code === 'AR')).toBeDefined()
    expect(countries.find((c) => c.code === 'BR')).toBeDefined()
  })

  it('getRecursosLatam returns 12+ countries with hotlines', () => {
    const paises = getRecursosLatam()
    expect(paises.length).toBeGreaterThanOrEqual(12)
    // Argentina should have the 144 line
    const ar = paises.find((p) => p.codigo === 'AR')
    expect(ar?.emergencia).toBe('144')
  })
})

describe('labels per locale', () => {
  it('case type labels are translated', () => {
    expect(getCaseTypeLabels('es').femicidio).toBe('Femicidio')
    expect(getCaseTypeLabels('pt').femicidio).toBe('Femicídio')
    expect(getCaseTypeLabels('en').femicidio).toBe('Femicide')
  })

  it('errors are present in all locales', () => {
    for (const lang of SUPPORTED_LANGS) {
      const errs = getErrors(lang)
      expect(errs.rateLimit).toBeTruthy()
      expect(errs.geocodeFailed).toBeTruthy()
    }
  })
})
