"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Users,
  Award,
  Globe,
  Heart,
  Shield,
  Clock,
  Star,
  Plane,
  Compass,
  Target
} from "lucide-react"
import Image from "next/image"


export default function AboutPage() {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "50,000+" },
    { icon: MapPin, label: "Destinations", value: "200+" },
    { icon: Award, label: "Awards Won", value: "25+" },
    { icon: Globe, label: "Countries", value: "45+" }
  ]

  const values = [
    {
      icon: Heart,
      title: "Passion for Travel",
      description: "We believe travel transforms lives and creates unforgettable memories"
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Your safety and security are our top priorities in every journey"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance to ensure your travel experience is seamless"
    },
    {
      icon: Star,
      title: "Excellence",
      description: "We strive for excellence in every aspect of your travel experience"
    }
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/assets/team1.jpg",
      description: "Travel enthusiast with 15+ years in the tourism industry"
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "/assets/team2.jpg",
      description: "Expert in travel logistics and customer experience"
    },
    {
      name: "Emily Rodriguez",
      role: "Travel Specialist",
      image: "/assets/team3.jpg",
      description: "Passionate about creating unique travel experiences"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-center text-white ">
        <div className="absolute inset-0">
          <Image
            src="/assets/mountain-lake-senery.jpg"
            alt="Mountain lake scenery"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">About TravelNRide</h1>
          <p className="text-xl opacity-90 drop-shadow-md">Creating unforgettable travel experiences since 2010</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <stat.icon className="h-12 w-12 mx-auto mb-4 text-[#8dd3bb]" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2010, TravelNRide began as a small travel agency with a big dream:
                  to make extraordinary travel experiences accessible to everyone. What started
                  as a passion project has grown into one of the most trusted names in travel.
                </p>
                <p>
                  Over the years, we&apos;ve helped thousands of travelers discover new destinations,
                  create lasting memories, and experience the world in ways they never imagined.
                  Our commitment to personalized service and attention to detail sets us apart.
                </p>
                <p>
                  Today, we continue to innovate and expand our offerings, always keeping our
                  core mission at heart: to inspire and enable meaningful travel experiences
                  that enrich lives and broaden perspectives.
                </p>
              </div>
              <div className="mt-8">
                <Button className="bg-[#8dd3bb] hover:bg-[#6bb6a3] text-gray-900">
                  <Compass className="h-4 w-4 mr-2" />
                  Start Your Journey
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="h-96 rounded-lg overflow-hidden">
                <Image
                  src="/assets/paris.jpg"
                  alt="Our journey"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <value.icon className="h-12 w-12 mx-auto mb-4 text-[#8dd3bb]" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2">
            <Card className="border-l-4 border-l-[#8dd3bb]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-[#8dd3bb]" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To inspire and enable meaningful travel experiences by providing exceptional
                  service, expert guidance, and carefully crafted journeys that create lasting
                  memories and broaden perspectives.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#8dd3bb]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-6 w-6 text-[#8dd3bb]" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To be the world&apos;s most trusted travel partner, connecting people with
                  extraordinary destinations and experiences while promoting sustainable and
                  responsible tourism practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind your perfect trip</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-32 w-32 mx-auto mb-4 bg-[#8dd3bb]/20 rounded-full flex items-center justify-center">
                    <Users className="h-16 w-16 text-[#8dd3bb]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TravelNRide?</h2>
            <p className="text-xl text-gray-600">What makes us different from other travel agencies</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb]/20 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-[#8dd3bb]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Knowledge</h3>
              <p className="text-gray-600">Our team has extensive knowledge of destinations worldwide</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb]/20 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-[#8dd3bb]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
              <p className="text-gray-600">Safe and secure payment processing with full protection</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb]/20 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-[#8dd3bb]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support for peace of mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-[#8dd3bb] text-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-xl mb-8 opacity-80">
            Join thousands of satisfied travelers who have trusted us with their dream vacations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              <Plane className="h-5 w-5 mr-2" />
              Browse Packages
            </Button>
            <Button size="lg" variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
              Contact Us Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
