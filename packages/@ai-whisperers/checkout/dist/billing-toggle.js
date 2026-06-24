"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function BillingAddressToggle({ checked, onChange }) {
    return (_jsxs("label", { className: "flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition-all", children: [_jsx("input", { type: "checkbox", checked: checked, onChange: e => onChange(e.target.checked), className: "rounded" }), _jsx("div", { className: "text-sm", children: _jsx("p", { className: "font-medium text-foreground", children: "La direcci\u00F3n de env\u00EDo es la misma que la de facturaci\u00F3n" }) })] }));
}
//# sourceMappingURL=billing-toggle.js.map