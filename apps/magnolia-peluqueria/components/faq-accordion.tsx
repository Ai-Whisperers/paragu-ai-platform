"use client"
import { useState } from "react"
import { ChevronDown, MessageCircle } from "lucide-react"
import { businessData } from "@/lib/config"

const FAQ_ITEMS_ES = [
  { q: "¿Cuáles son los horarios?", a: "Martes a sábado de 9:00 a 19:00. Lunes y domingos cerrados. Podés reservar por WhatsApp para coordinar tu turno." },
  { q: "¿Aceptan walk-ins?", a: "Preferimos con cita previa para garantizarte atención personalizada. Escribinos por WhatsApp y te confirmamos en minutos." },
  { q: "¿Qué servicios ofrecen?", a: "Cortes femeninos y masculinos, coloración, balayage, mechas, tratamientos capilares (keratina, botox, nutrición) y peinados para eventos." },
  { q: "¿Trabajan con extensiones?", a: "Sí, ofrecemos colocación y mantenimiento de extensiones capilares. Consultá por WhatsApp para coordinar." },
  { q: "¿Cuánto cuesta un corte?", a: "Corte dama desde Gs. 90.000, caballero desde Gs. 60.000. Todos los precios incluyen asesoría de estilo personalizada." },
  { q: "¿Hacen peinados de novia?", a: "Sí! Tenemos servicio completo de peinado y maquillaje para novias. Incluye prueba y asesoramiento. Reservá con anticipación." },
  { q: "¿Qué productos usan?", a: "Solo trabajamos con marcas profesionales de alta gama: Wella, L'Oréal Professionnel y Kérastase. Cuidamos tu cabello con lo mejor." },
  { q: "¿Puedo comprar tarjetas de regalo?", a: "Sí! Tenemos tarjetas de regalo desde Gs. 50.000. Perfectas para cumpleaños, Navidad o simplemente para mimar a alguien especial." },
  { q: "¿Hacen tratamientos para hombres?", a: "Sí! Cortés masculinos desde Gs. 60.000. También ofrecemos tratamientos de keratina y barbería básica." },
  { q: "¿Cómo reservo mi turno?", a: `La forma más rápida es por WhatsApp: ${businessData("es").phoneFormatted}. Te respondemos en menos de 5 minutos y coordinamos el mejor horario.` },
  { q: "¿Tienen estacionamiento?", a: "Estamos en zona céntrica con fácil acceso. Consultanos por WhatsApp y te enviamos opciones de estacionamiento cercanas." },
  { q: "¿Hacen descuentos por referidos?", a: "Sí! Con nuestro programa Magnolia Rewards, referí una amiga y ambas reciben 10% de descuento en su próximo turno." },
]

const FAQ_ITEMS_EN = [
  { q: "What are your hours?", a: "Tuesday to Saturday, 9:00 AM to 7:00 PM. Closed Mondays and Sundays. Book via WhatsApp to schedule your appointment." },
  { q: "Do you accept walk-ins?", a: "We prefer appointments to ensure personalized attention. Message us on WhatsApp and we'll confirm in minutes." },
  { q: "What services do you offer?", a: "Women's and men's cuts, coloring, balayage, highlights, hair treatments (keratin, botox, nutrition) and event hairstyling." },
  { q: "Do you work with extensions?", a: "Yes, we offer extension application and maintenance. Message us on WhatsApp to schedule." },
  { q: "How much does a haircut cost?", a: "Women's cut from Gs. 90,000, men's cut from Gs. 60,000. All prices include personalized style consultation." },
  { q: "Do you do bridal hairstyles?", a: "Yes! We offer complete hairstyling and makeup for brides. Includes trial and consultation. Book in advance." },
  { q: "What products do you use?", a: "We only work with premium professional brands: Wella, L'Oréal Professionnel and Kérastase. We take care of your hair with the best." },
  { q: "Can I buy gift cards?", a: "Yes! We have gift cards starting from Gs. 50,000. Perfect for birthdays, Christmas or just to pamper someone special." },
  { q: "Do you offer men's treatments?", a: "Yes! Men's cuts from Gs. 60,000. We also offer keratin treatments and basic barber services." },
  { q: "How do I book an appointment?", a: `The fastest way is via WhatsApp: ${businessData("en").phoneFormatted}. We reply in under 5 minutes and coordinate the best time.` },
  { q: "Do you have parking?", a: "We are in a central area with easy access. Message us on WhatsApp and we'll send nearby parking options." },
  { q: "Do you offer referral discounts?", a: "Yes! With our Magnolia Rewards program, refer a friend and both of you receive 10% off your next appointment." },
]

interface FAQAccordionProps {
  lang?: "es" | "en"
}

export function FAQAccordion({ lang = "es" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const FAQ_ITEMS = lang === "es" ? FAQ_ITEMS_ES : FAQ_ITEMS_EN

  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((item, i) => (
        <details
          key={i}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm transition-all"
          open={openIndex === i}
        >
          <summary
            onClick={(e) => { e.preventDefault(); setOpenIndex(openIndex === i ? null : i) }}
            className="px-6 py-5 font-semibold text-foreground cursor-pointer hover:text-secondary transition-colors list-none flex items-center justify-between"
          >
            <span className="flex-1 pr-4">{item.q}</span>
            <ChevronDown
              className={`w-5 h-5 text-secondary shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
            />
          </summary>
          <div className={`px-6 pb-5 text-foreground-light text-sm leading-relaxed border-t border-gray-100 pt-4 transition-all ${openIndex === i ? "opacity-100" : "hidden"}`}>
            {item.a}
          </div>
        </details>
      ))}
    </div>
  )
}