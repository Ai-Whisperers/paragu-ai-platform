import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { content, localizedWhatsappLink } from "@/lib/content";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qyvokpribmbrosafntqa.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_KQ-sFNr7r6AauoG0B4nyTg_vuPHmeCm";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const CATEGORIES: Record<string, { label: string; emoji: string; blurb: string }> = {
  ropes: { label: "Cuerdas", emoji: "🪢", blurb: "Shibari, bondage, hemp, jute, nylon." },
  impact: { label: "Impacto", emoji: "🪵", blurb: "Palas, fustas, varillas, croptops." },
  sensory: { label: "Sensorial", emoji: "🕶️", blurb: "Vendas, plumas, texturas, deprivation." },
  leather: { label: "Cuero y arneses", emoji: "🟫", blurb: "Cuffs, collars, harnesses, leathercraft." },
  apparel: { label: "Indumentaria fetish/latex", emoji: "👗", blurb: "Latex, fetish wear, kugurumi." },
  wellness: { label: "Bienestar", emoji: "🌱", blurb: "Aceites, aftercare, lubes, candles." },
  workshops: { label: "Workshops / clases", emoji: "📚", blurb: "Shibari, negotiation, rope jam." },
  media: { label: "Editorial", emoji: "📖", blurb: "Zines, libros, fotografía." },
  other: { label: "Otro", emoji: "✨", blurb: "Lo que no encaja en otra categoría." },
};

interface Vendor {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  category: keyof typeof CATEGORIES;
  instagram: string | null;
  website: string | null;
  logo_url: string | null;
  product_count: string | null;
  status: string;
}

async function getVendorBySlug(slug: string): Promise<Vendor | null> {
  const { data, error } = await supabase
    .from("mk_vendors")
    .select("id, slug, name, tagline, description, category, instagram, website, logo_url, product_count, status")
    .eq("slug", slug)
    .eq("status", "approved")
    .maybeSingle();
  if (error) {
    console.error("getVendorBySlug error:", error);
    return null;
  }
  return (data || null) as Vendor | null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = await getVendorBySlug(slug);
  if (!v) return { title: "Vendor no encontrado" };
  return {
    title: `${v.name} — Tienda maškaráda`,
    description: v.tagline || `Vendedor de la comunidad maškaráda. ${CATEGORIES[v.category]?.label || v.category}.`,
  };
}

export default async function VendorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = await getVendorBySlug(slug);

  if (!v) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-white mb-3">Vendor no encontrado</h1>
          <p className="text-gray-400 mb-6">
            No hay un vendor aprobado con el slug <code className="text-gold-400">{slug}</code>.
          </p>
          <Link href="/tienda" className="text-gold-400 hover:text-gold-300">
            ← Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const cat = CATEGORIES[v.category] || CATEGORIES.other;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/tienda" className="text-xs uppercase tracking-widest text-gray-500 hover:text-gold-400 mb-6 inline-block">
          ← Tienda
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-start gap-3 mb-4">
              {v.logo_url ? (
                <img src={v.logo_url} alt={v.name} className="w-16 h-16 rounded-xl object-cover border border-white/10" />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-gold-400/20 flex items-center justify-center text-3xl">
                  {cat.emoji}
                </div>
              )}
              <div>
                <h1 className="text-3xl font-black tracking-tight text-white mb-1">{v.name}</h1>
                <p className="text-xs uppercase tracking-widest text-gold-400">
                  {cat.emoji} {cat.label}
                </p>
              </div>
            </div>

            {v.tagline && (
              <p className="text-lg text-gray-300 leading-relaxed mb-4 italic">"{v.tagline}"</p>
            )}

            {v.description && (
              <div className="prose prose-invert text-gray-300 leading-relaxed mb-6">
                {v.description.split("\n\n").map((p, i) => (
                  <p key={i} className="mb-3">{p}</p>
                ))}
              </div>
            )}

            {v.product_count && (
              <p className="text-sm text-gray-500 mb-6">
                Catálogo: <span className="text-gray-300">{v.product_count}</span>
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <a
                href={localizedWhatsappLink("es", `Hola! Quiero info sobre ${v.name} (visto en maskarada.com/tienda)`)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
              >
                💬 Hablar por WhatsApp
              </a>
              {v.website && (
                <a
                  href={v.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-6 py-3 rounded-full text-sm uppercase tracking-widest transition-all"
                >
                  Web ↗
                </a>
              )}
              {v.instagram && (
                <a
                  href={`https://instagram.com/${v.instagram.replace(/^@/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-6 py-3 rounded-full text-sm uppercase tracking-widest transition-all"
                >
                  Instagram ↗
                </a>
              )}
            </div>
          </div>

          <aside>
            <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02]">
              <h2 className="text-sm uppercase tracking-widest text-gold-400 mb-3">Sobre este vendor</h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-gray-500 text-xs uppercase tracking-widest">Categoría</dt>
                  <dd className="text-gray-300">{cat.emoji} {cat.label}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 text-xs uppercase tracking-widest">Comunidad</dt>
                  <dd className="text-gray-300">Aprobado por el equipo</dd>
                </div>
                <div>
                  <dt className="text-gray-500 text-xs uppercase tracking-widest">Comisión</dt>
                  <dd className="text-gray-300">10% (sostiene la plataforma)</dd>
                </div>
              </dl>
            </div>
            <div className="mt-4 border border-white/5 rounded-xl p-5 bg-white/[0.02]">
              <h2 className="text-sm uppercase tracking-widest text-gold-400 mb-3">¿Tenés una idea?</h2>
              <p className="text-xs text-gray-400 mb-3">
                Si querés vender algo en la plataforma, el proceso es simple.
              </p>
              <Link
                href="/tienda/aplicar"
                className="text-gold-400 hover:text-gold-300 text-sm"
              >
                Aplicar como vendor →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
