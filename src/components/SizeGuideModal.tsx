'use client'

import { useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type FitType = 'regular' | 'maternity'
type SizeRange = 'xxs-s' | 'm-xl' | 'xxl-4xl'

interface SizeRow {
  label: string
  xxs: string; xs: string; s: string
  m: string;   l: string;  xl: string
  xxl: string; x3l: string; x4l: string
}

// ─── Size data ────────────────────────────────────────────────────────────────

const REGULAR_ROWS: SizeRow[] = [
  { label: 'UK',            xxs: '4',            xs: '6',            s: '8-10',        m: '12-14',      l: '16-18',       xl: '20-22',       xxl: '24-26',        x3l: '28-30',        x4l: '32-34' },
  { label: 'EUR',           xxs: '32',           xs: '34',           s: '36-38',       m: '40-42',      l: '44-46',       xl: '48-50',       xxl: '52-54',        x3l: '56-58',        x4l: '60-62' },
  { label: 'Chest cm',      xxs: '74-78',        xs: '78-82',        s: '82-90',       m: '90-98',      l: '98-107',      xl: '107-119',     xxl: '119-131',      x3l: '131-143',      x4l: '143-155' },
  { label: 'Chest inch',    xxs: '29½-30¾',      xs: '30¾-32¼',      s: '32¼-35½',     m: '35½-38½',    l: '38½-42',      xl: '42-46¾',      xxl: '46¾-51½',      x3l: '51½-56¼',      x4l: '56¼-61' },
  { label: 'Waist cm',      xxs: '62-64',        xs: '64-66',        s: '66-74',       m: '74-82.5',    l: '82.5-93',     xl: '93-105',      xxl: '105-117.5',    x3l: '117.5-131.5',  x4l: '131.5-145.5' },
  { label: 'Waist inch',    xxs: '24½-25',       xs: '25-26',        s: '26-29',       m: '29-32½',     l: '32½-36½',     xl: '36½-41¼',     xxl: '41¼-46¼',      x3l: '46¼-51¾',      x4l: '51¾-57¼' },
  { label: 'Low hip cm',    xxs: '79-83',        xs: '83-87',        s: '87-94.5',     m: '94.5-100.5', l: '100.5-107.5', xl: '107.5-117.5', xxl: '117.5-128',    x3l: '128-140',      x4l: '140-152' },
  { label: 'Low hip inch',  xxs: '31-32¾',       xs: '32¾-34¼',      s: '34¼-37¼',     m: '37¼-39½',    l: '39½-42¼',     xl: '42¼-46¼',     xxl: '46¼-50½',      x3l: '50½-55',       x4l: '55-59¾' },
]

const MATERNITY_ROWS: SizeRow[] = [
  { label: 'UK',            xxs: '4',            xs: '6',            s: '8-10',        m: '12-14',      l: '16-18',       xl: '20-22',       xxl: '24-26',        x3l: '28-30',        x4l: '32-34' },
  { label: 'EUR',           xxs: '32',           xs: '34',           s: '36-38',       m: '40-42',      l: '44-46',       xl: '48-50',       xxl: '52-54',        x3l: '56-58',        x4l: '60-62' },
  { label: 'Chest cm',      xxs: '74-78',        xs: '78-82',        s: '82-90',       m: '90-98',      l: '98-107',      xl: '107-119',     xxl: '119-131',      x3l: '131-143',      x4l: '143-155' },
  { label: 'Chest inch',    xxs: '29½-30¾',      xs: '30¾-32¼',      s: '32¼-35½',     m: '35½-38½',    l: '38½-42',      xl: '42-46¾',      xxl: '46¾-51½',      x3l: '51½-56¼',      x4l: '56¼-61' },
  { label: 'Low hip cm',    xxs: '79-83',        xs: '83-87',        s: '87-94.5',     m: '94.5-100.5', l: '100.5-107.5', xl: '107.5-117.5', xxl: '117.5-128',    x3l: '128-140',      x4l: '140-152' },
  { label: 'Low hip inch',  xxs: '31-32¾',       xs: '32¾-34¼',      s: '34¼-37¼',     m: '37¼-39½',    l: '39½-42¼',     xl: '42¼-46¼',     xxl: '46¼-50½',      x3l: '50½-55',       x4l: '55-59¾' },
]

const RANGE_COLUMNS: Record<SizeRange, { key: keyof SizeRow; label: string }[]> = {
  'xxs-s':  [{ key: 'xxs', label: 'XXS' }, { key: 'xs', label: 'XS' }, { key: 's', label: 'S' }],
  'm-xl':   [{ key: 'm', label: 'M' }, { key: 'l', label: 'L' }, { key: 'xl', label: 'XL' }],
  'xxl-4xl':[{ key: 'xxl', label: 'XXL' }, { key: 'x3l', label: '3XL' }, { key: 'x4l', label: '4XL' }],
}

// ─── How-to-measure content ────────────────────────────────────────────────────

const HOW_TO_ITEMS = [
  { num: 1, title: 'Chest', desc: 'Measure your chest over the fullest part of your bust while wearing a bra that fits.' },
  { num: 2, title: 'Waist', desc: 'Measure your waist at the narrowest point. (MATERNITY: Do not measure the waist)' },
  { num: 3, title: 'Arm length', desc: 'Measure from shoulder to wrist.' },
  { num: 4, title: 'Low hip', desc: 'Measure your low hip around the fullest part of your hip.' },
]

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  open: boolean
  onClose: () => void
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SizeGuideModal({ open, onClose }: Props) {
  const [fitType,    setFitType]    = useState<FitType>('regular')
  const [sizeRange,  setSizeRange]  = useState<SizeRange>('xxs-s')
  const [howToOpen,  setHowToOpen]  = useState(false)

  if (!open) return null

  const rows    = fitType === 'regular' ? REGULAR_ROWS : MATERNITY_ROWS
  const columns = RANGE_COLUMNS[sizeRange]

  /* ── Inline style helpers ── */
  const terra = '#8b3a1e'
  const brown = '#3d1f0f'
  const muted = '#8a7060'

  const rangeLabel: Record<SizeRange, string> = {
    'xxs-s':   'XXS – S',
    'm-xl':    'M – XL',
    'xxl-4xl': 'XXL – 4XL',
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 3000,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        padding: 0,
      }}
    >
      {/* Sheet — slides up from bottom on mobile, centred modal on desktop */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 560,
          maxHeight: '92vh',
          overflowY: 'auto',
          background: '#111',
          borderRadius: '16px 16px 0 0',
          color: '#fff',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: 40, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.25)' }} />
        </div>

        {/* Header */}
        <div style={{
          padding: '12px 20px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          textAlign: 'center',
          fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
        }}>
          TOPS, BLOUSES ETC.
        </div>

        {/* Body */}
        <div style={{ padding: '20px 20px 32px' }}>

          {/* ── How to Measure accordion ── */}
          <button
            onClick={() => setHowToOpen(p => !p)}
            style={{
              width: '100%', background: 'none', border: 'none',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              color: '#fff', fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase',
              cursor: 'pointer', padding: '0 0 16px',
              borderBottom: howToOpen ? 'none' : '1px solid rgba(255,255,255,0.08)',
              marginBottom: howToOpen ? 0 : 20,
            }}
          >
            <span style={{ fontWeight: 600 }}>HOW TO MEASURE</span>
            <span style={{ fontSize: 20, lineHeight: 1, fontWeight: 300 }}>{howToOpen ? '−' : '+'}</span>
          </button>

          {howToOpen && (
            <div style={{ marginBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 20 }}>
              {/* Measurement diagram — SVG placeholder matching screenshots */}
              <div style={{
                background: '#fff', borderRadius: 6, padding: '16px 12px',
                marginBottom: 20, display: 'flex', justifyContent: 'center',
              }}>
                <svg viewBox="0 0 320 200" width="100%" style={{ maxWidth: 320 }} aria-hidden="true">
                  {/* Front silhouette */}
                  <g transform="translate(40, 10)" stroke="#333" strokeWidth="1.5" fill="none">
                    <ellipse cx="40" cy="20" rx="16" ry="18" />
                    <path d="M26 37 Q10 50 8 80 Q6 110 10 180 H70 Q74 110 72 80 Q70 50 54 37" />
                    <path d="M8 80 Q0 90 2 130 L10 128" strokeWidth="1.2" />
                    <path d="M72 80 Q80 90 78 130 L70 128" strokeWidth="1.2" />
                    {/* 1 Chest */}
                    <line x1="8" y1="68" x2="72" y2="68" stroke="#e63" strokeWidth="1.8" />
                    <circle cx="5" cy="68" r="8" fill="#e63" stroke="none" />
                    <text x="5" y="71.5" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">1</text>
                    {/* 2 Waist */}
                    <line x1="10" y1="92" x2="70" y2="92" stroke="#e63" strokeWidth="1.8" />
                    <circle cx="5" cy="92" r="8" fill="#e63" stroke="none" />
                    <text x="5" y="95.5" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">2</text>
                    {/* 4 Low hip */}
                    <line x1="10" y1="130" x2="70" y2="130" stroke="#e63" strokeWidth="1.8" />
                    <circle cx="5" cy="130" r="8" fill="#e63" stroke="none" />
                    <text x="5" y="133.5" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">4</text>
                  </g>
                  {/* Back silhouette */}
                  <g transform="translate(185, 10)" stroke="#333" strokeWidth="1.5" fill="none">
                    <ellipse cx="40" cy="20" rx="16" ry="18" />
                    <path d="M26 37 Q10 50 8 80 Q6 110 10 180 H70 Q74 110 72 80 Q70 50 54 37" />
                    <path d="M8 80 Q0 90 2 130 L10 128" strokeWidth="1.2" />
                    <path d="M72 80 Q80 90 78 130 L70 128" strokeWidth="1.2" />
                    {/* 1 Chest */}
                    <line x1="8" y1="68" x2="72" y2="68" stroke="#e63" strokeWidth="1.8" />
                    <circle cx="75" cy="68" r="8" fill="#e63" stroke="none" />
                    <text x="75" y="71.5" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">1</text>
                    {/* 3 Arm length — arrow down right side */}
                    <path d="M80 45 L80 128" stroke="#e63" strokeWidth="1.8" markerEnd="url(#arr)" />
                    <circle cx="75" cy="40" r="8" fill="#e63" stroke="none" />
                    <text x="75" y="43.5" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">3</text>
                    {/* 4 Low hip */}
                    <line x1="10" y1="130" x2="70" y2="130" stroke="#e63" strokeWidth="1.8" />
                    <circle cx="75" cy="130" r="8" fill="#e63" stroke="none" />
                    <text x="75" y="133.5" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">4</text>
                  </g>
                </svg>
              </div>

              {HOW_TO_ITEMS.map(item => (
                <div key={item.num} style={{
                  display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start',
                }}>
                  <div style={{
                    flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 600, color: '#fff',
                  }}>{item.num}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── SELECT SIZE RANGE ── */}
          <p style={{
            textAlign: 'center', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)', marginBottom: 20,
          }}>
            SELECT SIZE RANGE
          </p>

          {/* Fit type toggle */}
          <div style={{
            display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.15)',
            marginBottom: 20,
          }}>
            {(['regular', 'maternity'] as FitType[]).map(ft => (
              <button
                key={ft}
                onClick={() => setFitType(ft)}
                style={{
                  flex: 1, background: 'none', border: 'none',
                  padding: '10px 0',
                  fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
                  color: fitType === ft ? '#fff' : 'rgba(255,255,255,0.35)',
                  fontWeight: fitType === ft ? 700 : 400,
                  borderBottom: fitType === ft ? '2px solid #fff' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'color .2s',
                  marginBottom: -1,
                }}
              >
                {ft.charAt(0).toUpperCase() + ft.slice(1)}
              </button>
            ))}
          </div>

          {/* Size range selector */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
            {(['xxs-s', 'm-xl', 'xxl-4xl'] as SizeRange[]).map(range => (
              <button
                key={range}
                onClick={() => setSizeRange(range)}
                style={{
                  flex: 1, padding: '10px 4px',
                  border: sizeRange === range ? '1.5px solid #fff' : '1px solid rgba(255,255,255,0.2)',
                  background: sizeRange === range ? '#fff' : 'transparent',
                  color: sizeRange === range ? '#111' : 'rgba(255,255,255,0.6)',
                  borderRadius: 3,
                  fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase',
                  fontWeight: sizeRange === range ? 700 : 400,
                  cursor: 'pointer',
                  transition: 'all .2s',
                }}
              >
                {rangeLabel[range]}
              </button>
            ))}
          </div>

          {/* ── Size table ── */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%', borderCollapse: 'collapse',
              fontSize: 13,
            }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <th style={{ padding: '10px 12px', textAlign: 'left', color: 'rgba(255,255,255,0.4)', fontWeight: 400, width: '35%' }} />
                  {columns.map(col => (
                    <th key={col.key} style={{
                      padding: '10px 12px', textAlign: 'center',
                      fontWeight: 700, letterSpacing: 1.5, fontSize: 12,
                      color: '#fff',
                    }}>
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={row.label} style={{
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    background: ri % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                  }}>
                    <td style={{
                      padding: '12px 12px', color: 'rgba(255,255,255,0.75)',
                      fontWeight: 600, fontSize: 13,
                    }}>
                      {row.label}
                    </td>
                    {columns.map(col => (
                      <td key={col.key} style={{
                        padding: '12px 12px', textAlign: 'center',
                        color: 'rgba(255,255,255,0.85)', fontSize: 13,
                      }}>
                        {row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              marginTop: 28, width: '100%', padding: '14px',
              border: '1.5px solid rgba(255,255,255,0.25)',
              background: 'transparent', color: '#fff',
              fontSize: 12, letterSpacing: 2.5, textTransform: 'uppercase',
              cursor: 'pointer', borderRadius: 3,
              fontWeight: 600,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
