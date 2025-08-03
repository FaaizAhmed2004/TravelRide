"use client"

import type { NextPage } from "next"

const TicketsPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tickets
          </h1>
          <p className="text-xl text-gray-600">
            Manage your travel tickets and bookings
          </p>
        </div>
      </div>
    </div>
  )
}

export default TicketsPage
