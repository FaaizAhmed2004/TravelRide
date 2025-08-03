"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function SetPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 pr-0 md:pr-6">
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <span className="text-[#112211] font-bold text-2xl">g</span>
            <span className="text-[#8dd3bb] font-bold text-2xl">o</span>
            <span className="text-[#112211] font-bold text-2xl">lobe</span>
          </div>
          <h1 className="text-2xl font-bold text-[#112211] mb-1">Set a password</h1>
          <p className="text-sm text-[#112211] opacity-75">
            Your previous password has been reseted. Please set a new password for your account.
          </p>
        </div>

        <form className="space-y-4">
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Create Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Create Password"
              className="w-full p-3 border border-[#79747e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8dd3bb]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="sr-only">
              Re-enter Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Re-enter Password"
              className="w-full p-3 border border-[#79747e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8dd3bb]"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#8dd3bb] text-[#112211] font-medium py-3 rounded-md hover:bg-opacity-90 transition-all"
          >
            Set password
          </button>
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
