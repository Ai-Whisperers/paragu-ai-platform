import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";
import { content } from "@/lib/content";

const vendors = [
  {
    id: "monai",
    name: "Moñai Ropes",
    tagline: "Cuerdas shobari artesanales",
    description:
      "Cáñamo natural y algodón orgánico, fabricados a mano en Asunción. Probados para shibari y bondage consensual.",
    emoji: "🪢",
    borderColor: "border-gold-400/20",
    bgColor: "bg-gold-400/5",
    products: "Desde Gs. 45.000",
    featured: true,
    href: "/tienda/monai",
    ctaLabel: "Ver cuerdas",
    badges: ["100% cáñamo natural", "Hechos a mano en PY", "+20 colores"],
  },
];

export default function Tienda() {
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
              Marketplace de la comunidad: productos seleccionados para tu práctica. Calidad
              artesanal, hechos en Paraguay.
            </p>
          </div>

          <div className="space-y-8 mb-12">
            {vendors.map((vendor) => (
              <div
                key={vendor.id}
                className={`reveal border ${vendor.borderColor} rounded-xl p-8 ${vendor.bgColor} hover:border-gold-400/30 transition-all`}
              >
                <div className="flex items-start gap-6">
                  <div className="text-6xl shrink-0 mt-1">{vendor.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-white">{vendor.name}</h2>
                      {vendor.featured && (
                        <span className="text-[10px] uppercase tracking-widest bg-gold-400/20 text-gold-400 px-2 py-1 rounded-full border border-gold-400/30">
                          Destacado
                        </span>
                      )}
                    </div>
                    <p className="text-xs uppercase tracking-widest text-gold-400 mb-3">{vendor.tagline}</p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">{vendor.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {vendor.badges.map((badge) => (
                        <span key={badge} className="text-xs text-gray-500 border border-white/10 px-3 py-1 rounded-full">
                          {badge}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <Link
                        href={vendor.href}
                        className="inline-flex items-center gap-2 bg-blood-500 hover:bg-blood-600 text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all"
                      >
                        {vendor.ctaLabel}
                      </Link>
                      <span className="text-sm text-gray-500">{vendor.products}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Vendor application CTA */}
          <div className="border border-gold-400/20 rounded-xl p-6 bg-gold-400/5 text-center mb-12">
            <p className="text-gray-300 mb-3">
              ¿Tenés un emprendimiento de la comunidad y querés vender acá?
            </p>
            <Link
              href="/tienda/aplicar"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gold-400 hover:text-white border border-gold-400/30 hover:border-gold-400 px-6 py-2.5 rounded-full transition-all"
            >
              Aplicar como vendor
            </Link>
          </div>

          <div className="p-8 border border-white/5 rounded-xl text-center reveal">
            <p className="text-gray-400 text-sm mb-4">
              ¿Dudas sobre qué producto elegir? Te asesoramos sin compromiso.
            </p>
            <a
              href={`https://wa.me/${content.site.whatsappNumber}?text=Hola!%20Necesito%20asesoramiento%20para%20elegir%20un%20producto`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gold-400 hover:text-white border border-gold-400/30 hover:border-gold-400 px-6 py-2.5 rounded-full transition-all"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
