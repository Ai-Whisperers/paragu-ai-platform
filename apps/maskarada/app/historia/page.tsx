import Link from "next/link";
import { events } from "@/lib/events";
import { content } from "@/lib/content";

export const metadata = {
  title: "Historia — Club maškaráda",
  description:
    "La historia de maškaráda: cada edición, los eventos, los momentos que construyeron la comunidad de kink y BDSM en Asunción, Paraguay.",
};

function formatDate(iso: string): string {
  if (!iso) return "Próximamente";
  const d = new Date(iso);
  return d.toLocaleDateString("es-PY", { year: "numeric", month: "long", day: "numeric" });
}

export default function Historia() {
  const past = events.filter((e) => e.status === "past").sort((a, b) => b.date.localeCompare(a.date));
  const upcoming = events.filter((e) => e.status === "upcoming");

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">📜</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            Historia
          </h1>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Cada edición documentada con fotos, recaps y contexto. maškaráda existe desde junio
            de 2025 — esta es la historia que construimos juntos.
          </p>
        </div>

        {upcoming.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="px-3 py-1 border border-gold-400/30 rounded-full text-xs uppercase tracking-widest text-gold-400">
                Próxima edición
              </span>
            </h2>
            {upcoming.map((e) => (
              <div
                key={e.slug}
                className="border border-gold-400/20 rounded-xl p-6 bg-gradient-to-br from-gold-400/5 to-transparent"
              >
                <h3 className="text-2xl font-bold text-white mb-1">{e.editionName}</h3>
                <p className="text-gold-400 text-sm mb-4">{e.theme}</p>
                <p className="text-gray-400 leading-relaxed mb-4">{e.body}</p>
                <a
                  href={`https://wa.me/${content.site.whatsappNumber}?text=Hola!%20Quiero%20enterarme%20cuando%20haya%20próximo%20evento%20maškaráda`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm bg-gold-400/90 hover:bg-gold-400 text-black px-6 py-2.5 rounded-full uppercase tracking-widest font-semibold transition-all"
                >
                  Notificarme por WhatsApp
                </a>
              </div>
            ))}
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="px-3 py-1 border border-white/20 rounded-full text-xs uppercase tracking-widest text-gray-400">
              Ediciones pasadas
            </span>
            <span className="text-gray-500 text-sm">({past.length})</span>
          </h2>
          <div className="space-y-12">
            {past.map((e) => (
              <article
                key={e.slug}
                className={`border rounded-xl overflow-hidden ${
                  e.featured
                    ? "border-gold-400/30 bg-gradient-to-br from-gold-400/5 to-transparent"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                {e.featured && (
                  <div className="px-6 pt-4">
                    <span className="inline-block px-3 py-1 bg-gold-400/20 text-gold-400 rounded-full text-xs uppercase tracking-widest border border-gold-400/30">
                      ★ Edición destacada
                    </span>
                  </div>
                )}
                <div className="p-6 pb-0">
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{e.editionName}</h3>
                    <span className="text-gold-400 text-sm">{e.dateLabel}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">
                    📍 {e.location}
                    {e.attendance && (
                      <span className="ml-3">👥 ~{e.attendance} asistentes</span>
                    )}
                  </p>
                  <p className="text-gold-400/80 italic text-sm mb-4">"{e.theme}"</p>
                  <div className="space-y-3 text-gray-300 leading-relaxed">
                    {e.body.split("\n\n").map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
                {e.photos.length > 0 && (
                  <div className="p-6">
                    <PhotoGrid photos={e.photos} featured={e.featured} />
                  </div>
                )}
                <div className="px-6 pb-6 flex items-center gap-4">
                  <Link
                    href={`/historia/${e.slug}`}
                    className="text-sm text-gold-400 hover:text-white uppercase tracking-widest"
                  >
                    Ver galería completa →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-16 p-8 border border-white/5 rounded-xl bg-white/[0.02] text-center">
          <p className="text-gray-300 mb-4">
            ¿Tenés material histórico de maškaráda — fotos, programas, memorabilia — que
            quieras aportar al archivo?
          </p>
          <a
            href={`https://wa.me/${content.site.whatsappNumber}?text=Hola!%20Quiero%20aportar%20material%20histórico%20al%20archivo%20de%20maškaráda`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-400 hover:text-white text-sm uppercase tracking-widest"
          >
            Aportar al archivo →
          </a>
        </div>
      </div>
    </div>
  );
}

function PhotoGrid({ photos, featured }: { photos: string[]; featured?: boolean }) {
  if (photos.length === 0) return null;
  const main = photos[0];
  const rest = photos.slice(1);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {featured && (
        <div className="col-span-2 row-span-2 aspect-[4/3] md:aspect-[5/4] overflow-hidden rounded-lg border border-white/5">
          <img
            src={main}
            alt="Edición destacada"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}
      {!featured && (
        <div className="col-span-2 row-span-2 aspect-[4/3] md:aspect-[5/4] overflow-hidden rounded-lg border border-white/5">
          <img
            src={main}
            alt="Edición principal"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}
      {rest.slice(0, featured ? 8 : 6).map((p, i) => (
        <div key={i} className="aspect-square overflow-hidden rounded-lg border border-white/5">
          <img
            src={p}
            alt={`Foto ${i + 2}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
