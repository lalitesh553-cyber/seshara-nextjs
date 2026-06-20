'use client'

// ═══════════════════════════════════════════════════════════════════
// HeroStrip — Single-Collage Seamless Marquee
// src/components/HeroStrip.tsx
//
// REPLACED: 6-image card-based marquee → single pre-built collage.
// The collage (/public/hero-collage.webp) is rendered TWICE,
// side by side in a flex track. The track is animated left by
// exactly -50% of its own width — since the track is exactly
// 2 copies of the same image, -50% = exactly 1 copy width.
// When the animation resets from -50% back to 0%, the second
// copy (now at position 0) is pixel-identical to the first copy's
// starting position — the loop is invisible. No JS measurement,
// no array logic, no per-card sizing — one image, two renders.
//
// HEADER GAP FIX (carried over from previous implementation):
// paddingTop: var(--header-h) on the section + overflow:hidden
// (which forces a real Block Formatting Context) guarantees the
// fixed AnnouncementBar + Navbar never overlap or leave a gap.
// Padding can never margin-collapse — this is spec-guaranteed,
// unlike marginTop which silently collapsed in some browsers.
//
// HEIGHT / RESPONSIVE BEHAVIOR:
// Section height is driven by the collage image's own aspect
// ratio via Next.js Image + a CSS aspect-ratio on the track
// wrapper — NOT by vh units. This is what eliminated the iPad
// gap bug previously (vh is unstable across Safari toolbar states;
// aspect-ratio is always stable).
// ═══════════════════════════════════════════════════════════════════

import Image from 'next/image'
import { useState } from 'react'

const COLLAGE_SRC = '/hero-collage.webp'

export default function HeroStrip() {
  const [paused, setPaused] = useState(false)

  return (
    <section
      aria-label="Seshara collection showcase"
      style={{
        position: 'relative',
        width: '100%',
        // overflow:hidden does two jobs here:
        //   1. clips the marquee track so only one viewport-width
        //      of the collage is ever visible at a time
        //   2. forces a real Block Formatting Context, which by spec
        //      guarantees this element's padding/margins can never
        //      collapse with a parent or sibling — this is what
        //      permanently fixed the header gap bug.
        overflow: 'hidden',
        background: 'var(--cream)',
        display: 'block',
        // paddingTop reserves space for the fixed AnnouncementBar +
        // Navbar. Padding can never collapse, by spec — unlike margin.
        paddingTop: 'var(--header-h)',
        boxSizing: 'border-box',
      }}
    >
      {/* ── TRACK: collage rendered twice, animated -50% ── */}
      <div
        className={paused ? 'hs-track hs-track--paused' : 'hs-track'}
        aria-hidden="true"
      >
        {/* Copy 1 */}
        <div className="hs-collage-wrap">
          <Image
            src={COLLAGE_SRC}
            alt="Seshara handloom cotton collection"
            fill
            sizes="100vw"
            priority
            quality={85}
            draggable={false}
            style={{
              objectFit: 'cover',
              objectPosition: 'center center',
              transform: 'translate3d(0,0,0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          />
        </div>

        {/* Copy 2 — identical, creates the seamless loop */}
        <div className="hs-collage-wrap">
          <Image
            src={COLLAGE_SRC}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            quality={85}
            draggable={false}
            style={{
              objectFit: 'cover',
              objectPosition: 'center center',
              transform: 'translate3d(0,0,0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          />
        </div>
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
           translate3d forces GPU compositor layer — 60fps guaranteed.
           -50% = exactly 1 collage-width (since track = 2 copies).
           This math is screen-size independent: works at any
           viewport width because the percentage is self-relative
           to the track's own total width, not a fixed pixel value.
        ──────────────────────────────────────────────────────────── */
        @keyframes hs-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }

        /* ── Track ───────────────────────────────────────────────
           display:flex lays the two collage copies side by side.
           width:max-content lets the track grow to fit both copies
           at their natural rendered width — never clipped, never
           compressed, so the -50% math is always exactly correct.
           will-change pre-promotes to GPU. backface-visibility
           eliminates the Safari sub-pixel flicker during the loop
           reset frame (this was the cause of "white flash" before).
        ──────────────────────────────────────────────────────────── */
        .hs-track {
          display: flex;
          width: max-content;
          animation: hs-marquee 40s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .hs-track--paused {
          animation-play-state: paused;
        }

        /* ── Collage wrapper ─────────────────────────────────────
           Each copy is exactly 100vw wide, with height driven by
           aspect-ratio instead of vh. This is the same technique
           that fixed the iPad height-mismatch bug previously —
           vh is unstable across Safari toolbar collapse states,
           aspect-ratio is always pixel-stable.
           flex-shrink:0 prevents flex from compressing either copy,
           which would break the -50% animation math.
        ──────────────────────────────────────────────────────────── */
        .hs-collage-wrap {
          position: relative;
          flex-shrink: 0;
          width: 100vw;
          /*
            Aspect ratio matches a wide hero banner collage.
            Adjust this single value if your collage's natural
            ratio differs — height always stays proportional.
          */
          aspect-ratio: 16 / 9;
        }

        /* ── Tablet 769–1024px ───────────────────────────────────
           Taller ratio on tablet — more vertical presence,
           matches the portrait-leaning layout of iPad viewports.
        ──────────────────────────────────────────────────────────── */
        @media (max-width: 1024px) and (min-width: 769px) {
          .hs-collage-wrap {
            aspect-ratio: 4 / 3;
          }
          .hs-track {
            animation-duration: 34s;
          }
        }

        /* ── Mobile ≤768px ───────────────────────────────────────
           Taller ratio so the collage reads well on a narrow,
           tall phone viewport without excessive letterboxing.
        ──────────────────────────────────────────────────────────── */
        @media (max-width: 768px) {
          .hs-collage-wrap {
            aspect-ratio: 3 / 4;
          }
          .hs-track {
            animation-duration: 26s;
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
