"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Star,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Dumbbell,
  Waves,
  Calendar,
  Users,
  Filter,
  Search,
  Heart,
  Share2
} from "lucide-react"
import Image from "next/image"

export default function HotelsPage() {
  const [searchLocation, setSearchLocation] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("2")
  const [priceRange, setPriceRange] = useState("all")
  const [starRating, setStarRating] = useState("all")

  const hotels = [
    {
      id: 1,
      name: "Pearl Continental Hotel Lahore",
      location: "Lahore, Punjab",
      rating: 5,
      reviews: 1250,
      price: 25000,
      originalPrice: 30000,
      image: "/assets/hotel1.jpg",
      amenities: ["Free WiFi", "Pool", "Gym", "Restaurant", "Parking"],
      description: "Luxury 5-star hotel in the heart of Lahore with world-class amenities"
    },
    {
      id: 2,
      name: "Serena Hotel Islamabad",
      location: "Islamabad, Capital",
      rating: 5,
      reviews: 980,
      price: 28000,
      originalPrice: 35000,
      image: "/assets/hotel2.jpg",
      amenities: ["Free WiFi", "Spa", "Restaurant", "Business Center", "Pool"],
      description: "Premium hotel offering exceptional service and comfort in Islamabad"
    },
    {
      id: 3,
      name: "Avari Towers Karachi",
      location: "Karachi, Sindh",
      rating: 4,
      reviews: 850,
      price: 18000,
      originalPrice: 22000,
      image: "/assets/hotel3.jpg",
      amenities: ["Free WiFi", "Restaurant", "Gym", "Room Service", "Parking"],
      description: "Modern hotel with stunning city views and excellent dining options"
    },
    {
      id: 4,
      name: "Marriott Hotel Islamabad",
      location: "Islamabad, Capital",
      rating: 5,
      reviews: 1100,
      price: 32000,
      originalPrice: 38000,
      image: "/assets/hotel4.jpg",
      amenities: ["Free WiFi", "Pool", "Spa", "Multiple Restaurants", "Concierge"],
      description: "International luxury hotel with impeccable service and facilities"
    },
    {
      id: 5,
      name: "Faletti's Hotel Lahore",
      location: "Lahore, Punjab",
      rating: 4,
      reviews: 720,
      price: 15000,
      originalPrice: 18000,
      image: "/assets/hotel5.jpg",
      amenities: ["Free WiFi", "Restaurant", "Heritage Building", "Garden", "Parking"],
      description: "Historic luxury hotel with colonial charm and modern amenities"
    },
    {
      id: 6,
      name: "Movenpick Hotel Karachi",
      location: "Karachi, Sindh",
      rating: 5,
      reviews: 950,
      price: 26000,
      originalPrice: 31000,
      image: "/assets/hotel6.jpg",
      amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Business Center"],
      description: "Contemporary 5-star hotel with exceptional dining and wellness facilities"
    }
  ]

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi':
        return <Wifi className="h-4 w-4" />
      case 'pool':
        return <Waves className="h-4 w-4" />
      case 'gym':
        return <Dumbbell className="h-4 w-4" />
      case 'restaurant':
        return <Utensils className="h-4 w-4" />
      case 'parking':
        return <Car className="h-4 w-4" />
      default:
        return <Coffee className="h-4 w-4" />
    }
  }

  const filteredHotels = hotels.filter(hotel => {
    const matchesLocation = searchLocation === "" || hotel.location.toLowerCase().includes(searchLocation.toLowerCase())
    const matchesPrice = priceRange === "all" || 
      (priceRange === "budget" && hotel.price < 20000) ||
      (priceRange === "mid" && hotel.price >= 20000 && hotel.price < 30000) ||
      (priceRange === "luxury" && hotel.price >= 30000)
    const matchesRating = starRating === "all" || hotel.rating.toString() === starRating
    
    return matchesLocation && matchesPrice && matchesRating
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <Image
            src="/assets/hotel-hero.jpg"
            alt="Luxury hotel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
          <p className="text-xl mb-8">Discover luxury hotels across Pakistan with the best prices</p>
          
          {/* Search Form */}
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-4xl mx-auto">
            <div className="grid gap-4 md:grid-cols-5">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Where are you going?"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10 text-gray-900"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="pl-10 text-gray-900"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="pl-10 text-gray-900"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="pl-10 text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4 Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-[#8dd3bb] hover:bg-[#6bb6a3] text-gray-900">
                Search Hotels
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-6 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="font-medium text-gray-900">Filters:</span>
            </div>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Budget (Under Rs 20,000)</SelectItem>
                <SelectItem value="mid">Mid-range (Rs 20,000-30,000)</SelectItem>
                <SelectItem value="luxury">Luxury (Rs 30,000+)</SelectItem>
              </SelectContent>
            </Select>
            <Select value={starRating} onValueChange={setStarRating}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Star Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="secondary" className="ml-auto">
              {filteredHotels.length} hotels found
            </Badge>
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredHotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <div className="w-full h-full bg-gradient-to-r from-[#8dd3bb]/20 to-[#6bb6a3]/20 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p className="text-sm">Hotel Image</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-[#8dd3bb] text-gray-900">
                      {hotel.rating === 5 ? "Luxury" : hotel.rating === 4 ? "Premium" : "Standard"}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{hotel.name}</h3>
                      <div className="flex items-center gap-1 text-gray-600 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{hotel.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < hotel.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({hotel.reviews} reviews)</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hotel.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 3).map((amenity, index) => (
                      <div key={index} className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </div>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="text-xs text-gray-500">+{hotel.amenities.length - 3} more</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-[#8dd3bb]">Rs {hotel.price.toLocaleString()}</span>
                        {hotel.originalPrice > hotel.price && (
                          <span className="text-sm text-gray-500 line-through">Rs {hotel.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">per night</span>
                    </div>
                    <Button className="bg-[#8dd3bb] hover:bg-[#6bb6a3] text-gray-900">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Hotels Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Book Hotels with TravelNRide?</h2>
          <p className="text-xl text-gray-600 mb-12">Experience the best hospitality across Pakistan</p>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb]/20 rounded-full flex items-center justify-center">
                <Star className="h-8 w-8 text-[#8dd3bb]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">We guarantee the lowest prices on all hotel bookings</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb]/20 rounded-full flex items-center justify-center">
                <MapPin className="h-8 w-8 text-[#8dd3bb]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prime Locations</h3>
              <p className="text-gray-600">Hotels in the best locations across major Pakistani cities</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb]/20 rounded-full flex items-center justify-center">
                <Coffee className="h-8 w-8 text-[#8dd3bb]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support for all your needs</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}