"use client"
import { useState, useEffect } from "react"

const STORAGE_KEY = "fun4me_recently_viewed"
const MAX_ITEMS = 6

export function useRecentlyViewed() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [])

  const addItem = (product: any) => {
    setItems(prev => {
      const filtered = prev.filter(p => p.id !== product.id)
      const updated = [product, ...filtered].slice(0, MAX_ITEMS)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  return { items, addItem }
}
