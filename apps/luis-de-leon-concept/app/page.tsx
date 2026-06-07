import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { CtaBanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function Home() {
  return (
    <>
      <Header />
      <Hero
        title="Luis De León Concept"
        subtitle="Cortes de alta calidad, coloración experta y asesoría de imagen personalizada en Asunción"
      />
      <Services />
      <CtaBanner />
      <Footer
        businessName="Luis De León Concept"
        tagline="Estilo y Elegancia en Asunción"
        address="Asunción"
        phone="0981 000 000"
        hours="Lun-Sáb: 9:00 - 20:00"
        waPhone="595981000000"
      />
      <WhatsAppFloat />
    </>
  )
}
