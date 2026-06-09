// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello'))
    expect(result.current).toBe('hello')
  })

  it('does not update value before delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'hello' } },
    )

    rerender({ value: 'world' })
    // Still old value after 200ms
    act(() => { vi.advanceTimersByTime(200) })
    expect(result.current).toBe('hello')
  })

  it('updates value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'hello' } },
    )

    rerender({ value: 'world' })
    act(() => { vi.advanceTimersByTime(300) })
    expect(result.current).toBe('world')
  })

  it('cancels previous timeout on rapid updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'a' } },
    )

    rerender({ value: 'b' })
    act(() => { vi.advanceTimersByTime(200) })
    rerender({ value: 'c' })
    act(() => { vi.advanceTimersByTime(200) })
    // Should NOT have picked up 'b'
    expect(result.current).not.toBe('b')
  })

  it('uses default 300ms delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      { initialProps: { value: 'first' } },
    )

    rerender({ value: 'second' })
    act(() => { vi.advanceTimersByTime(299) })
    expect(result.current).toBe('first')
    act(() => { vi.advanceTimersByTime(1) })
    expect(result.current).toBe('second')
  })
})
