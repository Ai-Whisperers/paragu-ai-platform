"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ShareButtons({ productName, productSlug }) {
    const url = `https://el-viajero.paragu-ai.com/producto/${productSlug}`;
    const shareText = encodeURIComponent(`Mirá ${productName} en El Viajero — ${url}`);
    return (_jsxs("div", { className: "mt-8 flex items-center gap-3 text-sm text-muted-foreground", children: [_jsx("span", { children: "Compartir:" }), _jsx("a", { href: `https://wa.me/?text=${shareText}`, target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: "WhatsApp" }), _jsx("a", { href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: "Facebook" }), _jsx("button", { onClick: () => { navigator.clipboard.writeText(url); }, className: "text-primary hover:underline", children: "Copiar link" })] }));
}
//# sourceMappingURL=share-buttons.js.map