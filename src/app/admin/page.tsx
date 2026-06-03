'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Check if user is logged in
    const isAuthenticated = localStorage.getItem('adminAuth')
    
    if (isAuthenticated === 'true') {
      router.replace('/admin/dashboard')
    } else {
      router.replace('/admin/login')
    }
  }, [router])
  
  return null
}