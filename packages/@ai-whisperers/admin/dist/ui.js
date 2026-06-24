"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
// ─── Stat Card ─────────────────────────────────────────
export function StatCard({ label, value, sub, icon, color = "emerald", }) {
    const dot = {
        emerald: "bg-emerald-500",
        blue: "bg-blue-500",
        amber: "bg-amber-500",
        purple: "bg-purple-500",
        red: "bg-red-500",
    }[color];
    return (_jsxs("div", { className: "rounded-xl border border-zinc-800/60 bg-zinc-900/50 p-4 hover:border-zinc-700/60 transition-all group", children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsx("p", { className: "text-xs font-medium text-zinc-500", children: label }), icon && _jsx("div", { className: "text-zinc-600 group-hover:text-zinc-400 transition-colors", children: icon })] }), _jsx("p", { className: "text-2xl font-bold text-white tracking-tight", children: value }), sub && (_jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [_jsx("div", { className: `w-1.5 h-1.5 rounded-full ${dot}` }), _jsx("p", { className: "text-xs text-zinc-500", children: sub })] }))] }));
}
// ─── Empty State ───────────────────────────────────────
export function EmptyState({ icon, title, description, actions, }) {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center py-24 text-zinc-500", children: [_jsx("div", { className: "w-16 h-16 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center mb-5", children: _jsx("div", { className: "w-8 h-8 text-zinc-600", children: icon }) }), _jsx("p", { className: "text-base font-semibold text-zinc-300 mb-1", children: title }), description && _jsx("p", { className: "text-sm text-zinc-500 mb-8 max-w-sm text-center", children: description }), actions && _jsx("div", { className: "flex gap-3", children: actions })] }));
}
// ─── Loading Skeleton ──────────────────────────────────
export function CardSkeleton({ count = 3 }) {
    return (_jsx("div", { className: "space-y-3", children: Array.from({ length: count }).map((_, i) => (_jsxs("div", { className: "animate-pulse rounded-xl border border-zinc-800/60 bg-zinc-900/50 p-5", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("div", { className: "h-4 w-24 rounded-md bg-zinc-800" }), _jsx("div", { className: "h-3 w-32 rounded-md bg-zinc-800" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-3 w-40 rounded-md bg-zinc-800" }), _jsx("div", { className: "h-4 w-20 rounded-md bg-zinc-800" })] }), _jsx("div", { className: "h-7 w-28 rounded-lg bg-zinc-800" })] })] }, i))) }));
}
export function TableSkeleton({ rows = 5, cols = 4 }) {
    return (_jsx("div", { className: "animate-pulse space-y-2", children: Array.from({ length: rows }).map((_, r) => (_jsx("div", { className: "flex gap-3", children: Array.from({ length: cols }).map((_, c) => (_jsx("div", { className: "h-4 flex-1 rounded-md bg-zinc-800" }, c))) }, r))) }));
}
export function StatsGridSkeleton({ count = 4 }) {
    return (_jsx("div", { className: "grid grid-cols-2 gap-4 lg:grid-cols-4 animate-pulse", children: Array.from({ length: count }).map((_, i) => (_jsxs("div", { className: "rounded-xl border border-zinc-800/60 bg-zinc-900/50 p-4", children: [_jsx("div", { className: "h-3 w-16 rounded-md bg-zinc-800 mb-2" }), _jsx("div", { className: "h-7 w-24 rounded-md bg-zinc-800 mb-2" }), _jsx("div", { className: "h-3 w-20 rounded-md bg-zinc-800" })] }, i))) }));
}
// ─── Filter Bar ────────────────────────────────────────
export function FilterBar({ options, active, onChange, counts, }) {
    return (_jsx("div", { className: "flex flex-wrap gap-2", children: options.map((opt) => {
            const isActive = active === opt.key;
            return (_jsxs("button", { onClick: () => onChange(opt.key), className: `rounded-lg px-4 py-2 text-xs font-medium transition-all ${isActive
                    ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20 ring-1 ring-emerald-500/20"
                    : "bg-zinc-800/50 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50 border border-zinc-700/50"}`, children: [opt.icon && _jsx("span", { className: "mr-1", children: opt.icon }), opt.label, counts && counts[opt.key] !== undefined && (_jsxs("span", { className: `ml-1.5 ${isActive ? "text-emerald-200" : "text-zinc-500"}`, children: ["(", counts[opt.key], ")"] }))] }, opt.key));
        }) }));
}
// ─── Search Input ──────────────────────────────────────
export function SearchInput({ value, onChange, placeholder = "Buscar...", }) {
    return (_jsxs("div", { className: "relative", children: [_jsx("svg", { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }), _jsx("input", { type: "text", value: value, onChange: (e) => onChange(e.target.value), placeholder: placeholder, className: "w-full sm:w-80 rounded-lg border border-zinc-700/60 bg-zinc-800/50 pl-10 pr-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 placeholder-zinc-500 transition-all" })] }));
}
// ─── Page Header ───────────────────────────────────────
export function PageHeader({ title, subtitle, actions, }) {
    return (_jsxs("div", { className: "mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-white", children: title }), subtitle && _jsx("p", { className: "text-sm text-zinc-500 mt-1", children: subtitle })] }), actions && _jsx("div", { className: "flex items-center gap-3 shrink-0", children: actions })] }));
}
// ─── Badge ──────────────────────────────────────────────
const badgeStyles = {
    pendiente: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    confirmado: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    enviado: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    entregado: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    cancelado: "bg-red-500/10 text-red-400 border-red-500/20",
    active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    suspended: "bg-red-500/10 text-red-400 border-red-500/20",
    admin: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    customer: "bg-zinc-800 text-zinc-400 border-zinc-700/50",
    published: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    draft: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};
export function Badge({ status, children }) {
    const style = badgeStyles[status] || "bg-zinc-800 text-zinc-400 border-zinc-700/50";
    return (_jsx("span", { className: `inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${style}`, children: children || status }));
}
// ─── Status Select ──────────────────────────────────────
export function StatusSelect({ value, onChange, options, disabled, }) {
    const style = badgeStyles[value] || "bg-zinc-800 text-zinc-400 border-zinc-700/50";
    return (_jsx("select", { value: value, onChange: (e) => onChange(e.target.value), disabled: disabled, className: `rounded-lg border px-3 py-1.5 text-xs font-medium outline-none transition-all ${style} ${disabled ? "opacity-50" : "cursor-pointer hover:brightness-110"}`, children: options.map((opt) => (_jsxs("option", { value: opt.key, children: [opt.icon || "", " ", opt.label] }, opt.key))) }));
}
// ─── Summary Bar ────────────────────────────────────────
export function SummaryBar({ items }) {
    return (_jsx("div", { className: "flex flex-wrap items-center gap-6 rounded-xl border border-zinc-800/60 bg-zinc-900/30 px-6 py-4 mb-6", children: items.map((item, i) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("p", { className: "text-xs text-zinc-500", children: item.label }), _jsx("p", { className: `text-sm font-bold ${item.color || "text-white"}`, children: item.value }), i < items.length - 1 && _jsx("div", { className: "w-px h-5 bg-zinc-800/60" })] }, i))) }));
}
// ─── Order Card ─────────────────────────────────────────
const statusIcons = {
    pendiente: "🕐", confirmado: "✅", enviado: "🚚", entregado: "📦", cancelado: "❌",
};
const statusOptions = [
    { key: "pendiente", label: "Pendiente", icon: "🕐" },
    { key: "confirmado", label: "Confirmado", icon: "✅" },
    { key: "enviado", label: "Enviado", icon: "🚚" },
    { key: "entregado", label: "Entregado", icon: "📦" },
    { key: "cancelado", label: "Cancelado", icon: "❌" },
];
export function OrderCard({ order, onStatusChange, onNoteToggle, noteInput, noteText, onNoteChange, onNoteSave, onNoteClose, }) {
    const id = order.id?.slice(0, 8);
    return (_jsxs("div", { className: "rounded-xl border border-zinc-800/60 bg-zinc-900/50 p-5 hover:border-zinc-700/60 transition-all group", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400", children: ["#", id?.[0] || "?"] }), _jsxs(Link, { href: "/admin/pedidos/detalle?id=" + order.id, className: "font-bold text-white hover:text-emerald-400 transition-colors text-sm", children: ["#", id] })] }), _jsx("span", { className: "text-xs text-zinc-500", children: order.created_at
                            ? new Date(order.created_at).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" })
                            : "" })] }), _jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [_jsx("div", { className: "w-5 h-5 rounded-full bg-zinc-700 flex items-center justify-center text-[9px] font-bold text-zinc-300 shrink-0", children: (order.customer_name || "I")[0].toUpperCase() }), _jsx("span", { className: "text-sm text-zinc-300 truncate", children: order.customer_name || "Invitado" }), order.customer_phone && (_jsx("span", { className: "text-[10px] text-zinc-600 shrink-0", children: order.customer_phone }))] }), _jsxs("p", { className: "text-xs text-zinc-500 mb-0.5", children: [order.items?.length || 0, " ", order.items?.length === 1 ? "artículo" : "artículos", order.payment_method ? ` · ${order.payment_method}` : ""] }), _jsx("p", { className: "text-base font-bold text-white mt-1", children: order.total })] }), _jsxs("div", { className: "flex flex-col items-end gap-2 shrink-0", children: [_jsx(StatusSelect, { value: order.status, onChange: (v) => onStatusChange(order.id, v), options: statusOptions }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => onNoteToggle(order.id), className: "text-xs text-zinc-500 hover:text-zinc-200 transition-colors", title: order.note ? `Nota: ${order.note}` : "Agregar nota", children: order.note ? "📝" : "➕" }), _jsxs(Link, { href: "/admin/pedidos/detalle?id=" + order.id, className: "text-xs text-emerald-400 hover:text-emerald-300 transition-colors", children: ["Detalle", _jsx("span", { className: "ml-1 inline-block transition-transform group-hover:translate-x-0.5", children: "\u2192" })] })] })] })] }), noteInput === order.id && (_jsx("div", { className: "mt-4 pt-3 border-t border-zinc-800/60", children: _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", value: noteText, onChange: (e) => onNoteChange(e.target.value), placeholder: "Nota interna...", autoFocus: true, className: "flex-1 rounded-lg bg-zinc-800/50 border border-zinc-700/60 px-3 py-2 text-xs text-white outline-none focus:border-emerald-500/50 placeholder-zinc-600" }), _jsx("button", { onClick: () => onNoteSave(order.id), className: "rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-all", children: "Guardar" }), _jsx("button", { onClick: onNoteClose, className: "text-xs text-zinc-500 hover:text-zinc-200 px-1", children: "\u2715" })] }) })), order.note && noteInput !== order.id && (_jsx("div", { className: "mt-3 pt-3 border-t border-zinc-800/60", children: _jsxs("p", { className: "text-xs text-zinc-500 flex items-center gap-1", children: [_jsx("span", { children: "\uD83D\uDCDD" }), _jsx("span", { className: "truncate", children: order.note })] }) }))] }));
}
// ─── Data Table ─────────────────────────────────────────
export function DataTable({ headers, children, }) {
    return (_jsx("div", { className: "overflow-x-auto rounded-xl border border-zinc-800/60", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "border-b border-zinc-800/60 bg-zinc-900/80 text-left", children: _jsx("tr", { children: headers.map((h) => (_jsx("th", { className: `px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider ${h.className || ""}`, children: h.label }, h.key))) }) }), _jsx("tbody", { className: "divide-y divide-zinc-800/60", children: children })] }) }));
}
//# sourceMappingURL=ui.js.map