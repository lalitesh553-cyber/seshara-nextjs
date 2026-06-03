'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Check if already logged in
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    const expiry = localStorage.getItem('adminExpiry')
    
    if (auth === 'true' && expiry && new Date().getTime() < parseInt(expiry)) {
      router.push('/admin/dashboard')
    } else if (auth === 'true') {
      // Session expired
      localStorage.removeItem('adminAuth')
      localStorage.removeItem('adminExpiry')
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Demo credentials - works on Vercel Free
    if (username === 'prasanna2000' && password === '9398285019') {
      // Set session expiry (24 hours)
      const expiry = new Date().getTime() + (24 * 60 * 60 * 1000)
      localStorage.setItem('adminAuth', 'true')
      localStorage.setItem('adminExpiry', expiry.toString())
      localStorage.setItem('adminUser', username)
      
      router.push('/admin/dashboard')
    } else {
      setError('Invalid credentials. Use: prasanna2000 / 9398285019')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--cream)',
    }}>
      <div style={{
        background: '#fff',
        padding: '48px',
        maxWidth: 400,
        width: '90%',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      }}>
        <h1 style={{
          fontFamily: 'var(--display)',
          fontSize: 28,
          color: 'var(--brown)',
          marginBottom: 8,
          textAlign: 'center',
        }}>Admin Login</h1>
        <p style={{
          fontFamily: 'var(--serif)',
          fontSize: 13,
          color: 'var(--muted)',
          textAlign: 'center',
          marginBottom: 32,
          fontStyle: 'italic',
        }}>Seshara Management Portal</p>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              fontFamily: 'var(--sans)',
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--brown2)',
              marginBottom: 8,
            }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="prasanna2000"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid rgba(139,58,30,0.2)',
                fontFamily: 'var(--sans)',
                fontSize: 14,
                background: 'var(--cream)',
              }}
              required
              disabled={loading}
            />
          </div>
          
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: 'block',
              fontFamily: 'var(--sans)',
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--brown2)',
              marginBottom: 8,
            }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid rgba(139,58,30,0.2)',
                fontFamily: 'var(--sans)',
                fontSize: 14,
                background: 'var(--cream)',
              }}
              required
              disabled={loading}
            />
          </div>
          
          {error && (
            <p style={{
              color: '#c0392b',
              fontSize: 12,
              marginBottom: 16,
              fontFamily: 'var(--sans)',
              padding: '8px',
              background: 'rgba(192,57,43,0.1)',
              borderRadius: 4,
            }}>{error}</p>
          )}
          
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: 'var(--terra)',
              color: '#fff',
              padding: '14px',
              border: 'none',
              fontFamily: 'var(--sans)',
              fontSize: 11,
              letterSpacing: 3,
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 500,
              opacity: loading ? 0.7 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div style={{
          marginTop: 24,
          paddingTop: 24,
          borderTop: '1px solid rgba(139,58,30,0.1)',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: 10,
            color: 'var(--muted)',
            letterSpacing: 1,
          }}>
            Demo credentials shown below the login form
          </p>
        </div>
      </div>
    </div>
  )
}