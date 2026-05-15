'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function ArtisanBanner() {
  return (
    <section style={{ position: 'relative', width: '100%', overflow: 'hidden', margin: 0, padding: 0, display: 'block' }}>
      <div style={{ position: 'relative', width: '100%', height: 'clamp(520px, 78vh, 820px)' }}>
        <Image
          src="/2nd-herobanner.jpg"
          alt="Artisan village — thoughtful choices"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,5,2,0.82) 0%, rgba(10,5,2,0.55) 45%, rgba(10,5,2,0.12) 78%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,5,2,0.6) 0%, transparent 55%)' }} />

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(32px, 6vw, 96px)',
          maxWidth: 'min(680px, 55vw)',
        }}>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 4,
            textTransform: 'uppercase', color: 'rgba(201,169,110,0.55)',
            fontWeight: 500, marginBottom: 28,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <span style={{ display: 'inline-block', width: 36, height: 1, background: 'rgba(201,169,110,0.4)' }} />
            SS 2026 — The Everyday Collection
          </p>

          <h2 style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(42px, 6.8vw, 92px)',
            fontWeight: 400, lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'rgba(245,238,218,0.97)',
            marginBottom: 'clamp(18px, 2.5vh, 36px)',
            textShadow: '0 4px 40px rgba(0,0,0,0.4)',
          }}>
            Thoughtful<br />Choices,<br />
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(228,215,188,0.88)' }}>Shaped by</em>
            <br />hand.
          </h2>

          <p style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(14px, 1.5vw, 17px)',
            color: 'rgba(210,195,168,0.62)', lineHeight: 1.75, fontStyle: 'italic',
            marginBottom: 'clamp(28px, 4vh, 52px)', maxWidth: 480,
            textShadow: '0 2px 12px rgba(0,0,0,0.3)',
          }}>
            Cotton fabric, floral motifs, everyday Telugu life. Not to invent something new — simply to make thoughtful choices.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
            <Link href="#catalog" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              padding: '14px 32px', background: 'var(--terra)',
              color: 'rgba(245,238,218,0.97)', fontFamily: 'var(--sans)',
              fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
              fontWeight: 500, textDecoration: 'none', borderRadius: 1,
              boxShadow: '0 8px 32px rgba(139,58,30,0.45)',
            }}>
              Explore Collection
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="#our-story" style={{
              fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: 2,
              textTransform: 'uppercase', fontWeight: 500,
              color: 'rgba(201,169,110,0.72)', textDecoration: 'none',
              borderBottom: '1px solid rgba(201,169,110,0.35)', paddingBottom: 3,
            }}>
              Our Way
            </Link>
          </div>
        </div>

        {/* right vertical label */}
        <div style={{
          position: 'absolute', right: 36, top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: 0.4,
        }}>
          <div style={{ width: 1, height: 60, background: 'rgba(201,169,110,0.5)' }} />
          <p style={{
            fontFamily: 'var(--sans)', fontSize: 9, letterSpacing: 3,
            textTransform: 'uppercase', color: 'rgba(201,169,110,0.8)',
            writingMode: 'vertical-rl',
          }}>Handloom · 2026</p>
          <div style={{ width: 1, height: 60, background: 'rgba(201,169,110,0.5)' }} />
        </div>
      </div>
    </section>
  )
}
