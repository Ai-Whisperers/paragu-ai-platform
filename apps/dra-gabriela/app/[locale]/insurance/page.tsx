// /en/insurance — payment, insurance reimbursement, financing, cancellation.

import { notFound } from "next/navigation"
import { ChevronDown, Shield, CreditCard, Receipt, Banknote, RefreshCw, BadgeCheck, FileCheck } from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import en from "@/content/en/insurance.json"
import es from "@/content/es/insurance.json"
import { PageHero } from "@/components/PageHero"
import { PageSection } from "@/components/PageSection"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isEs = locale === "es"
  return buildMetadata({
    slug: "insurance",
    title: isEs ? "Seguro, pago y reembolso" : "Insurance and payment",
    description: isEs
      ? "Información sobre seguros, métodos de pago, financiamiento y cancelación en la práctica de la Dra. Gabriella."
      : "Information on insurance, payment methods, financing, and cancellation at Dra. Gabriella's practice.",
    locale: isEs ? "es" : "en",
  })
}

const TRUST_BADGES_EN = [
  { icon: Receipt, label: "Itemized receipts", sub: "With procedure codes for reimbursement" },
  { icon: Banknote, label: "Multiple payment methods", sub: "Cash, transfer, Pagopar, POS" },
  { icon: CreditCard, label: "Financing available", sub: "For cases over Gs 1.000.000" },
  { icon: Shield, label: "International insurers", sub: "BUPA, Cigna, GeoBlue reimbursement" },
]

const TRUST_BADGES_ES = [
  { icon: Receipt, label: "Recibos detallados", sub: "Con códigos de procedimientos para reembolso" },
  { icon: Banknote, label: "Varios métodos de pago", sub: "Efectivo, transferencia, Pagopar, POS" },
  { icon: CreditCard, label: "Financiamiento disponible", sub: "Para casos de más de Gs 1.000.000" },
  { icon: Shield, label: "Aseguradoras internacionales", sub: "Reembolso con BUPA, Cigna, GeoBlue" },
]

export default async function InsurancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const isEs = locale === "es"
  const base = `/${locale}`
  const badges = isEs ? TRUST_BADGES_ES : TRUST_BADGES_EN

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Seguro y pago" : "Insurance and payment"}
        title={c.title}
        subtitle={c.subtitle}
        variant="default"
        align="center"
      />

      {/* Trust badges */}
      <PageSection layout="wide" py="md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {badges.map((b, i) => {
            const Icon = b.icon
            return (
              <div key={i} className="card p-5 text-center">
                <div className="w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-accent" aria-hidden="true" />
                </div>
                <div className="text-sm font-medium text-fg mb-1">{b.label}</div>
                <div className="text-xs text-fg-muted leading-relaxed">{b.sub}</div>
              </div>
            )
          })}
        </div>
      </PageSection>

      {/* FAQ list */}
      <PageSection layout="wide" py="md" bg="muted">
        <div className="max-w-3xl mx-auto space-y-3">
          {c.items.map((it: any, i: number) => (
            <details key={i} className="group bg-surface border-2 border-border rounded-xl overflow-hidden hover:border-accent hover:shadow-lg transition-all">
              <summary className="cursor-pointer p-5 md:p-6 list-none flex items-start justify-between gap-4 hover:bg-surface-muted transition-colors">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center text-accent font-medium text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span className="font-medium text-base md:text-lg pt-1 text-left">{it.q}</span>
                </div>
                <ChevronDown className="w-5 h-5 text-fg-subtle group-open:rotate-180 transition-transform flex-shrink-0 mt-2" />
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6 pl-16 md:pl-[5.5rem]">
                <p className="text-fg-muted leading-relaxed border-t border-border-light pt-4 text-left">{it.a}</p>
              </div>
            </details>
          ))}
        </div>
      </PageSection>

      {/* CTA */}
      <PageSection layout="narrow" py="md">
        <div className="card-accent card p-8 text-center">
          <FileCheck className="w-10 h-10 text-accent mx-auto mb-3" aria-hidden="true" />
          <h2 className="text-xl md:text-2xl mb-3">
            {isEs ? "¿Necesitás una factura para tu aseguradora?" : "Need a receipt for your insurer?"}
          </h2>
          <p className="text-fg-muted mb-6 max-w-md mx-auto text-sm">
            {isEs
              ? "Escribime con el nombre de tu aseguradora y los detalles del procedimiento. Te envío el documento que necesitás."
              : "Message me with your insurer's name and the procedure details. I'll send you the document you need."}
          </p>
          <a href={`${base}/contact`} className="btn btn-primary">
            {isEs ? "Ir a contacto" : "Go to contact"}
          </a>
        </div>
      </PageSection>
    </>
  )
}
