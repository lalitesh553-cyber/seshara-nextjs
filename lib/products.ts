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
    description: "Handwoven with traditional techniques. Breathable fabric perfect for all-day comfort.",
    fabric: "100% Handloom Cotton",
    color: "Ivory",
    sku: "SHS-101",
    price: 2600,
    discountPercent: 0,
    stock: 25,
    images: ["/catalogue-1.jpeg", "/catalogue-1-1.jpeg"],
    badge: null,
    sizes: ["XS", "S", "M", "L", "XL"],
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
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: 3,
    slug: "brickwood-classic-kurta-shirt",
    name: "Brickwood Classic Kurta Shirt",
    tag: "Handloom · Maroon Check",
    description: "Traditional kurta-style shirt with modern comfort.",
    fabric: "Handloom Cotton",
    color: "Maroon Check",
    sku: "BCK-303",
    price: 2800,
    discountPercent: 0,
    stock: 12,
    images: ["/catalogue-3.jpeg", "/catalogue-3-1.jpeg", "/catalogue-3-2.jpeg"],
    badge: "Bestseller",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 4,
    slug: "sunset-cocoa-sleeveless-shirt",
    name: "Sunset Cocoa Sleeveless Shirt",
    tag: "Cotton · Maroon Check",
    description: "Sleeveless summer essential with breezy fit.",
    fabric: "Cotton",
    color: "Maroon",
    sku: "SCS-404",
    price: 2500,
    discountPercent: 0,
    stock: 20,
    images: ["/catalogue-4.png", "/catalogue-4-1.png"],
    badge: null,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 5,
    slug: "royal-kalamkari-summer-top",
    name: "Royal Kalamkari Summer Top",
    tag: "Kalamkari Block Print · Red",
    description: "Hand-block printed Kalamkari top, vibrant and artistic.",
    fabric: "Cotton",
    color: "Red",
    sku: "RKT-505",
    price: 3200,
    discountPercent: 0,
    stock: 8,
    images: ["/catalogue-5.jpeg", "/catalogue-5-1.jpeg", "/catalogue-5-2.jpeg"],
    badge: "Bestseller",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getRelatedProducts(currentId: number, limit = 4): Product[] {
  return products.filter(p => p.id !== currentId).slice(0, limit);
}
