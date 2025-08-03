"use client"

import { useState } from "react"
import Login from "@/component/Login/Login"
import SignUp from "@/component/Sign-up/Signup"
import ForgotPassword from "@/component/forget-password/Forget-password"
import AddPaymentMethod from "@/component/Add-Payment/Add-Payment"
import VerifyCode from "@/component/Verify-code/Verify-code"
import SetPassword from "@/component/Set-password/Set-password"

export default function Loginpage() {
  const [activeTab, setActiveTab] = useState<
    "login" | "signup" | "forgot-password" | "payment" | "verify" | "set-password"
  >("login")

  return (
    <main className="flex items-center justify-center min-h-screen w-full text-black bg-white p-0.5">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 md:p-10">
        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setActiveTab("login")}
            className="text-sm font-medium py-2 px-4 bg-[#8dd3bb] hover:bg-gray-200 rounded"
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className="text-sm font-medium py-2 px-4 bg-[#8dd3bb] hover:bg-gray-200 rounded"
          >
            Sign Up
          </button>
          <button
            onClick={() => setActiveTab("forgot-password")}
            className="text-sm font-medium py-2 px-4  bg-[#8dd3bb] hover:bg-gray-200 rounded"
          >
            Forgot Password
          </button>
          <button
            onClick={() => setActiveTab("payment")}
            className="text-sm font-medium py-2 px-4 bg-[#8dd3bb] hover:bg-gray-200 rounded"
          >
            Payment Method
          </button>
          <button
            onClick={() => setActiveTab("verify")}
            className="text-sm font-medium py-2 px-4 bg-[#8dd3bb] hover:bg-gray-200 rounded"
          >
            Verify Code
          </button>
          <button
            onClick={() => setActiveTab("set-password")}
            className="text-sm font-medium py-2 px-4 bg-[#8dd3bb] hover:bg-gray-200 rounded"
          >
            Set Password
          </button>
        </div>

        {/* Conditional Rendering Based on Active Tab */}
        <div className="w-full">
          {activeTab === "login" && <Login />}
          {activeTab === "signup" && <SignUp />}
          {activeTab === "forgot-password" && <ForgotPassword />}
          {activeTab === "payment" && <AddPaymentMethod />}
          {activeTab === "verify" && <VerifyCode />}
          {activeTab === "set-password" && <SetPassword />}
        </div>
      </div>
    </main>
  )
}
