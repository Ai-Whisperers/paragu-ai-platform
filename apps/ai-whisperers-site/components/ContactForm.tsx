"use client"

import { useState } from "react"

export function ContactForm({ content }: { content: any }) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    // For now: open WhatsApp with the message
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get("name") || ""
    const email = data.get("email") || ""
    const company = data.get("company") || ""
    const message = data.get("message") || ""
    const text = `Hi, I'm ${name}${company ? ` from ${company}` : ""} (${email}). ${message}`
    const wa = `https://wa.me/${content.site.whatsapp}?text=${encodeURIComponent(text)}`
    window.open(wa, "_blank")
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input name="name" required className="w-full px-3 py-2 bg-bg-elev border border-border rounded-md focus:outline-none focus:border-accent" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input name="email" type="email" required className="w-full px-3 py-2 bg-bg-elev border border-border rounded-md focus:outline-none focus:border-accent" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Company</label>
        <input name="company" className="w-full px-3 py-2 bg-bg-elev border border-border rounded-md focus:outline-none focus:border-accent" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">What can we help with? *</label>
        <textarea name="message" required rows={5} placeholder="Tell us about your project, the problem you're trying to solve, or the AI capability you need." className="w-full px-3 py-2 bg-bg-elev border border-border rounded-md focus:outline-none focus:border-accent" />
      </div>
      <button type="submit" disabled={submitting} className="w-full sm:w-auto px-6 py-3 bg-accent text-white font-medium rounded-md hover:bg-accent/80 transition-colors disabled:opacity-50">
        {submitting ? "Sending..." : submitted ? "Sent — open WhatsApp" : "Send → WhatsApp"}
      </button>
      <p className="text-xs text-fg-muted">
        Submits as a WhatsApp message. We respond within 24 hours. No credit card, no sales pitch.
      </p>
    </form>
  )
}
