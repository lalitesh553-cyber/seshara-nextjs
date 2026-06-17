'use client'

function LaceBorder({ flip = false }: { flip?: boolean }) {
  const dots1 = Array.from({ length: 108 }, (_, i) => i)
  const dots2 = Array.from({ length: 108 }, (_, i) => i)
  const scallops = Array.from({ length: 36 }, (_, i) => i)

  return (
    <div style={{ lineHeight: 0, transform: flip ? 'scaleY(-1)' : 'none' }}>
      <svg
        viewBox="0 0 1440 52"
        preserveAspectRatio="none"
        style={{ width: '100%', height: 52, display: 'block' }}
      >
        {dots1.map(i => (
          <circle
            key={i}
            cx={i * 13.3 + 6}
            cy={7}
            r={2.2}
            fill="rgba(180,165,145,0.22)"
          />
        ))}

        {dots2.map(i => (
          <circle
            key={i}
            cx={i * 13.3 + 12.6}
            cy={13}
            r={1.4}
            fill="rgba(180,165,145,0.14)"
          />
        ))}

        <path
          d={
            'M0,52 L0,32 ' +
            scallops
              .map(i => {
                const x = i * 40
                return `C${x + 4},10 ${x + 16},10 ${x + 20},30 C${x + 24},50 ${x + 36},10 ${x + 40},30`
              })
              .join(' ') +
            ' L1440,52 Z'
          }
          fill="#faf7f2"
        />
      </svg>
    </div>
  )
}

export default function FounderBannerScroll() {
  return (
    <section
      style={{
        background: '#fff',
        margin: 0,
        padding: 0,
        lineHeight: 0,
      }}
    >
      <div style={{ background: '#fff', lineHeight: 0 }}>
        <LaceBorder />
      </div>

      <div
        style={{
          background: '#faf7f2',
          width: '100%',
          aspectRatio: '1080 / 932',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src="/founderslide-1.png"
          alt="Hi! I am Prasanna — Founder of Seshara"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>

      <div style={{ background: '#faf7f2', lineHeight: 0 }}>
        <LaceBorder flip />
      </div>
    </section>
  )
}