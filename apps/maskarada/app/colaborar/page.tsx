import Link from "next/link";
import { getOpenColabor, type ColaborKind, type ColaborStatus } from "@/lib/aliados";
import { SEED_COLABORAR, type SeedColaborar } from "@/lib/colaborar-seed";

export const metadata = {
  title: "Colaborar — Club maškaráda",
  description:
    "Falta gente, faltan espacios, faltan oficios. La red de personas que la comunidad necesita y no tiene. Si querés tomar uno, acá está la lista.",
};

const KIND_LABEL: Record<ColaborKind, { label: string; emoji: string; blurb: string; ctaHint: string }> = {
  ally_missing: { label: "Aliado que falta", emoji: "🤝", blurb: "Una organización, colectivo, o comunidad que necesitamos.", ctaHint: "¿Sos parte de algo así? ¿Querés fundar uno?" },
  vendor_missing: { label: "Vendedor que falta", emoji: "🛍️", blurb: "Una categoría de producto o servicio que la comunidad quiere pero no encuentra en Paraguay.", ctaHint: "¿Hacés algo así? ¿Podés traer a alguien que lo haga?" },
  space_missing: { label: "Espacio que falta", emoji: "🏛️", blurb: "Un venue, sede, o sala para eventos, munches, o prácticas.", ctaHint: "¿Tenés acceso a un espacio así? ¿Conocés a alguien?" },
  role_missing: { label: "Rol que falta", emoji: "🧑‍🤝‍🧑", blurb: "Una función que la comunidad necesita cubierta (moderación, traducción, etc).", ctaHint: "¿Podés cubrir este rol? ¿Conocés a alguien?" },
  event_idea: { label: "Evento por probar", emoji: "💡", blurb: "Una idea de evento que todavía no hicimos.", ctaHint: "¿Te animarías a organizarlo? ¿O ayudar?" },
};

const STATUS_LABEL: Record<ColaborStatus, { label: string; color: string }> = {
  open: { label: "Buscando", color: "border-gold-400/40 bg-gold-400/10 text-gold-400" },
  claimed: { label: "Reclamado", color: "border-blue-500/40 bg-blue-500/10 text-blue-400" },
  in_progress: { label: "En curso", color: "border-purple-500/40 bg-purple-500/10 text-purple-400" },
  done: { label: "✓ Listo", color: "border-green-500/40 bg-green-500/10 text-green-400" },
  declined: { label: "Pausado", color: "border-gray-500/40 bg-gray-500/10 text-gray-400" },
};

function mergeColabor(db: Awaited<ReturnType<typeof getOpenColabor>>): (SeedColaborar & { _status: ColaborStatus; _claimed_by: string | null })[] {
  // DB rows first (in-progress takes priority), then seeds as 'open'
  const seen = new Set<string>();
  const out: (SeedColaborar & { _status: ColaborStatus; _claimed_by: string | null })[] = [];
  for (const c of db) {
    const key = c.title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      slug: c.id, // use id as the de-dup key
      kind: c.kind,
      title: c.title,
      description: c.description,
      contact_optional: c.contact_optional ?? undefined,
      _status: c.status,
      _claimed_by: c.claimed_by,
    });
  }
  for (const s of SEED_COLABORAR) {
    const key = s.title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ ...s, _status: "open", _claimed_by: null });
  }
  return out;
}

function groupByKind(list: ReturnType<typeof mergeColabor>): Record<ColaborKind, ReturnType<typeof mergeColabor>> {
  const groups = {} as Record<ColaborKind, ReturnType<typeof mergeColabor>>;
  for (const c of list) {
    (groups[c.kind] = groups[c.kind] || []).push(c);
  }
  return groups;
}

export default async function Colaborar() {
  const db = await getOpenColabor();
  const all = mergeColabor(db);
  const byKind = groupByKind(all);

  // Quick stats
  const total = all.length;
  const claimed = all.filter((c) => c._status !== "open").length;
  const done = all.filter((c) => c._status === "done").length;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🧩</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            Colaborar
          </h1>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-6" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Faltan personas, faltan espacios, faltan oficios. Esta es la lista de cosas que la comunidad necesita y todavía no tiene. Si alguna te interesa — o conocés a alguien que podría cubrirla — avísanos.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-12">
          <div className="border border-white/5 rounded-xl p-4 bg-white/[0.02] text-center">
            <p className="text-2xl font-bold text-gold-400">{total}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Ideas abiertas</p>
          </div>
          <div className="border border-white/5 rounded-xl p-4 bg-white/[0.02] text-center">
            <p className="text-2xl font-bold text-blue-400">{claimed}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">En conversación</p>
          </div>
          <div className="border border-white/5 rounded-xl p-4 bg-white/[0.02] text-center">
            <p className="text-2xl font-bold text-green-400">{done}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Lanzadas</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <Link
            href="/colaborar/sugerir"
            className="block border border-gold-400/30 rounded-xl p-6 bg-gold-400/5 hover:border-gold-400 transition-all"
          >
            <div className="text-3xl mb-2">💡</div>
            <h3 className="text-lg font-semibold text-white mb-1">Sumá una necesidad</h3>
            <p className="text-sm text-gray-400">Falta algo que no está en la lista. Decinos qué y lo agregamos.</p>
          </Link>
          <a
            href="https://wa.me/595981200255?text=Hola!%20Quiero%20tomar%20una%20de%20las%20cosas%20de%20la%20lista%20de%20%2Fcolaborar"
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:border-gold-400/30 transition-all"
          >
            <div className="text-3xl mb-2">🤚</div>
            <h3 className="text-lg font-semibold text-white mb-1">Quiero tomar una</h3>
            <p className="text-sm text-gray-400">Escribinos por WhatsApp y decimos cómo empezar.</p>
          </a>
        </div>

        {/* List grouped by kind */}
        <section className="space-y-12">
          {Object.entries(byKind).map(([kind, items]) => {
            if (!items || items.length === 0) return null;
            const meta = KIND_LABEL[kind as ColaborKind];
            return (
              <div key={kind}>
                <div className="flex items-baseline gap-3 mb-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span>{meta.emoji}</span>
                    <span>{meta.label}</span>
                  </h2>
                  <span className="text-xs text-gray-500">({items.length})</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">{meta.blurb}</p>
                <div className="space-y-3">
                  {items.map((c) => {
                    const status = STATUS_LABEL[c._status];
                    return (
                      <article
                        key={c.slug}
                        className="border border-white/5 rounded-xl p-5 bg-white/[0.02] hover:border-gold-400/30 transition-all"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                          <h3 className="text-base font-semibold text-white">{c.title}</h3>
                          <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${status.color}`}>
                            {status.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed mb-3">{c.description}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          {c._claimed_by && (
                            <span className="text-blue-400">→ {c._claimed_by}</span>
                          )}
                          {c._status === "open" && (
                            <p className="text-gray-500 italic">
                              {meta.ctaHint}
                              {" · "}
                              <a
                                href={`https://wa.me/595981200255?text=${encodeURIComponent(
                                  `Hola! Quiero tomar: "${c.title}" (visto en /colaborar)`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold-400 hover:text-gold-300"
                              >
                                Avísame por WhatsApp
                              </a>
                            </p>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        {/* Bottom CTA */}
        <section className="mt-16 border-t border-white/5 pt-12">
          <h2 className="text-2xl font-bold text-white mb-3">Si pensás algo y no está acá</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            La lista no es exhaustiva. Si ves un agujero — un tipo de aliado, una categoría de producto, un espacio, un rol que no se te ocurrió a nadie — sumálo. <Link href="/colaborar/sugerir" className="text-gold-400 hover:text-gold-300">Sugerir uno nuevo</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
