"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Home,
  Plane,
  MapPin,
  Ticket,
  CreditCard,
  Phone,
  Info,
  LogIn,
  UserPlus,
  Globe,
  Hotel,
  Compass
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "About Us",
    url: "/about",
    icon: Info,
  },
  {
    title: "Services",
    url: "/Services",
    icon: Compass,
  },
  {
    title: "Packages",
    url: "/Packages",
    icon: Ticket,
  },
  {
    title: "Flights",
    url: "/Flights",
    icon: Plane,
  },
  {
    title: "Hotels",
    url: "/Hotels",
    icon: Hotel,
  },

  {
    title: "Visa Services",
    url: "/Visa",
    icon: Globe,
  },
  {
    title: "Contact Us",
    url: "/Contact",
    icon: Phone,
  },
]

export function PublicSidebar() {
  const pathname = usePathname()
  const { isAuthenticated, user } = useAuth()

  return (
    <Sidebar className="border-r border-[#8dd3bb]/30">
      <SidebarHeader className="border-b border-[#8dd3bb]/30 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8dd3bb]">
            <Plane className="h-5 w-5 text-gray-900" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">TravelNRide</h2>
            <p className="text-xs text-gray-500">Your Travel Companion</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#6bb6a3] font-medium">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`hover:bg-[#8dd3bb]/20 hover:text-[#6bb6a3] ${isActive
                        ? 'bg-[#8dd3bb]/30 text-[#6bb6a3] font-medium'
                        : 'text-gray-700'
                        }`}
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Actions */}
        {!isAuthenticated && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-[#6bb6a3] font-medium">Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-[#8dd3bb]/20 hover:text-[#6bb6a3]">
                    <Link href="/Login">
                      <LogIn className="h-4 w-4" />
                      <span>Sign In</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-[#8dd3bb]/20 hover:text-[#6bb6a3]">
                    <Link href="/Sign-up">
                      <UserPlus className="h-4 w-4" />
                      <span>Create Account</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* User Dashboard Link (if authenticated) */}
        {isAuthenticated && user && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-[#6bb6a3] font-medium">My Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-[#8dd3bb]/20 hover:text-[#6bb6a3]">
                    <Link href="/user/dashboard">
                      <CreditCard className="h-4 w-4" />
                      <span>My Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-[#8dd3bb]/30 p-4">
        <div className="text-xs text-gray-500 mt-2">© 2024 TravelNRide Tourism</div>
      </SidebarFooter>
    </Sidebar>
  )
}