"use client"
import { useState } from "react"
import content from "@/content/es.json"
const _c = content as any

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Preguntas Frecuentes</h1>
      <div className="space-y-2">
        {content.faq.map((item: any, i: number) => (
          <div key={i} className="rounded-xl border border-border bg-surface overflow-hidden">
            <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full px-5 py-4 text-left bg-none border-none text-foreground font-semibold text-sm cursor-pointer flex justify-between items-center gap-4 hover:bg-surface-light transition-colors">
              <span>{item.q}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className={`transition-transform shrink-0 ${openIdx === i ? "rotate-180" : ""}`}>
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            {openIdx === i && (
              <div className="px-5 pb-4 text-muted-foreground text-sm leading-relaxed">{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
