"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
// content injected via locale prop
const c = {}; // consumer provides locale data
const allProducts = c.home?.productCatalog?.products || [];
function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9\u00e1\u00e9\u00ed\u00f3\u00fa\u00f1\u00fc]+/g, "-").replace(/-+$/, ""); }
export function SearchAutocomplete() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [focused, setFocused] = useState(false);
    const ref = useRef(null);
    const timer = useRef(undefined);
    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target))
            setFocused(false); };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);
    const handleChange = (value) => {
        setQuery(value);
        if (timer.current)
            clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            if (value.trim().length < 2) {
                setResults([]);
                return;
            }
            const q = value.toLowerCase();
            setResults(allProducts.filter((p) => p.name.toLowerCase().includes(q) || (p.brand || "").toLowerCase().includes(q)).slice(0, 6));
        }, 250);
    };
    return (_jsxs("div", { ref: ref, className: "relative", children: [_jsx("input", { type: "text", value: query, onChange: e => handleChange(e.target.value), onFocus: () => setFocused(true), placeholder: "Buscar productos...", className: "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-ring", "aria-label": "Buscar productos", autoComplete: "off" }), query.length >= 2 && focused && results.length > 0 && (_jsx("div", { className: "absolute top-full left-0 right-0 z-50 mt-1 max-h-80 overflow-y-auto rounded-xl border border-border bg-surface shadow-lg", children: results.map((p, i) => (_jsxs(Link, { href: "/producto/" + slugify(p.name), onClick: () => { setQuery(""); setResults([]); setFocused(false); }, className: "flex items-center gap-3 border-b border-border px-4 py-3 transition-colors hover:bg-muted last:border-0", children: [_jsx("div", { className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted", children: p.imageUrl && _jsx(Image, { src: p.imageUrl, alt: p.name, width: 40, height: 40, className: "h-full w-full object-contain p-1" }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "truncate text-sm font-medium text-foreground", children: p.name }), _jsx("p", { className: "text-xs text-muted-foreground", children: p.price })] })] }, i))) })), query.length >= 2 && focused && results.length === 0 && (_jsx("div", { className: "absolute top-full left-0 right-0 z-50 mt-1 rounded-xl border border-border bg-surface p-4 text-center shadow-lg", children: _jsx("p", { className: "text-sm text-muted-foreground", children: "No se encontraron productos" }) }))] }));
}
//# sourceMappingURL=search-autocomplete.js.map