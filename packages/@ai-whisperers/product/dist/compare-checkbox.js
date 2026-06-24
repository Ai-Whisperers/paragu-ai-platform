"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const KEY = "viajero_compare";
export function CompareCheckbox({ productName }) {
    const [checked, setChecked] = useState(() => {
        try {
            const list = JSON.parse(localStorage.getItem(KEY) || "[]");
            return list.includes(productName);
        }
        catch {
            return false;
        }
    });
    const toggle = () => {
        try {
            const list = JSON.parse(localStorage.getItem(KEY) || "[]");
            if (checked) {
                const updated = list.filter(n => n !== productName);
                localStorage.setItem(KEY, JSON.stringify(updated));
            }
            else {
                if (list.length >= 4) {
                    alert("Máximo 4 productos para comparar");
                    return;
                }
                localStorage.setItem(KEY, JSON.stringify([...list, productName]));
            }
            setChecked(!checked);
        }
        catch { }
    };
    return (_jsxs("label", { className: "flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground", onClick: e => e.stopPropagation(), children: [_jsx("input", { type: "checkbox", checked: checked, onChange: toggle, className: "rounded border-border text-primary focus:ring-primary" }), "Comparar"] }));
}
//# sourceMappingURL=compare-checkbox.js.map