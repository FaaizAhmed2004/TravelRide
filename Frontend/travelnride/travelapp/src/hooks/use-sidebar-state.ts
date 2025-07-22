"use client"

import { useState, useEffect } from 'react'

export function useSidebarState() {
  const [isMobile, setIsMobile] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  // Check if we're on mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // On larger screens, we start expanded, on mobile we start collapsed
      setIsCollapsed(window.innerWidth < 768)
    }
    
    // Check on mount
    checkIfMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile)
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }
  
  return {
    isMobile,
    isCollapsed,
    toggleSidebar
  }
}