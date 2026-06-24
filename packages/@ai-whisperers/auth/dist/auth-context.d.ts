import { ReactNode, JSX } from "react";
export interface UserProfile {
    id: string;
    email: string;
    name?: string;
    role?: string;
    avatar_url?: string;
    phone?: string;
    [key: string]: any;
}
export interface Address {
    id: string;
    label: string;
    street: string;
    city: string;
    state?: string;
    zip?: string;
    country?: string;
    isDefault?: boolean;
}
export interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{
        error?: string;
    }>;
    signUp: (email: string, password: string, name?: string) => Promise<{
        error?: string;
    }>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<{
        error?: string;
    }>;
    updateProfile: (data: Partial<UserProfile>) => Promise<{
        error?: string;
    }>;
    addresses: Address[];
    addAddress: (address: Omit<Address, "id">) => Promise<void>;
}
interface AuthConfig {
    supabaseUrl: string;
    supabaseAnonKey: string;
    storagePrefix: string;
}
export declare function createAuthContext(config: AuthConfig): {
    AuthProvider: ({ children }: {
        children: ReactNode;
    }) => JSX.Element;
    useAuth: () => AuthContextType;
    supabase: import("@supabase/supabase-js").SupabaseClient<any, "public", "public", any, any>;
};
export {};
//# sourceMappingURL=auth-context.d.ts.map