"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useCart } from "@ai-whisperers/commerce/cart/cart-context";
export function CartMultiSelect() {
    const { items, removeItem } = useCart();
    const [selected, setSelected] = useState([]);
    const toggle = (name) => {
        setSelected(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
    };
    const selectAll = () => {
        if (selected.length === items.length)
            setSelected([]);
        else
            setSelected(items.map(i => i.name));
    };
    const deleteSelected = () => {
        selected.forEach(name => removeItem(name));
        setSelected([]);
    };
    if (items.length === 0)
        return null;
    return (_jsx("div", { className: "border-b border-border px-4 py-2", children: _jsxs("div", { className: "flex items-center gap-3 text-xs", children: [_jsxs("label", { className: "flex items-center gap-1.5 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: selected.length === items.length && items.length > 0, onChange: selectAll, className: "rounded border-border" }), "Seleccionar todos"] }), selected.length > 0 && (_jsxs("button", { onClick: deleteSelected, className: "text-destructive hover:underline", children: ["Eliminar (", selected.length, ")"] })), _jsxs("span", { className: "text-muted-foreground", children: [selected.length, " de ", items.length] })] }) }));
}
//# sourceMappingURL=cart-multi-select.js.map