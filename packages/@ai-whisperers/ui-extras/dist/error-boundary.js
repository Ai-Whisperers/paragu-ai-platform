'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
export class ErrorBoundary extends Component {
    constructor() {
        super(...arguments);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() { return { hasError: true }; }
    render() {
        if (this.state.hasError)
            return this.props.fallback || _jsxs("div", { className: "p-8 text-center", children: [_jsx("h2", { className: "text-xl font-bold", children: "Algo sali\u00F3 mal" }), _jsx("p", { className: "text-gray-500", children: "Recarg\u00E1 la p\u00E1gina o intent\u00E1 de nuevo." })] });
        return this.props.children;
    }
}
//# sourceMappingURL=error-boundary.js.map