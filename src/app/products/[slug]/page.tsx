// src/app/products/[slug]/page.tsx
//
// ROLE: Client Component — individual product detail page (PDP).
// 'use client' is required: useState, touch events, cart context.
// styled-jsx IS valid in Client Components.
// All mobile styles are scoped here — no pollution of globals.css.

'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import CustomMeasurementModal, {
  CustomMeasurements,
} from '@/components/CustomMeasurementModal'
import SizeGuideModal from '@/components/SizeGuideModal'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCart } from '@/context/CartContext'
import { getProductBySlug, products } from '@/lib/products'

const SIZES = ['XS', 'S', 'M', 'L', 'XL']

/* ─────────────────────────────────────────────────────
   YouMayAlsoLike — works identically on all screen sizes.
   Uses window.innerWidth at render time (client component)
   to decide layout. No CSS class dependency.

   Mobile  (≤768px): horizontal scroll strip, each card 68vw wide.
                     Shows ~1.3 cards → hints there are more → swipe.
                     Matches H&M "Others Also Bought" behaviour.
   Desktop (>768px): 4-column grid.
───────────────────────────────────────────────────── */
function YouMayAlsoLike({
  items,
}: {
  items: { id: number; name: string; price: number; images: string[]; slug: string }[]
}) {
  const [isMobile, setIsMobile] = useState(false)

  // useEffect — only runs on client, safe to read window
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section style={{ marginTop: 80 }}>
      <h2
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(22px, 3vw, 32px)',
          fontWeight: 400,
          textAlign: 'center',
          marginBottom: isMobile ? 24 : 40,
          color: 'var(--brown)',
          letterSpacing: '-0.01em',
        }}
      >
        You May Also Like
      </h2>

      {isMobile ? (
        /* ── MOBILE: horizontal scroll strip ── */
        <div
          style={{
            display: 'flex',
            gap: 12,
            overflowX: 'auto',
            overflowY: 'hidden',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            paddingBottom: 8,
            /* Bleed to edges — parent has 24px padding each side */
            marginLeft: -24,
            marginRight: -24,
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.slug}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                background: '#fff',
                display: 'block',
                flexShrink: 0,
                width: '68vw',
                maxWidth: 260,
                scrollSnapAlign: 'start',
              }}
            >
              <img
                src={item.images[0]}
                alt={item.name}
                style={{
                  width: '100%',
                  aspectRatio: '3/4',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                }}
              />
              <div style={{ padding: '12px 10px 16px' }}>
                <h3
                  style={{
                    color: 'var(--brown)',
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: 400,
                    fontSize: 14,
                    marginBottom: 6,
                    lineHeight: 1.3,
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    color: 'var(--terra)',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontStyle: 'italic',
                    fontSize: 17,
                  }}
                >
                  ₹{item.price.toLocaleString('en-IN')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* ── DESKTOP: 4-column grid ── */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: 'rgba(139,58,30,0.06)',
          }}
        >
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.slug}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                background: '#fff',
                display: 'block',
              }}
            >
              <img
                src={item.images[0]}
                alt={item.name}
                style={{
                  width: '100%',
                  aspectRatio: '3/4',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                }}
              />
              <div style={{ padding: '14px 12px 20px' }}>
                <h3
                  style={{
                    color: 'var(--brown)',
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: 400,
                    fontSize: 16,
                    marginBottom: 8,
                    lineHeight: 1.3,
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    color: 'var(--terra)',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontStyle: 'italic',
                    fontSize: 20,
                  }}
                >
                  ₹{item.price.toLocaleString('en-IN')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = getProductBySlug(params.slug)
  const { addItem } = useCart()

  const [selectedImage,   setSelectedImage]   = useState(0)
  const [selectedSize,    setSelectedSize]    = useState('')
  const [added,           setAdded]           = useState(false)
  const [orderType,       setOrderType]       = useState<'standard' | 'custom'>('standard')
  const [showModal,       setShowModal]       = useState(false)
  const [showSizeGuide,   setShowSizeGuide]   = useState(false)
  const [measurements,    setMeasurements]    = useState<CustomMeasurements | null>(null)
  const [openSection,     setOpenSection]     = useState<string | null>(null)
  const [touchStartX,     setTouchStartX]     = useState<number | null>(null)

  if (!product) notFound()

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  // Touch handlers for swipe gallery
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    const delta = touchStartX - e.changedTouches[0].clientX
    if (Math.abs(delta) < 40) return
    if (delta > 0) {
      setSelectedImage((i) => (i + 1) % product.images.length)
    } else {
      setSelectedImage((i) => (i - 1 + product.images.length) % product.images.length)
    }
    setTouchStartX(null)
  }

  const handleAddToCart = () => {
    if (!selectedSize) { alert('Please select a size'); return }
    if (orderType === 'custom' && !measurements) {
      alert('Please enter your measurements'); return
    }
    addItem({
      id:           product.id,
      name:         product.name,
      price:        product.price,
      image:        product.images[0],
      size:         selectedSize,
      orderType,
      measurements: orderType === 'custom' ? measurements || undefined : undefined,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const accordionItems = [
    { title: 'Description & Fit',  content: product.description },
    { title: 'Materials',          content: 'Premium handloom cotton crafted by Indian artisans.' },
    { title: 'Care Guide',         content: 'Gentle hand wash or machine wash in cold water.' },
    { title: 'Shipping & Returns', content: 'Made-to-order pieces ship within 7–10 working days.' },
  ]

  return (
    <>
      <Navbar />
      <div style={{ height: 72 }} />

      <main style={{ background: '#faf7f2', minHeight: '100vh' }}>
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding: '32px 24px 80px',
          }}
        >

          {/* Breadcrumb */}
          <div
            style={{
              marginBottom: 30,
              fontSize: 12,
              color: 'var(--muted)',
              letterSpacing: 1,
            }}
          >
            <Link href="/"         style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            {' / '}
            <Link href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Products</Link>
            {' / '}
            {product.name}
          </div>

          {/* ─────────────────────────────────────────
              PRODUCT LAYOUT: 2-col desktop, 1-col mobile
          ───────────────────────────────────────── */}
          <div className="pdp-layout">

            {/* LEFT — Gallery */}
            <div>

              {/* MOBILE gallery: full-width swipe */}
              <div
                className="gallery-mobile"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <div
                  className="gallery-track"
                  style={{ transform: `translateX(-${selectedImage * 100}%)` }}
                >
                  {product.images.map((img, idx) => (
                    <div key={idx} className="gallery-slide">
                      <img
                        src={img}
                        alt={idx === 0 ? product.name : ''}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'top center',
                          display: 'block',
                        }}
                      />
                    </div>
                  ))}
                </div>

                {product.images.length > 1 && (
                  <div className="gallery-dots">
                    {product.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={idx === selectedImage ? 'dot dot-on' : 'dot'}
                        aria-label={`Image ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* DESKTOP gallery: static image + thumbnails */}
              <div className="gallery-desktop">
                <div
                  style={{
                    background: '#fff',
                    aspectRatio: '3/4',
                    overflow: 'hidden',
                    marginBottom: 16,
                  }}
                >
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      display: 'block',
                    }}
                  />
                </div>

                {product.images.length > 1 && (
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        style={{
                          border: selectedImage === idx
                            ? '2px solid var(--terra)'
                            : '1px solid rgba(139,58,30,.15)',
                          padding: 0, background: 'none', cursor: 'pointer',
                        }}
                      >
                        <img
                          src={img} alt=""
                          style={{ width: 90, height: 110, objectFit: 'cover', display: 'block' }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT — Product info */}
            <div>

              {/* Tag */}
              <p
                style={{
                  color: 'var(--terra)',
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                  fontSize: 11,
                  marginBottom: 10,
                }}
              >
                {product.tag}
              </p>

              {/* Name */}
              <h1
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 400,
                  fontSize: 'clamp(28px, 4vw, 52px)',
                  color: 'var(--brown)',
                  marginBottom: 14,
                  lineHeight: 1.15,
                }}
              >
                {product.name}
              </h1>

              {/* Price */}
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 34,
                  color: 'var(--terra)',
                  marginBottom: 24,
                  fontStyle: 'italic',
                }}
              >
                ₹{product.price.toLocaleString('en-IN')}
              </p>

              {/* Description */}
              <p
                style={{
                  color: 'var(--muted)',
                  lineHeight: 1.8,
                  marginBottom: 30,
                  fontSize: 15,
                }}
              >
                {product.description}
              </p>

              {/* Size selector */}
              <h3 style={{ marginBottom: 14, color: 'var(--brown)', fontSize: 15 }}>
                Select Size
              </h3>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '10px 18px',
                      cursor: 'pointer',
                      border: selectedSize === size
                        ? '2px solid var(--terra)'
                        : '1px solid rgba(139,58,30,.15)',
                      background: selectedSize === size ? 'var(--terra)' : '#fff',
                      color:      selectedSize === size ? '#fff' : 'var(--brown)',
                      fontSize: 13,
                      transition: '.2s',
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Size Guide link */}
              <div style={{ textAlign: 'right', marginBottom: 24 }}>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  style={{
                    background: 'none', border: 'none',
                    color: 'var(--brown)',
                    fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase',
                    cursor: 'pointer', fontWeight: 600,
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  SIZE GUIDE
                </button>
              </div>

              {/* Order type */}
              <div
                style={{
                  marginBottom: 32,
                  padding: 18,
                  background: '#fff',
                  border: '1px solid rgba(139,58,30,.1)',
                }}
              >
                <h3 style={{ marginBottom: 14, color: 'var(--brown)', fontSize: 15 }}>
                  Order Type
                </h3>

                <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    checked={orderType === 'standard'}
                    onChange={() => setOrderType('standard')}
                  />
                  Standard Size
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: orderType === 'custom' ? 16 : 0, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    checked={orderType === 'custom'}
                    onChange={() => setOrderType('custom')}
                  />
                  Custom Measurements
                </label>

                {orderType === 'custom' && (
                  <>
                    <button
                      onClick={() => setShowModal(true)}
                      style={{
                        padding: '12px 18px',
                        border: '1px solid var(--terra)',
                        background: '#fff',
                        color: 'var(--terra)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    >
                      {measurements ? '✓ Measurements Saved' : 'Enter Measurements'}
                    </button>
                    <p style={{ marginTop: 10, color: 'var(--muted)', fontSize: 13 }}>
                      Fill in your custom body measurements for a personalized fit.
                    </p>
                  </>
                )}
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                style={{
                  width: '100%',
                  padding: 18,
                  border: 'none',
                  cursor: 'pointer',
                  background: added ? '#2d6a4f' : 'var(--terra)',
                  color: '#fff',
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 24,
                  transition: 'background .3s',
                }}
              >
                {added ? '✓ Added To Cart' : 'Add To Cart'}
              </button>

              {/* Accordion */}
              <div style={{ borderTop: '1px solid rgba(139,58,30,.12)' }}>
                {accordionItems.map((item) => (
                  <div key={item.title} style={{ borderBottom: '1px solid rgba(139,58,30,.08)' }}>
                    <button
                      onClick={() => setOpenSection(openSection === item.title ? null : item.title)}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        padding: '18px 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        color: 'var(--brown)',
                        fontSize: 15,
                        textAlign: 'left',
                      }}
                    >
                      <span>{item.title}</span>
                      <span style={{ fontSize: 18, lineHeight: 1 }}>
                        {openSection === item.title ? '−' : '+'}
                      </span>
                    </button>
                    {openSection === item.title && (
                      <div
                        style={{
                          paddingBottom: 18,
                          color: 'var(--muted)',
                          lineHeight: 1.8,
                          fontSize: 14,
                        }}
                      >
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>{/* end right column */}
          </div>{/* end pdp-layout */}

          {/* YOU MAY ALSO LIKE
              Desktop: 4-col grid via className
              Mobile: horizontal scroll via isMobile state — pure inline styles,
                      zero className dependency, guaranteed to work
          */}
          <YouMayAlsoLike items={relatedProducts} />
        </div>

        {/* ─────────────────────────────────────────
            SCOPED STYLES — valid because 'use client'
        ───────────────────────────────────────── */}
        <style jsx>{`

          /* ── 2-col layout collapses at 900px ── */
          .pdp-layout {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 60px;
          }
          @media (max-width: 900px) {
            .pdp-layout {
              grid-template-columns: 1fr;
              gap: 0;
            }
          }

          /* ── Gallery: desktop shows static, mobile shows swipe ── */
          .gallery-mobile  { display: none; }
          .gallery-desktop { display: block; }

          /* Related section uses inline styles — see YouMayAlsoLike component below */

          /* ══ MOBILE ≤768px ══ */
          @media (max-width: 768px) {

            /* Switch gallery */
            .gallery-desktop { display: none; }
            .gallery-mobile {
              display: block;
              position: relative;
              /* Bleed to screen edges (parent padding is 24px each side) */
              width: calc(100% + 48px);
              margin-left: -24px;
              aspect-ratio: 3/4;
              overflow: hidden;
              background: #fff;
              margin-bottom: 24px;
            }

            .gallery-track {
              display: flex;
              height: 100%;
              transition: transform 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94);
              will-change: transform;
            }

            .gallery-slide {
              flex: 0 0 100%;
              width: 100%;
              height: 100%;
            }

            /* Dot indicators */
            .gallery-dots {
              position: absolute;
              bottom: 14px;
              left: 0; right: 0;
              display: flex;
              justify-content: center;
              gap: 8px;
              z-index: 2;
            }
            .dot {
              width: 7px; height: 7px;
              border-radius: 50%;
              border: none; padding: 0;
              background: rgba(255,255,255,0.5);
              cursor: pointer;
              transition: background .2s, transform .2s;
            }
            .dot-on {
              background: #fff;
              transform: scale(1.3);
            }

            /* Related section uses inline styles via YouMayAlsoLike component */
          }
        `}</style>
      </main>

      <CustomMeasurementModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={(data) => { setMeasurements(data); setShowModal(false) }}
      />

      <SizeGuideModal
        open={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />

      <Footer />
    </>
  )
}
