"use client"

import Image from "next/image"
import Link from "next/link"

export default function VerifyCode() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 pr-0 md:pr-6">
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <span className="text-[#112211] font-bold text-2xl">g</span>
            <span className="text-[#8dd3bb] font-bold text-2xl">o</span>
            <span className="text-[#112211] font-bold text-2xl">lobe</span>
          </div>
          <h1 className="text-2xl font-bold text-[#112211] mb-1">Verify code</h1>
          <p className="text-sm text-[#112211] opacity-75">An authentication code has been sent to your email.</p>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="verificationCode" className="sr-only">
              Verification Code
            </label>
            <input
              type="text"
              id="verificationCode"
              placeholder="6-digit code"
              className="w-full p-3 border border-[#79747e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8dd3bb]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8dd3bb] text-[#112211] font-medium py-3 rounded-md hover:bg-opacity-90 transition-all"
          >
            Verify
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-[#112211]">
            Didnt receive a code?{" "}
            <Link href="#" className="text-[#ff8682]">
              Click to resend
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:block w-1/2 mt-6 md:mt-0">
        <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=400&width=300" alt="Resort with pool" fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}
