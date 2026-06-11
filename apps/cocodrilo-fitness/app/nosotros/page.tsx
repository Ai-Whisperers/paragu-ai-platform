import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Sparkles, Shield, Users, Award } from "lucide-react"

export const metadata = { title: "Nosotros — Complejo Cocodrilo" }

const features = [
  { icon: Sparkles, title: "Experiencia", desc: "Años de experiencia en el rubro nos respaldan" },
  { icon: Shield, title: "Confianza", desc: "Clientes satisfechos avalan nuestro trabajo" },
  { icon: Users, title: "Equipo", desc: "Profesionales capacitados y dedicados" },
  { icon: Award, title: "Calidad", desc: "Estándares de calidad en cada servicio" },
]

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-heading text-4xl font-bold text-primary text-center mb-4">Sobre Complejo Cocodrilo</h1>
          <p className="text-center text-foreground-light max-w-2xl mx-auto mb-16 text-lg">
            Somos un gimnasio completo ubicado en Asunción, con instalaciones de primer nivel que incluyen sala de pesas, cardio, pileta climatizada, sauna y cancha de squash. Nuestro equipo de profesionales está dedicado a ayudarte a alcanzar tus metas fitness en un ambiente motivador y seguro.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
                <f.icon className="w-10 h-10 text-secondary mx-auto mb-3" />
                <h3 className="font-heading font-bold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-foreground-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
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
