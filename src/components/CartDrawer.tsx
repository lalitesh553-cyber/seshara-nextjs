'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import ShippingDetailsModal from './ShippingDetailsModal'

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, count, total, removeItem, updateQty, checkoutWithShipping, checkoutLoading } = useCart()
  const [shippingModalOpen, setShippingModalOpen] = useState(false)

  const handleProceedToCheckout = () => {
    setShippingModalOpen(true)
  }

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(20,10,4,0.45)',
            zIndex: 1100, backdropFilter: 'blur(4px)',
          }}
        />
      )}

      <aside style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'clamp(320px, 38vw, 480px)',
        background: '#faf7f2',
        zIndex: 1101,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.38s cubic-bezier(0.32,0,0.15,1)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-8px 0 40px rgba(20,10,4,0.18)',
      }}>
        <div style={{
          padding: '22px 28px',
          borderBottom: '1px solid rgba(139,58,30,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#fff',
        }}>
          <div>
            <p style={{ fontFamily: 'var(--display)', fontSize: 20, fontWeight: 400, color: 'var(--brown)', letterSpacing: 1 }}>
              Your Cart
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', marginTop: 2 }}>
              {count} {count === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: '1px solid rgba(139,58,30,0.2)',
              width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--brown2)', fontSize: 18, transition: 'all .2s',
            }}
          >×</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 28px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ fontFamily: 'var(--script)', fontSize: 22, color: 'var(--terra)', marginBottom: 10 }}>
                your cart is empty
              </p>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 13, color: 'var(--muted)', fontStyle: 'italic' }}>
                Add pieces from our Summer Collection ♡
              </p>
            </div>
          ) : items.map((item, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '72px 1fr auto',
              gap: 14, padding: '16px 0',
              borderBottom: '1px solid rgba(139,58,30,0.08)',
              alignItems: 'start',
            }}>
              <div style={{ position: 'relative', width: 72, height: 96, borderRadius: 2, overflow: 'hidden' }}>
                <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--display)', fontSize: 14, fontWeight: 400, color: 'var(--brown)', marginBottom: 4, lineHeight: 1.3 }}>
                  {item.name}
                </p>
               <p
  style={{
    fontFamily: 'var(--sans)',
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: 'var(--muted)',
    marginBottom: 6,
  }}
>
  Size: {item.size}
</p>

<p
  style={{
    fontSize: 11,
    color: 'var(--terra)',
    marginBottom: 6,
  }}
>
  {item.orderType === 'custom'
    ? 'Custom Measurements'
    : 'Standard Size'}
</p>

{item.measurements && (
  <p
    style={{
      fontSize: 10,
      color: 'var(--muted)',
      marginBottom: 10,
    }}
  >
    Measurements Saved ✓
  </p>
)}
  
                <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid rgba(139,58,30,0.2)', width: 'fit-content', borderRadius: 2 }}>
                  <button
                    onClick={() => updateQty(item.id, item.size, item.quantity - 1)}
                    style={{ width: 28, height: 28, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brown2)', fontSize: 16 }}
                  >−</button>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--brown)', minWidth: 24, textAlign: 'center' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, item.size, item.quantity + 1)}
                    style={{ width: 28, height: 28, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brown2)', fontSize: 16 }}
                  >+</button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--terra)', fontStyle: 'italic' }}>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </p>
                <button
                  onClick={() => removeItem(item.id, item.size)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(139,58,30,0.4)', fontSize: 11, letterSpacing: 1, fontFamily: 'var(--sans)', textTransform: 'uppercase' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div style={{ padding: '20px 28px 28px', background: '#fff', borderTop: '1px solid rgba(139,58,30,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)' }}>Subtotal</p>
              <p style={{ fontFamily: 'var(--display)', fontSize: 20, fontWeight: 400, color: 'var(--brown)' }}>
                ₹{total.toLocaleString('en-IN')}
              </p>
            </div>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 12, color: 'var(--muted)', fontStyle: 'italic', marginBottom: 18 }}>
              Shipping & taxes calculated at checkout
            </p>
            {total < 999 && (
              <div style={{ background: 'rgba(139,58,30,0.06)', padding: '10px 14px', borderRadius: 2, marginBottom: 16 }}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--terra)', letterSpacing: 0.5 }}>
                  Add ₹{(999 - total).toLocaleString('en-IN')} more for free shipping ♡
                </p>
              </div>
            )}
            <button
              onClick={handleProceedToCheckout}
              disabled={checkoutLoading}
              style={{
                width: '100%', padding: '16px 0',
                background: checkoutLoading ? 'rgba(139,58,30,0.6)' : 'var(--terra)',
                color: '#fff', border: 'none', borderRadius: 2, cursor: checkoutLoading ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 500,
                transition: 'background .25s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              }}
            >
              {checkoutLoading ? (
                <>
                  <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
                  Processing...
                </>
              ) : (
                <>Proceed to Checkout — ₹{total.toLocaleString('en-IN')}</>
              )}
            </button>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 11, color: 'var(--muted)', fontStyle: 'italic', textAlign: 'center', marginTop: 12 }}>
              Secured by Razorpay · UPI · Cards · NetBanking
            </p>
          </div>
        )}
      </aside>

      <ShippingDetailsModal
        open={shippingModalOpen}
        onClose={() => setShippingModalOpen(false)}
        onSubmit={async (details) => {
          await checkoutWithShipping(details)
          setShippingModalOpen(false)
          onClose()
        }}
        loading={checkoutLoading}
      />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  )
}
