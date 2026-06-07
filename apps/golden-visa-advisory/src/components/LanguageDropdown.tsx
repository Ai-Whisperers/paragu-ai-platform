'use client'

import { useState, useRef, useEffect } from 'react'
import { useLocale } from '@/lib/locale-context'
import content from '@/content'

const languages = content.languages

export function LanguageDropdown() {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const currentLang = languages.find(l => l.code === locale) || languages[0]

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-surface-hover"
      >
        <span>{currentLang.flag}</span>
        <span className="uppercase">{locale}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 min-w-[160px] rounded-xl bg-surface border border-border shadow-xl z-50 overflow-hidden">
          {languages.map(l => (
            <button
              key={l.code}
              onClick={() => { setLocale(l.code); setOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all hover:bg-surface-hover ${
                locale === l.code ? 'text-primary' : 'text-foreground'
              }`}
            >
              <span className="text-lg">{l.flag}</span>
              <span>{l.name}</span>
              {locale === l.code && (
                <svg className="w-4 h-4 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
