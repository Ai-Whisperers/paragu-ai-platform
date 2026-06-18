// Section: MeetDoctor — large photo + bio block for the home page.
// Provides the human anchor the home is missing.

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, GraduationCap, Globe, Clock, Languages, Award } from "lucide-react"

interface MeetDoctorProps {
  locale: string
}

const BADGES = [
  { icon: GraduationCap, label: "UAP 2005" },
  { icon: Globe, label: "ES · EN" },
  { icon: Languages, label: "Bilingüe" },
  { icon: Award, label: "20+ años" },
]

export function MeetDoctor({ locale }: MeetDoctorProps) {
  const isEs = locale === "es"
  const base = `/${locale}`

  return (
    <section className="section">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Portrait */}
          <div className="relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border">
              <Image
                src="/images/team/dra-gp-portrait-v2.svg"
                alt={isEs ? "Dra. Gabriella González Pane" : "Dra. Gabriella González Pane"}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent" />
            </div>
            {/* Decorative gold ring */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-gold opacity-30 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border-2 border-accent opacity-20 -z-10" />
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 md:right-6 card p-3 hidden md:flex items-center gap-2.5 max-w-[180px]">
              <div className="w-10 h-10 rounded-full bg-gold-soft flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-gold-2" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">{isEs ? "Inscripta" : "Registered"}</div>
                <div className="text-xs font-medium text-fg">MSPBS · {isEs ? "Paraguay" : "Paraguay"}</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-left">
            <span className="eyebrow inline-flex">
              {isEs ? "Conocé a la doctora" : "Meet the doctor"}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-5 leading-[1.05]">
              {isEs ? (
                <>
                  <span className="gradient-text">Dra. Gabriella González Pane</span>
                </>
              ) : (
                <>
                  <span className="gradient-text">Dra. Gabriella González Pane</span>
                </>
              )}
            </h2>
            <p className="text-lg text-fg-muted leading-relaxed mb-6">
              {isEs
                ? "Veinte años de práctica conservadora en Asunción. Antes de cualquier procedimiento, reviso tu caso completo, te explico todas las opciones disponibles y te entrego un plan escrito con precios. Si no necesitás tratamiento, te lo digo."
                : "Twenty years of conservative practice in Asunción. Before any procedure, I review your complete case, explain every option available, and deliver a written plan with pricing. If you don't need treatment, I'll say so."}
            </p>

            {/* Quick facts grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {BADGES.map((b, i) => {
                const Icon = b.icon
                return (
                  <div key={i} className="card p-3 flex flex-col items-center text-center">
                    <Icon className="w-4 h-4 text-gold mb-1.5" />
                    <div className="text-xs font-semibold">{b.label}</div>
                  </div>
                )
              })}
            </div>

            {/* Quote highlight */}
            <blockquote className="border-l-4 border-gold pl-5 py-2 mb-8">
              <p className="text-base italic text-fg leading-relaxed">
                {isEs
                  ? "\"El mejor cuidado dental empieza con el diagnóstico correcto, no con el procedimiento más caro.\""
                  : "\"The best dental care starts with the right diagnosis, not the most expensive procedure.\""}
              </p>
              <footer className="text-xs text-fg-muted mt-2">— {isEs ? "Dra. Gabriella" : "Dra. Gabriella"}</footer>
            </blockquote>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`${base}/about`} className="btn btn-primary">
                {isEs ? "Conocé más" : "Learn more"} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`${base}/second-opinion`} className="btn btn-outline">
                {isEs ? "Pedir segunda opinión" : "Request second opinion"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
