# Design Document

## Overview

The admin dashboard will be a comprehensive management interface for the TravelNRide application, built using Next.js with TypeScript and the existing UI component library. The design leverages the current green-themed design system and sidebar navigation pattern, extending it to cover all backend entities including tours, bookings, users, reviews, coupons, and orders.

## Architecture

### Frontend Architecture
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with existing green color scheme
- **UI Components**: Existing shadcn/ui components (Button, Card, Table, etc.)
- **State Management**: React hooks with custom API hooks
- **Navigation**: Sidebar-based navigation using existing AppSidebar component

### Backend Integration
- **API Communication**: RESTful API calls to existing Express.js backend
- **Base URL**: Configurable API base URL from existing config
- **Authentication**: JWT-based authentication for admin access
- **Error Handling**: Consistent error handling across all API calls

### Data Flow
1. Admin navigates to a page via sidebar
2. Page component loads and fetches data using custom hooks
3. Data is displayed in tables/cards using existing UI components
4. Admin performs CRUD operations through forms/modals
5. Changes are sent to backend APIs and UI is updated

## Components and Interfaces

### Page Components

#### 1. Tours Management Page (`/Dashboard/tours`)
```typescript
interface Tour {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface TourFormData {
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  image: string;
}
```

**Components:**
- `ToursPage`: Main page component with data table
- `TourForm`: Modal form for create/edit operations
- `TourCard`: Card component for tour display
- `DeleteTourDialog`: Confirmation dialog for deletions

#### 2. Bookings Management Page (`/Dashboard/bookings`)
```typescript
interface Booking {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  tour: {
    _id: string;
    title: string;
    location: string;
  };
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}
```

**Components:**
- `BookingsPage`: Main page with filterable data table
- `BookingDetailsModal`: Detailed view of booking information
- `BookingStatusUpdate`: Component for status changes
- `BookingFilters`: Filter controls for date, status, etc.

#### 3. Users Management Page (`/Dashboard/users`)
```typescript
interface AdminUser {
  _id: string;
  name: string;
  email: string;
  phoneNumber: {
    isoCode: string;
    countryCode: string;
    internationalNumber: string;
  };
  role: 'USER' | 'ADMIN';
  accountConfimation: {
    status: boolean;
  };
  lastLoginAt: string | null;
  createdAt: string;
  totalBookings?: number;
  totalSpent?: number;
}
```

**Components:**
- `UsersPage`: Main page with user management table
- `UserForm`: Form for creating/editing users
- `UserDetailsModal`: Detailed user information view
- `RoleUpdateComponent`: Role management interface

#### 4. Reviews Management Page (`/Dashboard/reviews`)
```typescript
interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  tour: {
    _id: string;
    title: string;
    location: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}
```

**Components:**
- `ReviewsPage`: Main page with reviews table
- `ReviewCard`: Individual review display component
- `ReviewFilters`: Filter by rating, tour, date
- `ReviewModerationActions`: Approve/delete actions

#### 5. Coupons Management Page (`/Dashboard/coupons`)
```typescript
interface Coupon {
  _id: string;
  code: string;
  discount: number;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
  isExpired?: boolean;
  usageCount?: number;
}
```

**Components:**
- `CouponsPage`: Main page with coupons table
- `CouponForm`: Create/edit coupon form
- `CouponStatusBadge`: Visual status indicator
- `CouponUsageStats`: Usage statistics display

#### 6. Orders Management Page (`/Dashboard/orders`)
```typescript
interface Order {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}
```

**Components:**
- `OrdersPage`: Main page with orders table
- `OrderDetailsModal`: Detailed order view
- `OrderStatusUpdate`: Status management component
- `PaymentAnalytics`: Revenue and payment analytics

#### 7. Offers Management Page (`/Dashboard/offers`)
```typescript
interface Offer {
  _id: string;
  title: string;
  description: string;
  discountPercentage: number;
  validFrom: string;
  validUntil: string;
  applicableTours: string[]; // Tour IDs
  status: 'draft' | 'active' | 'expired' | 'deactivated';
  acceptanceCount: number;
  bookingsGenerated: number;
  revenueImpact: number;
  createdAt: string;
  updatedAt: string;
}

interface OfferFormData {
  title: string;
  description: string;
  discountPercentage: number;
  validFrom: string;
  validUntil: string;
  applicableTours: string[];
}
```

**Components:**
- `OffersPage`: Main page with offers management table
- `OfferForm`: Create/edit offer form with tour selection
- `OfferAnalytics`: Analytics showing acceptance rates and conversion
- `OfferStatusBadge`: Visual status indicators for offers
- `OfferPreview`: Preview how offer appears to users

#### 8. Notifications Management Page (`/Dashboard/notifications`)
```typescript
interface NotificationSettings {
  _id: string;
  emailNotifications: {
    enabled: boolean;
    email: string;
    events: {
      newBooking: boolean;
      offerAcceptance: boolean;
      paymentReceived: boolean;
      reviewSubmitted: boolean;
    };
  };
  whatsappNotifications: {
    enabled: boolean;
    phoneNumber: string;
    events: {
      newBooking: boolean;
      offerAcceptance: boolean;
      paymentReceived: boolean;
    };
  };
}

interface NotificationHistory {
  _id: string;
  type: 'email' | 'whatsapp';
  event: 'booking' | 'offer_acceptance' | 'payment' | 'review';
  recipient: string;
  subject: string;
  content: string;
  status: 'sent' | 'failed' | 'pending';
  sentAt: string;
  errorMessage?: string;
  relatedEntity: {
    type: 'booking' | 'offer' | 'order' | 'review';
    id: string;
    details: any;
  };
}
```

**Components:**
- `NotificationsPage`: Main page with settings and history
- `NotificationSettings`: Form for configuring email and WhatsApp preferences
- `NotificationHistory`: Table showing all sent notifications with status
- `NotificationTest`: Component to test notification delivery
- `NotificationTemplates`: Manage email and WhatsApp message templates

### Shared Components

#### Enhanced DataTable Component
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchKey?: keyof T;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  loading?: boolean;
  pagination?: boolean;
  pageSize?: number;
}
```

#### API Hook
```typescript
interface UseApiDataOptions {
  refetchOnMount?: boolean;
  refetchInterval?: number;
}

function useApiData<T>(
  endpoint: string, 
  options?: UseApiDataOptions
): {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
```

#### Form Components
- `FormModal`: Reusable modal wrapper for forms
- `FormField`: Consistent form field component
- `SubmitButton`: Loading-aware submit button
- `ErrorAlert`: Error message display component

### Navigation Updates

#### Updated Sidebar Menu Items
```typescript
const menuItems = [
  { title: "Dashboard", url: "/Dashboard", icon: LayoutDashboard },
  { title: "Tours", url: "/Dashboard/tours", icon: MapPin },
  { title: "Bookings", url: "/Dashboard/bookings", icon: Calendar },
  { title: "Users", url: "/Dashboard/users", icon: Users },
  { title: "Reviews", url: "/Dashboard/reviews", icon: Star },
  { title: "Offers", url: "/Dashboard/offers", icon: Gift },
  { title: "Coupons", url: "/Dashboard/coupons", icon: Ticket },
  { title: "Orders", url: "/Dashboard/orders", icon: ShoppingCart },
  { title: "Notifications", url: "/Dashboard/notifications", icon: Bell },
  { title: "Analytics", url: "/Dashboard/analytics", icon: BarChart3 },
  { title: "Settings", url: "/Dashboard/settings", icon: Settings },
];
```

## Data Models

### API Endpoints Integration
```typescript
const API_ENDPOINTS = {
  TOURS: '/api/v1/Packages',
  BOOKINGS: '/api/v1/booking',
  USERS: '/api/v1/user',
  REVIEWS: '/api/v1/Rating',
  ADMIN: '/api/v1/Admin',
  AUTH: '/api/v1/auth',
  OFFERS: '/api/v1/offers',
  NOTIFICATIONS: '/api/v1/notifications'
};
```

### API Service Layer
```typescript
class ApiService {
  // Tours
  static async getTours(): Promise<Tour[]>
  static async createTour(data: TourFormData): Promise<Tour>
  static async updateTour(id: string, data: Partial<TourFormData>): Promise<Tour>
  static async deleteTour(id: string): Promise<void>
  
  // Bookings
  static async getBookings(): Promise<Booking[]>
  static async updateBookingStatus(id: string, status: string): Promise<Booking>
  static async deleteBooking(id: string): Promise<void>
  
  // Users
  static async getUsers(): Promise<AdminUser[]>
  static async createUser(data: UserFormData): Promise<AdminUser>
  static async updateUser(id: string, data: Partial<UserFormData>): Promise<AdminUser>
  
  // Reviews
  static async getReviews(): Promise<Review[]>
  static async deleteReview(id: string): Promise<void>
  
  // Coupons
  static async getCoupons(): Promise<Coupon[]>
  static async createCoupon(data: CouponFormData): Promise<Coupon>
  static async deleteCoupon(id: string): Promise<void>
  
  // Orders
  static async getOrders(): Promise<Order[]>
  static async getAdminStats(): Promise<DashboardStats>
  
  // Offers
  static async getOffers(): Promise<Offer[]>
  static async createOffer(data: OfferFormData): Promise<Offer>
  static async updateOffer(id: string, data: Partial<OfferFormData>): Promise<Offer>
  static async deleteOffer(id: string): Promise<void>
  static async getOfferAnalytics(id: string): Promise<OfferAnalytics>
  
  // Notifications
  static async getNotificationSettings(): Promise<NotificationSettings>
  static async updateNotificationSettings(data: NotificationSettings): Promise<NotificationSettings>
  static async getNotificationHistory(): Promise<NotificationHistory[]>
  static async testNotification(type: 'email' | 'whatsapp', recipient: string): Promise<void>
  static async sendBookingNotification(bookingId: string): Promise<void>
  static async sendOfferAcceptanceNotification(offerId: string, userId: string): Promise<void>
}
```

## Error Handling

### Error Handling Strategy
1. **API Errors**: Centralized error handling with user-friendly messages
2. **Form Validation**: Client-side validation with real-time feedback
3. **Network Errors**: Retry mechanisms and offline indicators
4. **Loading States**: Skeleton loaders and loading indicators
5. **Error Boundaries**: React error boundaries for component-level errors

### Error Display Components
```typescript
interface ErrorAlertProps {
  message: string;
  type: 'error' | 'warning' | 'info';
  dismissible?: boolean;
}

interface LoadingSkeletonProps {
  rows?: number;
  columns?: number;
  height?: string;
}
```

## Testing Strategy

### Unit Testing
- Component rendering tests using React Testing Library
- API service function tests with mocked responses
- Form validation logic tests
- Custom hook tests

### Integration Testing
- Page-level component tests with API integration
- User interaction flows (CRUD operations)
- Navigation and routing tests

### E2E Testing
- Complete admin workflows
- Cross-page navigation
- Data persistence verification

## Performance Considerations

### Optimization Strategies
1. **Data Fetching**: Implement pagination for large datasets
2. **Caching**: Cache API responses using React Query or SWR
3. **Code Splitting**: Lazy load page components
4. **Image Optimization**: Use Next.js Image component for tour images
5. **Bundle Size**: Tree-shake unused UI components

### Loading Strategies
- Skeleton loaders for initial page loads
- Progressive loading for large tables
- Optimistic updates for better UX
- Background refetching for data freshness

## Security Considerations

### Authentication & Authorization
- JWT token validation for all admin routes
- Role-based access control (RBAC)
- Session timeout handling
- Secure token storage

### Data Protection
- Input sanitization for all forms
- XSS prevention in user-generated content
- CSRF protection for state-changing operations
- Secure API communication over HTTPS

## Responsive Design

### Breakpoint Strategy
- Mobile: Stacked layout with collapsible sidebar
- Tablet: Condensed table views with horizontal scrolling
- Desktop: Full table layouts with all columns visible

### Mobile Adaptations
- Touch-friendly button sizes
- Swipe gestures for table actions
- Collapsible sidebar navigation
- Optimized form layouts for mobile input