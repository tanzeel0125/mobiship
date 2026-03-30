import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MobiShipTopNav from '@/components/MobiShipTopNav';
import BottomTabBar from '@/components/BottomTabBar';
import CarrierBadge from '@/components/CarrierBadge';
import TrackingTimeline from '@/components/TrackingTimeline';
import { useAppStore } from '@/store/useAppStore';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const orders = useAppStore(s => s.orders);
  const order = orders.find(o => o.id === id);

  if (!order) return <div className="mobile-shell min-h-screen flex items-center justify-center text-muted-foreground">Order not found</div>;

  return (
    <div className="mobile-shell pb-20 min-h-screen">
      <MobiShipTopNav showBack />
      <div className="px-4 py-4 space-y-4 page-enter">
        <h1 className="font-heading text-lg font-bold">Order #{order.id} Details</h1>

        {/* Carrier */}
        <div className="flex items-center gap-3">
          <CarrierBadge carrier={order.carrier} />
          <div>
            <p className="font-heading font-bold text-sm">{order.carrier}</p>
            <p className="font-mono text-xs text-muted-foreground">#{order.trackingNumber}</p>
          </div>
        </div>

        {/* From → To */}
        <div className="bg-card rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="font-medium text-sm">{order.senderName}</p>
              <p className="text-xs text-muted-foreground">{order.senderAddress}</p>
            </div>
            <ArrowRight size={18} className="text-accent shrink-0" />
            <div className="flex-1 text-right">
              <p className="font-medium text-sm">{order.recipientName}</p>
              <p className="text-xs text-muted-foreground">{order.recipientAddress}</p>
            </div>
          </div>
        </div>

        <button className="w-full h-12 border-2 border-navy text-foreground rounded-xl font-heading font-bold text-sm btn-press">
          Contact {order.carrier}
        </button>

        {/* Tracking */}
        <div className="bg-card rounded-xl shadow-card p-4">
          <h2 className="font-heading font-bold text-sm mb-4">Tracking Timeline</h2>
          <TrackingTimeline steps={order.trackingSteps} />
          <p className="text-[10px] text-muted-foreground mt-2">All times shown in local time.</p>
        </div>

        <button onClick={() => navigate(`/orders/${order.id}/refund`)} className="w-full text-center text-sm text-accent font-medium py-2">
          Request Refund
        </button>
      </div>
      <BottomTabBar />
    </div>
  );
};

export default OrderDetail;
