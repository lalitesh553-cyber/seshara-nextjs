'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

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

/* ── Desktop product card — unchanged from original ── */
function ProductCard({ product }: { product: (typeof summerProducts)[0] }) {
  const [imgIdx, setImgIdx] = useState(0)
  const [hovered, setHovered] = useState(false)

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImgIdx(i => (i + 1) % product.images.length)
  }
  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImgIdx(i => (i - 1 + product.images.length) % product.images.length)
  }

  return (
    <div
      className="catalog-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative' }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}>
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
                onClick={e => { e.stopPropagation(); setImgIdx(i) }}
                style={{
                  width: i === imgIdx ? 18 : 6, height: 6, borderRadius: 3,
                  background: i === imgIdx ? 'rgba(245,238,218,0.95)' : 'rgba(245,238,218,0.4)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.25s ease',
                }}
              />
            ))}
          </div>
        )}

        {product.images.length > 1 && hovered && (
          <>
            <button onClick={showPrev} style={{
              position: 'absolute', left: 8, top: '50%',
              transform: 'translateY(-50%)', zIndex: 4,
              background: 'rgba(46,26,14,0.55)', backdropFilter: 'blur(6px)',
              border: '1px solid rgba(245,238,218,0.2)', color: 'rgba(245,238,218,0.85)',
              width: 28, height: 28, borderRadius: '50%',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12,
            }}>‹</button>
            <button onClick={showNext} style={{
              position: 'absolute', right: 8, top: '50%',
              transform: 'translateY(-50%)', zIndex: 4,
              background: 'rgba(46,26,14,0.55)', backdropFilter: 'blur(6px)',
              border: '1px solid rgba(245,238,218,0.2)', color: 'rgba(245,238,218,0.85)',
              width: 28, height: 28, borderRadius: '50%',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12,
            }}>›</button>
          </>
        )}

        <div className="quick-add">
          <button>+ Quick Add</button>
        </div>
      </div>

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
    </div>
  )
}

/* ── Mobile swipe card — full card tap goes to PDP ── */
function MobileCard({ product }: { product: (typeof summerProducts)[0] }) {
  const [imgIdx, setImgIdx] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const delta = touchStart - e.changedTouches[0].clientX
    if (Math.abs(delta) < 40) return
    if (delta > 0) setImgIdx(i => (i + 1) % product.images.length)
    else           setImgIdx(i => (i - 1 + product.images.length) % product.images.length)
    setTouchStart(null)
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        /* Each card: 72vw wide so ~1.3 cards visible = clear hint to swipe */
        flexShrink: 0,
        width: '72vw',
        maxWidth: 300,
        scrollSnapAlign: 'start',
        background: '#fff',
      }}
    >
      {/* Image */}
      <div
        style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#f0ebe0' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={product.images[imgIdx]}
          alt={product.name}
          fill
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
        />

        {product.badge && (
          <div style={{
            position: 'absolute', top: 10, left: 10, zIndex: 2,
            background: 'var(--terra)', color: '#fff',
            padding: '3px 8px', fontSize: 8, letterSpacing: 1.5,
            fontWeight: 500, textTransform: 'uppercase',
          }}>
            {product.badge}
          </div>
        )}

        {/* Dot indicators */}
        {product.images.length > 1 && (
          <div style={{
            position: 'absolute', bottom: 10, left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', gap: 5, zIndex: 3,
          }}>
            {product.images.map((_, i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: i === imgIdx ? 16 : 5, height: 5,
                  borderRadius: 3,
                  background: i === imgIdx ? 'rgba(245,238,218,0.95)' : 'rgba(245,238,218,0.45)',
                  transition: 'all 0.25s ease',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '12px 10px 16px' }}>
        <p style={{
          fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase',
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
        <p style={{
          marginTop: 8, fontSize: 10, letterSpacing: 2,
          textTransform: 'uppercase', color: 'var(--terra)', fontWeight: 600,
        }}>
          View Details →
        </p>
      </div>
    </Link>
  )
}

export default function CatalogSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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
        Offer applicable to all shirts site wide ♡ &nbsp; Add any 3 shirts to your cart. Pay for just 2 ♡ &nbsp; Enjoy free shipping
      </div>

      <div style={{ padding: isMobile ? '32px 0 48px' : '52px 32px 72px' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 28 : 52, padding: isMobile ? '0 24px' : 0 }}>
          <p style={{
            fontSize: 10, letterSpacing: 4, textTransform: 'uppercase',
            color: 'var(--terra)', marginBottom: 12, fontWeight: 500,
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
            fontWeight: 400, color: 'var(--brown)',
            letterSpacing: '-0.01em',
          }}>
            Shop the Collection
          </h2>
          <div style={{ width: 44, height: 1, background: 'rgba(139,58,30,0.3)', margin: '14px auto 0' }} />
        </div>

        {/* ── DESKTOP: 5-col grid ── */}
        {!isMobile && (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '0 2px',
              maxWidth: 1400,
              margin: '0 auto 36px',
            }}>
              {summerProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <Link href="/products" className="catalog-section-link">
                VIEW ALL PIECES
              </Link>
            </div>
          </>
        )}

        {/*
          ── MOBILE: horizontal swipe carousel ──
          Pure inline styles — no CSS class dependency.
          Each card is 72vw wide so ~1.3 cards visible,
          clearly hinting the user to swipe right.
          scroll-snap-type keeps each swipe clean.
        */}
        {isMobile && (
          <>
            <div style={{
              display: 'flex',
              gap: 12,
              overflowX: 'auto',
              overflowY: 'hidden',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              paddingLeft: 24,
              paddingRight: 24,
              paddingBottom: 4,
            }}>
              {summerProducts.map(p => (
                <MobileCard key={p.id} product={p} />
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 28, padding: '0 24px' }}>
              <Link
                href="/products"
                style={{
                  fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
                  color: 'var(--brown2)', fontWeight: 600, textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}
              >
                VIEW ALL PIECES →
              </Link>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        /* Hide scrollbar on webkit for the mobile carousel */
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}
