'use client'

import es from '@/content/es.json'
import { useEffect, useRef } from 'react'

export default function MuralesPage() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const locations = es.murales.locations as any[]
  const mapInitialized = useRef(false)

  useEffect(() => {
    if (mapInitialized.current || !mapContainer.current) return
    mapInitialized.current = true
    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })
      if (!mapContainer.current) return
      const map = L.map(mapContainer.current).setView([-25.28, -57.58], 6)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)
      locations.forEach((loc: any) => {
        const marker = L.marker([loc.lat, loc.lng]).addTo(map)
        marker.bindPopup(`<div style="font-family:sans-serif;max-width:200px;font-size:12px"><strong>${loc.title}</strong><br/><span style="font-size:11px;color:#666">${loc.address}</span><br/><span style="font-size:10px;color:#999">${loc.year}</span></div>`)
      })
      if (locations.length > 0) {
        const bounds = L.latLngBounds(locations.map((l: any) => [l.lat, l.lng]))
        map.fitBounds(bounds, { padding: [50, 50] })
      }
    })
  }, [])

  return (
    <>
      <section className="pt-24 sm:pt-32 pb-8">
        <div className="container-art">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="section-title mb-4">{es.murales.title}</h1>
            <p className="section-subtitle mx-auto text-sm sm:text-base">{es.murales.description}</p>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="container-art">
          <div className="rounded-2xl overflow-hidden border border-zinc-800/50 mx-4 sm:mx-0">
            <div ref={mapContainer} className="w-full h-[40vh] sm:h-[60vh] md:h-[70vh]" style={{ background: '#18181b' }} />
          </div>
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-0">
            {locations.map((loc: any) => (
              <div key={loc.id} className="glass-panel p-3 sm:p-4 flex items-start gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-zinc-800 flex-shrink-0 flex items-center justify-center">
                  <span className="text-base sm:text-lg">📍</span>
                </div>
                <div>
                  <h4 className="font-medium text-xs sm:text-sm">{loc.title}</h4>
                  <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">{loc.address}</p>
                  <p className="text-[10px] sm:text-xs text-amber-500 mt-0.5">{loc.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
