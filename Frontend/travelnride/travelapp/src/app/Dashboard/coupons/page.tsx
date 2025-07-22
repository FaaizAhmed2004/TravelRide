"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/component/Admin/Data-table/Data-table"
import { FormModal, ConfirmationModal } from "@/component/Admin/Form-modal/Form-modal"
import { CouponExpiryBadge } from "@/component/Admin/Status-badges/Status-badges"
import { ErrorAlert, useToast } from "@/component/Admin/Error-alert/Error-alert"
import { LoadingState, EmptyState } from "@/component/Admin/Loading-skeletons/Loading-skeletons"
import { useApiData, useApiMutation } from "@/hooks/use-api-data"
import { CouponService } from "@/lib/api-service"
import type { Coupon, CouponFormData } from "@/lib/types"
import { Ticket, Plus, Percent, Calendar, Code, TrendingUp } from "lucide-react"

export default function CouponsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)

  const { showSuccess, showError } = useToast()
  
  // Fetch coupons data
  const { data: coupons, loading, error, refetch } = useApiData<Coupon[]>('/Admin/coupons')
  
  // Mutations for CRUD operations
  const { mutate: createCoupon, loading: creating } = useApiMutation<Coupon, CouponFormData>()
  const { mutate: updateCoupon, loading: updating } = useApiMutation<Coupon, Partial<CouponFormData>>()
  const { mutate: deleteCoupon, loading: deleting } = useApiMutation<void, string>()

  // Form fields configuration
  const formFields = [
    {
      name: 'code',
      label: 'Coupon Code',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter coupon code (e.g., SAVE20)',
      validation: (value: any) => {
        if (value && value.length < 3) return 'Coupon code must be at least 3 characters'
        if (value && !/^[A-Z0-9]+$/.test(value)) return 'Coupon code must contain only uppercase letters and numbers'
        return null
      }
    },
    {
      name: 'discount',
      label: 'Discount Percentage',
      type: 'number' as const,
      required: true,
      placeholder: 'Enter discount percentage',
      validation: (value: any) => {
        const num = Number(value)
        if (num <= 0 || num > 100) return 'Discount must be between 1 and 100'
        return null
      }
    },
    {
      name: 'expiryDate',
      label: 'Expiry Date',
      type: 'date' as const,
      required: true,
      validation: (value: any) => {
        const selectedDate = new Date(value)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (selectedDate <= today) return 'Expiry date must be in the future'
        return null
      }
    }
  ]

  // Get coupon statistics
  const getCouponStats = () => {
    if (!coupons || coupons.length === 0) return null
    
    const now = new Date()
    let activeCount = 0
    let expiredCount = 0
    let expiringSoonCount = 0
    
    coupons.forEach(coupon => {
      const expiryDate = new Date(coupon.expiryDate)
      const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      
      if (daysUntilExpiry < 0) {
        expiredCount++
      } else if (daysUntilExpiry <= 7) {
        expiringSoonCount++
      } else {
        activeCount++
      }
    })
    
    return {
      total: coupons.length,
      active: activeCount,
      expired: expiredCount,
      expiringSoon: expiringSoonCount
    }
  }

  const couponStats = getCouponStats()

  // Table columns configuration
  const columns = [
    {
      key: 'code',
      label: 'Coupon Code',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <Code className="h-4 w-4 text-green-600" />
          <span className="font-mono font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'discount',
      label: 'Discount',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <Percent className="h-4 w-4 mr-1 text-green-600" />
          <span className="font-medium">{value}%</span>
        </div>
      )
    },
    {
      key: 'expiryDate',
      label: 'Status',
      sortable: true,
      render: (value: string) => <CouponExpiryBadge expiryDate={value} />
    },
    {
      key: 'expiryDate',
      label: 'Expires',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{new Date(value).toLocaleDateString()}</span>
        </div>
      )
    },
    {
      key: 'usageCount',
      label: 'Usage',
      render: (value: number = 0) => (
        <div className="flex items-center">
          <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
          <span>{value} times</span>
        </div>
      )
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    }
  ]

  // Event handlers
  const handleCreate = async (data: Record<string, any>) => {
    try {
      // Transform the form data
      const couponData: CouponFormData = {
        code: data.code.toUpperCase(),
        discount: Number(data.discount),
        expiryDate: data.expiryDate
      }

      await createCoupon('/Admin/coupons', {
        method: 'POST',
        body: JSON.stringify(couponData)
      })
      showSuccess('Coupon created successfully')
      refetch()
      setIsCreateModalOpen(false)
    } catch (error) {
      showError('Failed to create coupon')
      throw error
    }
  }

  const handleEdit = (coupon: Coupon) => {
    setSelectedCoupon(coupon)
    setIsEditModalOpen(true)
  }

  const handleUpdate = async (data: Record<string, any>) => {
    if (!selectedCoupon) return
    
    try {
      const couponData: Partial<CouponFormData> = {
        code: data.code.toUpperCase(),
        discount: Number(data.discount),
        expiryDate: data.expiryDate
      }

      await updateCoupon(`/Admin/coupons/${selectedCoupon._id}`, {
        method: 'PUT',
        body: JSON.stringify(couponData)
      })
      showSuccess('Coupon updated successfully')
      refetch()
      setIsEditModalOpen(false)
      setSelectedCoupon(null)
    } catch (error) {
      showError('Failed to update coupon')
      throw error
    }
  }

  const handleDelete = (coupon: Coupon) => {
    setSelectedCoupon(coupon)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedCoupon) return
    
    try {
      await deleteCoupon(`/Admin/coupons/${selectedCoupon._id}`, {
        method: 'DELETE'
      })
      showSuccess('Coupon deleted successfully')
      refetch()
      setIsDeleteModalOpen(false)
      setSelectedCoupon(null)
    } catch (error) {
      showError('Failed to delete coupon')
    }
  }

  const handleView = (coupon: Coupon) => {
    // For now, just show coupon details in console
    console.log('View coupon:', coupon)
    showSuccess(`Viewing details for coupon ${coupon.code}`)
  }

  // Prepare initial data for edit form
  const getInitialEditData = (coupon: Coupon) => ({
    code: coupon.code,
    discount: coupon.discount,
    expiryDate: new Date(coupon.expiryDate).toISOString().split('T')[0]
  })

  // Loading state
  if (loading) {
    return <LoadingState message="Loading coupons..." />
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Coupons</h1>
            <p className="text-gray-600">Manage discount coupons and promotional codes</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Coupons</h1>
          <p className="text-gray-600">Manage discount coupons and promotional codes</p>
        </div>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Coupon
        </Button>
      </div>

      {/* Coupon Statistics */}
      {couponStats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Coupons</CardTitle>
              <Ticket className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{couponStats.total}</div>
              <p className="text-xs text-muted-foreground">All coupons created</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Coupons</CardTitle>
              <Ticket className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{couponStats.active}</div>
              <p className="text-xs text-muted-foreground">Currently valid</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Expiring Soon</CardTitle>
              <Calendar className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{couponStats.expiringSoon}</div>
              <p className="text-xs text-muted-foreground">Within 7 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Expired</CardTitle>
              <Calendar className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{couponStats.expired}</div>
              <p className="text-xs text-muted-foreground">No longer valid</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Coupons Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5 text-green-600" />
            All Coupons
          </CardTitle>
          <CardDescription>
            Create and manage discount coupons for your customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {coupons && coupons.length === 0 ? (
            <EmptyState
              title="No coupons found"
              description="Get started by creating discount coupons for your customers"
              action={{
                label: "Add Coupon",
                onClick: () => setIsCreateModalOpen(true)
              }}
              icon={<Ticket className="h-12 w-12 text-muted-foreground" />}
            />
          ) : (
            <DataTable<Coupon>
              data={coupons || []}
              columns={columns}
              searchKey="code"
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              filters={[
                {
                  key: 'discount',
                  label: 'Discount',
                  options: [
                    { label: '10%', value: '10' },
                    { label: '20%', value: '20' },
                    { label: '30%', value: '30' },
                    { label: '50%', value: '50' }
                  ]
                }
              ]}
              pagination={true}
              pageSize={10}
            />
          )}
        </CardContent>
      </Card>

      {/* Create Coupon Modal */}
      <FormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Coupon"
        description="Add a new discount coupon for customers"
        fields={formFields}
        onSubmit={handleCreate}
        submitLabel="Create Coupon"
        isLoading={creating}
      />

      {/* Edit Coupon Modal */}
      <FormModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedCoupon(null)
        }}
        title="Edit Coupon"
        description="Update coupon details"
        fields={formFields}
        onSubmit={handleUpdate}
        initialData={selectedCoupon ? getInitialEditData(selectedCoupon) : {}}
        submitLabel="Update Coupon"
        isLoading={updating}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedCoupon(null)
        }}
        onConfirm={confirmDelete}
        title="Delete Coupon"
        description={`Are you sure you want to delete coupon "${selectedCoupon?.code}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        isLoading={deleting}
      />
    </div>
  )
}