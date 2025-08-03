"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/component/Admin/Data-table/Data-table"
import { LoadingState } from "@/component/Admin/Loading-skeletons/Loading-skeletons"
import { ErrorAlert } from "@/component/Admin/Error-alert/Error-alert"
import { useApiData } from "@/hooks/use-api-data"
import { ApiService } from "@/lib/api-service"
import { Star, Search, Filter, Trash2, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Review {
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

interface ReviewFilters {
  rating: string
  tour: string
  dateRange: string
  search: string
}

export default function ReviewsPage() {
  const [filters, setFilters] = useState<ReviewFilters>({
    rating: "",
    tour: "",
    dateRange: "",
    search: ""
  })
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null)

  const { data: reviews, loading, error, refetch } = useApiData<Review[]>("/api/v1/Rating")
  const { data: tours } = useApiData<any[]>("/api/v1/Packages")

  const handleDeleteReview = async (review: Review) => {
    setReviewToDelete(review)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!reviewToDelete) return
    
    try {
      await ApiService.deleteReview(reviewToDelete._id)
      await refetch()
      setIsDeleteDialogOpen(false)
      setReviewToDelete(null)
    } catch (error) {
      console.error("Failed to delete review:", error)
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating})</span>
      </div>
    )
  }

  const getRatingBadgeColor = (rating: number) => {
    if (rating >= 4.5) return "bg-green-100 text-green-800"
    if (rating >= 3.5) return "bg-yellow-100 text-yellow-800"
    if (rating >= 2.5) return "bg-orange-100 text-orange-800"
    return "bg-red-100 text-red-800"
  }

  const filteredReviews = reviews?.filter((review) => {
    const matchesRating = !filters.rating || review.rating.toString() === filters.rating
    const matchesTour = !filters.tour || review.tour._id === filters.tour
    const matchesSearch = !filters.search || 
      review.user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      review.tour.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      review.comment.toLowerCase().includes(filters.search.toLowerCase())
    
    return matchesRating && matchesTour && matchesSearch
  }) || []

  const columns = [
    {
      header: "User",
      accessorKey: "user",
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium">{row.original.user.name}</div>
          <div className="text-sm text-gray-500">{row.original.user.email}</div>
        </div>
      ),
    },
    {
      header: "Tour",
      accessorKey: "tour",
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium">{row.original.tour.title}</div>
          <div className="text-sm text-gray-500">{row.original.tour.location}</div>
        </div>
      ),
    },
    {
      header: "Rating",
      accessorKey: "rating",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-2">
          <Badge className={getRatingBadgeColor(row.original.rating)}>
            {row.original.rating}
          </Badge>
          {renderStars(row.original.rating)}
        </div>
      ),
    },
    {
      header: "Comment",
      accessorKey: "comment",
      cell: ({ row }: any) => (
        <div className="max-w-xs">
          <p className="truncate">{row.original.comment}</p>
        </div>
      ),
    },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ row }: unknown) => (
        <div className="text-sm">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }: unknown) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedReview(row.original)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeleteReview(row.original)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  if (loading) {
    return (
      <div className="p-6">
        <LoadingState message="Loading reviews..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorAlert message={error} type="error" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews Management</h1>
          <p className="text-gray-600">Manage customer reviews and ratings</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews?.length || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviews?.length 
                ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
                : "0.0"
              }
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">5-Star Reviews</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviews?.filter(review => review.rating === 5).length || 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Ratings</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {reviews?.filter(review => review.rating <= 2).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search reviews by user, tour, or comment..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10"
              />
            </div>
            
            <Select
              value={filters.rating}
              onValueChange={(value) => setFilters({ ...filters, rating: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={filters.tour}
              onValueChange={(value) => setFilters({ ...filters, tour: value })}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by tour" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Tours</SelectItem>
                {tours?.map((tour) => (
                  <SelectItem key={tour._id} value={tour._id}>
                    {tour.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              onClick={() => setFilters({ rating: "", tour: "", dateRange: "", search: "" })}
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card>
        <CardContent className="p-6">
          <DataTable
            data={filteredReviews}
            columns={columns}
            searchKey="comment"
          />
        </CardContent>
      </Card>

      {/* Review Details Modal */}
      <Dialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
            <DialogDescription>
              Complete review information and details
            </DialogDescription>
          </DialogHeader>
          
          {selectedReview && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Customer</h3>
                  <p className="text-gray-600">{selectedReview.user.name}</p>
                  <p className="text-sm text-gray-500">{selectedReview.user.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Tour</h3>
                  <p className="text-gray-600">{selectedReview.tour.title}</p>
                  <p className="text-sm text-gray-500">{selectedReview.tour.location}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Rating</h3>
                {renderStars(selectedReview.rating)}
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Review Comment</h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                  {selectedReview.comment}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Review Date</h3>
                <p className="text-gray-600">
                  {new Date(selectedReview.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedReview(null)}
                >
                  Close
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDeleteReview(selectedReview)
                    setSelectedReview(null)
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Review
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {reviewToDelete && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{reviewToDelete.user.name}</p>
                <p className="text-sm text-gray-600">{reviewToDelete.tour.title}</p>
                <div className="mt-2">{renderStars(reviewToDelete.rating)}</div>
                <p className="mt-2 text-sm">{reviewToDelete.comment}</p>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmDelete}
                >
                  Delete Review
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}