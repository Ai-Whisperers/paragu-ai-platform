"use client"
import { loyalty } from "@/lib/config"
import { waLink } from "@/lib/config"
import { ScrollReveal } from "./scroll-reveal"
import { Gift, Star, Award, Crown } from "lucide-react"

const STEP_ICONS = [Gift, Star, Award, Crown]

function LoyaltyStep({ step, index, total }: { step: (typeof loyalty)["steps"][number]; index: number; total: number }) {
  const isLast = index === total - 1
  return (
    <div className="flex flex-col items-center text-center relative">
      {/* Connector line */}
      {!isLast && (
        <div className="hidden md:block absolute top-7 left-[55%] right-0 h-0.5 bg-gradient-to-r from-secondary to-primary/30 -translate-y-full mb-14" />
      )}
      <div className="w-14 h-14 rounded-full bg-secondary/10 text-secondary flex items-center justify-center border-2 border-secondary z-10 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary scale-0 rounded-full transition-all duration-700 group-hover:scale-100" />
        {(() => { const Icon = STEP_ICONS[index]; return <Icon className="w-6 h-6" /> })()}
      </div>
      <h4 className="font-semibold text-sm text-primary mb-1">{step.after}</h4>
      <p className="text-xs text-foreground-light max-w-[140px]">{step.reward}</p>
    </div>
  )
}

export function LoyaltySection() {
  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Background radial */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest mb-3">
              <Crown className="w-4 h-4" /> Rewards
            </span>
            <h2 className="font-heading text-4xl font-bold mb-3">{loyalty.title}</h2>
            <p className="text-white/70 max-w-lg mx-auto">{loyalty.subtitle}</p>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4">
          {loyalty.steps.map((step, i) => (
            <LoyaltyStep key={i} step={step} index={i} total={loyalty.steps.length} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href={waLink("Hola! Quiero enterarme más sobre el Programa Magnolia Rewards")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-secondary text-white font-bold px-10 py-4 rounded-2xl hover:bg-secondary-dark transition-all text-lg"
          >
            <Star className="w-5 h-5" /> Empezar a Acumular
          </a>
          <p className="text-white/50 text-sm mt-3">Sin tarjetas. Sin complicated paperwork. Solo vení y te mimés.</p>
        </div>
      </div>
    </section>
  )
}
