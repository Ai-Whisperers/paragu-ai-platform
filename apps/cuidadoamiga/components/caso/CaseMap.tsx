'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { getCaseTypeLabels } from '@/lib/content'

interface Case {
  id: string
  nombre: string
  victima: string | null
  fecha: string
  tipo: 'femicidio' | 'abuso' | 'acoso'
  pais: string
  ciudad: string | null
  lat: number
  lng: number
}

interface CaseMapProps {
  cases: Case[]
}

const TYPE_COLORS: Record<Case['tipo'], string> = {
  femicidio: '#e11d48',
  abuso: '#7c3aed',
  acoso: '#db2777',
}

function makeIcon(color: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
      <path d="M14 0C6.27 0 0 6.27 0 14c0 9.33 14 22 14 22S28 23.33 28 14C28 6.27 21.73 0 14 0z"
        fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="14" cy="14" r="5" fill="white"/>
    </svg>
  `
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

const CASE_TYPE_LABELS: Record<Case['tipo'], string> = getCaseTypeLabels('es') as Record<Case['tipo'], string>

export default function CaseMap({ cases }: CaseMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return
    let cancelled = false

    import('leaflet').then((L) => {
      if (cancelled || !mapRef.current) return
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      // Lazy-load clustering if many cases
      void import('leaflet.markercluster').then((mc) => {
        if (cancelled || !mapRef.current) return
        L.markerClusterGroup = (mc as unknown as { markerClusterGroup: typeof L.markerClusterGroup }).markerClusterGroup ?? L.markerClusterGroup
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const m = mapInstanceRef.current as any
        if (m && !m.clusterGroup) {
          m.clusterGroup = L.markerClusterGroup({
            showCoverageOnHover: false,
            spiderfyOnMaxZoom: true,
            maxClusterRadius: 60,
          })
          m.map.addLayer(m.clusterGroup)
        }
      }).catch(() => {
        // Marker cluster is a nice-to-have; silently skip if unavailable
      })

      const map = L.map(mapRef.current, {
        center: [-15, -65],
        zoom: 3,
        zoomControl: true,
        scrollWheelZoom: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      mapInstanceRef.current = { map, L }
    })

    return () => {
      cancelled = true
      if (mapInstanceRef.current) {
        mapInstanceRef.current.map.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current) return
    const { map, L } = mapInstanceRef.current

    markersRef.current.forEach((m) => m.remove())
    markersRef.current = []

    cases.forEach((c) => {
      const color = TYPE_COLORS[c.tipo]
      const icon = L.icon({
        iconUrl: makeIcon(color),
        iconSize: [28, 36],
        iconAnchor: [14, 36],
        popupAnchor: [0, -36],
      })

      const marker = L.marker([c.lat, c.lng], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: var(--font-sans), system-ui, sans-serif; min-width: 160px; padding: 4px;">
            <span style="
              display: inline-block;
              background: ${color}22;
              color: ${color};
              border: 1px solid ${color}66;
              font-size: 10px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              padding: 2px 8px;
              border-radius: 999px;
              margin-bottom: 6px;
            ">${CASE_TYPE_LABELS[c.tipo]}</span>
            <div style="font-weight: 700; font-size: 14px; color: #1a202c; margin-bottom: 2px;">${escapeHtml(c.nombre)}</div>
            ${c.victima ? `<div style="font-size: 12px; color: #9333ea; margin-bottom: 2px;">Víctima: ${escapeHtml(c.victima)}</div>` : ''}
            <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">${c.fecha} · ${escapeHtml(c.pais)}${c.ciudad ? `, ${escapeHtml(c.ciudad)}` : ''}</div>
            <a href="/es/casos/${encodeURIComponent(c.id)}" style="
              color: ${color};
              font-size: 12px;
              font-weight: 600;
              text-decoration: none;
            ">Ver ficha completa →</a>
          </div>
        `)

      markersRef.current.push(marker)
    })
  }, [cases])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div ref={mapRef} className="w-full h-full rounded-xl border border-border" />
    </>
  )
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c)
}
