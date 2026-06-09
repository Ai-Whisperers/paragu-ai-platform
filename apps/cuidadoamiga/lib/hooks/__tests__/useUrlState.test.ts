// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useUrlState } from '../useUrlState'

// vi.hoisted ensures this runs before vi.mock
const mockSearchParams = vi.hoisted(() => ({ current: new URLSearchParams() }))

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn((url: string) => {
      const qs = url.includes('?') ? url.split('?')[1] : ''
      mockSearchParams.current = new URLSearchParams(qs)
    }),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  })),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => mockSearchParams.current),
}))

describe('useUrlState', () => {
  beforeEach(() => {
    mockSearchParams.current = new URLSearchParams()
  })

  it('reads initial params from URL', () => {
    mockSearchParams.current = new URLSearchParams('pais=PY&tipo=femicidio')
    const { result } = renderHook(() => useUrlState())
    const [params] = result.current
    expect(params.pais).toBe('PY')
    expect(params.tipo).toBe('femicidio')
  })

  it('returns empty object when no params', () => {
    const { result } = renderHook(() => useUrlState())
    const [params] = result.current
    expect(params).toEqual({})
  })

  it('sets a param and updates URL', () => {
    const { result, rerender } = renderHook(() => useUrlState())

    act(() => {
      result.current[1]('pais', 'AR')
    })

    rerender()

    const [params] = result.current
    expect(params.pais).toBe('AR')
  })

  it('clears all params', () => {
    mockSearchParams.current = new URLSearchParams('pais=PY&tipo=femicidio')
    const { result, rerender } = renderHook(() => useUrlState())

    act(() => {
      result.current[2]()
    })

    rerender()

    const [params] = result.current
    expect(params).toEqual({})
  })
})
