'use client'

import { useCopyToClipboard } from '@/lib/hooks/useCopyToClipboard'
import type { UiCopy } from '@/lib/content-types'

interface CopyButtonProps {
  text: string
  ui: UiCopy
  className?: string
}

/**
 * Button that copies text to clipboard and shows a "Copied!" state for 2s.
 */
export function CopyButton({ text, ui, className = '' }: CopyButtonProps) {
  const { status, copy } = useCopyToClipboard()

  return (
    <button
      onClick={() => copy(text)}
      className={`inline-flex items-center gap-1.5 text-sm transition-colors ${
        status === 'copied'
          ? 'text-green-600 dark:text-green-400'
          : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
      } ${className}`}
      aria-label={ui.copy}
    >
      {status === 'copied' ? (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {ui.copied}
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          {ui.copy}
        </>
      )}
    </button>
  )
}
