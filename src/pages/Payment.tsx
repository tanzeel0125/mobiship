import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CreditCard } from 'lucide-react';
import MobiShipTopNav from '@/components/MobiShipTopNav';
import { useAppStore } from '@/store/useAppStore';

const Payment = () => {
  const navigate = useNavigate();
  const user = useAppStore(s => s.user);
  const addOrder = useAppStore(s => s.addOrder);
  const [loading, setLoading] = useState(false);
  const [cardNum, setCardNum] = useState('4000 1234 5678 9010');
  const [expiry, setExpiry] = useState('12/27');
  const [cvv, setCvv] = useState('');
  const [payMethod, setPayMethod] = useState<'card' | 'paypal'>('card');

  const total = parseFloat(sessionStorage.getItem('mobiship_total') || '16.30');
  const draft = JSON.parse(sessionStorage.getItem('mobiship_ship_draft') || '{}');
  const carrier = draft.carrier || { carrier: 'UPS', service: 'UPS Ground', price: 15.38 };
  const tax = Math.round((total - carrier.price) * 100) / 100;

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      const orderId = (10000 + Math.floor(Math.random() * 90000)).toString();
      addOrder({
        id: orderId,
        carrier: carrier.carrier,
        service: carrier.service,
        senderName: user?.name || 'User',
        senderAddress: user?.location || '10000 Eldorado Drive, San Marcos, CA 92069',
        recipientName: 'Jessica Smith',
        recipientAddress: draft.recipientAddress || '2856 Cherry Blossom Ln, Portland, OR 97227',
        status: 'In Transit',
        deliveryDate: 'Feb 6, 2026',
        price: total,
        trackingNumber: '1Z' + Math.random().toString(36).substring(2, 18).toUpperCase(),
        item: draft.description || 'Shoes',
        weight: draft.weight || '3 lbs 8 oz',
        dimensions: draft.dimensions || '12" × 10" × 6"',
        trackingSteps: [
          { status: 'Label Created', location: user?.location?.split(',')[1]?.trim() || 'San Marcos, CA', timestamp: 'Today, ' + new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }), completed: true },
          { status: 'Picked Up', location: '', timestamp: 'Pending', completed: false, current: true },
          { status: 'In Transit', location: '', timestamp: 'Pending', completed: false },
          { status: 'Out for Delivery', location: '', timestamp: 'Pending', completed: false },
          { status: 'Delivered', location: '', timestamp: 'Pending', completed: false },
        ],
      });
      sessionStorage.setItem('mobiship_last_order_id', orderId);
      navigate('/ship/confirmation', { replace: true });
    }, 1500);
  };

  return (
    <div className="mobile-shell pb-24 min-h-screen">
      <MobiShipTopNav showBack />
      <div className="px-4 py-4 space-y-4 page-enter">
        <h1 className="font-heading text-lg font-bold">Payment Details</h1>

        {/* Billing Address */}
        <div className="bg-card rounded-xl shadow-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-heading font-bold text-sm">Billing Address</span>
            <button className="text-xs text-accent font-medium">Edit</button>
          </div>
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-muted-foreground">{user?.location}</p>
        </div>

        {/* Payment Method */}
        <div className="bg-card rounded-xl shadow-card p-4 space-y-3">
          <span className="font-heading font-bold text-sm">Payment Method</span>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="pay" checked={payMethod === 'card'} onChange={() => setPayMethod('card')} className="accent-accent" />
            <CreditCard size={16} />
            <span className="text-sm font-medium">Credit/Debit Card</span>
          </label>

          {payMethod === 'card' && (
            <div className="space-y-3 pl-6">
              <div className="relative">
                <input value={cardNum} onChange={e => setCardNum(e.target.value)} placeholder="Card Number" className="w-full h-12 px-4 pr-16 rounded-[10px] border border-border bg-card text-sm outline-none focus:border-accent font-mono" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-700">VISA</span>
              </div>
              <div className="flex gap-3">
                <input value={expiry} onChange={e => setExpiry(e.target.value)} placeholder="MM/YY" className="flex-1 h-12 px-4 rounded-[10px] border border-border text-sm outline-none focus:border-accent font-mono" />
                <input value={cvv} onChange={e => setCvv(e.target.value)} placeholder="CVV" type="password" maxLength={4} className="w-24 h-12 px-4 rounded-[10px] border border-border text-sm outline-none focus:border-accent font-mono" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-accent" />
                <span className="text-xs text-muted-foreground">Save card for future use</span>
              </label>
            </div>
          )}

          <label className="flex items-center gap-2 cursor-pointer pt-2 border-t border-border">
            <input type="radio" name="pay" checked={payMethod === 'paypal'} onChange={() => setPayMethod('paypal')} className="accent-accent" />
            <span className="text-sm font-bold text-blue-700">Pay</span><span className="text-sm font-bold text-blue-500">Pal</span>
          </label>
        </div>

        {/* Summary */}
        <div className="bg-card rounded-xl shadow-card p-4">
          <span className="font-heading font-bold text-sm block mb-3">Order Summary</span>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">{carrier.service}</span><span>${carrier.price.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-heading font-bold pt-2 border-t border-border"><span>Total Cost</span><span>${total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pb-6 bg-gradient-to-t from-background to-transparent pt-6 z-30">
        <button onClick={handlePay} disabled={loading} className="w-full h-[52px] bg-accent text-accent-foreground rounded-xl font-heading font-bold text-sm btn-press disabled:opacity-60 flex items-center justify-center">
          {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : `Pay $${total.toFixed(2)}`}
        </button>
        <div className="flex items-center justify-center gap-1 mt-2">
          <Lock size={12} className="text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Secure Payment 256-bit SSL Encryption</span>
        </div>
      </div>
    </div>
  );
};

export default Payment;
