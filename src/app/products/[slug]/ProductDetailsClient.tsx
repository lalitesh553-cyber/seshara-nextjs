'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/products';

function SizeSelector({ sizes, selected, onSelect }: { sizes: string[]; selected: string; onSelect: (s: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {sizes.map(size => (
        <button key={size} onClick={() => onSelect(size)} className={`px-4 py-2 text-sm border ${selected === size ? 'border-amber-800 bg-amber-800 text-white' : 'border-amber-200 text-amber-800 hover:border-amber-400'}`}>
          {size}
        </button>
      ))}
    </div>
  );
}

function SizeGuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  const sizeChart = [
    { size: 'XS', chest: 34, waist: 28, hip: 34 },
    { size: 'S', chest: 36, waist: 30, hip: 36 },
    { size: 'M', chest: 38, waist: 32, hip: 38 },
    { size: 'L', chest: 40, waist: 34, hip: 40 },
    { size: 'XL', chest: 42, waist: 36, hip: 42 },
  ];
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-serif">Size Guide</h2>
          <button onClick={onClose} className="text-2xl">×</button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Standard Size Chart (inches)</h3>
            <table className="w-full text-sm border">
              <thead className="bg-amber-50"><tr><th>Size</th><th>Chest</th><th>Waist</th><th>Hip</th></tr></thead>
              <tbody>
                {sizeChart.map(row => (
                  <tr key={row.size} className="border-t"><td className="p-2">{row.size}</td><td>{row.chest}</td><td>{row.waist}</td><td>{row.hip}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div><h3 className="font-semibold">How to Measure</h3><ul className="list-disc pl-5 text-sm"><li>Chest: around fullest part.</li><li>Waist: natural waistline.</li><li>Hip: around fullest part.</li></ul></div>
          <div><h3 className="font-semibold">Fit Recommendation</h3><div className="text-sm">Slim Fit · Regular Fit · Relaxed Fit</div></div>
        </div>
      </div>
    </div>
  );
}

function CustomMeasurementForm({ onChange }: { onChange: (data: any) => void }) {
  const [unit, setUnit] = useState('cm');
  const [values, setValues] = useState({});
  const fields = ['Shoulder Length', 'Armhole Round', 'Upper Chest Round', 'Chest Round', 'Lower Chest Round', 'Point Length', 'Bodice Length', 'Waist Round', 'Tummy', 'Hip Round', 'Sleeve Length', 'Bicep', 'Elbow Round', 'Front Neck Length', 'Back Neck Length', 'Dress Length', 'Crop Top Length', 'Lehenga Length', 'Pant Length', 'Thigh', 'Ankle', 'Height'];
  const handleChange = (key: string, val: string) => {
    const newValues = { ...values, [key]: parseFloat(val) || 0, unit };
    setValues(newValues);
    onChange(newValues);
  };
  return (
    <div className="mt-3 border-t pt-4">
      <div className="flex justify-between items-center mb-3"><span className="text-sm font-medium">Enter your measurements</span><div className="flex gap-2"><button onClick={() => setUnit('cm')} className={`px-2 py-1 text-xs ${unit === 'cm' ? 'bg-amber-800 text-white' : 'border'}`}>cm</button><button onClick={() => setUnit('inch')} className={`px-2 py-1 text-xs ${unit === 'inch' ? 'bg-amber-800 text-white' : 'border'}`}>inch</button></div></div>
      <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">{fields.map(f => { const key = f.toLowerCase().replace(/ /g, ''); return (<div key={key}><label className="block text-xs text-gray-600">{f}</label><input type="number" step="0.1" onChange={e => handleChange(key, e.target.value)} className="w-full border border-amber-200 rounded p-1 text-sm" /></div>); })}</div>
      <p className="text-xs text-gray-400 mt-2">Unit: {unit}</p>
    </div>
  );
}

function ShippingEstimator() {
  const [pincode, setPincode] = useState('');
  const [estimate, setEstimate] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const check = async () => {
    if (!/^\d{6}$/.test(pincode)) return;
    setLoading(true);
    const res = await fetch('/api/shipping-estimate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pincode }) });
    const data = await res.json();
    setEstimate(data);
    setLoading(false);
  };
  return (
    <div className="border-t border-amber-100 pt-4"><div className="flex gap-2"><input type="text" placeholder="Enter pincode" value={pincode} onChange={e => setPincode(e.target.value)} className="border border-amber-200 rounded px-3 py-2 text-sm w-32" maxLength={6} /><button onClick={check} className="bg-amber-100 text-amber-800 px-4 py-2 text-sm rounded">Check</button></div>{loading && <p className="text-xs mt-2">Checking...</p>}{estimate && !estimate.error && <div className="mt-2 text-sm"><p><strong>Estimated Delivery:</strong> {estimate.deliveryDate}</p><p><strong>Shipping Cost:</strong> {estimate.cost === 0 ? 'Free' : `₹${estimate.cost}`}</p><p><strong>Courier:</strong> {estimate.courier}</p>{estimate.codAvailable && <p className="text-green-700">COD Available</p>}</div>}{estimate?.error && <p className="text-xs text-red-600 mt-2">{estimate.error}</p>}</div>
  );
}

function Tabs({ active, setActive, content }: { active: string; setActive: (id: string) => void; content: Record<string, string> }) {
  const tabs = [{ id: 'desc', label: 'Description' }, { id: 'care', label: 'Fabric & Care' }, { id: 'shipping', label: 'Shipping' }, { id: 'returns', label: 'Returns' }];
  return (<div className="border-t pt-6"><div className="flex gap-6 border-b">{tabs.map(t => (<button key={t.id} onClick={() => setActive(t.id)} className={`pb-2 text-sm ${active === t.id ? 'border-b-2 border-amber-800 text-amber-800' : 'text-gray-500'}`}>{t.label}</button>))}</div><div className="mt-4 text-sm text-gray-700">{content[active]}</div></div>);
}

export default function ProductDetailsClient({ product, relatedProducts }: { product: Product; relatedProducts: Product[] }) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customMeasurements, setCustomMeasurements] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState('desc');

  const handleAddToCart = () => {
    if (!isCustomMode && !selectedSize) return;
    addItem({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.images[0], size: selectedSize, customMeasurements: isCustomMode ? customMeasurements : null, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const tabContent = { desc: product.description, care: `Fabric: ${product.fabric}. Gentle machine wash cold. Do not bleach.`, shipping: 'Free shipping above ₹999. Usually delivered in 5-7 business days.', returns: 'Easy 7-day returns. Items must be unworn with tags.' };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div><div className="aspect-[3/4] bg-gray-100 relative overflow-hidden rounded-lg"><img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover object-top" /></div>{product.images.length > 1 && (<div className="flex gap-3 mt-4 overflow-x-auto pb-2">{product.images.map((img, idx) => (<button key={idx} onClick={() => setSelectedImage(idx)} className={`relative w-20 h-24 flex-shrink-0 rounded-md overflow-hidden border-2 ${idx === selectedImage ? 'border-amber-700' : 'border-transparent'}`}><img src={img} alt="" className="w-full h-full object-cover" /></button>))}</div>)}</div>
        <div className="space-y-6">
          <div><p className="text-xs tracking-wider text-amber-800 uppercase">{product.tag}</p><h1 className="text-3xl font-serif font-normal mt-1">{product.name}</h1><div className="flex items-baseline gap-2 mt-2"><span className="text-2xl font-serif">₹{product.price.toLocaleString('en-IN')}</span>{product.discountPercent > 0 && (<span className="text-sm line-through text-gray-400">₹{Math.round(product.price / (1 - product.discountPercent / 100)).toLocaleString()}</span>)}</div><p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p></div><hr /><div><div className="flex justify-between items-center"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={isCustomMode} onChange={e => setIsCustomMode(e.target.checked)} /><span>Custom measurements (tailor‑made)</span></label><button onClick={() => setShowSizeGuide(true)} className="text-xs underline text-amber-700">Size Guide</button></div>{!isCustomMode ? <SizeSelector sizes={product.sizes} selected={selectedSize} onSelect={setSelectedSize} /> : <CustomMeasurementForm onChange={setCustomMeasurements} />}</div><div className="flex items-center gap-4"><span className="text-sm">Qty:</span><div className="flex border border-amber-200 rounded"><button onClick={() => setQuantity(q => Math.max(1, q-1))} className="px-3 py-1">-</button><span className="px-4 py-1">{quantity}</span><button onClick={() => setQuantity(q => q+1)} className="px-3 py-1">+</button></div></div><ShippingEstimator /><div className="flex gap-4"><button onClick={handleAddToCart} className="flex-1 bg-amber-800 text-white py-3 text-sm uppercase tracking-wider hover:bg-amber-900 transition">{added ? '✓ Added' : 'Add to Cart'}</button><button onClick={handleAddToCart} className="flex-1 border border-amber-800 text-amber-800 py-3 text-sm uppercase tracking-wider hover:bg-amber-50 transition">Buy Now</button></div><Tabs active={activeTab} setActive={setActiveTab} content={tabContent} /></div>
      </div>
      {relatedProducts.length > 0 && (<section className="mt-20"><h2 className="text-2xl font-serif font-normal mb-6">You May Also Like</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{relatedProducts.map(rel => (<Link key={rel.id} href={`/products/${rel.slug}`} className="group"><div className="aspect-[3/4] bg-gray-100 overflow-hidden"><img src={rel.images[0]} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition" /></div><p className="text-sm font-serif mt-2">{rel.name}</p><p className="text-xs">₹{rel.price.toLocaleString()}</p></Link>))}</div></section>)}
      <SizeGuideModal open={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </main>
  );
}
