import { redirect } from 'next/navigation'

// Default to Spanish — the only locale that's complete today.
// When we add `en` and `pt` in Phase 3, this stays as the Spanish fallback.
export default function Root() {
  redirect('/es')
}
