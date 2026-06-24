"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function MobileBottomNav({ cartCount }) {
    const pathname = usePathname();
    const tabs = [
        { href: "/", label: "Inicio", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
        { href: "/tienda", label: "Tienda", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
        { href: "/mi-cuenta", label: "Cuenta", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" },
    ];
    return (_jsx("nav", { className: "fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white lg:hidden safe-area-bottom", children: _jsxs("div", { className: "flex items-center justify-around h-14", children: [tabs.map((tab) => {
                    const isActive = pathname === tab.href;
                    return (_jsxs(Link, { href: tab.href, className: `flex flex-col items-center justify-center gap-0.5 px-3 py-1 transition-colors ${isActive ? "text-[var(--color-primary)]" : "text-gray-500"}`, children: [_jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: isActive ? 2 : 1.5, children: _jsx("path", { d: tab.icon }) }), _jsx("span", { className: "text-[10px] font-medium", children: tab.label })] }, tab.href));
                }), _jsxs(Link, { href: "/checkout", className: "flex flex-col items-center justify-center gap-0.5 px-3 py-1 text-gray-500 transition-colors relative", children: [_jsxs("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: [_jsx("circle", { cx: "9", cy: "21", r: "1" }), _jsx("circle", { cx: "20", cy: "21", r: "1" }), _jsx("path", { d: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" })] }), cartCount && cartCount > 0 ? (_jsx("span", { className: "absolute -top-0.5 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-white", children: cartCount > 9 ? "9+" : cartCount })) : null, _jsx("span", { className: "text-[10px] font-medium", children: "Carrito" })] })] }) }));
}
//# sourceMappingURL=mobile-bottom-nav.js.map