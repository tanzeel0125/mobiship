import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Mic, ChevronDown, Check } from 'lucide-react';
import MobiShipTopNav from '@/components/MobiShipTopNav';
import BottomTabBar from '@/components/BottomTabBar';
import CarrierBadge from '@/components/CarrierBadge';
import { useAppStore } from '@/store/useAppStore';

const mockSuggestions = [
  '2856 Cherry Blossom Ln, Portland, OR 97227',
  '445 S Figueroa St, Los Angeles, CA 90071',
  '1200 NE Broadway, Portland, OR 97232',
];

const carriers = [
  { carrier: 'UPS' as const, service: 'UPS Ground', delivery: '2/6/26', price: 15.38 },
  { carrier: 'FedEx' as const, service: 'FedEx Ground', delivery: '2/6/26', price: 15.38 },
  { carrier: 'USPS' as const, service: 'USPS Ground Advantage', delivery: '2/7/26', price: 15.38 },
];

interface ShipPageProps {
  prefillReturn?: { to: string; from: string };
}

const Ship = ({ prefillReturn }: ShipPageProps) => {
  const navigate = useNavigate();
  const user = useAppStore(s => s.user);
  const [address, setAddress] = useState(prefillReturn?.to || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [description, setDescription] = useState('');
  const [manualEntry, setManualEntry] = useState(false);
  const [weight, setWeight] = useState({ lbs: '3', oz: '8' });
  const [dims, setDims] = useState({ l: '12', w: '10', h: '6' });
  const [selectedCarrier, setSelectedCarrier] = useState(0);
  const [showRates, setShowRates] = useState(false);

  const handleAddressChange = (v: string) => {
    setAddress(v);
    setShowSuggestions(v.length > 2);
  };

  const handleSelectAddress = (addr: string) => {
    setAddress(addr);
    setShowSuggestions(false);
    // Simulate loading rates
    setTimeout(() => setShowRates(true), 1500);
  };

  const handleReview = () => {
    const orderData = {
      recipientAddress: address,
      description,
      weight: `${weight.lbs} lbs ${weight.oz} oz`,
      dimensions: `${dims.l}" × ${dims.w}" × ${dims.h}"`,
      carrier: carriers[selectedCarrier],
    };
    sessionStorage.setItem('mobiship_ship_draft', JSON.stringify(orderData));
    navigate('/ship/review');
  };

  return (
    <div className="mobile-shell pb-24">
      <MobiShipTopNav showBack />
      <div className="px-4 py-4 space-y-5 page-enter">
        {/* My Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={14} className="text-accent" />
          <span>My Location: {user?.location?.split(',').pop()?.trim() || 'San Marcos, CA 92069'}</span>
        </div>

        {/* Shipping To */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-heading font-bold text-sm">Shipping To</label>
            <button onClick={() => navigate('/account/addresses')} className="text-xs text-accent font-medium">Use Address Book</button>
          </div>
          <div className="relative">
            <input
              placeholder="Enter recipient address"
              value={address}
              onChange={e => handleAddressChange(e.target.value)}
              className="w-full h-12 px-4 pr-10 rounded-[10px] border border-border bg-card text-sm outline-none focus:border-accent"
            />
            <Mic size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>
          {showSuggestions && (
            <div className="mt-1 bg-card border border-border rounded-xl shadow-card overflow-hidden">
              {mockSuggestions.map((s, i) => (
                <button key={i} onClick={() => handleSelectAddress(s)} className="w-full text-left px-4 py-3 text-sm hover:bg-muted border-b border-border last:border-0">
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* What I'm Shipping */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-heading font-bold text-sm">What I'm Shipping</label>
            <button onClick={() => navigate('/ship/use-images')} className="text-xs text-accent font-medium">Use Images</button>
          </div>
          <div className="relative">
            <input
              placeholder="Describe your shipment"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full h-12 px-4 pr-10 rounded-[10px] border border-border bg-card text-sm outline-none focus:border-accent"
            />
            <Mic size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        {/* Manual Entry */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={manualEntry} onChange={e => setManualEntry(e.target.checked)} className="accent-accent" />
          <span className="text-sm font-medium">Manual Entry – Weight & Dimensions</span>
        </label>

        {manualEntry && (
          <div className="space-y-3 animate-fade-in">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Weight</label>
              <div className="flex items-center gap-2">
                <input type="number" value={weight.lbs} onChange={e => setWeight({...weight, lbs: e.target.value})} className="w-20 h-10 px-3 rounded-lg border border-border text-sm text-center outline-none focus:border-accent" />
                <span className="text-xs text-muted-foreground">lbs</span>
                <input type="number" value={weight.oz} onChange={e => setWeight({...weight, oz: e.target.value})} className="w-20 h-10 px-3 rounded-lg border border-border text-sm text-center outline-none focus:border-accent" />
                <span className="text-xs text-muted-foreground">oz</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Dimensions (in)</label>
              <div className="flex items-center gap-2">
                <input type="number" value={dims.l} onChange={e => setDims({...dims, l: e.target.value})} className="flex-1 h-10 px-3 rounded-lg border border-border text-sm text-center outline-none focus:border-accent" placeholder="L" />
                <span className="text-muted-foreground">×</span>
                <input type="number" value={dims.w} onChange={e => setDims({...dims, w: e.target.value})} className="flex-1 h-10 px-3 rounded-lg border border-border text-sm text-center outline-none focus:border-accent" placeholder="W" />
                <span className="text-muted-foreground">×</span>
                <input type="number" value={dims.h} onChange={e => setDims({...dims, h: e.target.value})} className="flex-1 h-10 px-3 rounded-lg border border-border text-sm text-center outline-none focus:border-accent" placeholder="H" />
              </div>
            </div>
          </div>
        )}

        {/* Select a Service */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="font-heading font-bold text-sm">Select a Service</label>
            <button className="text-xs text-muted-foreground flex items-center gap-1">Lowest Cost <ChevronDown size={14} /></button>
          </div>

          {!showRates && address.length > 5 ? (
            <div className="space-y-3">
              {[1,2,3].map(i => (
                <div key={i} className="bg-card rounded-xl p-4 shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted skeleton-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-muted rounded w-3/4 skeleton-pulse" />
                      <div className="h-3 bg-muted rounded w-1/2 skeleton-pulse" />
                    </div>
                    <div className="h-8 w-16 bg-muted rounded-lg skeleton-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : showRates ? (
            <div className="space-y-3">
              {carriers.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCarrier(i)}
                  className={`w-full bg-card rounded-xl p-4 shadow-card text-left transition-all ${
                    selectedCarrier === i ? 'ring-2 ring-accent' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CarrierBadge carrier={c.carrier} />
                    <div className="flex-1">
                      <p className="font-heading font-semibold text-sm">Carrier: {c.carrier}</p>
                      <p className="text-xs text-muted-foreground">Service: {c.service} | Delivery: {c.delivery}</p>
                    </div>
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${
                      selectedCarrier === i ? 'bg-accent text-accent-foreground' : 'bg-navy text-primary-foreground'
                    }`}>
                      {selectedCarrier === i && <Check size={14} />}
                      ${c.price.toFixed(2)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">Enter a recipient address to see rates</p>
          )}
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pb-4 bg-gradient-to-t from-background to-transparent pt-6 z-30">
        <button
          onClick={handleReview}
          disabled={!address || !showRates}
          className="w-full h-[52px] bg-accent text-accent-foreground rounded-xl font-heading font-bold text-sm btn-press disabled:opacity-40"
        >
          Review Order and Pay
        </button>
      </div>
      <BottomTabBar />
    </div>
  );
};

export default Ship;
