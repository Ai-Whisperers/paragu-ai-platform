import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react'
import content from '@/content/es.json'

export default function Contact() {
  const { contact, cta } = content.home

  return (
    <section id="contacto" className="section-padding" style={{ backgroundColor: 'var(--color-mercado)' }}>
      <div className="container-max">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-4">
            {contact.title}
          </h2>
          <p className="font-[var(--font-body)] text-lg text-white/80 max-w-xl mx-auto">
            {contact.subtitle}
          </p>
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left side: CTA banner */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 text-center border border-white/20">
            <h3 className="font-[var(--font-heading)] text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
              {cta.title}
            </h3>

            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-[var(--color-mercado)] font-[var(--font-body)] font-semibold text-base hover:bg-[var(--color-crema)] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              {cta.button}
            </a>
          </div>

          {/* Right side: Contact details */}
          <div className="space-y-5">
            {/* WhatsApp */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/20">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-[var(--font-body)] text-xs text-white/70 uppercase tracking-wider">WhatsApp</p>
                <p className="font-[var(--font-body)] text-sm font-semibold text-white">{contact.whatsapp}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/20">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-[var(--font-body)] text-xs text-white/70 uppercase tracking-wider">Email</p>
                <p className="font-[var(--font-body)] text-sm font-semibold text-white">{contact.email}</p>
              </div>
            </div>

            {/* Cobertura */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/20">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-[var(--font-body)] text-xs text-white/70 uppercase tracking-wider">Cobertura</p>
                <p className="font-[var(--font-body)] text-sm font-semibold text-white">{contact.city}</p>
              </div>
            </div>

            {/* Horarios */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/20">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-[var(--font-body)] text-xs text-white/70 uppercase tracking-wider">Horarios</p>
                <p className="font-[var(--font-body)] text-sm font-semibold text-white">{contact.hours}</p>
                <p className="font-[var(--font-body)] text-xs text-white/80">{contact.delivery}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
