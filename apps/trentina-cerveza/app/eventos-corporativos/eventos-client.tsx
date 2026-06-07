'use client';

import content from "@/content/es.json";

const c = content as any;

export default function EventosClient() {
  const ev = c.eventos;
  const site = c.site;

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const msg = `Hola! Quiero cotizar servicio de chopp para un evento.

Empresa/Organizador: ${fd.get("company") || ""}
Fecha estimada: ${fd.get("date") || ""}
Ciudad/Lugar: ${fd.get("location") || ""}
Cantidad de personas: ${fd.get("people") || ""}
Estilos preferidos: ${fd.get("styles") || ""}
Teléfono: ${fd.get("phone") || ""}
Notas: ${fd.get("notes") || ""}`;
    window.open(`https://wa.me/595983224473?text=${encodeURIComponent(msg)}`, "_blank");
    form.reset();
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-[var(--color-background)] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-background)] via-[#1a0a0a] to-[#2a0a0a]" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container-page text-center relative z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-gold text-sm font-medium uppercase tracking-wider mb-6">
            {ev.hero.eyebrow}
          </span>
          <h1 className="text-4xl md:text-6xl font-[var(--font-heading)] font-bold text-white mb-4">
            {ev.hero.title}
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-lg">
            {ev.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-[var(--color-surface)]">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white mb-4">
              {ev.services.title}
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
              {ev.services.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ev.services.items.map((item: any, idx: number) => (
              <div key={idx} className="bg-[var(--color-background)] p-8 rounded-2xl border border-[var(--color-border)] hover:border-gold/50 transition-all">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-[var(--color-text-muted)] mb-4">{item.description}</p>
                <ul className="space-y-2 text-[var(--color-text)] text-sm">
                  {item.features.map((f: string, fidx: number) => (
                    <li key={fidx} className="flex items-start gap-2">
                      <span className="text-gold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beer Styles */}
      <section className="py-20 bg-[var(--color-background)]">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white mb-4">
              {ev.styles.title}
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
              {ev.styles.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ev.styles.beers.map((beer: any, idx: number) => (
              <div key={idx} className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] hover:border-gold/50 transition-all text-center">
                <div className="text-4xl mb-3">{beer.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{beer.name}</h3>
                <p className="text-[var(--color-text-muted)] text-sm mb-3">{beer.style}</p>
                <div className="flex justify-center gap-4 text-xs text-gold">
                  <span>ABV {beer.abv}</span>
                  <span>IBU {beer.ibu}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-[var(--color-surface)]">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white mb-4">
              {ev.pricing.title}
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
              {ev.pricing.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {ev.pricing.packages.map((pkg: any, idx: number) => (
              <div key={idx} className={`relative bg-[var(--color-background)] rounded-2xl border-2 p-8 ${pkg.popular ? 'border-gold' : 'border-[var(--color-border)]'}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-[var(--color-background)] font-semibold rounded-full text-sm">
                    {pkg.badge}
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold text-gold mb-1">{pkg.price}</div>
                <div className="text-[var(--color-text-muted)] text-sm mb-6">{pkg.includes}</div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f: string, fidx: number) => (
                    <li key={fidx} className="flex items-start gap-2 text-[var(--color-text)] text-sm">
                      <span className="text-gold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-sm text-[var(--color-text-muted)]">{pkg.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-[var(--color-background)]">
        <div className="container-page">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white mb-4">
                {ev.form.title}
              </h2>
              <p className="text-[var(--color-text-muted)]">
                {ev.form.subtitle}
              </p>
            </div>
            <form onSubmit={handleFormSubmit} className="bg-[var(--color-surface)] p-8 rounded-2xl border border-[var(--color-border)] space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Empresa/Organizador</label>
                <input type="text" name="company" required
                  className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white placeholder:text-[var(--color-text-muted)] focus:border-gold focus:outline-none" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Fecha estimada</label>
                  <input type="date" name="date" required
                    className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:border-gold focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Ciudad/Lugar</label>
                  <input type="text" name="location" required
                    className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white placeholder:text-[var(--color-text-muted)] focus:border-gold focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Cantidad de personas</label>
                <input type="number" name="people" min="10" required
                  className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white placeholder:text-[var(--color-text-muted)] focus:border-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Estilos preferidos</label>
                <textarea name="styles" rows={3}
                  className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white placeholder:text-[var(--color-text-muted)] focus:border-gold focus:outline-none"
                  placeholder="Ej: Metatron Hemp, IPA, Blonde..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Teléfono de contacto</label>
                <input type="tel" name="phone" required
                  className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white placeholder:text-[var(--color-text-muted)] focus:border-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Notas adicionales</label>
                <textarea name="notes" rows={3}
                  className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white placeholder:text-[var(--color-text-muted)] focus:border-gold focus:outline-none" />
              </div>
              <button type="submit"
                className="w-full py-4 bg-gold hover:bg-gold/90 text-[var(--color-background)] font-semibold rounded-xl transition-all">
                {ev.form.cta}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-background)]">
        <div className="container-page text-center">
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white mb-4">
            {ev.cta.title}
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto mb-8">
            {ev.cta.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold hover:bg-gold/90 text-[var(--color-background)] font-semibold text-lg transition-all">
              <span>💬</span> {ev.cta.whatsapp}
            </a>
            <a href={`tel:${site.phone}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[var(--color-border)] text-[var(--color-text)] hover:border-gold/50 transition-all">
              <span>📞</span> {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}