"use client";

import { useState } from "react";
import Link from "next/link";

const rules = [
  {
    id: "r1",
    emoji: "1️⃣",
    title: "Consentimiento absoluto",
    summary: "No significa no. El consentimiento se negocia antes, se mantiene durante y se puede retirar en cualquier momento.",
    detail:
      "«No» significa «no». Silencio significa «no». Dudas significa «no». El consentimiento se negocia antes de cualquier actividad, se mantiene durante y se puede retirar en cualquier momento con solo decirlo. Usá la palabra de seguridad si la necesitás. No asumas nada — preguntá siempre. Cada interacción requiere consentimiento explícito, independientemente de interacciones previas.",
  },
  {
    id: "r2",
    emoji: "2️⃣",
    title: "+18 exclusivo",
    summary: "Se requiere documento de identidad para ingresar.",
    detail:
      "Se requiere documento de identidad original (físico o digital) para ingresar. Menores de 18 no pueden acceder bajo ninguna circunstancia. No se aceptan fotografías del documento. El acceso será denegado sin excepción si no podés acreditar tu edad.",
  },
  {
    id: "r3",
    emoji: "3️⃣",
    title: "No fotos ni videos",
    summary: "Prohibido tomar fotos o videos sin consentimiento explícito de todos los involucrados.",
    detail:
      "Está terminantemente prohibido tomar fotos o videos dentro del evento sin consentimiento explícito de todas las personas involucradas. Teléfonos celulares deben permanecer guardados en las zonas de juego. Hay un fotógrafo oficial identificado — cualquier otra cámara profesional debe ser autorizada por la organización. Lo que pasa en maškaráda, se queda en maškaráda.",
  },
  {
    id: "r4",
    emoji: "4️⃣",
    title: "Respeto a los límites",
    summary: "No tocar a nadie sin permiso explícito.",
    detail:
      "No tocar a nadie sin permiso explícito y verbal. Esto incluye el espacio personal, disfraces, atuendos, collares, arneses y accesorios de otras personas. Si alguien te dice que pares, parás — sin discusión, sin preguntar «por qué», sin negociar. La palabra de otra persona es ley.",
  },
  {
    id: "r5",
    emoji: "5️⃣",
    title: "Dresscode",
    summary: "Temática masquerade, dark, leather, lace, latex, fetish. No se permite ropa casual.",
    detail:
      "El dresscode es parte de la experiencia. Temática: masquerade, dark, leather, lace, latex, fetish, fantasía. No se permite ropa casual: jeans, remeras comunes, jogging, chancletas, ropa deportiva. Si no sabés qué ponerte, consultanos antes por Instagram o WhatsApp. El ingreso puede ser denegado si no cumplís con el dresscode.",
  },
  {
    id: "r6",
    emoji: "6️⃣",
    title: "Sustancias",
    summary: "No se permite alcohol en exceso ni drogas ilegales.",
    detail:
      "No se permite el consumo de alcohol en exceso ni drogas ilegales dentro del evento. El consumo responsable aplica a todas las actividades. Personas visiblemente intoxicadas no podrán ingresar ni permanecer en el evento. La organización se reserva el derecho de solicitar el retiro de cualquier persona que considere en estado de intoxicación.",
  },
  {
    id: "r7",
    emoji: "7️⃣",
    title: "Privacidad",
    summary: "No compartas información de otros asistentes fuera del evento.",
    detail:
      "No compartas información personal, fotos, o datos de otros asistentes fuera del evento. No etiquetes a nadie en redes sociales sin su permiso explícito. No reveles identidades de personas que hayan asistido con máscara. La confidencialidad es parte fundamental del juego y de la confianza que construimos como comunidad.",
  },
  {
    id: "r8",
    emoji: "8️⃣",
    title: "Palabra de seguridad",
    summary: "La palabra de seguridad universal es «ROJO» —detiene toda actividad de inmediato.",
    detail:
      "La palabra de seguridad universal del evento es «ROJO». Cuando alguien dice «ROJO», toda actividad se detiene inmediatamente, sin preguntas. Si escuchás «ROJO» en cualquier zona del evento, parás lo que estás haciendo y verificás que la persona esté bien. También podés usar el semáforo: «VERDE» (seguí), «AMARILLO» (bajá un cambio, revisemos), «ROJO» (pará todo ahora).",
  },
];

export default function Reglas() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Reglas del Club</h1>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-4" />
          <p className="text-gray-400">
            Este espacio existe gracias al respeto mutuo. Leé las reglas antes de asistir.
          </p>
        </div>

        <div className="p-6 mb-10 border border-blood-500/30 rounded-xl bg-gradient-to-br from-blood-500/10 to-transparent text-center">
          <div className="text-4xl mb-3">🤝</div>
          <h2 className="text-lg font-bold text-white mb-2">SSC / RACK</h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            Todo en maškaráda se rige por los principios de{" "}
            <strong className="text-gold-400">SSC</strong> (Sano, Seguro y Consensuado) y{" "}
            <strong className="text-gold-400">RACK</strong> (Risk-Aware Consensual Kink). El
            consentimiento es la base de todo.
          </p>
          <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1">🟢 Sano</span>
            <span className="flex items-center gap-1">🟡 Seguro</span>
            <span className="flex items-center gap-1">🔴 Consensuado</span>
          </div>
        </div>

        <div className="space-y-3">
          {rules.map((rule) => (
            <button
              key={rule.id}
              onClick={() => setExpanded(expanded === rule.id ? null : rule.id)}
              className="w-full text-left border border-white/10 rounded-xl bg-white/[0.02] hover:border-blood-500/30 hover:bg-white/[0.04] transition-all duration-200 cursor-pointer overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <span className="text-2xl shrink-0">{rule.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white mb-1">{rule.title}</h3>
                    <p className="text-sm text-gray-400">{rule.summary}</p>
                  </div>
                  <span
                    className={`text-gold-400 text-lg shrink-0 mt-1 transition-transform duration-300 ${
                      expanded === rule.id ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </div>
              </div>
              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: expanded === rule.id ? "500px" : "0" }}
              >
                <div className="px-5 pb-5 pl-[4.25rem]">
                  <div className="w-full h-px bg-white/5 mb-3" />
                  <p className="text-sm text-gray-500 leading-relaxed">{rule.detail}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 p-6 border border-white/10 rounded-xl bg-white/[0.02]">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              type="checkbox"
              className="mt-0.5 accent-gold-400 w-4 h-4 cursor-pointer"
            />
            <div>
              <p className="text-sm font-medium text-white">
                Acepto las reglas del Club maškaráda
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Confirmo que leí y acepto el código de conducta del evento. Entiendo que el
                incumplimiento de estas reglas puede resultar en mi expulsión sin reembolso.
              </p>
            </div>
          </label>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/entradas"
            className={`bg-blood-500 hover:bg-blood-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all hover:glow-red ${
              !acknowledged ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Comprar entradas
          </Link>
          <Link
            href="/contacto"
            className="border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-8 py-3 rounded-full text-sm uppercase tracking-widest transition-all"
          >
            Consultar
          </Link>
        </div>

        <div className="mt-12 p-6 border border-blood-500/30 rounded-xl bg-blood-500/5 text-center">
          <p className="text-gray-300 text-sm">
            Ante cualquier situación, buscá a un organizador. Estamos acá para asegurarnos de que
            todos tengan una experiencia increíble y segura.
          </p>
        </div>
      </div>
    </div>
  );
}
