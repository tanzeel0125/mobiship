import type { Order } from '@/store/useAppStore';
import CarrierBadge from './CarrierBadge';

interface Props {
  order: Order;
  onClick: () => void;
  onReturn?: () => void;
}

const OrderCard = ({ order, onClick, onReturn }: Props) => (
  <div
    onClick={onClick}
    className="bg-card rounded-xl shadow-card p-4 cursor-pointer active:scale-[0.99] transition-transform"
  >
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <CarrierBadge carrier={order.carrier} />
        <div>
          <p className="font-heading font-semibold text-sm">{order.senderName}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">{order.senderAddress}</p>
        </div>
      </div>
      <span className="font-heading font-bold text-sm">${order.price.toFixed(2)}</span>
    </div>
    <div className="flex items-center justify-between mt-3">
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
        order.status === 'Delivered' ? 'bg-success/10 text-success' :
        order.status === 'In Transit' ? 'bg-accent/10 text-accent' :
        'bg-destructive/10 text-destructive'
      }`}>
        {order.status === 'Delivered' && '✓ '}
        {order.status} {order.deliveryDate}
      </span>
      {onReturn && (
        <button
          onClick={(e) => { e.stopPropagation(); onReturn(); }}
          className="text-xs font-medium border border-border rounded-lg px-3 py-1.5 text-foreground hover:bg-muted transition-colors"
        >
          Return
        </button>
      )}
    </div>
  </div>
);

export default OrderCard;
