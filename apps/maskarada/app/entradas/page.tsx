"use client";

import { useEffect, useState } from "react";
import {
  TIER_CONFIG,
  purchaseTicket,
  validateCoupon,
  getCapacity,
  getSiteConfig,
  type TicketTier,
  type TicketData,
  type CapacityInfo,
} from "@/lib/supabase";

type Step = "select" | "form" | "done" | "error";

const TIER_EMOJI: Record<TicketTier, string> = {
  early_bird: "🐦",
  general: "🎟️",
  vip: "👑",
};

function formatPrice(pyg: number): string {
  return pyg.toLocaleString("es-PY");
}

export default function Entradas() {
  const [selectedTier, setSelectedTier] = useState<TicketTier>("early_bird");
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState<Step>("select");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [marketing, setMarketing] = useState(true);
  const [couponInput, setCouponInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [ticketLink, setTicketLink] = useState("");

  const [couponApplied, setCouponApplied] = useState<{
    code: string;
    discount_type: string;
    discount_value: number;
  } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  const [capacity, setCapacity] = useState<CapacityInfo[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState("595981200255");

  useEffect(() => {
    (async () => {
      setCapacity(await getCapacity());
      const config = await getSiteConfig();
      setWhatsappNumber(config.whatsapp_number);
    })();
  }, []);

  const total = TIER_CONFIG[selectedTier].price * quantity;
  const discountAmount = couponApplied
    ? couponApplied.discount_type === "percentage"
      ? Math.round(total * couponApplied.discount_value) / 100
      : couponApplied.discount_value
    : 0;
  const finalTotal = Math.max(0, total - discountAmount);

  const getRemainingForTier = (tier: string): number => {
    const c = capacity.find((x) => x.tier === tier);
    if (!c) return Infinity;
    return c.max_quantity - c.sold_so_far;
  };

  const selectTier = (tier: TicketTier) => {
    setSelectedTier(tier);
    setCouponApplied(null);
    setCouponInput("");
    setCouponError("");
    setStep("form");
    setErrorMsg("");
  };

  const applyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    const result = await validateCoupon(couponInput.trim(), selectedTier);
    setCouponLoading(false);

    if (result.valid) {
      setCouponApplied({
        code: couponInput.trim(),
        discount_type: result.discount_type!,
        discount_value: result.discount_value!,
      });
      setCouponError("");
    } else {
      setCouponApplied(null);
      setCouponError(result.reason || "Código inválido");
    }
  };

  const removeCoupon = () => {
    setCouponApplied(null);
    setCouponInput("");
    setCouponError("");
  };

  const handleSubmit = async () => {
    setErrorMsg("");

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg("Completá todos los campos");
      return;
    }
    if (!email.includes("@")) {
      setErrorMsg("Email inválido");
      return;
    }
    if (phone.replace(/[^0-9]/g, "").length < 6) {
      setErrorMsg("Teléfono inválido (mín. 6 dígitos)");
      return;
    }

    const ticket: TicketData = {
      buyer_name: name.trim(),
      buyer_email: email.trim().toLowerCase(),
      buyer_phone: phone.trim(),
      quantity,
      tier: selectedTier,
      total_pyg: total,
      opted_in_marketing: marketing,
    };

    if (couponApplied) {
      ticket.coupon_code = couponApplied.code;
      ticket.discount_applied = discountAmount;
    }

    const result = await purchaseTicket(ticket);
    if (!result.success) {
      setErrorMsg(result.error || "Error al procesar. Intentá de nuevo.");
      return;
    }

    let msg = `🎭 *Nueva compra — Club maškaráda*\n\n`;
    msg += `👤 ${name.trim()}\n`;
    msg += `📧 ${email.trim()}\n`;
    msg += `📱 ${phone.trim()}\n`;
    msg += `\n🎟️ *${quantity}x ${TIER_CONFIG[selectedTier].label}*\n`;
    msg += `💰 *Gs. ${formatPrice(finalTotal)}*`;
    if (couponApplied) {
      msg += ` (desc. ${
        couponApplied.discount_type === "percentage"
          ? couponApplied.discount_value + "%"
          : "Gs. " + formatPrice(couponApplied.discount_value)
      })\n`;
      msg += `🏷️ Cupón: ${couponApplied.code}`;
    }
    msg += `\n\n📌 Pendiente de pago`;

    setTicketLink(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`);
    setStep("done");
  };

  const resetForm = () => {
    setStep("select");
    setSelectedTier("early_bird");
    setQuantity(1);
    setName("");
    setEmail("");
    setPhone("");
    setMarketing(true);
    setCouponInput("");
    setCouponApplied(null);
    setCouponError("");
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-5xl block mb-4">🎭</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Entradas</h1>
          <p className="text-gray-400">
            Jueves 11 de junio, 2026 • Eligio Ayala 1073, Asunción
          </p>
          <p className="text-gold-400 text-sm mt-2">🔞 +18 — Se requiere documento de identidad</p>
        </div>

        {step === "select" && (
          <>
            {capacity.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-8 text-xs">
                {capacity
                  .filter((c) => c.tier !== "total")
                  .map((cap) => {
                    const remaining = cap.max_quantity - cap.sold_so_far;
                    return (
                      <div
                        key={cap.tier}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-400"
                      >
                        {TIER_CONFIG[cap.tier as TicketTier]?.label || cap.tier}:{" "}
                        <span className="text-white font-medium">{remaining}</span> cupos{" "}
                        {remaining === 1 ? "disponible" : "disponibles"}
                      </div>
                    );
                  })}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {(Object.entries(TIER_CONFIG) as [TicketTier, typeof TIER_CONFIG[TicketTier]][]).map(
                ([tier, cfg]) => {
                  const remaining = getRemainingForTier(tier);
                  const soldOut = remaining <= 0;
                  return (
                    <button
                      key={tier}
                      onClick={() => !soldOut && selectTier(tier)}
                      disabled={soldOut}
                      className={`relative bg-white/5 border rounded-xl p-6 text-center transition-all group ${
                        soldOut
                          ? "border-red-900/30 opacity-50 cursor-not-allowed"
                          : "border-white/10 hover:border-gold-400/50 hover:bg-white/10 cursor-pointer"
                      }`}
                    >
                      {soldOut && (
                        <div className="absolute top-3 right-3 text-xs bg-red-900/50 text-red-300 px-2 py-0.5 rounded-full">
                          Agotado
                        </div>
                      )}
                      <div className="text-3xl mb-3">
                        {soldOut ? "❌" : TIER_EMOJI[tier]}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">{cfg.label}</h3>
                      <p className="text-2xl font-bold text-gold-400 mb-2">
                        Gs. {formatPrice(cfg.price)}
                      </p>
                      <p className="text-xs text-gray-500">{cfg.description}</p>
                      {!soldOut && remaining > 0 && remaining < 10 && (
                        <p className="text-xs text-yellow-400 mt-2">
                          ⚠️ Solo {remaining} {remaining === 1 ? "cupo" : "cupos"}
                        </p>
                      )}
                    </button>
                  );
                }
              )}
            </div>

            <div className="text-center text-sm text-gray-500 space-y-1">
              <p>🎭 Cupos limitados — entrada solo con reserva previa</p>
              <p>💳 Pago por transferencia bancaria — te enviamos los datos por WhatsApp</p>
              <p>❌ No se realizan reembolsos. Transferible con aviso previo.</p>
            </div>
          </>
        )}

        {step === "form" && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Tus datos</h2>
              <button
                onClick={() => setStep("select")}
                className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                ← Volver
              </button>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-300 font-medium">
                    {TIER_CONFIG[selectedTier].label}
                  </p>
                  <p className="text-xs text-gray-600">{TIER_CONFIG[selectedTier].description}</p>
                </div>
                <p className="text-sm text-gray-400">
                  {quantity} × Gs. {formatPrice(TIER_CONFIG[selectedTier].price)}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                  className={`w-10 h-10 rounded-full bg-white/10 text-white transition-colors ${
                    quantity <= 1
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:bg-white/20 cursor-pointer"
                  }`}
                >
                  −
                </button>
                <span className="text-white font-bold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                  disabled={quantity >= 10}
                  className={`w-10 h-10 rounded-full bg-white/10 text-white transition-colors ${
                    quantity >= 10
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:bg-white/20 cursor-pointer"
                  }`}
                >
                  +
                </button>
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 space-y-1 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>Gs. {formatPrice(total)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-400">
                    <span>
                      Descuento (
                      {couponApplied.discount_type === "percentage"
                        ? `${couponApplied.discount_value}%`
                        : `Gs. ${formatPrice(couponApplied.discount_value)}`}
                      )
                    </span>
                    <span>-Gs. {formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-bold pt-1 border-t border-white/10">
                  <span>Total</span>
                  <span>Gs. {formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>

            <div className="mb-6 p-3 bg-white/5 border border-white/10 rounded-lg">
              {couponApplied ? (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-green-400 text-sm font-medium">
                      ✅ Cupón &quot;{couponApplied.code}&quot; aplicado
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {couponApplied.discount_type === "percentage"
                        ? `${couponApplied.discount_value}% de descuento`
                        : `Gs. ${formatPrice(couponApplied.discount_value)} de descuento`}
                    </p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-gray-500 hover:text-white transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                    placeholder="Código de descuento"
                    className="flex-1 bg-transparent border-b border-white/20 px-2 py-1 text-sm text-white placeholder:text-gray-600 focus:border-gold-400/50 focus:outline-none"
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={couponLoading || !couponInput.trim()}
                    className={`text-xs bg-gold-400/20 text-gold-400 px-3 py-1 rounded hover:bg-gold-400/30 transition-colors ${
                      couponLoading || !couponInput.trim()
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {couponLoading ? "..." : "Aplicar"}
                  </button>
                </div>
              )}
              {couponError && <p className="text-xs text-red-400 mt-1">{couponError}</p>}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nombre completo</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-gold-400/50 focus:outline-none transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-gold-400/50 focus:outline-none transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Teléfono (WhatsApp)</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-gold-400/50 focus:outline-none transition-colors"
                  placeholder="+595 981 234 567"
                />
              </div>
              <div className="flex items-start gap-3">
                <input
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  type="checkbox"
                  id="marketing"
                  className="mt-1 accent-gold-400"
                />
                <label htmlFor="marketing" className="text-sm text-gray-500">
                  Quiero recibir info sobre futuros eventos maškaráda
                </label>
              </div>
            </div>

            {errorMsg && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-sm text-red-300">
                {errorMsg}
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full mt-6 bg-gold-400/90 hover:bg-gold-400 text-black font-bold py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-gold-400/20 cursor-pointer"
            >
              Solicitar entrada — Gs. {formatPrice(finalTotal)}
            </button>

            <p className="mt-4 text-xs text-gray-600 text-center">
              Te contactamos por WhatsApp con los datos de pago. Una vez confirmado, tenés tu
              entrada asegurada.
            </p>
          </div>
        )}

        {step === "done" && (
          <div className="max-w-lg mx-auto text-center bg-white/5 border border-white/10 rounded-xl p-8">
            <span className="text-5xl block mb-4">🎉</span>
            <h2 className="text-2xl font-bold text-white mb-3">Solicitud recibida</h2>
            <p className="text-gray-400 mb-2">
              Tu reserva está <strong className="text-yellow-400">pendiente de pago</strong>.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Abrí WhatsApp para recibir los datos de transferencia. Una vez acreditado, te
              confirmamos y te enviás tu QR de ingreso.
            </p>
            <a
              href={ticketLink}
              target="_blank"
              rel="noopener"
              className="inline-block bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-3 rounded-lg transition-all mb-4"
            >
              💬 Abrir WhatsApp
            </a>
            <p className="text-sm text-gray-500">
              Si no abrió automáticamente,{" "}
              <a href={ticketLink} target="_blank" rel="noopener" className="text-gold-400 hover:underline">
                hacé clic acá
              </a>
            </p>
            <button
              onClick={resetForm}
              className="mt-6 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer block mx-auto"
            >
              ← Comprar más entradas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
