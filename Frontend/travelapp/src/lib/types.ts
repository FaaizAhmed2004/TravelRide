// Dashboard Stats
export interface DashboardStats {
  totalBookings: number
  totalRevenue: number
  activeUsers: number
  totalDestinations: number
  totalTours: number
  totalOrders: number
  bookingGrowth: number
  revenueGrowth: number
  userGrowth: number
  destinationGrowth: number
}

// Analytics Types
export interface AnalyticsData {
  bookingTrends: {
    date: string
    bookings: number
    revenue: number
  }[]
  revenueTrends: {
    date: string
    amount: number
  }[]
  userActivity: {
    date: string
    activeUsers: number
    newUsers: number
  }[]
  topDestinations: {
    name: string
    bookings: number
    revenue: number
  }[]
  conversionRates: {
    period: string
    rate: number
  }[]
  summary: {
    totalBookings: number
    totalRevenue: number
    averageBookingValue: number
    conversionRate: number
  }
}

// Tour/Package Types
export interface Tour {
  _id: string
  title: string
  description: string
  price: number
  duration: string
  location: string
  image: string
  createdAt: string
  updatedAt: string
}

export interface TourFormData {
  title: string
  description: string
  price: number
  duration: string
  location: string
  image: string
}

// Booking Types
export interface Booking {
  _id: string
  user: {
    _id: string
    name: string
    email: string
  }
  tour: {
    _id: string
    title: string
    location: string
    price: number
  }
  date: string
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface BookingFormData {
  user: string
  tour: string
  date: string
  status?: 'pending' | 'confirmed' | 'cancelled'
}

// User Types
export interface AdminUser extends Record<string, unknown> {
  _id: string
  name: string
  email: string
  phoneNumber: {
    isoCode: string
    countryCode: string
    internationalNumber: string
  }
  timezone: string
  role: 'USER' | 'ADMIN'
  accountConfimation: {
    status: boolean
    token: string
    code: string
    timestamp: Date | null
  }
  passwordReset: {
    token: string | null
    expiry: number | null
    lastResetAt: Date | null
  }
  lastLoginAt: Date | null
  consent: boolean
  createdAt: string
  updatedAt: string
  // Computed fields for admin display
  totalBookings?: number
  totalSpent?: number
  status?: 'active' | 'inactive'
}

export interface UserFormData {
  name: string
  email: string
  phoneNumber: {
    isoCode: string
    countryCode: string
    internationalNumber: string
  }
  timezone: string
  password?: string
  role: 'USER' | 'ADMIN'
  consent: boolean
}

// Review Types
export interface Review {
  _id: string
  user: {
    _id: string
    name: string
    email: string
  }
  tour: {
    _id: string
    title: string
    location: string
  }
  rating: number
  comment: string
  createdAt: string
}

// Order Types
export interface Order {
  _id: string
  userId: {
    _id: string
    name: string
    email: string
  }
  amount: number
  status: 'pending' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

// Coupon Types
export interface Coupon {
  _id: string
  code: string
  discount: number
  expiryDate: string
  createdAt: string
  updatedAt: string
  isExpired?: boolean
  usageCount?: number
}

export interface CouponFormData {
  code: string
  discount: number
  expiryDate: string
}

// Offer Types
export interface Offer extends Record<string, unknown> {
  _id: string
  title: string
  description: string
  discountPercentage: number
  validFrom: string
  validUntil: string
  applicableTours: string[]
  status: 'draft' | 'active' | 'expired' | 'deactivated'
  acceptanceCount: number
  bookingsGenerated: number
  revenueImpact: number
  createdAt: string
  updatedAt: string
}

export interface OfferFormData {
  title: string
  description: string
  discountPercentage: number
  validFrom: string
  validUntil: string
  applicableTours: string[]
}

export interface OfferAnalytics {
  acceptanceRate: number
  conversionRate: number
  totalAcceptances: number
  totalBookings: number
  revenueGenerated: number
}

// Notification Types
export interface NotificationSettings {
  _id: string
  emailNotifications: {
    enabled: boolean
    email: string
    events: {
      newBooking: boolean
      offerAcceptance: boolean
      paymentReceived: boolean
      reviewSubmitted: boolean
    }
  }
  whatsappNotifications: {
    enabled: boolean
    phoneNumber: string
    events: {
      newBooking: boolean
      offerAcceptance: boolean
      paymentReceived: boolean
    }
  }
}

export interface NotificationHistory extends Record<string, unknown> {
  _id: string
  type: 'email' | 'whatsapp'
  event: 'booking' | 'offer_acceptance' | 'payment' | 'review'
  recipient: string
  subject: string
  content: string
  status: 'sent' | 'failed' | 'pending'
  sentAt: string
  errorMessage?: string
  relatedEntity: {
    type: 'booking' | 'offer' | 'order' | 'review'
    id: string
    details: unknown
  }
}

// Legacy types for backward compatibility
export type Destination = Tour

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  status: "active" | "inactive"
  totalBookings: number
  totalSpent: number
  createdAt: string
}

export interface ChartData {
  name: string
  value: number
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Form and UI Types
export interface Column<T> {
  key: keyof T
  label: string
  render?: (value: unknown, row?: T) => React.ReactNode
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchKey?: keyof T
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  onView?: (item: T) => void
  loading?: boolean
  pagination?: boolean
  pageSize?: number
}
