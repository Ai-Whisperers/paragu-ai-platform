'use client'
import { useState } from 'react'
import { events } from '@/data/events'

export default function EventsSection() {
  const [showPast, setShowPast] = useState(false)
  const upcoming = events.filter(e => e.status === 'upcoming')
  const past = events.filter(e => e.status === 'past')
  const visiblePast = showPast ? past : []

  return (
    <section id="events" className="py-[clamp(3rem,6vw,6rem)] px-6 bg-[#111]">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,3rem)] text-[#f0f0f0] mb-2">
          Live
        </h2>
        <p className="text-[#888] text-sm mb-10 font-[family-name:var(--font-accent)] italic">
          Shows pasados — Nüdo en vivo, rompiendo escenarios
        </p>

        {upcoming.length > 0 && (
          <div className="space-y-4 mb-8">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#5CB87A] mb-4">Próximas Fechas</h3>
            {upcoming.map(event => (
              <div key={event.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 flex items-start gap-5 hover:border-[#8B0000]/50 transition-all">
                <div className="text-center flex-shrink-0 w-16">
                  <div className="text-xs uppercase text-[#888]">PRÓXIMO</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  <p className="text-xs text-[#888]">{(event as any).date} · {event.venue}, {event.city}</p>
                  <p className="text-sm text-[#666] mt-2">{event.description}</p>
                </div>
                {(event as any).ticketUrl && (
                  <a href={(event as any).ticketUrl} target="_blank" rel="noopener noreferrer"
                    className="bg-[#8B0000] text-white px-5 py-2 rounded-lg text-xs font-semibold no-underline hover:bg-[#B22222] transition-all whitespace-nowrap">
                    {(event as any).ticketPrice || 'Tickets'}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Past events */}
        <div className="space-y-3">
          <button onClick={() => setShowPast(!showPast)}
            className="text-xs uppercase tracking-[0.2em] text-[#888] hover:text-[#f0f0f0] transition-colors">
            {showPast ? 'Ocultar shows pasados' : `Mostrar shows pasados (${past.length})`}
          </button>
          {visiblePast.map(event => (
            <div key={event.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 flex items-start gap-4 opacity-80">
              <div className="flex-1">
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-xs text-[#666]">{event.date} · {event.venue}, {event.city}</p>
                <p className="text-sm text-[#666] mt-1">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
