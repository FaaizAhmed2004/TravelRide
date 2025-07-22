"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Header } from "@/component/Header/Header"
import { Footer } from "@/component/Footer/Footer"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { UserSidebar } from "@/component/User/User-sidebar/user-sidebar"
import { AppSidebar } from "@/component/Admin/App-sidebar/app-sidebar"
import { PublicSidebar } from "@/component/Public/Public-sidebar/public-sidebar"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { ProtectedRoute } from "@/component/Auth/ProtectedRoute"
// import { useSidebarState } from "@/hooks/use-sidebar-state"
import "@/styles/sidebar-responsive.css"

interface LayoutProviderProps {
  children: React.ReactNode
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()

  // Determine layout type based on pathname
  const isAdminPage = pathname.startsWith('/Dashboard')
  const isUserPage = pathname.startsWith('/user')
  const isHomePage = pathname === '/'
  // Check if it's an auth page that should not show the sidebar
  const isAuthPage = pathname.startsWith('/Login') || pathname.startsWith('/Sign-up') || pathname.startsWith('/Verify')

  // Admin Layout
  if (isAdminPage) {
    return (
      <ProtectedRoute requiredRole="ADMIN">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-[#8dd3bb]/30 px-4">
              <SidebarTrigger className="text-[#8dd3bb] hover:bg-[#8dd3bb]/20" />
              <div className="ml-auto flex items-center gap-2">
                <div className="hidden sm:block text-sm text-gray-600">
                  Welcome back, {user?.role === 'ADMIN' ? 'Admin' : user?.name || 'Admin'}
                </div>
              </div>
            </header>
            <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  // User Dashboard Layout
  if (isUserPage) {
    // If not authenticated, the ProtectedRoute component will handle redirection
    return (
      <ProtectedRoute requiredRole="USER">
        <SidebarProvider>
          <UserSidebar user={user || undefined} />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-[#8dd3bb]/30 px-4 bg-white">
              <SidebarTrigger className="text-[#8dd3bb] hover:bg-[#8dd3bb]/20" />
              
              {/* Search Bar */}
              <div className="flex-1 max-w-md mx-4 hidden md:block">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search destinations, bookings..."
                    className="pl-8 bg-gray-50 border-gray-200"
                  />
                </div>
              </div>

              {/* Header Actions */}
              <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
                </Button>
                
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                  <span>Welcome back, {user?.name || 'User'}</span>
                </div>
              </div>
            </header>
            
            <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  // For all other pages, check if user is authenticated
  
  // If user is authenticated, show the user sidebar (except on auth pages)
  if (isAuthenticated && user && !isAuthPage) {
    // For public pages (about, services, etc.) and the homepage when user is authenticated
    return (
      <SidebarProvider>
        <UserSidebar user={user || undefined} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-[#8dd3bb]/30 px-4 bg-white">
            <SidebarTrigger className="text-[#8dd3bb] hover:bg-[#8dd3bb]/20" />
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4 hidden md:block">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search destinations, bookings..."
                  className="pl-8 bg-gray-50 border-gray-200"
                />
              </div>
            </div>
            
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <span>Welcome back, {user.name}</span>
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto">
            <div className="flex-1">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    );
  }
  
  // Default layout for public pages when user is not authenticated - now with sidebar
  return (
    <SidebarProvider>
      <PublicSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-[#8dd3bb]/30 px-4 bg-white">
          <SidebarTrigger className="text-[#8dd3bb] hover:bg-[#8dd3bb]/20" />
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search destinations..."
                className="pl-8 bg-gray-50 border-gray-200"
              />
            </div>
          </div>
          
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="mr-2">
              <Link href="/Login">Sign In</Link>
            </Button>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto">
          <div className="flex-1">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}