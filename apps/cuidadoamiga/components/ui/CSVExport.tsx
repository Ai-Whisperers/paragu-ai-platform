'use client'

import { useState, useCallback } from 'react'
import type { UiCsv } from '@/lib/content-types'

interface CSVExportProps {
  /** URL or endpoint that returns CSV. */
  url: string
  ui: UiCsv
  /** Optional filename for the download, e.g., `casos-AR.csv`. */
  filename?: string
  className?: string
}

/**
 * Downloads a server-generated CSV file. The server endpoint should return
 * `Content-Type: text/csv` and `Content-Disposition: attachment`.
 *
 * If a `filename` is provided, the download is done client-side with a
 * `fetch` + `Blob` approach (the standard pattern). Otherwise, a plain
 * anchor tag navigates to the URL (simpler).
 */
export function CSVExport({ url, ui, filename, className = '' }: CSVExportProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleDownload = useCallback(async () => {
    if (filename) {
      setState('loading')
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const blob = await res.blob()
        const blobUrl = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = blobUrl
        a.download = filename
        a.click()
        URL.revokeObjectURL(blobUrl)
        setState('success')
        setTimeout(() => setState('idle'), 3000)
      } catch {
        setState('error')
        setTimeout(() => setState('idle'), 3000)
      }
    } else {
      // Navigate directly
      setState('loading')
      window.location.href = url
    }
  }, [url, filename])

  return (
    <button
      onClick={handleDownload}
      disabled={state === 'loading'}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        state === 'error'
          ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          : state === 'success'
            ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600'
      } disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {state === 'loading' ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {ui.exporting}
        </>
      ) : state === 'success' ? (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          {ui.success}
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          {ui.download}
        </>
      )}
    </button>
  )
}
