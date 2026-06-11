'use client'
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import type { Content } from "@/types/content"
import raw from "@/content/es.json"

const content = raw as unknown as Content
const faqItems = content.faq.items
const phone = content.whatsapp.phone

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <PageLayout phone={phone}>
      <section className="flex min-h-[30vh] items-center justify-center bg-surface px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">Preguntas Frecuentes</h1>
          <p className="mt-3 text-lg text-muted-foreground">Resolvé tus dudas</p>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="space-y-3">
            {faqItems.map((faq, i) => (
              <div key={i} className="overflow-hidden rounded-lg border border-border bg-surface">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-foreground transition-colors hover:bg-surface-light">
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${open === i ? 'rotate-180' : ''}`} />
                </button>
                {open === i && (
                  <div className="border-t border-border px-6 py-4 text-sm text-muted-foreground">
                    <p className="mb-3">{faq.answer}</p>
                    {faq.cta && (
                      <a href={`https://wa.me/${phone}?text=${encodeURIComponent("Hola! Quiero consultar: " + faq.question)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-block text-sm font-semibold text-primary hover:underline">
                        {faq.cta} →
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}