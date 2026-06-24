"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const useRecentlyViewed = () => ({ items: [], isLoading: false }); // consumer provides own hook
import Link from "next/link";
import Image from "next/image";
// content injected via locale prop
const c = {}; // consumer provides locale
const allProducts = c.home?.productCatalog?.products || [];
function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9\u00e1\u00e9\u00ed\u00f3\u00fa\u00f1\u00fc]+/g, "-").replace(/-+$/, ""); }
export function RecentlyViewedProducts({ exclude }) {
    const { items } = useRecentlyViewed();
    const recent = items.filter(n => n !== exclude).slice(0, 4);
    const products = recent.map(name => allProducts.find((p) => p.name === name)).filter(Boolean);
    if (products.length < 2)
        return null;
    return (_jsxs("section", { className: "mt-12", children: [_jsx("h2", { className: "mb-4 text-xl font-bold text-foreground", children: "Visto recientemente" }), _jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-4", children: products.map((p, i) => (_jsxs(Link, { href: "/producto/" + slugify(p.name), className: "group rounded-xl border border-border bg-surface p-3 transition-all hover:-translate-y-1 hover:shadow-md", children: [_jsx("div", { className: "mb-2 aspect-square flex items-center justify-center bg-muted rounded-lg p-2", children: p.imageUrl && _jsx(Image, { src: p.imageUrl, alt: p.name, width: 200, height: 200, className: "h-full w-full object-contain" }) }), _jsx("p", { className: "text-xs font-medium text-foreground line-clamp-2 group-hover:text-primary", children: p.name }), _jsx("p", { className: "mt-1 text-sm font-bold text-primary", children: p.price })] }, i))) })] }));
}
//# sourceMappingURL=recently-viewed-products.js.map