// src/components/Navbar.tsx
// Fixed below AnnouncementBar: top:32px, height:72px.
// zIndex:1000 (AnnouncementBar is 1001, above this).
// Mobile drawer: solid background, spacer pushes links below header.

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import CartDrawer from './CartDrawer'
import AnnouncementBar from './AnnouncementBar'

const NAV_ITEMS = [
  { label: 'All Products', href: '/products' },
  { label: "Men's Wear",   href: '/products?category=men' },
  { label: "Women's Wear", href: '/products?category=women' },
  { label: 'Design Yours', href: '/design-yours' },
]

// Header geometry — must match AnnouncementBar and spacer in page.tsx
const ANNOUNCEMENT_H = 32  // AnnouncementBar height
const NAV_H          = 72  // Nav bar height
const HEADER_TOTAL   = ANNOUNCEMENT_H + NAV_H  // 104px

export default function Navbar() {
  const { count } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <AnnouncementBar />

      <header
        style={{
          position: 'fixed',
          top: ANNOUNCEMENT_H,   // sits flush below announcement bar
          left: 0,
          right: 0,
          zIndex: 1000,          // below AnnouncementBar (1001)
        }}
      >
        <nav
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            height: NAV_H,
            padding: '0 clamp(16px, 4vw, 52px)',
            background: 'rgba(245,240,232,0.97)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(139,58,30,0.08)',
          }}
        >
          {/* LEFT */}
          <div style={{ display: 'flex', alignItems: 'center' }}>

            {/* Hamburger — CSS shows flex on mobile */}
            <button
              className="seshara-hamburger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{
                background: 'none', border: 'none',
                cursor: 'pointer', padding: 6,
                display: 'none',  // overridden to flex at ≤768px
                flexDirection: 'column', gap: 5,
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              {/* Animated burger → X */}
              <span style={{
                display: 'block', width: 24, height: 1.5,
                background: 'var(--brown2)',
                transition: 'transform 0.25s, opacity 0.25s',
                transformOrigin: 'center',
                transform: menuOpen ? 'translateY(3.5px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                display: 'block', width: 24, height: 1.5,
                background: 'var(--brown2)',
                transition: 'opacity 0.25s',
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                display: 'block', width: 24, height: 1.5,
                background: 'var(--brown2)',
                transition: 'transform 0.25s, opacity 0.25s',
                transformOrigin: 'center',
                transform: menuOpen ? 'translateY(-3.5px) rotate(-45deg)' : 'none',
              }} />
            </button>

            {/* Desktop nav */}
            <ul
              className="seshara-desktop-nav"
              style={{
                display: 'flex', gap: 28,
                listStyle: 'none', alignItems: 'center',
                margin: 0, padding: 0,
              }}
            >
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    style={{
                      textDecoration: 'none',
                      color: 'var(--brown)',
                      fontSize: 12,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CENTER — Logo */}
          <Link href="/" style={{ textDecoration: 'none', textAlign: 'center', lineHeight: 1 }}>
            <div style={{ fontSize: 9, letterSpacing: 5, color: 'var(--muted)', marginBottom: 2 }}>✦</div>
            <div style={{
              fontSize: 'clamp(16px, 2vw, 22px)',
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: 'var(--terra)',
              fontWeight: 600,
            }}>
              SESHARA
            </div>
          </Link>

          {/* RIGHT — Cart */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <button
              onClick={() => setCartOpen(true)}
              style={{
                background: 'var(--terra)', color: '#fff',
                padding: '8px 16px', borderRadius: 2,
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
              }}
            >
              Cart
              {count > 0 && (
                <span style={{
                  background: '#fff', color: 'var(--terra)',
                  width: 16, height: 16, borderRadius: '50%',
                  display: 'inline-flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 9, fontWeight: 700,
                }}>
                  {count}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/*
        MOBILE DRAWER
        ─────────────────────────────────────────────────────────────
        Renders outside <header> — covers full viewport including
        the announcement bar area.

        z-index stack:
          backdrop:          998
          drawer:            999
          header (nav):     1000
          announcement bar: 1001

        SPACER FIX:
          The drawer starts at top:0 but the header takes 104px.
          A spacer div (height: HEADER_TOTAL = 104px) is the first
          child of the drawer — this pushes "ALL PRODUCTS" to start
          exactly below the visible nav bar. No clipping.
      */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.3)',
              zIndex: 998,
            }}
          />

          {/* Drawer */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: '#faf7f2',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            {/* Spacer: pushes links below fixed header */}
            <div style={{ height: HEADER_TOTAL, flexShrink: 0 }} />

            {/* Top divider */}
            <div style={{ height: 1, background: 'rgba(139,58,30,0.1)', flexShrink: 0 }} />

            {/* Nav links */}
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                style={{ borderBottom: '1px solid rgba(139,58,30,0.07)' }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '22px 24px',
                    textDecoration: 'none',
                    color: 'var(--brown)',
                    fontSize: 13,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <style jsx>{`
        @media (max-width: 768px) {
          .seshara-desktop-nav { display: none !important; }
          .seshara-hamburger   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .seshara-hamburger { display: none !important; }
        }
      `}</style>
    </>
  )
}
