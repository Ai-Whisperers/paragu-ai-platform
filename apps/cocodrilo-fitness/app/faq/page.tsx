import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ChevronDown } from "lucide-react"

export const metadata = { title: "Preguntas Frecuentes — Complejo Cocodrilo" }

const faqs = [{'q': '¿Cuáles son los horarios?', 'a': 'Lunes a sábado de 9:00 a 20:00. Domingos cerrado.'}, {'q': '¿Tienen pileta climatizada?', 'a': 'Sí, contamos con pileta semi-olímpica climatizada incluida en todos los planes.'}, {'q': '¿Puedo probar antes de inscribirme?', 'a': 'Sí, ofrecemos una clase de prueba gratuita. Contactanos por WhatsApp para agendarla.'}, {'q': '¿Qué planes ofrecen?', 'a': 'Tenemos Plan Básico (sala de pesas y cardio), Plan Completo (acceso total + pileta + clases) y Plan Familiar (hasta 4 miembros).'}, {'q': '¿Cómo puedo inscribirme?', 'a': 'Podés inscribirte visitándonos en Av. Santísima Trinidad o contactarnos por WhatsApp.'}]

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="bg-background py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-4xl font-bold text-primary text-center mb-2">Preguntas Frecuentes</h1>
          <p className="text-center text-foreground-light mb-12">Todo lo que necesitás saber sobre Complejo Cocodrilo</p>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm">
                <summary className="px-6 py-4 font-medium text-foreground cursor-pointer hover:text-secondary transition-colors list-none flex items-center justify-between">
                  {item.q}
                  <ChevronDown className="w-4 h-4 text-foreground-light shrink-0" />
                </summary>
                <p className="px-6 pb-4 text-foreground-light text-sm">{item.a}</p>
              </details>
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
