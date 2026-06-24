"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
export function ExitIntentPopup() {
    const [show, setShow] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("viajero_exit_dismissed")) {
            setDismissed(true);
            return;
        }
        const handler = (e) => {
            if (e.clientY <= 0 && !dismissed)
                setShow(true);
        };
        document.addEventListener("mouseleave", handler);
        return () => document.removeEventListener("mouseleave", handler);
    }, [dismissed]);
    const close = () => { setShow(false); setDismissed(true); localStorage.setItem("viajero_exit_dismissed", "true"); };
    if (!show)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4", onClick: close, children: _jsxs("div", { className: "relative max-w-sm rounded-2xl bg-surface p-8 text-center shadow-2xl", onClick: e => e.stopPropagation(), children: [_jsx("button", { onClick: close, className: "absolute right-3 top-3 text-muted-foreground hover:text-foreground", children: "\u2715" }), _jsx("div", { className: "relative mx-auto mb-4 h-36 w-full max-w-[280px] overflow-hidden rounded-xl", children: _jsx(Image, { src: "/images/marketing/exit-intent-promo.png", alt: "", fill: true, className: "object-cover", sizes: "280px" }) }), _jsx("h2", { className: "text-xl font-bold text-foreground mb-2", children: "\u00A1No te vayas a\u00FAn!" }), _jsxs("p", { className: "text-sm text-muted-foreground mb-6", children: ["Us\u00E1 el c\u00F3digo ", _jsx("strong", { className: "text-primary", children: "BIENVENIDO10" }), " y obten\u00E9 10% de descuento en tu primera compra."] }), _jsx(Link, { href: "/tienda", onClick: close, className: "inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90", children: "Ver ofertas" })] }) }));
}
//# sourceMappingURL=exit-intent.js.map