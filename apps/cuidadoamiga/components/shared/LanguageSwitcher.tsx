'use client'

import { useRouter, usePathname } from 'next/navigation'
import { SUPPORTED_LANGS, type Lang } from '@/lib/content'

const LABELS: Record<Lang, string> = {
  es: 'ES',
  pt: 'PT',
  en: 'EN',
}

const FULL_LABELS: Record<Lang, string> = {
  es: 'Español',
  pt: 'Português',
  en: 'English',
}

interface LanguageSwitcherProps {
  current: Lang
  variant?: 'compact' | 'full'
}

export function LanguageSwitcher({ current, variant = 'compact' }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname() ?? '/'

  function switchTo(target: Lang) {
    if (target === current) return
    // Replace the leading /xx in the pathname
    const parts = pathname.split('/')
    if (parts.length > 1 && SUPPORTED_LANGS.includes(parts[1] as Lang)) {
      parts[1] = target
    } else {
      parts.splice(1, 0, target)
    }
    const next = parts.join('/') || `/${target}`
    router.push(next)
  }

  return (
    <div className="inline-flex items-center gap-1 text-xs" role="group" aria-label="Cambiar idioma">
      {SUPPORTED_LANGS.map((l) => {
        const isActive = l === current
        return (
          <button
            key={l}
            type="button"
            onClick={() => switchTo(l)}
            aria-current={isActive ? 'true' : undefined}
            title={FULL_LABELS[l]}
            className={`px-2 py-1 rounded-md font-semibold transition-colors ${
              isActive
                ? 'bg-rose-700 text-white'
                : 'text-foreground-muted hover:bg-surface-3 hover:text-foreground'
            }`}
          >
            {variant === 'full' ? FULL_LABELS[l] : LABELS[l]}
          </button>
        )
      })}
    </div>
  )
}
