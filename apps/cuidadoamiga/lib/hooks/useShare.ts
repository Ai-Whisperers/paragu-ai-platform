'use client'

import { useCallback } from 'react'

type ShareInput = {
  title?: string
  text: string
  url: string
}

type ShareResult = { shared: boolean; method: 'native' | 'fallback'; error?: string }

/**
 * Web Share API with clipboard fallback. On mobile, opens the native share
 * sheet. On desktop, copies the URL to clipboard.
 *
 * The `title` field is omitted when undefined to satisfy Strict TS
 * (`exactOptionalPropertyTypes`).
 */
export function useShare() {
  const share = useCallback(async (input: ShareInput): Promise<ShareResult> => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        const data: { text: string; url: string } & Partial<{ title: string }> = {
          text: input.text,
          url: input.url,
        }
        if (input.title) data.title = input.title
        await navigator.share(data as ShareData)
        return { shared: true, method: 'native' }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return { shared: false, method: 'native' }
        }
        return { shared: false, method: 'fallback', error: String(err) }
      }
    }

    // Fallback: copy URL to clipboard
    try {
      await navigator.clipboard.writeText(input.url)
      return { shared: true, method: 'fallback' }
    } catch {
      return { shared: false, method: 'fallback', error: 'Clipboard not available' }
    }
  }, [])

  return { share }
}
