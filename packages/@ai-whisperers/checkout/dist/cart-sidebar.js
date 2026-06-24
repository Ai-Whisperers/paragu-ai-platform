"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCart } from "@ai-whisperers/commerce/cart/cart-context";
// CartEmptyState provided by consumer
const CartEmptyState = ({ onClose }) => _jsx("div", { children: "Your cart is empty" });
import { useEffect } from "react";
import Link from "next/link";
export function CartSidebar({ open, onClose }) {
    useEffect(() => {
        if (!open)
            return;
        const handler = (e) => { if (e.key === "Escape")
            onClose(); };
        document.addEventListener("keydown", handler);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handler);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);
    const { items, removeItem, updateQuantity, total, clearCart } = useCart();
    const formatGs = (n) => "Gs. " + n.toLocaleString("es-PY");
    const whatsappMsg = encodeURIComponent("¡Hola! Quiero hacer un pedido:\n" +
        items.map((i) => `- ${i.name} x${i.quantity}: ${formatGs((i.priceGs ?? 0) * i.quantity)}`).join("\n") +
        `\n\nTotal: ${formatGs(total)}\n\n¿Formas de pago y envío?`);
    if (!open)
        return null;
    return (_jsxs("div", { className: "fixed inset-0 z-50", children: [_jsx("div", { className: "absolute inset-0 bg-black/50 backdrop-blur-sm", onClick: onClose }), _jsxs("div", { className: "absolute bottom-0 right-0 top-0 w-full max-w-md bg-white shadow-xl", children: [_jsxs("div", { className: "flex items-center justify-between border-b px-4 py-4", children: [_jsxs("h2", { className: "text-lg font-bold text-foreground", children: ["Carrito (", items.length, ")"] }), _jsx("button", { onClick: onClose, className: "text-muted-foreground hover:text-foreground text-xl leading-none", children: "\u2715" })] }), _jsxs("div", { className: "overflow-y-auto px-4 py-4", style: { maxHeight: "calc(100vh - 200px)" }, children: [items.length === 0 && _jsx(CartEmptyState, {}), items.map((item) => (_jsxs("div", { className: "mb-3 rounded-lg border border-border bg-surface p-3", children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-semibold text-foreground text-sm", children: item.name }), item.priceBefore && (_jsx("p", { className: "text-xs text-muted-foreground line-through", children: item.priceBefore })), _jsx("p", { className: "text-primary font-bold", children: formatGs((item.priceGs ?? 0) * item.quantity) })] }), _jsx("button", { onClick: () => removeItem(item.name), className: "text-xs text-destructive hover:underline", children: "Eliminar" })] }), _jsxs("div", { className: "mt-2 flex items-center gap-2", children: [_jsx("span", { className: "text-xs text-muted-foreground", children: "Cant:" }), _jsx("button", { onClick: () => updateQuantity(item.name, item.quantity - 1), className: "flex h-6 w-6 items-center justify-center rounded border border-border text-sm", children: "\u2212" }), _jsx("span", { className: "w-6 text-center text-sm font-medium", children: item.quantity }), _jsx("button", { onClick: () => updateQuantity(item.name, item.quantity + 1), className: "flex h-6 w-6 items-center justify-center rounded border border-border text-sm", children: "+" })] })] }, item.name)))] }), items.length > 0 && (_jsxs("div", { className: "border-t bg-white px-4 py-4", children: [_jsxs("p", { className: "mb-3 text-lg font-bold text-foreground", children: ["Total: ", formatGs(total)] }), _jsx(Link, { href: "/checkout", className: "flex w-full items-center justify-center rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90", children: "Ir al checkout" }), _jsx("button", { onClick: clearCart, className: "mt-2 w-full text-center text-sm text-muted-foreground hover:text-foreground", children: "Vaciar carrito" })] }))] })] }));
}
//# sourceMappingURL=cart-sidebar.js.map