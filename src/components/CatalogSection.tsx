'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

/* ── Product data with real catalogue images ── */
const summerProducts = [
  {
    id: 1,
    name: 'Sunlit Heritage Collar Shirt',
    tag: 'Handloom Cotton · Ivory',
    price: '₹ 2,600',
    badge: null,
    images: ['/catalogue-1.jpeg', '/catalogue-1-1.jpeg'],
  },
  {
    id: 2,
    name: 'Sapphire Breeze Casual Shirt',
    tag: 'Cotton Linen · Navy',
    price: '₹ 2,900',
    badge: 'New',
    images: ['/catalogue-2.jpeg', '/catalogue-2-1.jpeg'],
  },
  {
    id: 3,
    name: 'Brickwood Classic Kurta Shirt',
    tag: 'Handloom · Maroon Check',
    price: '₹ 2,800',
    badge: 'Bestseller',
    images: ['/catalogue-3.jpeg', '/catalogue-3-1.jpeg', '/catalogue-3-2.jpeg'],
  },
  {
    id: 4,
    name: 'Sunset Cocoa Sleeveless Shirt',
    tag: 'Cotton · Maroon Check',
    price: '₹ 2,500',
    badge: null,
    images: ['/catalogue-4.png', '/catalogue-4-1.png'],
  },
  {
    id: 5,
    name: 'Royal Kalamkari Summer Top',
    tag: 'Kalamkari Block Print · Red',
    price: '₹ 3,200',
    badge: 'Bestseller',
    images: ['/catalogue-5.jpeg', '/catalogue-5-1.jpeg', '/catalogue-5-2.jpeg'],
  },
]

/* ── Single product card with image cycling ── */
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
      {/* ── Image container ── */}
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

        {/* Badge */}
        {product.badge && (
          <div style={{
            position: 'absolute', top: 12, left: 12, zIndex: 2,
            background: 'var(--terra)', color: '#fff',
            padding: '4px 10px', fontSize: 9, letterSpacing: 2,
            fontFamily: 'var(--sans)', fontWeight: 500, textTransform: 'uppercase',
          }}>
            {product.badge}
          </div>
        )}

        {/* Image dot indicators (if multiple images) */}
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
                  width: i === imgIdx ? 18 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === imgIdx ? 'rgba(245,238,218,0.95)' : 'rgba(245,238,218,0.4)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.25s ease',
                }}
              />
            ))}
          </div>
        )}

        {/* Arrow controls */}
        {product.images.length > 1 && hovered && (
          <>
            <button
              onClick={showPrev}
              style={{
                position: 'absolute', left: 8, top: '50%',
                transform: 'translateY(-50%)', zIndex: 4,
                background: 'rgba(46,26,14,0.55)', backdropFilter: 'blur(6px)',
                border: '1px solid rgba(245,238,218,0.2)', color: 'rgba(245,238,218,0.85)',
                width: 28, height: 28, borderRadius: '50%',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12,
              }}
            >‹</button>
            <button
              onClick={showNext}
              style={{
                position: 'absolute', right: 8, top: '50%',
                transform: 'translateY(-50%)', zIndex: 4,
                background: 'rgba(46,26,14,0.55)', backdropFilter: 'blur(6px)',
                border: '1px solid rgba(245,238,218,0.2)', color: 'rgba(245,238,218,0.85)',
                width: 28, height: 28, borderRadius: '50%',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12,
              }}
            >›</button>
          </>
        )}

        {/* Quick Add overlay */}
        <div className="quick-add">
          <button>+ Quick Add</button>
        </div>
      </div>

      {/* ── Info ── */}
      <div style={{ padding: '11px 4px 16px' }}>
        <p style={{
          fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 1,
          textTransform: 'uppercase', color: 'var(--terra)',
          marginBottom: 5, lineHeight: 1.4,
        }}>
          {product.tag}
        </p>
        <p style={{
          fontFamily: 'var(--display)', fontSize: 15, fontWeight: 400,
          color: 'var(--brown)', marginBottom: 6, lineHeight: 1.3,
        }}>
          {product.name}
        </p>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--muted)', fontStyle: 'italic' }}>
          {product.price}
        </p>
      </div>
    </div>
  )
}

/* ── Main section ── */
export default function CatalogSection() {
  return (
    <section id="catalog" style={{ background: 'var(--warm)', padding: 0 }}>

      {/* Offer banner */}
      <div style={{
        background: '#fff',
        padding: '13px 24px',
        fontFamily: 'var(--sans)',
        fontSize: 13,
        textAlign: 'center',
        color: 'var(--brown2)',
        letterSpacing: 0.5,
        borderBottom: '1px solid rgba(139,58,30,0.1)',
      }}>
        Offer applicable to all shirts site wide ♡ &nbsp; Add any 3 shirts to your cart. Pay for just 2 ♡ &nbsp; Enjoy free shipping
      </div>

      <div style={{ padding: '52px 32px 72px' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 4,
            textTransform: 'uppercase', color: 'var(--terra)',
            marginBottom: 12, fontWeight: 500,
          }}>
            Collection 2026
          </p>

          {/* Live badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 2,
              textTransform: 'uppercase', fontWeight: 600, color: 'var(--brown2)',
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
            fontFamily: 'var(--display)',
            fontSize: 'clamp(26px, 3.5vw, 44px)',
            fontWeight: 400,
            color: 'var(--brown)',
            letterSpacing: '-0.01em',
          }}>
            Shop the Collection
          </h2>
          <div style={{ width: 44, height: 1, background: 'rgba(139,58,30,0.3)', margin: '14px auto 0' }} />
        </div>

        {/* 5-product grid */}
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

        {/* View all link */}
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <Link href="#" className="catalog-section-link">
            VIEW ALL PIECES
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>
    </section>
  )
}
