"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Calendar, 
  Star,
  Camera,
  Share2,
  Plane
} from "lucide-react"

export default function UserTrips() {
  // Mock completed trips data
  const completedTrips = [
    {
      id: "1",
      destination: "Paris, France",
      packageName: "Romantic Getaway - 5 Days",
      travelDate: "2024-06-15",
      returnDate: "2024-06-20",
      rating: 5,
      photos: 24,
      highlights: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
      totalSpent: 899
    },
    {
      id: "2",
      destination: "Rome, Italy",
      packageName: "Historical Adventure - 7 Days",
      travelDate: "2024-04-10",
      returnDate: "2024-04-17",
      rating: 4,
      photos: 18,
      highlights: ["Colosseum", "Vatican City", "Trevi Fountain"],
      totalSpent: 1299
    },
    {
      id: "3",
      destination: "Barcelona, Spain",
      packageName: "Cultural Experience - 6 Days",
      travelDate: "2024-02-20",
      returnDate: "2024-02-26",
      rating: 5,
      photos: 31,
      highlights: ["Sagrada Familia", "Park Güell", "Gothic Quarter"],
      totalSpent: 1099
    }
  ]

  const TripCard = ({ trip }: { trip: typeof completedTrips[0] }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative">
          <div className="h-48 bg-green-100 rounded-t-lg flex items-center justify-center">
            <MapPin className="h-12 w-12 text-green-600" />
          </div>
          <div className="absolute top-2 right-2 bg-white/90 rounded-lg px-2 py-1 text-xs font-medium">
            {trip.photos} photos
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg">{trip.destination}</h3>
            <p className="text-gray-600 text-sm">{trip.packageName}</p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{new Date(trip.travelDate).toLocaleDateString()}</span>
            </div>
            <span>-</span>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{new Date(trip.returnDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < trip.rating 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">Your rating</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {trip.highlights.map((highlight, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {highlight}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div>
              <span className="text-lg font-bold text-green-600">${trip.totalSpent}</span>
              <p className="text-xs text-gray-500">Total spent</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Camera className="h-3 w-3 mr-1" />
                Photos
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-3 w-3 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
          <p className="text-gray-600">Relive your amazing travel experiences</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plane className="h-4 w-4 mr-2" />
          Plan New Trip
        </Button>
      </div>

      {/* Trip Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTrips.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Countries Visited</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTrips.reduce((sum, trip) => sum + trip.photos, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${completedTrips.reduce((sum, trip) => sum + trip.totalSpent, 0).toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Completed Trips */}
      <Card>
        <CardHeader>
          <CardTitle>Completed Trips</CardTitle>
          <CardDescription>Your travel memories and experiences</CardDescription>
        </CardHeader>
        <CardContent>
          {completedTrips.length === 0 ? (
            <div className="text-center py-12">
              <Plane className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No trips yet</h3>
              <p className="text-gray-600 mb-4">Start your travel journey today!</p>
              <Button className="bg-green-600 hover:bg-green-700">
                Browse Packages
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Travel Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Travel Insights</CardTitle>
          <CardDescription>Your travel patterns and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Favorite Season</h4>
              <p className="text-2xl font-bold text-green-600">Spring</p>
              <p className="text-sm text-gray-600">Based on your travel history</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Average Trip Duration</h4>
              <p className="text-2xl font-bold text-green-600">6 Days</p>
              <p className="text-sm text-gray-600">Perfect for exploration</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}