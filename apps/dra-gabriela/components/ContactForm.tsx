// Contact form — client component.
// Uses a Next.js server action (defined in app/actions.ts) to submit.
// Graceful fallback: if submission fails, show a "use email" alternative
// with a mailto: link.

"use client"

import { useState } from "react"
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { submitContactForm, type ContactFormResult } from "@/app/actions"

interface ContactFormProps {
  locale: string
  /** Pre-fill the message field, e.g. from a "second opinion" CTA */
  defaultMessage?: string
  /** Default subject, e.g. "Second opinion inquiry" */
  defaultSubject?: string
}

export function ContactForm({ locale, defaultMessage = "", defaultSubject = "" }: ContactFormProps) {
  const isEs = locale === "es"
  const [pending, setPending] = useState(false)
  const [result, setResult] = useState<ContactFormResult | null>(null)

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: defaultSubject,
    message: defaultMessage,
  })

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    setResult(null)
    try {
      const res = await submitContactForm({
        ...form,
        locale: locale as "en" | "es",
      })
      setResult(res)
      if (res.ok) {
        // Reset on success
        setForm({ name: "", email: "", phone: "", subject: defaultSubject, message: "" })
      }
    } catch (err) {
      setResult({
        ok: false,
        message: isEs
          ? "Algo salió mal. Escribinos por email a hola@dra-gp.com.py."
          : "Something went wrong. Email us at hola@dra-gp.com.py.",
      })
    } finally {
      setPending(false)
    }
  }

  if (result?.ok) {
    return (
      <div className="card p-6 md:p-8 border-l-4 border-success" role="status" aria-live="polite">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-success" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1 text-left">
              {isEs ? "Mensaje enviado" : "Message sent"}
            </h3>
            <p className="text-fg-muted text-sm leading-relaxed text-left">
              {isEs
                ? "Gracias por escribirnos. Te respondemos en menos de 24 horas hábiles."
                : "Thanks for reaching out. We'll respond within 24 business hours."}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 md:p-8 space-y-4" noValidate>
      {result && !result.ok && (
        <div className="p-3 rounded-lg border border-error/30 bg-error/5 text-error text-sm flex items-start gap-2" role="alert">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span className="text-left">{result.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5 text-left">
            {isEs ? "Nombre" : "Name"} <span className="text-error">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={update("name")}
            disabled={pending}
            className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50"
            placeholder={isEs ? "Tu nombre" : "Your name"}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5 text-left">
            {isEs ? "Email" : "Email"} <span className="text-error">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={update("email")}
            disabled={pending}
            className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50"
            placeholder={isEs ? "tu@email.com" : "you@email.com"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium mb-1.5 text-left">
            {isEs ? "Teléfono (opcional)" : "Phone (optional)"}
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={update("phone")}
            disabled={pending}
            className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50"
            placeholder="+595 9XX XXXXXX"
          />
        </div>
        <div>
          <label htmlFor="contact-subject" className="block text-sm font-medium mb-1.5 text-left">
            {isEs ? "Asunto" : "Subject"}
          </label>
          <input
            id="contact-subject"
            type="text"
            value={form.subject}
            onChange={update("subject")}
            disabled={pending}
            className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50"
            placeholder={isEs ? "Sobre qué consultás" : "What is this about"}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5 text-left">
          {isEs ? "Mensaje" : "Message"} <span className="text-error">*</span>
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          disabled={pending}
          className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 resize-y min-h-[120px]"
          placeholder={isEs ? "Contanos brevemente tu caso o consulta..." : "Tell us briefly about your case or question..."}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
        <p className="text-xs text-fg-subtle text-left">
          {isEs
            ? "Al enviar, aceptás que te contactemos por email o teléfono."
            : "By submitting, you agree to be contacted by email or phone."}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="btn btn-primary px-6 py-2.5 min-w-[160px] disabled:opacity-50"
        >
          {pending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {isEs ? "Enviando..." : "Sending..."}
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {isEs ? "Enviar mensaje" : "Send message"}
            </>
          )}
        </button>
      </div>
    </form>
  )
}
