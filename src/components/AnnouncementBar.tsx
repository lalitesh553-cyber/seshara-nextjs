// src/components/AnnouncementBar.tsx
// Fixed at top:0, zIndex:1001 (above Navbar's 1000).
// Uses same 2-set marquee architecture as HeroStrip:
// [Set A][Set B] animated by CSS translate3d(-50%,0,0).
// ann-scroll keyframe defined in globals.css.

'use client'

const messages = [
  'Handloom Cotton',
  'Made in India',
  'Made to Order',
  'Daily Casuals',
]

export default function AnnouncementBar() {
  // Height of this bar = 32px (padding 8px top + 8px bottom + ~16px content).
  // Navbar is positioned top:32px to sit flush below this.
  return (
    <div
      style={{
        background: 'var(--terra)',
        overflow: 'hidden',
        padding: '8px 0',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        // One above Navbar (1000) so it's never covered
        zIndex: 1001,
        height: 32,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/*
        2-set track: [Set A][Set B].
        CSS animation in globals.css: ann-scroll → translate3d(-50%,0,0).
        -50% of 2 sets = exactly 1 set. Seamless loop.
      */}
      <div className="ann-track">
        {/* Set A */}
        {messages.map((msg, i) => (
          <span
            key={i}
            style={{
              color: '#fff',
              fontSize: '10.5px',
              letterSpacing: '2.5px',
              fontWeight: 500,
              fontFamily: 'DM Sans, sans-serif',
              marginRight: '56px',
              whiteSpace: 'nowrap',
            }}
          >
            {msg} &nbsp;·
          </span>
        ))}
        {/* Set B — identical, creates the seamless loop */}
        {messages.map((msg, i) => (
          <span
            key={`b-${i}`}
            style={{
              color: '#fff',
              fontSize: '10.5px',
              letterSpacing: '2.5px',
              fontWeight: 500,
              fontFamily: 'DM Sans, sans-serif',
              marginRight: '56px',
              whiteSpace: 'nowrap',
            }}
          >
            {msg} &nbsp;·
          </span>
        ))}
      </div>
    </div>
  )
}
