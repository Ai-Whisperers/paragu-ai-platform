"use client"
import { useEffect, useState } from "react"
import { CheckCircle2, Gift, Star, Crown } from "lucide-react"
import Link from "next/link"
import { getSiteName } from "@/lib/config/config"

interface SuccessContentProps {
  lang: string
  query: Record<string, string | undefined>
}

export function SuccessContent({ lang, query }: SuccessContentProps) {
  const { session_id, gift_card, booking, service, date, time, name } = query
  const [sessionInfo, setSessionInfo] = useState<{ paid: boolean; amount?: number; email?: string } | null>(null)

  useEffect(() => {
    if (session_id || gift_card) {
      fetch(`/api/gift-card?session_id=${session_id}`)
        .then(r => r.json())
        .then(d => { if (!d.error) setSessionInfo(d) })
        .catch(() => {})
    }
  }, [session_id, gift_card])

  const isGiftCard = gift_card === "true" && session_id
  const isBooking = booking === "confirmed"

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        {isGiftCard && (
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-rose-400 to-violet-600 h-2" />
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-rose-600" />
              </div>
              <h1 className="font-heading text-3xl font-bold text-primary mb-2">¡Tu Tarjeta de Regalo está Lista!</h1>
              {sessionInfo?.paid
                ? <p className="text-foreground-light">Recibiste un correo con el código. También podés reclamar tu tarjeta en el local.</p>
                : <p className="text-foreground-light">Si no recibiste el correo, Whatsappeanos para confirmar tu pedido.</p>
              }
              {sessionInfo?.amount && (
                <div className="mt-6 p-4 bg-surface-muted rounded-xl">
                  <p className="text-sm text-foreground-muted mb-1">Valor de la tarjeta</p>
                  <p className="font-heading text-2xl font-bold text-primary">
                    Gs. {sessionInfo.amount.toLocaleString("es-PY")}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {isBooking && (
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-secondary to-secondaryDark h-2" />
            <div className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <CheckCircle2 className="w-8 h-8 text-secondary shrink-0 mt-1" />
                <div>
                  <h1 className="font-heading text-2xl font-bold text-primary mb-1">¡Turno Solicitado!</h1>
                  <p className="text-foreground-light">Te contactaremos pronto para confirmar tu cita.</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                {name && <div className="flex justify-between"><span className="text-foreground-muted">Nombre</span><span className="font-medium">{name}</span></div>}
                {service && <div className="flex justify-between"><span className="text-foreground-muted">Servicio</span><span className="font-medium">{decodeURIComponent(service)}</span></div>}
                {date && <div className="flex justify-between"><span className="text-foreground-muted">Fecha</span><span className="font-medium">{date}</span></div>}
                {time && <div className="flex justify-between"><span className="text-foreground-muted">Horario</span><span className="font-medium">{time}</span></div>}
              </div>
            </div>
          </div>
        )}

        <div className="bg-primary rounded-2xl p-8 text-white mb-8">
          <h2 className="font-heading text-2xl font-bold mb-2 text-center">Programa de Rewards</h2>
          <p className="text-white/60 text-center text-sm mb-8">Seguì tu progreso en el programa de premios</p>
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: CheckCircle2, label: "Reservaste tu cita", filled: true, next: false },
              { icon: CheckCircle2, label: "Completaste tu visita", filled: false, next: isBooking },
              { icon: Crown, label: "Tu tercera visita", filled: false, next: false },
              { icon: Star, label: "Premio especial", filled: false, next: false },
            ].map(({ icon: Icon, label, filled, next }, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${filled ? "bg-secondary text-white" : next ? "bg-secondary/20 text-secondary ring-2 ring-secondary ring-offset-2 ring-offset-primary" : "bg-white/10 text-white/40"}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-xs leading-tight" style={{ color: next ? "var(--color-secondary)" : filled ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center space-y-3">
          <a
            href={`https://wa.me/${"595986106062"}?text=${encodeURIComponent(`¡Hola! ${
              isBooking ? `Soy ${name || "cliente"}. Confirmo mi turno en ${getSiteName()}.` :
              isGiftCard ? `Confirmo mi tarjeta de regalo ${getSiteName()}.` :
              `Quiero confirmar mi turno en ${getSiteName()}.`
            }`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#20BD5A] transition-all"
          >
            <Gift className="w-5 h-5" />
            Confirmar por WhatsApp
          </a>
          <Link href={`/${lang}`} className="block text-sm text-foreground-muted hover:text-secondary transition-colors">
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
