'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import content from '@/content'
import type { LocalizedContent } from '@/content'

interface LocaleState {
  locale: string
  path: 'investor' | 'business' | null
  setLocale: (l: string) => void
  setPath: (p: 'investor' | 'business') => void
  reset: () => void
  t: LocalizedContent
  isReady: boolean
}

const LocaleContext = createContext<LocaleState | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState('en')
  const [path, setPathState] = useState<'investor' | 'business' | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('gva-preferences')
    if (stored) {
      try {
        const p = JSON.parse(stored)
        if (p.locale) setLocaleState(p.locale)
        if (p.path) setPathState(p.path)
      } catch {}
    }
    setLoaded(true)
  }, [])

  const setLocale = useCallback((l: string) => setLocaleState(l), [])
  const setPath = useCallback((p: 'investor' | 'business') => {
    setPathState(p)
    localStorage.setItem('gva-preferences', JSON.stringify({
      locale: JSON.parse(localStorage.getItem('gva-preferences') || '{}').locale || 'en',
      path: p
    }))
  }, [])
  const reset = useCallback(() => {
    setPathState(null)
    localStorage.removeItem('gva-preferences')
  }, [])

  const t = (content as any)[locale] || content.en

  return (
    <LocaleContext.Provider value={{ locale, path, setLocale, setPath, reset, t, isReady: loaded }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be inside LocaleProvider')
  return ctx
}
