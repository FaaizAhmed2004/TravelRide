"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"

export function QuickLogin() {
  const { login, logout, isAuthenticated, user } = useAuth()

  const handleLogin = async () => {
    try {
      await login("user@example.com", "password")
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border border-[#8dd3bb]">
      {isAuthenticated ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm">Logged in as: {user?.name}</p>
          <Button 
            onClick={logout}
            variant="destructive"
            size="sm"
          >
            Logout
          </Button>
        </div>
      ) : (
        <Button 
          onClick={handleLogin}
          variant="default"
          size="sm"
          className="bg-[#8dd3bb] hover:bg-[#6bb6a3] text-gray-900"
        >
          Quick Login (Test)
        </Button>
      )}
    </div>
  )
}