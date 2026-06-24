"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function SkeletonCard() {
    return (_jsxs("div", { className: "animate-pulse rounded-xl border border-border bg-surface p-4", children: [_jsx("div", { className: "mb-3 aspect-[3/2] rounded-lg bg-muted" }), _jsx("div", { className: "h-3 w-2/3 rounded bg-muted mb-2" }), _jsx("div", { className: "h-4 w-1/2 rounded bg-muted mb-2" }), _jsx("div", { className: "h-3 w-1/3 rounded bg-muted" })] }));
}
export function SkeletonGrid({ count = 6 }) {
    return (_jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: Array.from({ length: count }).map((_, i) => _jsx(SkeletonCard, {}, i)) }));
}
export function SkeletonText({ lines = 3 }) {
    return (_jsx("div", { className: "animate-pulse space-y-2", children: Array.from({ length: lines }).map((_, i) => (_jsx("div", { className: "h-3 rounded bg-muted " + (i === lines - 1 ? "w-2/3" : "w-full") }, i))) }));
}
//# sourceMappingURL=skeleton.js.map