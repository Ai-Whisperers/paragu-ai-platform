'use client'
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initial: T, ttlMs?: number) {
  const [value, setValue] = useState<T>(initial)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (ttlMs && parsed._ts) {
        if (Date.now() - parsed._ts > ttlMs) {
          localStorage.removeItem(key)
          return
        }
        setValue(parsed.data)
      } else {
        setValue(parsed)
      }
    } catch {}
  }, [key])

  const set = (next: T) => {
    setValue(next)
    try {
      if (ttlMs) {
        localStorage.setItem(key, JSON.stringify({ data: next, _ts: Date.now() }))
      } else {
        localStorage.setItem(key, JSON.stringify(next))
      }
    } catch {}
  }

  const remove = () => {
    try { localStorage.removeItem(key) } catch {}
    setValue(initial)
  }

  return [value, set, remove] as const
}
