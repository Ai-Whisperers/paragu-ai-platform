// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, act, waitFor } from '@testing-library/react'
import React from 'react'
import { useInfiniteScroll } from '../useInfiniteScroll'

function TestComponent(props: {
  onLoadMore: () => void
  hasMore: boolean
  disabled?: boolean
}) {
  const sentinelRef = useInfiniteScroll(props)
  return React.createElement('div', null,
    React.createElement('div', { 'data-testid': 'content' }, 'items'),
    React.createElement('div', { ref: sentinelRef, 'data-testid': 'sentinel' }),
  )
}

describe('useInfiniteScroll', () => {
  let ioCallback: IntersectionObserverCallback | null = null

  beforeEach(() => {
    ioCallback = null
    vi.stubGlobal('IntersectionObserver', vi.fn((callback: IntersectionObserverCallback) => {
      ioCallback = callback
      return { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn(), root: null, rootMargin: '', thresholds: [], takeRecords: () => [] }
    }))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('calls onLoadMore when sentinel becomes visible', async () => {
    const onLoadMore = vi.fn()
    render(React.createElement(TestComponent, { onLoadMore, hasMore: true }))

    await waitFor(() => expect(ioCallback).not.toBeNull())
    act(() => { ioCallback!([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver) })

    expect(onLoadMore).toHaveBeenCalledTimes(1)
  })

  it('does not create observer when disabled', () => {
    const onLoadMore = vi.fn()
    render(React.createElement(TestComponent, { onLoadMore, hasMore: true, disabled: true }))

    // useEffect returns early when disabled, so observer is never created
    expect(ioCallback).toBeNull()
  })

  it('does not call onLoadMore when hasMore is false', () => {
    const onLoadMore = vi.fn()
    render(React.createElement(TestComponent, { onLoadMore, hasMore: false }))

    expect(ioCallback).toBeNull()
  })
})
