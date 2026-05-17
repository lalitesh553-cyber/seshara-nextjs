'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DesignYours() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  const tools = [
    { icon: '◻', label: 'IDENTITY' },
    { icon: '✎', label: 'STYLE' },
    { icon: '◎', label: 'AURA' },
    { icon: '⊕', label: 'FOCUS' },
    { icon: '✐', label: 'STORY' },
    { icon: '✦', label: 'EXPRESSION' },
    { icon: 'A', label: 'VOICE' },
    { icon: '⟋', label: 'PATH' },
    { icon: '▭', label: 'FRAME' },
    { icon: '◯', label: 'SHAPE' },
    { icon: '∿', label: 'ENERGY' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>

      {/* Top bar */}
      <div style={{ background: 'var(--terra)', padding: '8px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 28s linear infinite' }}>
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} style={{ color: '#fff', fontSize: 10, letterSpacing: 2.5, fontWeight: 500, fontFamily: 'var(--sans)', marginRight: 48, whiteSpace: 'nowrap' }}>
              DESIGN YOURS · COMING SOON · SESHARA CREATIVE STUDIO ·
            </span>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px clamp(16px,4vw,52px)', background: 'rgba(245,240,232,0.97)', borderBottom: '1px solid rgba(139,58,30,0.08)' }}>
        <Link href="/" style={{ fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          ← Back
        </Link>
        <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(16px,2vw,22px)', letterSpacing: 6, textTransform: 'uppercase', color: 'var(--terra)', fontWeight: 600 }}>SESHARA</div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)' }}>TOOLS v 1.0</div>
      </nav>

      {/* Main layout */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'clamp(64px,6vw,90px) 1fr clamp(280px,38vw,520px)', minHeight: 'calc(100vh - 120px)' }}>

        {/* Left toolbar */}
        <div style={{ background: 'rgba(245,240,232,0.6)', borderRight: '1px solid rgba(139,58,30,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0', gap: 4 }}>
          {/* Select (active) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 8px', background: 'var(--terra)', borderRadius: 4, marginBottom: 8, width: '80%', cursor: 'pointer' }}>
            <span style={{ fontSize: 16, color: '#fff' }}>✦</span>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 7.5, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>SELECT</span>
          </div>
          {tools.map(t => (
            <div key={t.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '8px 6px', borderRadius: 4, width: '80%', cursor: 'pointer', transition: 'background .2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(139,58,30,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: 15, color: 'var(--brown2)' }}>{t.icon}</span>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 7, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 500 }}>{t.label}</span>
            </div>
          ))}
          <div style={{ marginTop: 'auto', padding: '12px 8px', width: '80%' }}>
            <div style={{ width: '100%', height: 2, background: 'rgba(139,58,30,0.15)', borderRadius: 1 }}>
              <div style={{ width: '30%', height: '100%', background: 'var(--terra)', borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* Center — coming soon content */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(32px,6vw,80px) clamp(24px,5vw,72px)' }}>

          {/* Eyebrow */}
          <p style={{ fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--terra)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12, fontWeight: 500 }}>
            <span style={{ display: 'inline-block', width: 28, height: 1, background: 'var(--terra)' }} />
            Seshara Creative Studio
          </p>

          {/* Headline — pixel/dot style */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: 'clamp(48px,8vw,96px)',
              fontWeight: 700,
              color: 'var(--brown)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              marginBottom: 0,
            }}>
              CREATE
            </h1>
            <h1 style={{
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: 'clamp(48px,8vw,96px)',
              fontWeight: 700,
              color: 'var(--terra)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}>
              YOURS.
            </h1>
          </div>

          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(10px,1.1vw,12px)', letterSpacing: 3, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 28, lineHeight: 1.8 }}>
            Design your outfit.<br />Create your identity.
          </p>

          {/* Divider */}
          <div style={{ width: 40, height: 2, background: 'var(--terra)', marginBottom: 32 }} />

          {/* Coming soon */}
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(18px,2.5vw,30px)', fontWeight: 400, color: 'var(--terra)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>
            Coming Soon
          </h2>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(14px,1.4vw,17px)', color: 'var(--muted)', lineHeight: 1.85, fontStyle: 'italic', marginBottom: 40, maxWidth: 420 }}>
            We&apos;re crafting something timeless.<br />
            Stay close. Your story begins soon.
          </p>

          {/* Email signup */}
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 0, maxWidth: 440 }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  flex: 1, padding: '14px 18px',
                  border: '1px solid rgba(139,58,30,0.25)',
                  borderRight: 'none',
                  background: 'rgba(255,255,255,0.8)',
                  fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--brown)',
                  outline: 'none', borderRadius: '2px 0 0 2px',
                }}
              />
              <button type="submit" style={{
                padding: '14px 22px',
                background: 'var(--terra)', color: '#fff',
                border: 'none', cursor: 'pointer',
                fontFamily: 'var(--sans)', fontSize: 10,
                letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 500,
                borderRadius: '0 2px 2px 0',
                display: 'flex', alignItems: 'center', gap: 8,
                whiteSpace: 'nowrap',
              }}>
                Notify Me →
              </button>
            </form>
          ) : (
            <div style={{ padding: '16px 20px', background: 'rgba(139,58,30,0.06)', border: '1px solid rgba(139,58,30,0.15)', borderRadius: 2, maxWidth: 440 }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--terra)', fontStyle: 'italic' }}>
                ✓ You&apos;re on the list! We&apos;ll reach out soon ♡
              </p>
            </div>
          )}
          <p style={{ fontFamily: 'var(--serif)', fontSize: 12, color: 'var(--muted)', fontStyle: 'italic', marginTop: 14 }}>
            Be the first to experience Seshara.
          </p>
        </div>

        {/* Right — model illustration */}
        <div style={{
          background: 'var(--cream)',
          borderLeft: '1px solid rgba(139,58,30,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20, position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative grid lines */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.04 }}>
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} style={{ position: 'absolute', left: `${i * 8.33}%`, top: 0, bottom: 0, width: 1, background: 'var(--terra)' }} />
            ))}
            {Array.from({ length: 16 }, (_, i) => (
              <div key={i} style={{ position: 'absolute', top: `${i * 6.25}%`, left: 0, right: 0, height: 1, background: 'var(--terra)' }} />
            ))}
          </div>
          <img
            src="/modeltouse.png"
            alt="Design your outfit — Seshara Creative Studio"
            style={{
              width: '100%', maxWidth: 420, height: 'auto',
              objectFit: 'contain', display: 'block',
              position: 'relative', zIndex: 1,
              filter: 'drop-shadow(0 20px 40px rgba(139,58,30,0.15))',
            }}
          />
        </div>
      </div>

      {/* Footer bar */}
      <div style={{ background: 'var(--brown)', padding: '16px clamp(16px,4vw,52px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'rgba(245,240,232,0.35)', letterSpacing: 1 }}>© SESHARA 2026</p>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 13, color: 'rgba(245,240,232,0.3)', fontStyle: 'italic', letterSpacing: 2 }}>CREATED TO INSPIRE. MADE TO LAST.</p>
        <div style={{ display: 'flex', gap: 24 }}>
          {['INSTAGRAM', 'YOUTUBE'].map(s => (
            <a key={s} href="#" style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'rgba(245,240,232,0.35)', textDecoration: 'none', letterSpacing: 1.5 }}>{s}</a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @media (max-width: 768px) {
          .design-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
