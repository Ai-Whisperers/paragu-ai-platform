// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useShare } from '../useShare'

describe('useShare', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(() => Promise.resolve()),
      },
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('falls back to clipboard when native share is unavailable', async () => {
    const { result } = renderHook(() => useShare())

    const res = await act(async () => {
      return result.current.share({ text: 'test', url: 'https://example.com' })
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('https://example.com')
  })

  it('returns fallback method when using clipboard', async () => {
    const { result } = renderHook(() => useShare())

    const res = await act(async () => {
      return result.current.share({ text: 'test', url: 'https://example.com' })
    })

    expect(res.shared).toBe(true)
    expect(res.method).toBe('fallback')
  })
})
