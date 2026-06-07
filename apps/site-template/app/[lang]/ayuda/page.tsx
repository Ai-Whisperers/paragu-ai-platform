import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import { isFeatureEnabled } from "@/lib/features"
import categoriesData from "@/content/_shared/help-categories.json"

export default async function AyudaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const l = lang as "es" | "en"
  if (!isFeatureEnabled("support", l)) {
    return (
      <>
        <Header lang={l} />
        <div className="py-20 text-center"><p className="text-foreground-light">Seccion no disponible</p></div>
        <Footer lang={l} /><WhatsAppFloat lang={l} />
      </>
    )
  }
  const categories = (categoriesData as any).categories || []
  return (
    <>
      <Header lang={l} />
      <section className="bg-primary py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-heading text-4xl font-bold text-white mb-3">Centro de ayuda</h1>
          <p className="text-white/70">Encontrá respuestas a tus preguntas</p>
        </div>
      </section>
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {categories.map((cat: any) => (
            <a key={cat.slug} href={`/${l}/ayuda/${cat.slug}`} className="bg-surface rounded-2xl p-6 hover:shadow-md transition-all border border-gray-100 block">
              <h3 className="font-heading text-lg font-bold text-primary mb-2">{cat.name}</h3>
              <p className="text-sm text-foreground-light">{cat.description}</p>
            </a>
          ))}
        </div>
      </section>
      <Footer lang={l} />
      <WhatsAppFloat lang={l} />
    </>
  )
}
