"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./cn";
import { cva } from "class-variance-authority";
const skeletonVariants = cva("animate-pulse bg-surface-light rounded-md", {
    variants: {
        variant: {
            default: "",
            text: "h-4 w-full",
            avatar: "h-10 w-10 rounded-full",
            image: "aspect-video w-full",
            card: "h-32 w-full",
            circle: "rounded-full",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
export function Skeleton({ className, variant, rows = 1, ...props }) {
    if (rows > 1) {
        return (_jsx("div", { className: "space-y-2", ...props, children: Array.from({ length: rows }).map((_, i) => (_jsx("div", { className: cn(skeletonVariants({ variant }), className) }, i))) }));
    }
    return (_jsx("div", { className: cn(skeletonVariants({ variant }), className), ...props }));
}
// Pre-built skeleton components for common use cases
export function SkeletonText({ lines = 3, className }) {
    return (_jsx("div", { className: cn("space-y-2", className), children: Array.from({ length: lines }).map((_, i) => (_jsx(Skeleton, { className: cn("h-4", i === lines - 1 ? "w-3/4" : "w-full") }, i))) }));
}
export function SkeletonTableRow({ columns = 4 }) {
    return (_jsxs("div", { className: "flex items-center space-x-4 py-3", children: [_jsx(Skeleton, { variant: "avatar" }), Array.from({ length: columns - 1 }).map((_, i) => (_jsx(Skeleton, { className: "h-4 flex-1" }, i)))] }));
}
export function SkeletonCard({ hasImage = true }) {
    return (_jsxs("div", { className: "space-y-3", children: [hasImage && _jsx(Skeleton, { variant: "image" }), _jsx(Skeleton, { className: "h-5 w-2/3" }), _jsx(SkeletonText, { lines: 2 })] }));
}
//# sourceMappingURL=skeleton.js.map