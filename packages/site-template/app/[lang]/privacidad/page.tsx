/**
 * ANNOTATION: PrivacyPolicy
 *
 * What it is: A static legal page displaying the business privacy policy.
 *
 * Plan availability: Basic, Crecimiento, Profesional
 */

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import { MobileCta } from "@/components/marketing/MobileCTA"
import es_ui from "@/content/es/ui.json"
import en_ui from "@/content/en/ui.json"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return { title: lang === "es" ? "Política de Privacidad" : "Privacy Policy" }
}

function PrivacyContent({ lang }: { lang: "es" | "en" }) {
  const content = lang === "es" ? es_ui.legal.privacidad : en_ui.legal.privacidad
  const currentDate = new Date().toLocaleDateString(lang === "es" ? "es-PY" : "en-US", { year: "numeric", month: "long", day: "numeric" })

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{content.title}</h1>
          <p className="text-sm text-gray-500">{content.lastUpdated}: {currentDate}</p>
        </header>
        <div className="space-y-10">
          {content.sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
              <div className="prose prose-gray max-w-none">
                {section.content.split("\n").map((line, i) => {
                  if (line.trim() === "") return <div key={i} className="h-3" />
                  if (line.startsWith("•")) return <p key={i} className="mb-1 pl-4 text-gray-700">{line}</p>
                  return <p key={i} className="text-gray-700 mb-1">{line}</p>
                })}
              </div>
            </div>
          ))}
        </div>
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>{lang === "es" ? "Esta política de privacidad es un documento legalmente vinculante." : "This privacy policy is a legally binding document."}</p>
        </footer>
      </div>
    </section>
  )
}

export default async function PrivacidadPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return (
    <>
      <Header lang={lang as "es" | "en"} />
      <PrivacyContent lang={lang as "es" | "en"} />
      <Footer lang={lang as "es" | "en"} />
      <WhatsAppFloat lang={lang as "es" | "en"} />
      <MobileCta />
    </>
  )
}
