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
  Calendar,
  Users,
  Clock,
  Camera,
  Utensils,
  Car,
  Hotel,
  Search,
  Filter,
  Heart,
  Share2,
  CheckCircle
} from "lucide-react"
import Image from "next/image"

export default function PackagesPage() {
  const [destination, setDestination] = useState("")
  const [duration, setDuration] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [packageType, setPackageType] = useState("all")

  const packages = [
    {
      id: 1,
      title: "Northern Pakistan Adventure",
      destination: "Hunza, Skardu, Gilgit",
      duration: "7 Days / 6 Nights",
      price: 85000,
      originalPrice: 100000,
      image: "/assets/northern-pakistan.jpg",
      rating: 4.8,
      reviews: 245,
      type: "Adventure",
      highlights: ["K2 Base Camp", "Hunza Valley", "Skardu Lakes", "Local Culture"],
      includes: ["Accommodation", "Meals", "Transportation", "Guide"],
      description: "Explore the breathtaking beauty of Northern Pakistan with our comprehensive adventure package"
    },
    {
      id: 2,
      title: "Lahore Heritage Tour",
      destination: "Lahore, Punjab",
      duration: "3 Days / 2 Nights",
      price: 35000,
      originalPrice: 42000,
      image: "/assets/lahore-heritage.jpg",
      rating: 4.6,
      reviews: 180,
      type: "Cultural",
      highlights: ["Badshahi Mosque", "Lahore Fort", "Shalimar Gardens", "Food Street"],
      includes: ["Hotel Stay", "Breakfast", "City Tours", "Guide"],
      description: "Discover the rich cultural heritage and history of the heart of Punjab"
    },
    {
      id: 3,
      title: "Karachi City Explorer",
      destination: "Karachi, Sindh",
      duration: "4 Days / 3 Nights",
      price: 45000,
      originalPrice: 55000,
      image: "/assets/karachi-city.jpg",
      rating: 4.4,
      reviews: 160,
      type: "City",
      highlights: ["Clifton Beach", "Quaid's Mausoleum", "Empress Market", "Port Grand"],
      includes: ["Accommodation", "Meals", "City Tours", "Transportation"],
      description: "Experience the vibrant metropolitan life and coastal beauty of Pakistan's largest city"
    },
    {
      id: 4,
      title: "Islamabad Capital Experience",
      destination: "Islamabad, Capital",
      duration: "2 Days / 1 Night",
      price: 25000,
      originalPrice: 30000,
      image: "/assets/islamabad-capital.jpg",
      rating: 4.5,
      reviews: 120,
      type: "City",
      highlights: ["Faisal Mosque", "Pakistan Monument", "Margalla Hills", "Lok Virsa"],
      includes: ["Hotel Stay", "Breakfast", "Sightseeing", "Guide"],
      description: "Explore Pakistan's beautiful capital city with its modern architecture and natural beauty"
    },
    {
      id: 5,
      title: "Swat Valley Paradise",
      destination: "Swat, KPK",
      duration: "5 Days / 4 Nights",
      price: 65000,
      originalPrice: 75000,
      image: "/assets/swat-valley.jpg",
      rating: 4.7,
      reviews: 200,
      type: "Nature",
      highlights: ["Kalam Valley", "Mahodand Lake", "Ushu Forest", "Buddhist Ruins"],
      includes: ["Accommodation", "All Meals", "Transportation", "Activities"],
      description: "Discover the Switzerland of Pakistan with lush green valleys and crystal clear lakes"
    },
    {
      id: 6,
      title: "Murree Hill Station",
      destination: "Murree, Punjab",
      duration: "3 Days / 2 Nights",
      price: 40000,
      originalPrice: 48000,
      image: "/assets/murree-hills.jpg",
      rating: 4.3,
      reviews: 300,
      type: "Hill Station",
      highlights: ["Mall Road", "Patriata Chair Lift", "Bhurban", "Pine Forests"],
      includes: ["Hotel Stay", "Meals", "Cable Car", "Local Tours"],
      description: "Enjoy the cool mountain air and scenic beauty of Pakistan's most popular hill station"
    }
  ]

  const filteredPackages = packages.filter(pkg => {
    const matchesDestination = destination === "" || pkg.destination.toLowerCase().includes(destination.toLowerCase())
    const matchesDuration = duration === "all" || 
      (duration === "short" && parseInt(pkg.duration) <= 3) ||
      (duration === "medium" && parseInt(pkg.duration) > 3 && parseInt(pkg.duration) <= 5) ||
      (duration === "long" && parseInt(pkg.duration) > 5)
    const matchesPrice = priceRange === "all" || 
      (priceRange === "budget" && pkg.price < 40000) ||
      (priceRange === "mid" && pkg.price >= 40000 && pkg.price < 70000) ||
      (priceRange === "premium" && pkg.price >= 70000)
    const matchesType = packageType === "all" || pkg.type.toLowerCase() === packageType.toLowerCase()
    
    return matchesDestination && matchesDuration && matchesPrice && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <Image
            src="/assets/pakistan-tourism.jpg"
            alt="Pakistan tourism"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Discover Pakistan</h1>
          <p className="text-xl mb-8">Explore amazing destinations with our carefully crafted tour packages</p>
          
          {/* Search Form */}
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-4xl mx-auto">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10 text-gray-900"
                />
              </div>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="text-gray-900">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Duration</SelectItem>
                  <SelectItem value="short">1-3 Days</SelectItem>
                  <SelectItem value="medium">4-5 Days</SelectItem>
                  <SelectItem value="long">6+ Days</SelectItem>
                </SelectContent>
              </Select>
              <Select value={packageType} onValueChange={setPackageType}>
                <SelectTrigger className="text-gray-900">
                  <SelectValue placeholder="Package Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                  <SelectItem value="city">City Tours</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-[#8dd3bb] hover:bg-[#6bb6a3] text-gray-900">
                Search Packages
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
                <SelectItem value="budget">Budget (Under Rs 40,000)</SelectItem>
                <SelectItem value="mid">Mid-range (Rs 40,000-70,000)</SelectItem>
                <SelectItem value="premium">Premium (Rs 70,000+)</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="secondary" className="ml-auto">
              {filteredPackages.length} packages found
            </Badge>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <div className="w-full h-full bg-gradient-to-r from-[#8dd3bb]/20 to-[#6bb6a3]/20 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <Camera className="h-12 w-12 mx-auto mb-2" />
                      <p className="text-sm">Package Image</p>
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
                      {pkg.type}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{pkg.title}</h3>
                      <div className="flex items-center gap-1 text-gray-600 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{pkg.destination}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-600">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{pkg.rating} ({pkg.reviews})</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-sm text-gray-900 mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {pkg.highlights.slice(0, 2).map((highlight, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {pkg.highlights.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{pkg.highlights.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-sm text-gray-900 mb-2">Includes:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {pkg.includes.slice(0, 4).map((item, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-[#8dd3bb]">Rs {pkg.price.toLocaleString()}</span>
                        {pkg.originalPrice > pkg.price && (
                          <span className="text-sm text-gray-500 line-through">Rs {pkg.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">per person</span>
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

      {/* Why Choose Our Packages Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TravelNRide Packages?</h2>
          <p className="text-xl text-gray-600 mb-12">Experience Pakistan like never before with our expertly crafted tours</p>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb]/20 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-[#8dd3bb]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Local Guides</h3>
              <p className="text-gray-600">Knowledgeable guides who know the best spots and hidden gems</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb]/20 rounded-full flex items-center justify-center">
                <Hotel className="h-8 w-8 text-[#8dd3bb]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Accommodation</h3>
              <p className="text-gray-600">Carefully selected hotels and lodges for your comfort</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb]/20 rounded-full flex items-center justify-center">
                <Car className="h-8 w-8 text-[#8dd3bb]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe Transportation</h3>
              <p className="text-gray-600">Reliable and comfortable vehicles with experienced drivers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
