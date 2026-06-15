"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-bg-elev border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-bg transition-colors"
      >
        <span className="font-bold pr-4">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 flex-shrink-0 text-fg-muted" /> : <ChevronDown className="w-4 h-4 flex-shrink-0 text-fg-muted" />}
      </button>
      {open && (
        <div className="px-6 pb-4 text-fg-muted text-sm leading-relaxed border-t border-border pt-4">
          {a}
        </div>
      )}
    </div>
  )
}
