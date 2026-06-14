'use client'

import { useState } from 'react'

interface ShippingDetails {
  name: string
  email: string
  phone: string
  address: string
  city: string
  pincode: string
}

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (details: ShippingDetails) => void
  loading: boolean
}

export default function ShippingDetailsModal({ open, onClose, onSubmit, loading }: Props) {
  const [details, setDetails] = useState<ShippingDetails>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  })
  const [errors, setErrors] = useState<Partial<ShippingDetails>>({})

  const validate = (): boolean => {
    const newErrors: Partial<ShippingDetails> = {}
    if (!details.name.trim()) newErrors.name = 'Name is required'
    if (!details.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(details.email)) newErrors.email = 'Invalid email'
    if (!details.phone.trim()) newErrors.phone = 'Phone is required'
    else if (!/^\d{10}$/.test(details.phone)) newErrors.phone = '10-digit mobile number'
    if (!details.address.trim()) newErrors.address = 'Address is required'
    if (!details.city.trim()) newErrors.city = 'City is required'
    if (!details.pincode.trim()) newErrors.pincode = 'Pincode is required'
    else if (!/^\d{6}$/.test(details.pincode)) newErrors.pincode = '6-digit pincode'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) onSubmit(details)
  }

  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1200,
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 520, width: '100%', background: '#fff',
          borderRadius: 12, overflow: 'hidden',
          fontFamily: 'var(--sans)',
        }}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(139,58,30,0.1)' }}>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 20, fontWeight: 400, color: 'var(--brown)', margin: 0 }}>
            Shipping Details
          </h2>
          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>We need these to process your order</p>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--brown2)', fontWeight: 500 }}>Full Name</label>
            <input
              type="text"
              value={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', marginTop: 4, border: `1px solid ${errors.name ? '#c0392b' : 'rgba(139,58,30,0.2)'}`, borderRadius: 2, fontSize: 14 }}
            />
            {errors.name && <p style={{ color: '#c0392b', fontSize: 10, marginTop: 2 }}>{errors.name}</p>}
          </div>
          <div>
            <label style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--brown2)', fontWeight: 500 }}>Email</label>
            <input
              type="email"
              value={details.email}
              onChange={(e) => setDetails({ ...details, email: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', marginTop: 4, border: `1px solid ${errors.email ? '#c0392b' : 'rgba(139,58,30,0.2)'}`, borderRadius: 2, fontSize: 14 }}
            />
            {errors.email && <p style={{ color: '#c0392b', fontSize: 10, marginTop: 2 }}>{errors.email}</p>}
          </div>
          <div>
            <label style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--brown2)', fontWeight: 500 }}>Phone (10 digits)</label>
            <input
              type="tel"
              value={details.phone}
              onChange={(e) => setDetails({ ...details, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              style={{ width: '100%', padding: '10px 12px', marginTop: 4, border: `1px solid ${errors.phone ? '#c0392b' : 'rgba(139,58,30,0.2)'}`, borderRadius: 2, fontSize: 14 }}
            />
            {errors.phone && <p style={{ color: '#c0392b', fontSize: 10, marginTop: 2 }}>{errors.phone}</p>}
          </div>
          <div>
            <label style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--brown2)', fontWeight: 500 }}>Address</label>
            <textarea
              rows={2}
              value={details.address}
              onChange={(e) => setDetails({ ...details, address: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', marginTop: 4, border: `1px solid ${errors.address ? '#c0392b' : 'rgba(139,58,30,0.2)'}`, borderRadius: 2, fontSize: 14, resize: 'vertical' }}
            />
            {errors.address && <p style={{ color: '#c0392b', fontSize: 10, marginTop: 2 }}>{errors.address}</p>}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--brown2)', fontWeight: 500 }}>City</label>
              <input
                type="text"
                value={details.city}
                onChange={(e) => setDetails({ ...details, city: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', marginTop: 4, border: `1px solid ${errors.city ? '#c0392b' : 'rgba(139,58,30,0.2)'}`, borderRadius: 2, fontSize: 14 }}
              />
              {errors.city && <p style={{ color: '#c0392b', fontSize: 10, marginTop: 2 }}>{errors.city}</p>}
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--brown2)', fontWeight: 500 }}>Pincode</label>
              <input
                type="text"
                value={details.pincode}
                onChange={(e) => setDetails({ ...details, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                style={{ width: '100%', padding: '10px 12px', marginTop: 4, border: `1px solid ${errors.pincode ? '#c0392b' : 'rgba(139,58,30,0.2)'}`, borderRadius: 2, fontSize: 14 }}
              />
              {errors.pincode && <p style={{ color: '#c0392b', fontSize: 10, marginTop: 2 }}>{errors.pincode}</p>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button
              type="button"
              onClick={onClose}
              style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid rgba(139,58,30,0.3)', borderRadius: 2, cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{ flex: 1, padding: '12px', background: 'var(--terra)', color: '#fff', border: 'none', borderRadius: 2, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Processing...' : 'Proceed to Pay'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
