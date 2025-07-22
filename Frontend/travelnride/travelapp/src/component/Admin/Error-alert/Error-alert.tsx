"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, AlertCircle, CheckCircle, Info, AlertTriangle, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface ErrorAlertProps {
  message: string
  type?: 'error' | 'warning' | 'info' | 'success'
  title?: string
  dismissible?: boolean
  onDismiss?: () => void
  onRetry?: () => void
  retryLabel?: string
  className?: string
  autoHide?: boolean
  autoHideDelay?: number
}

export function ErrorAlert({
  message,
  type = 'error',
  title,
  dismissible = true,
  onDismiss,
  onRetry,
  retryLabel = 'Try Again',
  className,
  autoHide = false,
  autoHideDelay = 5000
}: ErrorAlertProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoHide && autoHideDelay > 0) {
      const timer = setTimeout(() => {
        handleDismiss()
      }, autoHideDelay)

      return () => clearTimeout(timer)
    }
  }, [autoHide, autoHideDelay])

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) return null

  const getAlertConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          className: 'border-green-200 bg-green-50 text-green-800',
          iconColor: 'text-green-600',
          defaultTitle: 'Success'
        }
      case 'warning':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          className: 'border-yellow-200 bg-yellow-50 text-yellow-800',
          iconColor: 'text-yellow-600',
          defaultTitle: 'Warning'
        }
      case 'info':
        return {
          icon: <Info className="h-4 w-4" />,
          className: 'border-blue-200 bg-blue-50 text-blue-800',
          iconColor: 'text-blue-600',
          defaultTitle: 'Information'
        }
      case 'error':
      default:
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          className: 'border-red-200 bg-red-50 text-red-800',
          iconColor: 'text-red-600',
          defaultTitle: 'Error'
        }
    }
  }

  const config = getAlertConfig()

  return (
    <Alert className={cn(config.className, className)}>
      <div className={config.iconColor}>
        {config.icon}
      </div>
      <div className="flex-1">
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription className="mt-1">
          {message}
        </AlertDescription>
        
        {onRetry && (
          <div className="mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="h-8 px-3 text-xs"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              {retryLabel}
            </Button>
          </div>
        )}
      </div>
      
      {dismissible && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="h-6 w-6 p-0 hover:bg-transparent"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </Alert>
  )
}

// Toast notification system
interface ToastProps {
  id: string
  message: string
  type?: 'error' | 'warning' | 'info' | 'success'
  title?: string
  duration?: number
  onRemove: (id: string) => void
}

function Toast({ id, message, type = 'info', title, duration = 5000, onRemove }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onRemove])

  const config = {
    success: {
      icon: <CheckCircle className="h-5 w-5" />,
      className: 'border-green-200 bg-green-50 text-green-800',
      iconColor: 'text-green-600'
    },
    warning: {
      icon: <AlertTriangle className="h-5 w-5" />,
      className: 'border-yellow-200 bg-yellow-50 text-yellow-800',
      iconColor: 'text-yellow-600'
    },
    info: {
      icon: <Info className="h-5 w-5" />,
      className: 'border-blue-200 bg-blue-50 text-blue-800',
      iconColor: 'text-blue-600'
    },
    error: {
      icon: <AlertCircle className="h-5 w-5" />,
      className: 'border-red-200 bg-red-50 text-red-800',
      iconColor: 'text-red-600'
    }
  }

  const { icon, className, iconColor } = config[type]

  return (
    <div className={cn(
      "flex items-start space-x-3 p-4 rounded-lg border shadow-lg animate-in slide-in-from-right-full",
      className
    )}>
      <div className={iconColor}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-medium text-sm">{title}</p>
        )}
        <p className="text-sm">{message}</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(id)}
        className="h-6 w-6 p-0 hover:bg-transparent"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

// Toast container and context
interface ToastContextType {
  showToast: (toast: Omit<ToastProps, 'id' | 'onRemove'>) => void
  showSuccess: (message: string, title?: string) => void
  showError: (message: string, title?: string) => void
  showWarning: (message: string, title?: string) => void
  showInfo: (message: string, title?: string) => void
}

import { createContext, useContext, useCallback } from "react"

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const showToast = useCallback((toast: Omit<ToastProps, 'id' | 'onRemove'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { ...toast, id, onRemove: removeToast }])
  }, [removeToast])

  const showSuccess = useCallback((message: string, title?: string) => {
    showToast({ message, title, type: 'success' })
  }, [showToast])

  const showError = useCallback((message: string, title?: string) => {
    showToast({ message, title, type: 'error' })
  }, [showToast])

  const showWarning = useCallback((message: string, title?: string) => {
    showToast({ message, title, type: 'warning' })
  }, [showToast])

  const showInfo = useCallback((message: string, title?: string) => {
    showToast({ message, title, type: 'info' })
  }, [showToast])

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError, showWarning, showInfo }}>
      {children}
      
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}