"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
export function CookieConsent({ config: cfg }) {
    const config = cfg || {};
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const accepted = localStorage.getItem("viajero-cookies-accepted");
        if (!accepted && config.enabled !== false)
            setVisible(true);
    }, []);
    const accept = () => {
        localStorage.setItem("viajero-cookies-accepted", "true");
        setVisible(false);
    };
    if (!visible)
        return null;
    return (_jsx("div", { className: "fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white p-4 shadow-lg", children: _jsxs("div", { className: "mx-auto flex max-w-7xl flex-col items-center gap-3 sm:flex-row sm:justify-between", children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: [config.message || "Usamos cookies para mejorar tu experiencia.", config.moreInfoLink && (_jsxs(_Fragment, { children: [" ", _jsx("a", { href: config.moreInfoLink || "/privacidad", className: "text-primary underline hover:no-underline", children: config.moreInfoText || "Más información" })] }))] }), _jsx("button", { onClick: accept, className: "rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90", children: config.acceptText || "Aceptar" })] }) }));
}
//# sourceMappingURL=cookie-consent.js.map