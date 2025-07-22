"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN'
  avatar?: string
  phoneNumber?: {
    isoCode: string
    countryCode: string
    internationalNumber: string
  }
  accountConfirmation?: {
    status: boolean
  }
  lastLoginAt?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (userData: RegisterData) => Promise<void>
  updateUser: (userData: Partial<User>) => void
}

interface RegisterData {
  name: string
  email: string
  password: string
  phoneNumber?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (token) {
        // In a real app, you would validate the token with your backend
        // For now, we'll use mock data based on the stored role
        const userRole = localStorage.getItem('user_role') || 'USER'
        
        if (userRole === 'ADMIN') {
          const adminUser: User = {
            id: '1',
            name: 'Admin User',
            email: 'admin@travelnride.com',
            role: 'ADMIN',
            createdAt: new Date().toISOString(),
            accountConfirmation: { status: true }
          }
          setUser(adminUser)
        } else {
          const regularUser: User = {
            id: '2',
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'USER',
            createdAt: new Date().toISOString(),
            accountConfirmation: { status: true }
          }
          setUser(regularUser)
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_role')
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      
      // Mock login - replace with actual API call
      if (email === 'admin@travelnride.com') {
        const adminUser: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@travelnride.com',
          role: 'ADMIN',
          createdAt: new Date().toISOString(),
          accountConfirmation: { status: true }
        }
        setUser(adminUser)
        localStorage.setItem('auth_token', 'mock_admin_token')
        localStorage.setItem('user_role', 'ADMIN')
        router.push('/Dashboard')
      } else {
        const regularUser: User = {
          id: '2',
          name: 'John Doe',
          email: email,
          role: 'USER',
          createdAt: new Date().toISOString(),
          accountConfirmation: { status: true }
        }
        setUser(regularUser)
        localStorage.setItem('auth_token', 'mock_user_token')
        localStorage.setItem('user_role', 'USER')
        
        // Check if there's a stored redirect path
        const redirectPath = sessionStorage.getItem('redirectAfterLogin')
        if (redirectPath && (redirectPath.startsWith('/user') || redirectPath === '/' || redirectPath.startsWith('/about') || redirectPath.startsWith('/Services') || redirectPath.startsWith('/Contact'))) {
          router.push(redirectPath)
          sessionStorage.removeItem('redirectAfterLogin')
        } else {
          // Default to user dashboard if no valid redirect path
          router.push('/user/dashboard')
        }
      }
      
      return Promise.resolve()
    } catch (error) {
      console.error('Login failed:', error)
      setIsLoading(false)
      return Promise.reject(new Error('Login failed. Please check your credentials and try again.'))
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true)
      
      // Mock registration - replace with actual API call
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: 'USER',
        createdAt: new Date().toISOString(),
        accountConfirmation: { status: false }
      }
      
      setUser(newUser)
      localStorage.setItem('auth_token', 'mock_token')
      localStorage.setItem('user_role', 'USER')
      
      // Check if there's a stored redirect path
      const redirectPath = sessionStorage.getItem('redirectAfterLogin')
      if (redirectPath && (redirectPath.startsWith('/user') || redirectPath === '/' || redirectPath.startsWith('/about') || redirectPath.startsWith('/Services') || redirectPath.startsWith('/Contact'))) {
        router.push(redirectPath)
        sessionStorage.removeItem('redirectAfterLogin')
      } else {
        // Default to user dashboard if no valid redirect path
        router.push('/user/dashboard')
      }
      return Promise.resolve()
    } catch (error) {
      console.error('Registration failed:', error)
      setIsLoading(false)
      return Promise.reject(new Error('Registration failed. Please try again.'))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_role')
    router.push('/')
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}