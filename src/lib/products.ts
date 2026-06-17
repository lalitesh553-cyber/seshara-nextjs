// src/lib/products.ts

export interface Product {
  id: number
  slug: string
  name: string
  tag: string
  description: string
  category: 'men' | 'women'
  price: number
  badge?: string | null
  images: string[]
}

export const products: Product[] = [
  {
    id: 1,
    slug: 'sunlit-heritage-collar-shirt',
    name: 'Sunlit Heritage Collar Shirt',
    tag: 'Handloom Cotton · Ivory',
    description:
      'A timeless handloom cotton shirt crafted for everyday comfort. Breathable, lightweight, and designed to reflect India’s slow-fashion heritage.',
    category: 'men',
    price: 2600,
    badge: null,
    images: [
      '/catalogue-1.jpeg',
      '/catalogue-1-1.jpeg',
    ],
  },

  {
    id: 2,
    slug: 'sapphire-breeze-casual-shirt',
    name: 'Sapphire Breeze Casual Shirt',
    tag: 'Cotton Linen · Navy',
    description:
      'Premium cotton-linen blend shirt with a relaxed silhouette. Designed for warm weather and effortless elegance.',
    category: 'men',
    price: 2900,
    badge: 'New',
    images: [
      '/catalogue-2.jpeg',
      '/catalogue-2-1.jpeg',
    ],
  },

  {
    id: 3,
    slug: 'brickwood-classic-kurta-shirt',
    name: 'Brickwood Classic Kurta Shirt',
    tag: 'Handloom · Maroon Check',
    description:
      'A handcrafted kurta-inspired shirt featuring traditional weaving techniques and contemporary tailoring.',
    category: 'men',
    price: 2800,
    badge: 'Bestseller',
    images: [
      '/catalogue-3.jpeg',
      '/catalogue-3-1.jpeg',
      '/catalogue-3-2.jpeg',
    ],
  },

  {
    id: 4,
    slug: 'sunset-cocoa-sleeveless-shirt',
    name: 'Sunset Cocoa Sleeveless Shirt',
    tag: 'Cotton · Maroon Check',
    description:
      'Minimalist sleeveless design made from soft breathable cotton. A versatile piece for everyday layering.',
    category: 'women',
    price: 2500,
    badge: null,
    images: [
      '/catalogue-4.png',
      '/catalogue-4-1.png',
    ],
  },

  {
    id: 5,
    slug: 'royal-kalamkari-summer-top',
    name: 'Royal Kalamkari Summer Top',
    tag: 'Kalamkari Block Print · Red',
    description:
      'Handcrafted Kalamkari-inspired summer top celebrating traditional Indian artistry and natural textures.',
    category: 'women',
    price: 3200,
    badge: 'Bestseller',
    images: [
      '/catalogue-5.jpeg',
      '/catalogue-5-1.jpeg',
      '/catalogue-5-2.jpeg',
    ],
  },

  {
    id: 999,
    slug: 'test-womens-product',
    name: 'Test Women Product',
    tag: 'Testing · Checkout Flow',
    description:
      'Temporary ₹1 product for testing cart, checkout, payment and order flow.',
    category: 'women',
    price: 1,
    badge: 'TEST',
    images: [
      '/catalogue-5.jpeg',
      '/catalogue-5-1.jpeg',
    ],
  },
]

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getRelatedProducts(
  currentProductId: number,
  category?: string
) {
  return products
    .filter(
      (product) =>
        product.id !== currentProductId &&
        (!category || product.category === category)
    )
    .slice(0, 4)
}
