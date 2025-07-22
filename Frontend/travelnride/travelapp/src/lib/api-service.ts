import { API_CONFIG, apiCall } from './config'
import type {
  Tour,
  TourFormData,
  Booking,
  BookingFormData,
  AdminUser,
  UserFormData,
  Review,
  Order,
  Coupon,
  CouponFormData,
  Offer,
  OfferFormData,
  OfferAnalytics,
  NotificationSettings,
  NotificationHistory,
  DashboardStats,
  AnalyticsData,
  PaginatedResponse
} from './types'

/**
 * Comprehensive API Service for TravelNRide Admin Dashboard
 * Handles all CRUD operations for backend entities
 */
export class ApiService {
  // ==================== TOURS/PACKAGES ====================

  static async getTours(): Promise<Tour[]> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.TOURS)
    return response.data || response
  }

  static async getTourById(id: string): Promise<Tour> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.TOUR_BY_ID(id))
    return response.data || response
  }

  static async createTour(data: TourFormData): Promise<Tour> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.TOURS, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    return response.data || response
  }

  static async updateTour(id: string, data: Partial<TourFormData>): Promise<Tour> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.TOUR_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data)
    })
    return response.data || response
  }

  static async deleteTour(id: string): Promise<void> {
    await apiCall(API_CONFIG.ENDPOINTS.TOUR_BY_ID(id), {
      method: 'DELETE'
    })
  }

  // ==================== BOOKINGS ====================

  static async getBookings(): Promise<Booking[]> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.BOOKINGS)
    return response.bookings || response.data || response
  }

  static async getBookingById(id: string): Promise<Booking> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.BOOKING_BY_ID(id))
    return response.booking || response.data || response
  }

  static async createBooking(data: BookingFormData): Promise<Booking> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.BOOKINGS, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    return response.booking || response.data || response
  }

  static async updateBooking(id: string, data: Partial<BookingFormData>): Promise<Booking> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.BOOKING_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data)
    })
    return response.booking || response.data || response
  }

  static async updateBookingStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<Booking> {
    return this.updateBooking(id, { status })
  }

  static async deleteBooking(id: string): Promise<void> {
    await apiCall(API_CONFIG.ENDPOINTS.BOOKING_BY_ID(id), {
      method: 'DELETE'
    })
  }

  // ==================== USERS ====================

  static async getUsers(): Promise<AdminUser[]> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.USERS)
    return response.users || response.data || response
  }

  static async getUserById(id: string): Promise<AdminUser> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.USER_BY_ID(id))
    return response.user || response.data || response
  }

  static async createUser(data: UserFormData): Promise<AdminUser> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.USERS, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    return response.user || response.data || response
  }

  static async updateUser(id: string, data: Partial<UserFormData>): Promise<AdminUser> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.USER_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data)
    })
    return response.user || response.data || response
  }

  static async deleteUser(id: string): Promise<void> {
    await apiCall(API_CONFIG.ENDPOINTS.USER_BY_ID(id), {
      method: 'DELETE'
    })
  }

  // ==================== REVIEWS ====================

  static async getReviews(): Promise<Review[]> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.REVIEWS)
    return response.reviews || response.data || response
  }

  static async getReviewsByTour(tourId: string): Promise<Review[]> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.REVIEWS_BY_TOUR(tourId))
    return response.reviews || response.data || response
  }

  static async deleteReview(id: string): Promise<void> {
    await apiCall(`${API_CONFIG.ENDPOINTS.REVIEWS}/${id}`, {
      method: 'DELETE'
    })
  }

  // ==================== ORDERS ====================

  static async getOrders(): Promise<Order[]> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.ORDERS)
    return response.orders || response.data || response
  }

  static async getOrderById(id: string): Promise<Order> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.ORDER_BY_ID(id))
    return response.order || response.data || response
  }

  static async updateOrderStatus(id: string, status: 'pending' | 'completed' | 'cancelled'): Promise<Order> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.ORDER_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify({ status })
    })
    return response.order || response.data || response
  }

  // ==================== COUPONS ====================

  static async getCoupons(): Promise<Coupon[]> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.COUPONS)
    return response.coupons || response.data || response
  }

  static async createCoupon(data: CouponFormData): Promise<Coupon> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.COUPONS, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    return response.coupon || response.data || response
  }

  static async updateCoupon(id: string, data: Partial<CouponFormData>): Promise<Coupon> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.COUPON_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data)
    })
    return response.coupon || response.data || response
  }

  static async deleteCoupon(id: string): Promise<void> {
    await apiCall(API_CONFIG.ENDPOINTS.COUPON_BY_ID(id), {
      method: 'DELETE'
    })
  }

  // ==================== OFFERS ====================

  static async getOffers(): Promise<Offer[]> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.OFFERS)
    return response.offers || response.data || response
  }

  static async getOfferById(id: string): Promise<Offer> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.OFFER_BY_ID(id))
    return response.offer || response.data || response
  }

  static async createOffer(data: OfferFormData): Promise<Offer> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.OFFERS, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    return response.offer || response.data || response
  }

  static async updateOffer(id: string, data: Partial<OfferFormData>): Promise<Offer> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.OFFER_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data)
    })
    return response.offer || response.data || response
  }

  static async deleteOffer(id: string): Promise<void> {
    await apiCall(API_CONFIG.ENDPOINTS.OFFER_BY_ID(id), {
      method: 'DELETE'
    })
  }

  static async getOfferAnalytics(id: string): Promise<OfferAnalytics> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.OFFER_ANALYTICS(id))
    return response.analytics || response.data || response
  }

  static async updateOfferStatus(id: string, status: 'draft' | 'active' | 'expired' | 'deactivated'): Promise<Offer> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.OFFER_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify({ status })
    })
    return response.offer || response.data || response
  }

  // ==================== NOTIFICATIONS ====================

  static async getNotificationSettings(): Promise<NotificationSettings> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.NOTIFICATION_SETTINGS)
    return response.settings || response.data || response
  }

  static async updateNotificationSettings(data: Partial<NotificationSettings>): Promise<NotificationSettings> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.NOTIFICATION_SETTINGS, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
    return response.settings || response.data || response
  }

  static async getNotificationHistory(): Promise<NotificationHistory[]> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.NOTIFICATION_HISTORY)
    return response.history || response.data || response
  }

  static async testNotification(type: 'email' | 'whatsapp', recipient: string): Promise<void> {
    await apiCall(API_CONFIG.ENDPOINTS.NOTIFICATION_TEST, {
      method: 'POST',
      body: JSON.stringify({ type, recipient })
    })
  }

  static async sendBookingNotification(bookingId: string): Promise<void> {
    await apiCall('/notifications/booking', {
      method: 'POST',
      body: JSON.stringify({ bookingId })
    })
  }

  static async sendOfferAcceptanceNotification(offerId: string, userId: string): Promise<void> {
    await apiCall('/notifications/offer-acceptance', {
      method: 'POST',
      body: JSON.stringify({ offerId, userId })
    })
  }

  // ==================== DASHBOARD & ANALYTICS ====================

  static async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.DASHBOARD_STATS)
    return response.stats || response.data || response
  }

  static async getAnalytics(dateRange?: { from: string; to: string }): Promise<AnalyticsData> {
    const queryParams = dateRange ? `?from=${dateRange.from}&to=${dateRange.to}` : ''
    const response = await apiCall(`${API_CONFIG.ENDPOINTS.ANALYTICS}${queryParams}`)
    return response.analytics || response.data || response
  }

  // ==================== AUTHENTICATION ====================

  static async login(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.AUTH_LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    return response
  }

  static async logout(): Promise<void> {
    await apiCall(API_CONFIG.ENDPOINTS.AUTH_LOGOUT, {
      method: 'POST'
    })
  }

  static async refreshToken(): Promise<{ token: string }> {
    const response = await apiCall(API_CONFIG.ENDPOINTS.AUTH_REFRESH, {
      method: 'POST'
    })
    return response
  }

  // ==================== UTILITY METHODS ====================

  /**
   * Generic method for paginated requests
   */
  static async getPaginated<T>(
    endpoint: string,
    page: number = 1,
    limit: number = 10,
    filters?: Record<string, unknown>
  ): Promise<PaginatedResponse<T>> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    })

    const response = await apiCall(`${endpoint}?${queryParams}`)
    return response
  }

  /**
   * Generic search method
   */
  static async search<T>(endpoint: string, query: string, filters?: Record<string, unknown>): Promise<T[]> {
    const queryParams = new URLSearchParams({
      q: query,
      ...filters
    })

    const response = await apiCall(`${endpoint}/search?${queryParams}`)
    return response.results || response.data || response
  }

  /**
   * Bulk operations
   */
  static async bulkDelete(endpoint: string, ids: string[]): Promise<void> {
    await apiCall(`${endpoint}/bulk-delete`, {
      method: 'DELETE',
      body: JSON.stringify({ ids })
    })
  }

  static async bulkUpdate<T>(endpoint: string, updates: Array<{ id: string; data: Partial<T> }>): Promise<T[]> {
    const response = await apiCall(`${endpoint}/bulk-update`, {
      method: 'PUT',
      body: JSON.stringify({ updates })
    })
    return response.data || response
  }
}

// Export individual service modules for better organization
export const TourService = {
  getAll: ApiService.getTours,
  getById: ApiService.getTourById,
  create: ApiService.createTour,
  update: ApiService.updateTour,
  delete: ApiService.deleteTour,
}

export const BookingService = {
  getAll: ApiService.getBookings,
  getById: ApiService.getBookingById,
  create: ApiService.createBooking,
  update: ApiService.updateBooking,
  updateStatus: ApiService.updateBookingStatus,
  delete: ApiService.deleteBooking,
}

export const UserService = {
  getAll: ApiService.getUsers,
  getById: ApiService.getUserById,
  create: ApiService.createUser,
  update: ApiService.updateUser,
  delete: ApiService.deleteUser,
}

export const ReviewService = {
  getAll: ApiService.getReviews,
  getByTour: ApiService.getReviewsByTour,
  delete: ApiService.deleteReview,
}

export const OrderService = {
  getAll: ApiService.getOrders,
  getById: ApiService.getOrderById,
  updateStatus: ApiService.updateOrderStatus,
}

export const CouponService = {
  getAll: ApiService.getCoupons,
  create: ApiService.createCoupon,
  update: ApiService.updateCoupon,
  delete: ApiService.deleteCoupon,
}

export const OfferService = {
  getAll: ApiService.getOffers,
  getById: ApiService.getOfferById,
  create: ApiService.createOffer,
  update: ApiService.updateOffer,
  delete: ApiService.deleteOffer,
  getAnalytics: ApiService.getOfferAnalytics,
  updateStatus: ApiService.updateOfferStatus,
}

export const NotificationService = {
  getSettings: ApiService.getNotificationSettings,
  updateSettings: ApiService.updateNotificationSettings,
  getHistory: ApiService.getNotificationHistory,
  test: ApiService.testNotification,
  sendBooking: ApiService.sendBookingNotification,
  sendOfferAcceptance: ApiService.sendOfferAcceptanceNotification,
}

export const DashboardService = {
  getStats: ApiService.getDashboardStats,
  getAnalytics: ApiService.getAnalytics,
}

export const AuthService = {
  login: ApiService.login,
  logout: ApiService.logout,
  refresh: ApiService.refreshToken,
}