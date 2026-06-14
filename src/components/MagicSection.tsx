'use client'

import Image from 'next/image'
import { useState, useRef, useCallback, useEffect } from 'react'

const pillars = [
  {
    img: '/sewingmachine.png',
    tag: 'BREATHABLE HANDLOOM',
    desc: 'Soft, airy cotton crafted for comfort, movement, and long everyday wear.',
  },
  {
    img: '/indian-body.png',
    tag: 'EASY EVERYDAY SILHOUETTES',
    desc: 'Relaxed fits designed to feel effortless, balanced, and naturally wearable.',
  },
  {
    img: '/time.png',
    tag: 'THOUGHTFUL LUXURY',
    desc: 'Timeless craftsmanship with subtle details that feel premium yet easy to live in.',
  },
]

const SWIPE_THRESHOLD = 50

export default function MagicSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const mouseStartX = useRef(0)
  const isDragging = useRef(false)
  const viewportRef = useRef<HTMLDivElement>(null)

  const totalSlides = pillars.length

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return

      let newIndex = index

      if (newIndex < 0) newIndex = totalSlides - 1
      if (newIndex >= totalSlides) newIndex = 0
      if (newIndex === currentIndex) return

      setIsTransitioning(true)
      setCurrentIndex(newIndex)

      setTimeout(() => {
        setIsTransitioning(false)
      }, 300)
    },
    [currentIndex, totalSlides, isTransitioning]
  )

  const nextSlide = useCallback(
    () => goToSlide(currentIndex + 1),
    [currentIndex, goToSlide]
  )

  const prevSlide = useCallback(
    () => goToSlide(currentIndex - 1),
    [currentIndex, goToSlide]
  )

  const handleTouchStart = (
    e: React.TouchEvent
  ) => {
    touchStartX.current =
      e.touches[0].clientX
    touchStartY.current =
      e.touches[0].clientY
  }

  const handleTouchEnd = (
    e: React.TouchEvent
  ) => {
    const endX =
      e.changedTouches[0].clientX

    const endY =
      e.changedTouches[0].clientY

    const deltaX =
      endX - touchStartX.current

    const deltaY =
      endY - touchStartY.current

    if (
      Math.abs(deltaX) >
        Math.abs(deltaY) &&
      Math.abs(deltaX) > SWIPE_THRESHOLD
    ) {
      if (deltaX > 0) {
        prevSlide()
      } else {
        nextSlide()
      }
    }
  }

  const handleMouseDown = (
    e: React.MouseEvent
  ) => {
    isDragging.current = true
    mouseStartX.current = e.clientX
    e.preventDefault()
  }

  const handleMouseUp = (
    e: React.MouseEvent
  ) => {
    if (!isDragging.current) return

    isDragging.current = false

    const deltaX =
      e.clientX - mouseStartX.current

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX > 0) {
        prevSlide()
      } else {
        nextSlide()
      }
    }
  }

  const handleMouseLeave = () => {
    isDragging.current = false
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false
    }

    window.addEventListener(
      'mouseup',
      handleGlobalMouseUp
    )

    return () =>
      window.removeEventListener(
        'mouseup',
        handleGlobalMouseUp
      )
  }, [])

  return (
    <section
      style={{
        background: '#faf7f2',
        padding:
          'clamp(64px,8vw,110px) 0 clamp(72px,8vw,110px)',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontFamily:
            'Playfair Display, serif',
          fontSize:
            'clamp(30px,4vw,52px)',
          fontWeight: 400,
          color: 'var(--terra)',
          marginBottom:
            'clamp(48px,6vw,72px)',
          padding: '0 16px',
        }}
      >
        The Magic Behind Our Pieces
      </h2>

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(8px,2vw,20px)',
          }}
        >
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            style={{
              background:
                'rgba(139,58,30,0.08)',
              border: 'none',
              borderRadius: '50%',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 24,
              color: '#8B3A1E',
              flexShrink: 0,
            }}
          >
            ❮
          </button>

          <div
            ref={viewportRef}
            style={{
              flex: 1,
              overflow: 'hidden',
              cursor: isDragging.current
                ? 'grabbing'
                : 'grab',
              userSelect: 'none',
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div
              style={{
                display: 'flex',
                transition:
                  isTransitioning
                    ? 'transform 0.3s ease-out'
                    : 'none',
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {pillars.map((pillar, i) => (
                <div
                  key={i}
                  style={{
                    flex: '0 0 100%',
                    width: '100%',
                    padding:
                      'clamp(24px,4vw,40px)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height:
                        'clamp(220px,28vw,320px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 34,
                    }}
                  >
                    <Image
                      src={pillar.img}
                      alt={pillar.tag}
                      width={260}
                      height={260}
                      style={{
                        width: 'auto',
                        height: '100%',
                        maxHeight: 260,
                        objectFit: 'contain',
                      }}
                    />
                  </div>

                  <p
                    style={{
                      fontFamily:
                        'DM Sans,sans-serif',
                      fontSize: 13,
                      letterSpacing: 4,
                      textTransform:
                        'uppercase',
                      color:
                        'var(--terra)',
                      fontWeight: 700,
                      marginBottom: 20,
                    }}
                  >
                    {pillar.tag}
                  </p>

                  <p
                    style={{
                      fontFamily:
                        'Cormorant Garamond, serif',
                      fontSize:
                        'clamp(18px,2vw,24px)',
                      color:
                        'var(--brown2)',
                      lineHeight: 1.8,
                      maxWidth: 760,
                      margin:
                        '0 auto',
                    }}
                  >
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            style={{
              background:
                'rgba(139,58,30,0.08)',
              border: 'none',
              borderRadius: '50%',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 24,
              color: '#8B3A1E',
              flexShrink: 0,
            }}
          >
            ❯
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            marginTop: 40,
          }}
        >
          {pillars.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${
                idx + 1
              }`}
              style={{
                width:
                  idx === currentIndex
                    ? 28
                    : 8,
                height: 8,
                borderRadius: 20,
                border: 'none',
                background:
                  idx === currentIndex
                    ? '#8B3A1E'
                    : 'rgba(139,58,30,0.25)',
                cursor: 'pointer',
                transition:
                  'all 0.2s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          button[aria-label="Previous slide"],
          button[aria-label="Next slide"] {
            width: 36px !important;
            height: 36px !important;
            font-size: 18px !important;
          }
        }
      `}</style>
    </section>
  )
}