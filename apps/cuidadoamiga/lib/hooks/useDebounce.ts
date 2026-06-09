'use client'

import { useState, useEffect } from 'react'

/**
 * Returns a debounced version of `value`. The returned value only updates
 * after `delay` ms of inactivity. Default 300ms.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
