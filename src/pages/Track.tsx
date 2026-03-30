import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, QrCode } from 'lucide-react';
import MobiShipTopNav from '@/components/MobiShipTopNav';
import BottomTabBar from '@/components/BottomTabBar';
import TrackingTimeline from '@/components/TrackingTimeline';
import CarrierBadge from '@/components/CarrierBadge';
import { useAppStore } from '@/store/useAppStore';

const Track = () => {
  const { orders, recentTracking, addTracking } = useAppStore();
  const [trackingNum, setTrackingNum] = useState('');
  const [result, setResult] = useState<typeof orders[0] | null>(null);

  const handleTrack = () => {
    if (!trackingNum.trim()) return;
    addTracking(trackingNum.trim());
    const found = orders.find(o => o.trackingNumber.includes(trackingNum.trim()));
    setResult(found || orders[0]); // fallback to first order for demo
  };

  const handleRecent = (tn: string) => {
    setTrackingNum(tn);
    const found = orders.find(o => o.trackingNumber === tn);
    setResult(found || orders[0]);
  };

  return (
    <div className="mobile-shell pb-20 min-h-screen">
      <MobiShipTopNav />
      <div className="px-4 py-4 page-enter">
        <h1 className="font-heading text-lg font-bold mb-4">Track a Package</h1>

        <div className="relative mb-3">
          <input
            value={trackingNum}
            onChange={e => setTrackingNum(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleTrack()}
            placeholder="Enter tracking number or scan QR code"
            className="w-full h-12 pl-4 pr-12 rounded-[10px] border border-border bg-card text-sm outline-none focus:border-accent"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <QrCode size={16} className="text-accent-foreground" />
          </button>
        </div>

        <button onClick={handleTrack} className="w-full h-[52px] bg-accent text-accent-foreground rounded-xl font-heading font-bold text-sm btn-press mb-6">
          Track
        </button>

        {!result && recentTracking.length > 0 && (
          <div>
            <h2 className="font-heading font-bold text-sm mb-3">Recent Tracking</h2>
            <div className="space-y-2">
              {recentTracking.map((tn, i) => {
                const order = orders.find(o => o.trackingNumber === tn);
                return (
                  <button key={i} onClick={() => handleRecent(tn)} className="w-full bg-card rounded-xl shadow-card p-3 flex items-center gap-3 text-left">
                    {order && <CarrierBadge carrier={order.carrier} size="sm" />}
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs truncate">{tn}</p>
                      {order && (
                        <span className={`text-xs font-medium ${order.status === 'Delivered' ? 'text-success' : 'text-accent'}`}>
                          {order.status}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {result && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <CarrierBadge carrier={result.carrier} />
              <div>
                <p className="font-heading font-bold text-sm">{result.carrier} — {result.service}</p>
                <p className="font-mono text-xs text-muted-foreground">{result.trackingNumber}</p>
              </div>
            </div>
            <div className="bg-card rounded-xl shadow-card p-4">
              <TrackingTimeline steps={result.trackingSteps} />
              <p className="text-[10px] text-muted-foreground mt-2">All times shown in local time.</p>
            </div>
          </div>
        )}
      </div>
      <BottomTabBar />
    </div>
  );
};

export default Track;
