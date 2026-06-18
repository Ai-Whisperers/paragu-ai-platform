import Link from "next/link";
import { forumCategories, forumThreads, featuredThreads, getCategory } from "@/lib/forum";
import { content } from "@/lib/content";
import { JsonLd, breadcrumb } from "@/lib/jsonld";

export const metadata = {
  title: "Foro — Club maškaráda",
  description:
    "Foro de la comunidad maškaráda: conversación por categoría. Para principiantes, encuentros, seguridad, y cada actividad.",
};

// Tiny markdown→HTML (server-side, no client JS)
function md(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, '<code class="text-gold-400 bg-black/30 px-1 rounded">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-gold-400 hover:text-white underline">$1</a>')
    .replace(/\n\n/g, "</p><p>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>");
}

const CATEGORY_BG: Record<string, string> = {
  general: "border-white/10",
  nuevos: "border-green-500/30",
  encuentros: "border-gold-400/30",
  seguridad: "border-blood-500/30",
  shibari: "border-gold-400/30",
  "impact-play": "border-blood-500/30",
  "role-play": "border-purple-mid/30",
  psychological: "border-blood-500/30",
  service: "border-gold-400/30",
  comunidad: "border-green-500/30",
};

export default function Foro() {
  const featured = featuredThreads();
  const categoryThreadCount = (slug: string) =>
    forumThreads.filter((t) => t.category === slug).length;

  return (
    <div className="min-h-screen py-20 px-4">
      <JsonLd data={[breadcrumb([{ name: "Foro", path: "/foro" }])]} />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">💬</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">Foro</h1>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Conversación de la comunidad, organizada por categoría. Hilos
            destacados de cada área — para leer, aprender, o iniciar la tuya.
          </p>
        </div>

        <div className="border border-gold-400/20 rounded-xl p-4 bg-gold-400/5 text-sm text-gray-400 mb-12">
          <p>
            <strong className="text-gold-400">Cómo funciona:</strong> las conversaciones
            se organizan en 10 categorías. Cada una tiene un moderador (staff de
            maškaráda o alguien con experiencia específica en el área). Podés
            leer todo sin registrarte. Para responder o crear un hilo, mandá un
            mensaje al WhatsApp con el título y el cuerpo — el equipo lo
            sube al foro. (Próximamente: cuentas de usuario.)
          </p>
        </div>

        {/* Featured threads */}
        {featured.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-4">Hilos destacados</h2>
            <div className="space-y-3">
              {featured.map((t) => {
                const cat = getCategory(t.category);
                return (
                  <Link
                    key={t.slug}
                    href={`/foro/${t.slug}`}
                    className="block border border-gold-400/20 rounded-xl p-5 bg-gold-400/5 hover:border-gold-400/40 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl shrink-0">{cat?.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {t.pinned && <span className="text-gold-400 mr-1">📌</span>}
                          {t.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {cat?.title} · por {t.author} · {t.postedAgo} ·{" "}
                          {t.replies} respuestas · {t.views} vistas
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Categories grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Categorías</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forumCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/foro#${cat.slug}`}
                className={`block border rounded-xl p-5 bg-white/[0.02] hover:border-gold-400/40 transition-all ${CATEGORY_BG[cat.slug] || "border-white/10"}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl shrink-0">{cat.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">{cat.description}</p>
                    <p className="text-xs text-gray-500">
                      {categoryThreadCount(cat.slug)} hilo{categoryThreadCount(cat.slug) === 1 ? "" : "s"} ·{" "}
                      <span className="text-gold-400">{cat.postingPolicy}</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Per-category thread listing (anchored) */}
        {forumCategories.map((cat) => {
          const threads = forumThreads.filter((t) => t.category === cat.slug);
          if (threads.length === 0) return null;
          return (
            <section key={cat.slug} id={cat.slug} className="mb-16 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{cat.emoji}</span>
                <h2 className="text-2xl font-bold text-white">{cat.title}</h2>
                <span className="text-gray-500 text-sm">({threads.length})</span>
              </div>
              <p className="text-sm text-gray-400 mb-4 italic">{cat.longDescription}</p>
              <div className="space-y-2">
                {threads.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/foro/${t.slug}`}
                    className="block border border-white/5 rounded-lg p-4 bg-white/[0.02] hover:border-gold-400/30 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-white">
                          {t.pinned && <span className="text-gold-400 mr-1">📌</span>}
                          {t.featured && <span className="text-blood-500 mr-1">★</span>}
                          {t.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          por {t.author}
                          {t.authorRole === "staff" && <span className="text-gold-400 ml-1">(staff)</span>}
                          {" · "}{t.postedAgo} · {t.replies} respuestas
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <div className="mt-12 p-8 border border-white/5 rounded-xl bg-white/[0.02] text-center">
          <p className="text-gray-300 mb-4">¿Querés iniciar un hilo?</p>
          <a
            href={`https://wa.me/${content.site.whatsappNumber}?text=Hola!%20Quiero%20publicar%20un%20hilo%20en%20el%20foro`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-gold-400/40 hover:border-gold-400 text-gold-400 hover:text-gold-300 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all"
          >
            Escribinos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
