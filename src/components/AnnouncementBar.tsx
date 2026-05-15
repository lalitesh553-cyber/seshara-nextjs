'use client'

const messages = [
  'MADE IN INDIA',
  'SMALL BATCH · MADE TO ORDER',
  'FREE SHIPPING ABOVE ₹999',
  'SELECT 3 SHIRTS, PAY FOR JUST 2!',
  'HANDLOOM COTTON · MADE IN INDIA',
  'MADE IN INDIA',
  'SMALL BATCH · MADE TO ORDER',
  'FREE SHIPPING ABOVE ₹999',
  'SELECT 3 SHIRTS, PAY FOR JUST 2!',
  'HANDLOOM COTTON · MADE IN INDIA',
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
              fontFamily: 'var(--sans)',
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
