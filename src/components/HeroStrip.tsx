'use client'

import Image from 'next/image'
import { useState } from 'react'

const heroCards = [
  { src: '/hero-1.png', title: 'Comfort, Woven\nInto Every Day', sub: 'Handloom Cotton', label: 'made with\nintention' },
  { src: '/hero-2.png', title: 'Ease You\nCan Feel', sub: 'Premium Linen Blend', label: 'crafted\nslowly' },
  { src: '/hero-3.png', title: 'Comfort in\nEvery Thread', sub: 'Kalamkari Block Print', label: 'made with\nintention' },
  { src: '/hero-4.png', title: 'Breathe\nEasy', sub: 'Naturally Breathable', label: 'crafted\nslowly' },
  { src: '/hero-5.png', title: 'Soft in\nSpirit', sub: 'Hand-Embroidered Detail', label: 'made with\nintention' },
  { src: '/hero-6.png', title: 'Earthy\nCharm', sub: 'Featherlight Cotton', label: 'crafted\nslowly' },
]

function HeroCard({ src, title, sub, label }: (typeof heroCards)[0]) {
  return (
    <div className="hero-card">
      <Image src={src} alt={title} fill style={{ objectFit: 'cover', objectPosition: 'top center' }} />
      <div className="hero-card-overlay" />
      <div className="hero-card-top" style={{ whiteSpace: 'pre-line' }}>{label}</div>
      <div className="hero-card-text">
        <p className="title" style={{ whiteSpace: 'pre-line' }}>{title}</p>
        <p className="sub">{sub}</p>
      </div>
    </div>
  )
}

export default function HeroStrip() {
  const [playing, setPlaying] = useState(true)
  const doubled = [...heroCards, ...heroCards]

  return (
    <section style={{ position: 'relative', width: '100%', overflow: 'hidden', background: 'var(--cream)' }}>

      {/* ── Scrolling strip ── */}
      <div className="hero-strip" style={{ animationPlayState: playing ? 'running' : 'paused' }}>
        {doubled.map((card, i) => (
          <HeroCard key={i} {...card} />
        ))}
      </div>

      {/* ── Play / Pause control — bottom-right corner, on-brand ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 28,
          right: 36,
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {/* thin decorative line */}
        <div style={{
          width: playing ? 48 : 0,
          height: 1,
          background: 'rgba(201,169,110,0.4)',
          transition: 'width 0.5s ease',
        }} />

        {/* status label */}
        <span style={{
          fontFamily: 'var(--sans)',
          fontSize: 9,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: 'rgba(201,169,110,0.55)',
          transition: 'opacity 0.3s',
          opacity: playing ? 1 : 0.4,
          minWidth: 36,
        }}>
          {playing ? 'Live' : 'Paused'}
        </span>

        {/* button */}
        <button
          onClick={() => setPlaying(p => !p)}
          aria-label={playing ? 'Pause scroll' : 'Resume scroll'}
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'rgba(46,26,14,0.65)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(201,169,110,0.4)',
            color: 'rgba(245,238,218,0.9)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.25s ease',
            flexShrink: 0,
          }}
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="1.5" width="3.5" height="11" rx="1.2" fill="rgba(201,169,110,0.9)" />
              <rect x="8.5" y="1.5" width="3.5" height="11" rx="1.2" fill="rgba(201,169,110,0.9)" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 1.8L12.5 7L3 12.2V1.8Z" fill="rgba(201,169,110,0.9)" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Scroll hint bottom-left (only when playing) ── */}
      {playing && (
        <div style={{
          position: 'absolute',
          bottom: 32,
          left: 36,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          opacity: 0.45,
          pointerEvents: 'none',
        }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 8, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--muted)' }}>
            scroll
          </span>
          <div className="scroll-line" style={{ width: 1, height: 28, background: 'var(--muted)' }} />
        </div>
      )}
    </section>
  )
}
