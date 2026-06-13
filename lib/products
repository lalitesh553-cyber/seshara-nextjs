// lib/products.ts
export interface Product {
  id: number;
  slug: string;
  name: string;
  tag: string;
  description: string;
  fabric: string;
  color: string;
  sku: string;
  price: number;
  discountPercent?: number;
  stock: number;
  images: string[];
  badge?: string | null;
  sizes: string[];
}

export const products: Product[] = [
  {
    id: 1,
    slug: "sunlit-heritage-collar-shirt",
    name: "Sunlit Heritage Collar Shirt",
    tag: "Handloom Cotton · Ivory",
    description: "A timeless shirt handwoven with traditional techniques. Breathable, soft, and perfect for all-day comfort.",
    fabric: "100% Handloom Cotton",
    color: "Ivory",
    sku: "SHS-101",
    price: 2600,
    discountPercent: 0,
    stock: 25,
    images: ["/catalogue-1.jpeg", "/catalogue-1-1.jpeg"],
    badge: null,
    sizes: ["XS","S","M","L","XL"],
  },
  {
    id: 2,
    slug: "sapphire-breeze-casual-shirt",
    name: "Sapphire Breeze Casual Shirt",
    tag: "Cotton Linen · Navy",
    description: "Lightweight cotton linen blend, ideal for summer breezes.",
    fabric: "55% Cotton / 45% Linen",
    color: "Navy",
    sku: "SBC-202",
    price: 2900,
    discountPercent: 10,
    stock: 18,
    images: ["/catalogue-2.jpeg", "/catalogue-2-1.jpeg"],
    badge: "New",
    sizes: ["XS","S","M","L","XL","XXL"],
  },
  // ... add products 3,4,5 similarly with proper slugs
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getRelatedProducts(currentId: number, limit = 4): Product[] {
  return products.filter(p => p.id !== currentId).slice(0, limit);
}products.ts
