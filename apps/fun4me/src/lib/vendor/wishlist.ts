"use client"
import { useState, useEffect } from "react"

const STORAGE_KEY = "fun4me_wishlist"

export interface WishlistItem {
  id: number | string
  [key: string]: unknown
}

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setItems(JSON.parse(saved))
    } catch (err) {
      console.debug("[fun4me/wishlist] read failed — corrupted JSON or storage unavailable", err)
    }
  }, [])

  const toggle = (product: WishlistItem) => {
    setItems(prev => {
      const exists = prev.find(p => p.id === product.id)
      const updated = exists ? prev.filter(p => p.id !== product.id) : [...prev, product]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const isFavorite = (productId: number | string) => items.some(p => p.id === productId)

  return { items, toggle, isFavorite, count: items.length }
}
