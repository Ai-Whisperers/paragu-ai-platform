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
    } catch (err) {
      console.debug("[jota-ink/use-local-storage] read failed — corrupted JSON or storage unavailable", { key, err })
    }
  }, [key])

  const set = (next: T) => {
    setValue(next)
    try {
      if (ttlMs) {
        localStorage.setItem(key, JSON.stringify({ data: next, _ts: Date.now() }))
      } else {
        localStorage.setItem(key, JSON.stringify(next))
      }
    } catch (err) {
      console.debug("[jota-ink/use-local-storage] write failed — likely quota exceeded or private mode", { key, err })
    }
  }

  const remove = () => {
    try { localStorage.removeItem(key) } catch (err) {
      console.debug("[jota-ink/use-local-storage] remove failed — storage unavailable", { key, err })
    }
    setValue(initial)
  }

  return [value, set, remove] as const
}
