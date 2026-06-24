"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const useRecentlyViewed = () => ({ items: [], isLoading: false });
import Link from "next/link";
import Image from "next/image";
// content injected via locale prop
const c = {}; // consumer provides locale
const allProducts = c.home?.productCatalog?.products || [];
function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9áéíóúñü]+/g, "-").replace(/-+$/, ""); }
export function RecentlyViewed() {
    const { items } = useRecentlyViewed();
    const recent = items.slice(0, 6);
    const products = recent.map((item) => allProducts.find((p) => p.name === (item.name || item))).filter(Boolean);
    if (products.length < 2)
        return null;
    return (_jsx("section", { className: "bg-muted/30 py-10", children: _jsxs("div", { className: "mx-auto max-w-7xl px-4", children: [_jsx("h2", { className: "mb-6 text-xl font-bold text-foreground", children: "Visto recientemente" }), _jsx("div", { className: "flex gap-4 overflow-x-auto pb-2", children: products.map((p, i) => (_jsxs(Link, { href: `/producto/${slugify(p.name)}`, className: "flex-shrink-0 w-36 rounded-xl border border-border bg-surface p-3 transition-all hover:-translate-y-1 hover:shadow-md", children: [_jsx("div", { className: "mb-2 aspect-square flex items-center justify-center bg-muted rounded-lg p-2", children: p.imageUrl && _jsx(Image, { src: p.imageUrl, alt: p.name, width: 200, height: 200, className: "h-full w-full object-contain" }) }), _jsx("p", { className: "text-xs font-medium text-foreground line-clamp-2", children: p.name }), _jsx("p", { className: "mt-1 text-sm font-bold text-primary", children: p.price })] }, i))) })] }) }));
}
//# sourceMappingURL=recently-viewed.js.map