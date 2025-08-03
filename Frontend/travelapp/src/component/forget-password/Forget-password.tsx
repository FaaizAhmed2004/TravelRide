"use client"

import Image from "next/image"

export default function ForgotPassword() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 pr-0 md:pr-6">
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <span className="text-[#112211] font-bold text-2xl">g</span>
            <span className="text-[#8dd3bb] font-bold text-2xl">o</span>
            <span className="text-[#112211] font-bold text-2xl">lobe</span>
          </div>
          <h1 className="text-2xl font-bold text-[#112211] mb-1">Forgot your password?</h1>
          <p className="text-sm text-[#112211] opacity-75">
            Dont worry, happens to all of us. Enter your email below to recover your password
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full p-3 border border-[#79747e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8dd3bb]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8dd3bb] text-[#112211] font-medium py-3 rounded-md hover:bg-opacity-90 transition-all"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <hr className="w-[45%] border-[#d9d9d9]" />
            <span className="text-xs text-[#112211]">or</span>
            <hr className="w-[45%] border-[#d9d9d9]" />
          </div>

          <div className="flex justify-center space-x-4">
            <button className="w-12 h-12 flex items-center justify-center border border-[#d9d9d9] rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1877f2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </button>
            <button className="w-12 h-12 flex items-center justify-center border border-[#d9d9d9] rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21.8055 10.0415H12V14.0415H17.6055C17.2055 16.0415 15.6055 17.4415 12 17.4415C8.4 17.4415 5.80001 14.8415 5.80001 11.2415C5.80001 7.64151 8.40001 5.04151 12 5.04151C13.9 5.04151 15.2 5.64151 16.4 6.64151L19.5 3.54151C17.7 1.94151 15.1 0.841515 12 0.841515C6 0.841515 1 5.84151 1 11.8415C1 17.8415 6 22.8415 12 22.8415C20 22.8415 23 16.8415 23 11.6415C23 11.0415 22.9 10.4415 22.8 10.0415H21.8055Z"
                  fill="#4285F4"
                />
                <path
                  d="M3.15332 7.3455L6.43332 9.755C7.33332 7.555 9.13332 6.04551 12 6.04551C13.9 6.04551 15.2 6.64551 16.4 7.64551L19.5 4.54551C17.7 2.94551 15.1 1.84552 12 1.84552C8.13332 1.84552 4.73332 4.13551 3.15332 7.3455Z"
                  fill="#EA4335"
                />
                <path
                  d="M12 22.8415C15 22.8415 17.7 21.8415 19.5 20.1415L16.1 17.3415C15.1 18.0415 13.8 18.5415 12 18.5415C8.4 18.5415 5.90001 16.5415 5.00001 13.7415L1.40001 16.4415C3.00001 20.2415 7.20001 22.8415 12 22.8415Z"
                  fill="#34A853"
                />
                <path
                  d="M5.00001 13.7415C4.80001 13.0415 4.60001 12.2415 4.60001 11.4415C4.60001 10.6415 4.70001 9.84151 5.00001 9.14151L1.40001 6.44151C0.500015 8.04151 0 9.84151 0 11.8415C0 13.8415 0.600015 15.6415 1.40001 17.2415L5.00001 13.7415Z"
                  fill="#FBBC05"
                />
              </svg>
            </button>
            <button className="w-12 h-12 flex items-center justify-center border border-[#d9d9d9] rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-13 0-2.5-1.5-3-3-3-2 0-3 1-4 1s-2-1-4-1-3 .5-3 3c0 5 3 13 6 13 1.25 0 2.5-1.06 4-1.06z"></path>
                <path d="M12 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
              </svg>
            </button>
          </div>
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
