"use client"
import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import type { Content } from "@/types/content"
import raw from "@/content/es.json"

const content = raw as unknown as Content
const contact = content.contacto.info
const phone = content.whatsapp.phone

export default function ContactoPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (typeof window !== "undefined" && typeof (window as Record<string, unknown>).gtag !== "undefined") {
      ;(window as Record<string, unknown>).gtag("event", "form_submit", { event_category: "contact", event_label: "Contacto" })
    }
    const text = `Hola! Soy ${form.name} (${form.email}).%0A%0A${form.message}`
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank")
    setSent(true)
  }

  return (
    <PageLayout phone={phone}>
      <section className="flex min-h-[30vh] items-center justify-center bg-surface px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">Contacto</h1>
          <p className="mt-3 text-lg text-muted-foreground">Hablemos de tu proyecto</p>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground">Escribime</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-foreground">Nombre</label>
                  <input id="name" type="text" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Tu nombre" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">Email</label>
                  <input id="email" type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
                    className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="tu@email.com" />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-medium text-foreground">Contame de tu libro</label>
                  <textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})}
                    className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-y"
                    placeholder="Género, estilo que buscás, referencias, plataforma donde vas a publicar... todo sirve!" />
                </div>
                <button type="submit"
                  className="w-full rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90">
                  {sent ? "✓ Mensaje listo" : "Enviar Consulta"}
                </button>
                {sent && <p className="text-center text-sm text-muted-foreground">Se abrirá WhatsApp con tu mensaje. Revisalo y enviá.</p>}
              </form>
            </div>
            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground">{contact.title || "Información de Contacto"}</h2>
              <div className="space-y-5">
                <div className="rounded-lg border border-border bg-surface p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">WhatsApp</p>
                  <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium">{contact.phone}</a>
                </div>
                <div className="rounded-lg border border-border bg-surface p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</p>
                  <a href="mailto:dayahlitworks@gmail.com" className="text-primary hover:underline font-medium">dayahlitworks@gmail.com</a>
                </div>
                <div className="rounded-lg border border-border bg-surface p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Redes</p>
                  <div className="mt-1 flex flex-wrap gap-3">
                    <a href="https://instagram.com/dayah.litworks" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">Instagram</a>
                    <a href="https://www.facebook.com/bookc0verdesign/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">Facebook</a>
                    <a href="https://www.linkedin.com/in/daihana-araujo/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">LinkedIn</a>
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-surface p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ubicación</p>
                  <p className="font-medium text-foreground">Asunción, Paraguay</p>
                  <p className="text-sm text-muted-foreground">Trabajo con autoras de todo el mundo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}