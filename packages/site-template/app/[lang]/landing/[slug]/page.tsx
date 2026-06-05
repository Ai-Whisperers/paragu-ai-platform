import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Shield, Zap, Heart } from "lucide-react"
import landingPagesData from "@/content/_shared/landing-pages.json"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"

interface LandingPage {
  slug: string
  headline: string
  subheadline: string
  formFields: {
    name: string
    label: string
    type: string
    required: boolean
  }[]
  cta: string
}

interface LandingPagesData {
  landingPages: LandingPage[]
}

export async function generateStaticParams() {
  const data = landingPagesData as LandingPagesData
  return data.landingPages.map((lp) => ({ slug: lp.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const data = landingPagesData as LandingPagesData
  const lp = data.landingPages.find((p) => p.slug === slug)
  if (!lp) return {}
  return {
    title: lp.headline,
    description: lp.subheadline,
  }
}

export default async function LandingPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const l = lang as "es" | "en"
  const data = landingPagesData as LandingPagesData
  const lp = data.landingPages.find((p) => p.slug === slug)

  if (!lp) notFound()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/90">
      {/* Trust badges */}
      <div className="max-w-2xl mx-auto pt-8 px-4 text-center">
        <div className="flex items-center justify-center gap-6 text-white/60 text-sm">
          <span className="flex items-center gap-1"><Shield className="w-4 h-4" />{l === "es" ? "Datos seguros" : "Secure data"}</span>
          <span className="flex items-center gap-1"><Zap className="w-4 h-4" />{l === "es" ? "Respuesta en 24h" : "24h response"}</span>
          <span className="flex items-center gap-1"><Heart className="w-4 h-4" />{l === "es" ? "Sin compromiso" : "No obligation"}</span>
        </div>
      </div>

      {/* Hero + Form */}
      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{lp.headline}</h1>
          <p className="text-white/70 text-lg">{lp.subheadline}</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <form className="space-y-4">
            {lp.formFields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea id={field.name} name={field.name} required={field.required} rows={4} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                ) : (
                  <input type={field.type} id={field.name} name={field.name} required={field.required} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                )}
              </div>
            ))}
            <button type="submit" className="w-full bg-secondary text-white font-bold py-4 rounded-xl hover:bg-secondary/90 transition-all text-lg">
              {lp.cta}
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-4">
            {l === "es" ? "Al enviar aceptas nuestra" : "By submitting you accept our"}{" "}
            <a href={`/${l}/privacidad`} className="underline">{l === "es" ? "politica de privacidad" : "privacy policy"}</a>
          </p>
        </div>
      </div>

      {/* No footer nav - just WhatsApp float */}
      <WhatsAppFloat lang={l} />
    </div>
  )
}