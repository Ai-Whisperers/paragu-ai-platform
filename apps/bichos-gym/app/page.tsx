import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Services } from "@/components/services"
import { Trainers } from "@/components/trainers"
import { Schedule } from "@/components/schedule"
import { Gallery } from "@/components/gallery"
import { Location } from "@/components/location"
import { CtaBanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { TrustStrip, TRUST_ITEMS_FITNESS } from "@/components/truststrip"

export default function Home() {
  return (
    <>
      <Header />
      <Hero
        title="Bicho's Gym"
        subtitle="Gimnasio completo en Capiatá con entrenadores certificados y el mejor ambiente para alcanzar tus metas"
      />
      <Stats />
      <section className="py-12 px-4 border-y border-border bg-card/50">
        <div className="max-w-6xl mx-auto">
          <TrustStrip items={TRUST_ITEMS_FITNESS} variant="horizontal" theme="light" size="md" />
        </div>
      </section>

      <Services />
      <Trainers />
      <Schedule />
      <Gallery />
      <Location />
      <CtaBanner />
      <Footer
        businessName="Bicho's Gym"
        tagline="Transformá tu Cuerpo en Capiatá"
        address="Capiatá"
        phone="0981 106 062"
        hours="Lun-Sáb: 7:00 - 21:00, Dom: 9:00 - 13:00"
        waPhone="595986106062"
      />
      <WhatsAppFloat />
    </>
  )
}
