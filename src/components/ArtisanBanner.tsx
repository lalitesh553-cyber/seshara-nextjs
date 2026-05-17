'use client'

import Link from 'next/link'

export default function ArtisanBanner() {
  return (
    <section style={{ position: 'relative', width: '100%', overflow: 'hidden', margin: 0, padding: 0 }}>
      <div style={{ position: 'relative', width: '100%', height: 'clamp(420px, 72vh, 820px)' }}>
        <img
          src="/2nd-herobanner.jpg"
          alt="Artisan village"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,5,2,0.85) 0%, rgba(10,5,2,0.55) 45%, rgba(10,5,2,0.1) 80%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,5,2,0.6) 0%, transparent 55%)' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(24px,6vw,96px)' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(201,169,110,0.55)', fontWeight: 500, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'inline-block', width: 28, height: 1, background: 'rgba(201,169,110,0.4)' }} />
            SS 2026 — The Everyday Collection
          </p>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px,6.5vw,88px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'rgba(245,238,218,0.97)', marginBottom: 'clamp(14px,2vh,28px)', textShadow: '0 4px 40px rgba(0,0,0,0.4)' }}>
            Thoughtful<br />Choices,<br />
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(228,215,188,0.88)' }}>Shaped by</em><br />hand.
          </h2>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(13px,1.4vw,16px)', color: 'rgba(210,195,168,0.6)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 'clamp(20px,3vh,44px)', maxWidth: 440 }}>
            Cotton fabric, floral motifs, everyday Telugu life. Not to invent something new — simply to make thoughtful choices.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <Link href="#catalog" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: 'clamp(10px,1.5vh,14px) clamp(18px,2.5vw,28px)', background: 'var(--terra)', color: 'rgba(245,238,218,0.97)', fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 500, textDecoration: 'none', borderRadius: 1, boxShadow: '0 8px 32px rgba(139,58,30,0.45)' }}>
              Explore Collection
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="#our-story" style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 500, color: 'rgba(201,169,110,0.72)', textDecoration: 'none', borderBottom: '1px solid rgba(201,169,110,0.35)', paddingBottom: 3 }}>
              Our Way
            </Link>
          </div>
        </div>

        {/* Right vertical label — hidden on mobile */}
        <div className="banner-label" style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: 0.38 }}>
          <div style={{ width: 1, height: 48, background: 'rgba(201,169,110,0.5)' }} />
          <p style={{ fontFamily: 'var(--sans)', fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(201,169,110,0.8)', writingMode: 'vertical-rl' }}>Handloom · 2026</p>
          <div style={{ width: 1, height: 48, background: 'rgba(201,169,110,0.5)' }} />
        </div>
      </div>
      <style>{`@media(max-width:768px){.banner-label{display:none!important}}`}</style>
    </section>
  )
}
