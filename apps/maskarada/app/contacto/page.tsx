"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Contacto() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccess(false);

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg("Completá todos los campos");
      return;
    }
    if (!email.includes("@")) {
      setErrorMsg("Email inválido");
      return;
    }
    if (phone.replace(/[^0-9]/g, "").length < 6) {
      setErrorMsg("Teléfono inválido");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("mk_marketing_list").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      source: "form",
      notes: message.trim(),
    });
    setLoading(false);

    if (error) {
      setErrorMsg("Error al enviar el mensaje. Intentá de nuevo o escribinos por WhatsApp.");
      console.error("Contact form error:", error);
      return;
    }

    setSuccess(true);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  }

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Contacto</h1>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-6" />
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Estamos acá para escucharte. Mandanos un mensaje o encontranos en redes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="https://www.instagram.com/maskarada.py/"
                target="_blank"
                rel="noopener"
                className="flex flex-col items-center gap-3 p-5 border border-white/10 rounded-xl bg-white/[0.02] hover:border-gold-400/40 hover:bg-white/[0.04] transition-all group"
              >
                <span className="text-3xl text-gold-400 group-hover:scale-110 transition-transform">
                  📸
                </span>
                <div className="text-center">
                  <h3 className="text-sm font-medium text-white">Instagram</h3>
                  <p className="text-xs text-gold-400">@maskarada.py</p>
                  <p className="text-xs text-gray-500 mt-1">Consultas rápidas</p>
                </div>
              </a>

              <a
                href="https://wa.me/595981200255"
                target="_blank"
                rel="noopener"
                className="flex flex-col items-center gap-3 p-5 border border-[#25D366]/30 rounded-xl bg-[#25D366]/[0.03] hover:border-[#25D366] hover:bg-[#25D366]/[0.06] transition-all group relative"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">💬</span>
                <div className="text-center">
                  <h3 className="text-sm font-medium text-white">WhatsApp</h3>
                  <p className="text-xs text-[#25D366]">+595 981 200255</p>
                  <p className="text-xs text-gray-500 mt-1">Reservas y consultas</p>
                </div>
                <span className="absolute -top-2 -right-2 bg-[#25D366] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Directo
                </span>
              </a>

              <a
                href="mailto:weissvanderpol.ivan@gmail.com"
                className="flex flex-col items-center gap-3 p-5 border border-white/10 rounded-xl bg-white/[0.02] hover:border-gold-400/40 hover:bg-white/[0.04] transition-all group"
              >
                <span className="text-3xl text-gold-400 group-hover:scale-110 transition-transform">
                  📧
                </span>
                <div className="text-center">
                  <h3 className="text-sm font-medium text-white">Email</h3>
                  <p className="text-xs text-gray-400 truncate max-w-[130px]">
                    weissvanderpol.ivan@gmail.com
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Sponsorship y colab.</p>
                </div>
              </a>
            </div>

            <a
              href="https://wa.me/595981200255?text=Hola%21+Queremos+consultar+sobre+Club+ma%C5%A1kar%C3%A1da"
              target="_blank"
              rel="noopener"
              className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold rounded-xl transition-all shadow-lg shadow-[#25D366]/20"
            >
              <span className="text-xl">💬</span>
              <span>Escribinos directo por WhatsApp</span>
              <span className="text-lg">→</span>
            </a>

            <div className="border border-white/10 rounded-xl bg-white/[0.02] p-6">
              <h2 className="text-lg font-semibold text-white mb-1">Mandanos un mensaje</h2>
              <p className="text-xs text-gray-500 mb-6">Te respondemos a la brevedad</p>

              {success ? (
                <div className="p-4 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 text-center">
                  <p className="text-[#25D366] font-medium">¡Mensaje enviado con éxito!</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Te vamos a responder pronto. Mientras tanto, seguinos en Instagram.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs text-gray-400 mb-1 uppercase tracking-wider"
                    >
                      Nombre
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20 transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs text-gray-400 mb-1 uppercase tracking-wider"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20 transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs text-gray-400 mb-1 uppercase tracking-wider"
                    >
                      Teléfono / WhatsApp
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+595 981 000000"
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20 transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs text-gray-400 mb-1 uppercase tracking-wider"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="¿En qué podemos ayudarte?"
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20 transition-all resize-none"
                    />
                  </div>

                  {errorMsg && <p className="text-red-400 text-xs">{errorMsg}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-6 bg-blood-500 hover:bg-blood-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all text-sm uppercase tracking-wider"
                  >
                    {loading ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="border border-white/10 rounded-xl bg-white/[0.02] p-6">
              <h2 className="text-lg font-semibold text-white mb-1">Colaboraciones</h2>
              <p className="text-xs text-gray-500 mb-4">Sumate al proyecto</p>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                ¿Tenés un emprendimiento, sos artista, performer, DJ, o querés sponsorear el
                evento? Estamos abiertos a colaboraciones.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  "Performances y shows en vivo",
                  "DJ sets y música",
                  "Body painting y arte",
                  "Emprendimientos eróticos/kink",
                  "Fotografía y contenido",
                ].map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <span className="text-gold-400">✦</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-white/10 rounded-xl bg-white/[0.02] p-6">
              <h2 className="text-lg font-semibold text-white mb-1">Ubicación</h2>
              <p className="text-xs text-gray-500 mb-4">Donde encontrarnos</p>
              <div className="rounded-lg overflow-hidden border border-white/10 mb-4 bg-black/40 aspect-[16/9]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.6400812540716!2d-57.634379!3d-25.283746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE3JzAxLjUiUyA1N8KwMzgnMDMuNyJX!5e0!3m2!1ses!2spy!4v1!4m1!1sEligio%2BAyala%2B1073%2BAsunci%C3%B3n"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 200 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Club maškaráda"
                />
              </div>
              <div className="space-y-1 mb-4">
                <p className="text-sm text-gray-300">Eligio Ayala 1073</p>
                <p className="text-sm text-gray-400">Asunción, Paraguay</p>
              </div>
              <a
                href="https://maps.google.com/?q=Eligio+Ayala+1073+Asunción"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors"
              >
                <span>↗</span>
                <span>Abrir en Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
