"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DataTable } from "@/component/Admin/Data-table/Data-table"
import { FormModal, ConfirmationModal } from "@/component/Admin/Form-modal/Form-modal"
import { OfferStatusBadge } from "@/component/Admin/Status-badges/Status-badges"
import { ErrorAlert, useToast } from "@/component/Admin/Error-alert/Error-alert"
import { LoadingState, EmptyState } from "@/component/Admin/Loading-skeletons/Loading-skeletons"
import { useApiData, useApiMutation } from "@/hooks/use-api-data"
import type { Offer, OfferFormData, Tour } from "@/lib/types"
import { Gift, Plus, Percent, Calendar, TrendingUp, Users, DollarSign } from "lucide-react"

export default function OffersPage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false)
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)

    const { showSuccess, showError } = useToast()

    // Fetch offers and tours data
    const { data: offers, loading, error, refetch } = useApiData<Offer[]>('/offers')
    const { data: tours } = useApiData<Tour[]>('/Packages')

    // Mutations for CRUD operations
    const { mutate: createOffer, loading: creating } = useApiMutation<Offer>()
    const { mutate: updateOffer, loading: updating } = useApiMutation<Offer>()
    const { mutate: deleteOffer, loading: deleting } = useApiMutation<void>()

    // Form fields configuration
    const formFields = [
        {
            name: 'title',
            label: 'Offer Title',
            type: 'text' as const,
            required: true,
            placeholder: 'Enter offer title'
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea' as const,
            required: true,
            placeholder: 'Enter offer description'
        },
        {
            name: 'discountPercentage',
            label: 'Discount Percentage',
            type: 'number' as const,
            required: true,
            placeholder: 'Enter discount percentage',
            validation: (value: unknown) => {
                const num = Number(value)
                if (num <= 0 || num > 100) return 'Discount must be between 1 and 100'
                return null
            }
        },
        {
            name: 'validFrom',
            label: 'Valid From',
            type: 'date' as const,
            required: true,
            defaultValue: new Date().toISOString().split('T')[0]
        },
        {
            name: 'validUntil',
            label: 'Valid Until',
            type: 'date' as const,
            required: true,
            validation: (value: unknown, formData?: Record<string, unknown>) => {
                const validFrom = new Date(formData?.validFrom as string || new Date())
                const validUntil = new Date(value as string)
                if (validUntil <= validFrom) return 'Valid until date must be after valid from date'
                return null
            }
        },
        {
            name: 'applicableTours',
            label: 'Applicable Tours',
            type: 'select' as const,
            required: true,
            options: tours?.map(tour => ({
                label: tour.title,
                value: tour._id
            })) || []
        }
    ]

    // Get offer statistics
    const getOfferStats = () => {
        if (!offers || offers.length === 0) return null

        const now = new Date()
        let activeCount = 0
        let draftCount = 0
        let expiredCount = 0
        let totalAcceptances = 0
        let totalRevenue = 0

        offers.forEach(offer => {
            const validFrom = new Date(offer.validFrom)
            const validUntil = new Date(offer.validUntil)

            switch (offer.status) {
                case 'active':
                    if (now >= validFrom && now <= validUntil) {
                        activeCount++
                    } else if (now > validUntil) {
                        expiredCount++
                    }
                    break
                case 'draft':
                    draftCount++
                    break
                case 'expired':
                    expiredCount++
                    break
            }

            totalAcceptances += offer.acceptanceCount || 0
            totalRevenue += offer.revenueImpact || 0
        })

        return {
            total: offers.length,
            active: activeCount,
            draft: draftCount,
            expired: expiredCount,
            totalAcceptances,
            totalRevenue
        }
    }

    const offerStats = getOfferStats()

    // Table columns configuration
    const columns = [
        {
            key: 'title',
            label: 'Offer',
            sortable: true,
            render: (value: string, row: Offer) => (
                <div>
                    <div className="font-medium">{value}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{row.description}</div>
                </div>
            )
        },
        {
            key: 'discountPercentage',
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
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (value: string) => <OfferStatusBadge status={value} />
        },
        {
            key: 'validFrom',
            label: 'Valid Period',
            render: (validFrom: string, row: Offer) => (
                <div className="text-sm">
                    <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{new Date(validFrom).toLocaleDateString()}</span>
                    </div>
                    <div className="text-muted-foreground">
                        to {new Date(row.validUntil).toLocaleDateString()}
                    </div>
                </div>
            )
        },
        {
            key: 'acceptanceCount',
            label: 'Acceptances',
            sortable: true,
            render: (value: number = 0) => (
                <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-green-600" />
                    <span>{value}</span>
                </div>
            )
        },
        {
            key: 'bookingsGenerated',
            label: 'Bookings',
            sortable: true,
            render: (value: number = 0) => (
                <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                    <span>{value}</span>
                </div>
            )
        },
        {
            key: 'revenueImpact',
            label: 'Revenue',
            render: (value: number = 0) => (
                <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                    <span className="font-medium">${value.toLocaleString()}</span>
                </div>
            )
        }
    ]

    // Event handlers
    const handleCreate = async (data: Record<string, unknown>) => {
        try {
            const offerData: OfferFormData = {
                title: data.title,
                description: data.description,
                discountPercentage: Number(data.discountPercentage),
                validFrom: data.validFrom,
                validUntil: data.validUntil,
                applicableTours: Array.isArray(data.applicableTours) ? data.applicableTours : [data.applicableTours]
            }

            await createOffer('/offers', {
                method: 'POST',
                body: JSON.stringify(offerData)
            })
            showSuccess('Offer created successfully')
            refetch()
            setIsCreateModalOpen(false)
        } catch (err) {
            showError('Failed to create offer')
            throw err
        }
    }

    const handleEdit = (offer: Offer) => {
        setSelectedOffer(offer)
        setIsEditModalOpen(true)
    }

    const handleUpdate = async (data: Record<string, unknown>) => {
        if (!selectedOffer) return

        try {
            const offerData: Partial<OfferFormData> = {
                title: data.title,
                description: data.description,
                discountPercentage: Number(data.discountPercentage),
                validFrom: data.validFrom,
                validUntil: data.validUntil,
                applicableTours: Array.isArray(data.applicableTours) ? data.applicableTours : [data.applicableTours]
            }

            await updateOffer(`/offers/${selectedOffer._id}`, {
                method: 'PUT',
                body: JSON.stringify(offerData)
            })
            showSuccess('Offer updated successfully')
            refetch()
            setIsEditModalOpen(false)
            setSelectedOffer(null)
        } catch (err) {
            showError('Failed to update offer')
            throw err
        }
    }

    const handleDelete = (offer: Offer) => {
        setSelectedOffer(offer)
        setIsDeleteModalOpen(true)
    }

    const confirmDelete = async () => {
        if (!selectedOffer) return

        try {
            await deleteOffer(`/offers/${selectedOffer._id}`, {
                method: 'DELETE'
            })
            showSuccess('Offer deleted successfully')
            refetch()
            setIsDeleteModalOpen(false)
            setSelectedOffer(null)
        } catch (err) {
            showError('Failed to delete offer')
        }
    }

    const handleViewAnalytics = (offer: Offer) => {
        setSelectedOffer(offer)
        setIsAnalyticsModalOpen(true)
    }

    // Prepare initial data for edit form
    const getInitialEditData = (offer: Offer) => ({
        title: offer.title,
        description: offer.description,
        discountPercentage: offer.discountPercentage,
        validFrom: new Date(offer.validFrom).toISOString().split('T')[0],
        validUntil: new Date(offer.validUntil).toISOString().split('T')[0],
        applicableTours: offer.applicableTours[0] // For simplicity, taking first tour
    })

    // Loading state
    if (loading) {
        return <LoadingState message="Loading offers..." />
    }

    // Error state
    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Offers</h1>
                        <p className="text-gray-600">Manage special offers and promotional deals</p>
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
                    <h1 className="text-3xl font-bold text-gray-900">Offers</h1>
                    <p className="text-gray-600">Manage special offers and promotional deals</p>
                </div>
                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Offer
                </Button>
            </div>

            {/* Offer Statistics */}
            {offerStats && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Active Offers</CardTitle>
                            <Gift className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{offerStats.active}</div>
                            <p className="text-xs text-muted-foreground">Currently running</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Acceptances</CardTitle>
                            <Users className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{offerStats.totalAcceptances}</div>
                            <p className="text-xs text-muted-foreground">Users accepted offers</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue Impact</CardTitle>
                            <DollarSign className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${offerStats.totalRevenue.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">Generated revenue</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Draft Offers</CardTitle>
                            <Gift className="h-4 w-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{offerStats.draft}</div>
                            <p className="text-xs text-muted-foreground">Pending activation</p>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Offers Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Gift className="h-5 w-5 text-green-600" />
                        All Offers
                    </CardTitle>
                    <CardDescription>
                        Create and manage special offers that users can accept and book
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {offers && offers.length === 0 ? (
                        <EmptyState
                            title="No offers found"
                            description="Get started by creating special offers for your customers"
                            action={{
                                label: "Create Offer",
                                onClick: () => setIsCreateModalOpen(true)
                            }}
                            icon={<Gift className="h-12 w-12 text-muted-foreground" />}
                        />
                    ) : (
                        <DataTable<Offer>
                            data={offers || []}
                            columns={columns}
                            searchKey="title"
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onView={handleViewAnalytics}
                            filters={[
                                {
                                    key: 'status',
                                    label: 'Status',
                                    options: [
                                        { label: 'Active', value: 'active' },
                                        { label: 'Draft', value: 'draft' },
                                        { label: 'Expired', value: 'expired' },
                                        { label: 'Deactivated', value: 'deactivated' }
                                    ]
                                }
                            ]}
                            pagination={true}
                            pageSize={10}
                        />
                    )}
                </CardContent>
            </Card>

            {/* Create Offer Modal */}
            <FormModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create New Offer"
                description="Create a special offer that users can accept and book"
                fields={formFields}
                onSubmit={handleCreate}
                submitLabel="Create Offer"
                isLoading={creating}
            />

            {/* Edit Offer Modal */}
            <FormModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false)
                    setSelectedOffer(null)
                }}
                title="Edit Offer"
                description="Update offer details"
                fields={formFields}
                onSubmit={handleUpdate}
                initialData={selectedOffer ? getInitialEditData(selectedOffer) : {}}
                submitLabel="Update Offer"
                isLoading={updating}
            />

            {/* Analytics Modal */}
            <Dialog open={isAnalyticsModalOpen} onOpenChange={setIsAnalyticsModalOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Offer Analytics</DialogTitle>
                        <DialogDescription>
                            Performance metrics for &ldquo;{selectedOffer?.title}&rdquo;
                        </DialogDescription>
                    </DialogHeader>

                    {selectedOffer && (
                        <div className="space-y-6">
                            {/* Key Metrics */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-2xl font-bold">{selectedOffer.acceptanceCount || 0}</div>
                                            <div className="text-sm text-muted-foreground">Total Acceptances</div>
                                        </div>
                                        <Users className="h-8 w-8 text-green-600" />
                                    </div>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-2xl font-bold">{selectedOffer.bookingsGenerated || 0}</div>
                                            <div className="text-sm text-muted-foreground">Bookings Generated</div>
                                        </div>
                                        <TrendingUp className="h-8 w-8 text-green-600" />
                                    </div>
                                </div>
                            </div>

                            {/* Conversion Rate */}
                            <div className="p-4 border rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-2xl font-bold">
                                            {selectedOffer.acceptanceCount > 0
                                                ? ((selectedOffer.bookingsGenerated || 0) / selectedOffer.acceptanceCount * 100).toFixed(1)
                                                : 0}%
                                        </div>
                                        <div className="text-sm text-muted-foreground">Conversion Rate</div>
                                    </div>
                                    <Percent className="h-8 w-8 text-green-600" />
                                </div>
                            </div>

                            {/* Revenue Impact */}
                            <div className="p-4 border rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-2xl font-bold">${(selectedOffer.revenueImpact || 0).toLocaleString()}</div>
                                        <div className="text-sm text-muted-foreground">Revenue Generated</div>
                                    </div>
                                    <DollarSign className="h-8 w-8 text-green-600" />
                                </div>
                            </div>

                            {/* Offer Details */}
                            <div className="space-y-2">
                                <h4 className="font-medium text-sm text-muted-foreground">Offer Details</h4>
                                <div className="text-sm space-y-1">
                                    <div><span className="font-medium">Discount:</span> {selectedOffer.discountPercentage}%</div>
                                    <div><span className="font-medium">Valid From:</span> {new Date(selectedOffer.validFrom).toLocaleDateString()}</div>
                                    <div><span className="font-medium">Valid Until:</span> {new Date(selectedOffer.validUntil).toLocaleDateString()}</div>
                                    <div><span className="font-medium">Status:</span> <OfferStatusBadge status={selectedOffer.status} /></div>
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
                    setSelectedOffer(null)
                }}
                onConfirm={confirmDelete}
                title="Delete Offer"
                description={`Are you sure you want to delete &ldquo;${selectedOffer?.title}&rdquo;? This action cannot be undone.`}
                confirmLabel="Delete"
                variant="destructive"
                isLoading={deleting}
            />
        </div>
    )
}