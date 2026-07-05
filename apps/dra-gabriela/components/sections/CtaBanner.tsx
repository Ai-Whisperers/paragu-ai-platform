// Section: CTA Banner — premium conversion band with corner ribbon,
// gold halos, gradient text title, and shimmer overlay.

import { MessageCircle, Clock, ArrowRight, Sparkles, Shield, Award } from "lucide-react"
import { ContactButtons } from "@/components/ContactButton"
import { whatsappLink, phoneDisplay } from "@/lib/content"

export function CtaBanner({ c, locale }: { c: any; locale: string }) {
  const wa = whatsappLink(c.business?.whatsapp, c.business?.whatsappMessage)
  const phone = phoneDisplay(c.business?.phone)
  const isEs = locale === "es"
  const hasRealContact = !!(wa || phone)

  return (
    <section className="section-sm tone-ocean-3 relative">
      {/* Decorative halo before card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[20rem] max-w-[100vw] opacity-30 pointer-events-none" style={{ background: "radial-gradient(ellipse, var(--gold) 0%, transparent 70%)" }} aria-hidden="true" />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent via-accent-2 to-accent text-white p-10 md:p-14 lg:p-20 shadow-2xl border-2 border-gold/30">
          {/* CORNER RIBBON (top-right) */}
          <div className="corner-ribbon corner-ribbon-lime" aria-hidden="true">
            <span>{isEs ? "Escribime" : "Reach out"}</span>
          </div>

          {/* Decorative glow */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-30 pointer-events-none" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)" }} />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, white 0%, transparent 60%)" }} />

          {/* Dot pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

          {/* Animated shimmer stripe */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 -left-1/3 w-1/3 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-center">
            {/* Left: copy */}
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gold-soft mb-5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-gold/30">
                <Sparkles className="w-3 h-3" />
                {isEs ? "Coordiná tu consulta" : "Book your consultation"}
              </span>

              <h2
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading mb-5 leading-[1.05] text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {isEs ? (
                  <>
                    <span className="block">Plan de tratamiento</span>
                    <span className="block text-gold-soft">escrito antes de</span>
                    <span className="block">cualquier paso</span>
                  </>
                ) : (
                  <>
                    <span className="block">Written treatment plan</span>
                    <span className="block text-gold-soft">before any step</span>
                    <span className="block">is taken</span>
                  </>
                )}
              </h2>

              <p className="text-white/85 text-lg max-w-xl mb-8 leading-relaxed">
                {c.cta?.subtitle || (isEs
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
                <div className="mt-5 text-sm text-white/85 flex items-center gap-2 flex-wrap">
                  <Clock className="w-4 h-4" />
                  {isEs ? (
                    <>
                      <span>WhatsApp disponible al abrir el consultorio. Mientras tanto, escribime a</span>
                      <a
                        href="mailto:doctora.gabi@ometsdental.com.py"
                        className="text-gold-soft font-medium hover:underline"
                      >
                        doctora.gabi@ometsdental.com.py
                      </a>
                    </>
                  ) : (
                    <>
                      <span>WhatsApp goes live when the practice opens. In the meantime, email me at</span>
                      <a
                        href="mailto:doctora.gabi@ometsdental.com.py"
                        className="text-gold-soft font-medium hover:underline"
                      >
                        doctora.gabi@ometsdental.com.py
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Right: trust pillar stack */}
            <div className="hidden lg:flex flex-col gap-3">
              {[
                {
                  icon: Shield,
                  title: isEs ? "Plan escrito" : "Written plan",
                  sub: isEs ? "Antes de tocar" : "Before any step",
                },
                {
                  icon: Award,
                  title: isEs ? "20+ años" : "20+ years",
                  sub: isEs ? "Experiencia clínica" : "Clinical experience",
                },
                {
                  icon: Clock,
                  title: isEs ? "< 24h respuesta" : "< 24h reply",
                  sub: isEs ? "WhatsApp verificado" : "WhatsApp verified",
                },
              ].map((p, i) => {
                const Icon = p.icon
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 transition-transform duration-300 hover:translate-x-1 hover:bg-white/15"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-white leading-tight">{p.title}</div>
                      <div className="text-sm text-white/70 mt-0.5">{p.sub}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gold ml-auto flex-shrink-0" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
