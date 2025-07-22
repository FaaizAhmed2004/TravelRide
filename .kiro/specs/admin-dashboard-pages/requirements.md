# Requirements Document

## Introduction

This feature involves creating a comprehensive admin dashboard for the TravelNRide application that provides full management capabilities for all backend entities. The dashboard will include pages for managing tours, bookings, users, reviews, payments, coupons, and orders, all designed with the existing green-themed UI components and displayed through a sidebar navigation system.

## Requirements

### Requirement 1

**User Story:** As an admin, I want to manage tour packages through a dedicated interface, so that I can create, update, view, and delete tour offerings efficiently.

#### Acceptance Criteria

1. WHEN an admin navigates to the Tours page THEN the system SHALL display all existing tour packages in a data table format
2. WHEN an admin clicks "Add Tour" THEN the system SHALL display a form to create a new tour with fields for title, description, price, duration, location, and image
3. WHEN an admin submits a valid tour form THEN the system SHALL create the tour via the backend API and refresh the tour list
4. WHEN an admin clicks edit on a tour THEN the system SHALL display a pre-populated form with the tour's current data
5. WHEN an admin updates a tour THEN the system SHALL save changes via the backend API and update the display
6. WHEN an admin clicks delete on a tour THEN the system SHALL show a confirmation dialog and delete the tour via the backend API
7. WHEN an admin searches for tours THEN the system SHALL filter the displayed tours based on the search criteria

### Requirement 2

**User Story:** As an admin, I want to manage customer bookings through a centralized interface, so that I can track, update, and process all travel bookings.

#### Acceptance Criteria

1. WHEN an admin navigates to the Bookings page THEN the system SHALL display all bookings with user and tour information populated
2. WHEN an admin views a booking THEN the system SHALL show booking details including user info, tour details, date, and status
3. WHEN an admin updates a booking status THEN the system SHALL save the change via the backend API
4. WHEN an admin searches bookings THEN the system SHALL filter bookings by customer name, tour, or date
5. WHEN an admin deletes a booking THEN the system SHALL show confirmation and remove the booking via the backend API
6. WHEN displaying bookings THEN the system SHALL show status badges with appropriate colors (pending: yellow, confirmed: green, cancelled: red)

### Requirement 3

**User Story:** As an admin, I want to manage user accounts and permissions, so that I can control access and monitor user activity.

#### Acceptance Criteria

1. WHEN an admin navigates to the Users page THEN the system SHALL display all users with their roles, status, and activity metrics
2. WHEN an admin views user details THEN the system SHALL show complete user profile including booking history and total spent
3. WHEN an admin updates user role THEN the system SHALL save the change and update the user's permissions
4. WHEN an admin searches users THEN the system SHALL filter users by name, email, or role
5. WHEN displaying users THEN the system SHALL show role badges (admin: purple, user: blue) and status indicators
6. WHEN an admin creates a new user THEN the system SHALL validate required fields and create the account via the backend API

### Requirement 4

**User Story:** As an admin, I want to manage customer reviews and ratings, so that I can moderate content and maintain service quality.

#### Acceptance Criteria

1. WHEN an admin navigates to the Reviews page THEN the system SHALL display all reviews with user and tour information
2. WHEN an admin views a review THEN the system SHALL show the full review text, rating, user details, and tour information
3. WHEN an admin filters reviews THEN the system SHALL allow filtering by rating, tour, or date
4. WHEN an admin deletes inappropriate reviews THEN the system SHALL remove them via the backend API
5. WHEN displaying reviews THEN the system SHALL show star ratings visually and highlight reviews by rating level
6. WHEN an admin searches reviews THEN the system SHALL filter by user name, tour name, or review content

### Requirement 5

**User Story:** As an admin, I want to manage discount coupons and promotional offers, so that I can control pricing strategies and marketing campaigns.

#### Acceptance Criteria

1. WHEN an admin navigates to the Coupons page THEN the system SHALL display all existing coupons with their details and status
2. WHEN an admin creates a new coupon THEN the system SHALL validate the coupon code uniqueness and save via the backend API
3. WHEN an admin edits a coupon THEN the system SHALL allow updating discount percentage and expiry date
4. WHEN an admin views coupon usage THEN the system SHALL show how many times each coupon has been used
5. WHEN displaying coupons THEN the system SHALL show expiry status with visual indicators (expired: red, active: green, expiring soon: yellow)
6. WHEN an admin deletes a coupon THEN the system SHALL confirm the action and remove it via the backend API

### Requirement 6

**User Story:** As an admin, I want to view and manage orders and payments, so that I can track revenue and handle payment-related issues.

#### Acceptance Criteria

1. WHEN an admin navigates to the Orders page THEN the system SHALL display all orders with user, amount, and status information
2. WHEN an admin views order details THEN the system SHALL show complete order information including payment status
3. WHEN an admin updates order status THEN the system SHALL save the change via the backend API
4. WHEN an admin searches orders THEN the system SHALL filter by user, amount range, or status
5. WHEN displaying orders THEN the system SHALL show status badges and total amounts formatted as currency
6. WHEN an admin views payment analytics THEN the system SHALL show revenue summaries and payment trends

### Requirement 7

**User Story:** As an admin, I want a comprehensive dashboard overview, so that I can quickly assess business performance and key metrics.

#### Acceptance Criteria

1. WHEN an admin navigates to the Dashboard home THEN the system SHALL display key performance indicators including total bookings, revenue, users, and tours
2. WHEN viewing dashboard stats THEN the system SHALL show growth percentages and trend indicators
3. WHEN an admin views recent activity THEN the system SHALL display latest bookings, new users, and recent reviews
4. WHEN displaying metrics THEN the system SHALL use the existing StatsCard component with appropriate icons and colors
5. WHEN an admin views analytics charts THEN the system SHALL show visual representations of booking trends and revenue
6. WHEN dashboard loads THEN the system SHALL fetch real-time data from all relevant backend APIs

### Requirement 8

**User Story:** As an admin, I want to create and manage special offers and deals, so that I can provide promotional packages that users can accept and book.

#### Acceptance Criteria

1. WHEN an admin navigates to the Offers page THEN the system SHALL display all created offers with their details and status
2. WHEN an admin creates a new offer THEN the system SHALL allow setting offer title, description, discount percentage, validity period, and applicable tours
3. WHEN an admin publishes an offer THEN the system SHALL make it available for users to view and accept
4. WHEN users accept offers THEN the system SHALL track offer acceptance and conversion rates
5. WHEN an admin views offer analytics THEN the system SHALL show acceptance rates, bookings generated, and revenue impact
6. WHEN an admin deactivates an offer THEN the system SHALL stop showing it to users but maintain historical data
7. WHEN an admin searches offers THEN the system SHALL filter by title, status, or validity period

### Requirement 9

**User Story:** As an admin, I want to receive real-time notifications when users book tours or accept offers, so that I can stay informed about business activity and respond promptly to customer actions.

#### Acceptance Criteria

1. WHEN a user books a tour THEN the system SHALL send an email notification to the admin with booking details
2. WHEN a user accepts an offer THEN the system SHALL send an email notification to the admin with offer acceptance details
3. WHEN admin enables WhatsApp notifications THEN the system SHALL send WhatsApp messages for new bookings and offer acceptances
4. WHEN an admin configures notification settings THEN the system SHALL allow enabling/disabling email and WhatsApp notifications separately
5. WHEN notifications are sent THEN the system SHALL include relevant details like customer name, tour/offer details, booking date, and amount
6. WHEN notification delivery fails THEN the system SHALL log the error and attempt retry mechanisms
7. WHEN an admin views notification history THEN the system SHALL display all sent notifications with delivery status

### Requirement 10

**User Story:** As an admin, I want consistent navigation and UI design across all pages, so that I can efficiently move between different management functions.

#### Acceptance Criteria

1. WHEN an admin uses the sidebar navigation THEN the system SHALL highlight the current active page
2. WHEN displaying any admin page THEN the system SHALL use the existing green color scheme and UI components
3. WHEN an admin performs CRUD operations THEN the system SHALL provide consistent success/error feedback
4. WHEN forms are displayed THEN the system SHALL use the existing UI components (Button, Input, Card, etc.)
5. WHEN data tables are shown THEN the system SHALL use the existing DataTable component with search and action capabilities
6. WHEN modals or dialogs appear THEN the system SHALL maintain the consistent design language