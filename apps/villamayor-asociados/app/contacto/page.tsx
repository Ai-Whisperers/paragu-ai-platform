"use client"

import { useState } from "react"
import content from "@/content/es.json"

export default function Contacto() {
  const s = content.site
  const [name, setName] = useState("")
  const [msg, setMsg] = useState("")
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    const text = encodeURIComponent(`Hola, Villamayor & Asociados. Soy ${name || "(sin nombre)"}. ${msg}`)
    window.open(`https://wa.me/${s.whatsapp}?text=${text}`, "_blank")
    setSent(true)
  }

  return (
    <>
      <section className="text-white py-20 px-6 text-center bg-[linear-gradient(135deg,#1B2A4A,#0F1A30)]">
        <div className="max-w-[700px] mx-auto">
          <span className="text-secondary text-[0.8125rem] font-semibold tracking-[0.08em] uppercase">Contacto</span>
          <h1 className="serif font-bold mt-3 mb-4 text-[clamp(1.75rem,4vw,2.5rem)]">
            {content.contact.title}
          </h1>
          <p className="text-[1.0625rem] opacity-85">{content.contact.subtitle}</p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1000px] mx-auto grid gap-12 grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
          {/* Contact Form */}
          <div>
            {sent ? (
              <div className="bg-green-50 border border-green-500 rounded-xl p-8 text-center">
                <p className="font-bold text-[1.125rem] text-green-800 mb-2">✔ Mensaje enviado</p>
                <p className="text-sm text-gray-600">Te responderemos a la brevedad</p>
              </div>
            ) : (
              <div>
                <h2 className="font-bold text-xl text-primary mb-6">Enviános un mensaje</h2>
                <input
                  placeholder="Tu nombre"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full py-[0.85rem] px-4 rounded-lg border border-border text-[0.9375rem] mb-4 outline-none [font-family:inherit]"
                />
                <textarea
                  placeholder="Contanos tu caso o consulta..."
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  rows={5}
                  className="w-full py-[0.85rem] px-4 rounded-lg border border-border text-[0.9375rem] mb-5 outline-none resize-y [font-family:inherit]"
                />
                <button onClick={handleSend}
                  className="w-full bg-whatsapp text-white py-[0.85rem] rounded-lg border-none font-bold text-[0.9375rem] cursor-pointer flex items-center justify-center gap-2">
                  Enviar por WhatsApp
                </button>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="font-bold text-xl text-primary mb-6">Información de Contacto</h2>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="font-semibold text-[0.9375rem] text-primary mb-1">Dirección</p>
                  <p className="text-sm text-text-muted leading-[1.5]">{s.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">📞</span>
                <div>
                  <p className="font-semibold text-[0.9375rem] text-primary mb-1">Teléfono / WhatsApp</p>
                  <p className="text-sm text-text-muted">{s.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">📧</span>
                <div>
                  <p className="font-semibold text-[0.9375rem] text-primary mb-1">Email</p>
                  <p className="text-sm text-text-muted">{s.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">🕐</span>
                <div>
                  <p className="font-semibold text-[0.9375rem] text-primary mb-1">Horarios</p>
                  <p className="text-sm text-text-muted">{s.hours}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <a href={`https://wa.me/${s.whatsapp}?text=Hola%2C%20Villamayor%20%26%20Asociados%20-%20Quiero%20agendar%20una%20consulta`} target="_blank" rel="noopener noreferrer"
                className="block bg-secondary text-primary py-[0.85rem] rounded-lg font-bold no-underline text-[0.9375rem] text-center">
                Agendar Consulta Gratis
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
