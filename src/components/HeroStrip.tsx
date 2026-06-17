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

// triple copy prevents safari blank gaps
const infiniteCards = [
  ...heroCards,
  ...heroCards,
  ...heroCards,
]

export default function HeroStrip() {
  const [playing, setPlaying] = useState(true)
  const [screen, setScreen] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth

      if (w <= 768) {
        setScreen('mobile')
      } else if (w <= 1024) {
        setScreen('tablet')
      } else {
        setScreen('desktop')
      }
    }

    update()
    window.addEventListener('resize', update)

    return () => window.removeEventListener('resize', update)
  }, [])

  const getWidth = () => {
    if (screen === 'mobile') return '100vw'
    if (screen === 'tablet') return '45vw'
    return 'clamp(260px, 24vw, 390px)'
  }

  const getHeight = () => {
    if (screen === 'mobile') return '70vh'
    if (screen === 'tablet') return '78vh'
    return 'clamp(500px, 78vh, 760px)'
  }

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        background: 'var(--cream)',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: playing
            ? 'heroScroll 42s linear infinite'
            : 'none',
          willChange: 'transform',
        }}
      >
        {infiniteCards.map((card, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: getWidth(),
              height: getHeight(),
              position: 'relative',
              overflow: 'hidden',
              background: 'var(--cream)',
            }}
          >
            <img
              src={card.src}
              alt={card.sub}
              loading={i < 6 ? 'eager' : 'lazy'}
              draggable={false}
              style={{
                width: '100%',
                height: '100%',

                // IMPORTANT FIX
                objectFit: 'contain',

                objectPosition: 'center bottom',

                display: 'block',
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(40,18,6,.58) 0%, rgba(40,18,6,.06) 45%, transparent 65%)',
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: 24,
                left: 18,
                right: 18,
              }}
            >
              <p
                style={{
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: 'rgba(255,255,255,.9)',
                  fontSize:
                    screen === 'mobile'
                      ? '14px'
                      : '13px',
                }}
              >
                {card.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
          zIndex: 50,
        }}
      >
        <button
          onClick={() => setPlaying(!playing)}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '1px solid rgba(201,169,110,.4)',
            background: 'rgba(46,26,14,.6)',
            cursor: 'pointer',
            color: '#fff',
          }}
        >
          {playing ? '❚❚' : '▶'}
        </button>
      </div>

      <style jsx>{`
        @keyframes heroScroll {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  )
}