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
        title="Complejo Cocodrilo"
        subtitle="Gimnasio completo, pileta climatizada y las mejores instalaciones para tu entrenamiento en Asunción"
      />
      <Services />
      <CtaBanner />
      <Footer
        businessName="Complejo Cocodrilo"
        tagline="Fitness y Bienestar en Asunción"
        address="Av. Santísima Trinidad, Asunción"
        phone="0986 106 062"
        hours="Lun-Sáb: 9:00 - 20:00"
        waPhone="595986106062"
      />
      <WhatsAppFloat />
    </>
  )
}
