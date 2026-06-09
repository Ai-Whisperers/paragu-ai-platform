import { describe, it, expect } from 'vitest'

// Note: useFilterState depends on useUrlState which depends on `useSearchParams`
// from Next.js. Full testing requires a Next.js router mock. Here we verify
// the hook's type contract and edge cases via the exported FilterState type.
//
// Full integration tests should be done in Storybook or Playwright.

describe('useFilterState (types)', () => {
  it('exports FilterState with correct shape', () => {
    // Type-level test: these assignments should be valid
    const state: import('../useFilterState').FilterState = {
      pais: 'PY',
      tipo: 'femicidio',
      year: 2024,
      q: 'search',
      estado: undefined,
    }
    expect(state.pais).toBe('PY')
    expect(state.tipo).toBe('femicidio')
    expect(state.year).toBe(2024)
    expect(state.q).toBe('search')
  })

  it('allows all fields to be undefined', () => {
    const state: import('../useFilterState').FilterState = {
      pais: undefined,
      tipo: undefined,
      year: undefined,
      q: undefined,
      estado: undefined,
    }
    expect(Object.values(state).every(v => v === undefined)).toBe(true)
  })
})
