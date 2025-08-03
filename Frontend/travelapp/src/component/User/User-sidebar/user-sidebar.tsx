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
  User,
  Calendar,
  MapPin,
  Heart,
  CreditCard,
  Settings,
  Bell,
  Plane,
  Home,
  Ticket,
  Star,
  HelpCircle,
  LogOut
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "My Dashboard",
    url: "/user/dashboard",
    icon: User,
  },
  {
    title: "My Bookings",
    url: "/user/bookings",
    icon: Calendar,
  },
  {
    title: "My Trips",
    url: "/user/trips",
    icon: MapPin,
  },
  {
    title: "Wishlist",
    url: "/user/wishlist",
    icon: Heart,
  },
  {
    title: "Payment Methods",
    url: "/user/payments",
    icon: CreditCard,
  },
  {
    title: "My Reviews",
    url: "/user/reviews",
    icon: Star,
  },
  {
    title: "Notifications",
    url: "/user/notifications",
    icon: Bell,
  },
  {
    title: "Profile Settings",
    url: "/user/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    url: "/user/help",
    icon: HelpCircle,
  },
]

interface UserSidebarProps {
  user?: {
    name: string
    email: string
    avatar?: string
    role?: 'USER' | 'ADMIN'
  }
}

export function UserSidebar({ user }: UserSidebarProps) {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <Sidebar className="border-r border-[#8dd3bb]/30">
      <SidebarHeader className="border-b border-[#8dd3bb]/30 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8dd3bb]">
            <Plane className="h-5 w-5 text-gray-900" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-#8dd3bb truncate">Travel Ride Tourism</h2>
            <p className="text-xs text-gray-500">Your Travel Companion</p>
          </div>
        </div>

        {/* User Profile Section */}
        {user && (
          <div className="mt-4 p-3 bg-[#8dd3bb]/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8dd3bb] text-gray-900 text-sm font-medium">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-600 truncate">{user.email}</p>
                {user.role && (
                  <span className="text-xs bg-[#8dd3bb]/40 px-2 py-0.5 rounded-full text-[#2a6b5a] mt-1 inline-block">
                    {user.role}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
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

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#6bb6a3] font-medium">Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-[#8dd3bb]/20 hover:text-[#6bb6a3]">
                  <Link href="/Packages">
                    <Ticket className="h-4 w-4" />
                    <span>Browse Packages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-[#8dd3bb]/20 hover:text-[#6bb6a3]">
                  <Link href="/Services">
                    <MapPin className="h-4 w-4" />
                    <span>Our Services</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-[#8dd3bb]/30 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="hover:bg-red-50 hover:text-red-700 text-gray-600"
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="text-xs text-gray-500 mt-2">© 2024 TravelNRide Tourism</div>
      </SidebarFooter>
    </Sidebar>
  )
}