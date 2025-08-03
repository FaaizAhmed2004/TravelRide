import type React from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/component/Admin/App-sidebar/App-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-green-100 px-4">
          <SidebarTrigger className="text-green-600 hover:bg-green-50" />
          <div className="ml-auto flex items-center gap-2">
            <div className="text-sm text-gray-600">Welcome back, Admin</div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6 bg-gray-50">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
