'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  size: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  count: number
  total: number
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: number, size: string) => void
  updateQty: (id: number, size: string, qty: number) => void
  clearCart: () => void
  checkout: () => Promise<void>
  checkoutLoading: boolean
}

const CartContext = createContext<CartContextType | null>(null)

declare global {
  interface Window {
    Razorpay: any
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise(resolve => {
    if (window.Razorpay) { resolve(true); return }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload  = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems]             = useState<CartItem[]>([])
  const [checkoutLoading, setLoading] = useState(false)

  const count = items.reduce((s, i) => s + i.quantity, 0)
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === item.id && i.size === item.size)
      if (exists) return prev.map(i =>
        i.id === item.id && i.size === item.size ? { ...i, quantity: i.quantity + 1 } : i
      )
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((id: number, size: string) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.size === size)))
  }, [])

  const updateQty = useCallback((id: number, size: string, qty: number) => {
    if (qty <= 0) { removeItem(id, size); return }
    setItems(prev => prev.map(i =>
      i.id === id && i.size === size ? { ...i, quantity: qty } : i
    ))
  }, [removeItem])

  const clearCart = useCallback(() => setItems([]), [])

  const checkout = useCallback(async () => {
    if (items.length === 0) return
    setLoading(true)

    const loaded = await loadRazorpayScript()
    if (!loaded) {
      setLoading(false)
      alert('Could not load payment gateway. Please check your connection.')
      return
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    if (!keyId) {
      setLoading(false)
      alert('Payment gateway not configured. Please contact support.')
      return
    }

    try {
      // Step 1 — Create order on backend
      const res = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(total * 100), // paise
          currency: 'INR',
          notes: {
            items: items.map(i => `${i.name} (${i.size}) ×${i.quantity}`).join(', '),
          },
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.orderId) {
        setLoading(false)
        alert(`Order creation failed: ${data.error || 'Please try again.'}`)
        return
      }

      // Step 2 — Open Razorpay with order_id
      const options = {
        key:         keyId,
        amount:      data.amount,
        currency:    data.currency,
        order_id:    data.orderId,
        name:        'Seshara',
        description: `${count} item${count > 1 ? 's' : ''} — Summer Collection 2026`,
        image:       '/favicon.ico',
        prefill:     { name: '', email: '', contact: '' },
        theme:       { color: '#8b3a1e' },
        modal: {
          confirm_close: true,
          ondismiss: () => setLoading(false),
        },
        handler: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          setLoading(false)
          clearCart()
          alert(`✓ Payment successful!\nPayment ID: ${response.razorpay_payment_id}\n\nThank you for shopping with Seshara ♡`)
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', (resp: { error: { description: string } }) => {
        setLoading(false)
        alert(`Payment failed: ${resp.error?.description || 'Please try again.'}`)
      })
      rzp.open()

    } catch (err) {
      setLoading(false)
      console.error('Checkout error:', err)
      alert('Something went wrong. Please try again.')
    }
  }, [items, total, count, clearCart])

  return (
    <CartContext.Provider value={{ items, count, total, addItem, removeItem, updateQty, clearCart, checkout, checkoutLoading }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
