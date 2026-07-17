"use client"
import { useState } from "react"
import content from "@/content/es.json"

const c = content as Record<string, any>

export default function Faq() {
  const faq = c.faq || {}
  const items = faq.items || []
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div>
      <section className="py-20 px-4 text-center"
        style={{ background: "linear-gradient(180deg, #000000 0%, #0a0a0a 100%)" }}>
        <h1 className="text-4xl sm:text-5xl font-black mb-4"
          dangerouslySetInnerHTML={{ __html: faq.hero?.headline }} />
        <p className="text-foreground/60">{faq.hero?.subheadline}</p>
      </section>

      <section className="py-16 px-4 max-w-3xl mx-auto">
        <div className="space-y-3">
          {items.map((item: any, i: number) => {
            const isOpen = open === i
            return (
              <div key={i} className="rounded-xl border border-border bg-surface overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-foreground hover:text-accent transition-colors">
                  <span>{item.q}</span>
                  <span className={`text-accent transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-foreground/60 leading-relaxed border-t border-border pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
