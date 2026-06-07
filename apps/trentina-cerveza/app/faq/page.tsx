import { Metadata } from "next";
import content from "@/content/es.json";

const c = content as any;

export const revalidate = 1;
export const metadata: Metadata = {
  title: c.faq.seo.title,
  description: c.faq.seo.description,
};

export default function FaqPage() {
  const f = c.faq;
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
            {f.hero.title}
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto text-lg">
            {f.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page max-w-4xl">
          {f.categories.map((cat: any, i: number) => (
            <div key={i} className="mb-12 last:mb-0">
              <h2 className="text-xl font-bold text-gold uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gold/40" />
                {cat.name}
              </h2>
              <div className="space-y-3">
                {cat.faqs.map((item: any, j: number) => (
                  <details key={j} className="group rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] overflow-hidden">
                    <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-medium text-[var(--color-text)] hover:text-gold transition-colors">
                      <span>{item.q}</span>
                      <svg className="w-4 h-4 text-muted group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-4 text-sm text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-border)] pt-3">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-page max-w-2xl text-center">
          <div className="text-4xl mb-4">💬</div>
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">{f.ctaBottom.title}</h2>
          <p className="text-[var(--color-text-muted)] mb-6">{f.ctaBottom.subtitle}</p>
          <a href={f.ctaBottom.buttonHref} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold text-lg transition-all shadow-lg shadow-green-600/30">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.6-.173.311.3460.446-.52.149-.174.198-.298.298-.497.06-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.07-.242-.579-.487-.5-.669-.51-.173-.008-.371.56-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694-.44.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.06 6.988 2.946a9.92 9.92 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {f.ctaBottom.buttonText}
          </a>
        </div>
      </section>
    </>
  );
}
