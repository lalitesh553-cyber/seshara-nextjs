'use client'

import { useState, useEffect, useCallback } from 'react'

const slides = [
  { src: '/founderslide-1.png', alt: 'hi! I am prasanna — founder of seshara' },
  { src: '/banner-1.png',       alt: 'The new soft life girl — seshara' },
  { src: '/banner-2.png',       alt: 'Seshara — not boring workwear' },
]

function LaceBorder({ flip = false }: { flip?: boolean }) {
  const dots1 = Array.from({ length: 108 }, (_, i) => i)
  const dots2 = Array.from({ length: 108 }, (_, i) => i)
  const scallops = Array.from({ length: 36 }, (_, i) => i)
  return (
    <div style={{ lineHeight: 0, transform: flip ? 'scaleY(-1)' : 'none' }}>
      <svg viewBox="0 0 1440 52" preserveAspectRatio="none"
        style={{ width: '100%', height: 52, display: 'block' }}>
        {dots1.map(i => (
          <circle key={i} cx={i * 13.3 + 6} cy={7} r={2.2} fill="rgba(180,165,145,0.22)" />
        ))}
        {dots2.map(i => (
          <circle key={i} cx={i * 13.3 + 12.6} cy={13} r={1.4} fill="rgba(180,165,145,0.14)" />
        ))}
        <path
          d={'M0,52 L0,32 ' +
            scallops.map(i => {
              const x = i * 40
              return `C${x+4},10 ${x+16},10 ${x+20},30 C${x+24},50 ${x+36},10 ${x+40},30`
            }).join(' ') +
            ' L1440,52 Z'}
          fill="#faf7f2"
        />
      </svg>
    </div>
  )
}

export default function FounderBannerScroll() {
  const [current, setCurrent]     = useState(0)
  const [prev, setPrev]           = useState<number | null>(null)
  const [dir, setDir]             = useState<'left' | 'right'>('left')
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((next: number, direction: 'left' | 'right' = 'left') => {
    if (animating || next === current) return
    setDir(direction)
    setPrev(current)
    setCurrent(next)
    setAnimating(true)
    setTimeout(() => { setPrev(null); setAnimating(false) }, 460)
  }, [animating, current])

  const goNext = useCallback(() => goTo((current + 1) % slides.length, 'left'),  [current, goTo])
  const goPrev = useCallback(() => goTo((current - 1 + slides.length) % slides.length, 'right'), [current, goTo])

  useEffect(() => {
    const t = setTimeout(goNext, 5000)
    return () => clearTimeout(t)
  }, [current, goNext])

  const enterFrom = dir === 'left' ? '100%' : '-100%'
  const exitTo    = dir === 'left' ? '-100%' : '100%'

  return (
    <section style={{ background: '#fff', margin: 0, padding: 0, lineHeight: 0 }}>

      <div style={{ background: '#fff', lineHeight: 0 }}>
        <LaceBorder />
      </div>

      <div style={{
        background: '#faf7f2',
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '1080 / 932',
        width: '100%',
        lineHeight: 0,
      }}>

        {slides.map((s, i) => {
          const isActive  = i === current
          const isLeaving = i === prev

          let transform = 'translateX(100%)'
          if (isActive)  transform = animating ? `translateX(${enterFrom})` : 'translateX(0%)'
          if (isLeaving) transform = `translateX(${exitTo})`
          if (isActive && !animating) transform = 'translateX(0%)'

          const visible = isActive || isLeaving
          if (!visible) return null

          return (
            <div key={i} style={{
              position: 'absolute', inset: 0,
              transform,
              transition: 'transform 0.46s cubic-bezier(0.4,0,0.2,1)',
              zIndex: isActive ? 2 : 1,
              lineHeight: 0,
            }}>
              <img
                src={s.src}
                alt={s.alt}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  display: 'block',
                }}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          )
        })}

        {/* Prev arrow */}
        <button onClick={goPrev} aria-label="Previous" style={{
          position: 'absolute', left: 20, top: '50%',
          transform: 'translateY(-50%)', zIndex: 10,
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(245,240,232,0.85)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(139,58,30,0.2)',
          color: '#5c3620', fontSize: 22, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          lineHeight: 1,
        }}>&#8249;</button>

        {/* Next arrow */}
        <button onClick={goNext} aria-label="Next" style={{
          position: 'absolute', right: 20, top: '50%',
          transform: 'translateY(-50%)', zIndex: 10,
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(245,240,232,0.85)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(139,58,30,0.2)',
          color: '#5c3620', fontSize: 22, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          lineHeight: 1,
        }}>&#8250;</button>

        {/* Dot indicators */}
        <div style={{
          position: 'absolute', bottom: 20, left: '50%',
          transform: 'translateX(-50%)', zIndex: 10,
          display: 'flex', gap: 8, alignItems: 'center',
        }}>
          {slides.map((_, i) => (
            <button key={i}
              onClick={() => goTo(i, i > current ? 'left' : 'right')}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? 24 : 8,
                height: 8, borderRadius: 4,
                border: 'none', padding: 0, cursor: 'pointer',
                background: i === current
                  ? '#8b3a1e'
                  : 'rgba(139,58,30,0.3)',
                transition: 'all 0.35s ease',
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 3, background: 'rgba(139,58,30,0.1)', zIndex: 10,
        }}>
          <div key={`progress-${current}`} style={{
            height: '100%',
            background: '#8b3a1e',
            animation: 'slideProgress 5s linear forwards',
          }} />
        </div>
      </div>

      <div style={{ background: '#faf7f2', lineHeight: 0 }}>
        <LaceBorder flip />
      </div>

      <style>{`
        @keyframes slideProgress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </section>
  )
}
