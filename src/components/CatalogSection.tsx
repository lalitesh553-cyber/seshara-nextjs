// src/components/CatalogSection.tsx
//
// ROLE: Homepage catalog.
// Desktop: 5-column grid (unchanged).
// Mobile: vertical snap-scroll — one card fills the screen at a time.
//         Scroll DOWN to see next product. Exactly like Instagram reels
//         or H&M mobile product listing. No horizontal swipe.

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const summerProducts = [
  {
    id: 1,
    name: 'Sunlit Heritage Collar Shirt',
    tag: 'Handloom Cotton · Ivory',
    price: '₹ 2,600',
    badge: null,
    slug: 'sunlit-heritage-collar-shirt',
    images: ['/catalogue-1.jpeg', '/catalogue-1-1.jpeg'],
  },
  {
    id: 2,
    name: 'Sapphire Breeze Casual Shirt',
    tag: 'Cotton Linen · Navy',
    price: '₹ 2,900',
    badge: 'New',
    slug: 'sapphire-breeze-casual-shirt',
    images: ['/catalogue-2.jpeg', '/catalogue-2-1.jpeg'],
  },
  {
    id: 3,
    name: 'Brickwood Classic Kurta Shirt',
    tag: 'Handloom · Maroon Check',
    price: '₹ 2,800',
    badge: 'Bestseller',
    slug: 'brickwood-classic-kurta-shirt',
    images: ['/catalogue-3.jpeg', '/catalogue-3-1.jpeg', '/catalogue-3-2.jpeg'],
  },
  {
    id: 4,
    name: 'Sunset Cocoa Sleeveless Shirt',
    tag: 'Cotton · Maroon Check',
    price: '₹ 2,500',
    badge: null,
    slug: 'sunset-cocoa-sleeveless-shirt',
    images: ['/catalogue-4.png', '/catalogue-4-1.png'],
  },
  {
    id: 5,
    name: 'Royal Kalamkari Summer Top',
    tag: 'Kalamkari Block Print · Red',
    price: '₹ 3,200',
    badge: 'Bestseller',
    slug: 'royal-kalamkari-summer-top',
    images: ['/catalogue-5.jpeg', '/catalogue-5-1.jpeg', '/catalogue-5-2.jpeg'],
  },
]

/* ── Desktop product card with hover image cycling ── */
function DesktopCard({ product }: { product: (typeof summerProducts)[0] }) {
  const [imgIdx, setImgIdx] = useState(0)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', background: 'var(--warm)' }}
    >
      <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
          <Image
            src={product.images[imgIdx]}
            alt={product.name}
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'top center',
              transition: 'transform 0.55s ease',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />

          {/* Badge */}
          {product.badge && (
            <div style={{
              position: 'absolute', top: 12, left: 12, zIndex: 2,
              background: 'var(--terra)', color: '#fff',
              padding: '4px 10px', fontSize: 9, letterSpacing: 2,
              fontWeight: 500, textTransform: 'uppercase',
            }}>
              {product.badge}
            </div>
          )}

          {/* Dot indicators */}
          {product.images.length > 1 && (
            <div style={{
              position: 'absolute', bottom: 12, left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex', gap: 5, zIndex: 3,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}>
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); setImgIdx(i) }}
                  style={{
                    width: i === imgIdx ? 18 : 6, height: 6,
                    borderRadius: 3,
                    background: i === imgIdx ? 'rgba(245,238,218,0.95)' : 'rgba(245,238,218,0.4)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.25s ease',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '11px 4px 16px' }}>
          <p style={{
            fontSize: 10, letterSpacing: 1, textTransform: 'uppercase',
            color: 'var(--terra)', marginBottom: 5, lineHeight: 1.4,
          }}>
            {product.tag}
          </p>
          <p style={{
            fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 400,
            color: 'var(--brown)', marginBottom: 6, lineHeight: 1.3,
          }}>
            {product.name}
          </p>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15, color: 'var(--muted)', fontStyle: 'italic' }}>
            {product.price}
          </p>
        </div>
      </Link>
    </div>
  )
}

/* ── Mobile vertical snap card ── */
function MobileCard({
  product,
  isActive,
}: {
  product: (typeof summerProducts)[0]
  isActive: boolean
}) {
  const [imgIdx, setImgIdx] = useState(0)

  // Auto-advance image when card becomes active
  useEffect(() => {
    if (!isActive || product.images.length < 2) return
    const t = setInterval(() => {
      setImgIdx((i) => (i + 1) % product.images.length)
    }, 2800)
    return () => clearInterval(t)
  }, [isActive, product.images.length])

  return (
    <div
      style={{
        /* Each card snaps to full viewport height */
        height: '100%',
        position: 'relative',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        scrollSnapAlign: 'start',
        flexShrink: 0,
      }}
    >
      <Link
        href={`/products/${product.slug}`}
        style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        {/* Image — takes ~70% of card */}
        <div style={{ position: 'relative', flex: '0 0 70%', overflow: 'hidden', background: '#f0ebe0' }}>
          <Image
            src={product.images[imgIdx]}
            alt={product.name}
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'top center',
              transition: 'opacity 0.4s ease',
            }}
          />

          {/* Badge */}
          {product.badge && (
            <div style={{
              position: 'absolute', top: 16, left: 16, zIndex: 2,
              background: 'var(--terra)', color: '#fff',
              padding: '5px 12px', fontSize: 9, letterSpacing: 2,
              fontWeight: 500, textTransform: 'uppercase',
            }}>
              {product.badge}
            </div>
          )}

          {/* Dot indicators */}
          {product.images.length > 1 && (
            <div style={{
              position: 'absolute', bottom: 16, left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex', gap: 7, zIndex: 3,
            }}>
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); setImgIdx(i) }}
                  style={{
                    width: i === imgIdx ? 22 : 7, height: 7,
                    borderRadius: 4,
                    background: i === imgIdx ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.4)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info — takes remaining ~30% */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '20px 24px',
          background: '#fff',
        }}>
          <p style={{
            fontSize: 10, letterSpacing: 2.5,
            textTransform: 'uppercase',
            color: 'var(--terra)',
            marginBottom: 8,
          }}>
            {product.tag}
          </p>

          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 26,
            fontWeight: 400,
            color: 'var(--brown)',
            marginBottom: 10,
            lineHeight: 1.2,
          }}>
            {product.name}
          </h3>

          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 26,
            color: 'var(--terra)',
            fontStyle: 'italic',
            marginBottom: 20,
          }}>
            {product.price}
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 11,
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            color: 'var(--brown2)',
            fontWeight: 600,
          }}>
            View Details →
          </div>
        </div>
      </Link>
    </div>
  )
}

/* ── Main section ── */
export default function CatalogSection() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Track which card is in view for the image auto-advance
  useEffect(() => {
    const el = scrollRef.current
    if (!el || !isMobile) return

    const onScroll = () => {
      const idx = Math.round(el.scrollTop / el.clientHeight)
      setActiveIdx(idx)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [isMobile])

  return (
    <section id="catalog" style={{ background: 'var(--warm)', padding: 0 }}>

      {/* Offer banner */}
      <div style={{
        background: '#fff',
        padding: '13px 24px',
        fontSize: 13,
        textAlign: 'center',
        color: 'var(--brown2)',
        letterSpacing: 0.5,
        borderBottom: '1px solid rgba(139,58,30,0.1)',
      }}>
        Add any 3 shirts to your cart. Pay for just 2 ♡ &nbsp; Free shipping site wide
      </div>

      {/* ── DESKTOP: 5-col grid with section header ── */}
      {!isMobile && (
        <div style={{ padding: '52px 32px 72px' }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{
              fontSize: 10, letterSpacing: 4,
              textTransform: 'uppercase', color: 'var(--terra)',
              marginBottom: 12, fontWeight: 500,
            }}>
              Collection 2026
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
                fontWeight: 600, color: 'var(--brown2)',
                border: '1.5px solid var(--brown2)', padding: '5px 14px',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#c0392b', display: 'inline-block',
                  animation: 'livePulse 1.6s ease-in-out infinite',
                }} />
                Summer Collection Now Live ♡
              </span>
            </div>

            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(26px, 3.5vw, 44px)',
              fontWeight: 400,
              color: 'var(--brown)',
              letterSpacing: '-0.01em',
            }}>
              Shop the Collection
            </h2>
            <div style={{ width: 44, height: 1, background: 'rgba(139,58,30,0.3)', margin: '14px auto 0' }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '0 2px',
            maxWidth: 1400,
            margin: '0 auto 36px',
          }}>
            {summerProducts.map((p) => (
              <DesktopCard key={p.id} product={p} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <Link href="/products" className="catalog-section-link">
              VIEW ALL PIECES
            </Link>
          </div>
        </div>
      )}

      {/*
        ── MOBILE: Vertical snap-scroll reel ──
        Each product card = 100vh tall.
        Scroll DOWN to see the next product.
        Identical to Instagram reels / H&M mobile listing.

        The container is 100vh tall with overflow-y:scroll + scroll-snap.
        Cards stack vertically. One card visible at a time.
      */}
      {isMobile && (
        <div style={{ position: 'relative' }}>
          {/* Progress indicator — shows which card out of total */}
          <div style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            background: 'rgba(61,31,15,0.55)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            fontSize: 11,
            letterSpacing: 1.5,
            padding: '5px 10px',
            borderRadius: 20,
          }}>
            {activeIdx + 1} / {summerProducts.length}
          </div>

          {/* Vertical snap scroll container */}
          <div
            ref={scrollRef}
            style={{
              height: '100svh',   // svh = small viewport height, accounts for mobile browser chrome
              overflowY: 'scroll',
              overflowX: 'hidden',
              scrollSnapType: 'y mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
            }}
          >
            {summerProducts.map((p, idx) => (
              <div
                key={p.id}
                style={{
                  height: '100svh',
                  scrollSnapAlign: 'start',
                  scrollSnapStop: 'always',  // force full stop at each card
                }}
              >
                <MobileCard product={p} isActive={idx === activeIdx} />
              </div>
            ))}

            {/* Last slide: View All CTA */}
            <div style={{
              height: '100svh',
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--cream)',
              gap: 24,
            }}>
              <p style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 32,
                fontWeight: 400,
                color: 'var(--brown)',
                textAlign: 'center',
                padding: '0 32px',
                lineHeight: 1.3,
              }}>
                Explore all pieces
              </p>
              <Link
                href="/products"
                style={{
                  background: 'var(--terra)',
                  color: '#fff',
                  padding: '16px 40px',
                  textDecoration: 'none',
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                View All
              </Link>
            </div>
          </div>

          {/* Hide scrollbar on webkit */}
          <style>{`
            div::-webkit-scrollbar { display: none; }
            @keyframes livePulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.4; transform: scale(0.7); }
            }
          `}</style>
        </div>
      )}

      {/* Desktop animation */}
      {!isMobile && (
        <style>{`
          @keyframes livePulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.7); }
          }
        `}</style>
      )}
    </section>
  )
}
