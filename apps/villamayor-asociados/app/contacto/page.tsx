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
      <section style={{ background: "linear-gradient(135deg, #1B2A4A, #0F1A30)", color: "white", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <span style={{ color: "#C9A96E", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Contacto</span>
          <h1 className="serif" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, margin: "0.75rem 0 1rem" }}>
            {content.contact.title}
          </h1>
          <p style={{ fontSize: "1.0625rem", opacity: 0.85 }}>{content.contact.subtitle}</p>
        </div>
      </section>

      <section style={{ padding: "5rem 1.5rem", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "3rem" }}>
          {/* Contact Form */}
          <div>
            {sent ? (
              <div style={{ backgroundColor: "#F0FDF4", border: "1px solid #22C55E", borderRadius: "12px", padding: "2rem", textAlign: "center" }}>
                <p style={{ fontWeight: 700, fontSize: "1.125rem", color: "#166534", marginBottom: "0.5rem" }}>✔ Mensaje enviado</p>
                <p style={{ fontSize: "0.875rem", color: "#4B5563" }}>Te responderemos a la brevedad</p>
              </div>
            ) : (
              <div>
                <h2 style={{ fontWeight: 700, fontSize: "1.25rem", color: "#1B2A4A", marginBottom: "1.5rem" }}>Enviános un mensaje</h2>
                <input
                  placeholder="Tu nombre"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "8px", border: "1px solid #E8E3DA", fontSize: "0.9375rem", marginBottom: "1rem", outline: "none", fontFamily: "inherit" }}
                />
                <textarea
                  placeholder="Contanos tu caso o consulta..."
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  rows={5}
                  style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "8px", border: "1px solid #E8E3DA", fontSize: "0.9375rem", marginBottom: "1.25rem", outline: "none", resize: "vertical", fontFamily: "inherit" }}
                />
                <button onClick={handleSend}
                  style={{ width: "100%", backgroundColor: "#25D366", color: "white", padding: "0.85rem", borderRadius: "8px", border: "none", fontWeight: 700, fontSize: "0.9375rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  Enviar por WhatsApp
                </button>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h2 style={{ fontWeight: 700, fontSize: "1.25rem", color: "#1B2A4A", marginBottom: "1.5rem" }}>Información de Contacto</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.25rem" }}>📍</span>
                <div>
                  <p style={{ fontWeight: 600, fontSize: "0.9375rem", color: "#1B2A4A", marginBottom: "0.25rem" }}>Dirección</p>
                  <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.5 }}>{s.address}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.25rem" }}>📞</span>
                <div>
                  <p style={{ fontWeight: 600, fontSize: "0.9375rem", color: "#1B2A4A", marginBottom: "0.25rem" }}>Teléfono / WhatsApp</p>
                  <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>{s.phone}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.25rem" }}>📧</span>
                <div>
                  <p style={{ fontWeight: 600, fontSize: "0.9375rem", color: "#1B2A4A", marginBottom: "0.25rem" }}>Email</p>
                  <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>{s.email}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.25rem" }}>🕐</span>
                <div>
                  <p style={{ fontWeight: 600, fontSize: "0.9375rem", color: "#1B2A4A", marginBottom: "0.25rem" }}>Horarios</p>
                  <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>{s.hours}</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #E8E3DA" }}>
              <a href={`https://wa.me/${s.whatsapp}?text=Hola%2C%20Villamayor%20%26%20Asociados%20-%20Quiero%20agendar%20una%20consulta`} target="_blank" rel="noopener noreferrer"
                style={{ display: "block", backgroundColor: "#C9A96E", color: "#1B2A4A", padding: "0.85rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.9375rem", textAlign: "center" }}>
                Agendar Consulta Gratis
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
