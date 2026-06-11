import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Services } from "@/components/services"
import { Gallery } from "@/components/gallery"
import { Testimonials } from "@/components/testimonials"
import { Location } from "@/components/location"
import { CtaBanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function Home() {
  return (
    <>
      <Header />
      <Hero
        title="Mantra Spa"
        subtitle="Masajes relajantes, tratamientos corporales y experiencias de bienestar únicas en Concepción"
      />
      <Stats />
      <Services />
      <Gallery />
      <Testimonials />
      <Location />
      <CtaBanner />
      <Footer
        businessName="Mantra Spa"
        tagline="Bienestar y Relax en Concepción"
        address="Concepción"
        phone="0981 106 062"
        hours="Lun-Sáb: 10:00 - 20:00"
        waPhone="595986106062"
      />
      <WhatsAppFloat />
    </>
  )
}
