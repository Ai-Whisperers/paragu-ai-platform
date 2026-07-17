'use client'
import { useState, useEffect } from 'react'
import type { ProductLike } from './types'

const KEY = 'aiw_wishlist'

export function useWishlist() {
  const [items, setItems] = useState<ProductLike[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved) setItems(JSON.parse(saved))
    } catch (err) {
      console.debug("[jota-ink/use-wishlist] read failed — corrupted JSON or storage unavailable", err)
    }
  }, [])

  const toggle = (product: ProductLike) => {
    setItems(prev => {
      const exists = prev.find(p => p.id === product.id)
      const updated = exists ? prev.filter(p => p.id !== product.id) : [...prev, product]
      try { localStorage.setItem(KEY, JSON.stringify(updated)) } catch (err) {
        console.debug("[jota-ink/use-wishlist] write failed — likely quota exceeded or private mode", err)
      }
      return updated
    })
  }

  const isFavorite = (id: number) => items.some(p => p.id === id)
  return { items, toggle, isFavorite, count: items.length }
}
