"use client"
import { useState } from "react"
import content from "@/content/es.json"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

const c = content as Record<string, any>
const faq = c.faq || []

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <BreadcrumbJsonLd items={[{ name: "FAQ", url: "/faq" }]} />
      <h1 className="text-4xl font-bold text-center text-[#1A1A2E] mb-10">Preguntas Frecuentes</h1>
      <div className="space-y-2">
        {faq.map((item: any, i: number) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
            <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full px-5 py-4 text-left bg-none border-none text-[#1A1A2E] font-semibold text-sm cursor-pointer flex justify-between items-center gap-4 hover:bg-[#F8F9FA] transition-colors">
              <span>{item.question}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className={`transition-transform shrink-0 ${openIdx === i ? "rotate-180" : ""}`}>
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            {openIdx === i && (
              <div className="px-5 pb-4 text-[#6B7280] text-sm leading-relaxed">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
