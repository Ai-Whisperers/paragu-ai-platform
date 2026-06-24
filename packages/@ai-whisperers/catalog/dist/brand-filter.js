"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function BrandFilter({ brands, selected, onChange }) {
    const toggle = (brand) => {
        if (selected.includes(brand))
            onChange(selected.filter(b => b !== brand));
        else
            onChange([...selected, brand]);
    };
    return (_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium text-foreground", children: "Marca" }), _jsx("div", { className: "flex flex-wrap gap-2", children: brands.map(b => (_jsx("button", { onClick: () => toggle(b), className: "rounded-full px-3 py-1 text-xs font-medium transition-all " + (selected.includes(b) ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary hover:text-primary"), children: b }, b))) })] }));
}
//# sourceMappingURL=brand-filter.js.map