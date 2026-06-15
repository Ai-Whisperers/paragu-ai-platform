"use client";

import { useState } from "react";
import { content } from "@/lib/content";

export default function VendorAplicar() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vendorSlug, setVendorSlug] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("ropes");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [productCount, setProductCount] = useState("1-5");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const CATEGORIES = [
    { value: "ropes", label: "Cuerdas (shibari, bondage)" },
    { value: "impact", label: "Impacto (palas, fustas, varillas)" },
    { value: "sensory", label: "Sensorial (vendas, plumas, texturas)" },
    { value: "leather", label: "Cuero y arneses" },
    { value: "apparel", label: "Indumentaria fetish/latex" },
    { value: "wellness", label: "Bienestar (aceites, aftercare)" },
    { value: "workshops", label: "Workshops / clases" },
    { value: "media", label: "Editorial (zines, libros, fotografía)" },
    { value: "other", label: "Otro" },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !email.trim() || !phone.trim() || !vendorName.trim() || !description.trim()) {
      setErrorMsg("Completá los campos obligatorios");
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

    setSubmitting(true);
    try {
      // Persist to Supabase mk_vendors table (with status=pending).
      // The mk_vendors table is created by hand via the Supabase SQL editor
      // (see docs/community-platform-plan.md §Supabase schema additions).
      // Once the table exists, this insert Just Works; until then we
      // fall through to the success state so the form UX is testable.
      const { getSupabaseClient } = await import("@/lib/supabase-admin");
      const supabase = getSupabaseClient();
      if (supabase) {
        const payload = {
          owner_name: name.trim(),
          owner_email: email.trim().toLowerCase(),
          owner_phone: phone.trim(),
          name: vendorName.trim(),
          slug:
            vendorSlug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") ||
            vendorName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          tagline: tagline.trim(),
          description: description.trim(),
          category,
          instagram: instagram.trim() || null,
          website: website.trim() || null,
          product_count: productCount,
          status: "pending",
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await supabase.from("mk_vendors").insert(payload as any);
        if (error) {
          setErrorMsg(`Error al enviar: ${error.message}. Intentá de nuevo o escribinos por WhatsApp.`);
          setSubmitting(false);
          return;
        }
      }
      setSuccess(true);
    } catch (err) {
      setErrorMsg(`Error inesperado: ${(err as Error).message}. Intentá de nuevo.`);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-2xl mx-auto text-center bg-white/5 border border-white/10 rounded-xl p-8">
          <span className="text-5xl block mb-4">✨</span>
          <h1 className="text-2xl font-bold text-white mb-3">Aplicación recibida</h1>
          <p className="text-gray-300 mb-2">
            Gracias por tu interés en ser parte de la tienda de la comunidad maškaráda.
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Revisamos las aplicaciones a mano. Te contactamos por email o WhatsApp en los
            próximos 7-10 días con la aprobación y los próximos pasos.
          </p>
          <a
            href="/tienda"
            className="inline-block border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all"
          >
            Volver a la tienda
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🏪</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Aplicar como vendor
          </h1>
          <p className="text-gray-400">
            La tienda maškaráda está abierta a miembros de la comunidad que quieran ofrecer
            productos o servicios. Aplicación revisada a mano por el equipo.
          </p>
        </div>

        <div className="border border-gold-400/20 rounded-xl p-4 bg-gold-400/5 text-sm text-gray-400 mb-6">
          <p className="font-semibold text-gold-400 mb-1">Antes de aplicar</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-400">
            <li>La tienda es para productos y servicios de la comunidad kink (rope, leather, latex, workshops, etc.)</li>
            <li>Los productos deben ser originales o de fabricación propia / curación curada</li>
            <li>Los precios están en guaraníes paraguayos. La comisión de la plataforma se discute caso a caso</li>
            <li>El primer pago se procesa por transferencia bancaria o WhatsApp. Stripe se integrará en Fase 4</li>
            <li>Las fotos profesionales o semi-profesionales de productos aumentan mucho la conversión</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white/[0.02] border border-white/5 rounded-xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Tu nombre *</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20"
                placeholder="Tu nombre completo" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Email *</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20"
                placeholder="tu@email.com" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Teléfono / WhatsApp *</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" required
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20"
              placeholder="+595 981 000 000" />
          </div>

          <div className="border-t border-white/10 pt-5">
            <h3 className="text-sm font-semibold text-white mb-3">Sobre tu tienda</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Nombre de la tienda *</label>
                <input value={vendorName} onChange={(e) => setVendorName(e.target.value)} required
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20"
                  placeholder="Moñai Ropes" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Categoría</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/60">
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Tagline (una línea)</label>
              <input value={tagline} onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20"
                placeholder="Cuerdas shobari artesanales, hechas a mano en Asunción" />
            </div>

            <div className="mt-4">
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Descripción *</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20 resize-none"
                placeholder="Contanos sobre tu tienda: qué productos ofrecés, qué te diferencia, qué tipo de clientela atendés..." />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Instagram</label>
                <input value={instagram} onChange={(e) => setInstagram(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20"
                  placeholder="@tutienda" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Sitio web</label>
                <input value={website} onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20"
                  placeholder="https://" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Cantidad de productos</label>
                <select value={productCount} onChange={(e) => setProductCount(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/60">
                  <option>1-5</option>
                  <option>6-20</option>
                  <option>21-50</option>
                  <option>50+</option>
                </select>
              </div>
            </div>
          </div>

          {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-6 bg-blood-500 hover:bg-blood-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all text-sm uppercase tracking-wider"
          >
            {submitting ? "Enviando..." : "Enviar aplicación"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Al enviar, aceptás que el equipo revise tu aplicación y te contacte por los medios
            proporcionados. La revisión puede tomar 7-10 días.
          </p>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          ¿Dudas? Escribinos por{" "}
          <a
            href={`https://wa.me/${content.site.whatsappNumber}?text=Hola!%20Tengo%20una%20consulta%20sobre%20ser%20vendor%20en%20la%20tienda`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-400 hover:text-white underline"
          >
            WhatsApp
          </a>
          .
        </p>
      </div>
    </div>
  );
}
