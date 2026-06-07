import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CtaBanner } from "@/components/cta-banner"
import { WhatsAppFloat } from "@/components/whatsapp-float"

const faqs = [
  { q: "Que tipos de servicios ofrecen?", a: "Ofrecemos marketing digital, produccion audiovisual, fotografia profesional y publicidad. Tambien hacemos branding y estrategia creativa." },
  { q: "Cuanto tiempo toma un proyecto?", a: "Depende del alcance. Un video corporativo puede tomar 1-2 semanas, una campana completa 3-4 semanas. Te damos un timeline exacto en la primera reunion." },
  { q: "Trabajan con empresas de todos los tamanos?", a: "Si. Trabajamos desde emprendimientos hasta grandes empresas. Cada proyecto recibe la misma dedicacion y calidad." },
  { q: "Tienen experiencia en mi industria?", a: "Hemos trabajado con automotriz, moda, gastronomia, eventos, centros comerciales y mas. Contactanos y te mostramos casos similares." },
  { q: "Como inicio un proyecto con ustedes?", a: "Escribinos por WhatsApp o llena el formulario de contacto. Te responderemos en menos de 24 horas para agendar una reunion sin compromiso." },
  { q: "Cual es la inversion minima?", a: "Cada proyecto es unico. Te damos un presupuesto personalizado despues de entender tus necesidades." },
  { q: "Hablan ingles?", a: "Si! Trabajamos en espanol, ingles y guarani. Podemos comunicarnos en el idioma que prefieras." },
  { q: "Tienen portfolio para mostrar?", a: "Si! Visita nuestra seccion de portfolio para ver nuestros proyectos mas recientes." },
  { q: "Hacen envio de productos?", a: "Trabajamos con activos digitales. Los entregables se envian por link de descarga o plataforma cloud." },
  { q: "Tienen garantia?", a: "Trabajamos con revisiones incluidas. Si no estas satisfecho, ajustamos hasta que el resultado sea el esperado." },
]

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary font-semibold text-sm tracking-widest uppercase mb-3">FAQ</p>
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Preguntas Frecuentes</h1>
          </div>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <details key={i} className="bg-surface border border-border rounded-xl">
                <summary className="px-6 py-4 font-medium text-foreground cursor-pointer hover:text-secondary transition-colors">{item.q}</summary>
                <p className="px-6 pb-4 text-foreground-light text-sm">{item.a}</p>
              </details>
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
