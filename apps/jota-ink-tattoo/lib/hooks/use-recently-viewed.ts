'use client'
import { useState, useEffect } from 'react'
import type { ProductLike } from './types'

const KEY = 'aiw_recently_viewed'
const MAX = 6

export function useRecentlyViewed() {
  const [items, setItems] = useState<ProductLike[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved) setItems(JSON.parse(saved))
    } catch (err) {
      console.debug("[jota-ink/use-recently-viewed] read failed — corrupted JSON or storage unavailable", err)
    }
  }, [])

  const add = (product: ProductLike) => {
    setItems(prev => {
      const next = [product, ...prev.filter(p => p.id !== product.id)].slice(0, MAX)
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch (err) {
        console.debug("[jota-ink/use-recently-viewed] write failed — likely quota exceeded or private mode", err)
      }
      return next
    })
  }

  return { items, add }
}
