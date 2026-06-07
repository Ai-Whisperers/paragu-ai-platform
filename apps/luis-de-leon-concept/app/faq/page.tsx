import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ChevronDown } from "lucide-react"

export const metadata = { title: "Preguntas Frecuentes — Luis De León Concept" }

const faqs = [{'q': '¿Cuáles son los horarios?', 'a': 'Lunes a sábado de 9:00 a 20:00. Domingos cerrado.'}, {'q': '¿Trabajan con cita previa?', 'a': 'Sí, recomendamos agendar tu cita para asegurarte el horario. Podés hacerlo por WhatsApp.'}, {'q': '¿Qué servicios ofrecen?', 'a': 'Cortes de cabello, coloración, mechas, alisados, tratamientos capilares y asesoría de imagen.'}, {'q': '¿Usan productos profesionales?', 'a': 'Sí, trabajamos con marcas profesionales para garantizar los mejores resultados.'}, {'q': '¿Cuánto dura un servicio?', 'a': 'Depende del servicio: corte 30-45 min, coloración 1-2 horas, tratamientos capilares 30-60 min.'}]

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="bg-background py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-4xl font-bold text-primary text-center mb-2">Preguntas Frecuentes</h1>
          <p className="text-center text-foreground-light mb-12">Todo lo que necesitás saber sobre Luis De León Concept</p>
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
        businessName="Luis De León Concept"
        tagline="Estilo y Elegancia en Asunción"
        address="Asunción"
        phone="0981 000 000"
        hours="Lun-Sáb: 9:00 - 20:00"
        waPhone="595981000000"
      />
      <WhatsAppFloat />
    </>
  )
}
