"use client"

import { Button } from "@/components/ui/button"
import { Plane, Building2 } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-sm">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6">
          <Link href="#" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
            <Plane className="w-4 h-4" />
            Find Flight
          </Link>
          <Link href="#" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
            <Building2 className="w-4 h-4" />
            Find Stays
          </Link>
        </div>
        <div className="text-2xl font-bold text-[#65b599]">TravelNRide Tourism</div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm">
          Login
        </Button>
        <Button size="sm" className="bg-[#65b599] hover:bg-[#65b599]/90">
          Sign up
        </Button>
      </div>
    </header>
  )
}
