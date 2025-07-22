# Implementation Plan

- [x] 1. Set up enhanced API service layer and types



  - Create comprehensive TypeScript interfaces for all backend entities (Tour, Booking, User, Review, Coupon, Order)
  - Implement ApiService class with methods for all CRUD operations across different entities
  - Create custom useApiData hook with loading states, error handling, and refetch capabilities
  - Set up API configuration with all backend endpoints
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1_

- [x] 2. Enhance shared UI components for admin functionality


  - Extend existing DataTable component with pagination, advanced filtering, and bulk actions
  - Create reusable FormModal component for consistent create/edit dialogs
  - Implement enhanced form field components with validation feedback
  - Create status badge components for different entity states (booking status, user roles, coupon expiry)
  - Build loading skeleton components for better UX during data fetching
  - _Requirements: 1.3, 2.6, 3.5, 5.5, 8.4, 8.5_

- [x] 3. Update sidebar navigation with all admin pages




  - Modify AppSidebar component to include all new admin page links (Tours, Reviews, Offers, Coupons, Orders, Notifications)
  - Add appropriate icons for each navigation item using Lucide React (Gift for Offers, Bell for Notifications)
  - Implement active page highlighting in sidebar navigation
  - Ensure responsive sidebar behavior on mobile devices
  - _Requirements: 9.1, 10.1_

- [x] 4. Implement Tours management page


  - Create ToursPage component with data table displaying all tours from backend API
  - Build TourForm component for creating and editing tours with all required fields
  - Implement tour image upload/display functionality
  - Add search and filter capabilities for tours by title, location, or price range
  - Create delete confirmation dialog for tour removal
  - Integrate with backend tour API endpoints (GET, POST, PUT, DELETE)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

- [x] 5. Implement Bookings management page


  - Create BookingsPage component with data table showing bookings with populated user and tour data
  - Build BookingDetailsModal for viewing complete booking information
  - Implement booking status update functionality with dropdown selection
  - Add filtering capabilities by date range, status, customer name, or tour
  - Create booking search functionality across multiple fields
  - Integrate with backend booking API endpoints for CRUD operations
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 6. Implement Users management page




  - Create UsersPage component with comprehensive user data table
  - Build UserForm component for creating new admin users and editing existing ones
  - Implement user role management with dropdown for USER/ADMIN roles
  - Add user activity metrics display (total bookings, total spent)
  - Create user search and filtering by name, email, role, or status
  - Integrate with backend user management API endpoints
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_





- [x] 7. Implement Reviews management page



  - Create ReviewsPage component with reviews data table showing user and tour information
  - Build ReviewCard component for displaying individual reviews with star ratings
  - Implement review filtering by rating level, tour, or date range
  - Add review search functionality by user name, tour name, or review content
  - Create review moderation actions (delete inappropriate reviews)
  - Integrate with backend reviews API endpoints for data fetching and deletion




  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [x] 8. Implement Coupons management page


  - Create CouponsPage component with coupons data table and status indicators
  - Build CouponForm component for creating and editing discount coupons
  - Implement coupon expiry status visualization with color-coded badges
  - Add coupon code uniqueness validation in form submission





  - Create coupon usage statistics display (if usage tracking is available)
  - Integrate with backend coupon API endpoints for CRUD operations
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_




- [ ] 9. Implement Offers management page
  - Create OffersPage component with offers data table showing title, discount, validity, and status
  - Build OfferForm component for creating and editing special offers with tour selection


  - Implement offer status management (draft, active, expired, deactivated)
  - Add offer analytics showing acceptance rates, bookings generated, and revenue impact
  - Create offer preview functionality to show how offers appear to users
  - Integrate with backend offers API endpoints for CRUD operations
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

- [x] 10. Implement Orders management page


  - Create OrdersPage component with orders data table showing user and payment information
  - Build OrderDetailsModal for viewing complete order and payment details
  - Implement order status update functionality
  - Add order filtering by amount range, status, or date
  - Create order search functionality by user name or order ID
  - Integrate with backend orders API endpoints for data management

  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_





- [ ] 11. Implement Notifications management page and system
  - Create NotificationsPage component with settings configuration and notification history
  - Build NotificationSettings form for configuring email and WhatsApp notification preferences


  - Implement NotificationHistory table showing all sent notifications with delivery status
  - Add notification testing functionality to verify email and WhatsApp delivery
  - Create notification templates management for customizing message content

  - Integrate with backend notification API endpoints for settings and history management
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

- [ ] 12. Enhance Dashboard overview page with real backend data
  - Update existing Dashboard page to fetch real-time data from all backend APIs
  - Implement comprehensive stats calculation (total tours, bookings, users, revenue)
  - Create recent activity sections showing latest bookings, new users, and recent reviews

  - Add growth percentage calculations and trend indicators

  - Build analytics charts for booking trends and revenue visualization
  - Integrate with backend admin stats API endpoint
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_





- [ ] 13. Implement comprehensive error handling and loading states
  - Create centralized error handling system for all API calls
  - Implement loading skeletons for all data tables and forms
  - Add error boundary components for graceful error recovery

  - Create user-friendly error messages and retry mechanisms
  - Implement optimistic updates for better user experience
  - Add network status indicators and offline handling
  - _Requirements: 10.3_



- [ ] 14. Add form validation and user feedback systems
  - Implement client-side validation for all forms using existing validation patterns
  - Create consistent success/error toast notifications for all CRUD operations

  - Add form field validation with real-time feedback
  - Implement confirmation dialogs for all destructive actions
  - Create loading states for all form submissions
  - Add input sanitization for security
  - _Requirements: 10.3, 10.4_

- [ ] 15. Implement responsive design and mobile optimization
  - Ensure all new pages work properly on mobile devices with collapsible sidebar


  - Optimize data tables for mobile viewing with horizontal scrolling
  - Implement touch-friendly button sizes and interactions
  - Create mobile-optimized form layouts
  - Test and adjust responsive breakpoints for all new components
  - Ensure consistent design language across all screen sizes
  - _Requirements: 10.2, 10.6_

- [ ] 16. Add comprehensive testing for all new components
  - Write unit tests for all new page components using React Testing Library
  - Create integration tests for API service methods with mocked responses
  - Implement form validation tests for all CRUD forms
  - Add navigation tests for sidebar and routing functionality
  - Create end-to-end tests for complete admin workflows
  - Test error handling and loading states across all components
  - _Requirements: All requirements - testing ensures functionality works as specified_

- [ ] 17. Performance optimization and final integration
  - Implement pagination for large datasets in all data tables
  - Add data caching strategies using React Query or similar
  - Optimize bundle size by lazy loading page components
  - Implement image optimization for tour images using Next.js Image component
  - Add performance monitoring and optimization for large data sets
  - Conduct final integration testing with real backend APIs
  - _Requirements: 7.6, 10.5, 10.6_