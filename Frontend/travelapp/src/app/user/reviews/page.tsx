"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Star, 
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Plus
} from "lucide-react"

export default function UserReviews() {
  const myReviews = [
    {
      id: "1",
      destination: "Paris, France",
      packageName: "Romantic Getaway - 5 Days",
      rating: 5,
      comment: "Absolutely amazing experience! The tour guide was knowledgeable and the accommodations were perfect. Would definitely recommend this package to couples.",
      date: "2024-06-25",
      helpful: 12,
      photos: 3
    },
    {
      id: "2",
      destination: "Rome, Italy", 
      packageName: "Historical Adventure - 7 Days",
      rating: 4,
      comment: "Great historical tour with lots of interesting sites. The only downside was the busy schedule, but overall very educational and fun.",
      date: "2024-04-20",
      helpful: 8,
      photos: 0
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Reviews</h1>
          <p className="text-gray-600">Share your travel experiences and help other travelers</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Write Review
        </Button>
      </div>

      {/* Review Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myReviews.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Helpful Votes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myReviews.reduce((sum, review) => sum + review.helpful, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Photos Shared</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myReviews.reduce((sum, review) => sum + review.photos, 0)}</div>
          </CardContent>
        </Card>
      </div>

      {/* My Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            My Reviews
          </CardTitle>
          <CardDescription>Reviews you&apos;ve written for your trips</CardDescription>
        </CardHeader>
        <CardContent>
          {myReviews.length === 0 ? (
            <div className="text-center py-12">
              <Star className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-600 mb-4">Share your travel experiences with other travelers</p>
              <Button className="bg-green-600 hover:bg-green-700">
                Write Your First Review
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {myReviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-600" />
                        {review.destination}
                      </h3>
                      <p className="text-gray-600 text-sm">{review.packageName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                    {review.photos > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {review.photos} photos
                      </Badge>
                    )}
                  </div>

                  <p className="text-gray-700 mb-4">{review.comment}</p>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{review.helpful} people found this helpful</span>
                    <span>Review #{review.id}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pending Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Reviews</CardTitle>
          <CardDescription>Trips waiting for your review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No pending reviews
          </div>
        </CardContent>
      </Card>
    </div>
  )
}