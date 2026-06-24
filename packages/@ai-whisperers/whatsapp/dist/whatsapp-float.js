import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function WhatsAppFloat({ phone, message = "Hola! Quiero información" }) {
    const cleanPhone = phone.replace(/[\s+]/g, "");
    const href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    return (_jsx("a", { href: href, target: "_blank", rel: "noopener noreferrer", className: "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl", "aria-label": "Contactar por WhatsApp", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" }), _jsx("path", { d: "M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" }), _jsx("path", { d: "M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" }), _jsx("path", { d: "M9.5 13.5c.5 1 1.5 1.5 2.5 1.5s2-.5 2.5-1.5" })] }) }));
}
//# sourceMappingURL=whatsapp-float.js.map