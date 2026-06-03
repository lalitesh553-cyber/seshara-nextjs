'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [adminUser, setAdminUser] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    const expiry = localStorage.getItem('adminExpiry')
    const user = localStorage.getItem('adminUser')

    // Check if session exists and is valid
    if (!auth || auth !== 'true') {
      router.push('/admin/login')
      return
    }

    if (expiry && new Date().getTime() > parseInt(expiry)) {
      // Session expired
      localStorage.removeItem('adminAuth')
      localStorage.removeItem('adminExpiry')
      localStorage.removeItem('adminUser')
      router.push('/admin/login')
      return
    }

    setAdminUser(user)
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminExpiry')
    localStorage.removeItem('adminUser')
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0f0d0b', color: '#f5f0e8' }}>
        Loading...
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f0d0b', color: '#f5f0e8', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'serif', fontSize: '2rem', letterSpacing: '0.1em' }}>
            SESHARA Admin
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {adminUser && <span style={{ opacity: 0.6, fontSize: '0.85rem' }}>{adminUser}</span>}
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: '1px solid rgba(201,169,110,0.4)',
                color: '#c9a96e',
                padding: '0.5rem 1.5rem',
                cursor: 'pointer',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {[
            { label: 'Total Orders', value: '—' },
            { label: 'Products', value: '—' },
            { label: 'Revenue', value: '—' },
            { label: 'Customers', value: '—' },
          ].map((card) => (
            <div
              key={card.label}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(201,169,110,0.15)',
                padding: '1.5rem',
                borderRadius: '4px',
              }}
            >
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '0.5rem' }}>
                {card.label}
              </div>
              <div style={{ fontSize: '2rem', fontFamily: 'serif', color: '#c9a96e' }}>
                {card.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
