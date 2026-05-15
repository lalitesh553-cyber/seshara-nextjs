'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import CartDrawer from './CartDrawer'

export default function Navbar() {
  const { count } = useCart()
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <header style={{ position: 'fixed', top: 34, left: 0, right: 0, zIndex: 900 }}>
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 52px',
          background: 'rgba(245,240,232,0.96)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(139,58,30,0.08)',
        }}>
          {/* Left */}
          <ul style={{ display: 'flex', gap: 36, listStyle: 'none' }}>
            {[
              { label: 'Shop', href: '#catalog' },
              { label: 'Our Story', href: '#our-story' },
              { label: 'Journal', href: '#' },
              { label: 'Collections', href: '#' },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="nav-link">{label}</Link>
              </li>
            ))}
          </ul>

          {/* Center logo */}
          <Link href="/" style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            textDecoration: 'none', textAlign: 'center', lineHeight: 1,
          }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 9, letterSpacing: 5, color: 'var(--muted)', marginBottom: 2 }}>✦</div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 22, letterSpacing: 6, textTransform: 'uppercase', color: 'var(--terra)', fontWeight: 600 }}>
              SESHARA
            </div>
          </Link>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 17, color: 'var(--brown2)' }}>⌕</button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 17, color: 'var(--brown2)' }}>♡</button>
            <button
              onClick={() => setCartOpen(true)}
              style={{
                background: 'var(--terra)', color: '#fff',
                padding: '9px 20px', borderRadius: 2,
                fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 2,
                textTransform: 'uppercase', fontWeight: 500,
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 7,
              }}
            >
              Cart
              {count > 0 && (
                <span style={{
                  background: '#fff', color: 'var(--terra)',
                  width: 18, height: 18, borderRadius: '50%',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, fontWeight: 700, letterSpacing: 0,
                }}>
                  {count}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
