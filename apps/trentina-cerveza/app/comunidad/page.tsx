import { Metadata } from "next";
import content from "@/content/es.json";
import Image from "next/image";

const c = content as any;

export const revalidate = 1;
export const metadata: Metadata = {
  title: c.comunidad.seo.title,
  description: c.comunidad.seo.description,
};

const CATEGORY_COLORS: Record<string, string> = {
  "Educación": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Maridaje": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Proceso": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Producto": "bg-green-500/20 text-green-400 border-green-500/30",
  "Experiencia": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "Recetas": "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function ComunidadPage() {
  const co = c.comunidad;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-[var(--color-background)] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-[#0a0a14] to-[var(--color-background)]" />
          <div className="absolute inset-0 opacity-10">
            <div className="stars-bg" />
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container-page text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-[var(--font-heading)] font-bold text-white mb-4">
            {co.hero.title}
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto text-lg">
            {co.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page max-w-2xl text-center">
          <p className="text-lg text-[var(--color-text-light)] leading-relaxed italic">
            "{co.intro}"
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {co.articles.map((article: any, i: number) => (
              <article key={i} className="group rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5 transition-all">
                {/* Image placeholder */}
                <div className="relative h-40 bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center">
                  <div className="text-4xl opacity-40">
                    {article.category === "Recetas" ? "🍖" :
                     article.category === "Maridaje" ? "🍽️" :
                     article.category === "Educación" ? "📚" :
                     article.category === "Producto" ? "🍺" :
                     article.category === "Proceso" ? "⚙️" :
                     article.category === "Experiencia" ? "🏭" : "📖"}
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded border ${CATEGORY_COLORS[article.category] || "bg-gold/20 text-gold border-gold/30"}`}>
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[var(--color-text)] mb-2 leading-snug group-hover:text-gold transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--color-text-muted)]">{article.readTime} de lectura</span>
                    <span className={`text-sm font-medium text-[var(--color-text-muted)] flex items-center gap-1 group-hover:text-gold transition-colors cursor-pointer`}>
                      Leer más
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon notice */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page max-w-2xl text-center">
          <div className="rounded-xl p-8 bg-[var(--color-background)] border border-dashed border-gold/30">
            <div className="text-4xl mb-4">✍️</div>
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">Nuevo contenido cada semana</h3>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              Estamos preparando recetas exclusivas, guías de maridaje y historias de la fábrica. 
              Los artículos aparecen aquí y los compartimos en nuestras redes.
            </p>
            <a href="https://instagram.com/cervezatrentina" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg bg-gold/20 text-gold hover:bg-gold/30 transition-all text-sm font-medium">
              <span>📸</span> Seguinos en Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
