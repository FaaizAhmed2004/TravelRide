"use client"

import { DataTable, Column } from "@/component/Admin/Data-table/Data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Destination } from "@/lib/types"
import { Plus, Star } from "lucide-react"
import Image from "next/image"

const mockDestinations: Destination[] = [
  {
    id: "1",
    name: "Eiffel Tower Experience",
    country: "France",
    city: "Paris",
    description: "Visit the iconic Eiffel Tower with guided tours",
    price: 299,
    rating: 4.8,
    image: "/placeholder.svg?height=100&width=100",
    isActive: true,
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Tokyo Cultural Tour",
    country: "Japan",
    city: "Tokyo",
    description: "Explore traditional and modern Tokyo",
    price: 599,
    rating: 4.9,
    image: "/placeholder.svg?height=100&width=100",
    isActive: true,
    createdAt: "2024-01-02",
  },
  {
    id: "3",
    name: "Bali Beach Resort",
    country: "Indonesia",
    city: "Bali",
    description: "Luxury beach resort with spa services",
    price: 199,
    rating: 4.7,
    image: "/placeholder.svg?height=100&width=100",
    isActive: true,
    createdAt: "2024-01-03",
  },
  {
    id: "4",
    name: "Roman Holiday",
    country: "Italy",
    city: "Rome",
    description: "Historical tour of ancient Rome",
    price: 399,
    rating: 4.6,
    image: "/placeholder.svg?height=100&width=100",
    isActive: false,
    createdAt: "2024-01-04",
  },
]

export default function DestinationsPage() {
  const destinations = mockDestinations
  const loading = false

  const columns: Column<Destination>[] = [
    {
      key: "image",
      label: "Image",
      render: (value: string | number | boolean, row: Destination) => (
        <Image
          src={typeof value === "string" ? value : "/placeholder.svg"}
          alt={row.name}
          width={50}
          height={50}
          className="rounded-lg object-cover"
        />
      ),
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "city",
      label: "Location",
      render: (value: string | number | boolean, row: Destination) =>
        `${typeof value === "string" ? value : String(value)}, ${row.country}`,
    },
    {
      key: "price",
      label: "Price",
      render: (value: string | number | boolean) => `$${Number(value)}`,
    },
    {
      key: "rating",
      label: "Rating",
      render: (value: string | number | boolean) => (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{Number(value)}</span>
        </div>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (value: string | number | boolean) => (Boolean(value) ? "active" : "inactive"),
    },
  ]

  const handleEdit = (destination: Destination) => {
    console.log("Edit destination:", destination)
  }

  const handleDelete = (destination: Destination) => {
    console.log("Delete destination:", destination)
  }

  const handleView = (destination: Destination) => {
    console.log("View destination:", destination)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading destinations...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Destinations</h1>
          <p className="text-gray-600">Manage travel destinations and packages</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Destination
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Destinations</CardTitle>
          <CardDescription>Manage your travel destinations, pricing, and availability</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable<Destination>
            data={destinations}
            columns={columns}
            searchKey="name"
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </CardContent>
      </Card>
    </div>
  )
}
