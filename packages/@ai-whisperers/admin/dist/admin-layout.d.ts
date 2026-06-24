interface Profile {
    id: string;
    name: string;
    email: string;
    role: string;
}
export declare function useAdminAuth(): {
    authed: boolean;
    admin: Profile | null;
    loading: boolean;
};
export declare function AdminShell({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=admin-layout.d.ts.map