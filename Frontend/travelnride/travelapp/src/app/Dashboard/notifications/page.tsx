"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/component/Admin/Data-table/Data-table"
import { NotificationTypeBadge } from "@/component/Admin/Status-badges/Status-badges"
import { ErrorAlert, useToast } from "@/component/Admin/Error-alert/Error-alert"
import { LoadingState, EmptyState, NotificationHistorySkeleton } from "@/component/Admin/Loading-skeletons/Loading-skeletons"
import { useApiData, useApiMutation } from "@/hooks/use-api-data"
import { NotificationService } from "@/lib/api-service"
import type { NotificationSettings, NotificationHistory } from "@/lib/types"
import { Bell, Mail, MessageSquare, Settings, Send, CheckCircle, XCircle, Clock, TestTube } from "lucide-react"

export default function NotificationsPage() {
  const [testEmail, setTestEmail] = useState("")
  const [testPhone, setTestPhone] = useState("")

  const { showSuccess, showError } = useToast()
  
  // Fetch notifications data
  const { data: settings, loading: settingsLoading, error: settingsError, refetch: refetchSettings } = useApiData<NotificationSettings>('/notifications/settings')
  const { data: history, loading: historyLoading, error: historyError, refetch: refetchHistory } = useApiData<NotificationHistory[]>('/notifications/history')
  
  // Mutations for operations
  const { mutate: updateSettings, loading: updating } = useApiMutation<NotificationSettings>()
  const { mutate: testNotification, loading: testing } = useApiMutation<void>()

  // Handle settings update
  const handleSettingsUpdate = async (newSettings: Partial<NotificationSettings>) => {
    try {
      await updateSettings('/notifications/settings', {
        method: 'PUT',
        body: JSON.stringify(newSettings)
      })
      showSuccess('Notification settings updated successfully')
      refetchSettings()
    } catch (error) {
      showError('Failed to update notification settings')
    }
  }

  // Handle test notification
  const handleTestNotification = async (type: 'email' | 'whatsapp') => {
    const recipient = type === 'email' ? testEmail : testPhone
    
    if (!recipient) {
      showError(`Please enter a ${type === 'email' ? 'email address' : 'phone number'}`)
      return
    }

    try {
      await testNotification('/notifications/test', {
        method: 'POST',
        body: JSON.stringify({ type, recipient })
      })
      showSuccess(`Test ${type} notification sent successfully`)
      if (type === 'email') setTestEmail("")
      if (type === 'whatsapp') setTestPhone("")
      refetchHistory()
    } catch (error) {
      showError(`Failed to send test ${type} notification`)
    }
  }

  // Get notification statistics
  const getNotificationStats = () => {
    if (!history || history.length === 0) return null
    
    let emailCount = 0
    let whatsappCount = 0
    let sentCount = 0
    let failedCount = 0
    
    history.forEach(notification => {
      if (notification.type === 'email') emailCount++
      if (notification.type === 'whatsapp') whatsappCount++
      if (notification.status === 'sent') sentCount++
      if (notification.status === 'failed') failedCount++
    })
    
    const successRate = history.length > 0 ? (sentCount / history.length) * 100 : 0
    
    return {
      total: history.length,
      email: emailCount,
      whatsapp: whatsappCount,
      sent: sentCount,
      failed: failedCount,
      successRate
    }
  }

  const notificationStats = getNotificationStats()

  // Table columns for notification history
  const historyColumns = [
    {
      key: 'type',
      label: 'Type',
      render: (value: string) => <NotificationTypeBadge type={value as any} />
    },
    {
      key: 'event',
      label: 'Event',
      sortable: true,
      render: (value: string) => (
        <span className="capitalize">{value.replace('_', ' ')}</span>
      )
    },
    {
      key: 'recipient',
      label: 'Recipient',
      render: (value: string) => (
        <div className="font-mono text-sm">{value}</div>
      )
    },
    {
      key: 'subject',
      label: 'Subject',
      render: (value: string) => (
        <div className="max-w-xs truncate">{value}</div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => {
        const statusConfig = {
          sent: { icon: CheckCircle, className: "text-green-600" },
          failed: { icon: XCircle, className: "text-red-600" },
          pending: { icon: Clock, className: "text-yellow-600" }
        }
        
        const config = statusConfig[value as keyof typeof statusConfig] || statusConfig.pending
        const Icon = config.icon
        
        return (
          <div className={`flex items-center ${config.className}`}>
            <Icon className="h-4 w-4 mr-1" />
            <span className="capitalize">{value}</span>
          </div>
        )
      }
    },
    {
      key: 'sentAt',
      label: 'Sent At',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleString()
    }
  ]

  if (settingsLoading) {
    return <LoadingState message="Loading notification settings..." />
  }

  if (settingsError) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">Manage notification settings and history</p>
          </div>
        </div>
        <ErrorAlert 
          message={settingsError} 
          onRetry={refetchSettings}
          retryLabel="Retry Loading"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Manage notification settings and history</p>
        </div>
      </div>

      {/* Notification Statistics */}
      {notificationStats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Sent</CardTitle>
              <Bell className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notificationStats.total}</div>
              <p className="text-xs text-muted-foreground">All notifications</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notificationStats.successRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Delivery success</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Email Notifications</CardTitle>
              <Mail className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notificationStats.email}</div>
              <p className="text-xs text-muted-foreground">Email sent</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">WhatsApp Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notificationStats.whatsapp}</div>
              <p className="text-xs text-muted-foreground">WhatsApp sent</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="test" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            Test
          </TabsTrigger>
        </TabsList>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Email Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  Email Notifications
                </CardTitle>
                <CardDescription>
                  Configure email notification settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-enabled">Enable Email Notifications</Label>
                  <Switch
                    id="email-enabled"
                    checked={settings?.emailNotifications?.enabled || false}
                    onCheckedChange={(checked) => 
                      handleSettingsUpdate({
                        emailNotifications: {
                          ...settings?.emailNotifications,
                          enabled: checked
                        }
                      })
                    }
                    disabled={updating}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-address">Email Address</Label>
                  <Input
                    id="email-address"
                    type="email"
                    value={settings?.emailNotifications?.email || ''}
                    onChange={(e) => 
                      handleSettingsUpdate({
                        emailNotifications: {
                          ...settings?.emailNotifications,
                          email: e.target.value
                        }
                      })
                    }
                    placeholder="admin@example.com"
                    disabled={updating}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Email Events</Label>
                  {[
                    { key: 'newBooking', label: 'New Booking' },
                    { key: 'offerAcceptance', label: 'Offer Acceptance' },
                    { key: 'paymentReceived', label: 'Payment Received' },
                    { key: 'reviewSubmitted', label: 'Review Submitted' }
                  ].map(event => (
                    <div key={event.key} className="flex items-center justify-between">
                      <Label htmlFor={`email-${event.key}`}>{event.label}</Label>
                      <Switch
                        id={`email-${event.key}`}
                        checked={settings?.emailNotifications?.events?.[event.key as keyof typeof settings.emailNotifications.events] || false}
                        onCheckedChange={(checked) => 
                          handleSettingsUpdate({
                            emailNotifications: {
                              ...settings?.emailNotifications,
                              events: {
                                ...settings?.emailNotifications?.events,
                                [event.key]: checked
                              }
                            }
                          })
                        }
                        disabled={updating}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  WhatsApp Notifications
                </CardTitle>
                <CardDescription>
                  Configure WhatsApp notification settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="whatsapp-enabled">Enable WhatsApp Notifications</Label>
                  <Switch
                    id="whatsapp-enabled"
                    checked={settings?.whatsappNotifications?.enabled || false}
                    onCheckedChange={(checked) => 
                      handleSettingsUpdate({
                        whatsappNotifications: {
                          ...settings?.whatsappNotifications,
                          enabled: checked
                        }
                      })
                    }
                    disabled={updating}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone-number">Phone Number</Label>
                  <Input
                    id="phone-number"
                    type="tel"
                    value={settings?.whatsappNotifications?.phoneNumber || ''}
                    onChange={(e) => 
                      handleSettingsUpdate({
                        whatsappNotifications: {
                          ...settings?.whatsappNotifications,
                          phoneNumber: e.target.value
                        }
                      })
                    }
                    placeholder="+1234567890"
                    disabled={updating}
                  />
                </div>

                <div className="space-y-3">
                  <Label>WhatsApp Events</Label>
                  {[
                    { key: 'newBooking', label: 'New Booking' },
                    { key: 'offerAcceptance', label: 'Offer Acceptance' },
                    { key: 'paymentReceived', label: 'Payment Received' }
                  ].map(event => (
                    <div key={event.key} className="flex items-center justify-between">
                      <Label htmlFor={`whatsapp-${event.key}`}>{event.label}</Label>
                      <Switch
                        id={`whatsapp-${event.key}`}
                        checked={settings?.whatsappNotifications?.events?.[event.key as keyof typeof settings.whatsappNotifications.events] || false}
                        onCheckedChange={(checked) => 
                          handleSettingsUpdate({
                            whatsappNotifications: {
                              ...settings?.whatsappNotifications,
                              events: {
                                ...settings?.whatsappNotifications?.events,
                                [event.key]: checked
                              }
                            }
                          })
                        }
                        disabled={updating}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-green-600" />
                Notification History
              </CardTitle>
              <CardDescription>
                View all sent notifications and their delivery status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {historyLoading ? (
                <NotificationHistorySkeleton />
              ) : historyError ? (
                <ErrorAlert 
                  message={historyError} 
                  onRetry={refetchHistory}
                  retryLabel="Retry Loading"
                />
              ) : history && history.length === 0 ? (
                <EmptyState
                  title="No notifications sent"
                  description="Notification history will appear here once you start sending notifications"
                  icon={<Bell className="h-12 w-12 text-muted-foreground" />}
                />
              ) : (
                <DataTable<NotificationHistory>
                  data={history || []}
                  columns={historyColumns}
                  searchKey="recipient"
                  filters={[
                    {
                      key: 'type',
                      label: 'Type',
                      options: [
                        { label: 'Email', value: 'email' },
                        { label: 'WhatsApp', value: 'whatsapp' }
                      ]
                    },
                    {
                      key: 'status',
                      label: 'Status',
                      options: [
                        { label: 'Sent', value: 'sent' },
                        { label: 'Failed', value: 'failed' },
                        { label: 'Pending', value: 'pending' }
                      ]
                    }
                  ]}
                  pagination={true}
                  pageSize={10}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Test Tab */}
        <TabsContent value="test" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Test Email */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  Test Email Notification
                </CardTitle>
                <CardDescription>
                  Send a test email to verify your email configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="test-email">Email Address</Label>
                  <Input
                    id="test-email"
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="test@example.com"
                  />
                </div>
                <Button 
                  onClick={() => handleTestNotification('email')}
                  disabled={testing || !testEmail}
                  className="w-full"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Test Email
                </Button>
              </CardContent>
            </Card>

            {/* Test WhatsApp */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  Test WhatsApp Notification
                </CardTitle>
                <CardDescription>
                  Send a test WhatsApp message to verify your configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="test-phone">Phone Number</Label>
                  <Input
                    id="test-phone"
                    type="tel"
                    value={testPhone}
                    onChange={(e) => setTestPhone(e.target.value)}
                    placeholder="+1234567890"
                  />
                </div>
                <Button 
                  onClick={() => handleTestNotification('whatsapp')}
                  disabled={testing || !testPhone}
                  className="w-full"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Test WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}