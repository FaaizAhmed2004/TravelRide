"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'USER' | 'ADMIN'
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Wait until auth check is complete
    if (!isLoading) {
      if (!isAuthenticated) {
        // Store the attempted URL to redirect back after login
        sessionStorage.setItem('redirectAfterLogin', pathname)
        router.push('/Login')
      } else if (requiredRole && user?.role !== requiredRole) {
        // Handle role-based access
        if (user?.role === 'ADMIN') {
          router.push('/Dashboard')
        } else {
          // For regular users, redirect to user dashboard or keep them on public pages
          const isPublicPage = pathname === '/' || 
                              pathname.startsWith('/about') || 
                              pathname.startsWith('/Services') || 
                              pathname.startsWith('/Contact');
          
          if (!isPublicPage) {
            router.push('/user/dashboard')
          }
        }
      }
    }
  }, [isLoading, isAuthenticated, user, router, pathname, requiredRole])

  // Show nothing while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div 
          data-testid="loading-spinner"
          role="status"
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8dd3bb]"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  // If not authenticated or wrong role, the useEffect will redirect
  // If authenticated with correct role, render children
  return isAuthenticated && (!requiredRole || user?.role === requiredRole) ? <>{children}</> : null
}