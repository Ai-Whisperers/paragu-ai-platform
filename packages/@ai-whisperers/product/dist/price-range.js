"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export function PriceRangeSlider({ min = 0, max = 2000000, onChange }) {
    const [localMin, setLocalMin] = useState(min);
    const [localMax, setLocalMax] = useState(max);
    const fmt = (n) => "Gs. " + n.toLocaleString("es-PY");
    return (_jsxs("div", { className: "space-y-3", children: [_jsx("label", { className: "text-sm font-medium text-foreground", children: "Rango de precio" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("input", { type: "number", value: localMin, onChange: e => { setLocalMin(Number(e.target.value)); onChange(Number(e.target.value), localMax); }, className: "w-28 rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none focus:border-ring", placeholder: "M\u00EDn" }), _jsx("span", { className: "text-muted-foreground", children: "a" }), _jsx("input", { type: "number", value: localMax, onChange: e => { setLocalMax(Number(e.target.value)); onChange(localMin, Number(e.target.value)); }, className: "w-28 rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none focus:border-ring", placeholder: "M\u00E1x" })] }), _jsx("input", { type: "range", min: 0, max: 5000000, step: 10000, value: localMax, onChange: e => { setLocalMax(Number(e.target.value)); onChange(localMin, Number(e.target.value)); }, className: "w-full accent-primary" }), _jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [_jsx("span", { children: fmt(localMin) }), _jsx("span", { children: fmt(localMax) })] })] }));
}
//# sourceMappingURL=price-range.js.map