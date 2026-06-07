import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CtaBanner } from "@/components/cta-banner"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { BarChart3, Film, Camera, Megaphone, CheckCircle } from "lucide-react"

const services = [
  { icon: BarChart3, title: "Marketing Digital", items: ["Estrategia de redes sociales", "Campanas pagas (Meta Ads, Google Ads)", "Content Creation", "Community Management", "Analytics y Reporting"] },
  { icon: Film, title: "Produccion Audiovisual", items: ["Cine publicitario", "Videos corporativos", "Cobertura de eventos", "Post-produccion y edicion", "Animacion y Motion Graphics"] },
  { icon: Camera, title: "Fotografia", items: ["Fotografia de productos", "Fotografia de eventos", "Fotografia corporativa", "Retratos y Lifestyle", "Edicion profesional"] },
  { icon: Megaphone, title: "Publicidad", items: ["Campanas 360", "Branding corporativo", "Diseno grafico", "Estrategia creativa", "Consultoria de marca"] },
]

export default function ServiciosPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-secondary font-semibold text-sm tracking-widest uppercase mb-3">Que Ofrecemos</p>
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Servicios</h1>
            <p className="text-foreground-light max-w-xl mx-auto">Soluciones creativas integrales para impulsar tu marca.</p>
          </div>
          <div className="space-y-16">
            {services.map((s, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <s.icon className="w-12 h-12 text-secondary mb-4" />
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-3">{s.title}</h2>
                  <p className="text-foreground-light">Transformamos tus ideas en resultados medibles con creatividad y estrategia.</p>
                </div>
                <div className="bg-surface border border-border rounded-xl p-6">
                  <ul className="space-y-3">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-foreground-light">
                        <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <CtaBanner />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
