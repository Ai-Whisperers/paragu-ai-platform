"use client"
import { useState, useEffect } from "react"

const STORAGE_KEY = "fun4me_wishlist"

export function useWishlist() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setItems(JSON.parse(saved))
    } catch (err) {
      console.debug("[jota-ink/wishlist] read failed — corrupted JSON or storage unavailable", err)
    }
  }, [])

  const toggle = (product: any) => {
    setItems(prev => {
      const exists = prev.find(p => p.id === product.id)
      const updated = exists ? prev.filter(p => p.id !== product.id) : [...prev, product]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const isFavorite = (productId: number) => items.some(p => p.id === productId)

  return { items, toggle, isFavorite, count: items.length }
}
