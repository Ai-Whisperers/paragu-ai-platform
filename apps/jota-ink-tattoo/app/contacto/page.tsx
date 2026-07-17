"use client"
import content from "@/content/es.json"

const c = content as Record<string, any>
const ct = c.contacto || {}

export default function Contacto() {
  return (
    <div>
      <section className="py-20 px-4 text-center"
        style={{ background: "linear-gradient(180deg, #000000 0%, #0a0a0a 100%)" }}>
        <h1 className="text-4xl sm:text-5xl font-black mb-4"
          dangerouslySetInnerHTML={{ __html: (ct.hero as any)?.headline }} />
        <p className="text-foreground/60">{(ct.hero as any)?.subheadline}</p>
      </section>

      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="grid gap-8 md:grid-cols-2">
          {/* WhatsApp */}
          <div className="rounded-xl border border-border bg-surface p-8 text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-foreground mb-2">{ct.whatsapp?.title}</h3>
            <p className="text-sm text-foreground/50 mb-6">{ct.whatsapp?.description}</p>
            <a href={ct.whatsapp?.link || "https://wa.me/595971679370"} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-6 py-3 font-semibold hover:bg-green-700 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
              </svg>
              {ct.whatsapp?.buttonText || "Escribime ahora"}
            </a>
          </div>

          {/* Instagram */}
          <div className="rounded-xl border border-border bg-surface p-8 text-center">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-xl font-bold text-foreground mb-2">{ct.social?.title}</h3>
            <p className="text-sm text-foreground/50 mb-6">Seguime en Instagram para ver mis últimos trabajos</p>
            <a href={ct.social?.instagram || "https://www.instagram.com/jottaink_/"} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 font-semibold hover:opacity-90 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              @jottaink_
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="mt-8 rounded-xl border border-border bg-surface p-8 text-center">
          <div className="text-4xl mb-4">📍</div>
          <h3 className="text-xl font-bold text-foreground mb-2">{ct.location?.title}</h3>
          <p className="text-sm text-foreground/50">{ct.location?.description}</p>
        </div>
      </section>
    </div>
  )
}
