import { notFound } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import en from "@/content/en/site.json"
import es from "@/content/es/site.json"

const LOCALES = ["en", "es", "nl", "pt"] as const
type Locale = (typeof LOCALES)[number]

const CONTENT: Record<Locale, any> = { en, es, nl: en, pt: en }

export function generateStaticParams() {
  return LOCALES.map(l => ({ lang: l }))
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!LOCALES.includes(lang as Locale)) notFound()
  const content = CONTENT[lang as Locale]
  const translationNote = (content as any)?.__translation_note
  return (
    <>
      {translationNote && (
        <div
          role="status"
          className="w-full bg-amber-500/10 border-b border-amber-500/30 text-amber-200 text-xs sm:text-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-2 text-center">
            <span aria-hidden>🌐</span>
            <span>{translationNote}</span>
          </div>
        </div>
      )}
      <Navbar lang={lang} content={content} />
      <main className="min-h-screen">{children}</main>
      <Footer lang={lang} content={content} />
    </>
  )
}
