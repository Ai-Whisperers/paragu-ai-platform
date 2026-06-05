"use client"
import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import { isFeatureEnabled } from "@/lib/features"

export default function SoportePage({ params }: { params: Promise<{ lang: string }> }) {
  const [submitted, setSubmitted] = useState(false)
  if (!isFeatureEnabled("support", "es")) return null
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }
  return (
    <>
      <Header lang="es" />
      <section className="bg-primary py-12 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="font-heading text-4xl font-bold text-white">Soporte técnico</h1>
          <p className="text-white/70 mt-2">Completá el formulario y te responderemos en 24h</p>
        </div>
      </section>
      <section className="py-12 px-4 max-w-xl mx-auto">
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <p className="text-green-700 font-semibold text-lg">Mensaje enviado!</p>
            <p className="text-green-600 mt-2">Te contactaremos pronto por WhatsApp.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Nombre *</label>
              <input type="text" name="nombre" required className="w-full border border-gray-300 rounded-xl px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
              <input type="email" name="email" required className="w-full border border-gray-300 rounded-xl px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">ID de cuenta</label>
              <input type="text" name="accountId" className="w-full border border-gray-300 rounded-xl px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Prioridad</label>
              <select name="prioridad" className="w-full border border-gray-300 rounded-xl px-4 py-3">
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Descripción *</label>
              <textarea name="descripcion" required rows={4} className="w-full border border-gray-300 rounded-xl px-4 py-3" />
            </div>
            <button type="submit" className="w-full bg-secondary text-white font-semibold py-3 rounded-xl hover:bg-secondary/90">Enviar mensaje</button>
          </form>
        )}
      </section>
      <Footer lang="es" />
      <WhatsAppFloat lang="es" />
    </>
  )
}
