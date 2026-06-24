"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export function ProductTabs({ tabs, defaultTab }) {
    const [active, setActive] = useState(defaultTab || tabs[0]?.id || "");
    return (_jsxs("div", { className: "mt-12", children: [_jsx("div", { className: "flex border-b border-border overflow-x-auto", children: tabs.map((tab) => (_jsx("button", { onClick: () => setActive(tab.id), className: "px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all -mb-[1px] " +
                        (active === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"), children: tab.label }, tab.id))) }), _jsx("div", { className: "pt-6", children: tabs.find((t) => t.id === active)?.content })] }));
}
//# sourceMappingURL=product-tabs.js.map