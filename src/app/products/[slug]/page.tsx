'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import CustomMeasurementModal, {
  CustomMeasurements,
} from '@/components/CustomMeasurementModal'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import { useCart } from '@/context/CartContext'
import { getProductBySlug, products } from '@/lib/products'

const SIZES = ['XS', 'S', 'M', 'L', 'XL']

export default function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = getProductBySlug(params.slug)

  const { addItem } = useCart()

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [added, setAdded] = useState(false)
const [orderType, setOrderType] = useState<
  'standard' | 'custom'
>('standard')

const [showMeasurementModal, setShowMeasurementModal] =
  useState(false)
const [measurements, setMeasurements] =
  useState<CustomMeasurements | null>(null)
const [openSection, setOpenSection] =
  useState<string | null>(null)
  if (!product) {
    notFound()
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
if (
  orderType === 'custom' &&
  !measurements
) {
  alert(
    'Please enter your measurements'
  )
  return
}
  addItem({
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.images[0],

  size: selectedSize,

  orderType,

  measurements:
    orderType === 'custom'
      ? measurements || undefined
      : undefined,
})

    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 1500)
  }

  return (
    <>
      <Navbar />

      <div style={{ height: 72 }} />

      <main
        style={{
          background: '#faf7f2',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding: '32px 24px 80px',
          }}
        >
          <div
            style={{
              marginBottom: 30,
              fontSize: 12,
              color: 'var(--muted)',
              letterSpacing: 1,
            }}
          >
            <Link
              href="/"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Home
            </Link>

            {' / '}

            <Link
              href="/products"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Products
            </Link>

            {' / '}

            {product.name}
          </div>

          <div
            className="product-layout"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: 60,
            }}
          >
            <div>
              <div
  className="product-main-image"
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
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                  }}
                />
              </div>

              {product.images.length > 1 && (
  <div
    style={{
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap',
    }}
  >
    {product.images.map((image, idx) => (
      <button
        key={idx}
        onClick={() => setSelectedImage(idx)}
        style={{
          border:
            selectedImage === idx
              ? '2px solid var(--terra)'
              : '1px solid rgba(139,58,30,.15)',
          padding: 0,
          background: 'none',
          cursor: 'pointer',
        }}
      >
        <img
          src={image}
          alt=""
          style={{
            width: 90,
            height: 110,
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </button>
    ))}
  </div>
)}
            </div>

            <div>
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

              <h1
  className="mobile-product-title"
  style={{
    fontFamily:
      'Playfair Display, serif',
                  fontWeight: 400,
                  fontSize: 'clamp(32px,4vw,52px)',
                  color: 'var(--brown)',
                  marginBottom: 14,
                  lineHeight: 1.15,
                }}
              >
                {product.name}
              </h1>

              <p
  className="mobile-product-price"
  style={{
    fontFamily:
      'Cormorant Garamond, serif',
                  fontSize: 34,
                  color: 'var(--terra)',
                  marginBottom: 24,
                  fontStyle: 'italic',
                }}
              >
                ₹{product.price.toLocaleString('en-IN')}
              </p>

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

              <h3
                style={{
                  marginBottom: 14,
                  color: 'var(--brown)',
                  fontSize: 15,
                }}
              >
                Select Size
              </h3>

              <div
  style={{
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 24,
  }}
>
  {SIZES.map((size) => (
    <button
      key={size}
      onClick={() => setSelectedSize(size)}
      style={{
        padding: '10px 18px',
        cursor: 'pointer',
        border:
          selectedSize === size
            ? '2px solid var(--terra)'
            : '1px solid rgba(139,58,30,.15)',
        background:
          selectedSize === size
            ? 'var(--terra)'
            : '#fff',
        color:
          selectedSize === size
            ? '#fff'
            : 'var(--brown)',
        transition: '.2s',
      }}
    >
      {size}
    </button>
  ))}
</div>

<div
  style={{
    marginBottom: 32,
    padding: '18px',
    background: '#fff',
    border: '1px solid rgba(139,58,30,.1)',
  }}
>
  <h3
    style={{
      marginBottom: 14,
      color: 'var(--brown)',
      fontSize: 15,
    }}
  >
    Order Type
  </h3>

  <label
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12,
      cursor: 'pointer',
    }}
  >
    <input
      type="radio"
      checked={orderType === 'standard'}
      onChange={() =>
        setOrderType('standard')
      }
    />
    Standard Size
  </label>

  <label
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 16,
      cursor: 'pointer',
    }}
  >
    <input
      type="radio"
      checked={orderType === 'custom'}
      onChange={() =>
        setOrderType('custom')
      }
    />
    Custom Measurements
  </label>

  {orderType === 'custom' && (
    <>
      <button
        onClick={() =>
          setShowMeasurementModal(true)
        }
        style={{
          padding: '12px 18px',
          border: '1px solid var(--terra)',
          background: '#fff',
          color: 'var(--terra)',
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        {measurements
          ? '✓ Measurements Saved'
          : 'Enter Measurements'}
      </button>

      <p
        style={{
          marginTop: 10,
          color: 'var(--muted)',
          fontSize: 13,
        }}
      >
        Fill in your custom body measurements
        for a personalized fit.
      </p>
    </>
  )}
</div>

<button
  onClick={handleAddToCart}
  style={{
    width: '100%',
    padding: '18px',
    border: 'none',
    cursor: 'pointer',
    background:
      added ? '#2d6a4f' : 'var(--terra)',
    color: '#fff',
    letterSpacing: 3,
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 24,
  }}
>
  {added
    ? '✓ Added To Cart'
    : 'Add To Cart'}
</button>

              <div className="mobile-accordion">
  {[
    {
      title: 'Description & Fit',
      content: product.description,
    },
    {
      title: 'Materials',
      content:
        'Premium handloom cotton crafted by Indian artisans.',
    },
    {
      title: 'Care Guide',
      content:
        'Gentle hand wash or machine wash in cold water.',
    },
    {
      title: 'Shipping & Returns',
      content:
        'Made-to-order pieces ship within 7–10 working days.',
    },
  ].map((section) => (
    <div
      key={section.title}
      className="accordion-item"
    >
      <button
        className="accordion-header"
        onClick={() =>
          setOpenSection(
            openSection === section.title
              ? null
              : section.title
          )
        }
      >
        <span>{section.title}</span>

        <span>
          {openSection === section.title
            ? '−'
            : '+'}
        </span>
      </button>

      {openSection === section.title && (
        <div className="accordion-content">
          {section.content}
        </div>
      )}
    </div>
  ))}
</div>
            </div> 
          </div> 

          <section
            style={{
              marginTop: 80,
            }}
          >
            <h2
              style={{
                fontFamily:
                  'Playfair Display, serif',
                fontSize: 34,
                fontWeight: 400,
                textAlign: 'center',
                marginBottom: 40,
                color: 'var(--brown)',
              }}
            >
              You May Also Like
            </h2>

            <div className="catalog-grid-4 mobile-related-products">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  style={{
                    textDecoration: 'none',
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
                      display: 'block',
                    }}
                  />

                  <div
                    style={{
                      padding: 16,
                    }}
                  >
                    <h3
                      style={{
                        color: 'var(--brown)',
                        fontWeight: 400,
                        marginBottom: 8,
                      }}
                    >
                      {item.name}
                    </h3>

                    <p
                      style={{
                        color: 'var(--terra)',
                      }}
                    >
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div> 

      <style jsx>{`
  @media (max-width: 900px) {
    .product-layout {
      grid-template-columns: 1fr !important;
      gap: 24px !important;
    }
  }

  @media (max-width: 768px) {
  .product-main-image {
    margin-left: -24px;
    margin-right: -24px;
  }

  .product-main-image img {
    border-radius: 0 !important;
  }

    .mobile-product-title {
    font-size: 42px !important;
    line-height: 1.05 !important;
    margin-top: 12px;
  }

  .mobile-product-price {
    font-size: 38px !important;
  }

  .mobile-accordion {
    margin-top: 20px;
    border-top: 1px solid rgba(139,58,30,.12);
  }

    .accordion-item {
      border-bottom: 1px solid rgba(139,58,30,.08);
    }

    .accordion-header {
      width: 100%;
      background: none;
      border: none;
      padding: 18px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      color: var(--brown);
      font-size: 15px;
    }

    .accordion-content {
      padding-bottom: 18px;
      color: var(--muted);
      line-height: 1.8;
      font-size: 14px;
    }

    .mobile-sticky-cart {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fff;
      border-top: 1px solid rgba(139,58,30,.12);
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 9999;
    }

    .mobile-sticky-cart button {
      min-width: 160px;
    }

    main {
      padding-bottom: 90px;
    }
  }

  @media (min-width: 769px) {
    .mobile-sticky-cart {
      display: none;
    }
  }
`}</style>
      </main>
<CustomMeasurementModal
  open={showMeasurementModal}
  onClose={() =>
    setShowMeasurementModal(false)
  }
  onSave={(data) => {
    setMeasurements(data)
    setShowMeasurementModal(false)
  }}
/>
<div className="mobile-sticky-cart">
  <div>
    <p
      style={{
        margin: 0,
        color: 'var(--brown)',
        fontWeight: 600,
      }}
    >
      ₹{product.price.toLocaleString('en-IN')}
    </p>

    <span
      style={{
        fontSize: 11,
        color: 'var(--muted)',
      }}
    >
      {orderType === 'custom'
        ? 'Custom Measurements'
        : 'Standard Size'}
    </span>
  </div>

  <button
    onClick={handleAddToCart}
    style={{
      background: 'var(--terra)',
      color: '#fff',
      border: 'none',
      padding: '14px 24px',
      cursor: 'pointer',
      letterSpacing: 2,
      textTransform: 'uppercase',
      fontSize: 11,
      fontWeight: 600,
    }}
  >
    Add To Cart
  </button>
</div>
      <Footer />
    </>
  )
}