'use client'

import Image from 'next/image'

const pillars = [
  {
    img: '/sewingmachine.png',
    tag: 'BREATHABLE HANDLOOM',
    desc: 'Soft, airy cotton crafted for comfort, movement, and long everyday wear.',
  },
  {
    img: '/indian-body.png',
    tag: 'EASY EVERYDAY SILHOUETTES',
    desc: 'Relaxed fits designed to feel effortless, balanced, and naturally wearable.',
  },
  {
    img: '/time.png',
    tag: 'THOUGHTFUL LUXURY',
    desc: 'Timeless craftsmanship with subtle details that feel premium yet easy to live in.',
  },
]

export default function MagicSection() {
  return (
    <section style={{ background: '#faf7f2', padding: 'clamp(48px,8vw,80px) 0 clamp(52px,8vw,88px)' }}>
      <h2 style={{ textAlign: 'center', fontFamily: 'Playfair Display,serif', fontSize: 'clamp(18px,3vw,30px)', fontWeight: 400, color: 'var(--terra)', marginBottom: 'clamp(32px,5vw,56px)', padding: '0 16px' }}>
        The Magic Behind Our Pieces
      </h2>

      {/* Desktop: 3-col grid */}
      <div className="magic-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: 'rgba(139,58,30,0.08)', maxWidth: 1200, margin: '0 auto' }}>
        {pillars.map((p, i) => (
          <div key={i} style={{ background: '#faf7f2', padding: 'clamp(24px,4vw,40px) clamp(20px,3vw,36px) clamp(28px,4vw,44px)' }}>
            <div style={{ width: '100%', height: 'clamp(160px,22vw,260px)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
              <Image src={p.img} alt={p.tag} width={220} height={220} style={{ width: 'auto', height: '100%', maxHeight: 220, objectFit: 'contain' }} />
            </div>
            <div style={{ width: '100%', height: 1, background: 'rgba(139,58,30,0.1)', marginBottom: 18 }} />
            <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: 9, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--terra)', fontWeight: 600, marginBottom: 10 }}>{p.tag}</p>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(13px,1.4vw,15px)', color: 'var(--brown2)', lineHeight: 1.85 }}>{p.desc}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media(max-width:768px){
          .magic-grid { grid-template-columns: 1fr !important; max-width: 100% !important; }
          .magic-grid > div { padding: 28px 24px 32px !important; }
        }
      `}</style>
    </section>
  )
}