"use client"
import content from "@/content/es.json"
const c = content as Record<string, any>

export default function Privacidad() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1A1A2E] mb-4">Política de Privacidad</h1>
      <p className="text-[#6B7280] mb-8">En Pitchy Blindex nos tomamos tu privacidad muy en serio. Esta política describe cómo recopilamos, usamos y protegemos tu información personal.</p>

      <div className="space-y-6 text-[#4A5568] text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-2">Información que recopilamos</h2>
          <p>Recopilamos la información que nos proporcionás voluntariamente al contactarnos a través de nuestros formularios o WhatsApp: nombre, empresa, email, teléfono y detalles de tu proyecto. También recopilamos datos de navegación anónimos mediante cookies de terceros (Google Analytics) para mejorar nuestro sitio.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-2">Uso de la información</h2>
          <p>Usamos tu información únicamente para: responderte consultas y cotizaciones, mejorar nuestros productos y servicios, y enviarte información relevante sobre vidrio para construcción si así lo solicitaste.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-2">Protección de datos</h2>
          <p>No compartimos tu información personal con terceros sin tu consentimiento explícito. Tus datos se almacenan de forma segura y solo son accesibles por nuestro equipo.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-2">Cookies</h2>
          <p>Este sitio utiliza cookies esenciales para el funcionamiento y cookies de análisis (Google Analytics) para entender cómo se usa el sitio. Podés gestionar tus preferencias de cookies en cualquier momento.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-2">Tus derechos</h2>
          <p>Podés solicitar la modificación o eliminación de tus datos personales en cualquier momento contactándonos por WhatsApp o email.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-2">Contacto</h2>
          <p>Si tenés preguntas sobre esta política, contactanos por WhatsApp al <strong>{c.contacto?.info?.phone || "+595 981 277 601"}</strong>.</p>
        </section>

        <p className="text-xs text-[#6B7280] mt-10 border-t border-gray-200 pt-6">Última actualización: mayo 2026. Pitchy Blindex se reserva el derecho de modificar esta política en cualquier momento.</p>
      </div>
    </div>
  )
}
