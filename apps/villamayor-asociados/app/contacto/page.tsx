"use client"

import { useState } from "react"
import content from "@/content/es.json"

export default function Contacto() {
  const s = content.site
  const [name, setName] = useState("")
  const [msg, setMsg] = useState("")
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    const text = encodeURIComponent(`Hola, Estudio Jurídico Demo. Soy ${name || "(sin nombre)"}. ${msg}`)
    window.open(`https://wa.me/${s.whatsapp}?text=${text}`, "_blank")
    setSent(true)
  }

  return (
    <>
      <section className="bg-[linear-gradient(135deg,#1B2A4A,#0F1A30)] px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-[700px]">
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#C9A96E]">Contacto</span>
          <h1 className="serif my-3 mb-4 font-bold [font-size:clamp(1.75rem,4vw,2.5rem)]">
            {content.contact.title}
          </h1>
          <p className="text-[17px] opacity-85">{content.contact.subtitle}</p>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-[1000px] gap-12 [grid-template-columns:repeat(auto-fit,minmax(350px,1fr))]">
          {/* Contact Form */}
          <div>
            {sent ? (
              <div className="rounded-xl border border-[#22C55E] bg-[#F0FDF4] p-8 text-center">
                <p className="mb-2 text-lg font-bold text-[#166534]">✔ Mensaje enviado</p>
                <p className="text-sm text-[#4B5563]">Te responderemos a la brevedad</p>
              </div>
            ) : (
              <div>
                <h2 className="mb-6 text-xl font-bold text-[#1B2A4A]">Enviános un mensaje</h2>
                <input
                  placeholder="Tu nombre"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="mb-4 w-full rounded-lg border border-[#E8E3DA] px-4 py-[13.6px] font-[inherit] text-[15px] outline-none"
                />
                <textarea
                  placeholder="Contanos tu caso o consulta..."
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  rows={5}
                  className="mb-5 w-full resize-y rounded-lg border border-[#E8E3DA] px-4 py-[13.6px] font-[inherit] text-[15px] outline-none"
                />
                <button
                  onClick={handleSend}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-[#25D366] p-[13.6px] text-[15px] font-bold text-white"
                >
                  Enviar por WhatsApp
                </button>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="mb-6 text-xl font-bold text-[#1B2A4A]">Información de Contacto</h2>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="mb-1 text-[15px] font-semibold text-[#1B2A4A]">Dirección</p>
                  <p className="text-sm leading-[1.5] text-[#6B7280]">{s.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">📞</span>
                <div>
                  <p className="mb-1 text-[15px] font-semibold text-[#1B2A4A]">Teléfono / WhatsApp</p>
                  <p className="text-sm text-[#6B7280]">{s.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">📧</span>
                <div>
                  <p className="mb-1 text-[15px] font-semibold text-[#1B2A4A]">Email</p>
                  <p className="text-sm text-[#6B7280]">{s.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">🕐</span>
                <div>
                  <p className="mb-1 text-[15px] font-semibold text-[#1B2A4A]">Horarios</p>
                  <p className="text-sm text-[#6B7280]">{s.hours}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-[#E8E3DA] pt-8">
              <a
                href={`https://wa.me/${s.whatsapp}?text=Hola%2C%20Estudio%20Jur%C3%ADdico%20Demo%20-%20Quiero%20agendar%20una%20consulta`}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg bg-[#C9A96E] p-[13.6px] text-center text-[15px] font-bold text-[#1B2A4A] no-underline"
              >
                Agendar Consulta Gratis
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
