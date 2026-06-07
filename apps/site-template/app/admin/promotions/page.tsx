/**
 * ANNOTATION: AdminPromotions
 *
 * What it is: A full promotions management panel — create, edit, activate,
 * deactivate, and delete promotional offers. Each promo has title, subtitle,
 * badge, description, WhatsApp message, color, expiry date, and sort order.
 *
 * Why your business needs it: Run time-sensitive marketing campaigns without
 * touching code. Create a promo, set an expiry date, and it appears on the
 * site and in WhatsApp CTAs automatically. Full control over the offers page.
 *
 * What AI populates from your data: Promotion data is stored in Supabase
 * (promotions table). AI generates promo content and WhatsApp messages based
 * on your offer details during campaign setup.
 *
 * Your input: Tell us your promotion details via WhatsApp — title, discount,
 * expiry date, badge text. We create the promo in Supabase and it appears
 * immediately on your site.
 */

"use client";
import { useState, useEffect } from "react";
import { Tag, Plus, Pencil, Trash2, X, Check, AlertCircle } from "lucide-react";
import Link from "next/link";

type Promotion = {
  id: string;
  title: string;
  subtitle: string | null;
  badge: string | null;
  description: string | null;
  wa_message: string | null;
  color: string;
  is_active: boolean;
  expires_at: string | null;
  sort_order: number;
  created_at: string;
};

const COLOR_OPTIONS = [
  { value: "secondary", label: "Dorado" },
  { value: "amber", label: "Ámbar" },
  { value: "primary", label: "Rosa" },
];

const BADGE_OPTIONS = ["Solo nuevas clientas", "Combo del mes", "Descuento", "Nuevo", "Limited", "Oferta", "Promo"];

export default function AdminPromotionsPage() {
  const [promos, setPromos] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", subtitle: "", badge: "", description: "", wa_message: "", color: "secondary", expires_at: "", is_active: true });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const res = await fetch("/api/admin/promotions");
    const data = await res.json();
    if (!data.error) setPromos(data.promotions || []);
    setLoading(false);
  }

  function openNew() {
    setForm({ title: "", subtitle: "", badge: "", description: "", wa_message: "", color: "secondary", expires_at: "", is_active: true });
    setEditing(null); setShowForm(true);
  }

  function openEdit(p: Promotion) {
    setForm({ title: p.title, subtitle: p.subtitle || "", badge: p.badge || "", description: p.description || "", wa_message: p.wa_message || "", color: p.color, expires_at: p.expires_at ? p.expires_at.split("T")[0] : "", is_active: p.is_active });
    setEditing(p.id); setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { setMsg({ type: "error", text: "El título es obligatorio" }); return; }
    setSaving(true);
    try {
      const url = editing ? "/api/admin/promotions" : "/api/admin/promotions";
      const method = editing ? "PATCH" : "POST";
      const body = editing ? { id: editing, ...form } : form;
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) { setShowForm(false); setEditing(null); load(); setMsg({ type: "success", text: editing ? "Promoción actualizada" : "Promoción creada" }); }
      else { const d = await res.json(); setMsg({ type: "error", text: d.error || "Error" }); }
    } finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/promotions?id=${id}`, { method: "DELETE" });
    setDeleteConfirm(null); load();
  }

  async function toggleActive(p: Promotion) {
    await fetch("/api/admin/promotions", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: p.id, is_active: !p.is_active }) });
    load();
  }

  const COLOR_BG: Record<string, string> = { secondary: "bg-secondary text-white", amber: "bg-amber-500 text-white", primary: "bg-primary text-white" };

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="border-b border-zinc-800 bg-zinc-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Promociones</h1>
          <div className="flex items-center gap-4">
            <button onClick={openNew} className="flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <Plus className="w-4 h-4" /> Nueva promoción
            </button>
            <Link href="/admin" className="text-sm text-zinc-400 hover:text-white transition-colors">← Panel</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {msg && <div className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${msg.type === "success" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
          {msg.type === "success" ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {msg.text}
          <button onClick={() => setMsg(null)} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>}

        {loading ? (
          <div className="text-center py-20 text-zinc-500">Cargando...</div>
        ) : promos.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <Tag className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">No hay promociones</p>
            <p className="text-sm mt-1">Creá la primera promoción para empezar</p>
          </div>
        ) : (
          <div className="space-y-4">
            {promos.map(p => (
              <div key={p.id} className={`bg-zinc-900 border rounded-2xl p-6 flex items-center gap-4 transition-all ${p.is_active ? "border-zinc-800" : "border-zinc-800 opacity-60"}`}>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${COLOR_BG[p.color] || "bg-secondary/20 text-secondary"}`}>
                  <Tag className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold">{p.title}</h3>
                    {p.badge && <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">{p.badge}</span>}
                    {p.is_active ? <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full">Activa</span> : <span className="text-xs bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full">Inactiva</span>}
                  </div>
                  {p.subtitle && <p className="text-sm text-zinc-400 truncate">{p.subtitle}</p>}
                  {p.expires_at && <p className="text-xs text-zinc-600 mt-1">Expira: {new Date(p.expires_at).toLocaleDateString("es-PY")}</p>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggleActive(p)} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${p.is_active ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700" : "bg-green-500/10 text-green-400 hover:bg-green-500/20"}`}>
                    {p.is_active ? "Desactivar" : "Activar"}
                  </button>
                  <button onClick={() => openEdit(p)} className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                  {deleteConfirm === p.id ? (
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleDelete(p.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Check className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteConfirm(null)} className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(p.id)} className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">{editing ? "Editar promoción" : "Nueva promoción"}</h2>
              <button onClick={() => setShowForm(false)} className="text-zinc-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Título *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-secondary transition-colors" placeholder="ej: 20% off primera visita" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Subtítulo</label>
                <input value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-secondary transition-colors" placeholder="ej: En tu primer corte con nosotras" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Badge</label>
                  <select value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-secondary transition-colors">
                    <option value="">Sin badge</option>
                    {BADGE_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Color</label>
                  <select value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-secondary transition-colors">
                    {COLOR_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Mensaje WhatsApp</label>
                <input value={form.wa_message} onChange={e => setForm(f => ({ ...f, wa_message: e.target.value }))} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-secondary transition-colors" placeholder="ej: ¡Hola! Quiero usar la promo..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Expira el</label>
                  <input type="date" value={form.expires_at} onChange={e => setForm(f => ({ ...f, expires_at: e.target.value }))} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-secondary transition-colors" />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))} className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${form.is_active ? "bg-secondary" : "bg-zinc-700"}`}>
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${form.is_active ? "translate-x-5" : "translate-x-0.5"}`} />
                    </div>
                    <span className="text-sm text-zinc-300">{form.is_active ? "Activa" : "Inactiva"}</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-2.5 rounded-xl font-medium transition-colors">Cancelar</button>
                <button type="submit" disabled={saving} className="flex-1 bg-secondary hover:bg-secondary-dark text-white py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50">{saving ? "Guardando..." : "Guardar"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}