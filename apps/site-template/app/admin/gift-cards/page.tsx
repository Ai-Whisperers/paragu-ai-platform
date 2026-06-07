/**
 * ANNOTATION: AdminGiftCardsPage
 *
 * What it is: Full gift card management panel — create cards, view all cards
 * (code, denomination, balance, recipient, status, creation/expiry dates),
 * filter by status tab, search by code/recipient, and open card detail view.
 *
 * Why your business needs it: Lets staff manually create gift cards for
 * walk-in sales or promotions without the Stripe checkout. Full visibility
 * into gift card lifecycle (active, redeemed, expired).
 *
 * What AI populates from your data: Gift card transactions are created when
 * clients purchase via Stripe checkout at /api/gift-card/checkout. This panel
 * gives full CRUD control over that data.
 *
 * Your input: Supabase must have the gift_cards and gift_card_transactions
 * tables. Configure the amount tiers you want to offer via WhatsApp during setup.
 */
"use client"

import { useState, useEffect, useCallback } from "react"
import { formatGs } from "@/lib/config/config"
import GiftCardForm from "@/components/admin/gift-card-form"
import GiftCardDetail from "@/components/admin/gift-card-detail"

type GiftCard = {
  id: string
  code: string
  token: string
  denomination: number
  balance: number
  recipient_name: string | null
  recipient_phone: string | null
  purchaser_phone: string | null
  status: "active" | "redeemed" | "cancelled" | "expired"
  created_at: string
  valid_until: string
}

const STATUS_TABS = [
  { key: "all", label: "Todas" },
  { key: "active", label: "Activas" },
  { key: "redeemed", label: "Canjeadas" },
  { key: "expired", label: "Expiradas" },
] as const

const STATUS_BADGE: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  redeemed: "bg-blue-100 text-blue-800",
  cancelled: "bg-gray-100 text-gray-800",
  expired: "bg-red-100 text-red-800",
}

export default function AdminGiftCardsPage() {
  const [cards, setCards] = useState<GiftCard[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"all" | "active" | "redeemed" | "expired">("all")
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)

  const fetchCards = useCallback(async () => {
    setLoading(true)
    try {
      const statusParam = activeTab === "all" ? "" : `?status=${activeTab}`
      const res = await fetch(`/api/admin/gift-cards${statusParam}`, { cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        setCards(Array.isArray(data) ? data : [])
      }
    } catch (err) {
      console.error("Error fetching cards:", err)
    } finally {
      setLoading(false)
    }
}, [activeTab])

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    fetchCards()
  }, [fetchCards])
  /* eslint-enable react-hooks/set-state-in-effect */

  const filtered = cards.filter((c) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      c.code?.toLowerCase().includes(q) ||
      c.recipient_name?.toLowerCase().includes(q) ||
      c.purchaser_phone?.includes(q)
    )
  })

  const totalCards = cards.length
  const totalIssued = cards.reduce((s, c) => s + c.denomination, 0)
  const totalActiveBalance = cards
    .filter((c) => c.status === "active")
    .reduce((s, c) => s + c.balance, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tarjetas de Regalo</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva Tarjeta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-500">Total Tarjetas</p>
          <p className="text-2xl font-bold text-gray-900">{totalCards}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-500">Valor Total Emitido</p>
          <p className="text-2xl font-bold text-rose-600">{formatGs(totalIssued)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-500">Saldo Activo</p>
          <p className="text-2xl font-bold text-green-600">{formatGs(totalActiveBalance)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="border-b px-4 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex gap-1">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.key
                    ? "bg-rose-100 text-rose-700"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="pb-3">
            <input
              type="text"
              placeholder="Buscar por código, nombre o teléfono..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-72 px-4 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Denominación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saldo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destinatario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono Comprador</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creada</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Válida Hasta</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">Cargando...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">No hay tarjetas</td>
                </tr>
              ) : (
                filtered.map((card) => (
                  <tr
                    key={card.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedCardId(card.id)}
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-rose-600">{card.code}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{formatGs(card.denomination)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={card.balance === 0 ? "text-gray-400" : "text-green-600 font-medium"}>
                        {formatGs(card.balance)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {card.recipient_name || <span className="text-gray-400">—</span>}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {card.purchaser_phone ? (
                        <a
                          href={`https://wa.me/${card.purchaser_phone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-rose-600 hover:text-rose-700"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {card.purchaser_phone}
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${STATUS_BADGE[card.status] || "bg-gray-100"}`}>
                        {card.status === "active" ? "Activa" :
                         card.status === "redeemed" ? "Canjeada" :
                         card.status === "cancelled" ? "Cancelada" : "Expirada"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(card.created_at).toLocaleDateString("es-PY")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(card.valid_until).toLocaleDateString("es-PY")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <GiftCardForm
          onClose={() => setShowForm(false)}
          onCreated={() => {
            setShowForm(false)
            fetchCards()
          }}
        />
      )}

      {selectedCardId && (
        <GiftCardDetail
          cardId={selectedCardId}
          onClose={() => setSelectedCardId(null)}
          onUpdate={fetchCards}
        />
      )}
    </div>
  )
}