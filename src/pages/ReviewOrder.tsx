import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Check, Lock } from 'lucide-react';
import MobiShipTopNav from '@/components/MobiShipTopNav';
import CarrierBadge from '@/components/CarrierBadge';
import { useAppStore } from '@/store/useAppStore';

const ReviewOrder = () => {
  const navigate = useNavigate();
  const user = useAppStore(s => s.user);
  const [editShipment, setEditShipment] = useState(false);

  const draft = JSON.parse(sessionStorage.getItem('mobiship_ship_draft') || '{}');
  const carrier = draft.carrier || { carrier: 'UPS', service: 'UPS Ground', delivery: '2/6/26', price: 15.38 };
  const shippingCost = carrier.price;
  const tax = Math.round(shippingCost * 0.06 * 100) / 100;
  const total = Math.round((shippingCost + tax) * 100) / 100;

  const [weight, setWeight] = useState(draft.weight || '3 lbs 8 oz');
  const [dimensions, setDimensions] = useState(draft.dimensions || '12" × 10" × 6"');

  return (
    <div className="mobile-shell min-h-[100dvh] pb-24">
      <MobiShipTopNav showBack />
      <div className="px-4 py-4 space-y-4 page-enter">
        <div>
          <h1 className="font-heading text-lg font-bold">Review Order & Pay</h1>
          <p className="text-sm text-muted-foreground">Review your shipment details, choose a payment method, and confirm your order.</p>
        </div>

        {/* Shipping Details */}
        <div className="bg-card rounded-xl shadow-card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-heading font-bold text-sm">Shipping Details</span>
            <button className="text-xs text-accent font-medium">Edit</button>
          </div>
          <p className="text-sm font-medium">Jessica Smith <span className="text-xs bg-muted px-2 py-0.5 rounded-full ml-1">Residential</span></p>
          <p className="mt-1 break-words text-xs text-muted-foreground">{draft.recipientAddress || '2856 Cherry Blossom Ln, Portland, OR 97227'}</p>
        </div>

        {/* Shipment Information */}
        <div className="bg-card rounded-xl shadow-card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-heading font-bold text-sm">Shipment Information</span>
          </div>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted text-xl">👟</div>
            <div className="min-w-0">
              <p className="text-sm font-medium">{draft.description || 'Shoes'}</p>
              <p className="break-words text-xs text-muted-foreground">{weight} | {dimensions}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-muted p-3 sm:gap-3">
            <CarrierBadge carrier={carrier.carrier} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium">{carrier.service}</p>
              <p className="break-words text-xs text-muted-foreground">Delivery by Wed, Feb 6th</p>
            </div>
            <span className="shrink-0 text-sm font-bold tabular-nums">${shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Check size={14} className="text-success" />
            <span className="text-xs text-success font-medium">Selected Service</span>
          </div>
          <button onClick={() => setEditShipment(!editShipment)} className="text-xs text-accent font-medium mt-2 flex items-center gap-1">
            <Pencil size={12} /> Edit Shipment Info
          </button>
          {editShipment && (
            <div className="mt-3 pt-3 border-t border-border space-y-3 animate-fade-in">
              <div>
                <label className="text-xs text-muted-foreground">Weight</label>
                <input value={weight} onChange={e => setWeight(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-border text-sm outline-none focus:border-accent mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Dimensions</label>
                <input value={dimensions} onChange={e => setDimensions(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-border text-sm outline-none focus:border-accent mt-1" />
              </div>
              <button onClick={() => setEditShipment(false)} className="w-full h-10 bg-accent text-accent-foreground rounded-lg font-heading font-bold text-sm btn-press">
                Update Shipment
              </button>
              <button onClick={() => setEditShipment(false)} className="w-full text-center text-xs text-muted-foreground">Cancel Changes</button>
            </div>
          )}
        </div>

        {/* Cost Summary */}
        <div className="bg-card rounded-xl shadow-card p-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping Cost</span><span>${shippingCost.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Estimated Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-heading font-bold pt-2 border-t border-border"><span>Total Cost</span><span>${total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>

      <div
        className="mobile-fixed-bar bottom-0 z-30 bg-gradient-to-t from-background to-transparent pt-6"
        style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
      >
        <button type="button" onClick={() => {
          sessionStorage.setItem('mobiship_total', total.toString());
          navigate('/ship/payment');
        }} className="btn-press h-[52px] w-full rounded-xl bg-accent font-heading text-sm font-bold text-accent-foreground">
          Pay & Ship — ${total.toFixed(2)}
        </button>
        <div className="mt-2 flex items-center justify-center gap-1 px-1 text-center">
          <Lock size={12} className="shrink-0 text-muted-foreground" />
          <span className="text-[10px] leading-snug text-muted-foreground">Secure Payment 256-bit SSL Encryption</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrder;
