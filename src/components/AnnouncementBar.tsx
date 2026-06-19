// src/components/AnnouncementBar.tsx
//
// Height is EXACTLY --ann-h = 32px from globals.css.
// No padding that could change the rendered height unexpectedly.
// Uses line-height to vertically center text instead of padding,
// so height is a guaranteed fixed value.

'use client'

const messages = [
  'Handloom Cotton',
  'Made in India',
  'Made to Order',
  'Daily Casuals',
]

export default function AnnouncementBar() {
  return (
    <div
      style={{
        background: 'var(--terra)',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1001,
        // Height is FIXED = --ann-h = 32px.
        // Using height + lineHeight (not padding) to guarantee
        // this element is always exactly 32px on every device.
        // padding-based height is unpredictable across browsers.
        height: 'var(--ann-h)',
        lineHeight: 'var(--ann-h)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
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
              lineHeight: 1,
            }}
          >
            {msg}&nbsp;·
          </span>
        ))}
        {/* Set B — seamless loop */}
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
              lineHeight: 1,
            }}
          >
            {msg}&nbsp;·
          </span>
        ))}
      </div>
    </div>
  )
}
