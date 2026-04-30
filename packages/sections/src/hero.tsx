import React from "react"
export function Hero({ title, subtitle, ctaPrimary, ctaSecondary, bgImage }: { title: string; subtitle?: string; ctaPrimary?: {label:string;href:string}; ctaSecondary?: {label:string;href:string}; bgImage?: string }) {
  return <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-[#0a0a1a]">
    {bgImage && <div className="absolute inset-0 opacity-30" style={{backgroundImage:`url(${bgImage})`,backgroundSize:"cover",backgroundPosition:"center"}} />}
    <div className="relative z-10 mx-auto max-w-4xl px-4 text-center"><h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">{title}</h1>{subtitle && <p className="mt-4 text-lg text-white/80">{subtitle}</p>}
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {ctaPrimary && <a href={ctaPrimary.href} className="inline-flex h-12 items-center justify-center rounded-lg bg-secondary px-8 text-base font-semibold text-secondary-foreground shadow-lg transition-all hover:scale-105">{ctaPrimary.label}</a>}
        {ctaSecondary && <a href={ctaSecondary.href} className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-white/40 px-8 text-base font-semibold text-white transition-all hover:bg-white/10">{ctaSecondary.label}</a>}
      </div>
    </div>
  </section>
}
