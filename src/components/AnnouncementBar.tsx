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
        padding: '8px 0',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 901,
      }}
    >
      <div className="ann-track">
        {messages.map((msg, i) => (
          <span
            key={i}
            style={{
              color: '#fff',
              fontSize: '10.5px',
              letterSpacing: '2.5px',
              fontWeight: 500,
              fontFamily: 'var(--font-sans)',
              marginRight: '56px',
              whiteSpace: 'nowrap',
            }}
          >
            {msg} &nbsp;·
          </span>
        ))}
        {messages.map((msg, i) => (
          <span
            key={`dup-${i}`}
            style={{
              color: '#fff',
              fontSize: '10.5px',
              letterSpacing: '2.5px',
              fontWeight: 500,
              fontFamily: 'var(--font-sans)',
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