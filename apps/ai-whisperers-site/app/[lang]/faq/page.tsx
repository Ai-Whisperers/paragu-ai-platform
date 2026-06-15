import { notFound } from "next/navigation"
import { getContent } from "@/lib/utils"
import en from "@/content/en/site.json"
import es from "@/content/es/site.json"
import { MessageCircle, Quote } from "lucide-react"
import { FAQItem } from "@/components/FAQItem"

const LOCALES = ["en", "es", "nl", "pt"] as const
const CONTENT: Record<string, any> = { en, es, nl: en, pt: en }

export function generateStaticParams() {
  return LOCALES.map(l => ({ lang: l }))
}

export const metadata = { title: "FAQ" }

export default async function FAQ({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = CONTENT[lang] || en
  const faq = c.faq

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <Quote className="w-12 h-12 mx-auto mb-3 text-accent opacity-50" />
        <h1 className="text-4xl sm:text-6xl font-bold mb-3">{faq.title}</h1>
        <p className="text-fg-muted text-lg">{faq.subtitle}</p>
      </div>

      <div className="space-y-3">
        {faq.items.map((it: any, i: number) => (
          <FAQItem key={i} q={it.q} a={it.a} />
        ))}
      </div>

      <div className="mt-16 p-8 bg-gradient-to-br from-accent/10 to-accent-3/10 border border-accent/30 rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
        <p className="text-fg-muted mb-6">Book a free 30-minute strategy call. We'll answer anything, no sales pitch.</p>
        <a href={`https://wa.me/${c.site.whatsapp}?text=${encodeURIComponent("Hi! I have a question about your services.")}`} className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white font-semibold rounded-lg hover:bg-green/80 transition-colors">
          <MessageCircle className="w-4 h-4" /> WhatsApp us
        </a>
      </div>
    </div>
  )
}
