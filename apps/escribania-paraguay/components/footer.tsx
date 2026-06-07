import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import content from '@/content/es.json'

export default function Footer() {
  const footer = content.footer

  return (
    <footer className="bg-primary text-white">
      <div className="container-page section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <h3 className="font-heading text-xl font-bold mb-4">
              {footer.businessName}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {footer.tagline}
            </p>
          </div>

          {/* Service links columns */}
          {footer.columns.map((col, i) => (
            <div key={i}>
              <h4 className="font-accent font-semibold text-sm uppercase tracking-wider text-accent mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-accent text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h4 className="font-accent font-semibold text-sm uppercase tracking-wider text-accent mb-4">
              Contacto
            </h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                <span>{footer.contact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0 text-accent" />
                <span>{footer.contact.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0 text-accent" />
                <span>{footer.contact.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                <span>{footer.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/50 text-xs">
          <p>{footer.copyright}</p>
          <p>{footer.madeBy}</p>
        </div>
      </div>
    </footer>
  )
}
