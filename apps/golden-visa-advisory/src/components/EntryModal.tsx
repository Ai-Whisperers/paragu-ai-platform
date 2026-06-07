'use client'

import { useState, useEffect, useRef } from 'react'
import { useLocale } from '@/lib/locale-context'
import content from '@/content'

const languages = content.languages

export function EntryModal() {
  const { locale, path, isReady, setLocale, setPath, reset } = useLocale()
  const [show, setShow] = useState(false)
  const [selectedLang, setSelectedLang] = useState('en')
  const [selectedPath, setSelectedPath] = useState<'investor' | 'business' | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isReady && !path) {
      setShow(true)
      setSelectedLang(locale)
    }
  }, [isReady, path, locale])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const t = (content as any)[selectedLang]?.entry || content.en.entry
  const currentLang = languages.find(l => l.code === selectedLang) || languages[0]

  const handleContinue = () => {
    if (!selectedPath) return
    setLocale(selectedLang)
    setPath(selectedPath)
    localStorage.setItem('gva-preferences', JSON.stringify({ locale: selectedLang, path: selectedPath }))
    setShow(false)
  }

  if (!isReady || !show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="glass-panel rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
        <h1 className="text-2xl font-bold text-center mb-1">{t.title}</h1>
        <p className="text-muted text-sm text-center mb-6">{t.subtitle}</p>

        <label className="block text-sm font-medium text-muted mb-2">{t.languageLabel}</label>

        {/* Language dropdown */}
        <div className="relative mb-6" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all text-left"
          >
            <span className="flex items-center gap-3">
              <span className="text-lg">{currentLang.flag}</span>
              <span className="text-sm font-medium">{currentLang.name}</span>
            </span>
            <svg className={`w-4 h-4 text-muted transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-xl bg-surface border border-border shadow-xl z-10 overflow-hidden">
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => { setSelectedLang(l.code); setDropdownOpen(false) }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-surface-hover ${
                    selectedLang === l.code ? 'bg-primary/10 text-primary' : 'text-foreground'
                  }`}
                >
                  <span className="text-lg">{l.flag}</span>
                  <span>{l.name}</span>
                  {selectedLang === l.code && (
                    <svg className="w-4 h-4 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <label className="block text-sm font-medium text-muted mb-2">{t.pathLabel}</label>
        <div className="space-y-3 mb-6">
          <button
            onClick={() => setSelectedPath('investor')}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              selectedPath === 'investor'
                ? 'bg-primary/10 border-2 border-primary'
                : 'bg-surface border-2 border-border hover:border-primary/50'
            }`}
          >
            <div className="font-semibold text-sm">{t.pathResidency}</div>
            <div className="text-xs text-muted mt-1">
              {selectedLang === 'en' ? 'For foreign investors seeking Paraguayan residency' :
               selectedLang === 'es' ? 'Para inversores extranjeros que buscan residencia paraguaya' :
               selectedLang === 'pt' ? 'Para investidores estrangeiros buscando residência paraguaia' :
               selectedLang === 'fr' ? "Pour les investisseurs étrangers cherchant la résidence paraguayenne" :
               selectedLang === 'it' ? "Per investitori stranieri in cerca di residenza paraguaiana" :
               selectedLang === 'de' ? "Für ausländische Investoren, die eine paraguayische Aufenthaltserlaubnis suchen" :
               selectedLang === 'nl' ? "Voor buitenlandse investeerders die een Paraguayaanse verblijfsvergunning zoeken" :
               'For foreign investors seeking Paraguayan residency'}
            </div>
          </button>
          <button
            onClick={() => setSelectedPath('business')}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              selectedPath === 'business'
                ? 'bg-primary/10 border-2 border-primary'
                : 'bg-surface border-2 border-border hover:border-primary/50'
            }`}
          >
            <div className="font-semibold text-sm">{t.pathBusiness}</div>
            <div className="text-xs text-muted mt-1">
              {selectedLang === 'en' ? 'For Paraguayan companies ready for global investment markets' :
               selectedLang === 'es' ? 'Para empresas paraguayas listas para mercados de inversión global' :
               selectedLang === 'pt' ? 'Para empresas paraguaias prontas para mercados globais de investimento' :
               selectedLang === 'fr' ? "Pour les entreprises paraguayennes prêtes pour les marchés d'investissement mondiaux" :
               selectedLang === 'it' ? "Per le aziende paraguaiane pronte per i mercati di investimento globali" :
               selectedLang === 'de' ? "Für paraguayische Unternehmen, die bereit für globale Investmentmärkte sind" :
               selectedLang === 'nl' ? "Voor Paraguayaanse bedrijven klaar voor wereldwijde investeringsmarkten" :
               'For Paraguayan companies ready for global investment markets'}
            </div>
          </button>
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedPath}
          className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {t.continue}
        </button>
      </div>
    </div>
  )
}
