// Public barrel — `import { createBrowserSupabase } from '@/lib/supabase'`
// Server and service clients are NOT re-exported here because they pull in
// `next/headers` and would break the client bundle if imported.
export { createBrowserSupabase } from './browser'
