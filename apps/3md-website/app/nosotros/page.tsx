import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CtaBanner } from "@/components/cta-banner"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Lightbulb, Target, Heart, Zap } from "lucide-react"

const values = [
  { icon: Lightbulb, title: "Creatividad", desc: "Cada proyecto es una oportunidad para innovar y sorprender." },
  { icon: Target, title: "Estrategia", desc: "Cada accion esta respaldada por un plan pensado para tus objetivos." },
  { icon: Heart, title: "Pasion", desc: "Amamos lo que hacemos y eso se refleja en cada proyecto." },
  { icon: Zap, title: "Impacto", desc: "Medimos nuestro exito por los resultados que generamos." },
]

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-secondary font-semibold text-sm tracking-widest uppercase mb-3">Quienes Somos</p>
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Nosotros</h1>
          </div>
          <div className="prose prose-invert max-w-none mb-16">
            <p className="text-lg text-foreground-light leading-relaxed">
              En <strong className="text-foreground">3 MIND</strong> transformamos ideas en experiencias visuales impactantes.
              Somos una agencia creativa paraguaya especializada en marketing digital, produccion audiovisual,
              fotografia y publicidad.
            </p>
            <p className="text-foreground-light leading-relaxed mt-4">
              Trabajamos con marcas que quieren destacar, desde emprendimientos locales hasta empresas internacionales.
              Nuestro equipo combina creatividad, estrategia y tecnologia para crear contenido que conecta.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-surface border border-border rounded-xl p-6 text-center">
                <v.icon className="w-10 h-10 text-secondary mx-auto mb-3" />
                <h3 className="font-heading font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-foreground-light">{v.desc}</p>
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
