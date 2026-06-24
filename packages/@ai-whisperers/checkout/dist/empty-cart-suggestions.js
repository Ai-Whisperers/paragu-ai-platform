"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const useRecentlyViewed = () => ({ items: [], isLoading: false });
import Link from "next/link";
import Image from "next/image";
// content injected via locale prop
const c = {}; // consumer provides locale data
const all = c.home?.productCatalog?.products || [];
function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9\u00e1\u00e9\u00ed\u00f3\u00fa\u00f1\u00fc]+/g, "-").replace(/-+$/, ""); }
export function EmptyCartSuggestions() {
    const { items } = useRecentlyViewed();
    const prods = items.map(n => all.find((p) => p.name === n)).filter(Boolean).slice(0, 3);
    if (prods.length === 0)
        return null;
    return (_jsxs("div", { className: "px-4 py-4", children: [_jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Visto recientemente" }), _jsx("div", { className: "space-y-2", children: prods.map((p, i) => (_jsxs(Link, { href: "/producto/" + slugify(p.name), className: "flex items-center gap-3 rounded-lg border border-border p-2 transition-all hover:bg-muted", children: [_jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted", children: p.imageUrl && _jsx(Image, { src: p.imageUrl, alt: p.name, width: 40, height: 40, className: "h-full w-full object-contain p-1" }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "truncate text-xs font-medium text-foreground", children: p.name }), _jsx("p", { className: "text-xs text-primary font-bold", children: p.price })] })] }, i))) })] }));
}
//# sourceMappingURL=empty-cart-suggestions.js.map