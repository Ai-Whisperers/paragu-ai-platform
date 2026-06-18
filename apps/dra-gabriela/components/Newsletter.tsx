// Newsletter signup — server action that subscribes an email to a list.
// Backed by Resend or Supabase if configured, otherwise logs to stdout.

"use client"

import { useState } from "react"
import { Mail, Loader2, CheckCircle2, Send } from "lucide-react"
import { subscribeToNewsletter, type NewsletterResult } from "@/app/newsletter-action"

interface NewsletterProps {
  locale: string
  variant?: "card" | "inline" | "compact"
}

export function Newsletter({ locale, variant = "card" }: NewsletterProps) {
  const isEs = locale === "es"
  const [email, setEmail] = useState("")
  const [pending, setPending] = useState(false)
  const [result, setResult] = useState<NewsletterResult | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setPending(true)
    setResult(null)
    try {
      const r = await subscribeToNewsletter(email, locale)
      setResult(r)
      if (r.ok) setEmail("")
    } catch (err) {
      setResult({
        ok: false,
        message: isEs ? "Algo salió mal. Intentá de nuevo." : "Something went wrong. Please try again.",
      })
    } finally {
      setPending(false)
    }
  }

  if (result?.ok) {
    return (
      <div
        className={variant === "card" ? "card p-5 border-l-4 border-success" : "p-3 rounded-lg border border-success/30 bg-success/5"}
        role="status" aria-live="polite"
      >
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-sm">
            <div className="font-medium mb-0.5 text-left">
              {isEs ? "Listo" : "Done"}
            </div>
            <div className="text-fg-muted text-left">
              {isEs ? "Te avisamos cuando publiquemos algo nuevo." : "We'll let you know when we publish something new."}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === "card") {
    return (
      <form onSubmit={onSubmit} className="card p-6 md:p-7" noValidate>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-accent" aria-hidden="true" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-lg md:text-xl mb-1">
              {isEs ? "Avisame sobre nuevos artículos" : "Get notified about new articles"}
            </h3>
            <p className="text-fg-muted text-sm">
              {isEs
                ? "Un email cada 2 semanas con contenido nuevo. Sin spam, podés desuscribirte cuando quieras."
                : "One email every 2 weeks with new content. No spam, unsubscribe whenever."}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <label htmlFor="newsletter-email" className="sr-only">Email</label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={pending}
            placeholder={isEs ? "tu@email.com" : "you@email.com"}
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-border bg-bg text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50"
            aria-label={isEs ? "Email para suscribirse" : "Email for subscription"}
          />
          <button
            type="submit"
            disabled={pending}
            className="btn btn-primary !py-2.5 !px-5 disabled:opacity-50"
          >
            {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {isEs ? "Suscribirme" : "Subscribe"}
          </button>
        </div>
        {result && !result.ok && (
          <p className="text-xs text-error mt-2 text-left" role="alert">{result.message}</p>
        )}
      </form>
    )
  }

  // compact / inline variant
  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2" noValidate>
      <label htmlFor="newsletter-email-2" className="sr-only">Email</label>
      <input
        id="newsletter-email-2"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={pending}
        placeholder={isEs ? "tu@email.com" : "you@email.com"}
        className="flex-1 px-3.5 py-2.5 rounded-lg border border-border bg-bg text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary !py-2.5 !px-5"
      >
        {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {isEs ? "Suscribirme" : "Subscribe"}
      </button>
    </form>
  )
}
