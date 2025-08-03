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
  LayoutDashboard, 
  Calendar, 
  MapPin, 
  Users, 
  Settings, 
  BarChart3, 
  Plane,
  Star,
  Gift,
  Ticket,
  ShoppingCart,
  Bell
} from "lucide-react"
import Link from "next/link"

const menuItems = [
  {
    title: "Dashboard",
    url: "/Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tours",
    url: "/Dashboard/tours",
    icon: MapPin,
  },
  {
    title: "Bookings",
    url: "/Dashboard/bookings",
    icon: Calendar,
  },
  {
    title: "Users",
    url: "/Dashboard/users",
    icon: Users,
  },
  {
    title: "Reviews",
    url: "/Dashboard/reviews",
    icon: Star,
  },
  {
    title: "Offers",
    url: "/Dashboard/offers",
    icon: Gift,
  },
  {
    title: "Coupons",
    url: "/Dashboard/coupons",
    icon: Ticket,
  },
  {
    title: "Orders",
    url: "/Dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Notifications",
    url: "/Dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Analytics",
    url: "/Dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/Dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-green-100">
      <SidebarHeader className="border-b border-green-100 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
            <Plane className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">TravelAdmin</h2>
            <p className="text-xs text-gray-500">Travel Agency Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-700 font-medium">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-green-50 hover:text-green-700 data-[active=true]:bg-green-100 data-[active=true]:text-green-800"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-green-100 p-4">
        <div className="text-xs text-gray-500">© 2024 Travel Agency Admin</div>
      </SidebarFooter>
    </Sidebar>
  )
}
