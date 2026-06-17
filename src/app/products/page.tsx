// src/app/products/page.tsx
// SERVER COMPONENT — no 'use client', no styled-jsx, no hooks.
// .products-grid class is defined in globals.css and is NEVER hidden
// on mobile (unlike .catalog-grid-5/.catalog-grid-4 which are homepage-only).

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { products } from '@/lib/products'

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const category = searchParams.category

  // Safe filter: checks if category field exists before comparing.
  // If your products don't have a .category field, all products show instead
  // of a blank page.
  const filteredProducts =
    category === 'men' || category === 'women'
      ? products.filter((p) => {
          const cat = (p as unknown as Record<string, string>).category
          return cat === category
        })
      : products

  // If filter returns nothing (category field missing/different), show all
  const displayProducts =
    filteredProducts.length > 0 ? filteredProducts : products

  const pageTitle =
    category === 'men'   ? "Men's Wear"   :
    category === 'women' ? "Women's Wear" :
    'Shop All Pieces'

  return (
    <>
      <Navbar />

      <main
        style={{
          background: '#faf7f2',
          minHeight: '100vh',
          // 32px announcement bar + 72px nav = 104px total header
          paddingTop: 104,
        }}
      >
        <section
          style={{
            maxWidth: 1440,
            margin: '0 auto',
            padding: '40px 24px 80px',
          }}
        >
          {/* Page header */}
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: 'var(--terra)',
                marginBottom: 12,
              }}
            >
              Seshara Collection
            </p>

            <h1
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(32px, 5vw, 60px)',
                fontWeight: 400,
                color: 'var(--brown)',
                marginBottom: 12,
              }}
            >
              {pageTitle}
            </h1>

            <p
              style={{
                maxWidth: 700,
                margin: '0 auto',
                color: 'var(--muted)',
                lineHeight: 1.8,
                fontSize: 15,
              }}
            >
              Thoughtfully crafted garments inspired by India&apos;s handloom
              heritage. Timeless, breathable and designed for everyday wear.
            </p>
          </div>

          {/*
            .products-grid is defined in globals.css:
              desktop:  repeat(5, 1fr)
              tablet:   repeat(3, 1fr)   [max-width: 1024px]
              mobile:   repeat(2, 1fr)   [max-width: 768px]
            It is NEVER hidden — completely separate class from
            .catalog-grid-5 / .catalog-grid-4 (homepage-only classes).
          */}
          <div className="products-grid">
            {displayProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                style={{
                  textDecoration: 'none',
                  background: '#fff',
                  display: 'block',
                }}
              >
                {/* Image */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '3/4',
                    overflow: 'hidden',
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
                      display: 'block',
                    }}
                  />

                  {product.badge && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        background: 'var(--terra)',
                        color: '#fff',
                        padding: '4px 10px',
                        fontSize: 9,
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                      }}
                    >
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: '14px 12px 18px' }}>
                  <p
                    style={{
                      fontSize: 9,
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                      color: 'var(--terra)',
                      marginBottom: 5,
                    }}
                  >
                    {product.tag}
                  </p>

                  <h3
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: 'clamp(13px, 1.5vw, 18px)',
                      fontWeight: 400,
                      color: 'var(--brown)',
                      marginBottom: 6,
                      lineHeight: 1.35,
                    }}
                  >
                    {product.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(16px, 1.8vw, 22px)',
                      color: 'var(--muted)',
                      fontStyle: 'italic',
                    }}
                  >
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
