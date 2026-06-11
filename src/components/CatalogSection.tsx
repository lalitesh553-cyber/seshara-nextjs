'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '@/context/CartContext'
import ProductModal from '@/components/ProductModal'

const SIZES = ['XS', 'S', 'M', 'L', 'XL']

const summerProducts = [
  { id: 1, name: 'Sunlit Heritage Collar Shirt', tag: 'Handloom Cotton · Ivory', price: 2600, badge: null as string | null, images: ['/catalogue-1.jpeg', '/catalogue-1-1.jpeg'] },
  { id: 2, name: 'Sapphire Breeze Casual Shirt', tag: 'Cotton Linen · Navy', price: 2900, badge: 'New', images: ['/catalogue-2.jpeg', '/catalogue-2-1.jpeg'] },
  { id: 3, name: 'Brickwood Classic Kurta Shirt', tag: 'Handloom · Maroon Check', price: 2800, badge: 'Bestseller', images: ['/catalogue-3.jpeg', '/catalogue-3-1.jpeg', '/catalogue-3-2.jpeg'] },
  { id: 4, name: 'Sunset Cocoa Sleeveless Shirt', tag: 'Cotton · Maroon Check', price: 2500, badge: null, images: ['/catalogue-4.png', '/catalogue-4-1.png'] },
  { id: 5, name: 'Royal Kalamkari Summer Top', tag: 'Kalamkari Block Print · Red', price: 3200, badge: 'Bestseller', images: ['/catalogue-5.jpeg', '/catalogue-5-1.jpeg', '/catalogue-5-2.jpeg'] },
]

function ProductCard({ product, compact = false }: { product: (typeof summerProducts)[0]; compact?: boolean }) {
  const { addItem } = useCart()
  const [imgIdx, setImgIdx] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState('')
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedSize) { setSizeError(true); return }
    setSizeError(false)
    addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0], size: selectedSize })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <>
      <ProductModal product={product} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ background: '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div onClick={() => setModalOpen(true)} style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', background: '#f0ebe0', cursor: 'zoom-in', flexShrink: 0 }}>
          <img src={product.images[imgIdx]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', transition: 'transform 0.5s', transform: hovered ? 'scale(1.04)' : 'scale(1)' }} loading="eager" />
          {product.badge && <div style={{ position: 'absolute', top: 8, left: 8, zIndex: 2, background: 'var(--terra)', color: '#fff', padding: '3px 8px', fontSize: 8, letterSpacing: 1.5, fontFamily: 'DM Sans,sans-serif', fontWeight: 500, textTransform: 'uppercase' }}>{product.badge}</div>}
          <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 2, background: 'rgba(46,26,14,0.5)', color: 'rgba(245,238,218,0.8)', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, opacity: hovered ? 1 : 0.5, transition: 'opacity 0.3s' }}>⊕</div>
          {product.images.length > 1 && hovered && (
            <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 4, zIndex: 3 }}>
              {product.images.map((_, i) => <button key={i} onClick={e => { e.stopPropagation(); setImgIdx(i) }} style={{ width: i === imgIdx ? 14 : 5, height: 5, borderRadius: 3, border: 'none', padding: 0, background: i === imgIdx ? 'rgba(245,238,218,0.95)' : 'rgba(245,238,218,0.4)', cursor: 'pointer', transition: 'all 0.2s' }} />)}
            </div>
          )}
        </div>
        <div style={{ padding: compact ? '10px 8px 12px' : '12px 10px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: compact ? 8 : 9, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--terra)', marginBottom: 3 }}>{product.tag}</p>
          <p style={{ fontFamily: 'Playfair Display,serif', fontSize: compact ? 12 : 13, fontWeight: 400, color: 'var(--brown)', marginBottom: 4, lineHeight: 1.3 }}>{product.name}</p>
          <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: compact ? 13 : 14, color: 'var(--muted)', fontStyle: 'italic', marginBottom: 10 }}>₹{product.price.toLocaleString('en-IN')}</p>
          <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', marginBottom: 6 }}>
            {SIZES.map(size => (
              <button key={size} onClick={() => { setSelectedSize(size); setSizeError(false) }} style={{ padding: '3px 6px', fontSize: 8, letterSpacing: 1, fontFamily: 'DM Sans,sans-serif', fontWeight: 500, textTransform: 'uppercase', border: selectedSize === size ? '1.5px solid var(--terra)' : sizeError ? '1.5px solid rgba(180,60,40,0.5)' : '1.5px solid rgba(139,58,30,0.18)', background: selectedSize === size ? 'var(--terra)' : 'transparent', color: selectedSize === size ? '#fff' : 'var(--muted)', borderRadius: 1, cursor: 'pointer', transition: 'all .2s' }}>{size}</button>
            ))}
          </div>
          {sizeError && <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: 9, color: 'var(--terra)', marginBottom: 4 }}>Select a size</p>}
          <button onClick={handleAdd} style={{ marginTop: 'auto', width: '100%', padding: compact ? '9px 0' : '10px 0', background: added ? '#2d6a4f' : 'var(--brown)', color: '#fff', border: 'none', borderRadius: 1, fontFamily: 'DM Sans,sans-serif', fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', transition: 'background .3s' }}>{added ? '✓ Added' : '+ Add to Cart'}</button>
        </div>
      </div>
    </>
  )
}

function MobileCatalog() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const itemW = scrollRef.current.clientWidth * 0.62
    const idx = Math.round(scrollRef.current.scrollLeft / itemW)
    setActiveIdx(Math.min(idx, summerProducts.length - 1))
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 12px' }}>
        <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)' }}>{activeIdx + 1} of {summerProducts.length}</span>
        <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: 9, letterSpacing: 1.5, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}>Swipe ›</span>
      </div>
      <div ref={scrollRef} onScroll={handleScroll} style={{ width: '100%', overflowX: 'scroll', overflowY: 'hidden', WebkitOverflowScrolling: 'touch' as never, scrollSnapType: 'x mandatory', scrollbarWidth: 'none', display: 'flex', gap: 1, paddingLeft: 16, paddingRight: 16, paddingBottom: 4 }}>
        <style>{`.mob-scroll::-webkit-scrollbar{display:none}`}</style>
        {summerProducts.map((p, i) => (
          <div key={i} style={{ flexShrink: 0, width: 'calc(62vw - 8px)', scrollSnapAlign: 'start' }}>
            <ProductCard product={p} compact />
          </div>
        ))}
        <div style={{ flexShrink: 0, width: 16 }} />
      </div>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', padding: '12px 0 4px' }}>
        {summerProducts.map((_, i) => (
          <div key={i} style={{ width: i === activeIdx ? 20 : 6, height: 6, borderRadius: 3, background: i === activeIdx ? 'var(--terra)' : 'rgba(139,58,30,0.22)', transition: 'all 0.3s ease' }} />
        ))}
      </div>
    </div>
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
    <section id="catalog" style={{ background: '#fff', padding: 0 }}>
      <div style={{ background: '#fff', padding: '11px 16px', fontFamily: 'DM Sans,sans-serif', fontSize: isMobile ? 10 : 12, textAlign: 'center', color: 'var(--brown2)', letterSpacing: 0.3, borderBottom: '1px solid rgba(139,58,30,0.1)' }}>
        Free Shipping Above ₹3499
      </div>
      <div style={{ padding: isMobile ? '24px 0 40px' : '48px 28px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 20 : 40, padding: isMobile ? '0 16px' : 0 }}>
          <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--terra)', marginBottom: 8, fontWeight: 500 }}>Collection 2026</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'DM Sans,sans-serif', fontSize: isMobile ? 9 : 10, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, color: 'var(--brown2)', border: '1.5px solid var(--brown2)', padding: '4px 10px' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#c0392b', display: 'inline-block', animation: 'livePulse 1.6s ease-in-out infinite' }} />
              Summer Collection Now Live ♡
            </span>
          </div>
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: isMobile ? 'clamp(20px,5.5vw,28px)' : 'clamp(22px,3.5vw,44px)', fontWeight: 400, color: 'var(--brown)' }}>Shop the Collection</h2>
          <div style={{ width: 36, height: 1, background: 'rgba(139,58,30,0.3)', margin: '10px auto 0' }} />
        </div>
        {!isMobile && (
          <div className="catalog-grid-5" style={{ gap: '0 1px', background: 'rgba(139,58,30,0.06)', margin: '0 0 28px' }}>
            {summerProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
        {isMobile && <MobileCatalog />}
        <div style={{ textAlign: 'center', padding: isMobile ? '8px 16px 0' : 0 }}>
          <Link href="#" className="catalog-section-link">VIEW ALL PIECES</Link>
        </div>
      </div>
    </section>
  )
}
