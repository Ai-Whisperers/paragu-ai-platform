'use client'

import type { Lang } from '@/lib/content'
import { getSafety } from '@/lib/content'

interface ExitButtonProps {
  lang: Lang
  isAdmin?: boolean
}

export function ExitButton({ lang, isAdmin }: ExitButtonProps) {
  if (isAdmin) return null

  const safety = getSafety(lang)
  const { label, tooltip, keyboardHint } = safety.exit

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    // Replace history so the back button doesn't return to the site
    window.history.replaceState(null, '', 'https://google.com')
    window.location.href = 'https://google.com'
  }

  return (
    <form
      action="https://google.com"
      method="GET"
      target="_self"
      className="fixed bottom-4 right-4 z-[9999]"
      title={tooltip}
    >
      <button
        type="submit"
        onClick={handleClick}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-full pl-3 pr-4 py-2 shadow-lg transition-all text-sm font-bold cursor-pointer border-0"
        aria-label={label}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 12L14 8L10 4" />
          <path d="M2 8H14" />
        </svg>
        <span>{label}</span>
        <kbd className="hidden sm:inline-block text-[10px] bg-white/20 rounded px-1 py-0.5 ml-1 leading-none">
          {keyboardHint}
        </kbd>
      </button>
    </form>
  )
}
