'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Check authentication on client side
    const auth = localStorage.getItem('adminAuth')
    const expiry = localStorage.getItem('adminExpiry')
    const isLoginPage = pathname === '/admin/login'
    
    // Check if session is expired
    if (auth === 'true' && expiry && new Date().getTime() > parseInt(expiry)) {
      // Session expired
      localStorage.removeItem('adminAuth')
      localStorage.removeItem('adminExpiry')
      localStorage.removeItem('adminUser')
      if (!isLoginPage) {
        router.push('/admin/login')
      }
    }
    
    // Redirect logic
    if (!isLoginPage && auth !== 'true') {
      router.push('/admin/login')
    }
    
    if (isLoginPage && auth === 'true' && expiry && new Date().getTime() < parseInt(expiry)) {
      router.push('/admin/dashboard')
    }
  }, [pathname, router])

  // Don't render layout on login page to avoid double headers
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {children}
    </div>
  )
}