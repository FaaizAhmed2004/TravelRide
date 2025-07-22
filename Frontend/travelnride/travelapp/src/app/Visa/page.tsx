"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Globe,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Calendar,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Search,
  Shield,
  Star,
  Plane
} from "lucide-react"
import Image from "next/image"

export default function VisaPage() {
  const [selectedCountry, setSelectedCountry] = useState("")
  const [visaType, setVisaType] = useState("all")
  const [processingTime, setProcessingTime] = useState("all")

  const visaServices = [
    {
      id: 1,
      country: "United States",
      flag: "🇺🇸",
      visaTypes: [
        { type: "Tourist Visa (B1/B2)", price: 45000, processing: "15-20 days", success: "85%" },
        { type: "Student Visa (F1)", price: 55000, processing: "20-25 days", success: "80%" },
        { type: "Business Visa (B1)", price: 50000, processing: "15-20 days", success: "82%" }
      ],
      requirements: ["Valid Passport", "DS-160 Form", "Photo", "Bank Statement", "Interview"],
      description: "Professional visa assistance for USA with high success rates"
    },
    {
      id: 2,
      country: "United Kingdom",
      flag: "🇬🇧",
      visaTypes: [
        { type: "Tourist Visa", price: 40000, processing: "10-15 days", success: "90%" },
        { type: "Student Visa", price: 50000, processing: "15-20 days", success: "88%" },
        { type: "Work Visa", price: 60000, processing: "20-25 days", success: "75%" }
      ],
      requirements: ["Valid Passport", "Application Form", "Photo", "Financial Proof", "Accommodation"],
      description: "Expert UK visa services with comprehensive documentation support"
    },
    {
      id: 3,
      country: "Canada",
      flag: "🇨🇦",
      visaTypes: [
        { type: "Tourist Visa", price: 35000, processing: "12-18 days", success: "88%" },
        { type: "Student Visa", price: 45000, processing: "15-20 days", success: "85%" },
        { type: "Work Permit", price: 55000, processing: "20-30 days", success: "78%" }
      ],
      requirements: ["Valid Passport", "Application Form", "Photo", "Financial Support", "Medical Exam"],
      description: "Reliable Canada visa processing with experienced consultants"
    },
    {
      id: 4,
      country: "Australia",
      flag: "🇦🇺",
      visaTypes: [
        { type: "Tourist Visa", price: 38000, processing: "10-15 days", success: "92%" },
        { type: "Student Visa", price: 48000, processing: "15-25 days", success: "87%" },
        { type: "Work Visa", price: 58000, processing: "25-35 days", success: "80%" }
      ],
      requirements: ["Valid Passport", "Online Application", "Photo", "Health Insurance", "Character Certificate"],
      description: "Comprehensive Australia visa services with high approval rates"
    },
    {
      id: 5,
      country: "Schengen (Europe)",
      flag: "🇪🇺",
      visaTypes: [
        { type: "Tourist Visa", price: 32000, processing: "8-12 days", success: "90%" },
        { type: "Business Visa", price: 35000, processing: "10-15 days", success: "88%" },
        { type: "Student Visa", price: 42000, processing: "15-20 days", success: "85%" }
      ],
      requirements: ["Valid Passport", "Application Form", "Photo", "Travel Insurance", "Hotel Booking"],
      description: "Access 26 European countries with our Schengen visa services"
    },
    {
      id: 6,
      country: "Dubai (UAE)",
      flag: "🇦🇪",
      visaTypes: [
        { type: "Tourist Visa", price: 25000, processing: "3-5 days", success: "95%" },
        { type: "Business Visa", price: 30000, processing: "5-7 days", success: "92%" },
        { type: "Transit Visa", price: 15000, processing: "2-3 days", success: "98%" }
      ],
      requirements: ["Valid Passport", "Photo", "Bank Statement", "Hotel Booking", "Return Ticket"],
      description: "Fast and reliable UAE visa processing with same-day options available"
    }
  ]

  const services = [
    {
      icon: FileText,
      title: "Document Preparation",
      description: "Complete assistance with visa application forms and required documents",
      price: "Rs 5,000"
    },
    {
      icon: Clock,
      title: "Fast Track Processing",
      description: "Expedited visa processing for urgent travel requirements",
      price: "Rs 10,000"
    },
    {
      icon: Users,
      title: "Interview Preparation",
      description: "Mock interviews and guidance for visa interview success",
      price: "Rs 8,000"
    },
    {
      icon: Shield,
      title: "Visa Insurance",
      description: "Travel insurance coverage as per visa requirements",
      price: "Rs 3,000"
    }
  ]

  const filteredServices = visaServices.filter(service => {
    const matchesCountry = selectedCountry === "" || service.country.toLowerCase().includes(selectedCountry.toLowerCase())
    return matchesCountry
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <Image
            src="/assets/visa-services.jpg"
            alt="Visa services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Visa Services</h1>
          <p className="text-xl mb-8">Professional visa assistance for your international travel needs</p>
          
          {/* Search Form */}
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="pl-10 text-gray-900"
                />
              </div>
              <Select value={visaType} onValueChange={setVisaType}>
                <SelectTrigger className="text-gray-900">
                  <SelectValue placeholder="Visa Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="tourist">Tourist</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-[#8dd3bb] hover:bg-[#6bb6a3] text-gray-900">
                Search Visa
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Services Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Visa Destinations</h2>
            <p className="text-xl text-gray-600">Choose from our most requested visa services</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{service.flag}</span>
                    <div>
                      <CardTitle className="text-lg">{service.country}</CardTitle>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <Tabs defaultValue="visas" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="visas">Visa Types</TabsTrigger>
                      <TabsTrigger value="requirements">Requirements</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="visas" className="space-y-3">
                      {service.visaTypes.map((visa, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-sm">{visa.type}</h4>
                            <Badge className="bg-green-100 text-green-800">
                              {visa.success} success
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{visa.processing}</span>
                            </div>
                            <span className="font-bold text-[#8dd3bb]">Rs {visa.price.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="requirements" className="space-y-2">
                      {service.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                  
                  <Button className="w-full mt-4 bg-[#8dd3bb] hover:bg-[#6bb6a3] text-gray-900">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-xl text-gray-600">Comprehensive support for your visa application</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="h-12 w-12 mx-auto mb-4 text-[#8dd3bb]" />
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <div className="text-xl font-bold text-[#8dd3bb] mb-4">{service.price}</div>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Visa Process</h2>
            <p className="text-xl text-gray-600">Simple steps to get your visa approved</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb] rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Consultation</h3>
              <p className="text-gray-600">Free consultation to understand your visa requirements</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb] rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Documentation</h3>
              <p className="text-gray-600">Complete assistance with document preparation and verification</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb] rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Application</h3>
              <p className="text-gray-600">Submit your application with proper tracking and follow-up</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb] rounded-full flex items-center justify-center text-white font-bold text-xl">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Approval</h3>
              <p className="text-gray-600">Receive your approved visa and travel with confidence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TravelNRide Visa Services?</h2>
          <p className="text-xl text-gray-600 mb-12">Your trusted partner for international visa processing</p>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb]/20 rounded-full flex items-center justify-center">
                <Star className="h-8 w-8 text-[#8dd3bb]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">High Success Rate</h3>
              <p className="text-gray-600">Over 90% visa approval rate with our expert guidance</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb]/20 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-[#8dd3bb]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
              <p className="text-gray-600">Quick turnaround times with regular status updates</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#8dd3bb]/20 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-[#8dd3bb]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">Experienced visa consultants with in-depth knowledge</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 bg-[#8dd3bb] text-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Apply for Your Visa?</h2>
          <p className="text-xl mb-8 opacity-80">
            Get started with a free consultation from our visa experts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              <Phone className="h-5 w-5 mr-2" />
              Call Now: +92-300-1234567
            </Button>
            <Button size="lg" variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
              <Mail className="h-5 w-5 mr-2" />
              Email Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
