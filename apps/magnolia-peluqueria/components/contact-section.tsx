"use client"

import { useState } from "react"
import { MessageCircle, MapPin, Clock, Phone, Send } from "lucide-react"
import { business, waLink } from "@/lib/config"

export function ContactSection({ lang = "es" }: { lang?: "es" | "en" | "en" }) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  const labels = lang === "es"
    ? {
        title: "¿Querés Charlar?",
        subtitle: "Escribinos y te respondemos en menos de 5 minutos",
        nameLabel: "Tu nombre",
        namePlaceholder: "María García",
        whatsappLabel: "Tu WhatsApp",
        whatsappPlaceholder: "0981 123 456",
        messageLabel: "Mensaje (opcional)",
        messagePlaceholder: "Quiero saber más sobre...",
        send: "Enviar por WhatsApp",
        info: "Info",
      }
    : {
        title: "Want to Chat?",
        subtitle: "Write to us and we'll reply in under 5 minutes",
        nameLabel: "Your name",
        namePlaceholder: "María García",
        whatsappLabel: "Your WhatsApp",
        whatsappPlaceholder: "+595 981 123 456",
        messageLabel: "Message (optional)",
        messagePlaceholder: "I want to know more about...",
        send: "Send via WhatsApp",
        info: "Info",
      }

  function handleWhatsApp(e: React.FormEvent) {
    e.preventDefault()
    const msg = encodeURIComponent(
      `¡Hola! Me gustaría contactarlos.\n\n👤 Nombre: ${name}\n📞 WhatsApp: ${phone}${message ? `\n💬 Mensaje: ${message}` : ""}`
    )
    window.open(`https://wa.me/${business.whatsapp}?text=${msg}`, "_blank")
    setSent(true)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container-page">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-4xl font-bold text-primary mb-3">{labels.title}</h2>
            <p className="text-foreground-light text-lg">{labels.subtitle}</p>
          </div>

          {sent ? (
            <div className="text-center py-12 bg-secondary/5 rounded-2xl border-2 border-secondary/20">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-2">
                {lang === "es" ? "¡Ya casi! Abrí WhatsApp" : "Almost there! Open WhatsApp"}
              </h3>
              <p className="text-foreground-light">
                {lang === "es"
                  ? "Se abrió tu chat de WhatsApp. Completá el mensaje y envialo."
                  : "Your WhatsApp chat opened. Complete and send the message."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleWhatsApp} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{labels.nameLabel}</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={labels.namePlaceholder} required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-secondary outline-none transition-all bg-white text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{labels.whatsappLabel}</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={labels.whatsappPlaceholder} required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-secondary outline-none transition-all bg-white text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{labels.messageLabel}</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={labels.messagePlaceholder} rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-secondary outline-none transition-all bg-white text-foreground resize-none" />
              </div>
              <button type="submit"
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold py-4 rounded-xl hover:bg-[#20BD5A] transition-all text-lg">
                <Send className="w-5 h-5" />
                {labels.send}
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs font-bold text-secondary uppercase tracking-wide">{labels.info}</p>
                <p className="text-sm text-foreground mt-0.5">{business.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs font-bold text-secondary uppercase tracking-wide">{labels.info}</p>
                <p className="text-sm text-foreground mt-0.5">{Object.entries(business.hours).map(([d, h]) => `${d}: ${h}`).join(" · ")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs font-bold text-secondary uppercase tracking-wide">WhatsApp</p>
                <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-secondary font-medium hover:underline mt-0.5 block">
                  {business.phoneFormatted}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
