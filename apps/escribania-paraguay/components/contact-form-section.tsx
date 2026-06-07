'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import ScrollReveal from '@/components/animations/scroll-reveal'

interface FormField {
  name: string
  label: string
  type: string
  required: boolean
  options?: string[]
}

interface ContactFormSectionProps {
  title: string
  subtitle: string
  fields: FormField[]
  submitText: string
}

export default function ContactFormSection({
  title,
  subtitle,
  fields,
  submitText,
}: ContactFormSectionProps) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    // Simulate form submission — in production this would go to a backend
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <section className="bg-surface-alt section-padding">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <ScrollReveal>
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                {title}
              </h2>
              <p className="text-muted text-lg leading-relaxed">{subtitle}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            {submitted ? (
              <div className="bg-surface border border-accent/30 rounded-xl p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-5">
                  <Send size={28} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  Consulta enviada
                </h3>
                <p className="text-muted text-sm">
                  Gracias por tu consulta. Te responderemos a la brevedad.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-surface border border-border rounded-xl p-6 md:p-8 space-y-5"
              >
                {fields.map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-accent font-medium text-foreground mb-2"
                    >
                      {field.label}
                      {field.required && (
                        <span className="text-accent ml-1">*</span>
                      )}
                    </label>
                    {field.type === 'select' && field.options ? (
                      <select
                        id={field.name}
                        name={field.name}
                        className="w-full px-4 py-3 bg-surface-alt border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                      >
                        <option value="">Seleccionar...</option>
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        rows={4}
                        required={field.required}
                        className="w-full px-4 py-3 bg-surface-alt border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all resize-vertical"
                      />
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        required={field.required}
                        className="w-full px-4 py-3 bg-surface-alt border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-primary font-accent font-semibold px-8 py-3.5 rounded-lg transition-all text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send size={18} />
                      {submitText}
                    </>
                  )}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
