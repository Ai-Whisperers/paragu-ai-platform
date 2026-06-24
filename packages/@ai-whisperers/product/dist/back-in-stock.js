"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const KEY = "viajero_backinstock";
export function BackInStockForm({ productName }) {
    const [email, setEmail] = useState("");
    const [done, setDone] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const requests = JSON.parse(localStorage.getItem(KEY) || "[]");
        if (requests.some((r) => r.productName === productName && r.email === email))
            return;
        requests.push({ productName, email, createdAt: Date.now() });
        localStorage.setItem(KEY, JSON.stringify(requests));
        setDone(true);
    };
    if (done)
        return _jsx("p", { className: "text-sm text-success", children: "Te avisaremos cuando est\u00E9 disponible" });
    return (_jsxs("form", { onSubmit: handleSubmit, className: "flex gap-2", children: [_jsx("input", { type: "email", value: email, onChange: e => setEmail(e.target.value), required: true, placeholder: "tu@email.com", className: "flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring" }), _jsx("button", { type: "submit", className: "rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: "Av\u00EDsame" })] }));
}
//# sourceMappingURL=back-in-stock.js.map