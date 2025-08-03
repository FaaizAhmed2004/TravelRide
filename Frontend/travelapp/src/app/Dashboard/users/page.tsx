"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DataTable } from "@/component/Admin/Data-table/Data-table"
import { FormModal, ConfirmationModal } from "@/component/Admin/Form-modal/Form-modal"
import { UserRoleBadge, UserStatusBadge } from "@/component/Admin/Status-badges/Status-badges"
import { ErrorAlert, useToast } from "@/component/Admin/Error-alert/Error-alert"
import { LoadingState, EmptyState } from "@/component/Admin/Loading-skeletons/Loading-skeletons"
import { useApiData, useApiMutation } from "@/hooks/use-api-data"
import type { AdminUser, UserFormData } from "@/lib/types"
import { Users, UserPlus, User, Mail, Phone, Calendar, DollarSign, ShoppingCart } from "lucide-react"
import type { Column } from "@/component/Admin/Data-table/Data-table"

export default function UsersPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)

  const { showSuccess, showError } = useToast()

  // Fetch users data
  const { data: users, loading, error, refetch } = useApiData<AdminUser[]>('/Admin/users')

  // Mutations for CRUD operations
  const { mutate: createUser, loading: creating } = useApiMutation<AdminUser>()
  const { mutate: updateUser, loading: updating } = useApiMutation<AdminUser>()
  const { mutate: deleteUser, loading: deleting } = useApiMutation<void>()

  // Form fields configuration
  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter full name'
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email' as const,
      required: true,
      placeholder: 'Enter email address'
    },
    {
      name: 'phoneNumber.internationalNumber',
      label: 'Phone Number',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter phone number'
    },
    {
      name: 'timezone',
      label: 'Timezone',
      type: 'select' as const,
      required: true,
      options: [
        { label: 'UTC', value: 'UTC' },
        { label: 'America/New_York', value: 'America/New_York' },
        { label: 'America/Los_Angeles', value: 'America/Los_Angeles' },
        { label: 'Europe/London', value: 'Europe/London' },
        { label: 'Asia/Tokyo', value: 'Asia/Tokyo' },
        { label: 'Australia/Sydney', value: 'Australia/Sydney' }
      ]
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select' as const,
      required: true,
      options: [
        { label: 'User', value: 'USER' },
        { label: 'Admin', value: 'ADMIN' }
      ]
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password' as const,
      required: true,
      placeholder: 'Enter password (min 8 characters)',
      validation: (value: unknown) => {
        if (typeof value === 'string' && value.length < 8) return 'Password must be at least 8 characters'
        return null
      }
    }
  ]

  // Table columns configuration
  const columns: Column<AdminUser>[] = [
    {
      key: 'name',
      label: 'User',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <User className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <div className="font-medium">{String(value)}</div>
            <div className="text-sm text-muted-foreground">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (value) => <UserRoleBadge role={String(value)} />
    },
    {
      key: 'accountConfimation',
      label: 'Status',
      sortable: true,
      render: (value) => {
        const status = typeof value === 'object' && value !== null && 'status' in value && Boolean(value.status);
        return <UserStatusBadge status={status ? 'active' : 'inactive'} />;
      }
    },
    {
      key: 'totalBookings',
      label: 'Bookings',
      render: (value) => (
        <div className="flex items-center">
          <ShoppingCart className="h-4 w-4 mr-1 text-green-600" />
          <span>{typeof value === 'number' ? value : 0}</span>
        </div>
      )
    },
    {
      key: 'totalSpent',
      label: 'Total Spent',
      render: (value) => (
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-1 text-green-600" />
          <span className="font-medium">${typeof value === 'number' ? value.toLocaleString() : '0'}</span>
        </div>
      )
    },
    {
      key: 'lastLoginAt',
      label: 'Last Login',
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{value ? new Date(String(value)).toLocaleDateString() : 'Never'}</span>
        </div>
      )
    },
    {
      key: 'createdAt',
      label: 'Joined',
      sortable: true,
      render: (value) => new Date(String(value)).toLocaleDateString()
    }
  ]

  // Event handlers
  const handleCreate = async (data: Record<string, unknown>) => {
    try {
      // Transform the form data to match the expected structure
      const userData: UserFormData = {
        name: typeof data.name === 'string' ? data.name : '',
        email: typeof data.email === 'string' ? data.email : '',
        phoneNumber: {
          isoCode: 'US',
          countryCode: '+1',
          internationalNumber: typeof data['phoneNumber.internationalNumber'] === 'string'
            ? data['phoneNumber.internationalNumber']
            : ''
        },
        timezone: typeof data.timezone === 'string' ? data.timezone : 'UTC',
        password: typeof data.password === 'string' ? data.password : undefined,
        role: typeof data.role === 'string' && (data.role === 'USER' || data.role === 'ADMIN')
          ? data.role
          : 'USER',
        consent: true
      }

      await createUser('/user', {
        method: 'POST',
        body: JSON.stringify(userData)
      })
      showSuccess('User created successfully')
      refetch()
      setIsCreateModalOpen(false)
    } catch (error) {
      showError('Failed to create user')
      throw error
    }
  }

  const handleEdit = (user: AdminUser) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  const handleUpdate = async (data: Record<string, unknown>) => {
    if (!selectedUser) return

    try {
      const userData: Partial<UserFormData> = {
        name: typeof data.name === 'string' ? data.name : undefined,
        email: typeof data.email === 'string' ? data.email : undefined,
        phoneNumber: {
          isoCode: 'PAK',
          countryCode: '+92',
          internationalNumber: typeof data['phoneNumber.internationalNumber'] === 'string'
            ? data['phoneNumber.internationalNumber']
            : ''
        },
        timezone: typeof data.timezone === 'string' ? data.timezone : undefined,
        role: typeof data.role === 'string' && (data.role === 'USER' || data.role === 'ADMIN')
          ? data.role
          : undefined
      }

      // Only include password if it's provided
      if (typeof data.password === 'string' && data.password.length > 0) {
        userData.password = data.password
      }

      await updateUser(`/user/${selectedUser._id}`, {
        method: 'PUT',
        body: JSON.stringify(userData)
      })
      showSuccess('User updated successfully')
      refetch()
      setIsEditModalOpen(false)
      setSelectedUser(null)
    } catch (error) {
      showError('Failed to update user')
      throw error
    }
  }

  const handleDelete = (user: AdminUser) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedUser) return

    try {
      await deleteUser(`/user/${selectedUser._id}`, {
        method: 'DELETE'
      })
      showSuccess('User deleted successfully')
      refetch()
      setIsDeleteModalOpen(false)
      setSelectedUser(null)
    } catch {
      showError('Failed to delete user')
    }
  }

  const handleView = (user: AdminUser) => {
    setSelectedUser(user)
    setIsDetailsModalOpen(true)
  }

  // Prepare initial data for edit form
  const getInitialEditData = (user: AdminUser) => ({
    name: user.name,
    email: user.email,
    'phoneNumber.internationalNumber': user.phoneNumber?.internationalNumber || '',
    timezone: user.timezone,
    role: user.role,
    password: '' // Don't pre-fill password
  })

  // Loading state
  if (loading) {
    return <LoadingState message="Loading users..." />
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-600">Manage customer accounts and administrators</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage customer accounts and administrators</p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            All Users
          </CardTitle>
          <CardDescription>
            Manage user accounts, roles, and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {users && users.length === 0 ? (
            <EmptyState
              title="No users found"
              description="Get started by creating user accounts"
              action={{
                label: "Add User",
                onClick: () => setIsCreateModalOpen(true)
              }}
              icon={<Users className="h-12 w-12 text-muted-foreground" />}
            />
          ) : (
            <DataTable<AdminUser>
              data={users || []}
              columns={columns}
              searchKey="name"
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              filters={[
                {
                  key: 'role',
                  label: 'Role',
                  options: [
                    { label: 'User', value: 'USER' },
                    { label: 'Admin', value: 'ADMIN' }
                  ]
                }
              ]}
              pagination={true}
              pageSize={10}
            />
          )}
        </CardContent>
      </Card>

      {/* Create User Modal */}
      <FormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New User"
        description="Add a new user account to the system"
        fields={formFields}
        onSubmit={handleCreate}
        submitLabel="Create User"
        isLoading={creating}
      />

      {/* Edit User Modal */}
      <FormModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedUser(null)
        }}
        title="Edit User"
        description="Update user account details"
        fields={formFields.map(field =>
          field.name === 'password'
            ? { ...field, required: false, placeholder: 'Leave blank to keep current password' }
            : field
        )}
        onSubmit={handleUpdate}
        initialData={selectedUser ? getInitialEditData(selectedUser) : {}}
        submitLabel="Update User"
        isLoading={updating}
      />

      {/* User Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View detailed user information and activity
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Personal Information</h4>
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">{selectedUser.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {selectedUser.email}
                      </div>
                      {selectedUser.phoneNumber?.internationalNumber && (
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {selectedUser.phoneNumber.internationalNumber}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Account Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Role:</span>
                      <UserRoleBadge role={selectedUser.role} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Status:</span>
                      <UserStatusBadge status={selectedUser.accountConfimation?.status ? 'active' : 'inactive'} />
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Timezone:</span> {selectedUser.timezone}
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Statistics */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">Activity Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">{selectedUser.totalBookings || 0}</div>
                        <div className="text-sm text-muted-foreground">Total Bookings</div>
                      </div>
                      <ShoppingCart className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">${(selectedUser.totalSpent || 0).toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total Spent</div>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <span className="font-medium">Joined:</span> {new Date(selectedUser.createdAt).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Last Login:</span> {selectedUser.lastLoginAt ? new Date(selectedUser.lastLoginAt).toLocaleString() : 'Never'}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedUser(null)
        }}
        onConfirm={confirmDelete}
        title="Delete User"
        description={`Are you sure you want to delete "${selectedUser?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        isLoading={deleting}
      />
    </div>
  )
}