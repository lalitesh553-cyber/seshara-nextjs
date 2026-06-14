'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { products } from '@/lib/products'

function ProductCard({
  product,
}: {
  product: (typeof products)[0]
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`/products/${product.slug}`}
      style={{
        textDecoration: 'none',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: '3/4',
          background: '#f0ebe0',
        }}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            transition: 'transform .4s ease',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />

        {product.badge && (
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              background: 'var(--terra)',
              color: '#fff',
              padding: '4px 8px',
              fontSize: 8,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            {product.badge}
          </div>
        )}
      </div>

      <div
        style={{
          padding: '14px 12px 18px',
        }}
      >
        <p
          style={{
            fontSize: 9,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'var(--terra)',
            marginBottom: 4,
          }}
        >
          {product.tag}
        </p>

        <h3
          style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 400,
            color: 'var(--brown)',
            lineHeight: 1.3,
            marginBottom: 6,
          }}
        >
          {product.name}
        </h3>

        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 18,
            fontStyle: 'italic',
            color: 'var(--muted)',
            marginBottom: 10,
          }}
        >
          ₹{product.price.toLocaleString('en-IN')}
        </p>

        <span
          style={{
            fontSize: 10,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--terra)',
            fontWeight: 600,
          }}
        >
          View Details →
        </span>
      </div>
    </Link>
  )
}

function MobileCatalog() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        overflowX: 'auto',
        paddingBottom: 12,
        scrollSnapType: 'x mandatory',
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            flex: '0 0 72%',
            scrollSnapAlign: 'center',
          }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}

export default function CatalogSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () =>
      setIsMobile(window.innerWidth <= 768)

    check()

    window.addEventListener('resize', check)

    return () =>
      window.removeEventListener('resize', check)
  }, [])

  return (
    <section
      id="catalog"
      style={{
        padding: '80px 24px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: 48,
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: 'var(--terra)',
            marginBottom: 10,
          }}
        >
          Seshara Collection
        </p>

        <h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px,5vw,56px)',
            fontWeight: 400,
            color: 'var(--brown)',
            marginBottom: 14,
          }}
        >
          Timeless Handcrafted Pieces
        </h2>

        <p
          style={{
            maxWidth: 680,
            margin: '0 auto',
            color: 'var(--muted)',
            lineHeight: 1.8,
          }}
        >
          Thoughtfully crafted garments inspired by
          India’s handloom heritage and designed for
          everyday elegance.
        </p>
      </div>

      {!isMobile ? (
        <div
          className="catalog-grid-5"
          style={{
            gap: '1px',
            background: 'rgba(139,58,30,0.06)',
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <MobileCatalog />
      )}

      <div
        style={{
          textAlign: 'center',
          marginTop: 36,
        }}
      >
        <Link
          href="/products"
          className="catalog-section-link"
        >
          VIEW ALL PIECES
        </Link>
      </div>
    </section>
  )
}