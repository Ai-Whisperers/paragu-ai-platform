import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { CtaBanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import Link from "next/link"
import { Camera, Film, Megaphone, BarChart3, ArrowRight } from "lucide-react"

const services = [
  { icon: BarChart3, title: "Marketing Digital", desc: "Estrategia de redes sociales, campanas pagas y content creation para hacer crecer tu marca." },
  { icon: Film, title: "Produccion Audiovisual", desc: "Cine publicitario, videos corporativos y cobertura de eventos con calidad profesional." },
  { icon: Camera, title: "Fotografia", desc: "Fotografia de productos, eventos, corporativa y lifestyle con edicion profesional." },
  { icon: Megaphone, title: "Publicidad", desc: "Campanas 360, branding corporativo y estrategia creativa para marcas que quieren destacar." },
]

const clients = ["VW", "Carmen Steffens", "SIT EVENTOS", "Lez a Lez", "Aurelia Brew Pub", "Estacion Los Jardines"]

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-secondary font-semibold text-sm tracking-widest uppercase mb-3">Nuestros Servicios</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Que hacemos</h2>
            <p className="text-foreground-light max-w-xl mx-auto">Soluciones creativas integrales para tu marca.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={i} className="group bg-surface border border-border rounded-xl p-6 hover:border-secondary/30 transition-all">
                <s.icon className="w-10 h-10 text-secondary mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-foreground-light mb-4">{s.desc}</p>
                <Link href="/servicios" className="text-sm text-secondary font-medium hover:underline inline-flex items-center gap-1">
                  Saber mas <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-foreground-muted text-sm tracking-widest uppercase mb-8">Marcas que confian en nosotros</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {clients.map((c, i) => (
              <span key={i} className="text-foreground-muted text-lg font-semibold opacity-60 hover:opacity-100 transition-opacity">{c}</span>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
