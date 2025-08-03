"use client"

import { StatsCard } from "@/component/Admin/Stats-card/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookingStatusBadge } from "@/component/Admin/Status-badges/Status-badges"
import { ErrorAlert, useToast } from "@/component/Admin/Error-alert/Error-alert"
import { DashboardSkeleton, LoadingState } from "@/component/Admin/Loading-skeletons/Loading-skeletons"
import { useApiData } from "@/hooks/use-api-data"
import { DashboardService } from "@/lib/api-service"
import type { DashboardStats, Booking, Tour, AdminUser, Review } from "@/lib/types"
import { Users, MapPin, Calendar, DollarSign, TrendingUp, Clock, Star, Gift, ShoppingCart } from "lucide-react"

export default function DashboardPage() {
  const { showSuccess, showError } = useToast()
  
  // Fetch dashboard data with real-time updates
  const { data: stats, loading: statsLoading, error: statsError, refetch: refetchStats } = useApiData<DashboardStats>('/Admin/stats', [], {
    refetchInterval: 30000, // Refresh every 30 seconds
  })
  
  const { data: recentBookings, loading: bookingsLoading, error: bookingsError } = useApiData<Booking[]>('/booking')
  const { data: tours, loading: toursLoading } = useApiData<Tour[]>('/Packages')
  const { data: users, loading: usersLoading } = useApiData<AdminUser[]>('/Admin/users')
  const { data: reviews, loading: reviewsLoading } = useApiData<Review[]>('/Rating')

  // Calculate real-time statistics from actual data
  const calculateStats = (): DashboardStats | null => {
    if (!recentBookings || !tours || !users) return null

    const totalBookings = recentBookings.length
    const totalRevenue = recentBookings.reduce((sum, booking) => sum + (booking.tour?.price || 0), 0)
    const activeUsers = users.filter(user => user.accountConfimation?.status).length
    const totalTours = tours.length
    const totalOrders = recentBookings.filter(b => b.status === 'confirmed').length

    // Mock growth percentages (in real app, calculate from historical data)
    return {
      totalBookings,
      totalRevenue,
      activeUsers,
      totalDestinations: totalTours,
      totalTours,
      totalOrders,
      bookingGrowth: 12.5,
      revenueGrowth: 8.2,
      userGrowth: 15.3,
      destinationGrowth: 5.1,
    }
  }

  const calculatedStats = calculateStats()
  const finalStats = stats || calculatedStats

  // Get recent bookings (last 5)
  const getRecentBookings = () => {
    if (!recentBookings) return []
    return recentBookings
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  }

  // Get recent reviews (last 3)
  const getRecentReviews = () => {
    if (!reviews) return []
    return reviews
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3)
  }

  // Loading state
  if (statsLoading || bookingsLoading || toursLoading || usersLoading) {
    return <DashboardSkeleton />
  }

  // Error state
  if (statsError || bookingsError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your travel agency.</p>
        </div>
        <ErrorAlert 
          message={statsError || bookingsError || "Failed to load dashboard data"} 
          onRetry={() => {
            refetchStats()
            showSuccess("Refreshing dashboard data...")
          }}
          retryLabel="Refresh Dashboard"
        />
      </div>
    )
  }

  const recentBookingsList = getRecentBookings()
  const recentReviewsList = getRecentReviews()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your travel agency.</p>
      </div>

      {/* Stats Cards */}
      {finalStats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Bookings"
            value={finalStats.totalBookings.toLocaleString()}
            change={finalStats.bookingGrowth}
            icon={Calendar}
            description="Customer reservations"
          />
          <StatsCard
            title="Total Revenue"
            value={`$${finalStats.totalRevenue.toLocaleString()}`}
            change={finalStats.revenueGrowth}
            icon={DollarSign}
            description="Generated income"
          />
          <StatsCard
            title="Active Users"
            value={finalStats.activeUsers.toLocaleString()}
            change={finalStats.userGrowth}
            icon={Users}
            description="Registered customers"
          />
          <StatsCard
            title="Tour Packages"
            value={finalStats.totalTours}
            change={finalStats.destinationGrowth}
            icon={MapPin}
            description="Available destinations"
          />
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              Recent Bookings
            </CardTitle>
            <CardDescription>Latest bookings from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            {recentBookingsList.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No recent bookings found
              </div>
            ) : (
              <div className="space-y-4">
                {recentBookingsList.map((booking) => (
                  <div key={booking._id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-medium">{booking.user?.name || 'Unknown Customer'}</p>
                      <p className="text-sm text-gray-600">{booking.tour?.title || 'Unknown Tour'}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${booking.tour?.price?.toLocaleString() || '0'}</p>
                      <BookingStatusBadge status={booking.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              Recent Reviews
            </CardTitle>
            <CardDescription>Latest customer feedback</CardDescription>
          </CardHeader>
          <CardContent>
            {reviewsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : recentReviewsList.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No recent reviews found
              </div>
            ) : (
              <div className="space-y-4">
                {recentReviewsList.map((review) => (
                  <div key={review._id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{review.user?.name || 'Anonymous'}</p>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{review.comment}</p>
                    <p className="text-xs text-gray-500 mt-1">{review.tour?.title || 'Unknown Tour'}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      {finalStats && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Quick Analytics
            </CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <span className="text-sm text-gray-600">Average Booking Value</span>
                <span className="font-medium">
                  ${finalStats.totalBookings > 0 ? (finalStats.totalRevenue / finalStats.totalBookings).toFixed(0) : '0'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <span className="text-sm text-gray-600">Bookings per User</span>
                <span className="font-medium">
                  {finalStats.activeUsers > 0 ? (finalStats.totalBookings / finalStats.activeUsers).toFixed(1) : '0'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <span className="text-sm text-gray-600">Revenue per User</span>
                <span className="font-medium">
                  ${finalStats.activeUsers > 0 ? (finalStats.totalRevenue / finalStats.activeUsers).toFixed(0) : '0'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <span className="text-sm text-gray-600">Conversion Rate</span>
                <span className="font-medium">
                  {finalStats.totalBookings > 0 && finalStats.activeUsers > 0 
                    ? ((finalStats.totalBookings / finalStats.activeUsers) * 100).toFixed(1) 
                    : '0'}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}