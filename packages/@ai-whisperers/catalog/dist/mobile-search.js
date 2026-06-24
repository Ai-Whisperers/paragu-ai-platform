"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
// content injected via locale prop
const c = {}; // consumer provides locale data
const allProducts = c.home?.productCatalog?.products || [];
function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9áéíóúñü]+/g, "-").replace(/-+$/, ""); }
export function MobileSearchBar() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const timer = useRef(undefined);
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
            setResults(allProducts.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 5));
        }, 250);
    };
    return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setOpen(true), className: "flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-light md:hidden", "aria-label": "Buscar", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("circle", { cx: "11", cy: "11", r: "8" }), _jsx("path", { d: "m21 21-4.35-4.35" })] }) }), open && (_jsxs("div", { className: "fixed inset-0 z-50 flex flex-col bg-background md:hidden", children: [_jsxs("div", { className: "flex items-center gap-3 border-b border-border p-4", children: [_jsx("input", { autoFocus: true, type: "text", value: query, onChange: e => handleChange(e.target.value), placeholder: "Buscar productos...", className: "flex-1 rounded-lg border border-input bg-surface px-4 py-3 text-sm outline-none focus:border-ring" }), _jsx("button", { onClick: () => { setOpen(false); setQuery(""); setResults([]); }, className: "text-sm text-muted-foreground", children: "Cancelar" })] }), results.length > 0 && (_jsx("div", { className: "flex-1 overflow-y-auto p-4", children: results.map((p, i) => (_jsxs(Link, { href: "/producto/" + slugify(p.name), onClick: () => setOpen(false), className: "flex items-center gap-3 rounded-xl border border-border p-3 mb-2 transition-all hover:bg-muted", children: [_jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-lg bg-muted", children: p.imageUrl && _jsx(Image, { src: p.imageUrl, alt: p.name, width: 48, height: 48, className: "h-full w-full object-contain p-1" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-foreground", children: p.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: p.price })] })] }, i))) }))] }))] }));
}
//# sourceMappingURL=mobile-search.js.map