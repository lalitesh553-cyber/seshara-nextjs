'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import CartDrawer from './CartDrawer'

export default function Navbar() {
  const { count } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header style={{ position: 'fixed', top: 34, left: 0, right: 0, zIndex: 900 }}>
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px clamp(16px,4vw,52px)',
          background: 'rgba(245,240,232,0.96)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(139,58,30,0.08)',
        }}>
          {/* Desktop left links */}
          <ul style={{ display: 'flex', gap: 28, listStyle: 'none' }} className="desktop-nav">
            {[
              { label: 'Shop', href: '#catalog' },
              { label: 'Our Story', href: '#our-story' },
              { label: 'Design Yours', href: '/design-yours' },
              { label: 'Collections', href: '#' },
              { label: "Men's Wear", href: '#mens-wear' },
              { label: "Women's Wear", href: '#womens-wear' },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="nav-link">{label}</Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            style={{
              display: 'none', background: 'none', border: 'none',
              cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 4,
            }}
          >
            <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--brown2)', transition: 'all .3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--brown2)', transition: 'all .3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--brown2)', transition: 'all .3s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>

          {/* Center logo */}
          <Link href="/" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textDecoration: 'none', textAlign: 'center', lineHeight: 1 }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 9, letterSpacing: 5, color: 'var(--muted)', marginBottom: 2 }}>✦</div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(16px,2vw,22px)', letterSpacing: 6, textTransform: 'uppercase', color: 'var(--terra)', fontWeight: 600 }}>SESHARA</div>
          </Link>

          {/* Right side icons & cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--brown2)' }} className="desktop-nav">♡</button>
            <button
              onClick={() => setCartOpen(true)}
              style={{
                background: 'var(--terra)', color: '#fff',
                padding: '8px clamp(10px,2vw,18px)', borderRadius: 2,
                fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 2,
                textTransform: 'uppercase', fontWeight: 500, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              Cart
              {count > 0 && (
                <span style={{ background: '#fff', color: 'var(--terra)', width: 16, height: 16, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700 }}>
                  {count}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div style={{
            background: 'rgba(245,240,232,0.98)', backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(139,58,30,0.1)',
            padding: '16px 24px 20px',
          }}>
            {[
              { label: 'Shop', href: '#catalog' },
              { label: 'Our Story', href: '#our-story' },
              { label: 'Design Yours', href: '/design-yours' },
              { label: 'Collections', href: '#' },
              { label: "Men's Wear", href: '#mens-wear' },
              { label: "Women's Wear", href: '#womens-wear' },
            ].map(({ label, href }) => (
              <div key={label} style={{ borderBottom: '1px solid rgba(139,58,30,0.07)', padding: '12px 0' }}>
                <Link href={href} onClick={() => setMenuOpen(false)} style={{ fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--brown2)', textDecoration: 'none', fontWeight: 500 }}>
                  {label}
                </Link>
              </div>
            ))}
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
        }
      `}</style>
    </>
  )
}
