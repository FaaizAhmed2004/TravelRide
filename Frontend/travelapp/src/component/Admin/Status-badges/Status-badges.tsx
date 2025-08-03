"use client"

import { Badge } from "@/components/ui/badge"

interface UserRoleBadgeProps {
  role: string
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    ADMIN: "default",
    USER: "secondary",
    admin: "default",
    user: "secondary"
  }

  return (
    <Badge variant={variants[role] || "outline"}>
      {role.toUpperCase()}
    </Badge>
  )
}

interface UserStatusBadgeProps {
  status: string
}

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    active: "default",
    inactive: "secondary",
    suspended: "destructive"
  }

  return (
    <Badge variant={variants[status] || "outline"}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

interface OfferStatusBadgeProps {
  status: string
}

export function OfferStatusBadge({ status }: OfferStatusBadgeProps) {
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    active: "default",
    draft: "secondary",
    expired: "destructive",
    deactivated: "outline"
  }

  const colors: Record<string, string> = {
    active: "bg-green-100 text-green-800 hover:bg-green-100",
    draft: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    expired: "bg-red-100 text-red-800 hover:bg-red-100",
    deactivated: "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }

  return (
    <Badge 
      variant={variants[status] || "outline"}
      className={colors[status]}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

interface BookingStatusBadgeProps {
  status: string
}

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    confirmed: "default",
    pending: "secondary",
    cancelled: "destructive"
  }

  const colors: Record<string, string> = {
    confirmed: "bg-green-100 text-green-800 hover:bg-green-100",
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    cancelled: "bg-red-100 text-red-800 hover:bg-red-100"
  }

  return (
    <Badge 
      variant={variants[status] || "outline"}
      className={colors[status]}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

interface OrderStatusBadgeProps {
  status: string
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    completed: "default",
    pending: "secondary",
    cancelled: "destructive"
  }

  const colors: Record<string, string> = {
    completed: "bg-green-100 text-green-800 hover:bg-green-100",
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    cancelled: "bg-red-100 text-red-800 hover:bg-red-100"
  }

  return (
    <Badge 
      variant={variants[status] || "outline"}
      className={colors[status]}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

interface CouponExpiryBadgeProps {
  expiryDate: string
}

export function CouponExpiryBadge({ expiryDate }: CouponExpiryBadgeProps) {
  const now = new Date()
  const expiry = new Date(expiryDate)
  const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
  let status: string
  let variant: "default" | "secondary" | "destructive" | "outline"
  let className: string
  
  if (daysUntilExpiry < 0) {
    status = "Expired"
    variant = "destructive"
    className = "bg-red-100 text-red-800 hover:bg-red-100"
  } else if (daysUntilExpiry <= 7) {
    status = "Expiring Soon"
    variant = "secondary"
    className = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
  } else {
    status = "Active"
    variant = "default"
    className = "bg-green-100 text-green-800 hover:bg-green-100"
  }

  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  )
}

interface NotificationTypeBadgeProps {
  type: 'email' | 'whatsapp'
}

export function NotificationTypeBadge({ type }: NotificationTypeBadgeProps) {
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    email: "default",
    whatsapp: "secondary"
  }

  const colors: Record<string, string> = {
    email: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    whatsapp: "bg-green-100 text-green-800 hover:bg-green-100"
  }

  return (
    <Badge 
      variant={variants[type] || "outline"}
      className={colors[type]}
    >
      {type === 'email' ? 'Email' : 'WhatsApp'}
    </Badge>
  )
}