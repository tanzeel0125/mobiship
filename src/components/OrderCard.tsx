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
    <div className="flex items-start justify-between gap-2">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <CarrierBadge carrier={order.carrier} />
        <div className="min-w-0">
          <p className="font-heading text-sm font-semibold">{order.senderName}</p>
          <p className="line-clamp-2 text-xs text-muted-foreground break-words sm:line-clamp-1">{order.senderAddress}</p>
        </div>
      </div>
      <span className="shrink-0 font-heading text-sm font-bold tabular-nums">${order.price.toFixed(2)}</span>
    </div>
    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
      <span className={`max-w-full text-xs font-medium px-2.5 py-1 rounded-full break-words ${
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
