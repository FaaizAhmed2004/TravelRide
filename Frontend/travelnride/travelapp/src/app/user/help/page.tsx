"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { 
  HelpCircle, 
  Search,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  BookOpen,
  Send
} from "lucide-react"

export default function UserHelp() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  
  const faqs = [
    {
      question: "How do I cancel my booking?",
      answer: "You can cancel your booking up to 24 hours before your trip starts. Go to 'My Bookings', find your reservation, and click 'Cancel Booking'. Cancellation fees may apply depending on the package terms."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. All payments are processed securely through our encrypted payment system."
    },
    {
      question: "Can I modify my booking dates?",
      answer: "Yes, you can modify your booking dates subject to availability. Changes can be made up to 48 hours before your original travel date. Additional charges may apply for date changes."
    },
    {
      question: "What's included in the package price?",
      answer: "Package inclusions vary by destination. Generally, our packages include accommodation, guided tours, some meals, and transportation as specified in the package details. Check your specific package for detailed inclusions."
    },
    {
      question: "Do I need travel insurance?",
      answer: "While travel insurance is not mandatory, we highly recommend it to protect against unexpected events like trip cancellations, medical emergencies, or lost luggage. We can help you find suitable coverage."
    },
    {
      question: "What documents do I need for international travel?",
      answer: "For international travel, you'll need a valid passport (with at least 6 months validity) and any required visas for your destination. We'll provide a detailed document checklist after booking."
    }
  ]

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our travel experts",
      contact: "+1 (555) 123-4567",
      hours: "24/7 Available"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your questions",
      contact: "support@travelnride.com",
      hours: "Response within 2 hours"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Start Chat",
      hours: "9 AM - 9 PM EST"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600">Get help with your bookings and travel questions</p>
      </div>

      {/* Search Help */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for help topics, booking issues, or travel questions..."
                className="pl-10"
              />
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold mb-2">Booking Help</h3>
            <p className="text-sm text-gray-600">Issues with your current or past bookings</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold mb-2">Travel Support</h3>
            <p className="text-sm text-gray-600">Get help during your trip</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold mb-2">General Questions</h3>
            <p className="text-sm text-gray-600">FAQs and general information</p>
          </CardContent>
        </Card>
      </div>

      {/* Contact Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>Choose the best way to reach our support team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {contactMethods.map((method, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <method.icon className="h-6 w-6 text-green-600" />
                  <h4 className="font-medium">{method.title}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                <p className="font-medium text-green-600 mb-1">{method.contact}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {method.hours}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3"
                >
                  {method.title === "Live Chat" ? "Start Chat" : "Contact"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Find quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg">
                <button
                  className="w-full p-4 text-left font-medium hover:bg-gray-50 flex items-center justify-between"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {faq.question}
                  <span className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openFaq === index && (
                  <div className="p-4 pt-0 text-gray-600 border-t">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle>Send us a Message</CardTitle>
          <CardDescription>Can&apos;t find what you&apos;re looking for? Send us a message</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What can we help you with?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                title="category" id="category" className="w-full p-2 border rounded-md">
                  <option>Booking Issue</option>
                  <option>Payment Problem</option>
                  <option>Travel Question</option>
                  <option>Technical Support</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Please describe your issue or question in detail..."
                rows={5}
              />
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}