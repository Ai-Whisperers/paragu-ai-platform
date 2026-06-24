import { createClient } from "@supabase/supabase-js";
// singleton cache per URL+key combo to reuse clients
const clientCache = new Map();
export function getSupabaseClient(url, anonKey) {
    const supabaseUrl = url || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = anonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    const cacheKey = `${supabaseUrl}:${supabaseKey}`;
    if (!clientCache.has(cacheKey)) {
        clientCache.set(cacheKey, createClient(supabaseUrl, supabaseKey));
    }
    return clientCache.get(cacheKey);
}
export function createServiceClient(url, serviceKey) {
    const supabaseUrl = url || process.env.SUPABASE_URL || "";
    const supabaseKey = serviceKey || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
    return createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
}
//# sourceMappingURL=supabase-client.js.map