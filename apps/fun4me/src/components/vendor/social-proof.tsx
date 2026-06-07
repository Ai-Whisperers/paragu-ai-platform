"use client"
import { useState } from "react"

export function SocialProof({ orders, total }: { orders: any[]; total: number }) {
  const [dismissed, setDismissed] = useState(false)
  const [current] = useState(() => orders[Math.floor(Math.random() * orders.length)])

  if (dismissed || !current) return null

  return (
    <div className="fixed bottom-32 left-4 z-[9998] max-w-[280px] animate-slide-up">
      <div className="rounded-xl border border-border bg-surface p-3 shadow-lg">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm shrink-0">
              🛒
            </div>
            <div className="text-xs">
              <p className="text-foreground font-medium">Alguien compró</p>
              <p className="text-muted-foreground">{current.product}</p>
              <p className="text-muted-foreground/60">{current.time} · {current.city}</p>
            </div>
          </div>
          <button onClick={() => setDismissed(true)} className="text-muted-foreground/40 hover:text-muted-foreground text-xs">✕</button>
        </div>
        <p className="text-[10px] text-muted-foreground/50 mt-2">{total} clientas satisfechas</p>
      </div>
    </div>
  )
}
