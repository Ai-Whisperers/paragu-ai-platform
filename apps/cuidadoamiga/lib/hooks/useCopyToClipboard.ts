'use client'

import { useState, useCallback } from 'react'

type CopyState = { status: 'idle' | 'copied' | 'error'; error?: string }

/**
 * Copy text to clipboard. Returns `{ status, copied }` where `copied` flips
 * true for 2s then resets. Handles older browsers (fallback to execCommand).
 */
export function useCopyToClipboard(resetMs = 2000) {
  const [state, setState] = useState<CopyState>({ status: 'idle' })

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setState({ status: 'copied' })
        setTimeout(() => setState({ status: 'idle' }), resetMs)
      } catch {
        // Fallback for older browsers / non-HTTPS
        try {
          const el = document.createElement('textarea')
          el.value = text
          el.style.position = 'fixed'
          el.style.opacity = '0'
          document.body.appendChild(el)
          el.select()
          document.execCommand('copy')
          document.body.removeChild(el)
          setState({ status: 'copied' })
          setTimeout(() => setState({ status: 'idle' }), resetMs)
        } catch {
          setState({ status: 'error', error: 'Clipboard not available' })
        }
      }
    },
    [resetMs],
  )

  return { ...state, copy, reset: useCallback(() => setState({ status: 'idle' }), []) }
}
