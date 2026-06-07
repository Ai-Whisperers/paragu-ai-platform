'use client';

import content from "@/content/es.json";

const c = content as any;

export default function MayoristasClient() {
  const m = c.mayoristas;

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = fd.get("name") || "";
    const city = fd.get("city") || "";
    const phone = fd.get("phone") || "";
    const products = (fd.get("products") as string) || "";
    const volume = (fd.get("volume") as string) || "";
    const notes = fd.get("notes") || "";

    const msg = `Hola! Quiero abrir cuenta mayorista de Trentina.
    
Local: ${name}
Ciudad: ${city}
WhatsApp: ${phone}
Productos: ${products}
Volumen estimado: ${volume}
Notas: ${notes}`;

    window.open(`https://wa.me/595983224473?text=${encodeURIComponent(msg)}`, "_blank");
    form.reset();
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-[var(--color-background)] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-background)] via-[#1a1208] to-[#2a1a0a]" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container-page text-center relative z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-gold text-sm font-medium uppercase tracking-wider mb-6">
            Canal Mayorista
          </span>
          <h1 className="text-4xl md:text-6xl font-[var(--font-heading)] font-bold text-white mb-4">
            {m.hero.title}
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-lg">
            {m.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page">
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-[var(--color-text)] text-center mb-12">
            {m.benefitsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {m.benefits.map((b: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] hover:border-gold/40 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/30 transition-all">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">{b.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — Barriles */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-page max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-3">
              {m.pricingBarrelsTitle}
            </h2>
            <p className="text-[var(--color-text-muted)]">{m.pricingBarrelsSubtitle}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gold/20">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text)]">Cantidad / mes</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text)]">Precio / barril 30L</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text)]">Descuento</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text)]">Tipo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {m.pricingBarrels.map((row: any, i: number) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-[var(--color-surface)]" : "bg-[var(--color-background)]"}>
                    <td className="px-6 py-4 text-[var(--color-text)] font-medium">
                      {row.max ? `${row.min}–${row.max}` : `${row.min}+`} barril{row.min > 1 ? "es" : ""}
                    </td>
                    <td className="px-6 py-4 text-gold font-bold text-lg">{row.price}</td>
                    <td className="px-6 py-4 text-[var(--color-text-muted)]">
                      {row.discount !== "0%" ? (
                        <span className="text-green-400 font-medium">{row.discount}</span>
                      ) : (
                        <span className="text-[var(--color-text-muted)]">{row.note}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--color-text-muted)]">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[var(--color-text-muted)] mt-4">Consultá precios para volúmenes mayores al indicado.</p>
        </div>
      </section>

      {/* Pricing — Packs */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-3">
              {m.pricingPacksTitle}
            </h2>
            <p className="text-[var(--color-text-muted)]">{m.pricingPacksSubtitle}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gold/20">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text)]">Packs / mes</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text)]">Precio / pack (24×500ml)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text)]">Por unidad (Gs)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text)]">Descuento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {m.pricingPacks.map((row: any, i: number) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-[var(--color-background)]" : "bg-[var(--color-surface)]"}>
                    <td className="px-6 py-4 text-[var(--color-text)] font-medium">
                      {row.max ? `${row.min}–${row.max}` : `${row.min}+`}
                    </td>
                    <td className="px-6 py-4 text-gold font-bold text-lg">{row.price}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-text-muted)]">{row.note}</td>
                    <td className="px-6 py-4 text-sm text-green-400 font-medium">{row.discount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Untappd Badge */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-page max-w-2xl">
          <div className="rounded-xl p-8 bg-[var(--color-surface)] border border-[var(--color-border)] text-center">
            <div className="text-4xl mb-2">🍺</div>
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-1">{m.untappdSection.badge}</h3>
            <p className="text-[var(--color-text-muted)] mb-4">{m.untappdSection.note}</p>
            <a href={m.untappdSection.ctaHref} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-all text-sm font-medium">
              <span>⭐</span> {m.untappdSection.ctaText}
            </a>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page">
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-[var(--color-text)] text-center mb-12">
            {m.processTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {m.process.map((step: any, i: number) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gold">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {m.testimonials && m.testimonials.length > 0 && (
        <section className="section-padding bg-[var(--color-background)]">
          <div className="container-page">
            <h2 className="text-2xl font-bold text-[var(--color-text)] text-center mb-8">{m.testimonialsTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {m.testimonials.map((t: any, i: number) => (
                <div key={i} className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                  <p className="text-[var(--color-text-light)] italic mb-4 leading-relaxed">"{t.quote}"</p>
                  <div>
                    <p className="font-semibold text-[var(--color-text)]">{t.name}</p>
                    <p className="text-sm text-gold">{t.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA + Form */}
      <section className="section-padding bg-gradient-to-b from-[#1a1208] to-[var(--color-background)]">
        <div className="container-page max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">{m.ctaBottom.title}</h2>
            <p className="text-[var(--color-text-muted)]">{m.ctaBottom.subtitle}</p>
          </div>

          <div className="text-center mb-10">
            <a href={m.ctaBottom.buttonHref} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold text-lg transition-all shadow-lg shadow-green-600/30">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.06 6.988 2.946a9.92 9.92 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {m.ctaBottom.buttonText}
            </a>
          </div>

          {/* Form */}
          <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-8">
            <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2 text-center">{m.formTitle}</h3>
            <p className="text-sm text-[var(--color-text-muted)] text-center mb-6">{m.formSubtitle}</p>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder={m.formFields.name} required
                  className="w-full px-4 py-3 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-gold focus:outline-none" />
                <input type="text" name="city" placeholder={m.formFields.city} required
                  className="w-full px-4 py-3 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-gold focus:outline-none" />
              </div>
              <input type="tel" name="phone" placeholder={m.formFields.phone} required
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-gold focus:outline-none" />
              <select name="products" required
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-gold focus:outline-none">
                <option value="">{m.formFields.products}</option>
                <option value="barriles">Barriles (30L)</option>
                <option value="packs">Packs (24×500ml)</option>
                <option value="chopp">Chopp / equipos</option>
                <option value="todo">Todo</option>
              </select>
              <select name="volume" required
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-gold focus:outline-none">
                <option value="">{m.formFields.volume}</option>
                <option value="1-5 barril">1-5 barril/mes</option>
                <option value="6-10 barril">6-10 barril/mes</option>
                <option value="11-20 barril">11-20 barril/mes</option>
                <option value="21+ barril">21+ barril/mes</option>
                <option value="10-24 packs">10-24 packs/mes</option>
                <option value="25-49 packs">25-49 packs/mes</option>
                <option value="50+ packs">50+ packs/mes</option>
              </select>
              <textarea name="notes" placeholder={m.formFields.notes} rows={3}
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-gold focus:outline-none resize-none" />
              <button type="submit"
                className="w-full py-3 rounded-lg bg-gold hover:bg-gold/90 text-[var(--color-background)] font-semibold transition-all cursor-pointer">
                {m.formSubmit}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}