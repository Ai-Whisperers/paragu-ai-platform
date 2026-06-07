import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ContactSection } from "@/components/contact-section"
import { getContent } from "@/lib/config"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  return {
    title: c.contactPage?.title ?? (lang === "es" ? "Contacto" : "Contact"),
    description: c.contactPage?.subtitle ?? (lang === "es" ? "Contactanos por WhatsApp o visítanos en Asunción" : "Contact us via WhatsApp or visit us in Asunción"),
  }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  const mapsEmbed = c.business.mapsEmbed
  const mapsUrl = c.business.mapsUrl || `https://www.google.com/maps?q=${encodeURIComponent(c.business.address)}`

  return (
    <>
      <Header lang={lang as "es" | "en"} />
      <ContactSection lang={lang as "es" | "en"} />
      
      {mapsEmbed && (
        <section className="pb-20 bg-white">
          <div className="container-page">
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <iframe
                src={mapsEmbed}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={lang === "es" ? "Ubicación de Magnolia Peluquería" : "Magnolia Peluquería Location"}
              />
            </div>
            <div className="text-center mt-4">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-secondary font-medium hover:underline"
              >
                {lang === "es" ? "Abrir en Google Maps →" : "Open in Google Maps →"}
              </a>
            </div>
          </div>
        </section>
      )}
      
      <Footer
        businessName={c.business.name}
        tagline={c.business.tagline}
        address={c.business.address}
        phone={c.business.phoneFormatted}
        hours={c.business.hours}
        waPhone={c.business.whatsapp}
        lang={lang as "es" | "en"}
      />
      <WhatsAppFloat lang={lang as "es" | "en"} />
    </>
  )
}