"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MapPin,
  Heart,
  CreditCard,
  Star,
  Plane,
  Clock,
  TrendingUp,
  Users,
  Globe
} from "lucide-react"

export default function UserDashboardPage() {
  // Mock data - in real app, this would come from API
  const userStats = [
    {
      title: "Total Bookings",
      value: "12",
      icon: Calendar,
      change: "+2 this month",
      color: "text-[#8dd3bb]"
    },
    {
      title: "Countries Visited",
      value: "8",
      icon: Globe,
      change: "+1 this year",
      color: "text-blue-600"
    },
    {
      title: "Wishlist Items",
      value: "24",
      icon: Heart,
      change: "+5 recently",
      color: "text-red-500"
    },
    {
      title: "Total Spent",
      value: "$12,450",
      icon: CreditCard,
      change: "+$2,100 this year",
      color: "text-green-600"
    }
  ]

  const recentBookings = [
    {
      id: "1",
      destination: "Paris, France",
      date: "Dec 15-22, 2024",
      status: "confirmed",
      amount: "$1,299",
      image: "/assets/paris.jpg"
    },
    {
      id: "2",
      destination: "Tokyo, Japan",
      date: "Jan 10-18, 2025",
      status: "pending",
      amount: "$1,899",
      image: "/assets/tokyo.jpg"
    },
    {
      id: "3",
      destination: "Dubai, UAE",
      date: "Feb 5-12, 2025",
      status: "confirmed",
      amount: "$2,199",
      image: "/assets/dubai.jpg"
    }
  ]

  const upcomingTrips = [
    {
      destination: "Paris, France",
      date: "Dec 15, 2024",
      daysLeft: 25,
      type: "City Break"
    },
    {
      destination: "Tokyo, Japan",
      date: "Jan 10, 2025",
      daysLeft: 51,
      type: "Cultural Tour"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#8dd3bb] to-[#6bb6a3] rounded-lg p-6 text-gray-900">
        <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-lg opacity-80">Ready for your next adventure? Let's explore the world together.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#8dd3bb]" />
              Recent Bookings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50">
                <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{booking.destination}</p>
                  <p className="text-sm text-gray-500">{booking.date}</p>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                  <p className="text-sm font-medium text-gray-900 mt-1">{booking.amount}</p>
                </div>
              </div>
            ))}
            <Button className="w-full bg-[#8dd3bb] hover:bg-[#6bb6a3] text-gray-900">
              View All Bookings
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Trips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-[#8dd3bb]" />
              Upcoming Trips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTrips.map((trip, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{trip.destination}</p>
                  <p className="text-sm text-gray-500">{trip.date}</p>
                  <Badge variant="secondary" className="mt-1">{trip.type}</Badge>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#8dd3bb]">{trip.daysLeft}</div>
                  <p className="text-xs text-gray-500">days left</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full border-[#8dd3bb] text-[#8dd3bb] hover:bg-[#8dd3bb] hover:text-gray-900">
              Plan New Trip
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-[#8dd3bb] hover:bg-[#6bb6a3] text-gray-900 h-20 flex flex-col gap-2">
              <MapPin className="h-6 w-6" />
              Browse Destinations
            </Button>
            <Button variant="outline" className="border-[#8dd3bb] text-[#8dd3bb] hover:bg-[#8dd3bb] hover:text-gray-900 h-20 flex flex-col gap-2">
              <Heart className="h-6 w-6" />
              View Wishlist
            </Button>
            <Button variant="outline" className="border-[#8dd3bb] text-[#8dd3bb] hover:bg-[#8dd3bb] hover:text-gray-900 h-20 flex flex-col gap-2">
              <Star className="h-6 w-6" />
              Write Review
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Travel Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#8dd3bb]" />
              Travel Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Most visited destination</span>
                <span className="font-medium">Europe</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Favorite travel season</span>
                <span className="font-medium">Winter</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average trip duration</span>
                <span className="font-medium">7 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Travel style</span>
                <span className="font-medium">Cultural Explorer</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#8dd3bb]" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-[#8dd3bb]/10 rounded-lg">
                <h4 className="font-medium text-gray-900">Bali Adventure Package</h4>
                <p className="text-sm text-gray-600 mt-1">Based on your love for cultural experiences</p>
                <Button size="sm" className="mt-2 bg-[#8dd3bb] hover:bg-[#6bb6a3] text-gray-900">
                  View Details
                </Button>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Swiss Alps Winter Tour</h4>
                <p className="text-sm text-gray-600 mt-1">Perfect for your winter travel preference</p>
                <Button size="sm" variant="outline" className="mt-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}