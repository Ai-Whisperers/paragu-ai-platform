"use client"
import content from "@/content/es.json"

const c = content as any

export default function Nosotros() {
  const n = c.nosotros
  const brand = c.brand || {}
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-2">{n.title}</h1>
      <p className="text-muted-foreground text-center mb-10">{n.subtitle}</p>

      {/* The face of the business */}
      <div className="rounded-xl border border-border bg-surface p-8 text-center mb-10">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-3xl">💜</div>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          {brand.story || "Somos un emprendimiento paraguayo dedicado al bienestar íntimo con total privacidad."}
        </p>
        {brand.founded && (
          <p className="text-xs text-muted-foreground mt-4">Desde {brand.founded} · {brand.location}</p>
        )}
        {brand.founder && (
          <p className="text-sm font-medium text-foreground mt-2">Fundado por {brand.founder}</p>
        )}
      </div>

      {/* Mission */}
      {brand.mission && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-center mb-4">Nuestra Misión</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">{brand.mission}</p>
        </div>
      )}

      {/* Values */}
      <h2 className="text-2xl font-bold text-center mb-8">Nuestros Valores</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {(brand.values || n.values).map((v: any, i: number) => {
          const label = typeof v === "string" ? v : v.title
          const desc = typeof v === "string" ? "" : v.description
          return (
            <div key={i} className="rounded-xl border border-border bg-card p-6 text-center">
              <h3 className="font-semibold text-lg text-primary mb-2">{label}</h3>
              {desc && <p className="text-muted-foreground text-sm">{desc}</p>}
            </div>
          )
        })}
      </div>

      {/* About the founders */}
      <div className="mt-12 rounded-xl bg-primary/5 border border-primary/10 p-8 text-center">
        <h2 className="text-xl font-bold mb-4">¿Por qué Fun4Me?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Porque creemos que el bienestar íntimo es parte fundamental de la salud y la felicidad.
          Creemos que todas las personas merecen acceso a productos de calidad, información confiable
          y un espacio seguro para explorar su sexualidad — sin vergüenza, sin juicios y con total privacidad.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <a href="/tienda" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold no-underline text-sm hover:bg-primary/90">Ver productos</a>
          <a href="https://wa.me/595981234567?text=¡Hola!%20Quiero%20saber%20más%20sobre%20Fun4Me" target="_blank" rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold no-underline text-sm hover:bg-[#20BD5A]">
            Conversemos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
