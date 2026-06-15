# Seshara — Next.js Project

Slow fashion, handloom cotton. Built with **Next.js 14 + TypeScript**.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
seshara-nextjs-main/
├── public/                             # Static assets served at root
│   ├── hero-1.png … hero-6.png         # Hero slider images
│   ├── item-1.jpg … item-4.jpg         # Product item images
│   ├── catalogue-1.jpeg                # Product catalogue images
│   ├── catalogue-1-1.jpeg
│   ├── catalogue-2.jpeg
│   ├── catalogue-2-1.jpeg
│   ├── catalogue-3.jpeg
│   ├── catalogue-3-1.jpeg
│   ├── catalogue-3-2.jpeg
│   ├── catalogue-4.png
│   ├── catalogue-4-1.png
│   ├── catalogue-5.jpeg
│   ├── catalogue-5-1.jpeg
│   ├── catalogue-5-2.jpeg
│   ├── 2nd-herobanner.jpg              # Second hero banner
│   ├── aboutposter.png                 # About page poster
│   ├── accent-rays.png                 # Decorative rays graphic
│   ├── artisan-banner.png              # Artisan section banner
│   ├── banner-1.png                    # Generic banners
│   ├── banner-2.png
│   ├── clock.png                       # Process section icons
│   ├── time.png
│   ├── sewingmachine.png
│   ├── createyours-hero.webp           # Design-yours page hero
│   ├── dancer.png                      # Decorative illustrations
│   ├── indian-body.png
│   ├── mudra1.png
│   ├── mudra2.png
│   ├── lotus.png
│   ├── sunflower.png
│   ├── stamp.png
│   ├── finalsection.png                # Final/CTA section image
│   ├── founderslide-1.png              # Founder section image
│   ├── prasanna.png                    # Founder photo
│   ├── village-banner.png              # Village artisan banner
│   ├── village-bg.jpg                  # Village background
│   └── favicon.ico
│
├── src/
│   ├── app/                            # Next.js App Router
│   │   ├── layout.tsx                  # Root layout + metadata + CartProvider
│   │   ├── page.tsx                    # Home page (assembles all section components)
│   │   ├── globals.css                 # Global styles, design tokens, animations
│   │   │
│   │   ├── products/                   # Product pages
│   │   │   ├── page.tsx                # Product listing — filter by men / women
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Dynamic product detail, size picker,
│   │   │                               # custom measurements, Razorpay checkout
│   │   │
│   │   ├── design-yours/               # Custom garment design flow
│   │   │   ├── layout.tsx              # Scoped layout for design-yours
│   │   │   └── page.tsx                # Multi-step custom design page
│   │   │
│   │   ├── admin/                      # Admin panel (cookie-protected)
│   │   │   ├── layout.tsx              # Admin shell layout
│   │   │   ├── page.tsx                # Redirects to /admin/dashboard
│   │   │   ├── login/
│   │   │   │   └── page.tsx            # Admin login (sets admin-auth cookie)
│   │   │   └── dashboard/
│   │   │       └── page.tsx            # Admin dashboard
│   │   │
│   │   └── api/                        # API route handlers
│   │       ├── razorpay/
│   │       │   └── route.ts            # POST — creates Razorpay order, returns order_id
│   │       └── send-order-email/
│   │           └── route               # POST — sends order confirmation email
│   │
│   ├── components/                     # Shared UI components
│   │   ├── AnnouncementBar.tsx         # Scrolling top promo bar
│   │   ├── Navbar.tsx                  # Fixed nav with cart icon + mobile menu
│   │   ├── HeroStrip.tsx               # Auto-scrolling hero cards (hero-1 to hero-6)
│   │   ├── ArtisanBanner.tsx           # Village / artisan banner with CTA
│   │   ├── CatalogSection.tsx          # Homepage product catalogue grid
│   │   ├── FounderBannerScroll.tsx     # Scroll-animated founder story
│   │   ├── MagicSection.tsx            # "The magic behind our pieces" section
│   │   ├── Footer.tsx                  # Full footer with links
│   │   ├── CartDrawer.tsx              # Slide-in cart sidebar
│   │   ├── CustomMeasurementModal.tsx  # Modal for entering custom measurements
│   │   ├── ShippingDetailsModal.tsx    # Modal for shipping address entry
│   │   └── ChatWidget.tsx              # Floating chat / support widget
│   │
│   ├── context/
│   │   └── CartContext.tsx             # React context — cart state, add / remove / qty
│   │
│   ├── lib/
│   │   └── products.ts                 # Product interface, 5 products array,
│   │                                   # getProductBySlug(), getRelatedProducts()
│   │
│   └── middleware.ts                   # Protects /admin/* routes via admin-auth cookie
│
├── next.config.js                      # Image config, security headers, compression
├── tsconfig.json                       # TypeScript config
├── package.json                        # Dependencies: Next 14, React 18, Razorpay
├── pnpm-workspace.yaml                 # pnpm workspace config
├── vercel.json                         # Vercel deployment config
├── .env.example                        # Environment variable template
├── .eslintrc.json                      # ESLint config
├── .gitignore
├── RAZORPAY_SETUP.md                   # Razorpay integration guide
└── README.md                           # Project documentation


## Swapping Products

Edit `src/components/CatalogSection.tsx` — update the `springProducts` and `editProducts` arrays with real product data (name, price, image path in `/public`).

## Adding Pages

```bash
# e.g. shop page
src/app/shop/page.tsx
```

## Deploy

```bash
npm run build
npm run start
# or deploy to Vercel — just connect the repo
```
