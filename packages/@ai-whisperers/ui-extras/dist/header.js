"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
const CartBadge = (_) => null;
const AuthMenu = (_) => null;
const MobileNav = (_) => null;
const SearchOverlay = (_) => null;
const DarkModeToggle = (_) => null;
const LanguageSwitcher = (_) => null;
// CurrencySwitcher provided by consumer
const CurrencySwitcher = (_) => null;
// content injected via locale prop
const content = {};
const c = content;
const submenu = c.categoryMenu || {};
const NAV_ITEMS = [
    { href: "/", label: "Inicio" },
    { href: "/tienda", label: "Tienda" },
    { href: "/productos", label: "Productos" },
    { href: "/blog", label: "Blog" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/promociones", label: "Ofertas" },
    { href: "/faq", label: "FAQ" },
    { href: "/contacto", label: "Contacto" },
];
export function Header({ onCartClick }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const pathname = usePathname();
    return (_jsxs(_Fragment, { children: [_jsx("header", { className: "sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm", children: _jsx("div", { className: "max-w-7xl mx-auto px-4", children: _jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsx("button", { onClick: () => setMobileOpen(true), className: "lg:hidden p-2 text-gray-600", "aria-label": "Abrir men\u00FA", children: _jsx("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) }) }), _jsx(Link, { href: "/", className: "flex items-center gap-2", children: _jsx("img", { src: "/images/logo-v2.png", alt: "El Viajero", className: "h-8 w-8 rounded-full" }) }), _jsx("nav", { className: "hidden lg:flex items-center gap-1", children: NAV_ITEMS.map((item) => (_jsx(Link, { href: item.href, className: `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === item.href ? "text-[var(--color-primary)] bg-green-50" : "text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-50"}`, children: item.label }, item.href))) }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { onClick: () => setSearchOpen(true), className: "p-2 text-gray-600 hover:text-[var(--color-primary)]", "aria-label": "Buscar", children: _jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) }), _jsx(CurrencySwitcher, {}), _jsx(LanguageSwitcher, {}), _jsx(DarkModeToggle, {}), _jsx(AuthMenu, {}), _jsx(CartBadge, { onClick: onCartClick })] })] }) }) }), _jsx(SearchOverlay, { isOpen: searchOpen, onClose: () => setSearchOpen(false) }), _jsx(MobileNav, { open: mobileOpen, onClose: () => setMobileOpen(false) })] }));
}
//# sourceMappingURL=header.js.map