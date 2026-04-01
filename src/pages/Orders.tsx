import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import MobiShipTopNav from '@/components/MobiShipTopNav';
import BottomTabBar from '@/components/BottomTabBar';
import OrderCard from '@/components/OrderCard';
import { useAppStore } from '@/store/useAppStore';

const Orders = () => {
  const navigate = useNavigate();
  const orders = useAppStore(s => s.orders);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const filters = ['All', 'In Transit', 'Delivered', 'Cancelled'];

  const filtered = orders.filter(o => {
    if (filter !== 'All' && o.status !== filter) return false;
    if (search && !o.senderName.toLowerCase().includes(search.toLowerCase()) && !o.trackingNumber.includes(search)) return false;
    return true;
  });

  return (
    <div className="mobile-shell min-h-[100dvh] pb-20">
      <MobiShipTopNav />
      <div className="px-4 py-4 page-enter">
        <h1 className="font-heading text-lg font-bold mb-4">My Orders</h1>

        <div className="flex gap-3 mb-4">
          <div className="relative">
            <button onClick={() => setShowFilter(!showFilter)} className="h-10 px-3 rounded-lg border border-border bg-card text-xs font-medium flex items-center gap-1">
              {filter} <ChevronDown size={14} />
            </button>
            {showFilter && (
              <div className="absolute top-11 left-0 bg-card border border-border rounded-lg shadow-card z-10 overflow-hidden">
                {filters.map(f => (
                  <button key={f} onClick={() => { setFilter(f); setShowFilter(false); }} className={`block w-full text-left px-4 py-2.5 text-xs hover:bg-muted ${f === filter ? 'text-accent font-bold' : ''}`}>
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders..." className="w-full h-10 pl-8 pr-3 rounded-lg border border-border bg-card text-xs outline-none focus:border-accent" />
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={() => navigate(`/orders/${order.id}`)}
              onReturn={() => navigate('/return')}
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">No orders found</p>
          )}
        </div>
      </div>
      <BottomTabBar />
    </div>
  );
};

export default Orders;
