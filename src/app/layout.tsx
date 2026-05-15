import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: 'Seshara — Slow Fashion, Handloom Cotton',
  description: 'Premium handloom clothing made in India. Comfort woven into every day.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Seshara — Slow Fashion, Handloom Cotton',
    description: 'Premium handloom clothing made in India.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
