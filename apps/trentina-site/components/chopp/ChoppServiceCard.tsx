'use client'
import { useState } from 'react'

interface ChoppServiceCardProps {
  title: string
  subtitle: string
  description: string
  price: string
  priceUnit: string
  features: string[]
  image: string
  whatsappText: string
}

export default function ChoppServiceCard({
  title, subtitle, description, price, priceUnit, features, image, whatsappText
}: ChoppServiceCardProps) {
  const [showModal, setShowModal] = useState(false)

  const whatsappNumber = '595983224473'
  const encoded = encodeURIComponent(whatsappText)
  const waLink = `https://wa.me/${whatsappNumber}?text=${encoded}`

  return (
    <>
      <div className="group relative bg-trentina-dark/60 border border-trentina-gold/10 rounded-xl overflow-hidden hover:border-trentina-gold/30 transition-all duration-300">
        {/* Image */}
        <div className="relative h-48 bg-trentina-dark/80 flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-trentina-dark via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-trentina-gold mb-1">{title}</h3>
          <p className="text-xs text-trentina-gold/60 mb-3">{subtitle}</p>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">{description}</p>

          {/* Features */}
          <ul className="space-y-1.5 mb-5">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-gray-300">
                <svg className="w-3.5 h-3.5 text-trentina-gold flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5L19 7" stroke="#D4922E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {f}
              </li>
            ))}
          </ul>

          {/* Price */}
          <div className="flex items-end justify-between border-t border-trentina-gold/10 pt-4">
            <div>
              <span className="text-xl font-black text-trentina-gold">{price}</span>
              <span className="block text-xs text-gray-500">{priceUnit}</span>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-trentina-gold text-black text-sm font-bold rounded-lg hover:bg-trentina-gold/90 transition-colors btn-press"
            >
              Pedir
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative bg-trentina-dark border border-trentina-gold/20 rounded-2xl p-8 max-w-md w-full animate-wa-modal">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-white text-xl"
            >
              ×
            </button>
            <div className="text-center">
              <img src="/images/icons/whatsapp-icon.svg" alt="WhatsApp" className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-black text-trentina-gold mb-2">{title}</h3>
              <p className="text-gray-400 text-sm mb-6">
                Completá tu pedido vía WhatsApp y te respondemos en minutos.
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowModal(false)}
                className="block w-full py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bd5a] transition-colors text-center"
              >
                Continuar por WhatsApp
              </a>
              <p className="text-xs text-gray-600 mt-3">Respuesta en menos de 30 minutos</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
