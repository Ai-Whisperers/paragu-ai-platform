"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function TaxDisplay({ subtotal, taxRate = 0 }) {
    const tax = Math.round(subtotal * taxRate);
    const total = subtotal + tax;
    return (_jsxs("div", { className: "space-y-1 text-sm border-t border-border pt-3 mt-3", children: [_jsxs("div", { className: "flex justify-between text-muted-foreground", children: [_jsx("span", { children: "Subtotal" }), _jsxs("span", { children: ["Gs. ", subtotal.toLocaleString("es-PY")] })] }), tax > 0 && _jsxs("div", { className: "flex justify-between text-muted-foreground", children: [_jsxs("span", { children: ["IVA (", (taxRate * 100).toFixed(0), "%)"] }), _jsxs("span", { children: ["Gs. ", tax.toLocaleString("es-PY")] })] }), _jsxs("div", { className: "flex justify-between font-bold text-foreground text-base border-t border-border pt-2 mt-2", children: [_jsx("span", { children: "Total" }), _jsxs("span", { children: ["Gs. ", total.toLocaleString("es-PY")] })] })] }));
}
//# sourceMappingURL=tax-display.js.map