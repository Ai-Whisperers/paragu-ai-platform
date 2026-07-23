"use client"
import { useState, useEffect } from "react"

const STORAGE_KEY = "fun4me_recently_viewed"
const MAX_ITEMS = 6

export interface RecentItem {
  id: number | string
  [key: string]: unknown
}

export function useRecentlyViewed() {
  const [items, setItems] = useState<RecentItem[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setItems(JSON.parse(saved))
    } catch (err) {
      console.debug("[fun4me/recently-viewed] read failed — corrupted JSON or storage unavailable", err)
    }
  }, [])

  const addItem = (product: RecentItem) => {
    setItems(prev => {
      const filtered = prev.filter(p => p.id !== product.id)
      const updated = [product, ...filtered].slice(0, MAX_ITEMS)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  return { items, addItem }
}
