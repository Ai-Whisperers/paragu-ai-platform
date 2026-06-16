// /en/contact page
import { notFound } from "next/navigation"
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react"
import en from "@/content/en/contact.json"
import es from "@/content/es/contacto.json"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

export function generateStaticParams() {
  return LOCALES.map(l => ({ locale: l }))
}

export const metadata = { title: "Contact" }

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const base = `/${locale}`

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl sm:text-6xl font-bold mb-3">{c.title || "Contact"}</h1>
      {c.subtitle && <p className="text-xl text-gray-600 mb-12">{c.subtitle}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {c.business?.phone && !String(c.business.phone).includes("PENDING") && (
          <a href={`tel:${c.business.phone}`} className="p-6 bg-white border border-gray-200 rounded-xl hover:border-[var(--accent)] transition-colors flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">📞</div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Phone</div>
              <div className="font-semibold">{c.business.phone}</div>
            </div>
          </a>
        )}

        {c.business?.whatsapp && !String(c.business.whatsapp).includes("PENDING") && (
          <a href={`https://wa.me/${String(c.business.whatsapp).replace(/\D/g, "")}?text=${encodeURIComponent(c.business.whatsappMessage || "")}`} className="p-6 bg-white border border-gray-200 rounded-xl hover:border-[var(--accent)] transition-colors flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center"><MessageCircle className="w-6 h-6" /></div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">WhatsApp</div>
              <div className="font-semibold">{c.business.whatsapp}</div>
            </div>
          </a>
        )}

        {c.business?.email && (
          <a href={`mailto:${c.business.email}`} className="p-6 bg-white border border-gray-200 rounded-xl hover:border-[var(--accent)] transition-colors flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center"><Mail className="w-6 h-6" /></div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Email</div>
              <div className="font-semibold">{c.business.email}</div>
            </div>
          </a>
        )}

        {c.business?.address && !String(c.business.address).includes("TBD") && (
          <div className="p-6 bg-white border border-gray-200 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center"><MapPin className="w-6 h-6" /></div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Address</div>
              <div className="font-semibold">{c.business.address}</div>
            </div>
          </div>
        )}

        {c.openingHours && (
          <div className="p-6 bg-white border border-gray-200 rounded-xl md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-[var(--accent)]" />
              <h2 className="text-lg font-bold">{c.openingHours.title || "Opening Hours"}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
              {Object.entries(c.openingHours).filter(([k]) => k !== 'title').map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="text-gray-500 uppercase text-xs">{day}</span>
                  <span className="font-mono">{String(hours)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {c.form_note && (
        <div className="mt-12 p-8 bg-gray-50 rounded-2xl">
          <p className="text-center text-gray-600">{c.form_note}</p>
        </div>
      )}
    </div>
  )
}
