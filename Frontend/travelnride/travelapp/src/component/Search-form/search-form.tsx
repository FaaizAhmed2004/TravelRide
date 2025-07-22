"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plane, Building2 } from "lucide-react"

export function SearchForm() {
  return (
    <section className="relative -mt-20 z-20 max-w-4xl mx-auto px-6">
      <Card className="bg-white shadow-xl">
        <CardContent className="p-6">
          <Tabs defaultValue="flights" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="flights" className="flex items-center gap-2">
                <Plane className="w-4 h-4" />
                Flights
              </TabsTrigger>
              <TabsTrigger value="stays" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Stays
              </TabsTrigger>
            </TabsList>
            <TabsContent value="flights">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">From - To</label>
                  <Input placeholder="Lahore - Karachi" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Trip</label>
                  <Select>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Return" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="return">Return</SelectItem>
                      <SelectItem value="oneway">One Way</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Depart - Return</label>
                  <Input placeholder="07 Nov 22 - 13 Nov 22" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Passenger - Class</label>
                  <Input placeholder="1 Passenger, Economy" className="h-12" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Button variant="ghost" className="text-[#65b599]">
                  + Add Promo Code
                </Button>
                <Button className="bg-[#65b599] hover:bg-[#65b599]/90 px-8">Show Flights</Button>
              </div>
            </TabsContent>
            <TabsContent value="stays">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <Input placeholder="Enter destination" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Check-in</label>
                  <Input placeholder="Check-in date" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Check-out</label>
                  <Input placeholder="Check-out date" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Guests</label>
                  <Input placeholder="2 Guests, 1 Room" className="h-12" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Button variant="ghost" className="text-[#65b599]">
                  + Add Promo Code
                </Button>
                <Button className="bg-[#65b599] hover:bg-[#65b599]/90 px-8">Show Hotels</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}
