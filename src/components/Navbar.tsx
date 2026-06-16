 'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import CartDrawer from './CartDrawer'
import AnnouncementBar from './AnnouncementBar'

const NAV_ITEMS = [
  {
    label: 'All Products',
    href: '/products',
  },
  {
    label: "Men's Wear",
    href: '/products?category=men',
  },
  {
    label: "Women's Wear",
    href: '/products?category=women',
  },
  {
    label: 'Design Yours',
    href: '/design-yours',
  },
]

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
          top: 32,
          left: 0,
          right: 0,
          zIndex: 999,
        }}
      >
        <nav
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            minHeight: 72,
            padding: '0 clamp(16px,4vw,52px)',
            background: 'rgba(245,240,232,0.96)',
            backdropFilter: 'blur(16px)',
            borderBottom:
              '1px solid rgba(139,58,30,0.08)',
          }}
        >
          {/* Left */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <button
              className="mobile-nav-toggle"
              onClick={() =>
                setMenuOpen((prev) => !prev)
              }
              aria-label="Menu"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                flexDirection: 'column',
                gap: 5,
                padding: 4,
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 1.5,
                  background: 'var(--brown2)',
                }}
              />

              <span
                style={{
                  width: 22,
                  height: 1.5,
                  background: 'var(--brown2)',
                }}
              />

              <span
                style={{
                  width: 22,
                  height: 1.5,
                  background: 'var(--brown2)',
                }}
              />
            </button>

            <ul
              className="desktop-nav"
              style={{
                display: 'flex',
                gap: 28,
                listStyle: 'none',
                alignItems: 'center',
                margin: 0,
                padding: 0,
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

          {/* Center Logo */}
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              textAlign: 'center',
              lineHeight: 1,
            }}
          >
            <div
              style={{
                fontSize: 9,
                letterSpacing: 5,
                color: 'var(--muted)',
                marginBottom: 2,
              }}
            >
              ✦
            </div>

            <div
              style={{
                fontSize: 'clamp(16px,2vw,22px)',
                letterSpacing: 6,
                textTransform: 'uppercase',
                color: 'var(--terra)',
                fontWeight: 600,
              }}
            >
              SESHARA
            </div>
          </Link>

          {/* Right */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <button
              onClick={() => setCartOpen(true)}
              style={{
                background: 'var(--terra)',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: 2,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 10,
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              Cart

              {count > 0 && (
                <span
                  style={{
                    background: '#fff',
                    color: 'var(--terra)',
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 9,
                    fontWeight: 700,
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div
            style={{
              background:
                'rgba(245,240,232,0.98)',
              borderBottom:
                '1px solid rgba(139,58,30,0.1)',
              padding: '16px 24px',
            }}
          >
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                style={{
                  padding: '12px 0',
                }}
              >
                <Link
                  href={item.href}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  style={{
                    textDecoration: 'none',
                    color: 'var(--brown2)',
                    fontSize: 12,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                  }}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        )}
      </header>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }

          .mobile-nav-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </>
  )
}
