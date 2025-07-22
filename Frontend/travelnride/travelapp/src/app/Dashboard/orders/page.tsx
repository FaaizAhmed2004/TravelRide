"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTable } from "@/component/Admin/Data-table/Data-table"
import { ConfirmationModal } from "@/component/Admin/Form-modal/Form-modal"
import { OrderStatusBadge } from "@/component/Admin/Status-badges/Status-badges"
import { ErrorAlert, useToast } from "@/component/Admin/Error-alert/Error-alert"
import { LoadingState, EmptyState } from "@/component/Admin/Loading-skeletons/Loading-skeletons"
import { useApiData, useApiMutation } from "@/hooks/use-api-data"
import { OrderService } from "@/lib/api-service"
import type { Order } from "@/lib/types"
import { ShoppingCart, User, DollarSign, Calendar, TrendingUp, CreditCard, Eye, Edit } from "lucide-react"

export default function OrdersPage() {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const { showSuccess, showError } = useToast()
  
  // Fetch orders data
  const { data: orders, loading, error, refetch } = useApiData<Order[]>('/Admin/orders')
  
  // Mutations for operations
  const { mutate: updateOrderStatus, loading: updating } = useApiMutation<Order, { status: string }>()

  // Get order statistics
  const getOrderStats = () => {
    if (!orders || orders.length === 0) return null
    
    let totalRevenue = 0
    let pendingCount = 0
    let completedCount = 0
    let cancelledCount = 0
    
    orders.forEach(order => {
      totalRevenue += order.amount
      
      switch (order.status) {
        case 'pending':
          pendingCount++
          break
        case 'completed':
          completedCount++
          break
        case 'cancelled':
          cancelledCount++
          break
      }
    })
    
    const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0
    
    return {
      total: orders.length,
      totalRevenue,
      averageOrderValue,
      pending: pendingCount,
      completed: completedCount,
      cancelled: cancelledCount
    }
  }

  const orderStats = getOrderStats()

  // Table columns configuration
  const columns = [
    {
      key: 'userId',
      label: 'Customer',
      sortable: true,
      render: (user: any) => (
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <User className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <div className="font-medium">{user?.name || 'Unknown'}</div>
            <div className="text-sm text-muted-foreground">{user?.email || ''}</div>
          </div>
        </div>
      )
    },
    {
      key: '_id',
      label: 'Order ID',
      render: (value: string) => (
        <div className="font-mono text-sm">{value.slice(-8).toUpperCase()}</div>
      )
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-1 text-green-600" />
          <span className="font-medium">${value.toLocaleString()}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => <OrderStatusBadge status={value} />
    },
    {
      key: 'createdAt',
      label: 'Order Date',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{new Date(value).toLocaleDateString()}</span>
        </div>
      )
    },
    {
      key: 'updatedAt',
      label: 'Last Updated',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-muted-foreground">
          {new Date(value).toLocaleDateString()}
        </div>
      )
    }
  ]

  // Event handlers
  const handleView = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailsModalOpen(true)
  }

  const handleEdit = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailsModalOpen(true)
  }

  const handleStatusUpdate = async (newStatus: string) => {
    if (!selectedOrder) return
    
    try {
      await updateOrderStatus(`/Admin/orders/${selectedOrder._id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      })
      showSuccess('Order status updated successfully')
      refetch()
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus as any } : null)
    } catch (error) {
      showError('Failed to update order status')
    }
  }

  // Loading state
  if (loading) {
    return <LoadingState message="Loading orders..." />
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-600">Manage customer orders and payments</p>
          </div>
        </div>
        <ErrorAlert 
          message={error} 
          onRetry={refetch}
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
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage customer orders and payments</p>
        </div>
      </div>

      {/* Order Statistics */}
      {orderStats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orderStats.total}</div>
              <p className="text-xs text-muted-foreground">All time orders</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${orderStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">From all orders</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Order</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${orderStats.averageOrderValue.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground">Per order value</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Orders</CardTitle>
              <CreditCard className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orderStats.completed}</div>
              <p className="text-xs text-muted-foreground">
                {orderStats.total > 0 ? ((orderStats.completed / orderStats.total) * 100).toFixed(1) : 0}% completion rate
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-green-600" />
            All Orders
          </CardTitle>
          <CardDescription>
            Track and manage customer orders and payment processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orders && orders.length === 0 ? (
            <EmptyState
              title="No orders found"
              description="Customer orders will appear here once they start making purchases"
              icon={<ShoppingCart className="h-12 w-12 text-muted-foreground" />}
            />
          ) : (
            <DataTable<Order>
              data={orders || []}
              columns={columns}
              searchKey="userId"
              onEdit={handleEdit}
              onView={handleView}
              filters={[
                {
                  key: 'status',
                  label: 'Status',
                  options: [
                    { label: 'Pending', value: 'pending' },
                    { label: 'Completed', value: 'completed' },
                    { label: 'Cancelled', value: 'cancelled' }
                  ]
                }
              ]}
              pagination={true}
              pageSize={10}
            />
          )}
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              View and manage order information
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Header */}
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div>
                  <div className="font-medium">Order #{selectedOrder._id.slice(-8).toUpperCase()}</div>
                  <div className="text-sm text-muted-foreground">
                    Created on {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${selectedOrder.amount.toLocaleString()}</div>
                  <OrderStatusBadge status={selectedOrder.status} />
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">Customer Information</h4>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">{selectedOrder.userId?.name || 'Unknown Customer'}</div>
                    <div className="text-sm text-muted-foreground">{selectedOrder.userId?.email || 'No email'}</div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">Payment Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-sm font-medium">Amount</span>
                    </div>
                    <div className="text-lg font-bold mt-1">${selectedOrder.amount.toLocaleString()}</div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-sm font-medium">Payment Status</span>
                    </div>
                    <div className="mt-1">
                      <OrderStatusBadge status={selectedOrder.status} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Management */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">Order Status</h4>
                <div className="flex items-center space-x-4">
                  <OrderStatusBadge status={selectedOrder.status} />
                  <Select
                    value={selectedOrder.status}
                    onValueChange={handleStatusUpdate}
                    disabled={updating}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Timestamps */}
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <span className="font-medium">Created:</span> {new Date(selectedOrder.createdAt).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Updated:</span> {new Date(selectedOrder.updatedAt).toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}