'use client'

import Image from 'next/image'

const pillars = [
  {
    img: '/sewingmachine.png',
    tag: 'INTENTIONAL PRODUCTION',
    title: 'Made with intention',
    desc: 'We design small-batch pieces with custom prints and textiles, crafted in ethical, women-owned, fair-wage factories supporting local tailors.',
  },
  {
    img: '/indian-body.png',
    tag: 'MADE FOR INDIAN BODIES',
    title: 'Cut for real proportions',
    desc: 'Designed with real proportions in mind and crafted from natural fabrics, perfect for the tropical weather. Our pieces are cut to fit and flatter Indian body types.',
  },
  {
    img: '/time.png',
    tag: 'TIMELESS TREASURES',
    title: 'Wearable works of art',
    desc: 'Each piece is meant to be your companion on appraisal days, tough meetings and celebrations for years to come. Our clothes are wearable works of art, not dictated by trend, season or year.',
  },
]

export default function MagicSection() {
  return (
    <section style={{ background: '#faf7f2', padding: '80px 52px 96px' }}>
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <p style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(20px, 2.4vw, 30px)',
          fontWeight: 400,
          color: 'var(--terra)',
          letterSpacing: '0.01em',
        }}>
          The Magic Behind Our Pieces
        </p>
        <div style={{ width: 40, height: 1, background: 'rgba(139,58,30,0.25)', margin: '14px auto 0' }} />
      </div>

      {/* Three cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 2,
        maxWidth: 1200,
        margin: '0 auto',
        background: 'rgba(139,58,30,0.08)',
      }}>
        {pillars.map((p, i) => (
          <div
            key={i}
            style={{
              background: '#faf7f2',
              padding: '40px 36px 44px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            {/* Illustration */}
            <div style={{
              width: '100%',
              height: 280,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 28,
            }}>
              <Image
                src={p.img}
                alt={p.tag}
                width={260}
                height={260}
                style={{ width: 'auto', height: '100%', maxHeight: 260, objectFit: 'contain', display: 'block' }}
              />
            </div>

            {/* Divider */}
            <div style={{ width: '100%', height: 1, background: 'rgba(139,58,30,0.12)', marginBottom: 22 }} />

            {/* Tag */}
            <p style={{
              fontFamily: 'var(--sans)',
              fontSize: 9,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              color: 'var(--terra)',
              fontWeight: 600,
              marginBottom: 10,
            }}>
              {p.tag}
            </p>

            {/* Body */}
            <p style={{
              fontFamily: 'var(--serif)',
              fontSize: 14.5,
              color: 'var(--brown2)',
              lineHeight: 1.85,
              fontStyle: 'normal',
            }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
