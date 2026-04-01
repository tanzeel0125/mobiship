import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobiShipTopNav from '@/components/MobiShipTopNav';
import BottomTabBar from '@/components/BottomTabBar';
import { useAppStore } from '@/store/useAppStore';
import { toast } from 'sonner';

const returnReasons = ['Select reason...', 'Wrong item received', 'Item damaged', 'No longer needed', 'Other'];

const Return = () => {
  const navigate = useNavigate();
  const orders = useAppStore(s => s.orders);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [packaging, setPackaging] = useState<'original' | 'different'>('original');

  const handleSubmit = () => {
    if (!selectedOrder || !reason || reason === 'Select reason...') {
      toast.error('Please fill in all required fields');
      return;
    }
    const order = orders.find(o => o.id === selectedOrder);
    if (order) {
      sessionStorage.setItem('mobiship_ship_draft', JSON.stringify({
        recipientAddress: order.senderAddress,
        description: `Return: ${order.item}`,
        weight: order.weight,
        dimensions: order.dimensions,
        carrier: { carrier: order.carrier, service: order.service, price: 0 },
      }));
    }
    navigate('/ship');
  };

  const selectClass = "w-full h-12 px-4 rounded-[10px] border border-border bg-card text-sm outline-none focus:border-accent";

  return (
    <div className="mobile-shell min-h-[100dvh] pb-20">
      <MobiShipTopNav />
      <div className="px-4 py-4 space-y-4 page-enter">
        <div>
          <h1 className="font-heading text-lg font-bold">Create a Return</h1>
          <p className="text-sm text-muted-foreground">Start a return or exchange for a recent order.</p>
        </div>

        <div>
          <label className="font-heading font-bold text-sm block mb-2">Select Order</label>
          <select value={selectedOrder} onChange={e => setSelectedOrder(e.target.value)} className={selectClass}>
            <option value="">Select an order...</option>
            {orders.map(o => (
              <option key={o.id} value={o.id}>Order #{o.id} — {o.item} — {o.deliveryDate}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-heading font-bold text-sm block mb-2">Return Reason</label>
          <select value={reason} onChange={e => setReason(e.target.value)} className={selectClass}>
            {returnReasons.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div>
          <label className="font-heading font-bold text-sm block mb-2">Additional Notes</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any additional details..."
            className="w-full h-20 px-4 py-3 rounded-[10px] border border-border bg-card text-sm outline-none focus:border-accent resize-none" />
        </div>

        <div>
          <label className="font-heading font-bold text-sm block mb-2">Package Condition</label>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            {(['original', 'different'] as const).map(p => (
              <button key={p} type="button" onClick={() => setPackaging(p)}
                className={`min-h-12 flex-1 rounded-xl px-2 py-3 text-center text-xs font-medium transition-all sm:text-sm ${
                  packaging === p ? 'bg-accent text-accent-foreground' : 'border-2 border-border text-foreground'
                }`}>
                {p === 'original' ? 'Original Packaging' : 'Different Packaging'}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleSubmit} className="w-full h-[52px] bg-accent text-accent-foreground rounded-xl font-heading font-bold text-sm btn-press">
          Start Return
        </button>
      </div>
      <BottomTabBar />
    </div>
  );
};

export default Return;
