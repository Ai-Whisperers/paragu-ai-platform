import { Metadata } from "next";
import content from "@/content/es.json";

const c = content as any;

export const revalidate = 1;
export const metadata: Metadata = {
  title: c.dondecomprar.seo.title,
  description: c.dondecomprar.seo.description,
};

export default function DondeComprarPage() {
  const d = c.dondecomprar;
  const site = c.site;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-[var(--color-background)] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-[var(--color-surface)] to-[var(--color-background)]" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container-page text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
            {d.hero.title}
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto text-lg">
            {d.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page">
          <div className="rounded-xl overflow-hidden border border-[var(--color-border)] h-[400px] relative">
            <iframe
              src={`https://maps.google.com/maps?q=${d.mapCenter.lat},${d.mapCenter.lng}&z=${d.mapCenter.zoom}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Trentina"
            />
          </div>
        </div>
      </section>

      {/* Points of sale */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-page max-w-4xl">
          <div className="space-y-6">

            {/* Factory */}
            <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-gold/40">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0 text-2xl">🏭</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-[var(--color-text)]">{d.factory.name}</h3>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-gold/20 text-gold border border-gold/30">Directo</span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] mb-2">{d.factory.address}</p>
                  <p className="text-sm text-[var(--color-text-light)] mb-3">{d.factory.description}</p>
                  <a href={d.factory.ctaHref} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/20 text-gold hover:bg-gold/30 transition-all text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.06-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.06 6.988 2.946a9.92 9.92 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {d.factory.ctaText}
                  </a>
                </div>
              </div>
            </div>

            {/* Cerveroga */}
            <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-2xl">🏪</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-[var(--color-text)]">{d.cerveroga.name}</h3>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">Distribuidor</span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] mb-2">{d.cerveroga.address}</p>
                  <p className="text-sm text-[var(--color-text-light)] mb-2">{d.cerveroga.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {d.cerveroga.products.split(", ").map((p: string, i: number) => (
                      <span key={i} className="px-2 py-1 rounded text-xs bg-[var(--color-background)] text-[var(--color-text-muted)] border border-[var(--color-border)]">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Suggest a store */}
            <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-dashed border-[var(--color-border)] text-center">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">{d.ctaBottom.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">{d.ctaBottom.subtitle}</p>
              <a href={d.ctaBottom.buttonHref} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 text-white font-medium transition-all text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.06 6.988 2.946a9.92 9.92 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {d.ctaBottom.buttonText}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
