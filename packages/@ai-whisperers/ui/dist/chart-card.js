"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
export function ChartCard({ title, description, children, className }) {
    return (_jsxs(Card, { className: className, children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-lg", children: title }), description && _jsx(CardDescription, { children: description })] }), _jsx(CardContent, { children: children })] }));
}
//# sourceMappingURL=chart-card.js.map