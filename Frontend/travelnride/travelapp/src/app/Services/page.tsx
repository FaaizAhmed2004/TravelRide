"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Plane,
  MapPin,
  Calendar,
  Shield,
  Clock,
  Users,
  Camera,
  Car,
  Building,
  Utensils,
  Compass,
  Heart,
  Star,
  Globe,
  Phone,
  CheckCircle
} from "lucide-react"

export default function ServicesPage() {
  const mainServices = [
    {
      icon: Plane,
      title: "Flight Booking",
      description: "Book domestic and international flights with the best deals and flexible options",
      features: ["Best Price Guarantee", "24/7 Support", "Easy Cancellation", "Multiple Airlines"],
      price: "From $299",
      popular: true
    },
    {
      icon: Building,
      title: "Hotel Reservations",
      description: "Comfortable accommodations from budget-friendly to luxury hotels worldwide",
      features: ["Verified Reviews", "Instant Confirmation", "Free Cancellation", "Best Locations"],
      price: "From $89/night",
      popular: false
    },
    {
      icon: MapPin,
      title: "Tour Packages",
      description: "Curated travel packages with guided tours and unique experiences",
      features: ["Expert Guides", "All Inclusive", "Small Groups", "Cultural Immersion"],
      price: "From $599",
      popular: true
    },
    {
      icon: Car,
      title: "Transportation",
      description: "Airport transfers, car rentals, and local transportation arrangements",
      features: ["Airport Pickup", "Professional Drivers", "Various Vehicle Types", "GPS Tracking"],
      price: "From $49",
      popular: false
    }
  ]

  const specializedServices = [
    {
      icon: Heart,
      title: "Honeymoon Packages",
      description: "Romantic getaways designed for couples",
      highlights: ["Private Dinners", "Couple Spa", "Romantic Settings"]
    },
    {
      icon: Users,
      title: "Group Travel",
      description: "Customized packages for groups and families",
      highlights: ["Group Discounts", "Flexible Itineraries", "Dedicated Coordinator"]
    },
    {
      icon: Compass,
      title: "Adventure Tours",
      description: "Thrilling experiences for adventure seekers",
      highlights: ["Expert Guides", "Safety Equipment", "Unique Destinations"]
    },
    {
      icon: Camera,
      title: "Photography Tours",
      description: "Capture stunning moments with professional guidance",
      highlights: ["Pro Photographers", "Best Locations", "Equipment Included"]
    },
    {
      icon: Utensils,
      title: "Culinary Experiences",
      description: "Food tours and cooking classes worldwide",
      highlights: ["Local Cuisine", "Cooking Classes", "Market Tours"]
    },
    {
      icon: Globe,
      title: "Cultural Immersion",
      description: "Deep dive into local cultures and traditions",
      highlights: ["Local Families", "Traditional Activities", "Language Learning"]
    }
  ]

  const supportServices = [
    {
      icon: Shield,
      title: "Travel Insurance",
      description: "Comprehensive coverage for peace of mind",
      details: "Medical, trip cancellation, and baggage protection"
    },
    {
      icon: Calendar,
      title: "Visa Assistance",
      description: "Help with visa applications and documentation",
      details: "Document preparation and application support"
    },
    {
      icon: Phone,
      title: "24/7 Emergency Support",
      description: "Round-the-clock assistance during your travels",
      details: "Emergency hotline and local support"
    },
    {
      icon: Clock,
      title: "Travel Planning",
      description: "Personalized itinerary planning services",
      details: "Custom itineraries based on your preferences"
    }
  ]

  const processSteps = [
    {
      step: "1",
      title: "Consultation",
      description: "Tell us about your travel dreams and preferences"
    },
    {
      step: "2",
      title: "Planning",
      description: "We create a personalized itinerary just for you"
    },
    {
      step: "3",
      title: "Booking",
      description: "Secure your reservations with our best price guarantee"
    },
    {
      step: "4",
      title: "Support",
      description: "Enjoy 24/7 support throughout your journey"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8dd3bb] to-[#6bb6a3]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Our Services</h1>
          <p className="text-xl opacity-90 drop-shadow-md">Comprehensive travel solutions for every journey</p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Travel Services</h2>
            <p className="text-xl text-gray-600">Everything you need for the perfect trip</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {mainServices.map((service, index) => (
              <Card key={index} className={`relative hover:shadow-lg transition-shadow ${service.popular ? 'ring-2 ring-[#8dd3bb]' : ''}`}>
                {service.popular && (
                  <Badge className="absolute -top-2 left-4 bg-[#8dd3bb] text-gray-900">Most Popular</Badge>
                )}
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-[#8dd3bb]/20 rounded-lg flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-[#8dd3bb]" />
                    </div>
                    <div>
                      <CardTitle>{service.title}</CardTitle>
                      <div className="text-2xl font-bold text-[#8dd3bb]">{service.price}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#8dd3bb]" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-[#8dd3bb] hover:bg-[#6bb6a3] text-gray-900">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Specialized Experiences</h2>
            <p className="text-xl text-gray-600">Unique travel experiences tailored to your interests</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {specializedServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="h-12 w-12 text-[#8dd3bb] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-1">
                    {service.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Star className="h-3 w-3 text-[#8dd3bb]" />
                        <span className="text-sm text-gray-600">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Support Services</h2>
            <p className="text-xl text-gray-600">Additional services to ensure a smooth journey</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {supportServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="h-12 w-12 mx-auto mb-4 text-[#8dd3bb]" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-2">{service.description}</p>
                  <p className="text-sm text-gray-500">{service.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to your perfect vacation</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb] text-gray-900 rounded-full flex items-center justify-center text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Services?</h2>
            <p className="text-xl text-gray-600">What sets us apart from other travel agencies</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb]/20 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-[#8dd3bb]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">We match any competitors price and beat it by 5%</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb]/20 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-[#8dd3bb]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock assistance wherever you are</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb]/20 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-[#8dd3bb]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">Experienced travel professionals at your service</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-[#8dd3bb] text-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Plan Your Next Adventure?</h2>
          <p className="text-xl mb-8 opacity-80">
            Let our travel experts create the perfect itinerary for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              <Calendar className="h-5 w-5 mr-2" />
              Book Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
              <Phone className="h-5 w-5 mr-2" />
              Call Us Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
