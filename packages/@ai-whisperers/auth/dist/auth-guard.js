"use client";
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export function createAuthGuard(useAuth) {
    return function AuthGuard({ children }) {
        const { user, loading } = useAuth();
        const router = useRouter();
        useEffect(() => { if (!loading && !user)
            router.push("/login"); }, [user, loading, router]);
        if (loading)
            return _jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("p", { className: "text-muted-foreground", children: "Cargando..." }) });
        if (!user)
            return _jsx(_Fragment, {});
        return _jsx(_Fragment, { children: children });
    };
}
//# sourceMappingURL=auth-guard.js.map