import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import MobiShipTopNav from '@/components/MobiShipTopNav';
import CarrierBadge from '@/components/CarrierBadge';
import { useAppStore } from '@/store/useAppStore';
import { toast } from 'sonner';

const reasons = ['Select reason...', 'Package not delivered', 'Item damaged', 'Wrong address', 'Changed my mind', 'Other'];

const RequestRefund = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const orders = useAppStore(s => s.orders);
  const updateOrder = useAppStore(s => s.updateOrder);
  const order = orders.find(o => o.id === id);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [refundMethod, setRefundMethod] = useState('original');

  if (!order) return null;

  const handleSubmit = () => {
    if (!reason || reason === 'Select reason...') { toast.error('Please select a reason'); return; }
    updateOrder(order.id, { refundStatus: 'pending' });
    toast.success("Refund request submitted. You'll hear back in 5-7 business days.");
    navigate(`/orders/${order.id}`);
  };

  return (
    <div className="mobile-shell min-h-screen">
      <MobiShipTopNav showBack />
      <div className="px-4 py-4 space-y-4 page-enter">
        <h1 className="font-heading text-lg font-bold">Request a Refund</h1>

        <div className="bg-card rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <CarrierBadge carrier={order.carrier} size="sm" />
            <div>
              <p className="font-medium text-sm">{order.carrier}</p>
              <p className="text-xs text-muted-foreground">Recipient: {order.recipientName} — Order #{order.id}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{order.recipientAddress}</p>
          <p className="font-mono text-xs text-muted-foreground mt-1">Tracking: {order.trackingNumber}</p>
        </div>

        <div>
          <label className="font-heading font-bold text-sm block mb-2">Reason for Refund</label>
          <select value={reason} onChange={e => setReason(e.target.value)} className="w-full h-12 px-4 rounded-[10px] border border-border bg-card text-sm outline-none focus:border-accent">
            {reasons.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div>
          <label className="font-heading font-bold text-sm block mb-2">Additional Details (optional)</label>
          <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="Provide more information or comments..."
            className="w-full h-24 px-4 py-3 rounded-[10px] border border-border bg-card text-sm outline-none focus:border-accent resize-none" />
        </div>

        <div>
          <label className="font-heading font-bold text-sm block mb-2">Refund Method</label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border cursor-pointer">
              <input type="radio" name="method" checked={refundMethod === 'original'} onChange={() => setRefundMethod('original')} className="accent-accent" />
              <span className="text-sm font-medium flex-1">Original Payment Method</span>
              {refundMethod === 'original' && <CheckCircle2 size={18} className="text-success" />}
            </label>
            <label className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border cursor-pointer">
              <input type="radio" name="method" checked={refundMethod === 'credit'} onChange={() => setRefundMethod('credit')} className="accent-accent" />
              <span className="text-sm font-medium flex-1">Store Credit</span>
              {refundMethod === 'credit' && <CheckCircle2 size={18} className="text-success" />}
            </label>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">Allow 5-7 business days for processing and refunding.</p>

        <button onClick={handleSubmit} className="w-full h-[52px] bg-accent text-accent-foreground rounded-xl font-heading font-bold text-sm btn-press">
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default RequestRefund;
