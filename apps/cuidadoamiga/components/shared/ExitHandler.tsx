'use client'

import { useEffect } from 'react'

/**
 * Keyboard shortcut handler for the survivor-safe exit.
 * Listens for Ctrl+E (or Cmd+E on Mac) and navigates to Google,
 * replacing browser history to protect the user.
 */
export function ExitHandler() {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault()
        e.stopPropagation()
        window.history.replaceState(null, '', 'https://google.com')
        window.location.href = 'https://google.com'
      }
    }

    document.addEventListener('keydown', handleKeyDown, { capture: true })
    return () => document.removeEventListener('keydown', handleKeyDown, { capture: true })
  }, [])

  return null
}
