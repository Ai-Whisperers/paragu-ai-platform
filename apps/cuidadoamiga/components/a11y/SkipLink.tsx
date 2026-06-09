'use client'

import { useState, useEffect } from 'react'

export function SkipLink() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-rose-600 text-white font-medium rounded-lg focus:outline-none focus:ring-4 focus:ring-rose-300"
    >
      Ir al contenido principal
    </a>
  )
}