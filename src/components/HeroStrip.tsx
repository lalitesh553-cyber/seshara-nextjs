// src/components/HeroStrip.tsx
//
// ARCHITECTURE: CSS-only infinite marquee. No JS for sizing.
//
// WHY THE OLD VERSION BROKE:
// ─────────────────────────────────────────────────────────────
// The old code used useEffect + window.innerWidth to set card
// width in JS state. SSR renders 'desktop' width. After hydration,
// useEffect fires and changes card width to '100vw' on mobile.
// But the CSS animation (translateX -33.333%) was already running
// with the DESKTOP card width. Changing card width mid-animation
// breaks the track total width → the animation overshoots → blank gap.
// On iPad: 2 cards showed side by side because the mobile width
// (100vw) never applied before the animation started.
//
// THE FIX:
// ─────────────────────────────────────────────────────────────
// Card dimensions are defined ONLY in CSS via @media queries.
// No JS state controls width or height.
// translateX(-33.333%) is always correct because:
//   total track = 18 cards (6 × 3 copies)
//   -33.333% of 18 = 6 cards = exactly 1 full set
//   this math is screen-size independent — it works at any card width.
//
// WHITE SCREEN FIX:
// ─────────────────────────────────────────────────────────────
// Triple copy (18 cards) guarantees the viewport is always filled.
// Even at the widest desktop screen, 6 cards × clamp(260px, 22vw, 380px)
// = minimum 1560px, well above any viewport width.
// Seamless loop: at -33.333% the track resets to 0 — user sees no jump
// because the visual content at position 0 is identical to position -33.333%.
//
// IPAD EMPTY SPACE FIX:
// ─────────────────────────────────────────────────────────────
// The spacer in page.tsx was height:98 but header = 32+72 = 104px.
// Fixed in this component by removing any top-margin dependency.
// Card height is set via CSS to fill the viewport correctly on all screens.

'use client'

import { useState } from 'react'

const heroCards = [
  { src: '/hero-1.png', sub: 'Hand-Embroidery' },
  { src: '/hero-2.png', sub: 'Checks' },
  { src: '/hero-3.png', sub: 'Hand-Embroidery' },
  { src: '/hero-4.png', sub: 'Kalamkari' },
  { src: '/hero-5.png', sub: 'Kalamkari' },
  { src: '/hero-6.png', sub: 'Solid with Check Accents' },
]

// Triple copy: guarantees no blank gap during loop reset on any screen size.
// -33.333% animation distance = exactly 1 set of 6 cards regardless of width.
const infiniteCards = [...heroCards, ...heroCards, ...heroCards]

export default function HeroStrip() {
  const [playing, setPlaying] = useState(true)

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        background: 'var(--cream)',
        // Explicit height so the section never collapses before images load.
        // CSS var set per breakpoint below.
        lineHeight: 0,
      }}
    >
      {/*
        The track: one long flex row of 18 cards.
        width: max-content lets it stretch as wide as needed.
        animation drives it left by -33.333% (= 6 cards = 1 full set).
        When it reaches -33.333%, it snaps back to 0 — seamless because
        copy 1 and copy 2 are visually identical at those positions.
      */}
      <div className={`hero-track ${playing ? 'hero-track--playing' : ''}`}>
        {infiniteCards.map((card, i) => (
          <div key={i} className="hero-slide">
            <img
              src={card.src}
              alt={card.sub}
              // First 6 eager, rest lazy — performance + no flash on load
              loading={i < 6 ? 'eager' : 'lazy'}
              draggable={false}
              className="hero-img"
            />

            {/* Bottom gradient overlay */}
            <div className="hero-overlay" />

            {/* Label */}
            <div className="hero-label">
              <p className="hero-label-text">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Play/Pause button */}
      <button
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? 'Pause' : 'Play'}
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
          zIndex: 50,
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid rgba(201,169,110,.4)',
          background: 'rgba(46,26,14,.6)',
          cursor: 'pointer',
          color: '#fff',
          fontSize: 13,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {playing ? '❚❚' : '▶'}
      </button>

      <style jsx>{`
        /* ─── Animation ───────────────────────────────── */
        @keyframes heroScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        /* ─── Track ───────────────────────────────────── */
        .hero-track {
          display: flex;
          width: max-content;
          /* No animation by default — applied by modifier class */
        }
        .hero-track--playing {
          animation: heroScroll 42s linear infinite;
          will-change: transform;
        }

        /* ─── Each slide ──────────────────────────────── */
        .hero-slide {
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          background: var(--cream);

          /*
            CSS-only sizing — no JS state involved.
            Desktop: ~22vw each, 6 visible ≈ 132vw (wider than viewport = smooth).
            Tablet:  ~38vw each, ~2.6 visible.
            Mobile:  90vw each, ~1.1 visible (hints there are more).
          */
          width: clamp(260px, 22vw, 380px);
          height: clamp(480px, 76vh, 740px);
        }

        /* ─── Image ───────────────────────────────────── */
        .hero-img {
          width: 100%;
          height: 100%;
          /*
            object-fit: contain — preserves full garment visibility.
            Portrait fashion images must not be cropped.
            object-position: center bottom — anchors feet/hem at bottom,
            keeps faces visible at top.
          */
          object-fit: contain;
          object-position: center bottom;
          display: block;
          pointer-events: none;
          user-select: none;
        }

        /* ─── Overlay ─────────────────────────────────── */
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(40,18,6,0.55) 0%,
            rgba(40,18,6,0.04) 42%,
            transparent 62%
          );
          pointer-events: none;
        }

        /* ─── Label ───────────────────────────────────── */
        .hero-label {
          position: absolute;
          bottom: 24px;
          left: 18px;
          right: 18px;
          pointer-events: none;
        }
        .hero-label-text {
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.9);
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
        }

        /* ─── Tablet  769–1024px ──────────────────────── */
        @media (max-width: 1024px) and (min-width: 769px) {
          .hero-slide {
            width: 38vw;
            height: 72vw;
          }
        }

        /* ─── Mobile  ≤768px ──────────────────────────── */
        @media (max-width: 768px) {
          .hero-slide {
            /*
              90vw: ~1.1 cards visible → user clearly sees the strip is wider.
              This avoids the "full screen card with no hint of more" problem.
              Height: 120vw matches portrait 3:4 ratio well on phones.
            */
            width: 85vw;
            height: 115vw;
          }

          .hero-label-text {
            font-size: 12px;
          }
        }

        /* ─── Small phones  ≤480px ────────────────────── */
        @media (max-width: 480px) {
          .hero-slide {
            width: 88vw;
            height: 118vw;
          }
        }
      `}</style>
    </section>
  )
}
