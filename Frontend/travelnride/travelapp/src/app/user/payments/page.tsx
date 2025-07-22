"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CreditCard, 
  Plus,
  Trash2,
  Shield,
  Calendar,
  DollarSign,
  Receipt
} from "lucide-react"

export default function UserPayments() {
  const [paymentMethods] = useState([
    {
      id: "1",
      type: "visa",
      last4: "4242",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
      holderName: "John Doe"
    },
    {
      id: "2", 
      type: "mastercard",
      last4: "8888",
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false,
      holderName: "John Doe"
    }
  ])

  const recentTransactions = [
    {
      id: "1",
      description: "Bali Paradise Package",
      amount: 1299,
      date: "2024-07-15",
      status: "completed",
      method: "•••• 4242"
    },
    {
      id: "2",
      description: "Tokyo Cultural Tour",
      amount: 1899,
      date: "2024-07-10",
      status: "completed",
      method: "•••• 8888"
    },
    {
      id: "3",
      description: "Paris Romantic Getaway",
      amount: 899,
      date: "2024-06-01",
      status: "completed",
      method: "•••• 4242"
    }
  ]

  const getCardIcon = (type: string) => {
    return <CreditCard className="h-6 w-6" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Methods</h1>
          <p className="text-gray-600">Manage your payment methods and view transaction history</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-green-600" />
            Saved Payment Methods
          </CardTitle>
          <CardDescription>Your saved cards and payment options</CardDescription>
        </CardHeader>
        <CardContent>
          {paymentMethods.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No payment methods</h3>
              <p className="text-gray-600 mb-4">Add a payment method to make booking easier</p>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {paymentMethods.map((method) => (
                <div key={method.id} className="border rounded-lg p-4 relative">
                  {method.isDefault && (
                    <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                      Default
                    </Badge>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getCardIcon(method.type)}
                      <div>
                        <p className="font-medium capitalize">{method.type}</p>
                        <p className="text-sm text-gray-600">•••• •••• •••• {method.last4}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cardholder:</span>
                      <span>{method.holderName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expires:</span>
                      <span>{method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Security & Protection
          </CardTitle>
          <CardDescription>Your payment security information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <Shield className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-medium">SSL Encryption</h4>
                <p className="text-sm text-gray-600">All payment data is encrypted using industry-standard SSL technology</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <CreditCard className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-medium">PCI Compliant</h4>
                <p className="text-sm text-gray-600">We follow PCI DSS standards for secure payment processing</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-green-600" />
            Recent Transactions
          </CardTitle>
          <CardDescription>Your recent payment history</CardDescription>
        </CardHeader>
        <CardContent>
          {recentTransactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No transactions found
            </div>
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${transaction.amount}</p>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                      <span className="text-xs text-gray-500">{transaction.method}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Manage your billing details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Billing Address</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>123 Main Street</p>
                  <p>New York, NY 10001</p>
                  <p>United States</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Contact Information</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>john.doe@example.com</p>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
            <Button variant="outline">
              Update Billing Information
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}