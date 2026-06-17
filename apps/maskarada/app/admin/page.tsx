"use client";

import { useEffect, useState } from "react";
import {
  getTickets,
  updateTicketStatus,
  getBlocklist,
  addToBlocklist,
  removeFromBlocklist,
  getMarketingList,
  getDashboardStats,
  ADMIN_PASSCODE,
  type TicketStatus,
  type TicketRow,
  type BlocklistEntry,
  type MarketingEntry,
  type DashboardStats,
} from "@/lib/supabase";

type Tab = "tickets" | "blocklist" | "marketing";
type ExportFormat = "csv" | "whatsapp";

const TIER_LABEL: Record<string, string> = {
  early_bird: "Pre-Venta",
  general: "General",
  vip: "VIP",
};

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  const [tickets, setTickets] = useState<TicketRow[]>([]);
  const [blocklist, setBlocklist] = useState<BlocklistEntry[]>([]);
  const [marketing, setMarketing] = useState<MarketingEntry[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [tab, setTab] = useState<Tab>("tickets");
  const [loading, setLoading] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>("csv");

  const [showBlockForm, setShowBlockForm] = useState(false);
  const [blockEmail, setBlockEmail] = useState("");
  const [blockPhone, setBlockPhone] = useState("");
  const [blockName, setBlockName] = useState("");
  const [blockReason, setBlockReason] = useState("Comportamiento inapropiado");
  const [blockMsg, setBlockMsg] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("mk_admin") === "true") {
      setAuthed(true);
      void loadData();
    }
  }, []);

  async function loadData() {
    setLoading(true);
    const [t, b, m, s] = await Promise.all([
      getTickets(),
      getBlocklist(),
      getMarketingList(),
      getDashboardStats(),
    ]);
    setTickets(t);
    setBlocklist(b);
    setMarketing(m);
    setStats(s);
    setLoading(false);
  }

  function login() {
    if (passcode === ADMIN_PASSCODE) {
      setAuthed(true);
      setAuthError("");
      sessionStorage.setItem("mk_admin", "true");
      void loadData();
    } else {
      setAuthError("Código incorrecto");
    }
  }

  function logout() {
    setAuthed(false);
    sessionStorage.removeItem("mk_admin");
  }

  async function handleStatus(id: string, status: TicketStatus) {
    await updateTicketStatus(id, status);
    await loadData();
  }

  async function handleBlock() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entry: Record<string, any> = { reason: blockReason };
    if (blockEmail) entry.email = blockEmail.toLowerCase();
    if (blockPhone) entry.phone = blockPhone;
    if (blockName) entry.name = blockName;

    const ok = await addToBlocklist(entry);
    if (ok) {
      setBlockMsg("✅ Bloqueado");
      setBlockEmail("");
      setBlockPhone("");
      setBlockName("");
      setShowBlockForm(false);
      await loadData();
    } else {
      setBlockMsg("❌ Error al bloquear");
    }
  }

  async function handleUnblock(id: string) {
    await removeFromBlocklist(id);
    await loadData();
  }

  function exportCsv() {
    if (tab === "tickets") {
      const rows = [
        ["ID", "Nombre", "Email", "Teléfono", "Cantidad", "Categoría", "Total PYG", "Estado", "Creado"],
        ...tickets.map((t) => [
          t.id,
          t.buyer_name,
          t.buyer_email,
          t.buyer_phone,
          String(t.quantity),
          TIER_LABEL[t.tier] || t.tier,
          String(t.total_pyg),
          t.status,
          t.created_at,
        ]),
      ];
      const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tickets-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (tab === "marketing") {
      const rows = [
        ["Nombre", "Email", "Teléfono", "Source", "Creado"],
        ...marketing.map((m) => [m.name, m.email, m.phone, m.source, m.created_at]),
      ];
      const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `marketing-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  function exportWhatsApp() {
    if (tab !== "marketing") return;
    const text = marketing.map((m) => `${m.name} – ${m.phone}`).join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `whatsapp-list-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!authed) {
    return (
      <div className="min-h-screen py-24 px-4 flex items-center justify-center">
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">🔐 Admin</h1>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Código de acceso"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-gold-400/50 focus:outline-none mb-4"
          />
          {authError && <p className="text-red-400 text-sm mb-4">{authError}</p>}
          <button
            onClick={login}
            className="w-full bg-gold-400/90 hover:bg-gold-400 text-black font-bold py-3 rounded-lg transition-all"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">🎭 Admin maškaráda</h1>
          <a href="/admin/photos" className="text-xs text-gray-400 hover:text-gold-400 transition-colors">📸 Fotos</a>
          <a href="/admin/testimonios" className="text-xs text-gray-400 hover:text-gold-400 transition-colors">🪶 Testimonios</a>
          <button
            onClick={logout}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-xs text-gray-500 uppercase tracking-widest">Tickets</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.total_tickets}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-xs text-gray-500 uppercase tracking-widest">Revenue</p>
              <p className="text-2xl font-bold text-gold-400 mt-1">
                Gs. {stats.total_revenue.toLocaleString("es-PY")}
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-xs text-gray-500 uppercase tracking-widest">Confirmados</p>
              <p className="text-2xl font-bold text-green-400 mt-1">{stats.confirmed}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-xs text-gray-500 uppercase tracking-widest">Capacidad</p>
              <p className="text-2xl font-bold text-white mt-1">
                {stats.capacity_sold}/{stats.capacity_total}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {(["tickets", "blocklist", "marketing"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all ${
                tab === t
                  ? "bg-blood-500 text-white"
                  : "border border-white/20 text-gray-400 hover:border-white/40"
              }`}
            >
              {t === "tickets" ? "Tickets" : t === "blocklist" ? "Blocklist" : "Marketing"}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            {tab === "marketing" && (
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-white"
              >
                <option value="csv">CSV</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            )}
            <button
              onClick={exportFormat === "whatsapp" ? exportWhatsApp : exportCsv}
              className="text-xs bg-gold-400/20 text-gold-400 px-4 py-2 rounded hover:bg-gold-400/30"
            >
              Exportar
            </button>
            <button
              onClick={loadData}
              disabled={loading}
              className="text-xs border border-white/20 text-gray-400 px-4 py-2 rounded hover:border-white/40"
            >
              {loading ? "..." : "Refrescar"}
            </button>
          </div>
        </div>

        {tab === "tickets" && (
          <div className="space-y-3">
            {tickets.length === 0 ? (
              <p className="text-gray-500 text-center py-12">No hay tickets.</p>
            ) : (
              tickets.map((t) => (
                <div
                  key={t.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 flex-wrap"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium">{t.buyer_name}</p>
                    <p className="text-xs text-gray-500">
                      {t.buyer_email} · {t.buyer_phone}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {t.quantity}x {TIER_LABEL[t.tier] || t.tier} · Gs.{" "}
                      {t.total_pyg.toLocaleString("es-PY")} ·{" "}
                      {new Date(t.created_at).toLocaleString("es-PY")}
                    </p>
                  </div>
                  <span
                    className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full ${
                      t.status === "confirmed"
                        ? "bg-green-500/20 text-green-400"
                        : t.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : t.status === "cancelled"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {t.status}
                  </span>
                  <select
                    onChange={(e) => handleStatus(t.id, e.target.value as TicketStatus)}
                    value={t.status}
                    className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white"
                  >
                    <option value="pending">pending</option>
                    <option value="confirmed">confirmed</option>
                    <option value="cancelled">cancelled</option>
                    <option value="checked_in">checked_in</option>
                  </select>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "blocklist" && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => setShowBlockForm(!showBlockForm)}
                className="bg-blood-500 hover:bg-blood-600 text-white px-4 py-2 rounded text-xs uppercase tracking-widest"
              >
                {showBlockForm ? "Cancelar" : "+ Agregar a blocklist"}
              </button>
              {blockMsg && <p className="text-sm text-gray-400">{blockMsg}</p>}
            </div>

            {showBlockForm && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 space-y-3">
                <input
                  value={blockName}
                  onChange={(e) => setBlockName(e.target.value)}
                  placeholder="Nombre (opcional)"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600"
                />
                <input
                  value={blockEmail}
                  onChange={(e) => setBlockEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600"
                />
                <input
                  value={blockPhone}
                  onChange={(e) => setBlockPhone(e.target.value)}
                  placeholder="Teléfono"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600"
                />
                <select
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option>Comportamiento inapropiado</option>
                  <option>Incumplimiento de reglas</option>
                  <option>Otros</option>
                </select>
                <button
                  onClick={handleBlock}
                  className="w-full bg-blood-500 hover:bg-blood-600 text-white py-2 rounded font-medium"
                >
                  Bloquear
                </button>
              </div>
            )}

            <div className="space-y-2">
              {blocklist.length === 0 ? (
                <p className="text-gray-500 text-center py-12">Blocklist vacía.</p>
              ) : (
                blocklist.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-white text-sm">{b.name || b.email || b.phone}</p>
                      <p className="text-xs text-gray-500">{b.reason}</p>
                    </div>
                    <button
                      onClick={() => handleUnblock(b.id)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Quitar
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {tab === "marketing" && (
          <div className="space-y-2">
            {marketing.length === 0 ? (
              <p className="text-gray-500 text-center py-12">No hay suscriptores.</p>
            ) : (
              marketing.map((m) => (
                <div
                  key={m.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-white text-sm">
                      {m.name} · {m.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      {m.phone} · source: {m.source} ·{" "}
                      {new Date(m.created_at).toLocaleString("es-PY")}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
