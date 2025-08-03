"use client"

import { useState } from "react"
import Image from "next/image"
import { Check } from "lucide-react"

export default function AddPaymentMethod() {
  const [saveInfo, setSaveInfo] = useState(false)

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 pr-0 md:pr-6">
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="text-[#112211] font-bold text-2xl">Travel</span>
            <span className="text-[#8dd3bb] font-bold text-2xl">Ride</span>
            <span className="text-[#112211] font-bold text-2xl">Tourism</span>
          </div>
          <h1 className="text-2xl font-bold text-[#112211] mb-1">Add a payment method</h1>
          <p className="text-sm text-[#112211] opacity-75">
            Let get you all set up so you can access your personal account.
          </p>
        </div>

        <form className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-10 bg-[#8dd3bb] rounded-md flex items-center justify-center text-[#112211] font-medium">
              Card
            </div>
            <div className="flex-1 h-10 bg-[#f5f5f5] rounded-md flex items-center justify-center text-[#112211]">
              PayPal
            </div>
          </div>

          <div>
            <label htmlFor="cardName" className="sr-only">
              Name on Card
            </label>
            <input
              type="text"
              id="cardName"
              placeholder="Name on Card"
              className="w-full p-3 border border-[#79747e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8dd3bb]"
            />
          </div>

          <div>
            <label htmlFor="cardNumber" className="sr-only">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              placeholder="Card Number"
              className="w-full p-3 border border-[#79747e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8dd3bb]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="expDate" className="sr-only">
                Exp. Date
              </label>
              <input
                type="text"
                id="expDate"
                placeholder="Exp. Date"
                className="w-full p-3 border border-[#79747e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8dd3bb]"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="sr-only">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                placeholder="CVV"
                className="w-full p-3 border border-[#79747e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8dd3bb]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="country" className="sr-only">
              Country
            </label>
            <select
              id="country"
              className="w-full p-3 border border-[#79747e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8dd3bb] bg-white"
            >
              <option value="">United States</option>
              <option value="ca">Canada</option>
              <option value="uk">United Kingdom</option>
            </select>
          </div>

          <div className="flex items-center">
            <div
              className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer ${saveInfo ? "bg-[#8dd3bb]" : "border border-[#79747e]"}`}
              onClick={() => setSaveInfo(!saveInfo)}
            >
              {saveInfo && <Check size={16} className="text-white" />}
            </div>
            <label className="ml-2 text-xs text-[#112211]">Securely save my information for 1-click checkout</label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#8dd3bb] text-[#112211] font-medium py-3 rounded-md hover:bg-opacity-90 transition-all"
          >
            Add payment method
          </button>

          <p className="text-xs text-[#79747e] text-center">
            By confirming your subscription, you allow The Outdoor Inn Crowd Limited to charge your card for this
            payment and future payments in accordance with their terms. You can always cancel your subscription.
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2 mt-6 md:mt-0">
        <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=400&width=300" alt="Resort with pool" fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}
