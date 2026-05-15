'use client'

import Link from 'next/link'

const footerLinks = {
  Pages: ['Shop', 'Our Story', 'Journal', 'Collections', 'Contact'],
  Policies: ['Returns & Exchanges', 'Terms & Conditions', 'Privacy Policy', "Where's My Order?"],
  Contact: ['MSME#, Hyderabad India', '@sesharaofficial', 'hello@seshara.in'],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--brown)', color: 'rgba(245,240,232,0.75)' }}>
      {/* Top tagline */}
      <div
        style={{
          background: 'var(--cream)',
          padding: '20px 52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid rgba(139,58,30,0.15)',
        }}
      >
        <p style={{ fontFamily: 'var(--script)', fontSize: 'clamp(20px,2.5vw,30px)', color: 'var(--terra)' }}>
          We&apos;re glad you&apos;re here 💌
        </p>
      </div>

      {/* Main footer grid */}
      <div
        style={{
          padding: '56px 52px 32px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 48,
        }}
      >
        {/* Brand column */}
        <div>
          <p
            style={{
              fontFamily: 'var(--display)',
              fontSize: 26,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,.9)',
              marginBottom: 12,
            }}
          >
            SESHARA
          </p>
          <p
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 12.5,
              lineHeight: 1.8,
              color: 'rgba(245,240,232,.45)',
              maxWidth: 260,
              fontStyle: 'italic',
            }}
          >
            Handloom clothing made slowly in India. Comfort woven into every day.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            {['✦', '◈', '◉', '▷'].map((icon, i) => (
              <Link
                key={i}
                href="#"
                style={{
                  width: 32,
                  height: 32,
                  border: '1px solid rgba(245,240,232,.14)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(245,240,232,.4)',
                  textDecoration: 'none',
                  fontSize: 12,
                }}
              >
                {icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, items]) => (
          <div key={heading}>
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,.9)',
                fontWeight: 500,
                marginBottom: 18,
              }}
            >
              {heading}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: 12,
                      color: 'rgba(245,240,232,.42)',
                      textDecoration: 'none',
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div
        style={{
          padding: '24px 52px 32px',
          borderTop: '1px solid rgba(245,240,232,.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <p style={{ fontFamily: 'var(--serif)', fontSize: 13, fontStyle: 'italic', color: 'rgba(245,240,232,.3)' }}>
          We design with love. Subscribe if you&apos;d like to hear from us :)
        </p>
        <div style={{ display: 'flex', overflow: 'hidden', border: '1px solid rgba(245,240,232,.14)', borderRadius: 2 }}>
          <input
            type="email"
            placeholder="Email"
            style={{
              padding: '12px 18px',
              background: 'rgba(245,240,232,.07)',
              border: 'none',
              color: 'rgba(245,240,232,.8)',
              fontSize: 12.5,
              fontFamily: 'var(--sans)',
              outline: 'none',
              minWidth: 190,
            }}
          />
          <button
            style={{
              padding: '12px 20px',
              background: 'var(--terra)',
              border: 'none',
              color: '#fff',
              fontSize: 9.5,
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'var(--sans)',
            }}
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          padding: '16px 52px 20px',
          borderTop: '1px solid rgba(245,240,232,.06)',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <p style={{ fontSize: 11, color: 'rgba(245,240,232,.22)', letterSpacing: 0.8, fontFamily: 'var(--sans)' }}>
          © 2026 Seshara. All rights reserved.
        </p>
        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 12, color: 'rgba(201,169,110,.22)' }}>
          Made with intention · Handloom cotton · India
        </p>
      </div>
    </footer>
  )
}
