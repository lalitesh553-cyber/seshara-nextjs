'use client'

// ═══════════════════════════════════════════════════════════════════
// HeroStrip — Single-Collage Seamless Marquee (CORRECTED)
// src/components/HeroStrip.tsx
//
// ── BUG IN PREVIOUS VERSION ──────────────────────────────────────
// Container was sized: width:100vw + aspect-ratio:3/4 (mobile) —
// a TALL narrow box. The collage is ~7200×1600px, ratio ~4.5:1 —
// an extremely WIDE image. Image fill+objectFit:cover always scales
// to cover the container's shorter dimension and crops the rest.
// A 4.5:1 image forced into a 0.75:1 (3:4) box has to zoom in ~6×
// just to cover the height — cropping out 5 of 6 models, leaving
// only a thin vertical sliver of the collage visible at any time.
//
// ── THE FIX ───────────────────────────────────────────────────────
// Stop fighting the image's natural shape. Flip the sizing model:
//   1. HEIGHT is the fixed design constraint (set directly, in px
//      via clamp() — not derived from aspect-ratio of a guessed box).
//   2. WIDTH is 'auto' — the image renders at its own natural
//      width once height is fixed, preserving the true 4.5:1 ratio.
//   3. No 'fill', no 'objectFit: cover'. Just a plain <img>-style
//      Next.js Image with width/height in the natural ratio.
//   4. The track's total width is now whatever the (very wide)
//      image naturally renders at × 2 copies — guaranteed wider
//      than any viewport, so the marquee never runs out of content.
//
// This means: the full collage width is always visible as it
// scrolls — Model1 | Model2 | ... | Model6 — nothing is cropped,
// because we're no longer asking the image to "cover" a
// mismatched container. We're just displaying it at its real shape.
//
// ── HEADER GAP FIX (unchanged, still required) ────────────────────
// paddingTop: var(--header-h) + overflow:hidden on the section.
// Padding can't margin-collapse — this is what keeps the fixed
// AnnouncementBar + Navbar from overlapping or leaving a gap.
// ═══════════════════════════════════════════════════════════════════

import Image from 'next/image'
import { useState } from 'react'

const COLLAGE_SRC = '/hero-collage.webp'

// Collage's real pixel dimensions — required by Next.js Image
// when not using `fill`. Used only to compute the correct aspect
// ratio; actual rendered size is controlled by CSS height + width:auto.
const COLLAGE_NATURAL_WIDTH = 7200
const COLLAGE_NATURAL_HEIGHT = 1600

export default function HeroStrip() {
  const [paused, setPaused] = useState(false)

  return (
    <section
      aria-label="Seshara collection showcase"
      style={{
        position: 'relative',
        width: '100%',
        // overflow:hidden clips the marquee track to one viewport's
        // worth of width AND forces a real Block Formatting Context,
        // which guarantees padding/margins here can never collapse
        // with a parent or sibling — this is what fixed the header gap.
        overflow: 'hidden',
        background: 'var(--cream)',
        display: 'block',
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
        <Image
          src={COLLAGE_SRC}
          alt="Seshara handloom cotton collection — full editorial strip"
          width={COLLAGE_NATURAL_WIDTH}
          height={COLLAGE_NATURAL_HEIGHT}
          priority
          quality={85}
          draggable={false}
          className="hs-collage-img"
          style={{
            transform: 'translate3d(0,0,0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />

        {/* Copy 2 — identical, creates the seamless loop */}
        <Image
          src={COLLAGE_SRC}
          alt=""
          aria-hidden="true"
          width={COLLAGE_NATURAL_WIDTH}
          height={COLLAGE_NATURAL_HEIGHT}
          quality={85}
          draggable={false}
          className="hs-collage-img"
          style={{
            transform: 'translate3d(0,0,0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />
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
           -50% = exactly 1 collage-width (track = 2 copies side by
           side). Screen-size independent: works at any viewport
           because the percentage is self-relative to the track's
           own rendered width, not a fixed pixel value.
        ──────────────────────────────────────────────────────────── */
        @keyframes hs-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }

        /* ── Track ───────────────────────────────────────────────
           width:max-content lets the track grow to fit both full-
           width collage copies at their natural rendered size —
           never compressed, so -50% math is always exactly correct
           regardless of how wide the collage actually renders.
        ──────────────────────────────────────────────────────────── */
        .hs-track {
          display: flex;
          align-items: center;
          width: max-content;
          height: 100%;
          animation: hs-marquee 50s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .hs-track--paused {
          animation-play-state: paused;
        }

        /*
          ── Collage image ──────────────────────────────────────
          THE CORE FIX:
          height is the fixed constraint (design decision, in px
          via clamp). width:auto lets the browser render the image
          at its NATURAL ratio (~4.5:1) once height is fixed —
          no cropping, no forced aspect-ratio box, no objectFit.
          flex-shrink:0 prevents flex from compressing it, which
          would also distort the ratio and break the -50% math.
          display:block removes baseline gap under the image.
        ──────────────────────────────────────────────────────────── */
        :global(.hs-collage-img) {
          flex-shrink: 0;
          display: block;
          height: clamp(420px, 62vh, 720px);
          width: auto;
          max-width: none;
        }

        /* ── Tablet 769–1024px ───────────────────────────────────
           Shorter height — more of the strip width is visible
           in the viewport at once on a 768-1024px wide screen.
        ──────────────────────────────────────────────────────────── */
        @media (max-width: 1024px) and (min-width: 769px) {
          :global(.hs-collage-img) {
            height: clamp(360px, 52vh, 560px);
          }
          .hs-track {
            animation-duration: 40s;
          }
        }

        /* ── Mobile ≤768px ───────────────────────────────────────
           Shorter still — on a narrow phone screen the collage
           needs to be compact in height so multiple models are
           visible in the viewport width at once, true to the
           "Model1 | Model2 | Model3..." scrolling strip experience.
        ──────────────────────────────────────────────────────────── */
        @media (max-width: 768px) {
          :global(.hs-collage-img) {
            height: clamp(260px, 38vh, 400px);
          }
          .hs-track {
            animation-duration: 30s;
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
