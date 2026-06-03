'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  text: string
  time: string
}

const QUICK_REPLIES = [
  'What fabrics do you use?',
  'Help me find my size',
  'Track my order',
  'Show bestsellers',
  'Return policy',
]

const SYSTEM_PROMPT = `You are Seshi, Seshara's warm and knowledgeable style assistant. Seshara is an Indian slow-fashion brand selling handloom cotton clothing — shirts, kurtas, and tops — made in small batches with natural fabrics. Prices range ₹2,500–₹3,200.

Products:
- Sunlit Heritage Collar Shirt (Handloom Cotton, Ivory) ₹2,600
- Sapphire Breeze Casual Shirt (Cotton Linen, Navy) ₹2,900
- Brickwood Classic Kurta Shirt (Handloom, Maroon Check) ₹2,800
- Sunset Cocoa Sleeveless Shirt (Cotton, Maroon Check) ₹2,500
- Royal Kalamkari Summer Top (Kalamkari Block Print, Red) ₹3,200

Size guide: XS (bust 32"), S (34"), M (36"), L (38"), XL (40"). All pieces run true to size.
Shipping: Free above ₹999. Buy 3, pay for 2.
Returns: 7-day exchange policy.
Fabric care: gentle machine wash cold, flat dry, no tumble dry.

Be warm, concise, use occasional ♡ or ✦. Never make up info not listed above.`

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hi! I\'m Seshi ✦ your Seshara style guide. How can I help you today? ♡', time: now() },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [unread, setUnread] = useState(1)
  const [showQuick, setShowQuick] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function now() {
    return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 300) }
  }, [open])

  const send = async (text: string) => {
    if (!text.trim() || loading) return
    setShowQuick(false)
    const userMsg: Message = { role: 'user', text, time: now() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.text }))
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: history,
        }),
      })
      const data = await res.json()
      const reply = data.content?.[0]?.text ?? 'Sorry, I had trouble responding. Please try again ♡'
      setMessages(prev => [...prev, { role: 'assistant', text: reply, time: now() }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: "Oops! Something went wrong. I'm here if you try again ♡", time: now() }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) }
  }

  return (
    <>
      {/* ── FAB Button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open chat"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 1200,
          width: 58, height: 58, borderRadius: '50%',
          background: 'linear-gradient(135deg, #8b3a1e 0%, #5c3620 100%)',
          border: '2px solid rgba(201,169,110,0.35)',
          boxShadow: '0 8px 32px rgba(139,58,30,0.45), 0 2px 8px rgba(0,0,0,0.2)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          transform: open ? 'scale(0.92) rotate(15deg)' : 'scale(1)',
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(245,238,218,0.9)" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(245,238,218,0.9)" strokeWidth="1.8">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            <circle cx="8.5" cy="10.5" r="1" fill="rgba(245,238,218,0.9)"/>
            <circle cx="12" cy="10.5" r="1" fill="rgba(245,238,218,0.9)"/>
            <circle cx="15.5" cy="10.5" r="1" fill="rgba(245,238,218,0.9)"/>
          </svg>
        )}
        {/* Unread badge */}
        {!open && unread > 0 && (
          <div style={{
            position: 'absolute', top: -2, right: -2, width: 18, height: 18,
            background: '#c0392b', borderRadius: '50%', border: '2px solid #fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, color: '#fff', fontFamily: 'DM Sans,sans-serif', fontWeight: 700,
          }}>{unread}</div>
        )}
      </button>

      {/* ── Chat Panel ── */}
      <div style={{
        position: 'fixed', bottom: 96, right: 20, zIndex: 1199,
        width: 'clamp(300px, 90vw, 380px)',
        maxHeight: 'min(560px, 80vh)',
        background: '#faf7f2',
        borderRadius: 16,
        boxShadow: '0 24px 64px rgba(46,26,14,0.22), 0 4px 16px rgba(0,0,0,0.12)',
        border: '1px solid rgba(139,58,30,0.12)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        transform: open ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'all 0.3s cubic-bezier(0.34,1.2,0.64,1)',
        transformOrigin: 'bottom right',
      }}>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #8b3a1e 0%, #5c3620 100%)',
          padding: '14px 18px 14px',
          display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0,
        }}>
          {/* Avatar */}
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(245,238,218,0.15)',
            border: '2px solid rgba(201,169,110,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, flexShrink: 0,
          }}>✦</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: 'Playfair Display,serif', fontSize: 15, fontWeight: 500, color: 'rgba(245,238,218,0.95)', marginBottom: 2 }}>Seshi</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', animation: 'onlinePulse 2s ease-in-out infinite' }} />
              <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: 10, color: 'rgba(201,169,110,0.7)', letterSpacing: 0.5 }}>Seshara Style Guide · Online</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,238,218,0.5)', fontSize: 18, lineHeight: 1, padding: 4 }}>×</button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 8px', display: 'flex', flexDirection: 'column', gap: 12, scrollbarWidth: 'none' }}>
          <style>{`.chat-scroll::-webkit-scrollbar{display:none}`}</style>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start', gap: 3 }}>
              {m.role === 'assistant' && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#8b3a1e,#5c3620)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'rgba(245,238,218,0.9)', flexShrink: 0 }}>✦</div>
                  <div style={{
                    background: '#fff', borderRadius: '14px 14px 14px 2px',
                    padding: '10px 14px', maxWidth: '82%',
                    boxShadow: '0 2px 8px rgba(46,26,14,0.06)',
                    border: '1px solid rgba(139,58,30,0.07)',
                  }}>
                    <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: 13, color: 'var(--brown2)', lineHeight: 1.6, margin: 0 }}>{m.text}</p>
                  </div>
                </div>
              )}
              {m.role === 'user' && (
                <div style={{
                  background: 'linear-gradient(135deg,#8b3a1e,#5c3620)',
                  borderRadius: '14px 14px 2px 14px',
                  padding: '10px 14px', maxWidth: '82%',
                }}>
                  <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: 13, color: 'rgba(245,238,218,0.95)', lineHeight: 1.6, margin: 0 }}>{m.text}</p>
                </div>
              )}
              <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: 9, color: 'rgba(139,90,60,0.35)', letterSpacing: 0.5, paddingLeft: m.role === 'assistant' ? 34 : 0 }}>{m.time}</p>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#8b3a1e,#5c3620)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'rgba(245,238,218,0.9)', flexShrink: 0 }}>✦</div>
              <div style={{ background: '#fff', borderRadius: '14px 14px 14px 2px', padding: '12px 16px', border: '1px solid rgba(139,58,30,0.07)', display: 'flex', gap: 5, alignItems: 'center' }}>
                {[0, 0.2, 0.4].map((d, i) => (
                  <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(139,58,30,0.3)', animation: `typingDot 1.2s ease-in-out ${d}s infinite` }} />
                ))}
              </div>
            </div>
          )}

          {/* Quick replies */}
          {showQuick && !loading && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingLeft: 34 }}>
              {QUICK_REPLIES.map(q => (
                <button key={q} onClick={() => send(q)} style={{
                  padding: '5px 11px', borderRadius: 20,
                  border: '1px solid rgba(139,58,30,0.22)',
                  background: 'rgba(245,240,232,0.8)',
                  fontFamily: 'DM Sans,sans-serif', fontSize: 11,
                  color: 'var(--brown2)', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>{q}</button>
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '10px 14px 14px', borderTop: '1px solid rgba(139,58,30,0.08)',
          display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0,
          background: '#fff',
        }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask Seshi anything..."
            style={{
              flex: 1, padding: '10px 14px', borderRadius: 24,
              border: '1.5px solid rgba(139,58,30,0.15)',
              background: '#faf7f2',
              fontFamily: 'DM Sans,sans-serif', fontSize: 13, color: 'var(--brown)',
              outline: 'none', transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--terra)'}
            onBlur={e => e.target.style.borderColor = 'rgba(139,58,30,0.15)'}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            style={{
              width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
              background: input.trim() && !loading ? 'var(--terra)' : 'rgba(139,58,30,0.15)',
              border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.25s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !loading ? '#fff' : 'rgba(139,58,30,0.4)'} strokeWidth="2.5">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>

        {/* Branding */}
        <div style={{ padding: '6px 0 8px', textAlign: 'center', background: '#fff', borderTop: '1px solid rgba(139,58,30,0.05)' }}>
          <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 10, color: 'rgba(139,90,60,0.35)', fontStyle: 'italic', letterSpacing: 1 }}>Powered by Seshara AI ✦</p>
        </div>
      </div>

      <style>{`
        @keyframes onlinePulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.85)}}
        @keyframes typingDot{0%,80%,100%{transform:scale(0.7);opacity:0.4}40%{transform:scale(1);opacity:1}}
      `}</style>
    </>
  )
}
