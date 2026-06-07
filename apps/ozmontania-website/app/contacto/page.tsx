'use client'

import es from '@/content/es.json'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { useState } from 'react'

export default function ContactoPage() {
  const form = es.contacto.form as any
  const [submitted, setSubmitted] = useState(false)
  const waUrl = getWhatsAppUrl(es.contacto.whatsapp_message)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const data = new FormData(form)
    const name = data.get('name') as string
    const email = data.get('email') as string
    const phone = data.get('phone') as string
    const projectType = data.get('project_type') as string
    const budget = data.get('budget') as string
    const message = data.get('message') as string
    const waMsg = `Hola Oz! Soy ${name} (${email}, ${phone}). \nTipo: ${projectType}\nPresupuesto: ${budget}\nMensaje: ${message}`
    window.open(getWhatsAppUrl(waMsg), '_blank')
    setSubmitted(true)
  }

  return (
    <>
      <section className="pt-24 sm:pt-32 pb-10 sm:pb-16">
        <div className="container-art text-center">
          <h1 className="section-title mb-4">{es.contacto.title}</h1>
          <p className="section-subtitle mx-auto text-sm sm:text-base">{es.contacto.subtitle}</p>
          <p className="text-zinc-500 mt-3 sm:mt-4 max-w-xl mx-auto text-xs sm:text-sm px-4 sm:px-0">{es.contacto.description}</p>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="container-art">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <div className="lg:col-span-3 px-4 sm:px-0">
              {submitted ? (
                <div className="glass-panel p-6 sm:p-10 text-center">
                  <div className="text-3xl sm:text-4xl mb-4">✅</div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold mb-2">¡Mensaje listo!</h3>
                  <p className="text-zinc-400 text-sm mb-6">Se abrió WhatsApp para que envíes el mensaje. Te respondemos a la brevedad.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline text-sm">
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm text-zinc-400 mb-1.5">{form.name_label}</label>
                      <input name="name" required className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-zinc-400 mb-1.5">{form.email_label}</label>
                      <input name="email" type="email" required className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-zinc-400 mb-1.5">{form.phone_label}</label>
                    <input name="phone" type="tel" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-zinc-400 mb-1.5">{form.project_type_label}</label>
                    <select name="project_type" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors">
                      {form.project_types.map((t: string) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-zinc-400 mb-1.5">{form.budget_label}</label>
                    <select name="budget" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors">
                      {form.budget_options.map((b: string) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-zinc-400 mb-1.5">{form.message_label}</label>
                    <textarea name="message" rows={4} required className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors resize-none" />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center text-sm sm:text-base py-3">
                    {form.submit_label}
                  </button>
                  <p className="text-center text-zinc-600 text-[10px] sm:text-xs">
                    Al enviar, se abrirá WhatsApp con tu mensaje pre-llenado. No almacenamos tus datos.
                  </p>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 px-4 sm:px-0">
              <div className="glass-panel p-5 sm:p-6">
                <h3 className="font-serif font-bold text-base sm:text-lg mb-4">Contacto directo</h3>
                <div className="space-y-3 sm:space-y-4">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-zinc-300 hover:text-amber-400 transition-colors text-sm">
                    <span className="text-green-500 text-base">💬</span>
                    WhatsApp
                  </a>
                  <a href={`mailto:${es.site.email}`}
                    className="flex items-center gap-3 text-zinc-300 hover:text-amber-400 transition-colors text-sm">
                    <span className="text-amber-500 text-base">✉️</span>
                    {es.site.email}
                  </a>
                  <a href={es.site.instagram_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-zinc-300 hover:text-amber-400 transition-colors text-sm">
                    <span className="text-pink-500 text-base">📷</span>
                    @{es.site.instagram}
                  </a>
                </div>
              </div>
              <div className="glass-panel p-5 sm:p-6">
                <h3 className="font-serif font-bold text-base sm:text-lg mb-2">Tipos de proyecto</h3>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-zinc-400">
                  <li>• Murales comerciales (locales, oficinas, fachadas)</li>
                  <li>• Murales institucionales (escuelas, hospitales, espacios públicos)</li>
                  <li>• Ilustraciones editoriales y digitales</li>
                  <li>• Colaboraciones artísticas</li>
                  <li>• Talleres y workshops</li>
                  <li>• Obras de galería / prints</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
