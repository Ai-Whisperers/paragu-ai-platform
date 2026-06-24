"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
// content injected via locale prop
const c = {}; // consumer provides locale data
export function PromoCarousel() {
    const promos = c.promociones?.promotions || [];
    const [current, setCurrent] = useState(0);
    const next = useCallback(() => setCurrent((p) => (p + 1) % promos.length), [promos.length]);
    useEffect(() => {
        if (promos.length <= 1)
            return;
        const t = setInterval(next, 5000);
        return () => clearInterval(t);
    }, [next, promos.length]);
    if (promos.length === 0)
        return null;
    const promo = promos[current];
    return (_jsxs("a", { href: promo.ctaHref || "/promociones", className: "relative block bg-accent py-2 text-center text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90", children: [promo.badge && (_jsx("span", { className: "mr-2 inline-block rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold", children: promo.badge })), promo.title, ": ", promo.description, promos.length > 1 && (_jsxs("span", { className: "ml-2 text-accent-foreground/60", children: ["(", current + 1, "/", promos.length, ")"] }))] }));
}
//# sourceMappingURL=promo-carousel.js.map