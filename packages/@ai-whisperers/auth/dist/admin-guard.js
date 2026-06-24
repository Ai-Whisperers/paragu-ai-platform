'use client';
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useAdminAuth } from './auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// useAuth with role check
export function AdminGuard({ children }) {
    const { isAdmin, checking } = useAdminAuth?.() ?? { isAdmin: false, checking: true };
    const router = useRouter();
    useEffect(() => { if (!checking && !isAdmin)
        router.push('/login'); }, [isAdmin, checking, router]);
    if (checking)
        return _jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("p", { className: "text-muted-foreground", children: "Verificando..." }) });
    if (!isAdmin)
        return null;
    return _jsx(_Fragment, { children: children });
}
export function useAuth() {
    // Placeholder — actual admin check logic from elviajero
    return { isAdmin: false, checking: false };
}
//# sourceMappingURL=admin-guard.js.map