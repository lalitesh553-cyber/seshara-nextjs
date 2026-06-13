import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { pincode } = await req.json();
  if (!/^\d{6}$/.test(pincode)) {
    return NextResponse.json({ error: 'Invalid pincode' }, { status: 400 });
  }
  // Mock logic – replace with real courier API
  const deliverable = pincode.startsWith('110') || pincode.startsWith('400') || pincode.startsWith('560');
  if (!deliverable) {
    return NextResponse.json({ error: 'Pincode not serviceable' }, { status: 400 });
  }
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 5) + 2);
  return NextResponse.json({
    deliveryDate: deliveryDate.toLocaleDateString('en-IN'),
    cost: 0,
    courier: 'DTDC / Delhivery',
    codAvailable: true,
  });
}
