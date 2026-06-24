"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// getReviews/addReview provided by consumer
const getReviews = async (name) => [];
const addReview = async (data) => { };
import { useAuth } from "@ai-whisperers/auth/auth-context";
import { useState, useEffect } from "react";
export function ProductReviews({ productName }) {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");
    const [submitted, setSubmitted] = useState(false);
    useEffect(() => { getReviews(productName).then(setReviews); }, [productName]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!rating || !text.trim())
            return;
        addReview({ productName, userName: user?.name || "Anónimo", rating, text: text.trim() });
        getReviews(productName).then(setReviews);
        setRating(0);
        setText("");
        setSubmitted(true);
    };
    const avg = reviews.reduce((s, r) => s + r.rating, 0) / (reviews.length || 1);
    return (_jsxs("section", { className: "mt-12", children: [_jsx("h2", { className: "mb-2 text-xl font-bold text-foreground", children: "Opiniones" }), reviews.length > 0 && (_jsxs("p", { className: "mb-6 text-sm text-muted-foreground", children: [reviews.length, " opini\u00F3n", reviews.length > 1 ? "es" : "", " \u00B7 \u2605 ", avg.toFixed(1), " / 5"] })), _jsxs("div", { className: "space-y-4 mb-8", children: [reviews.length === 0 && (_jsx("p", { className: "text-sm text-muted-foreground", children: "No hay opiniones todav\u00EDa. \u00A1S\u00E9 el primero!" })), reviews.map((r) => (_jsxs("div", { className: "rounded-xl border border-border bg-surface p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("div", { className: "flex gap-0.5 text-amber-400 text-sm", children: Array.from({ length: 5 }).map((_, i) => _jsx("span", { children: i < r.rating ? "★" : "☆" }, i)) }), _jsx("span", { className: "text-xs font-medium text-foreground", children: r.userName }), _jsx("span", { className: "text-xs text-muted-foreground", children: new Date(r.date).toLocaleDateString("es") })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: r.text })] }, r.id)))] }), !submitted && (_jsxs("form", { onSubmit: handleSubmit, className: "rounded-xl border border-border bg-surface p-5", children: [_jsx("h3", { className: "mb-3 text-sm font-semibold text-foreground", children: "Dej\u00E1 tu opini\u00F3n" }), _jsx("div", { className: "flex gap-1 mb-3", children: [1, 2, 3, 4, 5].map((n) => (_jsx("button", { type: "button", onClick: () => setRating(n), className: `text-xl transition-all ${n <= rating ? "text-amber-400 scale-110" : "text-muted"}`, children: n <= rating ? "★" : "☆" }, n))) }), _jsx("textarea", { value: text, onChange: e => setText(e.target.value), rows: 2, placeholder: "\u00BFQu\u00E9 te pareci\u00F3?", className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring resize-none mb-3" }), _jsx("button", { type: "submit", disabled: !rating || !text.trim(), className: "rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50", children: "Publicar opini\u00F3n" })] })), submitted && _jsx("p", { className: "text-sm text-success", children: "\u00A1Gracias por tu opini\u00F3n!" })] }));
}
//# sourceMappingURL=product-reviews.js.map