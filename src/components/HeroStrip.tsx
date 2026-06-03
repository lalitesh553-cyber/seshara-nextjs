'use client'

import { useState, useEffect } from 'react'

const heroCards = [
  { src: '/hero-1.png', sub: 'Hand-Embroidery' },
  { src: '/hero-2.png', sub: 'Checks' },
  { src: '/hero-3.png', sub: 'Hand-Embroidery' },
  { src: '/hero-4.png', sub: 'Kalamkari' },
  { src: '/hero-5.png', sub: 'Kalamkari' },
  { src: '/hero-6.png', sub: 'Solid with check accents' },
]

const doubled = [...heroCards, ...heroCards]

export default function HeroStrip() {
  const [playing, setPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const cardWidth = isMobile ? '100vw' : 'clamp(240px, 24vw, 390px)'
  const cardHeight = isMobile ? 'clamp(380px, 85vw, 520px)' : 'clamp(440px, 76vh, 720px)'

  const renderCard = (card: typeof heroCards[0], i: number) => (
    <div
      key={i}
      style={{
        flexShrink: 0,
        width: cardWidth,
        height: cardHeight,
        position: 'relative',
        background: 'var(--cream)',
        overflow: 'hidden',
      }}
    >
      <img
        src={card.src}
        alt={card.sub}
        loading={i < 3 ? 'eager' : 'lazy'}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top center',
          display: 'block',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(40,18,6,0.65) 0%, rgba(40,18,6,0.08) 42%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'absolute', bottom: 24, left: 18, right: 18 }}>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: isMobile ? 'clamp(14px, 4vw, 18px)' : 'clamp(12px, 1.2vw, 16px)',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.85)',
            fontWeight: 500,
            margin: 0,
          }}
        >
          {card.sub}
        </p>
      </div>
    </div>
  )

  return (
    <section style={{ position: 'relative', width: '100%', background: 'var(--cream)' }}>
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0,
          display: 'block',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: playing ? 'heroScroll 36s linear infinite' : 'none',
          }}
        >
          {doubled.map((c, i) => renderCard(c, i))}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: playing ? 32 : 0,
            height: 1,
            background: 'rgba(201,169,110,0.4)',
            transition: 'width 0.5s',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 8,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: 'rgba(139,58,30,0.45)',
            minWidth: 30,
          }}
        >
          {playing ? 'Live' : 'Paused'}
        </span>
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause' : 'Play'}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(46,26,14,0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(201,169,110,0.35)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {playing ? (
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <rect x="1.5" y="1" width="3" height="10" rx="1" fill="rgba(201,169,110,0.9)" />
              <rect x="7.5" y="1" width="3" height="10" rx="1" fill="rgba(201,169,110,0.9)" />
            </svg>
          ) : (
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 1.5L11 6L2 10.5V1.5Z" fill="rgba(201,169,110,0.9)" />
            </svg>
          )}
        </button>
      </div>

      <style>
        {`
          @keyframes heroScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </section>
  )
}