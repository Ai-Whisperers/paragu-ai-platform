import content from "@/content/es.json"
import Link from "next/link"

export default function Home() {
  const s = content.site
  const h = content.hero
  const about = content.about

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden text-white py-24 px-6 bg-cover bg-center bg-[image:linear-gradient(rgba(27,42,74,0.85),rgba(15,26,48,0.9)),url('/images/hero-main.webp')]">
        <div className="max-w-[1000px] mx-auto relative z-[1]">
          <div className="grid gap-12 items-center grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="block w-[2px] h-6 bg-secondary" />
                <span className="text-secondary text-[0.8125rem] font-semibold tracking-[0.08em] uppercase">{s.tagline}</span>
              </div>
              <h1 className="serif font-bold leading-[1.15] mb-5 text-[clamp(2rem,4vw,3rem)]">
                {h.title}
              </h1>
              <p className="text-[1.0625rem] opacity-85 leading-[1.7] mb-8">
                {h.subtitle}
              </p>
              <div className="flex gap-4 flex-wrap">
                <a href={h.ctaLink} target="_blank" rel="noopener noreferrer"
                  className="bg-secondary text-primary py-[0.85rem] px-8 rounded-lg font-bold no-underline text-[0.9375rem]">
                  {h.ctaText}
                </a>
                <Link href={h.secondaryCtaLink}
                  className="bg-transparent text-white py-[0.85rem] px-8 rounded-lg font-semibold no-underline text-[0.9375rem] border border-white/30">
                  {h.secondaryCta}
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {h.stats.map((st, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-6 text-center border border-white/[0.06]">
                  <div className="text-[1.75rem] font-bold text-secondary mb-1">{st.value}</div>
                  <div className="text-xs opacity-70">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-20 px-6 bg-surface-alt">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="serif gold-underline font-bold text-primary mb-8 text-[clamp(1.5rem,3vw,2rem)]">
            {about.title}
          </h2>
          <p className="text-[1.0625rem] leading-[1.8] text-gray-600 mb-6">
            {about.intro}
          </p>
          <div className="grid gap-6 mt-10 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
            {about.values.map((v, i) => (
              <div key={i} className="hover-lift bg-white rounded-[10px] p-6 border border-border">
                <div className="w-10 h-[3px] bg-secondary mb-4" />
                <h3 className="font-bold text-base text-primary mb-2">{v.title}</h3>
                <p className="text-[0.8125rem] text-text-muted leading-[1.6]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="serif gold-underline font-bold text-primary text-center mb-3 text-[clamp(1.5rem,3vw,2rem)]">
            {content.services.title}
          </h2>
          <p className="text-center text-text-muted text-[0.9375rem] mb-12">{content.services.subtitle}</p>

          <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {content.services.items.slice(0, 6).map((svc, i) => (
              <div key={i} className="hover-lift bg-surface-alt rounded-xl p-7 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-secondary text-xs font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-bold text-base text-primary m-0">{svc.title}</h3>
                </div>
                <p className="text-[0.8125rem] text-text-muted leading-[1.7] mb-3">{svc.description}</p>
                <div className="flex flex-wrap gap-[0.4rem]">
                  {svc.features.slice(0, 3).map((f, j) => (
                    <span key={j} className="bg-secondary/[0.12] text-muted-foreground py-[0.15rem] px-2 rounded text-[0.6875rem] font-medium">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/servicios"
              className="inline-flex items-center gap-2 text-secondary font-semibold no-underline text-[0.9375rem]">
              Ver todos los servicios →
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 px-6 bg-surface-alt">
        <div className="max-w-[900px] mx-auto">
          <h2 className="serif gold-underline font-bold text-primary text-center mb-3 text-[clamp(1.5rem,3vw,2rem)]">
            {content.process.title}
          </h2>
          <p className="text-center text-text-muted text-[0.9375rem] mb-12">{content.process.subtitle}</p>
          <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
            {content.process.steps.map((p, i) => (
              <div key={i} className="text-center">
                <div className="serif w-16 h-16 rounded-full bg-primary text-secondary flex items-center justify-center font-bold text-[1.125rem] mx-auto mb-4">
                  {p.step}
                </div>
                <h3 className="font-bold text-base text-primary mb-2">{p.title}</h3>
                <p className="text-[0.8125rem] text-text-muted leading-[1.6]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[900px] mx-auto">
          <h2 className="serif gold-underline font-bold text-primary text-center mb-12 text-[clamp(1.5rem,3vw,2rem)]">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(270px,1fr))]">
            {content.testimonials.map((t, i) => (
              <div key={i} className="gallery-card bg-surface-alt rounded-xl p-6 border border-border">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-secondary">★</span>
                  ))}
                </div>
                <p className="text-[0.9375rem] leading-[1.7] text-gray-600 mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="font-semibold text-[0.8125rem] text-primary">{t.name}</p>
                {(t as any).role && <p className="text-xs text-muted-foreground">{(t as any).role}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-surface-alt">
        <div className="max-w-[700px] mx-auto">
          <h2 className="serif gold-underline font-bold text-primary text-center mb-12 text-[clamp(1.5rem,3vw,2rem)]">
            Preguntas Frecuentes
          </h2>
          {content.faq.map((item, i) => (
            <details key={i} className="mb-3 border border-border rounded-lg overflow-hidden">
              <summary className="py-4 px-5 font-semibold text-[0.9375rem] text-primary cursor-pointer bg-white">
                {item.q}
              </summary>
              <p className="py-4 px-5 text-sm leading-[1.7] text-gray-600 border-t border-border bg-white">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-white text-center bg-[linear-gradient(135deg,#1B2A4A,#0F1A30)]">
        <div className="max-w-[600px] mx-auto">
          <h2 className="serif font-bold mb-4 text-[clamp(1.5rem,3vw,2rem)]">
            ¿Listo para una asesoría legal con resultados?
          </h2>
          <p className="text-base opacity-85 mb-8 leading-[1.7]">
            Primera consulta sin costo. Contanos tu caso y te explicamos cómo podemos ayudarte.
          </p>
          <a href={h.ctaLink} target="_blank" rel="noopener noreferrer"
            className="bg-secondary text-primary py-[0.85rem] px-10 rounded-lg font-bold no-underline text-[0.9375rem] inline-block">
            {h.ctaText}
          </a>
        </div>
      </section>
    </>
  )
}
