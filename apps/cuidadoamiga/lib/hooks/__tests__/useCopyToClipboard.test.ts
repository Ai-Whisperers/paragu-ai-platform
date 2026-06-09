// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCopyToClipboard } from '../useCopyToClipboard'

describe('useCopyToClipboard', () => {
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

  it('starts in idle state', () => {
    const { result } = renderHook(() => useCopyToClipboard())
    expect(result.current.status).toBe('idle')
  })

  it('copies text and sets status to copied', async () => {
    const { result } = renderHook(() => useCopyToClipboard())

    await act(async () => {
      await result.current.copy('test text')
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text')
    expect(result.current.status).toBe('copied')
  })

  it('resets status to idle after 2 seconds', async () => {
    const { result } = renderHook(() => useCopyToClipboard())

    await act(async () => {
      await result.current.copy('test')
    })
    expect(result.current.status).toBe('copied')

    act(() => { vi.advanceTimersByTime(2000) })
    expect(result.current.status).toBe('idle')
  })

  it('handles clipboard error gracefully', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(() => Promise.reject(new Error('Permission denied'))),
      },
    })

    const { result } = renderHook(() => useCopyToClipboard())

    await act(async () => {
      await result.current.copy('test')
    })

    expect(result.current.status).toBe('error')
  })
})
