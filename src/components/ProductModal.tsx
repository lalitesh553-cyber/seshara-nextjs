'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'

const SIZES = ['XS', 'S', 'M', 'L', 'XL']

const getAccordionSections = (productId: number) => [
  { title: 'Product Details', content: 'Handwoven with traditional techniques. Breathable fabric perfect for all-day comfort.' },
  { title: 'Material & Craft', content: '100% handloom cotton / linen blend. Ethically crafted by artisan communities.' },
  { title: 'Care Instructions', content: 'Gentle machine wash in cold water. Do not bleach. Iron on medium heat.' },
  { title: 'Shipping & Returns', content: 'Free shipping above ₹999. Easy 7-day returns. Cash on delivery available.' }
]

interface Product {
  id: number
  name: string
  tag: string
  price: number
  badge?: string | null
  images: string[]
}

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addItem } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0)

  useEffect(() => {
    if (!isOpen) {
      setSelectedImage(0)
      setSelectedSize('')
      setSizeError(false)
      setAdded(false)
      setQuantity(1)
      setActiveAccordion(0)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
        if (e.key === 'ArrowRight') setSelectedImage(i => (i + 1) % (product?.images.length || 1))
        if (e.key === 'ArrowLeft') setSelectedImage(i => (i - 1 + (product?.images.length || 1)) % (product?.images.length || 1))
      }
      window.addEventListener('keydown', handleKey)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKey)
      }
    }
  }, [isOpen, onClose, product?.images.length])

  if (!isOpen || !product) return null

  const accordionSections = getAccordionSections(product.id)

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return }
    setSizeError(false)
    // Add item once, then call addItem again for each additional quantity
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0], size: selectedSize })
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    if (!selectedSize) { setSizeError(true); return }
    setSizeError(false)
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0], size: selectedSize })
    }
  }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: 1100, width: '100%', maxHeight: '90vh', background: '#fff', borderRadius: 12, overflowY: 'auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', width: 36, height: 36, borderRadius: '50%', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        <div style={{ flex: '1.2', minWidth: '280px', padding: 20, background: '#faf7f2' }}>
          <div style={{ aspectRatio: '3/4', background: '#ede5d8', marginBottom: 12 }}>
            <img src={product.images[selectedImage]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
              {product.images.map((img, idx) => (
                <button key={idx} onClick={() => setSelectedImage(idx)} style={{ border: idx === selectedImage ? '2px solid var(--terra)' : '1px solid rgba(139,58,30,0.2)', background: '#fff', padding: 2, cursor: 'pointer', flexShrink: 0, width: 60, height: 80 }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div style={{ flex: '1', minWidth: '280px', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--terra)', marginBottom: 6 }}>{product.tag}</p>
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(18px,4vw,26px)', fontWeight: 400, color: 'var(--brown)', marginBottom: 8 }}>{product.name}</h2>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 20, color: 'var(--muted)', fontStyle: 'italic' }}>₹{product.price.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: 9, letterSpacing: 1.5, marginBottom: 6, color: 'var(--brown2)' }}>Select Size</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SIZES.map(size => (
                <button key={size} onClick={() => { setSelectedSize(size); setSizeError(false) }} style={{ padding: '6px 12px', fontSize: 10, fontFamily: 'DM Sans,sans-serif', fontWeight: 500, border: selectedSize === size ? '1.5px solid var(--terra)' : (sizeError ? '1.5px solid rgba(180,60,40,0.6)' : '1.5px solid rgba(139,58,30,0.2)'), background: selectedSize === size ? 'var(--terra)' : 'transparent', color: selectedSize === size ? '#fff' : 'var(--muted)', cursor: 'pointer', transition: 'all 0.2s' }}>{size}</button>
              ))}
            </div>
            {sizeError && <p style={{ fontSize: 9, color: 'var(--terra)', marginTop: 6 }}>Please select a size</p>}
          </div>
          <div>
            <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: 9, letterSpacing: 1.5, marginBottom: 6 }}>Quantity</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(139,58,30,0.3)', background: '#fff', cursor: 'pointer' }}>−</button>
              <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: 14 }}>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(139,58,30,0.3)', background: '#fff', cursor: 'pointer' }}>+</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button onClick={handleAddToCart} style={{ flex: 1, background: added ? '#2d6a4f' : 'var(--brown)', color: '#fff', padding: '12px 0', border: 'none', fontFamily: 'DM Sans,sans-serif', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}>{added ? '✓ Added to Cart' : 'Add to Cart'}</button>
            <button onClick={handleBuyNow} style={{ flex: 1, background: 'transparent', border: '1.5px solid var(--brown)', color: 'var(--brown)', padding: '12px 0', fontFamily: 'DM Sans,sans-serif', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }}>Buy Now</button>
          </div>
          <div style={{ marginTop: 8, borderTop: '1px solid rgba(139,58,30,0.1)' }}>
            {accordionSections.map((section, idx) => (
              <div key={idx} style={{ borderBottom: '1px solid rgba(139,58,30,0.1)' }}>
                <button onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 500, color: 'var(--brown2)' }}>{section.title}<span style={{ fontSize: 16 }}>{activeAccordion === idx ? '−' : '+'}</span></button>
                {activeAccordion === idx && <p style={{ fontSize: 12, fontFamily: 'DM Sans,sans-serif', color: '#5a3e2b', paddingBottom: 12, lineHeight: 1.5 }}>{section.content}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
