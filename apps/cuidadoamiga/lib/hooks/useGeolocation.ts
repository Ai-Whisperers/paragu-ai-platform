'use client'

import { useEffect, useState, useCallback } from 'react'

type GeolocationState = {
  status: 'idle' | 'loading' | 'denied' | 'error' | 'success'
  coords?: GeolocationCoordinates
  error?: string
}

/**
 * Browser geolocation with consent. Starts idle; call `request()` to trigger
 * the browser prompt. Returns the user's current position on success.
 */
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({ status: 'idle' })

  const request = useCallback(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setState({ status: 'error', error: 'Geolocation not available' })
      return
    }

    setState({ status: 'loading' })

    navigator.geolocation.getCurrentPosition(
      (pos) => setState({ status: 'success', coords: pos.coords }),
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setState({ status: 'denied', error: 'Permission denied' })
        } else {
          setState({ status: 'error', error: err.message })
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 120000 },
    )
  }, [])

  return { ...state, request }
}
