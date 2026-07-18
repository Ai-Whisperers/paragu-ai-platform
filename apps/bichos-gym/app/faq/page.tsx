import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ChevronDown } from "lucide-react"

export const metadata = { title: "Preguntas Frecuentes — Bicho's Gym" }

const faqs = [{'q': '¿Cuáles son los horarios?', 'a': 'Lunes a sábado de 7:00 a 21:00. Domingos de 9:00 a 13:00.'}, {'q': '¿Tienen entrenadores?', 'a': 'Sí, contamos con entrenadores certificados para guiarte en tu rutina.'}, {'q': '¿Ofrecen clases grupales?', 'a': 'Sí, tenemos funcional, spinning y cross training incluidos en el plan completo.'}, {'q': '¿Cómo me inscribo?', 'a': 'Podés visitarnos en Capiatá o contactarnos por WhatsApp para más información.'}, {'q': '¿Tienen estacionamiento?', 'a': 'Sí, contamos con estacionamiento para nuestros socios.'}]

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="bg-background py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-4xl font-bold text-primary text-center mb-2">Preguntas Frecuentes</h1>
          <p className="text-center text-foreground-light mb-12">Todo lo que necesitás saber sobre Bicho&apos;s Gym</p>
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
