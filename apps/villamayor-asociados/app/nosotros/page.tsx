import content from "@/content/es.json"

export default function Nosotros() {
  return (
    <>
      <section className="text-white py-20 px-6 text-center bg-[linear-gradient(135deg,#1B2A4A,#0F1A30)]">
        <div className="max-w-[700px] mx-auto">
          <span className="text-secondary text-[0.8125rem] font-semibold tracking-[0.08em] uppercase">Nuestro Estudio</span>
          <h1 className="serif font-bold mt-3 mb-4 text-[clamp(1.75rem,4vw,2.5rem)]">
            {content.about.title}
          </h1>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">
          <div className="mb-12">
            <h2 className="serif text-xl font-bold text-primary mb-4">Nuestra Historia</h2>
            <p className="text-base leading-[1.8] text-gray-600">
              {content.about.intro}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="bg-surface-alt rounded-xl p-8 border border-border">
              <h3 className="text-primary font-bold text-[0.9375rem] mb-3">Misión</h3>
              <p className="text-sm text-text-muted leading-[1.7]">{content.about.mission}</p>
            </div>
            <div className="bg-surface-alt rounded-xl p-8 border border-border">
              <h3 className="text-primary font-bold text-[0.9375rem] mb-3">Visión</h3>
              <p className="text-sm text-text-muted leading-[1.7]">{content.about.vision}</p>
            </div>
          </div>

          <div>
            <h2 className="serif text-xl font-bold text-primary mb-6">Nuestros Valores</h2>
            <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
              {content.about.values.map((v, i) => (
                <div key={i} className="hover-lift bg-surface-alt rounded-[10px] p-6 border border-border">
                  <div className="w-10 h-[3px] bg-secondary mb-4" />
                  <h3 className="font-bold text-base text-primary mb-2">{v.title}</h3>
                  <p className="text-[0.8125rem] text-text-muted leading-[1.6]">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 text-white text-center bg-[linear-gradient(135deg,#1B2A4A,#0F1A30)]">
        <div className="max-w-[500px] mx-auto">
          <h2 className="serif text-2xl font-bold mb-4">Agendá tu consulta</h2>
          <a href={content.hero.ctaLink} target="_blank" rel="noopener noreferrer"
            className="bg-secondary text-primary py-[0.85rem] px-8 rounded-lg font-bold no-underline text-[0.9375rem] inline-block">
            {content.hero.ctaText}
          </a>
        </div>
      </section>
    </>
  )
}
