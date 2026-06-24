"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { cn } from "@ai-whisperers/ui/cn";
import { ChevronUp, ChevronDown, ChevronsUpDown, Search } from "lucide-react";
export function DataTable({ data, columns, keyExtractor, searchable = true, searchKeys, pageSize = 15, emptyMessage = "No data found", onRowClick, }) {
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState(null);
    const [sortDir, setSortDir] = useState("desc");
    const [page, setPage] = useState(0);
    // Filter
    const filtered = useMemo(() => {
        if (!search.trim())
            return data;
        const q = search.toLowerCase();
        const keys = (searchKeys || Object.keys(data[0] || {}));
        return data.filter(item => keys.some(k => String(item[k] ?? "").toLowerCase().includes(q)));
    }, [data, search, searchKeys]);
    // Sort
    const sorted = useMemo(() => {
        if (!sortKey)
            return filtered;
        return [...filtered].sort((a, b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];
            if (aVal == null)
                return 1;
            if (bVal == null)
                return -1;
            const cmp = typeof aVal === "number" ? aVal - bVal : String(aVal).localeCompare(String(bVal));
            return sortDir === "asc" ? cmp : -cmp;
        });
    }, [filtered, sortKey, sortDir]);
    const pages = Math.max(1, Math.ceil(sorted.length / pageSize));
    const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);
    const toggleSort = (key) => {
        if (sortKey === key) {
            setSortDir(d => (d === "asc" ? "desc" : "asc"));
        }
        else {
            setSortKey(key);
            setSortDir("desc");
        }
    };
    return (_jsxs("div", { className: "space-y-4", children: [searchable && (_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" }), _jsx("input", { className: "w-full max-w-sm h-9 rounded-lg border border-zinc-800 bg-zinc-900/50 pl-9 pr-3 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50", placeholder: "Search...", value: search, onChange: e => { setSearch(e.target.value); setPage(0); } })] })), _jsx("div", { className: "overflow-x-auto rounded-xl border border-zinc-800/60", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsx("tr", { className: "border-b border-zinc-800/60 bg-zinc-900/30", children: columns.map(col => (_jsx("th", { className: cn("px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider", col.sortable && "cursor-pointer hover:text-zinc-300 select-none", col.className), onClick: () => col.sortable && toggleSort(col.key), children: _jsxs("div", { className: "flex items-center gap-1", children: [col.label, col.sortable && (sortKey === col.key
                                                ? sortDir === "asc" ? _jsx(ChevronUp, { className: "h-3 w-3" }) : _jsx(ChevronDown, { className: "h-3 w-3" })
                                                : _jsx(ChevronsUpDown, { className: "h-3 w-3 opacity-30" }))] }) }, col.key))) }) }), _jsx("tbody", { className: "divide-y divide-zinc-800/40", children: paged.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: columns.length, className: "px-4 py-12 text-center text-zinc-600", children: emptyMessage }) })) : (paged.map(item => (_jsx("tr", { className: cn("hover:bg-zinc-800/20 transition-colors", onRowClick && "cursor-pointer"), onClick: () => onRowClick?.(item), children: columns.map(col => (_jsx("td", { className: cn("px-4 py-3 text-zinc-300", col.className), children: col.render ? col.render(item) : String(item[col.key] ?? "") }, col.key))) }, keyExtractor(item))))) })] }) }), pages > 1 && (_jsxs("div", { className: "flex items-center justify-between text-sm text-zinc-500", children: [_jsxs("span", { children: [sorted.length, " results"] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { className: "px-3 py-1 rounded-lg border border-zinc-800 hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors", disabled: page === 0, onClick: () => setPage(p => p - 1), children: "Prev" }), _jsxs("span", { className: "px-3 py-1", children: [page + 1, " / ", pages] }), _jsx("button", { className: "px-3 py-1 rounded-lg border border-zinc-800 hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors", disabled: page >= pages - 1, onClick: () => setPage(p => p + 1), children: "Next" })] })] }))] }));
}
//# sourceMappingURL=data-table.js.map