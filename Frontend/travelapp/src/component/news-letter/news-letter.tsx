"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="py-16 px-6" style={{ backgroundColor: "#cdeae1" }}>
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden" style={{ backgroundColor: "#cdeae1" }}>
          <CardContent className="p-8 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Subscribe Newsletter</h2>
              <h3 className="text-xl font-semibold mb-4">The Travel</h3>
              <p className="text-gray-700 mb-6">
                Get inspired! Receive travel discounts, tips and behind the scenes stories.
              </p>
              <div className="flex gap-3 max-w-md">
                <Input placeholder="Your email address" className="flex-1 bg-white" />
                <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6">Subscribe</Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative w-64 h-48">
                <div className="absolute inset-0 bg-gradient-to-br from-[#65b599] to-[#8dd3bb] rounded-2xl transform rotate-12"></div>
                <div className="absolute top-4 right-4 w-16 h-8 bg-[#ff8682] rounded-lg transform -rotate-12"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 bg-[#dfad92] rounded-lg transform rotate-45"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
