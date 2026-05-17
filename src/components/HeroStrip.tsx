'use client'

import { useState, useRef, useEffect } from 'react'

const heroCards = [
  { src: '/hero-1.png', title: 'Comfort, Woven\nInto Every Day', sub: 'Handloom Cotton', label: 'made with\nintention' },
  { src: '/hero-2.png', title: 'Ease You\nCan Feel', sub: 'Premium Linen Blend', label: 'crafted\nslowly' },
  { src: '/hero-3.png', title: 'Comfort in\nEvery Thread', sub: 'Kalamkari Block Print', label: 'made with\nintention' },
  { src: '/hero-4.png', title: 'Breathe\nEasy', sub: 'Naturally Breathable', label: 'crafted\nslowly' },
  { src: '/hero-5.png', title: 'Soft in\nSpirit', sub: 'Hand-Embroidered Detail', label: 'made with\nintention' },
  { src: '/hero-6.png', title: 'Earthy\nCharm', sub: 'Featherlight Cotton', label: 'crafted\nslowly' },
]

const doubled = [...heroCards, ...heroCards]

export default function HeroStrip() {
  const [playing, setPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Mobile auto-advance
  useEffect(() => {
    if (!isMobile) return
    autoRef.current = setTimeout(() => {
      const next = (activeIdx + 1) % heroCards.length
      scrollToIdx(next)
    }, 4500)
    return () => { if (autoRef.current) clearTimeout(autoRef.current) }
  }, [isMobile, activeIdx])

  const scrollToIdx = (idx: number) => {
    if (!wrapperRef.current) return
    setActiveIdx(idx)
    wrapperRef.current.scrollTo({ left: idx * wrapperRef.current.clientWidth, behavior: 'smooth' })
  }

  const handleScroll = () => {
    if (!wrapperRef.current) return
    const idx = Math.round(wrapperRef.current.scrollLeft / wrapperRef.current.clientWidth)
    if (idx !== activeIdx) setActiveIdx(Math.min(idx, heroCards.length - 1))
  }

  return (
    <section style={{ position: 'relative', width: '100%', background: 'var(--cream)' }}>

      {/* Wrapper: mobile = snap scroll, desktop = overflow hidden */}
      <div
        ref={wrapperRef}
        className={`hero-strip-wrapper${isMobile ? ' mobile-mode' : ''}`}
        onScroll={isMobile ? handleScroll : undefined}
      >
        <div className="hero-strip" style={{ animationPlayState: playing ? 'running' : 'paused' }}>
          {(isMobile ? heroCards : doubled).map((card, i) => (
            <div key={i} className="hero-card">
              <img src={card.src} alt={card.title} loading={i < 2 ? 'eager' : 'lazy'} />
              <div className="hero-card-overlay" />
              <div className="hero-card-top" style={{ whiteSpace: 'pre-line' }}>{card.label}</div>
              <div className="hero-card-text">
                <p className="title">{card.title}</p>
                <p className="sub">{card.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: dots + swipe hint */}
      {isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 0 6px', background: 'var(--cream)' }}>
          {heroCards.map((_, i) => (
            <button key={i} onClick={() => scrollToIdx(i)} style={{
              width: i === activeIdx ? 22 : 7, height: 7, borderRadius: 4,
              border: 'none', padding: 0, cursor: 'pointer',
              background: i === activeIdx ? 'var(--terra)' : 'rgba(139,58,30,0.25)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      )}

      {/* Desktop: play/pause */}
      {!isMobile && (
        <div style={{ position: 'absolute', bottom: 18, right: 18, zIndex: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: playing ? 32 : 0, height: 1, background: 'rgba(201,169,110,0.4)', transition: 'width 0.5s' }} />
          <span style={{ fontFamily: 'var(--sans)', fontSize: 8, letterSpacing: 2.5, textTransform: 'uppercase', color: 'rgba(139,58,30,0.45)', minWidth: 30 }}>
            {playing ? 'Live' : 'Paused'}
          </span>
          <button onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause' : 'Play'} style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(46,26,14,0.6)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(201,169,110,0.35)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {playing
              ? <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><rect x="1.5" y="1" width="3" height="10" rx="1" fill="rgba(201,169,110,0.9)"/><rect x="7.5" y="1" width="3" height="10" rx="1" fill="rgba(201,169,110,0.9)"/></svg>
              : <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 1.5L11 6L2 10.5V1.5Z" fill="rgba(201,169,110,0.9)"/></svg>
            }
          </button>
        </div>
      )}
    </section>
  )
}
