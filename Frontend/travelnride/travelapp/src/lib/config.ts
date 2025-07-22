// API Configuration - Update these URLs to match your backend
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1",
  ENDPOINTS: {
    // Dashboard & Analytics
    DASHBOARD_STATS: "/Admin/stats",
    ANALYTICS: "/analytics",
    
    // Tours/Packages
    TOURS: "/Packages",
    TOUR_BY_ID: (id: string) => `/Packages/${id}`,
    
    // Bookings
    BOOKINGS: "/booking",
    BOOKING_BY_ID: (id: string) => `/booking/${id}`,
    
    // Users
    USERS: "/Admin/users",
    USER_BY_ID: (id: string) => `/user/${id}`,
    
    // Reviews & Ratings
    REVIEWS: "/Rating",
    REVIEWS_BY_TOUR: (tourId: string) => `/Rating/tour/${tourId}`,
    
    // Orders
    ORDERS: "/Admin/orders",
    ORDER_BY_ID: (id: string) => `/Admin/orders/${id}`,
    
    // Coupons
    COUPONS: "/Admin/coupons",
    COUPON_BY_ID: (id: string) => `/Admin/coupons/${id}`,
    
    // Offers (to be implemented in backend)
    OFFERS: "/offers",
    OFFER_BY_ID: (id: string) => `/offers/${id}`,
    OFFER_ANALYTICS: (id: string) => `/offers/${id}/analytics`,
    
    // Notifications (to be implemented in backend)
    NOTIFICATION_SETTINGS: "/notifications/settings",
    NOTIFICATION_HISTORY: "/notifications/history",
    NOTIFICATION_TEST: "/notifications/test",
    
    // Authentication
    AUTH_LOGIN: "/auth/login",
    AUTH_LOGOUT: "/auth/logout",
    AUTH_REFRESH: "/auth/refresh",
    
    // Legacy endpoints for backward compatibility
    DESTINATIONS: "/Packages", // Maps to tours
  },
}

// Token management
export const TokenManager = {
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token')
    }
    return null
  },
  
  setToken: (token: string, remember = false) => {
    if (typeof window !== 'undefined') {
      if (remember) {
        localStorage.setItem('admin_token', token)
      } else {
        sessionStorage.setItem('admin_token', token)
      }
    }
  },
  
  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token')
      sessionStorage.removeItem('admin_token')
    }
  }
}

// Enhanced API Helper function with authentication
export async function apiCall(endpoint: string, options?: RequestInit) {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`
  const token = TokenManager.getToken()

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  }

  // Add authorization header if token exists
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`
  }

  const defaultOptions: RequestInit = {
    headers: defaultHeaders,
  }

  // Merge options, with custom headers taking precedence
  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options?.headers || {}),
    },
  }

  try {
    const response = await fetch(url, mergedOptions)

    // Handle authentication errors
    if (response.status === 401) {
      TokenManager.removeToken()
      // Redirect to login if we're in the browser
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
      throw new Error('Authentication required')
    }

    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = `HTTP error! status: ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.error || errorMessage
      } catch {
        // If response is not JSON, use default message
      }
      throw new Error(errorMessage)
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    } else {
      return null
    }
  } catch (error) {
    console.error("API call failed:", error)
    throw error
  }
}

// Utility function for handling API errors consistently
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }
  return 'An unexpected error occurred'
}
