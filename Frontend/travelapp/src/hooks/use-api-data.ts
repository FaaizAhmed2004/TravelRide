"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { apiCall } from "@/lib/config"

export interface UseApiDataOptions<T = unknown> {
  refetchOnMount?: boolean
  refetchInterval?: number
  enabled?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: string) => void
  retryCount?: number
  retryDelay?: number
}

export function useApiData<T>(
  endpoint: string, 
  dependencies: string[] = [],
  options: UseApiDataOptions<T> = {}
) {
  const {
    refetchOnMount = true,
    refetchInterval,
    enabled = true,
    onSuccess,
    onError,
    retryCount = 3,
    retryDelay = 1000
  } = options

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(refetchOnMount && enabled)
  const [error, setError] = useState<string | null>(null)
  const [retryAttempt, setRetryAttempt] = useState(0)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async (isRetry = false) => {
    if (!enabled) return

    try {
      if (!isRetry) {
        setLoading(true)
        setError(null)
        setRetryAttempt(0)
      }
      
      const result = await apiCall(endpoint)
      
      if (mountedRef.current) {
        setData(result)
        setError(null)
        setRetryAttempt(0)
        onSuccess?.(result)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      console.error("Failed to fetch data:", err)
      
      if (mountedRef.current) {
        // Retry logic
        if (retryAttempt < retryCount) {
          setRetryAttempt(prev => prev + 1)
          setTimeout(() => {
            if (mountedRef.current) {
              fetchData(true)
            }
          }, retryDelay * (retryAttempt + 1)) // Exponential backoff
        } else {
          setError(errorMessage)
          onError?.(errorMessage)
        }
      }
    } finally {
      if (mountedRef.current && !isRetry) {
        setLoading(false)
      }
    }
  }, [endpoint, enabled, onSuccess, onError, retryCount, retryDelay, retryAttempt])

  const refetch = useCallback(() => {
    setRetryAttempt(0)
    fetchData()
  }, [fetchData])

  // Initial fetch
  useEffect(() => {
    if (refetchOnMount && enabled) {
      fetchData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, enabled, ...dependencies])

  // Polling interval
  useEffect(() => {
    if (refetchInterval && enabled && data) {
      intervalRef.current = setInterval(() => {
        fetchData()
      }, refetchInterval)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [refetchInterval, enabled, data, fetchData])

  // Cleanup
  useEffect(() => {
    return () => {
      mountedRef.current = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return { 
    data, 
    loading, 
    error, 
    refetch,
    isRetrying: retryAttempt > 0,
    retryAttempt
  }
}

// Specialized hooks for common use cases
export function useTours() {
  return useApiData('/Packages')
}

export function useBookings() {
  return useApiData('/booking')
}

export function useUsers() {
  return useApiData('/Admin/users')
}

export function useReviews() {
  return useApiData('/Rating')
}

export function useOrders() {
  return useApiData('/Admin/orders')
}

export function useCoupons() {
  return useApiData('/Admin/coupons')
}

export function useOffers() {
  return useApiData('/offers')
}

export function useDashboardStats() {
  return useApiData('/Admin/stats', [], {
    refetchInterval: 30000, // Refresh every 30 seconds
  })
}

export function useNotificationSettings() {
  return useApiData('/notifications/settings')
}

export function useNotificationHistory() {
  return useApiData('/notifications/history')
}

// Hook for mutations (POST, PUT, DELETE)
export function useApiMutation<TData = unknown>() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<TData | null>(null)

  const mutate = useCallback(async (
    endpoint: string,
    options: RequestInit,
    onSuccess?: (data: TData) => void,
    onError?: (error: string) => void
  ) => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await apiCall(endpoint, options)
      setData(result)
      onSuccess?.(result)
      
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      onError?.(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return {
    mutate,
    loading,
    error,
    data,
    reset
  }
}
