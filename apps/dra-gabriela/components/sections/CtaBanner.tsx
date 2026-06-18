// Section: CTA Banner — bottom-of-page conversion
// Gradient band with gold accent CTA. Uses ContactButtons for graceful fallback.

import { MessageCircle, Clock } from "lucide-react"
import { ContactButtons } from "@/components/ContactButton"
import { whatsappLink, phoneDisplay } from "@/lib/content"

export function CtaBanner({ c, locale }: { c: any; locale: string }) {
  const wa = whatsappLink(c.business?.whatsapp, c.business?.whatsappMessage)
  const phone = phoneDisplay(c.business?.phone)
  const isEs = locale === "es"

  // If neither WA nor phone is configured, show a "coming soon" notice
  // alongside the fallback contact buttons.
  const hasRealContact = !!(wa || phone)

  return (
    <section className="section-sm bg-surface">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent via-accent-2 to-accent text-white p-10 md:p-16 shadow-xl">
          {/* Decorative glow */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-20" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)" }} />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 60%)" }} />

          <div className="relative">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gold mb-4">
              {isEs ? "Coordiná tu consulta" : "Book your consultation"}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading mb-3 max-w-2xl leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              {(Array.isArray(c.cta) ? c.cta[0]?.title : c.cta?.title) || (isEs
                ? "Plan de tratamiento escrito antes de cualquier paso"
                : "Written treatment plan before any step")}
            </h2>
            <p className="text-white/85 text-lg max-w-xl mb-8 leading-relaxed">
              {(Array.isArray(c.cta) ? c.cta[0]?.subtitle : c.cta?.subtitle) || (isEs
                ? "Evaluación honesta, opciones claras, sin presión."
                : "Honest assessment, clear options, no pressure.")}
            </p>

            <div className="[&_a]:!bg-gold [&_a]:!text-accent [&_a]:hover:!bg-gold/90 [&_a:first-child]:!shadow-lg">
              <ContactButtons
                business={c.business}
                locale={locale}
                variant="primary"
                primaryLabel={isEs ? "Escribime por WhatsApp" : "Message on WhatsApp"}
                secondaryLabel={isEs ? "Datos de contacto" : "Contact details"}
              />
            </div>

            {!hasRealContact && (
              <div className="mt-5 text-sm text-white/85 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {isEs
                  ? "Datos de contacto disponibles próximamente. Usá el formulario de la página de contacto."
                  : "Contact details coming soon. Use the form on the contact page."}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
