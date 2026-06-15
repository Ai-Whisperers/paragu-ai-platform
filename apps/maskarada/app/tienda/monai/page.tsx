"use client";

import { useEffect, useState } from "react";
import RevealOnScroll from "@/components/RevealOnScroll";
import { addToCart } from "@/lib/cart";

interface Product {
  id: string;
  name: string;
  tag: string;
  shortDesc: string;
  longDesc: string;
  length: string;
  thickness: string;
  material: string;
  color: string;
  price: number;
  highlight: boolean;
}

const products: Product[] = [
  { id: "monai-3m", name: "Moñai 3m", tag: "3 metros", shortDesc: "Corta — para manos, pies, micro-suspensión", longDesc: "Perfecta para atados de manos o pies. 3 metros de cáñamo natural 8mm, flexible y resistente.", length: "3m", thickness: "8mm", material: "Cáñamo natural", color: "Natural", price: 45000, highlight: false },
  { id: "monai-5m", name: "Moñai 5m", tag: "5 metros", shortDesc: "La más versátil — atado completo de cuerpo", longDesc: "5 metros de cáñamo natural 8mm. Ideal para chest harness, hogtie y setups intermedios.", length: "5m", thickness: "8mm", material: "Cáñamo natural", color: "Natural", price: 65000, highlight: true },
  { id: "monai-8m", name: "Moñai 8m", tag: "8 metros", shortDesc: "Larga — suspensión parcial y rigging completo", longDesc: "8 metros de cáñamo premium 10mm. Para setups de suspensión parcial y rigging avanzado.", length: "8m", thickness: "10mm", material: "Cáñamo natural", color: "Natural", price: 95000, highlight: false },
  { id: "monai-12m", name: "Moñai 12m", tag: "12 metros", shortDesc: "XL — suspensión completa y缚 (shibari)", longDesc: "12 metros de cáñamo premium 10mm. Cuerda completa para suspensión y缚 de cuerpo entero.", length: "12m", thickness: "10mm", material: "Cáñamo natural", color: "Natural", price: 130000, highlight: false },
  { id: "monai-3m-n", name: "Moñai 3m Negro", tag: "3m | Negro", shortDesc: "Corta — versión dark con teñido artesanal", longDesc: "3 metros de cáñamo teñido en negro, 8mm. Estética dark, misma calidad premium.", length: "3m", thickness: "8mm", material: "Cáñamo teñido", color: "Negro", price: 55000, highlight: false },
  { id: "monai-5m-n", name: "Moñai 5m Negro", tag: "5m | Negro", shortDesc: "La versátil — versión dark", longDesc: "5 metros de cáñamo teñido en negro, 8mm. Combina comodidad, resistencia y estética dark.", length: "5m", thickness: "8mm", material: "Cáñamo teñido", color: "Negro", price: 75000, highlight: false },
  { id: "monai-5m-r", name: "Moñai 5m Rojo", tag: "5m | Rojo", shortDesc: "La versátil — versión roja oscura", longDesc: "5 metros de cáñamo teñido en rojo oscuro, 8mm. Sensual, expresiva, con carácter.", length: "5m", thickness: "8mm", material: "Cáñamo teñido", color: "Rojo", price: 75000, highlight: false },
];

function fmt(n: number) {
  return n.toLocaleString("es-PY");
}

const WHATSAPP = "595981200255";

export default function Monai() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState<"select" | "transfer" | "added">("select");

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("animate-fade-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const total = selected ? selected.price * quantity : 0;

  const whatsappOrder = () =>
    selected
      ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
          `Hola! Quiero comprar:\n\n* ${quantity}x ${selected.name} (${selected.tag})\n* Color: ${selected.color}\n* Largo: ${selected.length}\n* Precio unitario: Gs ${fmt(selected.price)}\n* Total: Gs ${fmt(total)}`
        )}`
      : "#";

  const whatsappTransfer = () =>
    selected
      ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
          `Hola! Ya hice la transferencia:\n\n* ${quantity}x ${selected.name}\n* Color: ${selected.color}\n* Total pagado: Gs ${fmt(total)}\n\nMi nombre:\nCI/RUC:\nMétodo de envío: (Asunción / Interior)`
        )}`
      : "#";

  return (
    <>
      <RevealOnScroll />
      <div className="min-h-screen">
        <section className="relative min-h-[55vh] flex flex-col items-center justify-center text-center overflow-hidden pt-20 pb-12 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#0d0508] z-0" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blood-500/10 to-transparent z-0" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <a
              href="/tienda"
              className="text-xs uppercase tracking-widest text-gray-500 hover:text-gold-400 transition-colors mb-6 inline-block"
            >
              ← Tienda maškaráda
            </a>
            <div className="text-5xl mb-4">🪢</div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight">
              Moñai Ropes
            </h1>
            <p className="text-gray-400 text-lg mb-6">
              Cuerdas shobari artesanales. Cáñamo natural y teñido.
              <br />
              Hechas a mano en Asunción — envío a todo Paraguay.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-gold-400 border border-gold-400/30 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" /> Envío Asunción 24-48h
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-gold-400 border border-gold-400/30 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" /> Envío Interior
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-pink-400 border border-pink-400/30 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" /> Transferencia bancaria
              </span>
            </div>
          </div>
        </section>

        <section className="py-5 px-4 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-xs text-gray-500">
            <span className="text-gold-400 font-semibold uppercase tracking-widest text-[10px]">
              Cómo comprar
            </span>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 bg-blood-500/20 border border-blood-500/40 rounded-full text-blood-500 text-[10px] font-bold flex items-center justify-center">
                1
              </span>
              <span>Elegí tu cuerda</span>
            </div>
            <div className="w-4 border-t border-white/10" />
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 bg-blood-500/20 border border-blood-500/40 rounded-full text-blood-500 text-[10px] font-bold flex items-center justify-center">
                2
              </span>
              <span>Transferencia bancaria</span>
            </div>
            <div className="w-4 border-t border-white/10" />
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 bg-blood-500/20 border border-blood-500/40 rounded-full text-blood-500 text-[10px] font-bold flex items-center justify-center">
                3
              </span>
              <span>Confirmás por WhatsApp</span>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className={`border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:border-gold-400/30 transition-all reveal ${
                  p.highlight ? "ring-1 ring-gold-400/30" : ""
                }`}
              >
                {p.highlight && (
                  <div className="text-[10px] uppercase tracking-widest text-gold-400 mb-3">
                    ★ Bestseller
                  </div>
                )}
                <div className="text-4xl text-center mb-4">🪢</div>
                <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                <div className="text-xs text-gray-500 mb-3">{p.tag}</div>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">{p.shortDesc}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {[p.length, p.thickness, p.material, p.color].map((t) => (
                    <span
                      key={t}
                      className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gold-400 font-semibold">Gs {fmt(p.price)}</span>
                  <button
                    onClick={() => {
                      setSelected(p);
                      setQuantity(1);
                      setStep("select");
                    }}
                    className="text-xs uppercase tracking-widest border border-blood-500/40 text-blood-500 hover:bg-blood-500 hover:text-white px-4 py-1.5 rounded-full transition-all"
                  >
                    Elegir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setStep("select")}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{selected.name}</h2>
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-500 hover:text-white text-2xl"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>
              <div className="text-sm text-gray-400 mb-4">{selected.longDesc}</div>
              <div className="flex flex-wrap gap-2 mb-6">
                {[selected.length, selected.thickness, selected.material, selected.color].map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="text-gold-400 text-2xl font-bold mb-6">Gs {fmt(selected.price)}</div>

              {step === "select" ? (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <label className="text-sm text-gray-400">Cantidad:</label>
                    <div className="flex items-center gap-3 border border-white/10 rounded-full px-4 py-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="text-gray-400 hover:text-white"
                      >
                        −
                      </button>
                      <span className="text-white w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="text-gray-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 mb-6">
                    Total: <span className="text-gold-400 font-semibold">Gs {fmt(total)}</span>
                  </div>
                  <button
                    onClick={() => {
                      addToCart({
                        id: selected.id,
                        vendor: "Moñai Ropes",
                        name: selected.name,
                        variant: `${selected.tag} · ${selected.color}`,
                        unitPrice: selected.price,
                        quantity,
                        source: "monai",
                      });
                      setStep("added");
                    }}
                    className="block w-full bg-blood-500 hover:bg-blood-600 text-white text-center py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all mb-3"
                  >
                    Agregar al carrito
                  </button>
                  <a
                    href={whatsappOrder()}
                    target="_blank"
                    rel="noopener"
                    className="block w-full border border-white/10 hover:border-white/30 text-gray-400 hover:text-white text-center py-3 rounded-full text-sm uppercase tracking-widest transition-all"
                  >
                    Comprar directo por WhatsApp
                  </a>
                  <button
                    onClick={() => setStep("transfer")}
                    className="block w-full text-gray-500 hover:text-white text-xs mt-3 transition-all"
                  >
                    Ya hice la transferencia →
                  </button>
                </>
              ) : step === "added" ? (
                <>
                  <p className="text-sm text-gray-300 mb-2">✅ Agregado al carrito</p>
                  <p className="text-xs text-gray-500 mb-6">
                    {quantity}x {selected.name} — Gs {fmt(total)}
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href="/tienda/carrito"
                      className="block w-full bg-gold-400/90 hover:bg-gold-400 text-black text-center py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
                    >
                      Ver carrito
                    </a>
                    <button
                      onClick={() => { setStep("select"); setSelected(null); }}
                      className="block w-full text-gray-400 hover:text-white text-xs mt-2"
                    >
                      Seguir comprando
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-400 mb-4">
                    Transferime a la cuenta y confirmá por WhatsApp.
                  </p>
                  <a
                    href={whatsappTransfer()}
                    target="_blank"
                    rel="noopener"
                    className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all mb-3"
                  >
                    Confirmar transferencia por WhatsApp
                  </a>
                  <button
                    onClick={() => setStep("select")}
                    className="block w-full border border-white/10 hover:border-white/30 text-gray-400 hover:text-white py-3 rounded-full text-sm transition-all"
                  >
                    ← Volver
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        <section className="py-16 px-4 border-t border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-8 reveal">Por qué Moñai</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="reveal">
                <div className="text-3xl mb-3">🪢</div>
                <h3 className="text-white font-semibold mb-2">Artesanal</h3>
                <p className="text-sm text-gray-400">
                  Cada cuerda inspeccionada y asegurada para uso en shibari y bondage. Cáñamo
                  natural premium.
                </p>
              </div>
              <div className="reveal">
                <div className="text-3xl mb-3">🇵🇾</div>
                <h3 className="text-white font-semibold mb-2">Hecho en Paraguay</h3>
                <p className="text-sm text-gray-400">
                  Producción local. Materiales de calidad paraguaya. Cada pieza tiene historia y
                  propósito.
                </p>
              </div>
              <div className="reveal">
                <div className="text-3xl mb-3">📦</div>
                <h3 className="text-white font-semibold mb-2">Envío Rápido</h3>
                <p className="text-sm text-gray-400">
                  Asunción: delivery 24-48h. Interior: envío común a todo Paraguay.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
