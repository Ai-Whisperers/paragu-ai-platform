'use client'

import { useState, useMemo, useCallback } from 'react'
import type { UiCountryPicker } from '@/lib/content-types'

export const LATAM_COUNTRIES = [
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴' },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺' },
  { code: 'DO', name: 'República Dominicana', flag: '🇩🇴' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳' },
  { code: 'MX', name: 'México', flag: '🇲🇽' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮' },
  { code: 'PA', name: 'Panamá', flag: '🇵🇦' },
  { code: 'PE', name: 'Perú', flag: '🇵🇪' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
] as const

export type CountryCode = typeof LATAM_COUNTRIES[number]['code']
export type CountryFlagEmoji = typeof LATAM_COUNTRIES[number]['flag']

interface CountryPickerProps {
  value: CountryCode | undefined
  onChange: (code: CountryCode | undefined) => void
  ui: UiCountryPicker
  className?: string
}

/**
 * Country picker with search + flag emoji. 20 LATAM countries.
 */
export function CountryPicker({ value, onChange, ui, className = '' }: CountryPickerProps) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return LATAM_COUNTRIES
    const q = search.toLowerCase()
    return LATAM_COUNTRIES.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q))
  }, [search])

  const handleSelect = useCallback((code: CountryCode | undefined) => {
    onChange(code)
    setSearch('')
  }, [onChange])

  return (
    <div className={`relative ${className}`}>
      {value ? (
        <div className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-neutral-300 dark:border-neutral-600">
          <span>{LATAM_COUNTRIES.find(c => c.code === value)?.flag}</span>
          <span>{LATAM_COUNTRIES.find(c => c.code === value)?.name}</span>
          <button
            onClick={() => handleSelect(undefined)}
            className="ml-auto text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            aria-label={ui.placeholder}
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={ui.placeholder}
            aria-label={ui.placeholder}
            className="w-full px-3 py-1.5 text-sm rounded-lg border border-neutral-300 bg-white dark:bg-neutral-800 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
          />
          {search && (
            <ul className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg shadow-lg">
              {filtered.length === 0 ? (
                <li className="px-3 py-2 text-sm text-neutral-500">{ui.noResults}</li>
              ) : (
                filtered.map((c) => (
                  <li key={c.code}>
                    <button
                      onClick={() => handleSelect(c.code)}
                      className="w-full text-left px-3 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 flex items-center gap-2"
                    >
                      <span>{c.flag}</span>
                      <span>{c.name}</span>
                      <span className="text-neutral-400 text-xs ml-auto">{c.code}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
