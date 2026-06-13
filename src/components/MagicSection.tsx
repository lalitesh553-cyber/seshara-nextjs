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

const SWIPE_THRESHOLD = 50 // minimum pixels to trigger swipe

export default function MagicSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Swipe detection refs
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const mouseStartX = useRef(0)
  const isDragging = useRef(false)
  const viewportRef = useRef<HTMLDivElement>(null)

  const totalSlides = pillars.length

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return
    let newIndex = index
    if (newIndex < 0) newIndex = totalSlides - 1
    if (newIndex >= totalSlides) newIndex = 0
    if (newIndex === currentIndex) return
    
    setIsTransitioning(true)
    setCurrentIndex(newIndex)
    // reset transition lock after animation
    setTimeout(() => setIsTransitioning(false), 300)
  }, [currentIndex, totalSlides, isTransitioning])

  const nextSlide = useCallback(() => goToSlide(currentIndex + 1), [currentIndex, goToSlide])
  const prevSlide = useCallback(() => goToSlide(currentIndex - 1), [currentIndex, goToSlide])

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX
    const endY = e.changedTouches[0].clientY
    const deltaX = endX - touchStartX.current
    const deltaY = endY - touchStartY.current
    
    // horizontal swipe only if horizontal movement is greater than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX > 0) {
        prevSlide()
      } else {
        nextSlide()
      }
    }
  }

  // Mouse handlers for drag/swipe on desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    mouseStartX.current = e.clientX
    e.preventDefault()
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    isDragging.current = false
    const deltaX = e.clientX - mouseStartX.current
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

  // Clean up global mouseup listener in case mouseup occurs outside
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false
    }
    window.addEventListener('mouseup', handleGlobalMouseUp)
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  return (
    <section style={{ background: '#faf7f2', padding: 'clamp(48px,8vw,80px) 0 clamp(52px,8vw,88px)' }}>
      <h2 style={{ textAlign: 'center', fontFamily: 'Playfair Display,serif', fontSize: 'clamp(18px,3vw,30px)', fontWeight: 400, color: 'var(--terra)', marginBottom: 'clamp(32px,5vw,56px)', padding: '0 16px' }}>
        The Magic Behind Our Pieces
      </h2>

      {/* Carousel Container */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 20px)' }}>
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            style={{
              background: 'rgba(139,58,30,0.08)',
              border: 'none',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 24,
              color: '#8B3A1E',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(139,58,30,0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(139,58,30,0.08)')}
          >
            ❮
          </button>

          {/* Swipeable Viewport */}
          <div
            ref={viewportRef}
            style={{
              flex: 1,
              overflow: 'hidden',
              cursor: isDragging.current ? 'grabbing' : 'grab',
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
                transition: isTransitioning ? 'transform 0.3s ease-out' : 'none',
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {pillars.map((p, i) => (
                <div
                  key={i}
                  style={{
                    flex: '0 0 100%',
                    width: '100%',
                    background: '#faf7f2',
                    padding: 'clamp(24px,4vw,40px) clamp(20px,3vw,36px) clamp(28px,4vw,44px)',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: 'clamp(160px,22vw,260px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 22,
                    }}
                  >
                    <Image
                      src={p.img}
                      alt={p.tag}
                      width={220}
                      height={220}
                      style={{
                        width: 'auto',
                        height: '100%',
                        maxHeight: 220,
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: 1,
                      background: 'rgba(139,58,30,0.1)',
                      marginBottom: 18,
                    }}
                  />
                  <p
                    style={{
                      fontFamily: 'DM Sans,sans-serif',
                      fontSize: 9,
                      letterSpacing: 2.5,
                      textTransform: 'uppercase',
                      color: 'var(--terra)',
                      fontWeight: 600,
                      marginBottom: 10,
                    }}
                  >
                    {p.tag}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Cormorant Garamond,serif',
                      fontSize: 'clamp(13px,1.4vw,15px)',
                      color: 'var(--brown2)',
                      lineHeight: 1.85,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            style={{
              background: 'rgba(139,58,30,0.08)',
              border: 'none',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 24,
              color: '#8B3A1E',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(139,58,30,0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(139,58,30,0.08)')}
          >
            ❯
          </button>
        </div>

        {/* Pagination Dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            marginTop: 'clamp(28px, 5vw, 40px)',
          }}
        >
          {pillars.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: idx === currentIndex ? 28 : 8,
                height: 8,
                borderRadius: 20,
                border: 'none',
                background: idx === currentIndex ? '#8B3A1E' : 'rgba(139,58,30,0.25)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
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
