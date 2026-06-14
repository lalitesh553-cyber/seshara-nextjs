// src/app/products/page.tsx

import Link from 'next/link'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import { products } from '@/lib/products'

export default function ProductsPage({
  searchParams,
}: {
  searchParams: {
    category?: string
  }
}) {
  const category = searchParams.category

  const filteredProducts =
    category === 'men' || category === 'women'
      ? products.filter(
          (product) => product.category === category
        )
      : products

  const pageTitle =
    category === 'men'
      ? "Men's Wear"
      : category === 'women'
      ? "Women's Wear"
      : 'Shop All Pieces'

  return (
    <>
      <Navbar />

      <main
        style={{
          background: '#faf7f2',
          minHeight: '100vh',
          paddingTop: 72,
        }}
      >
        <section
          style={{
            maxWidth: 1440,
            margin: '0 auto',
            padding: '40px 24px 80px',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: 50,
            }}
          >
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
                fontSize: 'clamp(32px,5vw,60px)',
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
              }}
            >
              Thoughtfully crafted garments inspired by
              India's handloom heritage. Timeless,
              breathable and designed for everyday wear.
            </p>
          </div>

          <div
            className="catalog-grid-5"
            style={{
              gap: '1px',
              background: 'rgba(139,58,30,0.06)',
            }}
          >
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                style={{
                  textDecoration: 'none',
                  background: '#fff',
                  display: 'block',
                  transition: 'all .3s ease',
                }}
              >
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
                      transition: 'transform .4s ease',
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

                <div
                  style={{
                    padding: '16px 14px 20px',
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                      color: 'var(--terra)',
                      marginBottom: 6,
                    }}
                  >
                    {product.tag}
                  </p>

                  <h3
                    style={{
                      fontFamily:
                        'Playfair Display, serif',
                      fontSize: 18,
                      fontWeight: 400,
                      color: 'var(--brown)',
                      marginBottom: 8,
                      lineHeight: 1.4,
                    }}
                  >
                    {product.name}
                  </h3>

                  <p
                    style={{
                      fontFamily:
                        'Cormorant Garamond, serif',
                      fontSize: 22,
                      color: 'var(--muted)',
                      fontStyle: 'italic',
                      marginBottom: 10,
                    }}
                  >
                    ₹
                    {product.price.toLocaleString(
                      'en-IN'
                    )}
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
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}