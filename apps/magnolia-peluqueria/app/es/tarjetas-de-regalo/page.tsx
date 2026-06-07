import type { Metadata } from "next"
import { Header } from "@/components/header"
import { GiftCardsSection } from "@/components/gift-cards"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Breadcrumb } from "@/components/breadcrumb"
import { getContent } from "@/lib/config"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  return {
    title: `Tarjetas de Regalo | ${c.business.name}`,
    description: "Regalá un momento Magnolia — tarjetas de regalo para cumpleaños, Navidad o cualquier ocasión especial.",
  }
}

export default async function TarjetasRegaloPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  return (
    <>
      <Header lang={lang as "es" | "en"} />
      <div className="pt-24">
        <div className="container-page max-w-6xl">
          <Breadcrumb lang={lang as "es" | "en"} />
          <div className="mt-4">
            <GiftCardsSection />
          </div>
        </div>
      </div>
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
