import type { User } from "./types";
import type { Address } from "./types";
import type { SupabaseClient } from "@supabase/supabase-js";
export declare function useAuthAddresses(supabase: SupabaseClient, user: User | null): {
    addresses: Address[];
    setAddresses: import("react").Dispatch<import("react").SetStateAction<Address[]>>;
    loadAddresses: () => Promise<void>;
    addAddress: (a: Omit<Address, "id">) => Promise<{
        ok: boolean;
        error: string;
    } | {
        ok: boolean;
        error?: undefined;
    }>;
    updateAddress: (id: string, a: Partial<Address>) => Promise<{
        ok: boolean;
        error: string;
    } | {
        ok: boolean;
        error?: undefined;
    }>;
    removeAddress: (id: string) => Promise<void>;
};
//# sourceMappingURL=address-hooks.d.ts.map