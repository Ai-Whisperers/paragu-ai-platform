"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import content from "@/content/es.json"

const c = content as any
const promotions = c.promociones?.promotions || []

export function PromoCarousel() {
  const [idx, setIdx] = useState(0)
  const len = promotions.length

  useEffect(() => {
    if (len < 2) return
    const timer = setInterval(() => setIdx(i => (i + 1) % len), 5000)
    return () => clearInterval(timer)
  }, [len])

  if (len === 0) return null

  const promo = promotions[idx]

  return (
    <div className="bg-primary/5 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl shrink-0">{promo.icon}</span>
          <div className="min-w-0">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white mr-1.5 align-middle"
              style={{ backgroundColor: promo.color }}>{promo.badge}</span>
            <span className="text-sm font-medium text-foreground align-middle">{promo.title}</span>
            <span className="hidden sm:inline text-xs text-muted-foreground ml-2 align-middle">{promo.description}</span>
          </div>
        </div>
        <Link href="/promociones" className="text-xs font-semibold text-primary hover:underline shrink-0 whitespace-nowrap">Ver promos</Link>
      </div>
      {len > 1 && (
        <div className="flex justify-center gap-1 pb-1">
          {promotions.map((_: any, i: number) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${i === idx ? "w-4 bg-primary" : "w-1.5 bg-border"}`} />
          ))}
        </div>
      )}
    </div>
  )
}
