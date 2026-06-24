"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import Image from "next/image";
// content injected via locale prop
const c = {}; // consumer provides locale data
const allProducts = c.home?.productCatalog?.products || [];
function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9\u00e1\u00e9\u00ed\u00f3\u00fa\u00f1\u00fc]+/g, "-").replace(/-+$/, ""); }
export function CartRelatedProducts({ currentItems }) {
    if (currentItems.length === 0)
        return null;
    // Find products in same categories as cart items
    const cats = currentItems.map(name => {
        const p = allProducts.find((x) => x.name === name);
        return p?.category || "";
    }).filter(Boolean);
    const related = allProducts
        .filter((p) => !currentItems.includes(p.name) && cats.includes(p.category))
        .slice(0, 4);
    if (related.length === 0)
        return null;
    return (_jsxs("div", { className: "border-t border-border px-4 py-4", children: [_jsx("p", { className: "mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Tambi\\u00e9n te puede interesar" }), _jsx("div", { className: "flex gap-3 overflow-x-auto pb-2", children: related.map((p, i) => (_jsxs(Link, { href: "/producto/" + slugify(p.name), className: "flex-shrink-0 w-28", children: [_jsx("div", { className: "mb-1 flex h-20 w-28 items-center justify-center rounded-lg bg-muted p-2", children: p.imageUrl && _jsx(Image, { src: p.imageUrl, alt: p.name, width: 80, height: 80, className: "h-full w-full object-contain" }) }), _jsx("p", { className: "text-[10px] text-foreground line-clamp-2", children: p.name }), _jsx("p", { className: "text-xs font-bold text-primary mt-0.5", children: p.price })] }, i))) })] }));
}
//# sourceMappingURL=cart-related.js.map