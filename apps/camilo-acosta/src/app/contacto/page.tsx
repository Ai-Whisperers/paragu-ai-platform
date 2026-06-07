"use client";

import { useState } from "react";
import { Send, Mail, CheckCircle } from "lucide-react";
import MainLayout from "../../components/MainLayout";

const contactTypes = [
  { id: "booking", label: "Booking / Shows", icon: "🎤", description: "Stand up en teatros, bares, festivales, eventos corporativos o privados." },
  { id: "prensa", label: "Prensa / Medios", icon: "📰", description: "Entrevistas, notas, podcasts, TV, radio y cobertura cultural." },
  { id: "marcas", label: "Colaboraciones / Marcas", icon: "🤝", description: "Activaciones compatibles con el personaje y su público." },
  { id: "general", label: "General", icon: "💬", description: "Cualquier otra consulta sobre El Gato Siamés." },
];

const socials = [
  { name: "Instagram", handle: "@el.gatosiames", href: "https://www.instagram.com/el.gatosiames/" },
];

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "sending" | "success">("idle");
  const [selectedType, setSelectedType] = useState("general");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormState("success");
  };

  if (formState === "success") {
    return (
      <MainLayout>
        <section className="min-h-screen flex items-center justify-center bg-black">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">¡Mensaje enviado!</h2>
            <p className="text-white/60 mb-8">Gracias por escribir. Te respondemos lo antes posible.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {socials.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white/80 transition-all">{s.name}</a>
              ))}
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="relative py-24 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full mb-6">
            <Send className="w-4 h-4" style={{ color: "#E63946" }} />
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "#E63946" }}>Booking y prensa</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-display mb-4">
            <span style={{ color: "#E63946" }}>CONTACTO</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">Para contratar a El Gato Siamés, coordinar prensa o consultar disponibilidad.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold text-white/80 mb-6">¿Por qué tema contactás?</h2>
              {contactTypes.map((type) => (
                <button key={type.id} type="button" onClick={() => setSelectedType(type.id)} className={`w-full text-left p-4 rounded-xl border transition-all ${selectedType === type.id ? "bg-red-600/10 border-red-600/50" : "bg-white/5 border-white/10 hover:border-white/20"}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{type.icon}</span>
                    <div>
                      <div className="font-medium text-white">{type.label}</div>
                      <div className="text-sm text-white/50">{type.description}</div>
                    </div>
                  </div>
                </button>
              ))}
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl mt-6">
                <div className="text-sm text-white/40 mb-2">Red principal:</div>
                <a href="https://www.instagram.com/el.gatosiames/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium" style={{ color: "#E63946" }}>
                  <Mail className="w-4 h-4" />
                  Instagram @el.gatosiames
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-black/50 border border-white/10 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-6">Enviar mensaje</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Tu nombre</label>
                      <input type="text" name="name" required placeholder="¿Cómo te llamás?" className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Tu email</label>
                      <input type="email" name="email" required placeholder="tu@email.com" className="w-full" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Asunto</label>
                    <select name="type" className="w-full" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                      {contactTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.icon} {type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Tu mensaje</label>
                    <textarea name="message" required rows={6} placeholder="Contame fecha, ciudad, tipo de evento y presupuesto aproximado..." className="w-full resize-none" />
                  </div>
                  <button type="submit" disabled={formState === "sending"} className="w-full flex items-center justify-center gap-2 px-6 py-4 text-white font-semibold rounded-lg transition-all disabled:opacity-50" style={{ backgroundColor: "#E63946" }}>
                    {formState === "sending" ? (
                      <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Enviando...</>
                    ) : (
                      <><Send className="w-5 h-5" />Enviar mensaje</>
                    )}
                  </button>
                  <p className="text-xs text-white/30 text-center">No compartimos tu email con nadie.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
