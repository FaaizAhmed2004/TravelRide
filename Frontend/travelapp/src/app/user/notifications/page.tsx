"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bell, 
  Mail,
  MessageSquare,
  Calendar,
  Gift,
  CreditCard,
  Star,
  Settings,
  Check,
  X
} from "lucide-react"

export default function UserNotifications() {
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      bookingConfirmation: true,
      tripReminders: true,
      promotions: false,
      reviews: true,
      newsletter: false
    },
    push: {
      bookingUpdates: true,
      tripReminders: true,
      promotions: false,
      messages: true
    },
    sms: {
      bookingConfirmation: true,
      emergencyAlerts: true,
      promotions: false
    }
  })

  const notifications = [
    {
      id: "1",
      type: "booking",
      title: "Booking Confirmed",
      message: "Your booking for Bali Paradise Package has been confirmed",
      time: "2 hours ago",
      read: false,
      icon: Calendar
    },
    {
      id: "2",
      type: "promotion",
      title: "Special Offer",
      message: "20% off on all European packages this weekend only!",
      time: "1 day ago",
      read: false,
      icon: Gift
    },
    {
      id: "3",
      type: "payment",
      title: "Payment Processed",
      message: "Payment of $1,299 has been successfully processed",
      time: "2 days ago",
      read: true,
      icon: CreditCard
    },
    {
      id: "4",
      type: "review",
      title: "Review Reminder",
      message: "How was your trip to Paris? Share your experience",
      time: "3 days ago",
      read: true,
      icon: Star
    },
    {
      id: "5",
      type: "message",
      title: "New Message",
      message: "You have a new message from customer support",
      time: "1 week ago",
      read: true,
      icon: MessageSquare
    }
  ]

  const getNotificationIcon = (type: string) => {
    const iconMap = {
      booking: Calendar,
      promotion: Gift,
      payment: CreditCard,
      review: Star,
      message: MessageSquare
    }
    const IconComponent = iconMap[type as keyof typeof iconMap] || Bell
    return <IconComponent className="h-5 w-5" />
  }

  const getNotificationColor = (type: string) => {
    const colorMap = {
      booking: "text-green-600 bg-green-100",
      promotion: "text-purple-600 bg-purple-100",
      payment: "text-blue-600 bg-blue-100",
      review: "text-yellow-600 bg-yellow-100",
      message: "text-gray-600 bg-gray-100"
    }
    return colorMap[type as keyof typeof colorMap] || "text-gray-600 bg-gray-100"
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Manage your notification preferences and view recent alerts</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{unreadCount} unread</Badge>
          <Button variant="outline" size="sm">
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Your latest updates and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                  <p className="text-gray-600">You&apos;re all caught up!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`flex items-start gap-4 p-4 rounded-lg border transition-colors hover:bg-muted/50 ${
                        !notification.read ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                    >
                      <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{notification.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                            )}
                            <Button variant="ghost" size="sm">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          {/* Email Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-green-600" />
                Email Notifications
              </CardTitle>
              <CardDescription>Choose what email notifications you&apos;d like to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Booking Confirmations</Label>
                  <p className="text-sm text-gray-500">Get notified when your bookings are confirmed</p>
                </div>
                <Switch
                  checked={notificationSettings.email.bookingConfirmation}
                  onCheckedChange={(checked) => 
                    setNotificationSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, bookingConfirmation: checked }
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Trip Reminders</Label>
                  <p className="text-sm text-gray-500">Reminders about upcoming trips</p>
                </div>
                <Switch
                  checked={notificationSettings.email.tripReminders}
                  onCheckedChange={(checked) => 
                    setNotificationSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, tripReminders: checked }
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Promotions & Deals</Label>
                  <p className="text-sm text-gray-500">Special offers and promotional deals</p>
                </div>
                <Switch
                  checked={notificationSettings.email.promotions}
                  onCheckedChange={(checked) => 
                    setNotificationSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, promotions: checked }
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Review Requests</Label>
                  <p className="text-sm text-gray-500">Requests to review your completed trips</p>
                </div>
                <Switch
                  checked={notificationSettings.email.reviews}
                  onCheckedChange={(checked) => 
                    setNotificationSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, reviews: checked }
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Push Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-green-600" />
                Push Notifications
              </CardTitle>
              <CardDescription>Manage your push notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Booking Updates</Label>
                  <p className="text-sm text-gray-500">Important updates about your bookings</p>
                </div>
                <Switch
                  checked={notificationSettings.push.bookingUpdates}
                  onCheckedChange={(checked) => 
                    setNotificationSettings(prev => ({
                      ...prev,
                      push: { ...prev.push, bookingUpdates: checked }
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Trip Reminders</Label>
                  <p className="text-sm text-gray-500">Reminders about upcoming trips</p>
                </div>
                <Switch
                  checked={notificationSettings.push.tripReminders}
                  onCheckedChange={(checked) => 
                    setNotificationSettings(prev => ({
                      ...prev,
                      push: { ...prev.push, tripReminders: checked }
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Messages</Label>
                  <p className="text-sm text-gray-500">New messages from customer support</p>
                </div>
                <Switch
                  checked={notificationSettings.push.messages}
                  onCheckedChange={(checked) => 
                    setNotificationSettings(prev => ({
                      ...prev,
                      push: { ...prev.push, messages: checked }
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-green-600 hover:bg-green-700">
              Save Preferences
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}