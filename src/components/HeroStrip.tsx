'use client'

// ═══════════════════════════════════════════════════════════════════
// HeroStrip — Premium Seamless Marquee
// src/components/HeroStrip.tsx
//
// ARCHITECTURE: 2-set duplicate track, CSS-only animation.
// No JS sizing. No state controlling layout.
// GPU-composited via translate3d + will-change + backface-visibility.
//
// WHY OLD BROKE:
//   useState('desktop') → SSR renders desktop widths.
//   useEffect fires post-hydration → switches to '100vw' on mobile.
//   CSS animation was already running at OLD width.
//   translateX(-33.333%) of wrong-width track = blank gap exposed.
//   iPad: height:'78vh' + JS width mismatch = beige empty space.
//   Triple copy + -33.333% is correct math but JS width switching
//   invalidated the total track width mid-animation.
//
// HOW THIS IS FIXED:
//   Card width & height = CSS only via clamp() + aspect-ratio.
//   No JS ever touches sizing. Zero hydration mismatch.
//   Two sets (Set A + Set B). Animation: translate3d(-50%,0,0).
//   -50% of a 2-set track = exactly 1 set. Screen-size independent.
//   At -50% the animation resets to 0 — invisible because
//   Set B at 0 is visually identical to Set A at its end position.
//   aspect-ratio:2/3 replaces all vh height dependencies.
//   Width defined by clamp()/vw in CSS = always proportional height.
//
// TRACK WIDTH SAFETY:
//   Desktop: 6 cards × clamp(260px,22vw,380px) × 2 sets
//            minimum = 6×260×2 = 3120px > any viewport. Safe.
//   Tablet:  6 × 38vw × 2 = 456vw > 100vw. Safe.
//   Mobile:  6 × 85vw × 2 = 1020vw > 100vw. Safe.
// ═══════════════════════════════════════════════════════════════════

import Image from 'next/image'
import { useState } from 'react'

const heroCards = [
  { src: '/hero-1.webp', label: 'Earthy Charm',    sub: 'Hand-Embroidery'          },
  { src: '/hero-2.webp', label: 'Soft in Spirit',  sub: 'Checks'                   },
  { src: '/hero-3.webp', label: 'Breathe Easy',    sub: 'Hand-Embroidery'          },
  { src: '/hero-4.webp', label: 'Rooted Colours',  sub: 'Kalamkari'                },
  { src: '/hero-5.webp', label: 'Block Heritage',  sub: 'Kalamkari'                },
  { src: '/hero-6.webp', label: 'Everyday Ease',   sub: 'Solid with Check Accents' },
]

// 2-set track: [A1..A6][B1..B6]
// Animation moves -50% = exactly 1 set width, then resets to 0.
// B1 at position 0 = A1 visually → seamless.
const trackCards = [...heroCards, ...heroCards]

export default function HeroStrip() {
  const [paused, setPaused] = useState(false)

  return (
    <section
      aria-label="Seshara collection showcase"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        background: 'var(--cream)',
        // contain isolates layout so section never affects sibling positions
        contain: 'layout paint',
        lineHeight: 0,
        fontSize: 0,
      }}
    >
      {/* ── TRACK ── */}
      <div
        className={paused ? 'hs-track hs-track--paused' : 'hs-track'}
        aria-hidden="true"
      >
        {trackCards.map((card, i) => (
          <div key={i} className="hs-card">
            <Image
              src={card.src}
              alt={card.label}
              fill
              // Responsive srcset — browser picks correct resolution
              sizes="(max-width: 480px) 90vw, (max-width: 768px) 85vw, (max-width: 1024px) 38vw, clamp(260px, 22vw, 380px)"
              // First 4 cards are above-fold → priority (no LCP penalty)
              priority={i < 4}
              quality={90}
              draggable={false}
              style={{
                // contain: full garment visible, no crop
                objectFit: 'contain',
                // anchor feet at bottom, face stays at top
                objectPosition: 'center bottom',
                // GPU layer per image prevents Safari flicker
                transform: 'translate3d(0,0,0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            />
            {/* Luxury depth gradient */}
            <div className="hs-overlay" />
            {/* Label */}
            <div className="hs-label">
              <span className="hs-label-sub">{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Play / Pause ── */}
      <button
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? 'Play showcase' : 'Pause showcase'}
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
          zIndex: 50,
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid rgba(201,169,110,0.45)',
          background: 'rgba(46,26,14,0.62)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          cursor: 'pointer',
          color: '#fff',
          fontSize: 13,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
        }}
      >
        {paused ? '▶' : '❚❚'}
      </button>

      <style jsx>{`
        /* ── Keyframe ─────────────────────────────────────────────
           translate3d(0,0,0) promotes to GPU compositor layer.
           -50% = 1 set of 6 cards regardless of card width.
           Reset from -50%→0 is invisible: same visual content.
        ──────────────────────────────────────────────────────────── */
        @keyframes seshara-marquee {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        /* ── Track ───────────────────────────────────────────────
           will-change: browser pre-promotes to its own GPU layer.
           backface-visibility: eliminates Safari sub-pixel flicker.
        ──────────────────────────────────────────────────────────── */
        .hs-track {
          display: flex;
          width: max-content;
          animation: seshara-marquee 44s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .hs-track--paused {
          animation-play-state: paused;
        }

        /* ── Card ────────────────────────────────────────────────
           flex-shrink:0 prevents flex compressing cards.
           aspect-ratio:2/3 drives height from width.
           This replaces all vh-based heights — eliminates iPad gap.
           Why vh caused iPad gap:
             iPad Safari height includes/excludes toolbar unpredictably.
             78vh on iPad = ~600px but toolbar collapses on scroll,
             making vh jump. aspect-ratio is always stable.
           contain:layout paint style = each card is isolated layer.
        ──────────────────────────────────────────────────────────── */
        .hs-card {
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          background: var(--cream);
          contain: layout paint style;
          /* Desktop */
          width: clamp(260px, 22vw, 380px);
          aspect-ratio: 2 / 3;
        }

        /* ── Overlay ─────────────────────────────────────────────
           pointer-events:none: overlay never blocks interaction.
        ──────────────────────────────────────────────────────────── */
        .hs-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(40,18,6,0.58) 0%,
            rgba(40,18,6,0.04) 42%,
            transparent 62%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* ── Label ───────────────────────────────────────────────*/
        .hs-label {
          position: absolute;
          bottom: 22px;
          left: 16px;
          right: 16px;
          z-index: 2;
          pointer-events: none;
        }
        .hs-label-sub {
          display: block;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: rgba(255,255,255,0.88);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          line-height: 1;
        }

        /* ── Tablet 769–1024px ───────────────────────────────────
           38vw cards. Track: 6×38vw×2 = 456vw >> 100vw. Safe.
           Slightly faster animation — fewer cards visible means
           the same card reappears sooner, needs shorter cycle.
        ──────────────────────────────────────────────────────────── */
        @media (max-width: 1024px) and (min-width: 769px) {
          .hs-card {
            width: 38vw;
          }
          .hs-track {
            animation-duration: 36s;
          }
        }

        /* ── Mobile ≤768px ───────────────────────────────────────
           85vw: 1.15 cards visible at a time.
           Shows user the strip continues → luxury feel.
           Track: 6×85vw×2 = 1020vw >> 100vw. Safe.
           Faster animation on mobile for energy.
        ──────────────────────────────────────────────────────────── */
        @media (max-width: 768px) {
          .hs-card {
            width: 85vw;
          }
          .hs-track {
            animation-duration: 28s;
          }
          .hs-label-sub {
            font-size: 12px;
            letter-spacing: 2px;
          }
        }

        /* ── Small phones ≤390px ─────────────────────────────────
           Slightly wider so image fills screen edge-to-edge feel.
        ──────────────────────────────────────────────────────────── */
        @media (max-width: 390px) {
          .hs-card {
            width: 90vw;
          }
          .hs-track {
            animation-duration: 24s;
          }
        }

        /* ── Reduced motion ──────────────────────────────────────
           Accessibility: pause for users who prefer no motion.
        ──────────────────────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .hs-track {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  )
}
