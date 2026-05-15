# Razorpay Payment Gateway — Setup Guide

## Why "Login Required" / "Payment Failed" on localhost

Razorpay **live keys** (`rzp_live_...`) only work on:
- Verified production domains (seshara.in)
- Activated Razorpay accounts (KYC complete + bank account linked)

**On localhost you MUST use TEST keys.**

---

## Step 1 — Get Test Keys (works immediately, no KYC)

1. Login → https://dashboard.razorpay.com
2. Top-left toggle: switch to **"Test Mode"**
3. Go to **Settings → API Keys → Generate Test Key**
4. Copy `rzp_test_XXXXXXXXXXXX`

---

## Step 2 — Update .env.local for local dev

```bash
# .env.local (localhost testing)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
```

```bash
# .env.production (Vercel / live server)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_lKSoHbd6G9yWtfxUV96dQgBP
```

Then restart dev server:
```bash
npm run dev
```

---

## Step 3 — Test card numbers (no real money)

| Card | Number | CVV | Expiry |
|------|--------|-----|--------|
| Visa success | 4111 1111 1111 1111 | any 3 digits | any future date |
| Mastercard success | 5267 3181 8797 5449 | any | any future |
| Failure card | 4000 0000 0000 0002 | any | any future |

UPI Test ID: `success@razorpay`

---

## Step 4 — Activate Live Payments (production)

1. Dashboard → **Account & Settings → Business Profile**
2. Complete KYC (PAN, Aadhaar, bank account)
3. Once approved (1-2 business days), live keys activate
4. Add domain `seshara.in` in Dashboard → Settings → Website/App

---

## Step 5 — Server-side Payment Verification (IMPORTANT for production)

Currently the handler just shows the payment ID. In production you **must** verify:

Create `src/app/api/verify-payment/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json()

  const secret = process.env.RAZORPAY_KEY_SECRET! // server-only, never NEXT_PUBLIC_

  const body = razorpay_order_id + '|' + razorpay_payment_id
  const expected = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')

  if (expected === razorpay_signature) {
    // ✓ Payment is genuine — fulfill the order
    return NextResponse.json({ verified: true })
  }
  return NextResponse.json({ verified: false }, { status: 400 })
}
```

Add to `.env.local`:
```
RAZORPAY_KEY_SECRET=your_secret_key_here   # from Razorpay dashboard, NOT NEXT_PUBLIC
```

---

## Vercel Deployment Checklist

```
1. Push code to GitHub (private repo)
2. Import at vercel.com/new
3. Add Environment Variables in Vercel dashboard:
   NEXT_PUBLIC_RAZORPAY_KEY_ID = rzp_live_lKSoHbd6G9yWtfxUV96dQgBP
   RAZORPAY_KEY_SECRET         = your_secret_key
   NEXT_PUBLIC_SITE_URL        = https://seshara.in
4. Deploy
5. Add custom domain seshara.in in Vercel → Settings → Domains
```

---

## Quick Test Flow (right now on localhost)

```bash
# 1. Get test key from dashboard.razorpay.com (Test Mode)
# 2. Update .env.local:
echo "NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY" >> .env.local

# 3. Restart
npm run dev

# 4. Add items → Cart → Pay → use test card 4111 1111 1111 1111
```
