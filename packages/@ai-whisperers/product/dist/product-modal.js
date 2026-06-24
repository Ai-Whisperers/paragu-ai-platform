"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useCart } from "@ai-whisperers/commerce/cart/cart-context";
export function ProductModal({ product: p, onClose }) {
    const { addItem } = useCart();
    const [qty, setQty] = useState(1);
    const parseGs = (s) => parseInt(s.replace(/[^\d]/g, ""), 10) || 0;
    if (!p)
        return null;
    return (_jsxs("div", { className: "fixed inset-0 z-40 flex items-center justify-center p-4", children: [_jsx("div", { className: "absolute inset-0 bg-black/50", onClick: onClose }), _jsxs("div", { className: "relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl", children: [p.imageUrl && (_jsx("img", { src: p.imageUrl, alt: p.name, className: "mb-4 aspect-video w-full rounded-xl bg-muted object-cover" })), _jsx("h2", { className: "text-2xl font-bold text-foreground", children: p.name }), _jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: p.description }), _jsxs("div", { className: "mt-4 flex items-baseline gap-2", children: [_jsx("span", { className: "text-2xl font-bold text-primary", children: p.price }), p.priceBefore && (_jsx("span", { className: "text-sm text-muted-foreground line-through", children: p.priceBefore }))] }), _jsxs("div", { className: "mt-4 flex items-center gap-3", children: [_jsx("span", { className: "text-sm font-medium text-foreground", children: "Cantidad:" }), _jsx("button", { onClick: () => setQty(Math.max(1, qty - 1)), className: "flex h-8 w-8 items-center justify-center rounded border border-border text-sm", children: "\u2212" }), _jsx("span", { className: "w-8 text-center font-medium", children: qty }), _jsx("button", { onClick: () => setQty(qty + 1), className: "flex h-8 w-8 items-center justify-center rounded border border-border text-sm", children: "+" })] }), _jsxs("div", { className: "mt-6 flex gap-3", children: [_jsx("button", { onClick: () => {
                                    for (let i = 0; i < qty; i++) {
                                        addItem({
                                            id: p.id || p.slug || p.name,
                                            productId: p.id || p.slug || p.name,
                                            name: p.name,
                                            price: p.price,
                                            priceGs: parseGs(p.price),
                                            image: p.imageUrl,
                                            category: p.category,
                                            priceBefore: p.priceBefore,
                                        });
                                    }
                                    onClose();
                                }, className: "flex-1 rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90", children: "Agregar al carrito" }), _jsx("a", { href: `https://wa.me/595981234567?text=${encodeURIComponent("Hola! Me interesa " + p.name + " (" + p.price + ")")}`, target: "_blank", rel: "noopener noreferrer", className: "flex flex-1 items-center justify-center rounded-lg border border-primary py-3 font-semibold text-primary transition-all hover:bg-primary/5", children: "Consultar" })] })] })] }));
}
//# sourceMappingURL=product-modal.js.map