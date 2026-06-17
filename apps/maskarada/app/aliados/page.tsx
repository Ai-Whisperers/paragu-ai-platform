import Link from "next/link";
import { getApprovedAliados, type AliadoCategory, type AliadoScope } from "@/lib/aliados";
import { SEED_ALIADOS, type SeedAliado } from "@/lib/aliados-seed";

export const metadata = {
  title: "Aliados — Club maškaráda",
  description:
    "Organizaciones, colectivos y comunidades aliadas de maškaráda. En Paraguay, LATAM, e internacionales. Red de pares, no competencia.",
};

const CATEGORY_LABEL: Record<AliadoCategory, { label: string; emoji: string; blurb: string }> = {
  lgtbi_org: { label: "LGTBI+ / Derechos", emoji: "🏳️‍🌈", blurb: "Organizaciones de derechos humanos y comunidad LGTBI+." },
  sex_positive: { label: "Sexo-positivo / educación", emoji: "📚", blurb: "Colectivos de educación sexual, anticonceptiva, integral." },
  kink_org: { label: "Kink / Fetish / Leather", emoji: "🎭", blurb: "Comunidades kink, leather, fetish con las que tenemos diálogo directo." },
  wellness: { label: "Bienestar / Salud", emoji: "🌱", blurb: "Terapeutas, líneas de apoyo, salud sexual, salud mental kink-aware." },
  craft: { label: "Artesanía", emoji: "🧵", blurb: "Artesanxs locales: cuero, cuerdas, velas, lo que sirva al contexto." },
  media: { label: "Medios / Prensa", emoji: "📰", blurb: "Prensa, podcasts, magazines que cubren la escena con criterio." },
  venue: { label: "Espacios / Sedes", emoji: "🏛️", blurb: "Bares, clubes, salas — donde pasa la comunidad." },
  other: { label: "Otros", emoji: "✨", blurb: "Lo que no encaja en otra categoría." },
};

const SCOPE_LABEL: Record<AliadoScope, { label: string; emoji: string }> = {
  py: { label: "Paraguay", emoji: "🇵🇾" },
  latam: { label: "LATAM", emoji: "🌎" },
  international: { label: "Internacional", emoji: "🌍" },
};

function mergeAliados(db: Awaited<ReturnType<typeof getApprovedAliados>>): SeedAliado[] {
  // DB rows first (they win on dedup by name), then seeds, deduplicated
  const seen = new Set<string>();
  const out: SeedAliado[] = [];
  for (const a of db) {
    const key = a.name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      slug: a.slug,
      name: a.name,
      category: a.category,
      scope: a.scope,
      city: a.city ?? undefined,
      country: a.country ?? undefined,
      description: a.description ?? "",
      website: a.website ?? undefined,
      instagram: a.instagram ?? undefined,
      relationship: a.relationship ?? undefined,
    });
  }
  for (const s of SEED_ALIADOS) {
    const key = s.name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
  }
  return out;
}

function groupByCategory(list: SeedAliado[]): Record<AliadoCategory, SeedAliado[]> {
  const groups = {} as Record<AliadoCategory, SeedAliado[]>;
  for (const a of list) {
    (groups[a.category] = groups[a.category] || []).push(a);
  }
  return groups;
}

function groupByScope(list: SeedAliado[]): Record<AliadoScope, SeedAliado[]> {
  const groups = { py: [], latam: [], international: [] } as Record<AliadoScope, SeedAliado[]>;
  for (const a of list) {
    (groups[a.scope] = groups[a.scope] || []).push(a);
  }
  return groups;
}

export default async function Aliados() {
  const dbAliados = await getApprovedAliados();
  const all = mergeAliados(dbAliados);
  const byCategory = groupByCategory(all);
  const byScope = groupByScope(all);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🤝</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            Aliados
          </h1>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-6" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            La red de pares. Organizaciones, colectivos, comunidades, y personas con las que maškaráda tiene diálogo — para que sepas a quién conocer, a quién sumarte, y a quién invitar a tu próximo evento.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-12">
          <div className="border border-white/5 rounded-xl p-4 bg-white/[0.02] text-center">
            <p className="text-2xl font-bold text-gold-400">{byScope.py?.length ?? 0}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">🇵🇾 Paraguay</p>
          </div>
          <div className="border border-white/5 rounded-xl p-4 bg-white/[0.02] text-center">
            <p className="text-2xl font-bold text-gold-400">{byScope.latam?.length ?? 0}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">🌎 LATAM</p>
          </div>
          <div className="border border-white/5 rounded-xl p-4 bg-white/[0.02] text-center">
            <p className="text-2xl font-bold text-gold-400">{byScope.international?.length ?? 0}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">🌍 Internacional</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <Link
            href="/colaborar"
            className="block border border-gold-400/30 rounded-xl p-6 bg-gold-400/5 hover:border-gold-400 transition-all"
          >
            <div className="text-3xl mb-2">🧩</div>
            <h3 className="text-lg font-semibold text-white mb-1">Falta alguien — ¡lo creamos!</h3>
            <p className="text-sm text-gray-400">Hay roles, espacios, oficios y comunidades que necesitamos y no existen. Mirá la lista y avísanos si querés tomar uno.</p>
          </Link>
          <Link
            href="/aliados/sugerir"
            className="block border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:border-gold-400/30 transition-all"
          >
            <div className="text-3xl mb-2">➕</div>
            <h3 className="text-lg font-semibold text-white mb-1">Sumá un aliado</h3>
            <p className="text-sm text-gray-400">¿Conocés una org, colectivo, o profesional que debería estar en la lista? Sugerilo y el equipo lo revisa.</p>
          </Link>
        </div>

        {/* Grouped by category */}
        <section className="space-y-12">
          {Object.entries(byCategory).map(([cat, items]) => {
            if (!items || items.length === 0) return null;
            const meta = CATEGORY_LABEL[cat as AliadoCategory];
            return (
              <div key={cat}>
                <div className="flex items-baseline gap-3 mb-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span>{meta.emoji}</span>
                    <span>{meta.label}</span>
                  </h2>
                  <span className="text-xs text-gray-500">({items.length})</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">{meta.blurb}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {items.map((a) => (
                    <article
                      key={a.slug}
                      className="border border-white/5 rounded-xl p-5 bg-white/[0.02] hover:border-gold-400/30 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-base font-semibold text-white">{a.name}</h3>
                        <span className="text-xs text-gray-500 shrink-0">
                          {SCOPE_LABEL[a.scope]?.emoji} {a.city ? `${a.city}` : ""}
                        </span>
                      </div>
                      {a.description && (
                        <p className="text-sm text-gray-300 leading-relaxed mb-3">{a.description}</p>
                      )}
                      {a.relationship && (
                        <p className="text-xs text-gray-500 italic mb-3">↳ {a.relationship}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        {a.website && (
                          <a href={a.website} target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300">
                            web ↗
                          </a>
                        )}
                        {a.instagram && (
                          <a href={`https://instagram.com/${a.instagram.replace(/^@/, "")}`} target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300">
                            ig ↗
                          </a>
                        )}
                        {("inOutreach" in a && (a as SeedAliado).inOutreach) && (
                          <span className="text-green-400/80">✓ contacto en curso</span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Missing-things CTA at bottom */}
        <section className="mt-16 border-t border-white/5 pt-12">
          <h2 className="text-2xl font-bold text-white mb-3">Lo que falta</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            La red de aliados no es exhaustiva. Faltan terapeutas kink-aware, leather crafters, espacios para eventos, traductores, photographers, y más. Si alguna de esas cosas te interesa construir — o conocés a alguien que podría — mirá <Link href="/colaborar" className="text-gold-400 hover:text-gold-300">/colaborar</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
