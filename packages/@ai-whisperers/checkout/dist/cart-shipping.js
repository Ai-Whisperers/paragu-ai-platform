"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const shippingRates = {
    asuncion: 10000, "mariano roque alonso": 12000, lambare: 12000,
    "fernando de la mora": 15000, "san lorenzo": 15000, luque: 15000,
    capiata: 18000, itaugua: 18000, "villa elisa": 15000,
    nemby: 18000, limpio: 18000, "san antonio": 18000,
};
export function CartShippingEstimator() {
    const [city, setCity] = useState("");
    const rate = shippingRates[city.toLowerCase().trim()] || 25000;
    return (_jsxs("div", { className: "border-t border-border px-4 py-4", children: [_jsx("p", { className: "mb-2 text-xs font-medium text-muted-foreground", children: "Calcular env\u00EDo" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { value: city, onChange: e => setCity(e.target.value), placeholder: "Tu ciudad", className: "flex-1 rounded-lg border border-input bg-background px-3 py-2 text-xs outline-none focus:border-ring" }), city && _jsxs("p", { className: "text-xs font-medium text-foreground self-center", children: ["Gs. ", rate.toLocaleString("es-PY")] })] })] }));
}
//# sourceMappingURL=cart-shipping.js.map