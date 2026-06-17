import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qyvokpribmbrosafntqa.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_KQ-sFNr7r6AauoG0B4nyTg_vuPHmeCm";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const CATEGORY_EMOJI: Record<string, string> = {
  ropes: "🪢",
  impact: "🪵",
  sensory: "🕶️",
  leather: "🟫",
  apparel: "👗",
  wellness: "🌱",
  workshops: "📚",
  media: "📖",
  other: "✨",
};

const CATEGORY_LABEL: Record<string, string> = {
  ropes: "Cuerdas",
  impact: "Impacto",
  sensory: "Sensorial",
  leather: "Cuero",
  apparel: "Indumentaria",
  wellness: "Bienestar",
  workshops: "Workshops",
  media: "Editorial",
  other: "Otro",
};

interface Vendor {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  category: string;
  product_count: string | null;
  logo_url: string | null;
}

async function getApprovedVendors(): Promise<Vendor[]> {
  const { data, error } = await supabase
    .from("mk_vendors")
    .select("id, slug, name, tagline, description, category, product_count, logo_url")
    .eq("status", "approved")
    .order("created_at", { ascending: true });
  if (error) {
    console.error("getApprovedVendors error:", error);
    return [];
  }
  return (data || []) as Vendor[];
}

export default async function Tienda() {
  const dbVendors = await getApprovedVendors();

  // Build the vendor list. DB rows override static, and we always include
  // monai as a fallback if the DB has nothing (so the page never goes empty).
  const vendors: Vendor[] = dbVendors.length > 0 ? dbVendors : [
    {
      id: "monai",
      slug: "monai",
      name: "Moñai Ropes",
      tagline: "Cuerdas shibari artesanales",
      description: "Cáñamo natural y algodón orgánico, fabricados a mano en Asunción. Probados para shibari y bondage consensual.",
      category: "ropes",
      product_count: "8 SKUs",
      logo_url: null,
    },
  ];

  return (
    <>
      <RevealOnScroll />
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 reveal">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="text-5xl">🏪</div>
              <Link
                href="/tienda/carrito"
                className="text-sm text-gray-400 hover:text-gold-400 inline-flex items-center gap-1"
              >
                🛒 Ver carrito
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
              Tienda maškaráda
            </h1>
            <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-6" />
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Marketplace de la comunidad. Calidad artesanal, hechos en Paraguay cuando es posible.
            </p>
          </div>

          {/* Apply CTA */}
          {dbVendors.length < 3 && (
            <div className="mb-12 border border-gold-400/20 rounded-xl p-6 bg-gold-400/5 text-center">
              <p className="text-gray-300 mb-3">
                ¿Hacés algo que la comunidad podría querer? Tela, cuero, velas, libros, lubes, lo que sea.
              </p>
              <Link
                href="/tienda/aplicar"
                className="inline-block bg-blood-500 hover:bg-blood-600 text-white px-6 py-2.5 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
              >
                Aplicar como vendor
              </Link>
            </div>
          )}

          <div className="space-y-8 mb-12">
            {vendors.map((vendor) => {
              const emoji = CATEGORY_EMOJI[vendor.category] || "✨";
              const catLabel = CATEGORY_LABEL[vendor.category] || vendor.category;
              return (
                <div
                  key={vendor.id}
                  className="reveal border border-gold-400/20 rounded-xl p-8 bg-gold-400/5 hover:border-gold-400/30 transition-all"
                >
                  <div className="flex items-start gap-6">
                    {vendor.logo_url ? (
                      <img src={vendor.logo_url} alt={vendor.name} className="w-20 h-20 rounded-xl object-cover border border-white/10 shrink-0 mt-1" />
                    ) : (
                      <div className="text-6xl shrink-0 mt-1">{emoji}</div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h2 className="text-2xl font-bold text-white">{vendor.name}</h2>
                        <span className="text-[10px] uppercase tracking-widest bg-gold-400/20 text-gold-400 px-2 py-1 rounded-full border border-gold-400/30">
                          {emoji} {catLabel}
                        </span>
                      </div>
                      {vendor.tagline && (
                        <p className="text-gray-300 italic mb-3">"{vendor.tagline}"</p>
                      )}
                      {vendor.description && (
                        <p className="text-gray-400 leading-relaxed text-sm mb-4 line-clamp-3">
                          {vendor.description}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-3">
                        <Link
                          href={`/tienda/${vendor.slug}`}
                          className="bg-blood-500 hover:bg-blood-600 text-white px-6 py-2.5 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
                        >
                          Ver vendor
                        </Link>
                        {vendor.product_count && (
                          <span className="text-xs text-gray-500">{vendor.product_count}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* How the marketplace works */}
          <section className="mt-16 border-t border-white/5 pt-12">
            <h2 className="text-2xl font-bold text-white mb-3">Cómo funciona la tienda</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02]">
                <div className="text-3xl mb-2">1️⃣</div>
                <h3 className="text-base font-semibold text-white mb-1">Elegís el producto</h3>
                <p className="text-sm text-gray-400">Cada vendor tiene su página. Comprás directo con ellos.</p>
              </div>
              <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02]">
                <div className="text-3xl mb-2">2️⃣</div>
                <h3 className="text-base font-semibold text-white mb-1">Pago por transferencia o WhatsApp</h3>
                <p className="text-sm text-gray-400">Por ahora: transferencia bancaria o coordinación por WhatsApp con el vendor.</p>
              </div>
              <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02]">
                <div className="text-3xl mb-2">3️⃣</div>
                <h3 className="text-base font-semibold text-white mb-1">Envío a todo Paraguay</h3>
                <p className="text-sm text-gray-400">Asunción: retiro o envío. Interior: Correo PY o encomienda.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
