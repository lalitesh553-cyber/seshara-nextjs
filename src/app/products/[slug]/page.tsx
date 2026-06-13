import { notFound } from 'next/navigation';
import { getProductBySlug, products, getRelatedProducts } from '@/lib/products';
import ProductDetailsClient from './ProductDetailsClient';

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  const related = getRelatedProducts(product.id);
  return <ProductDetailsClient product={product} relatedProducts={related} />;
}
