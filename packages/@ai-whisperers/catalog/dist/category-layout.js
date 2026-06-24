"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Header — consumer provides
const Header = ({ children }) => _jsx("header", { children: children });
// Footer — consumer provides
const Footer = () => _jsx("footer", {});
import { CookieConsent } from "@ai-whisperers/seo";
// content injected via locale prop
import Link from "next/link";
import Image from "next/image";
import { CartProvider } from "@ai-whisperers/commerce/cart/cart-context";
const c = {}; // consumer provides locale data
const products = c.home?.productCatalog?.products || [];
const submenu = c.categoryMenu || {};
export function CategoryContent({ slug, name, emoji, description, heroImage }) {
    const catProducts = products.filter((p) => p.category === name);
    const subItems = submenu[slug] || [];
    return (_jsxs(CartProvider, { children: [_jsx(Header, {}), _jsxs("section", { className: "bg-primary py-12 text-center text-primary-foreground relative overflow-hidden", children: [heroImage && (_jsx(Image, { src: heroImage, alt: "", fill: true, className: "object-cover object-center", sizes: "100vw", priority: true })), _jsx("div", { className: `absolute inset-0 ${heroImage ? "bg-primary/82" : "bg-primary"}`, "aria-hidden": true }), _jsxs("div", { className: "relative z-10", children: [_jsx("span", { className: "text-5xl mb-2 block", children: emoji }), _jsx("h1", { className: "text-4xl font-bold", children: name }), _jsx("p", { className: "mt-2 text-primary-foreground/80 max-w-xl mx-auto", children: description })] })] }), subItems.length > 0 && (_jsx("section", { className: "bg-surface-light py-6", children: _jsx("div", { className: "mx-auto max-w-7xl px-4", children: _jsx("div", { className: "flex flex-wrap gap-2", children: subItems.map((item) => (_jsx(Link, { href: "/tienda", className: "rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-foreground transition-all hover:bg-primary hover:text-primary-foreground", children: item }, item))) }) }) })), _jsx("section", { className: "bg-background py-16", children: _jsxs("div", { className: "mx-auto max-w-7xl px-4", children: [catProducts.length === 0 && _jsxs("div", { className: "py-20 text-center", children: [_jsx("p", { className: "text-muted-foreground", children: "Pr\u00F3ximamente m\u00E1s productos." }), _jsx(Link, { href: "/tienda", className: "mt-4 inline-block text-primary hover:underline", children: "\u2190 Volver a la tienda" })] }), _jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: catProducts.map((p, i) => (_jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-md", children: [_jsx(Link, { href: "/tienda", children: _jsx("div", { className: "aspect-[3/2] flex items-center justify-center bg-muted p-4", children: p.imageUrl && _jsx(Image, { src: p.imageUrl, alt: p.name, width: 400, height: 267, className: "h-full w-full object-contain" }) }) }), _jsxs("div", { className: "p-4", children: [p.brand && _jsx("p", { className: "text-xs font-medium text-muted-foreground", children: p.brand }), _jsx(Link, { href: "/tienda", children: _jsx("h3", { className: "font-semibold text-foreground hover:text-primary line-clamp-1", children: p.name }) }), _jsx("p", { className: "text-lg font-bold text-primary mt-2", children: p.price })] })] }, i))) }), _jsx("div", { className: "mt-10 text-center", children: _jsx(Link, { href: "/tienda", className: "text-sm text-primary hover:underline", children: "\u2190 Ver todas las categor\u00EDas" }) })] }) }), _jsx(Footer, {}), _jsx(CookieConsent, {})] }));
}
//# sourceMappingURL=category-layout.js.map