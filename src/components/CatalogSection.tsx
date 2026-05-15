'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

const SIZES = ['XS', 'S', 'M', 'L', 'XL']

const summerProducts = [
  {
    id: 1,
    name: 'Sunlit Heritage Collar Shirt',
    tag: 'Handloom Cotton · Ivory',
    price: 2600,
    badge: null as string | null,
    images: ['/catalogue-1.jpeg', '/catalogue-1-1.jpeg'],
  },
  {
    id: 2,
    name: 'Sapphire Breeze Casual Shirt',
    tag: 'Cotton Linen · Navy',
    price: 2900,
    badge: 'New',
    images: ['/catalogue-2.jpeg', '/catalogue-2-1.jpeg'],
  },
  {
    id: 3,
    name: 'Brickwood Classic Kurta Shirt',
    tag: 'Handloom · Maroon Check',
    price: 2800,
    badge: 'Bestseller',
    images: ['/catalogue-3.jpeg', '/catalogue-3-1.jpeg', '/catalogue-3-2.jpeg'],
  },
  {
    id: 4,
    name: 'Sunset Cocoa Sleeveless Shirt',
    tag: 'Cotton · Maroon Check',
    price: 2500,
    badge: null,
    images: ['/catalogue-4.png', '/catalogue-4-1.png'],
  },
  {
    id: 5,
    name: 'Royal Kalamkari Summer Top',
    tag: 'Kalamkari Block Print · Red',
    price: 3200,
    badge: 'Bestseller',
    images: ['/catalogue-5.jpeg', '/catalogue-5-1.jpeg', '/catalogue-5-2.jpeg'],
  },
]

function ProductCard({ product }: { product: (typeof summerProducts)[0] }) {
  const { addItem } = useCart()
  const [imgIdx, setImgIdx] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState('')
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedSize) { setSizeError(true); return }
    setSizeError(false)
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', background: '#fff', display: 'flex', flexDirection: 'column' }}
    >
      {/* ── Image container — native img, no Next optimizer needed ── */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', background: '#f0ebe0' }}>
        <img
          src={product.images[imgIdx]}
          alt={product.name}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top center',
            display: 'block',
            transition: 'transform 0.55s ease',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
          loading="eager"
        />

        {/* Badge */}
        {product.badge && (
          <div style={{
            position: 'absolute', top: 12, left: 12, zIndex: 2,
            background: 'var(--terra)', color: '#fff',
            padding: '4px 10px', fontSize: 9, letterSpacing: 2,
            fontFamily: 'var(--sans)', fontWeight: 500, textTransform: 'uppercase',
          }}>{product.badge}</div>
        )}

        {/* Dot indicators */}
        {product.images.length > 1 && hovered && (
          <div style={{
            position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: 5, zIndex: 3,
          }}>
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setImgIdx(i) }}
                style={{
                  width: i === imgIdx ? 18 : 6, height: 6, borderRadius: 3,
                  background: i === imgIdx ? 'rgba(245,238,218,0.95)' : 'rgba(245,238,218,0.45)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.25s',
                }}
              />
            ))}
          </div>
        )}

        {/* Arrows */}
        {product.images.length > 1 && hovered && (
          <>
            <button onClick={e => { e.stopPropagation(); setImgIdx(i => (i - 1 + product.images.length) % product.images.length) }}
              style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 4,
                background: 'rgba(46,26,14,0.55)', backdropFilter: 'blur(6px)',
                border: '1px solid rgba(245,238,218,0.2)', color: 'rgba(245,238,218,0.85)',
                width: 28, height: 28, borderRadius: '50%', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>‹</button>
            <button onClick={e => { e.stopPropagation(); setImgIdx(i => (i + 1) % product.images.length) }}
              style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 4,
                background: 'rgba(46,26,14,0.55)', backdropFilter: 'blur(6px)',
                border: '1px solid rgba(245,238,218,0.2)', color: 'rgba(245,238,218,0.85)',
                width: 28, height: 28, borderRadius: '50%', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>›</button>
          </>
        )}
      </div>

      {/* ── Product info ── */}
      <div style={{ padding: '12px 10px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--terra)', marginBottom: 5 }}>
          {product.tag}
        </p>
        <p style={{ fontFamily: 'var(--display)', fontSize: 14, fontWeight: 400, color: 'var(--brown)', marginBottom: 6, lineHeight: 1.3 }}>
          {product.name}
        </p>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--muted)', fontStyle: 'italic', marginBottom: 14 }}>
          ₹{product.price.toLocaleString('en-IN')}
        </p>

        {/* Size selector */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
          {SIZES.map(size => (
            <button key={size} onClick={() => { setSelectedSize(size); setSizeError(false) }}
              style={{
                padding: '4px 9px', fontSize: 9, letterSpacing: 1.5,
                fontFamily: 'var(--sans)', fontWeight: 500, textTransform: 'uppercase',
                border: selectedSize === size
                  ? '1.5px solid var(--terra)'
                  : sizeError ? '1.5px solid rgba(180,60,40,0.5)' : '1.5px solid rgba(139,58,30,0.18)',
                background: selectedSize === size ? 'var(--terra)' : 'transparent',
                color: selectedSize === size ? '#fff' : 'var(--muted)',
                borderRadius: 1, cursor: 'pointer', transition: 'all .2s',
              }}
            >{size}</button>
          ))}
        </div>
        {sizeError && (
          <p style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--terra)', marginBottom: 8 }}>
            Please select a size
          </p>
        )}

        {/* Add to cart */}
        <button onClick={handleAdd} style={{
          marginTop: 'auto',
          width: '100%', padding: '11px 0',
          background: added ? '#2d6a4f' : 'var(--brown)',
          color: '#fff', border: 'none', borderRadius: 1,
          fontFamily: 'var(--sans)', fontSize: 9, letterSpacing: 2.5,
          textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer',
          transition: 'background .3s',
        }}>
          {added ? '✓ Added to Cart' : '+ Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default function CatalogSection() {
  return (
    <section id="catalog" style={{ background: '#fff', padding: 0 }}>
      {/* Offer bar */}
      <div style={{
        background: '#fff', padding: '13px 24px',
        fontFamily: 'var(--sans)', fontSize: 13, textAlign: 'center',
        color: 'var(--brown2)', letterSpacing: 0.5,
        borderBottom: '1px solid rgba(139,58,30,0.1)',
      }}>
        Offer applicable to all shirts site wide ♡ &nbsp; Add any 3 shirts to your cart. Pay for just 2 ♡ &nbsp; Enjoy free shipping
      </div>

      <div style={{ padding: '52px 32px 72px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--terra)', marginBottom: 12, fontWeight: 500 }}>
            Collection 2026
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 2,
              textTransform: 'uppercase', fontWeight: 600, color: 'var(--brown2)',
              border: '1.5px solid var(--brown2)', padding: '5px 14px',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c0392b', display: 'inline-block', animation: 'livePulse 1.6s ease-in-out infinite' }} />
              Summer Collection Now Live ♡
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 400, color: 'var(--brown)', letterSpacing: '-0.01em' }}>
            Shop the Collection
          </h2>
          <div style={{ width: 44, height: 1, background: 'rgba(139,58,30,0.3)', margin: '14px auto 0' }} />
        </div>

        {/* 5-col product grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '0 1px', background: 'rgba(139,58,30,0.06)',
          maxWidth: 1400, margin: '0 auto 40px',
        }}>
          {summerProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="#" className="catalog-section-link">VIEW ALL PIECES</Link>
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
