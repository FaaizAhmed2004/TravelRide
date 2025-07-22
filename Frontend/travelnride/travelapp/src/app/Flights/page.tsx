"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Plane,
    Users,
    Search,
    Star,
    Wifi,
    Utensils,
    ArrowLeftRight,
    Clock
} from "lucide-react"

// Mock flight data
const mockFlights = [
    {
        id: "FL001",
        airline: "Pakistan International Airlines",
        flightNumber: "PK-301",
        from: "Karachi (KHI)",
        to: "Lahore (LHE)",
        departure: "08:00",
        arrival: "09:30",
        duration: "1h 30m",
        price: 15000,
        class: "Economy",
        stops: "Direct",
        aircraft: "Boeing 737",
        amenities: ["wifi", "meals", "entertainment"],
        rating: 4.2,
        availableSeats: 45
    },
    {
        id: "FL002",
        airline: "Serene Air",
        flightNumber: "ER-502",
        from: "Karachi (KHI)",
        to: "Islamabad (ISB)",
        departure: "14:30",
        arrival: "16:15",
        duration: "1h 45m",
        price: 18500,
        class: "Economy",
        stops: "Direct",
        aircraft: "Airbus A320",
        amenities: ["wifi", "meals"],
        rating: 4.5,
        availableSeats: 32
    },
    {
        id: "FL003",
        airline: "AirBlue",
        flightNumber: "PA-200",
        from: "Lahore (LHE)",
        to: "Dubai (DXB)",
        departure: "22:45",
        arrival: "01:30+1",
        duration: "2h 45m",
        price: 45000,
        class: "Economy",
        stops: "Direct",
        aircraft: "Airbus A320",
        amenities: ["wifi", "meals", "entertainment"],
        rating: 4.3,
        availableSeats: 28
    },
    {
        id: "FL004",
        airline: "Emirates",
        flightNumber: "EK-612",
        from: "Karachi (KHI)",
        to: "Dubai (DXB)",
        departure: "03:45",
        arrival: "05:30",
        duration: "1h 45m",
        price: 55000,
        class: "Business",
        stops: "Direct",
        aircraft: "Boeing 777",
        amenities: ["wifi", "meals", "entertainment", "lounge"],
        rating: 4.8,
        availableSeats: 12
    }
]

export default function FlightsPage() {
    const [searchParams, setSearchParams] = useState({
        from: "",
        to: "",
        departure: "",
        passengers: "1",
        tripType: "one-way"
    })

    const [flights, setFlights] = useState(mockFlights)
    const [isSearching, setIsSearching] = useState(false)

    const handleSearch = async () => {
        setIsSearching(true)
        // Simulate API call
        setTimeout(() => {
            setFlights(mockFlights)
            setIsSearching(false)
        }, 1500)
    }

    const getAmenityIcon = (amenity: string) => {
        switch (amenity) {
            case "wifi": return <Wifi className="h-4 w-4" />
            case "meals": return <Utensils className="h-4 w-4" />
            case "entertainment": return <Star className="h-4 w-4" />
            default: return null
        }
    }

    const swapCities = () => {
        setSearchParams(prev => ({
            ...prev,
            from: prev.to,
            to: prev.from
        }))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Find Your Perfect Flight
                        </h1>
                        <p className="text-xl text-green-100">
                            Compare prices from top airlines and book with confidence
                        </p>
                    </div>

                    {/* Search Form */}
                    <Card className="max-w-4xl mx-auto">
                        <CardContent className="p-6">
                            {/* Trip Type Selection */}
                            <div className="flex gap-4 mb-6">
                                <Button
                                    variant={searchParams.tripType === "one-way" ? "default" : "outline"}
                                    onClick={() => setSearchParams(prev => ({ ...prev, tripType: "one-way" }))}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    One Way
                                </Button>
                                <Button
                                    variant={searchParams.tripType === "round-trip" ? "default" : "outline"}
                                    onClick={() => setSearchParams(prev => ({ ...prev, tripType: "round-trip" }))}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    Round Trip
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* From */}
                                <div className="space-y-2">
                                    <Label htmlFor="from">From</Label>
                                    <Input
                                        id="from"
                                        placeholder="Departure city"
                                        value={searchParams.from}
                                        onChange={(e) => setSearchParams(prev => ({ ...prev, from: e.target.value }))}
                                    />
                                </div>

                                {/* Swap Button */}
                                <div className="flex items-end">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={swapCities}
                                        className="mb-2"
                                    >
                                        <ArrowLeftRight className="h-4 w-4" />
                                    </Button>
                                </div>

                                {/* To */}
                                <div className="space-y-2">
                                    <Label htmlFor="to">To</Label>
                                    <Input
                                        id="to"
                                        placeholder="Destination city"
                                        value={searchParams.to}
                                        onChange={(e) => setSearchParams(prev => ({ ...prev, to: e.target.value }))}
                                    />
                                </div>

                                {/* Departure Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="departure">Departure</Label>
                                    <Input
                                        id="departure"
                                        type="date"
                                        value={searchParams.departure}
                                        onChange={(e) => setSearchParams(prev => ({ ...prev, departure: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <Button
                                onClick={handleSearch}
                                disabled={isSearching}
                                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                            >
                                {isSearching ? (
                                    <>
                                        <Search className="mr-2 h-4 w-4 animate-spin" />
                                        Searching Flights...
                                    </>
                                ) : (
                                    <>
                                        <Search className="mr-2 h-4 w-4" />
                                        Search Flights
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Results Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="text-right mb-6">
                    <div className="text-sm text-gray-600">
                        {flights.length} flights found
                    </div>
                </div>

                {/* Flight Results */}
                <div className="space-y-4">
                    {flights.map((flight) => (
                        <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                                    {/* Flight Info */}
                                    <div className="lg:col-span-2">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                                <Plane className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">{flight.airline}</h3>
                                                <p className="text-sm text-gray-600">{flight.flightNumber} • {flight.aircraft}</p>
                                            </div>
                                            <div className="ml-auto flex items-center gap-1">
                                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                                <span className="text-sm font-medium">{flight.rating}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold">{flight.departure}</div>
                                                <div className="text-sm text-gray-600">{flight.from}</div>
                                            </div>

                                            <div className="flex-1 mx-4">
                                                <div className="flex items-center justify-center mb-1">
                                                    <div className="flex-1 h-px bg-gray-300"></div>
                                                    <div className="mx-2 text-xs text-gray-500 flex items-center">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        {flight.duration}
                                                    </div>
                                                    <div className="flex-1 h-px bg-gray-300"></div>
                                                </div>
                                                <div className="text-center text-xs text-gray-500">{flight.stops}</div>
                                            </div>

                                            <div className="text-center">
                                                <div className="text-2xl font-bold">{flight.arrival}</div>
                                                <div className="text-sm text-gray-600">{flight.to}</div>
                                            </div>
                                        </div>

                                        {/* Amenities */}
                                        <div className="flex items-center gap-4 mt-4">
                                            {flight.amenities.map((amenity) => (
                                                <div key={amenity} className="flex items-center gap-1 text-xs text-gray-600">
                                                    {getAmenityIcon(amenity)}
                                                    <span className="capitalize">{amenity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price and Booking */}
                                    <div className="lg:col-span-2 text-center lg:text-right">
                                        <div className="mb-4">
                                            <div className="text-3xl font-bold text-green-600">
                                                Rs {flight.price.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-600">{flight.class} Class</div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {flight.availableSeats} seats available
                                            </div>
                                        </div>

                                        <Button className="w-full lg:w-auto bg-green-600 hover:bg-green-700 text-white px-8">
                                            Select Flight
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Loading State */}
                {isSearching && (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="animate-pulse">
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                        <div className="lg:col-span-2">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                                <div className="space-y-2">
                                                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                                                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="space-y-2">
                                                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                                                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                                                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:col-span-2 text-right">
                                            <div className="space-y-2">
                                                <div className="h-8 bg-gray-200 rounded w-24 ml-auto"></div>
                                                <div className="h-3 bg-gray-200 rounded w-16 ml-auto"></div>
                                                <div className="h-10 bg-gray-200 rounded w-32 ml-auto"></div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Why Choose TravelNRide for Flights?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We make flight booking simple, secure, and affordable with the best deals from top airlines
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
                            <p className="text-gray-600">
                                Compare flights from multiple airlines and find the best deals in seconds
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                            <p className="text-gray-600">
                                Our customer support team is available round the clock to assist you
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                            <p className="text-gray-600">
                                Get guaranteed best prices with our price match promise and exclusive deals
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}